import { waitForVideoFrameCallback } from '@src/wait-for-video-frame-callback.js'

test('waitForVideoFrameCallback', async () => {
  const video = document.createElement('video')
  // JSDOM does not polyfill `video.requestVideoFrameCallback`
  const requestVideoFrameCallback = vi.fn<typeof video.requestVideoFrameCallback>(
    callback => {
      queueMicrotask(() => callback(0, {
        expectedDisplayTime: 0
      , height: 0
      , mediaTime: 0
      , presentationTime: 0
      , presentedFrames: 0
      , width: 0
      }))

      return 0
    }
  )
  video.requestVideoFrameCallback = requestVideoFrameCallback

  await waitForVideoFrameCallback(video)

  expect(requestVideoFrameCallback).toBeCalledTimes(1)
})
