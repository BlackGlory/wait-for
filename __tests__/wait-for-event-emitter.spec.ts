import { waitForEventEmitter } from '@src/wait-for-event-emitter'
import { getErrorPromise } from 'return-style'
import { AbortController } from 'extra-abort'
import { EventEmitter } from 'events'

describe('waitForEventEmitter', () => {
  it('resolves when the event triggered', async () => {
    const args = ['arg']
    const emitter = new EventEmitter()
    const addEventListener = jest.spyOn(emitter, 'once')

    const promise = waitForEventEmitter(emitter, 'message')
    queueMicrotask(() => emitter.emit('message', ...args))
    const result = await promise

    expect(result).toStrictEqual(args)
    expect(addEventListener).toBeCalledTimes(1)
    expect(addEventListener).toBeCalledWith('message', expect.any(Function))
  })

  describe('rejectes when the signal aborted', () => {
    test('signal aborted before listening', async () => {
      const controller = new AbortController()
      controller.abort()
      const target = new EventEmitter()
      const once = jest.spyOn(target, 'once')
      const off = jest.spyOn(target, 'off')

      const err = await getErrorPromise(
        waitForEventEmitter(target, 'event', controller.signal)
      )

      expect(err?.name).toBe('AbortError') // expect(err).toBeInstanceOf(AbortError)
      expect(once).not.toBeCalled()
      expect(off).not.toBeCalled()
    })

    test('signal aborted after listening ', async () => {
      const controller = new AbortController()
      const target = new EventEmitter()
      const once = jest.spyOn(target, 'once')
      const off = jest.spyOn(target, 'off')

      const promise = getErrorPromise(
        waitForEventEmitter(target, 'event', controller.signal)
      )
      queueMicrotask(() => controller.abort())
      const err = await promise

      expect(err?.name).toBe('AbortError') // expect(err).toBeInstanceOf(AbortError)
      expect(once).toBeCalledTimes(1)
      expect(off).toBeCalledTimes(1)
    })
  })
})
