# wait-for

## Install

```sh
npm install --save @blackglory/wait-for
# or
yarn add @blackglory/wait-for
```

## API

* `function waitForAttached(...nodes: Node[]): Promise<void>`
* `function waitForDetached(...nodes: Node[]): Promise<void>`
* `function waitForSelectorAttached(selector: string): Promise<Element[]>`
* `function waitForSelectorDetached(selector: string): Promise<void>`
* `function waitForEvent<T extends EventTarget = Element>(target: EventTarget, event: string): Promise<T>`
* `function waitForDOMContentLoaded (): Promise<void>`
* `function waitForLoad(): Promise<void>`
* `function waitForFunction<T>(fn: () => T | PromiseLike<T>): Promise<T>`
* `function waitForTimeout(ms: number): Promise<void>`
* `function waitForStateChanged(): Promise<void>`
* `function waitForUrlChanged(): Promise<void>`
