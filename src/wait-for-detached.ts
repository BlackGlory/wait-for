import { fromMutationObserver } from './shared/from-mutation-observer'
import { filter, flatMap } from 'rxjs/operators'

export function waitForDetached(...nodes: Node[]): Promise<void> {
  return new Promise(resolve => {
    if (isDetached(nodes)) return resolve()

    const observer = fromMutationObserver(document.documentElement, { childList: true, subtree: true }).pipe(
      flatMap(mutations => mutations)
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
