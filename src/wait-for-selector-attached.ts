import { fromMutationObserver } from './shared/from-mutation-observer'
import { filter, flatMap } from 'rxjs/operators'

export function waitForSelectorAttached(selector: string): Promise<Element[]> {
  return new Promise(resolve => {
    const elements = document.querySelectorAll(selector)
    if (elements.length) return resolve(toArray(elements))

    const observer = fromMutationObserver(document.documentElement, { childList: true, subtree: true }).pipe(
      flatMap(mutations => mutations)
    , filter(isAddedNodesMutation)
    ).subscribe(() => {
      const elements = document.querySelectorAll(selector)
      if (elements.length) {
        observer.unsubscribe()
        resolve(toArray(elements))
      }
    })
  })
}

function toArray<T>(iterable: Iterable<T>): T[] {
  return Array.from(iterable)
}

function isAddedNodesMutation(mutation: MutationRecord): boolean {
  return !!mutation.addedNodes
}
