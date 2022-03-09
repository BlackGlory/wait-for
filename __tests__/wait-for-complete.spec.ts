import { waitForComplete } from '@src/wait-for-complete'
import '@blackglory/jest-matchers'

describe('waitForComplete(): Promise<void>', () => {
  describe('document.readyState = loading', () => {
    it('add a readystatechange event listener to document', async () => {
      const addEventListener = jest.spyOn(document, 'addEventListener')
      setReadyState('loading')

      try {
        const result = waitForComplete()
        queueMicrotask(() => {
          setReadyState('interactive')
          document.dispatchEvent(new Event('readystatechange'))
          setReadyState('complete')
          document.dispatchEvent(new Event('readystatechange'))
        })
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeUndefined()
        expect(addEventListener).toBeCalledTimes(1)
      } finally {
        addEventListener.mockRestore()
      }
    })
  })

  describe('document.readyState = interactive', () => {
    it('add a readystatechange event listener to document', async () => {
      const addEventListener = jest.spyOn(document, 'addEventListener')
      setReadyState('interactive')

      try {
        const result = waitForComplete()
        queueMicrotask(() => {
          setReadyState('complete')
          document.dispatchEvent(new Event('readystatechange'))
        })
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeUndefined()
        expect(addEventListener).toBeCalledTimes(1)
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
        const result = waitForComplete()
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
