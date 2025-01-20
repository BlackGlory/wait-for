export function waitForAnimationFrame(): Promise<DOMHighResTimeStamp> {
  return new Promise(resolve => requestAnimationFrame(resolve))
}
