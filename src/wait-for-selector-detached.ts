import { fromMutationObserver } from './shared/from-mutation-observer'
import { filter, flatMap } from 'rxjs/operators'

export function waitForSelectorDetached(selector: string): Promise<void> {
  return new Promise(resolve => {
    const elements = document.querySelectorAll(selector)
    if (elements.length === 0) return resolve()

    const observer = fromMutationObserver(document.documentElement, { childList: true, subtree: true }).pipe(
      flatMap(mutations => mutations)
    , filter(isRemovedNodesMutation)
    ).subscribe(() => {
      const elements = document.querySelectorAll(selector)
      if (elements.length === 0) {
        observer.unsubscribe()
        resolve()
      }
    })
  })
}

function isRemovedNodesMutation(mutation: MutationRecord): boolean {
  return !!mutation.removedNodes
}
