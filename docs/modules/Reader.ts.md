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
- [chainW](#chainw)
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
export declare const URI: 'Reader'
```

Added in v2.0.0

# ap

**Signature**

```ts
export declare const ap: <E, A>(fa: Reader<E, A>) => <B>(fab: Reader<E, (a: A) => B>) => Reader<E, B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
export declare const apFirst: <E, B>(fb: Reader<E, B>) => <A>(fa: Reader<E, A>) => Reader<E, A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
export declare const apSecond: <E, B>(fb: Reader<E, B>) => <A>(fa: Reader<E, A>) => Reader<E, B>
```

Added in v2.0.0

# ask

Reads the current context

**Signature**

```ts
export declare const ask: <R>() => Reader<R, R>
```

Added in v2.0.0

# asks

Projects a value from the global context in a Reader

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => Reader<R, A>
```

Added in v2.0.0

# chain

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => Reader<E, B>) => (ma: Reader<E, A>) => Reader<E, B>
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => Reader<E, B>) => (ma: Reader<E, A>) => Reader<E, A>
```

Added in v2.0.0

# chainW

**Signature**

```ts
export declare const chainW: <Q, A, B>(f: (a: A) => Reader<Q, B>) => <R>(ma: Reader<R, A>) => Reader<R & Q, B>
```

Added in v2.6.0

# compose

**Signature**

```ts
export declare const compose: <E, A>(la: Reader<E, A>) => <B>(ab: Reader<A, B>) => Reader<E, B>
```

Added in v2.0.0

# flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: Reader<E, Reader<E, A>>) => Reader<E, A>
```

Added in v2.0.0

# getMonoid

**Signature**

```ts
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>>
```

Added in v2.0.0

# getSemigroup

**Signature**

```ts
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>>
```

Added in v2.0.0

# local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare function local<Q, R>(f: (d: Q) => R): <A>(ma: Reader<R, A>) => Reader<Q, A>
```

Added in v2.0.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Reader<E, A>) => Reader<E, B>
```

Added in v2.0.0

# of

**Signature**

```ts
export declare const of: <R, A>(a: A) => Reader<R, A>
```

Added in v2.0.0

# promap

**Signature**

```ts
export declare const promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B>
```

Added in v2.0.0

# reader

**Signature**

```ts
export declare const reader: Monad2<'Reader'> &
  Profunctor2<'Reader'> &
  Category2<'Reader'> &
  Strong2<'Reader'> &
  Choice2<'Reader'>
```

Added in v2.0.0
