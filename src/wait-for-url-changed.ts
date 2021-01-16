import { fromUrlChanged } from './shared/from-url-changed'
import { firstValueFrom } from 'rxjs'

export async function waitForUrlChanged(): Promise<void> {
  await firstValueFrom(fromUrlChanged())
}
