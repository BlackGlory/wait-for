import { fromMutationObserver } from '@utils/from-mutation-observer'
import { first } from 'rxjs/operators'

export async function waitForDOMChanged(): Promise<void> {
  const source = fromMutationObserver(document.documentElement, {
    attributes: true
  , characterData: true
  , childList: true
  , subtree: true
  }).pipe(first())

  await source.toPromise()
}
