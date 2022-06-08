import { waitForEmitter } from '@src/wait-for-emitter'
import '@blackglory/jest-matchers'
import { Emitter } from '@blackglory/structures'

test('waitForEmitter', async () => {
  const value = 'value'
  const emitter = new Emitter()
  const addEventListener = jest.spyOn(emitter, 'once')

  try {
    const result = waitForEmitter(emitter, 'message')
    queueMicrotask(() => emitter.emit('message', value))
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual([value])

    expect(addEventListener).toBeCalledTimes(1)
    expect(addEventListener).toBeCalledWith('message', expect.any(Function))
  } finally {
    addEventListener.mockRestore()
  }
})
