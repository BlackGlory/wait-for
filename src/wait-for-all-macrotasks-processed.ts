import { setImmediate } from 'extra-timers'

export function waitForAllMacrotasksProcessed(): Promise<void> {
  return new Promise<void>(resolve => setImmediate(resolve))
}
