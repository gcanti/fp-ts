---
id: IORef
title: Module IORef
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IORef.ts)

## Data

### IORef

_data_

_since 1.8.0_

_Signature_

```ts
constructor(private value: A) {
    this.read = new IO(() => this.value)
  }
```

_Description_

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

## Methods

### modify

_method_

_since 1.8.0_

_Signature_

```ts
(f: (a: A) => A): IO<void>
```

### write

_method_

_since 1.8.0_

_Signature_

```ts
(a: A): IO<void>
```

## Functions

### newIORef

_function_

_since 1.8.0_

_Signature_

```ts
<A>(a: A): IO<IORef<A>>
```
