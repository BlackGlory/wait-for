export function waitForAllMicrotasksProcessed(): Promise<void> {
  return new Promise<void>(resolve => queueMicrotask(resolve))
}
