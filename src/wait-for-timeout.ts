import { delay } from 'extra-promise'

export function waitForTimeout(ms: number, signal?: AbortSignal): Promise<void> {
  return delay(ms, signal)
}
