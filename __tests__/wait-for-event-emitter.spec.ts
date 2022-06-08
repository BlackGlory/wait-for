import { waitForEventEmitter } from '@src/wait-for-event-emitter'
import '@blackglory/jest-matchers'
import { EventEmitter } from 'events'

describe('waitForEventEmitter', () => {
  it('resolves when the event triggered', async () => {
    const args = ['arg']
    const emitter = new EventEmitter()
    const addEventListener = jest.spyOn(emitter, 'once')

    try {
      const result = waitForEventEmitter(emitter, 'message')
      queueMicrotask(() => emitter.emit('message', ...args))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toStrictEqual(args)

      expect(addEventListener).toBeCalledTimes(1)
      expect(addEventListener).toBeCalledWith('message', expect.any(Function))
    } finally {
      addEventListener.mockRestore()
    }
  })
})
