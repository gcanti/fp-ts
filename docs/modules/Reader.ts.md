---
title: Reader.ts
nav_order: 67
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Reader (interface)](#reader-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [ask (constant)](#ask-constant)
- [asks (constant)](#asks-constant)
- [local (constant)](#local-constant)
- [reader (constant)](#reader-constant)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)

---

# Reader (interface)

**Signature**

```ts
export interface Reader<R, A> {
  (r: R): A
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

Added in v2.0.0

# ask (constant)

Reads the current context

**Signature**

```ts
export const ask: <R>() => Reader<R, R> = ...
```

Added in v2.0.0

# asks (constant)

Projects a value from the global context in a Reader

**Signature**

```ts
export const asks: <R, A>(f: (r: R) => A) => Reader<R, A> = ...
```

Added in v2.0.0

# local (constant)

changes the value of the local context during the execution of the action `ma`

**Signature**

```ts
export const local: <Q, R>(f: (d: Q) => R) => <A>(ma: Reader<R, A>) => Reader<Q, A> = ...
```

Added in v2.0.0

# reader (constant)

**Signature**

```ts
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = ...
```

Added in v2.0.0

# getMonoid (function)

**Signature**

```ts
export function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>> { ... }
```

Added in v2.0.0
