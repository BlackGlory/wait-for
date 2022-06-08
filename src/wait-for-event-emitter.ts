import type { EventEmitter } from 'events'

export function waitForEventEmitter<T extends EventEmitter>(
  target: T
, event: string
): Promise<unknown> {
  return new Promise(resolve => {
    target.once(event, (...args: unknown[]) => resolve(args))
  })
}
