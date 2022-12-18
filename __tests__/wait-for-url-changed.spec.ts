import { waitForUrlChanged } from '@src/wait-for-url-changed'

describe('waitForUrlChanged(): Promise<void>', () => {
  it('resolves when url changed', async () => {
    const promise = waitForUrlChanged()
    queueMicrotask(() => location.hash = 'test')
    const result = await promise

    expect(result).toBeUndefined()
  })
})
