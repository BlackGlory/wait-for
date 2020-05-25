export function waitForEvent<T extends EventTarget = Element>(target: EventTarget, event: string): Promise<T> {
  return new Promise(resolve =>
    target.addEventListener(event, x => resolve(x.target as T), { once: true })
  )
}
