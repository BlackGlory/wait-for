import { setTimeout } from 'extra-timers'

export function waitForTimeout(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason)

    const cancel = setTimeout(ms, resolve)

    signal?.addEventListener('abort', async () => {
      cancel()

      reject(signal.reason)
    })
  })
}
