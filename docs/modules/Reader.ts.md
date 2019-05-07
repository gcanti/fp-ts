---
title: Reader.ts
nav_order: 68
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
- [run (function)](#run-function)

---

# Reader (interface)

**Signature**

```ts
export interface Reader<E, A> {
  (e: E): A
}
```

Added in v2.0.0

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

# ask (constant)

Reads the current context

**Signature**

```ts
export const ask: <E>() => Reader<E, E> = ...
```

Added in v2.0.0

# asks (constant)

Projects a value from the global context in a Reader

**Signature**

```ts
export const asks: <E, A>(f: (e: E) => A) => Reader<E, A> = ...
```

Added in v2.0.0

# local (constant)

changes the value of the local context during the execution of the action `ma`

**Signature**

```ts
export const local: <E, A, D>(ma: Reader<E, A>, f: (d: D) => E) => Reader<D, A> = ...
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
export function getMonoid<E, A>(M: Monoid<A>): Monoid<Reader<E, A>> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<Reader<E, A>> { ... }
```

Added in v2.0.0

# run (function)

**Signature**

```ts
export function run<E, A>(ma: Reader<E, A>, e: E): A { ... }
```

Added in v2.0.0
