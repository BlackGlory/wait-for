import { fromUrlChanged } from './shared/from-url-changed'
import { first } from 'rxjs/operators'

export async function waitForUrlChanged(): Promise<void> {
  const source = fromUrlChanged().pipe(first())
  await source.toPromise()
}
