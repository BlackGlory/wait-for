import { waitForStateChanged } from '@src/wait-for-state-changed'

describe('waitForStateChanged(): Promise<void>', () => {
  it('resolves when location.hash changed', async () => {
    const promise = waitForStateChanged()
    queueMicrotask(() => location.hash = 'test')
    const result = await promise

    expect(result).toBeUndefined()
  })

  it('resolves when history.back called', async () => {
    history.pushState(null, 'test')

    const promise = waitForStateChanged()
    queueMicrotask(() => history.back())
    const result = await promise

    expect(result).toBeUndefined()
  })

  it('resolves when history.forward called', async () => {
    history.pushState(null, 'test')
    await historyBack()

    const promise = waitForStateChanged()
    queueMicrotask(() => history.forward())
    const result = await promise

    expect(result).toBeUndefined()
  })

  it('resolves when history.go called', async () => {
    history.pushState(null, 'test')
    history.pushState(null, 'test')
    await historyBack()
    await historyBack()

    const promise = waitForStateChanged()
    queueMicrotask(() => history.go(2))
    const result = await promise

    expect(result).toBeUndefined()
  })

  it('resolves when history.pushState called', async () => {
    const promise = waitForStateChanged()
    queueMicrotask(() => history.pushState(null, 'test'))
    const result = await promise

    expect(result).toBeUndefined()
  })

  it('resolves when history.replaceState called', async () => {
    const promise = waitForStateChanged()
    queueMicrotask(() => history.replaceState(null, 'test'))
    const result = await promise

    expect(result).toBeUndefined()
  })
})

function historyBack() {
  history.back()
  return waitForStateChanged() // history.back() is async
}
