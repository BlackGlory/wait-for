export async function waitForFunction<T>(fn: () => T | PromiseLike<T>): Promise<T> {
  for (;;) {
    const result = await fn()
    if (result) return result
    await nextFrame()
  }
}

function nextFrame(): Promise<void> {
  return new Promise(resolve => requestAnimationFrame(() => resolve()))
}
