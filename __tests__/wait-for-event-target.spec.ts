import { waitForEventTarget } from '@src/wait-for-event-target'
import { AbortController } from 'extra-abort'
import { getErrorPromise } from 'return-style'
import '@blackglory/jest-matchers'

describe('waitForEventTarget', () => {
  it('resolves when the event triggered', async () => {
    const ul = document.createElement('div')
    const addEventListener = jest.spyOn(ul, 'addEventListener')
    const li = document.createElement('li')
    ul.append(li)

    const result = waitForEventTarget(ul, 'click')
    queueMicrotask(() => li.dispatchEvent(new Event('click', { bubbles: true })))
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeInstanceOf(Event)
    expect(proResult.target).toBe(li)
    expect(addEventListener).toBeCalledTimes(1)
    expect(addEventListener).toBeCalledWith('click', expect.any(Function), { once: true })
  })

  describe('rejects when the signal aborted', () => {
    test('signal aborted before listening', async () => {
      const controller = new AbortController()
      controller.abort()
      const target = new EventTarget()
      const addEventListener = jest.spyOn(target, 'addEventListener')
      const removeEventListener = jest.spyOn(target, 'removeEventListener')

      const err = await getErrorPromise(
        waitForEventTarget(target, 'event', controller.signal)
      )

      expect(err?.name).toBe('AbortError') // expect(err).toBeInstanceOf(AbortError)
      expect(addEventListener).not.toBeCalled()
      expect(removeEventListener).not.toBeCalled()
    })

    test('signal aborted after listening ', async () => {
      const controller = new AbortController()
      const target = new EventTarget()
      const addEventListener = jest.spyOn(target, 'addEventListener')
      const removeEventListener = jest.spyOn(target, 'removeEventListener')

      const promise = getErrorPromise(
        waitForEventTarget(target, 'event', controller.signal)
      )
      queueMicrotask(() => controller.abort())
      const err = await promise

      expect(err?.name).toBe('AbortError') // expect(err).toBeInstanceOf(AbortError)
      expect(addEventListener).toBeCalledTimes(1)
      expect(removeEventListener).toBeCalledTimes(1)
    })
  })
})
