import { animationFrames } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

export function fromUrlChanged() {
  let url = document.URL
  return animationFrames().pipe(
    filter(() => url !== document.URL)
  , tap(() => url = document.URL)
  )
}
