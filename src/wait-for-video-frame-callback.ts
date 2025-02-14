export function waitForVideoFrameCallback(
  video: HTMLVideoElement
): Promise<Parameters<VideoFrameRequestCallback>> {
  return new Promise<Parameters<VideoFrameRequestCallback>>(resolve => {
    video.requestVideoFrameCallback((...args) => resolve(args))
  })
}
