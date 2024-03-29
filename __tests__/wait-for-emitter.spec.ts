import { waitForEmitter } from '@src/wait-for-emitter.js'
import { AbortController } from 'extra-abort'
import { getErrorPromise } from 'return-style'
import { Emitter } from '@blackglory/structures'

describe('waitForEmitter', () => {
  it('resolves when the event triggered', async () => {
    const args = ['arg']
    const emitter = new Emitter()
    const addEventListener = vi.spyOn(emitter, 'once')

    try {
      const promise = waitForEmitter(emitter, 'message')
      queueMicrotask(() => emitter.emit('message', ...args))
      const result = await promise

      expect(result).toStrictEqual(args)

      expect(addEventListener).toBeCalledTimes(1)
      expect(addEventListener).toBeCalledWith('message', expect.any(Function))
    } finally {
      addEventListener.mockRestore()
    }
  })

  describe('rejects when the signal aborted', () => {
    test('signal aborted before listening', async () => {
      const controller = new AbortController()
      controller.abort()
      const target = new Emitter()
      const once = vi.spyOn(target, 'once')

      const err = await getErrorPromise(
        waitForEmitter(target, 'event', controller.signal)
      )

      expect(err?.name).toBe('AbortError') // expect(err).toBeInstanceOf(AbortError)
      expect(once).not.toBeCalled()
    })

    test('signal aborted after listening ', async () => {
      const controller = new AbortController()
      const target = new Emitter()
      const once = vi.spyOn(target, 'once')

      const promise = getErrorPromise(
        waitForEmitter(target, 'event', controller.signal)
      )
      queueMicrotask(() => controller.abort())
      const err = await promise

      expect(err?.name).toBe('AbortError') // expect(err).toBeInstanceOf(AbortError)
      expect(once).toBeCalledTimes(1)
    })
  })
})
