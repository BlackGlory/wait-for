import { waitForStateChanged } from '@src/wait-for-state-changed'
import '@blackglory/jest-matchers'

describe('waitForStateChanged(): Promise<void>', () => {
  it('resolves when location.hash changed', async () => {
    const result = waitForStateChanged()
    queueMicrotask(() => location.hash = 'test')
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('resolves when history.back called', async () => {
    history.pushState(null, 'test')
    const result = waitForStateChanged()
    queueMicrotask(() => history.back())
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('resolves when history.forward called', async () => {
    history.pushState(null, 'test')
    await historyBack()

    const result = waitForStateChanged()
    queueMicrotask(() => history.forward())
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('resolves when history.go called', async () => {
    history.pushState(null, 'test')
    history.pushState(null, 'test')
    await historyBack()
    await historyBack()

    const result = waitForStateChanged()
    queueMicrotask(() => history.go(2))
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('resolves when history.pushState called', async () => {
    const result = waitForStateChanged()
    queueMicrotask(() => history.pushState(null, 'test'))
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('resolves when history.replaceState called', async () => {
    const result = waitForStateChanged()
    queueMicrotask(() => history.replaceState(null, 'test'))
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function historyBack() {
  history.back()
  return waitForStateChanged() // history.back() is async
}
