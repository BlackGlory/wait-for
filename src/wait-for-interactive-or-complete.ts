import { fromEvent, map, filter, firstValueFrom } from 'rxjs'

/**
 * waitForDOMContentLoaded的边缘情况替代品:
 * 如果页面载入被用户代理取消, 就不会触发document的DOMContentLoaded事件.
 */ 
export function waitForInteractiveOrComplete(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (
      document.readyState === 'interactive' ||
      document.readyState === 'complete'
    ) {
      resolve()
    } else {
      firstValueFrom(
        fromEvent(document, 'readystatechange').pipe(
          map(() => document.readyState)
        , filter(state => state === 'complete' || state === 'interactive')
        )
      ).then(() => resolve(), reject)
    }
  })
}
