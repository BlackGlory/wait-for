import { waitForIdleCallback } from '@src/wait-for-idle-callback.js'

// JSDOM does not polyfill `requestIdleCallback`
globalThis.requestIdleCallback = (
  callback: IdleRequestCallback
, options?: IdleRequestOptions | undefined
): number => {
  return setTimeout(callback, 0)
}

test('waitForIdleCallback', async () => {
  const options = {}
  const requestIdleCallback = vi.spyOn(globalThis, 'requestIdleCallback')

  await waitForIdleCallback(options)

  expect(requestIdleCallback).toBeCalledTimes(1)
  expect(requestIdleCallback).toBeCalledWith(expect.any(Function), options)
})
