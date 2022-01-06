import { waitForEventTarget } from '@src/wait-for-event-target'
import '@blackglory/jest-matchers'

describe('waitForEventTarget<T extends EventTarget>(target: T, event: string): Promise<T>', () => {
  it('resolves when the event triggered', async () => {
    const ul = document.createElement('ul')
    const addEventListener = jest.spyOn(ul, 'addEventListener')
    const li = document.createElement('li')
    ul.append(li)

    try {
      const result = waitForEventTarget(ul, 'click')
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
