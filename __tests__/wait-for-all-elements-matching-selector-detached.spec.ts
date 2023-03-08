import { waitForAllElementsMatchingSelectorDetached } from '@src/wait-for-all-elements-matching-selector-detached.js'

describe(`
  waitForAllElementsMatchingSelectorDetached(
    selector: string
  ): Promise<void>
`, () => {
  describe('elements do not exist', () => {
    it('resolves immediately', async () => {
      document.body.innerHTML = ''

      const result = await waitForAllElementsMatchingSelectorDetached('#target')

      expect(result).toBeUndefined()
    })
  })

  describe('elements exist', () => {
    it('resolves when all elements detached', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'
      document.body.append(target)

      const promise = waitForAllElementsMatchingSelectorDetached('#target')
      queueMicrotask(() => target.remove())
      const result = await promise

      expect(result).toBeUndefined()
    })
  })
})
