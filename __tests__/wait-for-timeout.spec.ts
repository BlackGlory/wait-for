import { waitForTimeout } from '@src/wait-for-timeout'

describe('waitForTimeout(ms: number): Promise<void>', () => {
  it('calls setTimeout', () => {
    jest.useFakeTimers()
    const setTimeout = jest.spyOn(globalThis, 'setTimeout')
    const ms = 500

    waitForTimeout(ms)

    expect(setTimeout).toBeCalledTimes(1)
    expect(setTimeout).toBeCalledWith(expect.any(Function), ms)
  })

  it('resolves after ms', async () => {
    jest.useFakeTimers()
    const ms = 500

    const promise = waitForTimeout(ms)
    jest.advanceTimersByTime(500)
    const result = await promise

    expect(result).toBeUndefined()
  })
})
