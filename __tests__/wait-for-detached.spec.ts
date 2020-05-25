import { waitForDetached } from '@src/wait-for-detached'
import 'core-js/web/queue-microtask'
import '@test/matchers'

describe('waitForDetached(nodes: Node[]): Promise<void>', () => {
  describe('element exists', () => {
    it('resolves immediately', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'

      const result = waitForDetached(target)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })

  describe('element does not exist', () => {
    it('resolves when the node detached', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'

      const result = waitForDetached(target)
      queueMicrotask(() => target.remove())
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })
})
