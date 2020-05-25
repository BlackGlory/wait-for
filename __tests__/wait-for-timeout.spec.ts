import { waitForTimeout } from '@src/wait-for-timeout'
import '@test/matchers'

describe('waitForTimeout(ms: number): Promise<void>', () => {
  it('calls setTimeout', () => {
    jest.useFakeTimers()
    const ms = 500

    waitForTimeout(ms)

    expect(setTimeout).toBeCalledTimes(1)
    expect(setTimeout).toBeCalledWith(expect.any(Function), ms)
  })

  it('resolves after ms', async () => {
    jest.useFakeTimers()
    const ms = 500

    const result = waitForTimeout(ms)
    jest.advanceTimersByTime(500)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})
