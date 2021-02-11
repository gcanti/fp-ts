---
title: IO.ts
nav_order: 46
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

- [Apply](#apply)
  - [ap](#ap)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flap](#flap)
  - [flatten](#flatten)
- [constructors](#constructors)
  - [~~fromIO~~](#fromio)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [ChainRec](#chainrec)
  - [FromIO](#fromio)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [MonadIO](#monadio)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [~~getMonoid~~](#getmonoid)
  - [~~getSemigroup~~](#getsemigroup)
  - [~~io~~](#io)
- [model](#model)
  - [IO (interface)](#io-interface)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
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

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B>
```

Added in v2.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => IO<A>
```

Added in v2.0.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: IO<B>) => <A>(first: IO<A>) => IO<A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: IO<B>) => <A>(first: IO<A>) => IO<B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => IO<B>) => (first: IO<A>) => IO<A>
```

Added in v2.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

Added in v2.10.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: IO<IO<A>>) => IO<A>
```

Added in v2.0.0

# constructors

## ~~fromIO~~

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => IO<A>
```

Added in v2.7.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'IO'>
```

Added in v2.7.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'IO'>
```

Added in v2.10.0

## ChainRec

**Signature**

```ts
export declare const ChainRec: ChainRec1<'IO'>
```

Added in v2.7.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO1<'IO'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'IO'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'IO'>
```

Added in v2.7.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO1<'IO'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'IO'>
```

Added in v2.10.0

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

## ~~getMonoid~~

Use `Applicative.getApplicativeMonoid` instead.

**Signature**

```ts
export declare const getMonoid: <A>(M: Monoid<A>) => Monoid<IO<A>>
```

Added in v2.0.0

## ~~getSemigroup~~

Use `Apply.getApplySemigroup` instead.

**Signature**

```ts
export declare const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<IO<A>>
```

Added in v2.0.0

## ~~io~~

Use small, specific instances instead.

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

# utils

## Do

**Signature**

```ts
export declare const Do: IO<{}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: IO<B>
) => (fa: IO<A>) => IO<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IO<B>
) => (ma: IO<A>) => IO<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: IO<A>) => IO<{ [K in N]: A }>
```

Added in v2.8.0

## sequenceArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceArray: <A>(arr: readonly IO<A>[]) => IO<readonly A[]>
```

Added in v2.9.0

## traverseArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseArray: <A, B>(f: (a: A) => IO<B>) => (as: readonly A[]) => IO<readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IO<B>
) => (as: readonly A[]) => IO<readonly B[]>
```

Added in v2.9.0
