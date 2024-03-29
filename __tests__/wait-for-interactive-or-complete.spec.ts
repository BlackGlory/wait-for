import { waitForInteractiveOrComplete } from '@src/wait-for-interactive-or-complete.js'

describe('waitForInteractiveOrComplete(): Promise<void>', () => {
  describe('document.readyState = loading', () => {
    it('add a readystatechange event listener to document', async () => {
      const addEventListener = vi.spyOn(document, 'addEventListener')
      setReadyState('loading')

      try {
        const promise = waitForInteractiveOrComplete()
        queueMicrotask(() => {
          setReadyState('interactive')
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
    it('resolves immediately', async () => {
      const addEventListener = vi.spyOn(document, 'addEventListener')
      setReadyState('interactive')

      try {
        const result = await waitForInteractiveOrComplete()

        expect(result).toBeUndefined()
        expect(addEventListener).not.toBeCalled()
      } finally {
        addEventListener.mockRestore()
      }
    })
  })

  describe('document.readyState = complete', () => {
    it('resolves immediately', async () => {
      const addEventListener = vi.spyOn(document, 'addEventListener')
      setReadyState('complete')

      try {
        const result = await waitForInteractiveOrComplete()

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
