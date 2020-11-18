import type { EventEmitter } from 'events'

export function waitForEventEmitter<T extends EventEmitter>(target: T, event: string): Promise<T> {
  return new Promise(resolve =>
    target.once(event, x => resolve(x))
  )
}
