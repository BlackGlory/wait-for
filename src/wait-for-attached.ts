import { fromMutationObserver } from './shared/from-mutation-observer'
import { filter, flatMap } from 'rxjs/operators'

export function waitForAttached(...nodes: Node[]): Promise<void> {
  return new Promise(resolve => {
    if (isAttached(nodes)) return resolve()

    const observer = fromMutationObserver(document.documentElement, { childList: true, subtree: true }).pipe(
      flatMap(mutations => mutations)
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
