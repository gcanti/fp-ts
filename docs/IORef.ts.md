---
title: IORef.ts
nav_order: 47
---

# Overview

Mutable references in the `IO` monad

**Table of contents**

- [IORef (class)](#ioref-class)
  - [write (method)](#write-method)
  - [modify (method)](#modify-method)
- [newIORef (function)](#newioref-function)# IORef (class)

**Signature**

```ts
export class IORef<A> {
  constructor(private value: A) { ... }
  ...
}
```

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

Added in v1.8.0

## write (method)

**Signature**

```ts
write(a: A): IO<void> { ... }
```

Added in v1.8.0

## modify (method)

**Signature**

```ts
modify(f: (a: A) => A): IO<void> { ... }
```

Added in v1.8.0

# newIORef (function)

**Signature**

```ts
export const newIORef = <A>(a: A): IO<IORef<A>> => ...
```

Added in v1.8.0
