---
title: IORef.ts
nav_order: 45
parent: Modules
---

# IORef overview

Mutable references in the `IO` monad

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [IORef (class)](#ioref-class)
  - [write (method)](#write-method)
  - [modify (method)](#modify-method)
  - [read (property)](#read-property)
- [newIORef](#newioref)

---

# IORef (class)

**Signature**

```ts
export declare class IORef<A> {
  constructor(private value: A)
}
```

**Example**

```ts
import { io } from 'fp-ts/lib/IO'
import { newIORef } from 'fp-ts/lib/IORef'

assert.strictEqual(io.chain(newIORef(1), (ref) => io.chain(ref.write(2), () => ref.read))(), 2)
```

Added in v2.0.0

## write (method)

**Signature**

```ts
write(a: A): IO<void>
```

Added in v2.0.0

## modify (method)

**Signature**

```ts
modify(f: (a: A) => A): IO<void>
```

Added in v2.0.0

## read (property)

**Signature**

```ts
readonly read: IO<A>
```

Added in v2.0.0

# newIORef

**Signature**

```ts
export declare function newIORef<A>(a: A): IO<IORef<A>>
```

Added in v2.0.0
