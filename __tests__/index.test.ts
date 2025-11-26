import * as Index from '@src/index.js'

test('Index', () => {
  expect(Object.keys(Index).sort()).toEqual([
    'waitForDOMChanged'
  , 'waitForAttached'
  , 'waitForDetached'

  , 'waitForElementsMatchingSelectorAttached'
  , 'waitForAllElementsMatchingSelectorDetached'

  , 'waitForEventTarget'
  , 'waitForEventEmitter'
  , 'waitForEmitter'
  , 'waitForDOMContentLoaded'
  , 'waitForLoad'
  , 'waitForComplete'
  , 'waitForInteractiveOrComplete'

  , 'waitForFunction'
  , 'waitForTimeout'
  , 'waitForSchedule'

  , 'waitForStateChanged'
  , 'waitForUrlChanged'

  , 'waitForAllMicrotasksProcessed'
  , 'waitForAllMacrotasksProcessed'

  , 'waitForIdleCallback'
  , 'waitForAnimationFrame'

  , 'waitForVideoFrameCallback'
  ].sort())
})
