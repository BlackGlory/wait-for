export function waitForEventTarget<T extends EventTarget>(target: T, event: string): Promise<T> {
  return new Promise(resolve =>
    target.addEventListener(event, x => resolve(x.target as T), { once: true })
  )
}
