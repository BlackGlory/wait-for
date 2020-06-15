import { waitForUrlChanged } from '@src/wait-for-url-changed'
import 'core-js/web/queue-microtask'
import '@test/matchers'

describe('waitForUrlChanged(): Promise<void>', () => {
  it('resolves when url changed', async () => {
    const result = waitForUrlChanged()
    queueMicrotask(() => location.hash = 'test')
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})
