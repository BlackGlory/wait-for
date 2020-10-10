import { waitForAttached } from '@src/wait-for-attached'
import 'core-js/web/queue-microtask'
import '@blackglory/jest-matchers'

describe('waitForAttached(nodes: Node[]): Promise<void>', () => {
  describe('element exists', () => {
    it('resolves immediately', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'
      document.body.append(target)

      const result = waitForAttached(target)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })

  describe('element does not exist', () => {
    it('resolves when the node attached', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'

      const result = waitForAttached(target)
      queueMicrotask(() => document.body.append(target))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })
})
