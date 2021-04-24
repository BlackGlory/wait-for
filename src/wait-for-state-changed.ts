import { firstValueFrom } from 'rxjs'
import { observeStateChanges } from '@blackglory/observe'

export async function waitForStateChanged(): Promise<void> {
  await firstValueFrom(observeStateChanges())
}
