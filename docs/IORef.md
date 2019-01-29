---
id: IORef
title: Module IORef
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IORef.ts)

# IORef

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IORef.ts#L20-L41)

```ts
export class IORef<A> {
  constructor(private value: A) {
    this.read = new IO(() => this.value)
  }
  ...
}
```

Mutable references in the `IO` monad

**Example**

```ts
import { newIORef } from 'fp-ts/lib/IORef'

assert.strictEqual(
  newIORef(1)
    .chain(ref => ref.write(2).chain(() => ref.read))
    .run(),
  2
)
```

## modify

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IORef.ts#L36-L40)

```ts
modify(f: (a: A) => A): IO<void>  { ... }
```

Added in v1.8.0

## write

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IORef.ts#L28-L32)

```ts
write(a: A): IO<void>  { ... }
```

Added in v1.8.0

Added in v1.8.0

## newIORef

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IORef.ts#L47-L49)

```ts
export const newIORef = <A>(a: A): IO<IORef<A>> => { ... }
```

Added in v1.8.0
