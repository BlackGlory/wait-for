import { observeURLChanges } from '@blackglory/observe'
import { firstValueFrom } from 'rxjs'

export async function waitForUrlChanged(): Promise<void> {
  await firstValueFrom(observeURLChanges())
}
