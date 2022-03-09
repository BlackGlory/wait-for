import { fromEvent, race, map, filter, firstValueFrom } from 'rxjs'

/**
 * waitForLoad的边缘情况替代品:
 * 如果页面载入被用户代理取消, 就不会触发window的load事件.
 */
export function waitForComplete(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.readyState === 'complete') {
      resolve()
    } else {
      firstValueFrom(
        fromEvent(document, 'readystatechange').pipe(
          map(() => document.readyState)
        , filter(state => state === 'complete')
        )
      ).then(() => resolve(), reject)
    }
  })
}
