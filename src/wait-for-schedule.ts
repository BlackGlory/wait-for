import { setSchedule } from 'extra-timers'

export function waitForSchedule(timestamp: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    signal?.throwIfAborted()

    const clearSchedule = setSchedule(timestamp, resolve)

    signal?.addEventListener('abort', () => {
      clearSchedule()
      reject(signal.reason)
    }, { once: true })
  })
}
