import { observeAdditionOfDescendantNodes } from '@blackglory/observe'
import { toArray } from 'iterable-operator'

export function waitForElementsMatchingSelectorAttached(
  selector: string
): Promise<Element[]> {
  return new Promise(resolve => {
    const elements = document.querySelectorAll(selector)
    if (elements.length) return resolve(toArray(elements))

    const observer = observeAdditionOfDescendantNodes(document).subscribe(() => {
      const elements = document.querySelectorAll(selector)
      if (elements.length) {
        observer.unsubscribe()
        resolve(toArray(elements))
      }
    })
  })
}
