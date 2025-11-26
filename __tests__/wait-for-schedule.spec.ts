import { waitForSchedule } from '@src/wait-for-schedule.js'
import { AbortController, AbortError } from 'extra-abort'
import { StatefulPromise, StatefulPromiseState } from 'extra-promise'
import { getErrorPromise } from 'return-style'

describe('waitForSchedule', () => {
  test('The promise resolves at the timestamp', async () => {
    vi.useFakeTimers()
    try {
      const timestamp = Date.now() + 500

      const promise = waitForSchedule(timestamp)
      const statefulPromise = StatefulPromise.from(promise)
      await vi.advanceTimersByTimeAsync(499)
      const state1 = statefulPromise.state
      await vi.advanceTimersByTimeAsync(500)
      const state2 = statefulPromise.state
      const result = await promise

      expect(state1).toBe(StatefulPromiseState.Pending)
      expect(state2).toBe(StatefulPromiseState.Fulfilled)
      expect(result).toBeUndefined()
    } finally {
      vi.useRealTimers()
    }
  })

  describe('The promise rejects when the signal is aborted', () => {
    test('The signal is aborted before waiting', async () => {
      const timestamp = Date.now() + 500
      const controller = new AbortController()
      controller.abort()

      const promise = waitForSchedule(timestamp, controller.signal)
      const err = await getErrorPromise(promise)

      expect(err).toBeInstanceOf(AbortError)
    })

    test('The signal is aborted after waiting', async () => {
      const timestamp = Date.now() + 500
      const controller = new AbortController()
      controller.abort()

      const promise = waitForSchedule(timestamp, controller.signal)
      queueMicrotask(() => controller.abort())
      const err = await getErrorPromise(promise)

      expect(err).toBeInstanceOf(AbortError)
    })
  })
})
