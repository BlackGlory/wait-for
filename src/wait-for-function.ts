import { delay } from 'extra-promise'

export async function waitForFunction<T>(fn: () => T | PromiseLike<T>, interval: number = 0): Promise<T> {
  while (true) {
    const result = await fn()
    if (result) return result
    await delay(interval)
  }
}
