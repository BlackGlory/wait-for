# wait-for
A module for waiting for things to happen.

## Install
```sh
npm install --save @blackglory/wait-for
# or
yarn add @blackglory/wait-for
```

## API
### waitForDOMChanged
```ts
function waitForDOMChanged(): Promies<void>
```

### waitForAttached
```ts
function waitForAttached(...nodes: Node[]): Promise<void>
```

### waitForDetached
```ts
function waitForDetached(...nodes: Node[]): Promise<void>
```

### waitForElementsMatchingSelectorAttached
```ts
function waitForElementsMatchingSelectorAttached(
  selector: string
): Promise<Element[]>
```

### waitForElementsMatchingSelectorAttached
```ts
function waitForElementsMatchingSelectorAttached(
  selector: string
): Promise<Element[]>
```

### waitForAllElementsMatchingSelectorDetached
```ts
function waitForAllElementsMatchingSelectorDetached(
  selector: string
): Promise<void>
```

### waitForEventTarget
```ts
function waitForEventTarget<T extends EventTarget>(
  target: T
, event: string
): Promise<T>
```

### waitForEventEmitter
```ts
function waitForEventEmitter<T extends EventEmitter>(
  target: T
, event: string
): Promise<T>
```

### waitForEmitter
```ts
export function waitForEmitter<
  EventToArgs extends Record<string, unknown[]>
, Event extends keyof EventToArgs
>(
  target: Emitter<EventToArgs>
, event: Event
): Promise<EventToArgs[Event]>
```

### waitForDOMContentLoaded
```ts
function waitForDOMContentLoaded(): Promise<void>
```

### waitForLoad
```ts
function waitForLoad(): Promise<void>
```

### waitForComplete
```ts
function waitForComplete(): Promise<void>
```

### waitForInteractiveOrComplete
```ts
function waitForInteractiveOrComplete(): Promise<void>
```

### waitForFunction
```ts
function waitForFunction<T>(
  fn: () => T | PromiseLike<T>
, interval: number = 0
): Promise<T>
```

### waitForTimeout
```ts
function waitForTimeout(ms: number): Promise<void>
```

### waitForStateChanged
```ts
function waitForStateChanged(): Promise<void>
```

### waitForUrlChanged
```ts
function waitForUrlChanged(): Promise<void>
```
