import { waitForDetached } from '@src/wait-for-detached.js'

describe('waitForDetached(nodes: Node[]): Promise<void>', () => {
  describe('element exists', () => {
    it('resolves immediately', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'

      const result = await waitForDetached(target)

      expect(result).toBeUndefined()
    })
  })

  describe('element does not exist', () => {
    it('resolves when the node detached', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'

      const promise = waitForDetached(target)
      queueMicrotask(() => target.remove())
      const result = await promise

      expect(result).toBeUndefined()
    })
  })
})
