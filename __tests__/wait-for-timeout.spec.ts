import { waitForTimeout } from '@src/wait-for-timeout.js'

describe('waitForTimeout(ms: number): Promise<void>', () => {
  it('calls setTimeout', () => {
    vi.useFakeTimers()
    const setTimeout = vi.spyOn(globalThis, 'setTimeout')
    const ms = 500

    waitForTimeout(ms)

    expect(setTimeout).toBeCalledTimes(1)
    expect(setTimeout).toBeCalledWith(expect.any(Function), ms)
  })

  it('resolves after ms', async () => {
    vi.useFakeTimers()
    const ms = 500

    const promise = waitForTimeout(ms)
    vi.advanceTimersByTime(500)
    const result = await promise

    expect(result).toBeUndefined()
  })
})
