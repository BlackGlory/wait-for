import { waitForFunction } from '@src/wait-for-function'
import '@blackglory/jest-matchers'

const TIME_ERROR = 1

describe('waitForFunction<T>(fn: () => boolean | PromiseLike<boolean>, interval?: number): Promise<T>', () => {
  describe('fn returns a falsy value', () => {
    it('loop until fn returning a truthy value', async () => {
      const value = 64
      const fn = jest.fn()
        .mockReturnValueOnce(Promise.resolve(false))
        .mockReturnValue(Promise.resolve(value))

      const startTime = Date.now()
      const result = waitForFunction(fn, 1000)
      const proResult = await result
      const elapsed = Date.now() - startTime

      expect(result).toBePromise()
      expect(fn).toBeCalledTimes(2)
      expect(proResult).toBe(64)
      expect(elapsed).toBeGreaterThanOrEqual(1000 - TIME_ERROR)
    })
  })

  describe('fn returns a truthy value', () => {
    it('resolves immediately', async () => {
      const value = 89
      const fn = jest.fn().mockReturnValue(Promise.resolve(value))

      const startTime = Date.now()
      const result = waitForFunction(fn)
      const proResult = await result
      const elapsed = Date.now() - startTime

      expect(result).toBePromise()
      expect(fn).toBeCalledTimes(1)
      expect(proResult).toBe(value)
      expect(elapsed).toBeLessThan(1000 + TIME_ERROR)
    })
  })
})
