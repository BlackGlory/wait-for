import { waitForTimeout } from '@src/wait-for-timeout.js'
import { AbortController } from 'extra-abort'
import { getErrorPromise } from 'return-style'

describe('waitForTimeout(ms: number): Promise<void>', () => {
  it('calls setTimeout', () => {
    vi.useFakeTimers()
    try {
      const setTimeout = vi.spyOn(globalThis, 'setTimeout')
      const ms = 500

      waitForTimeout(ms)

      expect(setTimeout).toBeCalledTimes(1)
      expect(setTimeout).toBeCalledWith(expect.any(Function), ms)
    } finally {
      vi.useRealTimers()
    }
  })

  it('resolves after ms', async () => {
    vi.useFakeTimers()
    try {
      const ms = 500

      const promise = waitForTimeout(ms)
      vi.advanceTimersByTime(500)
      const result = await promise

      expect(result).toBeUndefined()
    } finally {
      vi.useRealTimers()
    }
  })

  describe('rejects when the signal aborted', () => {
    test('signal aborted before waiting', async () => {
      const ms = 500
      const controller = new AbortController()
      controller.abort()

      const promise = waitForTimeout(ms, controller.signal)
      const err = await getErrorPromise(promise)

      expect(err?.name).toBe('AbortError') // expect(err).toBeInstanceOf(AbortError)
    })

    test('signal aborted after waiting', async () => {
      const ms = 500
      const controller = new AbortController()
      controller.abort()

      const promise = waitForTimeout(ms, controller.signal)
      queueMicrotask(() => controller.abort())
      const err = await getErrorPromise(promise)

      expect(err?.name).toBe('AbortError') // expect(err).toBeInstanceOf(AbortError)
    })
  })
})
