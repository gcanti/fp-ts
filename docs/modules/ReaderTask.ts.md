---
title: ReaderTask.ts
nav_order: 60
parent: Modules
---

## ReaderTask overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [FromIO](#fromio)
  - [fromIO](#fromio)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [chainIOK](#chainiok)
  - [chainTaskK](#chaintaskk)
  - [fromIOK](#fromiok)
  - [fromTaskK](#fromtaskk)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [fromReader](#fromreader)
  - [fromTask](#fromtask)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [instances](#instances)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [FromIO](#fromio-1)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [model](#model)
  - [ReaderTask (interface)](#readertask-interface)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [apT](#apt)
  - [apTW](#aptw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [tupled](#tupled)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: ReaderTask<E, A>) => <B>(fab: ReaderTask<E, (a: A) => B>) => ReaderTask<E, B>
```

Added in v3.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <R2, A>(
  fa: ReaderTask<R2, A>
) => <R1, B>(fab: ReaderTask<R1, (a: A) => B>) => ReaderTask<R1 & R2, B>
```

Added in v3.0.0

# FromIO

## fromIO

**Signature**

```ts
export declare const fromIO: <A, E>(fa: IO<A>) => ReaderTask<E, A>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v3.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, E, B>(f: (a: A) => ReaderTask<E, B>) => (ma: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v3.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <A, R2, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, E>(a: A) => ReaderTask<E, A>
```

Added in v3.0.0

# combinators

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v3.0.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => <R>(...a: A) => ReaderTask<R, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => T.Task<B>
) => <R>(...a: A) => ReaderTask<R, B>
```

Added in v3.0.0

# constructors

## ask

**Signature**

```ts
export declare const ask: <R>() => R.Reader<R, T.Task<R>>
```

Added in v3.0.0

## asks

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => R.Reader<R, T.Task<A>>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(ma: R.Reader<R, A>) => R.Reader<R, T.Task<A>>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <R, A>(ma: T.Task<A>) => ReaderTask<R, A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(second: ReaderTask<E, B>) => <A>(first: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(second: ReaderTask<E, B>) => <A>(first: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, E, B>(
  f: (a: A) => ReaderTask<E, B>
) => (first: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v3.0.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A>
```

Added in v3.0.0

# instances

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: Applicative2<'ReaderTask'>
```

Added in v3.0.0

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: Applicative2<'ReaderTask'>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: Apply2<'ReaderTask'>
```

Added in v3.0.0

## ApplySeq

**Signature**

```ts
export declare const ApplySeq: Applicative2<'ReaderTask'>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'ReaderTask'>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask2<'ReaderTask'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReaderTask'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'ReaderTask'>
```

Added in v3.0.0

## URI

**Signature**

```ts
export declare const URI: 'ReaderTask'
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

# model

## ReaderTask (interface)

**Signature**

```ts
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReaderTask<unknown, readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: ReaderTask<unknown, {}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<E, B>
) => (fa: ReaderTask<E, A>) => ReaderTask<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apSW

Less strict version of [`apS`](#apS).

**Signature**

```ts
export declare const apSW: <A, N extends string, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R2, B>
) => <R1>(fa: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <E, B>(fb: ReaderTask<E, B>) => <A>(fas: ReaderTask<E, A>) => ReaderTask<E, readonly [any, B]>
```

Added in v3.0.0

## apTW

Less strict version of [`apT`](#apT).

**Signature**

```ts
export declare const apTW: <R2, B>(
  fb: ReaderTask<R2, B>
) => <R1, A extends readonly unknown[]>(fas: ReaderTask<R1, A>) => ReaderTask<R1 & R2, readonly [any, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<E, B>
) => (ma: ReaderTask<E, A>) => ReaderTask<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: ReaderTask<E, A>) => ReaderTask<E, { [K in N]: A }>
```

Added in v3.0.0

## bindW

Less strict version of [`bind`](#bind).

**Signature**

```ts
export declare const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(fa: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, A>(as: readonly ReaderTask<R, A>[]) => ReaderTask<R, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, B>(
  f: (a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(a: ReaderTask<E, A>) => ReaderTask<E, readonly [A]>
```

Added in v3.0.0
