import { fromMutationObserver } from '@utils/from-mutation-observer'
import { first } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs'

export async function waitForDOMChanged(): Promise<void> {
  const source = fromMutationObserver(document.documentElement, {
    attributes: true
  , characterData: true
  , childList: true
  , subtree: true
  }).pipe(first())

  await firstValueFrom(source)
}
