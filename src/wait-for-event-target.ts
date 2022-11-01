export function waitForEventTarget<T extends EventTarget>(
  target: T
, event: string
, signal?: AbortSignal
): Promise<Event> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason)

    target.addEventListener(event, resolve, { once: true })
    signal?.addEventListener('abort', () => {
      target.removeEventListener(event, resolve)
      reject(signal.reason)
    }, { once: true })
  })
}
