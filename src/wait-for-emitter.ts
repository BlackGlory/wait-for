import { Emitter } from '@blackglory/structures'

export function waitForEmitter<
  EventToArgs extends Record<string, unknown[]>
, Event extends keyof EventToArgs
>(
  target: Emitter<EventToArgs>
, event: Event
): Promise<EventToArgs[Event]> {
  return new Promise<EventToArgs[Event]>(resolve => {
    target.once(event, (...args: EventToArgs[Event]) => resolve(args))
  })
}
