---
id: IORef
title: Module IORef
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IORef.ts)

# IORef

```ts
constructor(private value: A) {
    this.read = new IO(() => this.value)
  }
```

Added in v1.8.0 (data)

Mutable references in the `IO` monad

_Example_

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

```ts
(f: (a: A) => A): IO<void>
```

Added in v1.8.0 (method)

## write

```ts
(a: A): IO<void>
```

Added in v1.8.0 (method)

## newIORef

```ts
<A>(a: A): IO<IORef<A>>
```

Added in v1.8.0 (function)
