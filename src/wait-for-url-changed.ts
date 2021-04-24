import { fromUrlChanged } from '@utils/from-url-changed'
import { firstValueFrom } from 'rxjs'

export async function waitForUrlChanged(): Promise<void> {
  await firstValueFrom(fromUrlChanged())
}
