import { waitForElementsMatchingSelectorAttached } from '@src/wait-for-elements-matching-selector-attached'

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

      const result = await waitForElementsMatchingSelectorAttached('#target')

      expect(result).toEqual([target])
    })
  })

  describe('elements do not exist', () => {
    it('resolves when any element matches selector attached', async () => {
      document.body.innerHTML = ''
      const container = document.createElement('div')
      const target = document.createElement('div')
      target.id = 'target'
      container.append(target)

      const promise = waitForElementsMatchingSelectorAttached('#target')
      queueMicrotask(() => document.body.append(container))
      const result = await promise

      expect(result).toEqual([target])
    })
  })
})
