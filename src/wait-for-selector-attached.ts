import { fromMutationObserver } from './shared/from-mutation-observer'
import { filter, mergeMap } from 'rxjs/operators'
import { toArray } from 'iterable-operator/lib/es2015/output/to-array'

export function waitForSelectorAttached(selector: string): Promise<Element[]> {
  return new Promise(resolve => {
    const elements = document.querySelectorAll(selector)
    if (elements.length) return resolve(toArray(elements))

    const observer = fromMutationObserver(document.documentElement, { childList: true, subtree: true }).pipe(
      mergeMap(mutations => mutations)
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

function isAddedNodesMutation(mutation: MutationRecord): boolean {
  return !!mutation.addedNodes
}
