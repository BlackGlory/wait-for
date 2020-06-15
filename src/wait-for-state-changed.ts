import { Observable, fromEvent, merge } from 'rxjs'
import { first } from 'rxjs/operators'

export async function waitForStateChanged(): Promise<void> {
  const source = merge(
    fromPushState()
  , fromReplaceState()
  , fromEvent(window, 'popstate')
  ).pipe(first())
  await source.toPromise()
}

function fromPushState(): Observable<void> {
  return new Observable(observer => {
    const pushState = history.pushState
    history.pushState = function (...args) {
      Reflect.apply(pushState, this, args)
      observer.next()
      observer.complete()
    }
  })
}

function fromReplaceState(): Observable<void> {
  return new Observable(observer => {
    const replaceState = history.replaceState
    history.replaceState = function (...args) {
      Reflect.apply(replaceState, this, args)
      observer.next()
      observer.complete()
    }
  })
}
