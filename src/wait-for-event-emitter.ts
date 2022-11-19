import type { EventEmitter } from 'events'

export function waitForEventEmitter<T extends EventEmitter>(
  target: T
, event: string
, signal?: AbortSignal
): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason)

    target.once(event, handler)
    signal?.addEventListener('abort', () => {
      target.off(event, handler)
      reject(signal.reason)
    }, { once: true })

    function handler(...args: unknown[]): void {
      resolve(args)
    }
  })
}
