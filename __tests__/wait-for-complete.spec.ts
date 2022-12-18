import { waitForComplete } from '@src/wait-for-complete'

describe('waitForComplete(): Promise<void>', () => {
  describe('document.readyState = loading', () => {
    it('add a readystatechange event listener to document', async () => {
      const addEventListener = jest.spyOn(document, 'addEventListener')
      setReadyState('loading')

      try {
        const promise = waitForComplete()
        queueMicrotask(() => {
          setReadyState('interactive')
          document.dispatchEvent(new Event('readystatechange'))
          setReadyState('complete')
          document.dispatchEvent(new Event('readystatechange'))
        })
        const result = await promise

        expect(result).toBeUndefined()
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
        const promise = waitForComplete()
        queueMicrotask(() => {
          setReadyState('complete')
          document.dispatchEvent(new Event('readystatechange'))
        })
        const result = await promise

        expect(result).toBeUndefined()
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
        const result = await waitForComplete()

        expect(result).toBeUndefined()
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
