---
title: Reader.ts
nav_order: 65
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Reader (interface)](#reader-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [reader (constant)](#reader-constant)
- [ask (function)](#ask-function)
- [asks (function)](#asks-function)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [local (function)](#local-function)
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

# reader (constant)

**Signature**

```ts
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = ...
```

Added in v2.0.0

# ask (function)

Reads the current context

**Signature**

```ts
export function ask<E>(): Reader<E, E> { ... }
```

Added in v2.0.0

# asks (function)

Projects a value from the global context in a Reader

**Signature**

```ts
export function asks<E, A>(f: (e: E) => A): Reader<E, A> { ... }
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

# local (function)

changes the value of the local context during the execution of the action `ma`

**Signature**

```ts
export function local<E, A, D>(ma: Reader<E, A>, f: (d: D) => E): Reader<D, A> { ... }
```

Added in v2.0.0

# run (function)

**Signature**

```ts
export function run<E, A>(ma: Reader<E, A>, e: E): A { ... }
```

Added in v2.0.0
