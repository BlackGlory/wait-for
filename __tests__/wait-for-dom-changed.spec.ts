import { waitForDOMChanged } from '@src/wait-for-dom-changed'
import '@blackglory/jest-matchers'

describe('waitForDOMChanged(): Promise<void>', () => {
  it('resolves when dom changed', async () => {
    document.body.innerHTML = ''
    const target = document.createElement('div')
    document.body.append(target)

    const result = waitForDOMChanged()
    queueMicrotask(() => target.id = 'target')
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})
