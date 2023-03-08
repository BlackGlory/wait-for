import { waitForAttached } from '@src/wait-for-attached.js'

describe('waitForAttached(nodes: Node[]): Promise<void>', () => {
  describe('element exists', () => {
    it('resolves immediately', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'
      document.body.append(target)

      const result = await waitForAttached(target)

      expect(result).toBeUndefined()
    })
  })

  describe('element does not exist', () => {
    it('resolves when the node attached', async () => {
      document.body.innerHTML = ''
      const target = document.createElement('div')
      target.id = 'target'

      const promise = waitForAttached(target)
      queueMicrotask(() => document.body.append(target))
      const result = await promise

      expect(result).toBeUndefined()
    })
  })
})
