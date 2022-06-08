import { waitForEmitter } from '@src/wait-for-emitter'
import '@blackglory/jest-matchers'
import { Emitter } from '@blackglory/structures'

describe('waitForEmitter', () => {
  it('resolves when the event triggered', async () => {
    const args = ['arg']
    const emitter = new Emitter()
    const addEventListener = jest.spyOn(emitter, 'once')

    try {
      const result = waitForEmitter(emitter, 'message')
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
