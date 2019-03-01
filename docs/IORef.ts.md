---
title: IORef.ts
nav_order: 47
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
- [IORef](#ioref)
  - [write](#write)
  - [modify](#modify)
- [newIORef](#newioref)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

Mutable references in the `IO` monad

# IORef

**Signature** (class)

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

## write

**Signature** (method)

```ts
write(a: A): IO<void> { ... }
```

Added in v1.8.0

## modify

**Signature** (method)

```ts
modify(f: (a: A) => A): IO<void> { ... }
```

Added in v1.8.0

# newIORef

**Signature** (function)

```ts
export const newIORef = <A>(a: A): IO<IORef<A>> => ...
```

Added in v1.8.0
