import { fromMutationObserver } from '@utils/from-mutation-observer'
import { filter, mergeMap } from 'rxjs/operators'

export function waitForDetached(...nodes: Node[]): Promise<void> {
  return new Promise(resolve => {
    if (isDetached(nodes)) return resolve()

    const observer = fromMutationObserver(
      document.documentElement
    , { childList: true, subtree: true }
    ).pipe(
      mergeMap(mutations => mutations)
    , filter(isRemovedNodesMutation)
    ).subscribe(() => {
      if (isDetached(nodes)) {
        observer.unsubscribe()
        resolve()
      }
    })
  })
}

function isDetached(nodes: Node[]): boolean {
  return nodes.every(x => !document.documentElement.contains(x))
}

function isRemovedNodesMutation(mutation: MutationRecord): boolean {
  return !!mutation.removedNodes
}
