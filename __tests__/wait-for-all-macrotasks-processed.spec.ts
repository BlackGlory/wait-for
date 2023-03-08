import { waitForAllMacrotasksProcessed } from '@src/wait-for-all-macrotasks-processed.js'

describe('waitForAllMacrotasksProcessed', () => {
  test('queue, wait', async () => {
    let called = false

    queueMicrotask(() => called = true)
    await waitForAllMacrotasksProcessed()

    expect(called).toBe(true)
  })

  test('wait, queue', async () => {
    let called = false

    const promise = waitForAllMacrotasksProcessed()
    queueMicrotask(() => called = true)
    await promise

    expect(called).toBe(true)
  })
})
