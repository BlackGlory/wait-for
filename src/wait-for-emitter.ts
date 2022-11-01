import { Emitter } from '@blackglory/structures'

export function waitForEmitter<
  EventToArgs extends Record<string, unknown[]>
, Event extends keyof EventToArgs
>(
  target: Emitter<EventToArgs>
, event: Event
, signal?: AbortSignal
): Promise<EventToArgs[Event]> {
  return new Promise<EventToArgs[Event]>((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason)

    const removeListener = target.once(event, handler)
    signal?.addEventListener('abort', () => {
      removeListener()
      reject(signal.reason)
    }, { once: true })

    function handler(...args: EventToArgs[Event]): void {
      resolve(args)
    }
  })
}
