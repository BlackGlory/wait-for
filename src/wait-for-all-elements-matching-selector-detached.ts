import { observeRemovalsOfDescendantNodes } from '@blackglory/observe'
import { firstValueFrom } from 'rxjs'
import { filter } from 'rxjs/operators'

export async function waitForAllElementsMatchingSelectorDetached(
  selector: string
): Promise<void> {
  if (countElements(selector) === 0) return

  await firstValueFrom(
    observeRemovalsOfDescendantNodes(document).pipe(
      filter(() => countElements(selector) === 0)
    )
  )
}

function countElements(selector: string): number {
  return document.querySelectorAll(selector).length
}
