import { setImmediate, setTimeout } from 'extra-timers'

export async function waitForAllMacrotasksProcessed(): Promise<void> {
  // `setTimeout(0)`和`setImmediate`的回调调用顺序是不确定的, 因此等待两个回调都完成.
  await Promise.all([
    new Promise<void>(resolve => setImmediate(resolve))
  , new Promise<void>(resolve => setTimeout(0, resolve))
  ])
}
