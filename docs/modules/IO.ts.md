---
title: IO.ts
nav_order: 51
parent: Modules
---

## IO overview

```ts
interface IO<A> {
  (): A
}
```

`IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
type `A` and **never fails**.

If you want to represent a synchronous computation that may fail, please see `IOEither`.
If you want to represent a synchronous computation that may yield nothing, please see `IOOption`.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [of](#of)
- [do notation](#do-notation)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Chain](#chain)
  - [ChainRec](#chainrec)
  - [FromIO](#fromio)
  - [Functor](#functor)
  - [Monad](#monad)
  - [MonadIO](#monadio)
  - [Pointed](#pointed)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [IO (interface)](#io-interface)
- [sequencing](#sequencing)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [traversing](#traversing)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
- [type lambdas](#type-lambdas)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [utils](#utils)
  - [ApT](#apt)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [zone of death](#zone-of-death)
  - [~~fromIO~~](#fromio)
  - [~~getMonoid~~](#getmonoid)
  - [~~getSemigroup~~](#getsemigroup)
  - [~~io~~](#io)

---

# constructors

## of

**Signature**

```ts
export declare const of: <A>(a: A) => IO<A>
```

Added in v2.0.0

# do notation

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
) => (fa: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IO<B>
) => (ma: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: IO<A>) => IO<{ readonly [K in N]: A }>
```

Added in v2.8.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

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

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'IO'>
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

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

Added in v2.10.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
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

# sequencing

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

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
export declare const chainFirst: <A, B>(f: (a: A) => IO<B>) => (first: IO<A>) => IO<A>
```

Added in v2.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: IO<IO<A>>) => IO<A>
```

Added in v2.0.0

# traversing

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

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IO<B>
) => (as: readonly A[]) => IO<readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IO<B>
) => (as: ReadonlyNonEmptyArray<A>) => IO<ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

# type lambdas

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

# utils

## ApT

**Signature**

```ts
export declare const ApT: IO<readonly []>
```

Added in v2.11.0

## ap

**Signature**

```ts
export declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <B>(second: IO<B>) => <A>(first: IO<A>) => IO<A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <B>(second: IO<B>) => <A>(first: IO<A>) => IO<B>
```

Added in v2.0.0

# zone of death

## ~~fromIO~~

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => IO<A>
```

Added in v2.7.0

## ~~getMonoid~~

Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.

**Signature**

```ts
export declare const getMonoid: <A>(M: Monoid<A>) => Monoid<IO<A>>
```

Added in v2.0.0

## ~~getSemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<IO<A>>
```

Added in v2.0.0

## ~~io~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `IO.Functor` instead of `IO.io`
(where `IO` is from `import IO from 'fp-ts/IO'`)

**Signature**

```ts
export declare const io: Monad1<'IO'> & MonadIO1<'IO'> & ChainRec1<'IO'>
```

Added in v2.0.0
