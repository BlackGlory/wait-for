import * as Index from '@src/index'

test('Index', () => {
  expect(Object.keys(Index).sort()).toEqual([
    'waitForDOMChanged'
  , 'waitForAttached'
  , 'waitForDetached'

  , 'waitForSelectorAttached'
  , 'waitForSelectorDetached'

  , 'waitForEventTarget'
  , 'waitForEventEmitter'
  , 'waitForDOMContentLoaded'
  , 'waitForLoad'

  , 'waitForFunction'
  , 'waitForTimeout'

  , 'waitForStateChanged'
  , 'waitForUrlChanged'
  ].sort())
})
