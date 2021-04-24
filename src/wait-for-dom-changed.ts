import { fromMutationObserver } from '@utils/from-mutation-observer'
import { firstValueFrom } from 'rxjs'

export async function waitForDOMChanged(): Promise<void> {
  const source = fromMutationObserver(document.documentElement, {
    attributes: true
  , characterData: true
  , childList: true
  , subtree: true
  })

  await firstValueFrom(source)
}
