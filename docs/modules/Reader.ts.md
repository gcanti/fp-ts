---
title: Reader.ts
nav_order: 64
parent: Modules
---

# Reader overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Reader (interface)](#reader-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [ask](#ask)
- [asks](#asks)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [compose](#compose)
- [flatten](#flatten)
- [getMonoid](#getmonoid)
- [getSemigroup](#getsemigroup)
- [local](#local)
- [map](#map)
- [of](#of)
- [promap](#promap)
- [reader](#reader)

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

# URI

**Signature**

```ts
export const URI: "Reader" = ...
```

Added in v2.0.0

# ap

**Signature**

```ts
<E, A>(fa: Reader<E, A>) => <B>(fab: Reader<E, (a: A) => B>) => Reader<E, B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
<E, B>(fb: Reader<E, B>) => <A>(fa: Reader<E, A>) => Reader<E, A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
<E, B>(fb: Reader<E, B>) => <A>(fa: Reader<E, A>) => Reader<E, B>
```

Added in v2.0.0

# ask

Reads the current context

**Signature**

```ts
export const ask: <R>() => Reader<R, R> = ...
```

Added in v2.0.0

# asks

Projects a value from the global context in a Reader

**Signature**

```ts
export const asks: <R, A>(f: (r: R) => A) => Reader<R, A> = ...
```

Added in v2.0.0

# chain

**Signature**

```ts
<E, A, B>(f: (a: A) => Reader<E, B>) => (ma: Reader<E, A>) => Reader<E, B>
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
<E, A, B>(f: (a: A) => Reader<E, B>) => (ma: Reader<E, A>) => Reader<E, A>
```

Added in v2.0.0

# compose

**Signature**

```ts
<E, A>(la: Reader<E, A>) => <B>(ab: Reader<A, B>) => Reader<E, B>
```

Added in v2.0.0

# flatten

**Signature**

```ts
<E, A>(mma: Reader<E, Reader<E, A>>) => Reader<E, A>
```

Added in v2.0.0

# getMonoid

**Signature**

```ts
export function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>> { ... }
```

Added in v2.0.0

# getSemigroup

**Signature**

```ts
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>> { ... }
```

Added in v2.0.0

# local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export function local<Q, R>(f: (d: Q) => R): <A>(ma: Reader<R, A>) => Reader<Q, A> { ... }
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Reader<E, A>) => Reader<E, B>
```

Added in v2.0.0

# of

**Signature**

```ts
export const of: <R, A>(a: A) => Reader<R, A> = ...
```

Added in v2.0.0

# promap

**Signature**

```ts
<E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B>
```

Added in v2.0.0

# reader

**Signature**

```ts
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = ...
```

Added in v2.0.0
