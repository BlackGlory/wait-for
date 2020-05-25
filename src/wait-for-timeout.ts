import { delay } from 'extra-promise'

export function waitForTimeout(ms: number): Promise<void> {
  return delay(ms)
}
