import { waitForAllMicrotasksProcessed } from '@src/wait-for-all-microtasks-processed.js'

describe('waitForAllMicrotasksProcessed', () => {
  test('wait, queue', async () => {
    let processed = false

    await waitForAllMicrotasksProcessed()
    queueMicrotask(() => processed = true)

    expect(processed).toBe(false)
  })

  test('queue, wait', async () => {
    let processed = false

    queueMicrotask(() => processed = true)
    await waitForAllMicrotasksProcessed()

    expect(processed).toBe(true)
  })
})
