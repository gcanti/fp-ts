---
title: IO.ts
nav_order: 43
parent: Modules
---

## IO overview

```ts
interface IO<A> {
  (): A
}
```

`IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
`IOEither`.

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
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [instances](#instances)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [io](#io)
- [model](#model)
  - [IO (interface)](#io-interface)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)

---

# Applicative

## of

**Signature**

```ts
export declare const of: <A>(a: A) => IO<A>
```

Added in v2.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<B>
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
```

Added in v2.0.0

# Monad

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<A>
```

Added in v2.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: IO<IO<A>>) => IO<A>
```

Added in v2.0.0

# instances

## getMonoid

**Signature**

```ts
export declare function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>>
```

Added in v2.0.0

## getSemigroup

**Signature**

```ts
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>>
```

Added in v2.0.0

## io

**Signature**

```ts
export declare const io: Monad1<'IO'> & MonadIO1<'IO'> & ChainRec1<'IO'>
```

Added in v2.0.0

# model

## IO (interface)

**Signature**

```ts
export interface IO<A> {
  (): A
}
```

Added in v2.0.0

## URI

**Signature**

```ts
export declare const URI: 'IO'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0
