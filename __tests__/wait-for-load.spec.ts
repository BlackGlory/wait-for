import { waitForLoad } from '@src/wait-for-load.js'

describe('waitForLoad(): Promise<void>', () => {
  describe('document.readyState = loading', () => {
    it('adds a load event listener to window', async () => {
      const addEventListener = vi.spyOn(window, 'addEventListener')
      setReadyState('loading')

      try {
        const promise = waitForLoad()
        queueMicrotask(() => window.dispatchEvent(new Event('load')))
        const result = await promise

        expect(result).toBeUndefined()
        expect(addEventListener).toBeCalledTimes(1)
        expect(addEventListener).toBeCalledWith('load', expect.any(Function), { once: true })
      } finally {
        addEventListener.mockRestore()
      }
    })
  })

  describe('document.readyState = interactive', () => {
    it('adds a load event listener to window', async () => {
      const addEventListener = vi.spyOn(window, 'addEventListener')
      setReadyState('interactive')

      try {
        const promise = waitForLoad()
        queueMicrotask(() => window.dispatchEvent(new Event('load')))
        const result = await promise

        expect(result).toBeUndefined()
        expect(addEventListener).toBeCalledTimes(1)
        expect(addEventListener).toBeCalledWith('load', expect.any(Function), { once: true })
      } finally {
        addEventListener.mockRestore()
      }
    })
  })

  describe('document.readyState = complete', () => {
    it('resolves immediately', async () => {
      const addEventListener = vi.spyOn(window, 'addEventListener')
      setReadyState('complete')

      try {
        const result = await waitForLoad()

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
