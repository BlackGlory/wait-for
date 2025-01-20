export function waitForIdleCallback(options?: IdleRequestOptions): Promise<IdleDeadline> {
  return new Promise(resolve => requestIdleCallback(resolve, options))
}
