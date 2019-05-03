---
title: IO.ts
nav_order: 44
parent: Modules
---

# Overview

`IO<A>` represents a synchronous computation that yields a value of type `A` and **never fails**.
If you want to represent a synchronous computation that may fail, please see `IOEither`.

---

<h2 class="text-delta">Table of contents</h2>

- [IO (interface)](#io-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [io (constant)](#io-constant)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [run (function)](#run-function)

---

# IO (interface)

**Signature**

```ts
export interface IO<A> {
  (): A
}
```

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# io (constant)

**Signature**

```ts
export const io: Monad1<URI> & MonadIO1<URI> = ...
```

Added in v2.0.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => ...
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => ...
```

Added in v2.0.0

# run (function)

**Signature**

```ts
export const run = <A>(fa: IO<A>): A => ...
```

Added in v2.0.0
