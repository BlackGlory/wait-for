import { waitForFunction } from '@src/wait-for-function'
import '@blackglory/jest-matchers'

describe('waitForFunction<T>(fn: () => boolean | PromiseLike<boolean>): Promise<T>', () => {
  describe('fn returns a falsy value', () => {
    it('calls requestAnimationFrame', async () => {
      const raf = jest.spyOn(window, 'requestAnimationFrame')
      const fn = jest.fn().mockReturnValueOnce(false).mockReturnValue(true)

      try {
        await waitForFunction(fn)

        expect(raf).toBeCalledTimes(1)
      } finally {
        raf.mockRestore()
      }
    })

    it('loop until fn returning a truthy value', async () => {
      const returnValue = 64
      const fn = jest.fn()
        .mockReturnValueOnce(Promise.resolve(false))
        .mockReturnValue(Promise.resolve(returnValue))

      const result = waitForFunction(fn)
      const proResult = await result

      expect(result).toBePromise()
      expect(fn).toBeCalledTimes(2)
      expect(proResult).toBe(64)
    })
  })

  describe('fn returns a truthy value', () => {
    it('resolves immediately', async () => {
      const raf = jest.spyOn(window, 'requestAnimationFrame')
      const returnValue = 89
      const fn = jest.fn().mockReturnValue(Promise.resolve(returnValue))

      try {
        const result = waitForFunction(fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(raf).not.toBeCalled()
        expect(fn).toBeCalledTimes(1)
        expect(proResult).toBe(returnValue)
      } finally {
        raf.mockRestore()
      }
    })
  })
})
