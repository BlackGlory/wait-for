import { waitForEvent } from '@src/wait-for-event'
import 'core-js/web/queue-microtask'
import '@blackglory/jest-matchers'

describe('waitForEvent<T extends EventTarget = Element>(target: EventTarget, event: string): Promise<T>', () => {
  it('resolves when the event triggered', async () => {
    const ul = document.createElement('ul')
    const addEventListener = jest.spyOn(ul, 'addEventListener')
    const li = document.createElement('li')
    ul.append(li)

    try {
      const result = waitForEvent(ul, 'click')
      queueMicrotask(() => li.dispatchEvent(new Event('click', { bubbles: true })))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(li)
      expect(addEventListener).toBeCalledTimes(1)
      expect(addEventListener).toBeCalledWith('click', expect.any(Function), { once: true })
    } finally {
      addEventListener.mockRestore()
    }
  })
})
