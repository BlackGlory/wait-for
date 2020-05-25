import { waitForDOMContentLoaded } from '@src/wait-for-dom-content-loaded'
import 'core-js/web/queue-microtask'
import '@test/matchers'

describe('waitForDOMContentLoaded(): Promise<void>', () => {
  describe('document.readyState = loading', () => {
    it('add a load event listener to document', async () => {
      const addEventListener = jest.spyOn(document, 'addEventListener')
      setReadyState('loading')

      try {
        const result = waitForDOMContentLoaded()
        queueMicrotask(() => document.dispatchEvent(new Event('DOMContentLoaded')))
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeUndefined()
        expect(addEventListener).toBeCalledTimes(1)
        expect(addEventListener).toBeCalledWith('DOMContentLoaded', expect.any(Function), { once: true })
      } finally {
        addEventListener.mockRestore()
      }
    })
  })

  describe('document.readyState = interactive', () => {
    it('resolves immediately', async () => {
      const addEventListener = jest.spyOn(document, 'addEventListener')
      setReadyState('interactive')

      try {
        const result = waitForDOMContentLoaded()
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeUndefined()
        expect(addEventListener).not.toBeCalled()
      } finally {
        addEventListener.mockRestore()
      }
    })
  })

  describe('document.readyState = complete', () => {
    it('resolves immediately', async () => {
      const addEventListener = jest.spyOn(document, 'addEventListener')
      setReadyState('complete')

      try {
        const result = waitForDOMContentLoaded()
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeUndefined()
        expect(addEventListener).not.toBeCalled()
      } finally {
        addEventListener.mockRestore()
      }
    })
  })
})

function setReadyState(state: typeof document.readyState) {
  Object.defineProperty(document, 'readyState', {
    get() {
      return state
    }
  , configurable: true
  })
}
