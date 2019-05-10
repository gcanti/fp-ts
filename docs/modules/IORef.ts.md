---
title: IORef.ts
nav_order: 48
parent: Modules
---

# Overview

Mutable references in the `IO` monad

---

<h2 class="text-delta">Table of contents</h2>

- [IORef (class)](#ioref-class)
  - [write (method)](#write-method)
  - [modify (method)](#modify-method)
- [newIORef (function)](#newioref-function)

---

# IORef (class)

**Signature**

```ts
export class IORef<A> {
  constructor(private value: A) { ... }
  ...
}
```

**Example**

```ts
import { io } from 'fp-ts/lib/IO'
import { newIORef } from 'fp-ts/lib/IORef'

assert.strictEqual(io.chain(newIORef(1), ref => io.chain(ref.write(2), () => ref.read))(), 2)
```

Added in v2.0.0

## write (method)

**Signature**

```ts
write(a: A): IO<void> { ... }
```

Added in v2.0.0

## modify (method)

**Signature**

```ts
modify(f: (a: A) => A): IO<void> { ... }
```

Added in v2.0.0

# newIORef (function)

**Signature**

```ts
export const newIORef = <A>(a: A): IO<IORef<A>> => ...
```

Added in v2.0.0
