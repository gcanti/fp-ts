---
title: Reader.ts
nav_order: 72
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [Reader (class)](#reader-class)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
  - [local (method)](#local-method)
- [URI (constant)](#uri-constant)
- [of (constant)](#of-constant)
- [reader (constant)](#reader-constant)
- [ask (function)](#ask-function)
- [asks (function)](#asks-function)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [local (function)](#local-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Reader (class)

**Signature**

```ts
export class Reader<E, A> {
  constructor(readonly run: (e: E) => A) { ... }
  ...
}
```

Added in v1.0.0

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Reader<E, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: Reader<E, (a: A) => B>): Reader<E, B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: Reader<E, (b: B) => C>, fb: Reader<E, B>): Reader<E, C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => Reader<E, B>): Reader<E, B> { ... }
```

## local (method)

**Signature**

```ts
local<E2 = E>(f: (e: E2) => E): Reader<E2, A> { ... }
```

Added in v1.6.1

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# of (constant)

**Signature**

```ts
export const of: <A>(a: A) => Reader<unknown, A> = ...
```

Added in v1.19.0

# reader (constant)

**Signature**

```ts
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = ...
```

Added in v1.0.0

# ask (function)

reads the current context

**Signature**

```ts
export const ask = <E>(): Reader<E, E> => ...
```

Added in v1.0.0

# asks (function)

Projects a value from the global context in a Reader

**Signature**

```ts
export const asks = <E, A>(f: (e: E) => A): Reader<E, A> => ...
```

Added in v1.0.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <E, A>(M: Monoid<A>): Monoid<Reader<E, A>> => ...
```

Added in v1.14.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <E, A>(S: Semigroup<A>): Semigroup<Reader<E, A>> => ...
```

Added in v1.14.0

# local (function)

changes the value of the local context during the execution of the action `fa`

**Signature**

```ts
export const local = <E, E2 = E>(f: (e: E2) => E) => <A>(fa: Reader<E, A>): Reader<E2, A> => ...
```

Added in v1.0.0
