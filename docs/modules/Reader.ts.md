---
title: Reader.ts
nav_order: 64
parent: Modules
---

## Reader overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Functor](#functor)
  - [map](#map)
- [Model](#model)
  - [Reader (interface)](#reader-interface)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [chainW](#chainw)
  - [flatten](#flatten)
- [Profunctor](#profunctor)
  - [promap](#promap)
- [Semigroupoid](#semigroupoid)
  - [compose](#compose)
- [instances](#instances)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [reader](#reader)
- [utils](#utils)
  - [ask](#ask)
  - [asks](#asks)
  - [local](#local)

---

# Applicative

## of

**Signature**

```ts
export declare const of: <R, A>(a: A) => Reader<R, A>
```

Added in v2.0.0

# Apply

## ap

**Signature**

```ts
export declare const ap: <R, A>(fa: Reader<R, A>) => <B>(fab: Reader<R, (a: A) => B>) => Reader<R, B>
```

Added in v2.0.0

## apFirst

**Signature**

```ts
export declare const apFirst: <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>) => Reader<R, A>
```

Added in v2.0.0

## apSecond

**Signature**

```ts
export declare const apSecond: <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>) => Reader<R, B>
```

Added in v2.0.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B>
```

Added in v2.0.0

# Model

## Reader (interface)

**Signature**

```ts
export interface Reader<R, A> {
  (r: R): A
}
```

Added in v2.0.0

## URI

**Signature**

```ts
export declare const URI: 'Reader'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# Monad

## chain

**Signature**

```ts
export declare const chain: <R, A, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, B>
```

Added in v2.0.0

## chainFirst

**Signature**

```ts
export declare const chainFirst: <R, A, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, A>
```

Added in v2.0.0

## chainW

**Signature**

```ts
export declare const chainW: <Q, A, B>(f: (a: A) => Reader<Q, B>) => <R>(ma: Reader<R, A>) => Reader<R & Q, B>
```

Added in v2.6.0

## flatten

**Signature**

```ts
export declare const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A>
```

Added in v2.0.0

# Profunctor

## promap

**Signature**

```ts
export declare const promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B>
```

Added in v2.0.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <E, A>(la: Reader<E, A>) => <B>(ab: Reader<A, B>) => Reader<E, B>
```

Added in v2.0.0

# instances

## getMonoid

**Signature**

```ts
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>>
```

Added in v2.0.0

## getSemigroup

**Signature**

```ts
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>>
```

Added in v2.0.0

## reader

**Signature**

```ts
export declare const reader: Monad2<'Reader'> &
  Profunctor2<'Reader'> &
  Category2<'Reader'> &
  Strong2<'Reader'> &
  Choice2<'Reader'>
```

Added in v2.0.0

# utils

## ask

Reads the current context

**Signature**

```ts
export declare const ask: <R>() => Reader<R, R>
```

Added in v2.0.0

## asks

Projects a value from the global context in a Reader

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => Reader<R, A>
```

Added in v2.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare function local<Q, R>(f: (d: Q) => R): <A>(ma: Reader<R, A>) => Reader<Q, A>
```

Added in v2.0.0
