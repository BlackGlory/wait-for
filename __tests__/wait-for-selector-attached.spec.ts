import { waitForSelectorAttached } from '@src/wait-for-selector-attached'
import 'core-js/web/queue-microtask'
import '@test/matchers'

describe(`waitForSelectorAttached(selector: string): Promise<Element>`, () => {
  describe('elements exist', () => {
    it('resolves immediately', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'
      document.body.append(target)

      const result = waitForSelectorAttached('#target')
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

      const result = waitForSelectorAttached('#target')
      queueMicrotask(() => document.body.append(container))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([target])
    })
  })
})
