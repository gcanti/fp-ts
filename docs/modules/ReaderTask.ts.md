---
title: ReaderTask.ts
nav_order: 67
parent: Modules
---

## ReaderTask overview

Added in v2.3.0

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [chainIOK](#chainiok)
  - [chainTaskK](#chaintaskk)
  - [flatten](#flatten)
  - [fromIOK](#fromiok)
  - [fromTaskK](#fromtaskk)
  - [local](#local)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [fromIO](#fromio)
  - [fromReader](#fromreader)
  - [fromTask](#fromtask)
- [instances](#instances)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [Functor](#functor-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [readerTask](#readertask)
  - [readerTaskSeq](#readertaskseq)
- [model](#model)
  - [ReaderTask (interface)](#readertask-interface)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [run](#run)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)

---

# Applicative

## of

Wrap a value into the type constructor.

**Signature**

```ts
export declare const of: <E, A>(a: A) => ReaderTask<E, A>
```

Added in v2.3.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B>
```

Added in v2.3.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <Q, A>(
  fa: ReaderTask<Q, A>
) => <R, B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<Q & R, B>
```

Added in v2.8.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.3.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.3.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
) => <Q>(ma: ReaderTask<Q, A>) => ReaderTask<Q & R, B>
```

Added in v2.6.7

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.3.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.4.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v2.4.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A>
```

Added in v2.3.0

## fromIOK

**Signature**

```ts
export declare function fromIOK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
): <R>(...a: A) => ReaderTask<R, B>
```

Added in v2.4.0

## fromTaskK

**Signature**

```ts
export declare function fromTaskK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): <R>(...a: A) => ReaderTask<R, B>
```

Added in v2.4.0

## local

**Signature**

```ts
export declare const local: <Q, R>(f: (f: Q) => R) => <A>(ma: ReaderTask<R, A>) => ReaderTask<Q, A>
```

Added in v2.3.0

# constructors

## ask

**Signature**

```ts
export declare const ask: <R>() => ReaderTask<R, R>
```

Added in v2.3.0

## asks

**Signature**

```ts
export declare const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A>
```

Added in v2.3.0

## fromIO

**Signature**

```ts
export declare const fromIO: <R, A>(ma: IO<A>) => ReaderTask<R, A>
```

Added in v2.3.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A = never>(ma: R.Reader<R, A>) => ReaderTask<R, A>
```

Added in v2.3.0

## fromTask

**Signature**

```ts
export declare const fromTask: <R, A>(ma: T.Task<A>) => ReaderTask<R, A>
```

Added in v2.3.0

# instances

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: Applicative2<'ReaderTask'>
```

Added in v2.7.0

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: Applicative2<'ReaderTask'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReaderTask'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'ReaderTask'
```

Added in v2.3.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.3.0

## getMonoid

**Signature**

```ts
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>>
```

Added in v2.3.0

## getSemigroup

**Signature**

```ts
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>>
```

Added in v2.3.0

## readerTask

**Signature**

```ts
export declare const readerTask: MonadTask2<'ReaderTask'>
```

Added in v2.3.0

## readerTaskSeq

Like `readerTask` but `ap` is sequential

**Signature**

```ts
export declare const readerTaskSeq: MonadTask2<'ReaderTask'>
```

Added in v2.3.0

# model

## ReaderTask (interface)

**Signature**

```ts
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}
```

Added in v2.3.0

# utils

## Do

**Signature**

```ts
export declare const Do: ReaderTask<unknown, {}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <A, N extends string, R, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R, B>
) => (fa: ReaderTask<R, A>) => ReaderTask<R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

**Signature**

```ts
export declare const apSW: <A, N extends string, Q, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<Q, B>
) => <R>(fa: ReaderTask<R, A>) => ReaderTask<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<R, B>
) => (fa: ReaderTask<R, A>) => ReaderTask<R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, A>(fa: ReaderTask<R, A>) => ReaderTask<R, { [K in N]: A }>
```

Added in v2.8.0

## bindW

**Signature**

```ts
export declare const bindW: <N extends string, A, Q, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<Q, B>
) => <R>(fa: ReaderTask<R, A>) => ReaderTask<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## run

**Signature**

```ts
export declare function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A>
```

Added in v2.4.0

## sequenceArray

**Signature**

```ts
export declare const sequenceArray: <R, A>(arr: readonly ReaderTask<R, A>[]) => ReaderTask<R, readonly A[]>
```

Added in v2.9.0

## traverseArray

**Signature**

```ts
export declare const traverseArray: <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
) => (arr: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (arr: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v2.9.0
