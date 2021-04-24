import { waitForAllElementsMatchingSelectorDetached } from '@src/wait-for-all-elements-matching-selector-detached'
import 'core-js/web/queue-microtask'
import '@blackglory/jest-matchers'

describe(`
  waitForAllElementsMatchingSelectorDetached(
    selector: string
  ): Promise<void>
`, () => {
  describe('elements do not exist', () => {
    it('resolves immediately', async () => {
      document.body.innerHTML = ''

      const result = waitForAllElementsMatchingSelectorDetached('#target')
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })

  describe('elements exist', () => {
    it('resolves when all elements detached', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'
      document.body.append(target)

      const result = waitForAllElementsMatchingSelectorDetached('#target')
      queueMicrotask(() => target.remove())
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })
})
