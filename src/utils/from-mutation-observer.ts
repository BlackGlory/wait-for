import { Observable } from 'rxjs'

export function fromMutationObserver(...args: Parameters<MutationObserver['observe']>) {
  return new Observable<MutationRecord[]>(subscriber => {
    const observer = new MutationObserver(mutationList => subscriber.next(mutationList))
    observer.observe(...args)
    return () => observer.disconnect()
  })
}
