import { waitForFunction } from '@src/wait-for-function'
import '@blackglory/jest-matchers'

describe('waitForFunction<T>(fn: () => boolean | PromiseLike<boolean>): Promise<T>', () => {
  describe('fn returns a falsy value', () => {
    it('loop until fn returning a truthy value', async () => {
      const value = 64
      const fn = jest.fn()
        .mockReturnValueOnce(Promise.resolve(false))
        .mockReturnValue(Promise.resolve(value))

      const result = waitForFunction(fn)
      const proResult = await result

      expect(result).toBePromise()
      expect(fn).toBeCalledTimes(2)
      expect(proResult).toBe(64)
    })
  })

  describe('fn returns a truthy value', () => {
    it('resolves immediately', async () => {
      const value = 89
      const fn = jest.fn().mockReturnValue(Promise.resolve(value))

      const result = waitForFunction(fn)
      const proResult = await result

      expect(result).toBePromise()
      expect(fn).toBeCalledTimes(1)
      expect(proResult).toBe(value)
    })
  })
})
