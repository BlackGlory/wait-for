import { waitForEventEmitter } from '@src/wait-for-event-emitter'
import '@blackglory/jest-matchers'
import { EventEmitter } from 'events'

describe('waitForEventEmitter<T extends EventTarget>(target: T, event: string): Promise<T>', () => {
  it('resolves when the event triggered', async () => {
    const value = 'value'
    const emitter = new EventEmitter()
    const addEventListener = jest.spyOn(emitter, 'once')

    try {
      const result = waitForEventEmitter(emitter, 'message')
      queueMicrotask(() => emitter.emit('message', value))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(value)

      expect(addEventListener).toBeCalledTimes(1)
      expect(addEventListener).toBeCalledWith('message', expect.any(Function))
    } finally {
      addEventListener.mockRestore()
    }
  })
})
