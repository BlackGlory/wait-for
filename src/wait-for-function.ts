import { setImmediate } from 'extra-timers'

export async function waitForFunction<T>(fn: () => T | PromiseLike<T>): Promise<T> {
  while (true) {
    const result = await fn()
    if (result) return result
    await next()
  }
}

function next(): Promise<void> {
  return new Promise(resolve => setImmediate(resolve))
}
