import { fromMutationObserver } from '@utils/from-mutation-observer.js'
import { filter, mergeMap } from 'rxjs/operators'

export function waitForAttached(...nodes: Node[]): Promise<void> {
  return new Promise(resolve => {
    if (isAttached(nodes)) return resolve()

    const observer = fromMutationObserver(
      document.documentElement
    , { childList: true, subtree: true }
    ).pipe(
      mergeMap(mutations => mutations)
    , filter(isAddedNodesMutation)
    ).subscribe(() => {
      if (isAttached(nodes)) {
        observer.unsubscribe()
        resolve()
      }
    })
  })
}

function isAttached(nodes: Node[]): boolean {
  return nodes.every(x => document.documentElement.contains(x))
}

function isAddedNodesMutation(mutation: MutationRecord): boolean {
  return !!mutation.addedNodes
}
