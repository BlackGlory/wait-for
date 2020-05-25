# wait-for

## Install

```sh
npm install --save @blackglory/wait-for
# or
yarn add @blackglory/wait-for
```

## API

* `waitForAttached(...nodes: Node[]): Promise<void>`
* `waitForDetached(...nodes: Node[]): Promise<void>`
* `waitForSelectorAttached(selector: string): Promise<Element[]>`
* `waitForSelectorDetached(selector: string): Promise<void>`
* `waitForEvent<T extends EventTarget = Element>(target: EventTarget, event: string): Promise<T>`
* `waitForDOMContentLoaded (): Promise<void>`
* `waitForLoad(): Promise<void>`
* `waitForFunction<T>(fn: () => T | PromiseLike<T>): Promise<T>`
* `waitForTimeout(ms: number): Promise<void>`
