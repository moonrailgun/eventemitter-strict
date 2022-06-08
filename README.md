# eventemitter-ts

A eventemitter with typescript full support

`eventemitter-ts` is a eventemitter with typescript full support. The module is API compatible with the EventEmitter that ships by default with Node.js.

Allow to type safe definition your eventemitter

## Feature

- typesafe
- compatible with nodejs
- simple but strong

## Install

```bash
npm install eventemitter-ts
```

## Usage

```typescript
import { EventEmitter } from 'eventemitter-ts';

interface FooEventMap {
  eventA: () => void;
  eventB: (num: number) => void;
}

const ee = new EventEmitter<FooEventMap>();
ee.emit('eventA');
ee.emit('eventB', 1);
ee.emit('eventB', "Any"); // this will throw error in ts
```

or use with extends

```typescript
import { EventEmitter } from 'eventemitter-ts';

interface FooEventMap {
  eventA: () => void;
  eventB: (num: number) => void;
}

class Foo extends EventEmitter<FooEventMap> {
  bar() {
    this.emit('eventA');
    this.emit('eventB', 1);
    this.emit('eventB', "Any"); // this will throw error in ts
  }
}
```

## License

[MIT](./LICENSE)
