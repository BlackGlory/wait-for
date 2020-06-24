import * as Index from '@src/index'

test('Index', () => {
  expect(Object.keys(Index).sort()).toEqual([
    'waitForDOMChanged'
  , 'waitForAttached'
  , 'waitForDetached'

  , 'waitForSelectorAttached'
  , 'waitForSelectorDetached'

  , 'waitForEvent'
  , 'waitForDOMContentLoaded'
  , 'waitForLoad'

  , 'waitForFunction'
  , 'waitForTimeout'

  , 'waitForStateChanged'
  , 'waitForUrlChanged'
  ].sort())
})
