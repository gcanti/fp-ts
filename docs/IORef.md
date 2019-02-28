---
id: IORef
title: IORef
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IORef.ts)

# IORef

**Signature** (data type)

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

**Signature** (method)

```ts
modify(f: (a: A) => A): IO<void>  { ... }
```

Added in v1.8.0

## write

**Signature** (method)

```ts
write(a: A): IO<void>  { ... }
```

Added in v1.8.0

Added in v1.8.0

## newIORef

**Signature** (function)

```ts
export const newIORef = <A>(a: A): IO<IORef<A>> => { ... }
```

Added in v1.8.0
