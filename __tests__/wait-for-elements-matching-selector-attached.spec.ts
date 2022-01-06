import { waitForElementsMatchingSelectorAttached } from '@src/wait-for-elements-matching-selector-attached'
import '@blackglory/jest-matchers'

describe(`
  waitForElementsMatchingSelectorAttached(
    selector: string
  ): Promise<Element[]>
`, () => {
  describe('elements exist', () => {
    it('resolves immediately', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'
      document.body.append(target)

      const result = waitForElementsMatchingSelectorAttached('#target')
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([target])
    })
  })

  describe('elements do not exist', () => {
    it('resolves when any element matches selector attached', async () => {
      document.body.innerHTML = ''
      const container = document.createElement('div')
      const target = document.createElement('div')
      target.id = 'target'
      container.append(target)

      const result = waitForElementsMatchingSelectorAttached('#target')
      queueMicrotask(() => document.body.append(container))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([target])
    })
  })
})
