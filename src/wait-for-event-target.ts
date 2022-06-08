export function waitForEventTarget<T extends EventTarget>(
  target: T
, event: string
): Promise<Event> {
  return new Promise(resolve => {
    target.addEventListener(event, x => resolve(x), { once: true })
  })
}
