import { waitForAnimationFrame } from '@src/wait-for-animation-frame.js'

test('waitForAnimationFrame', async () => {
  const requestAnimationFrame = vi.spyOn(globalThis, 'requestAnimationFrame')

  await waitForAnimationFrame()

  expect(requestAnimationFrame).toBeCalledTimes(1)
})
