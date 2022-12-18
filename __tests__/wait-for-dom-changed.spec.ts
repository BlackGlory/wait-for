import { waitForDOMChanged } from '@src/wait-for-dom-changed'

describe('waitForDOMChanged(): Promise<void>', () => {
  it('resolves when dom changed', async () => {
    document.body.innerHTML = ''
    const target = document.createElement('div')
    document.body.append(target)

    const promise = waitForDOMChanged()
    queueMicrotask(() => target.id = 'target')
    const result = await promise

    expect(result).toBeUndefined()
  })
})
