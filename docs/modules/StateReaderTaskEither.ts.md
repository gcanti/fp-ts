---
title: StateReaderTaskEither.ts
nav_order: 83
parent: Modules
---

## StateReaderTaskEither overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [MonadIO](#monadio)
  - [fromIO](#fromio)
- [MonadTask](#monadtask)
  - [fromTask](#fromtask)
- [MonadThrow](#monadthrow)
  - [throwError](#throwerror)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirst](#chainfirst)
  - [chainFirstW](#chainfirstw)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOEitherKW](#chainioeitherkw)
  - [chainReaderTaskEitherK](#chainreadertaskeitherk)
  - [chainReaderTaskEitherKW](#chainreadertaskeitherkw)
  - [chainTaskEitherK](#chaintaskeitherk)
  - [chainTaskEitherKW](#chaintaskeitherkw)
  - [filterOrElse](#filterorelse)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromReaderTaskEitherK](#fromreadertaskeitherk)
  - [fromTaskEitherK](#fromtaskeitherk)
- [constructors](#constructors)
  - [fromEither](#fromeither)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [fromReaderEither](#fromreadereither)
  - [fromReaderTaskEither](#fromreadertaskeither)
  - [fromTaskEither](#fromtaskeither)
  - [get](#get)
  - [gets](#gets)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftReader](#leftreader)
  - [leftState](#leftstate)
  - [leftTask](#lefttask)
  - [modify](#modify)
  - [put](#put)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightReader](#rightreader)
  - [rightState](#rightstate)
  - [rightTask](#righttask)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative-1)
  - [Bifunctor](#bifunctor-1)
  - [Functor](#functor-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [stateReaderTaskEither](#statereadertaskeither)
  - [~~stateReaderTaskEitherSeq~~](#statereadertaskeitherseq)
- [model](#model)
  - [StateReaderTaskEither (interface)](#statereadertaskeither-interface)
- [utils](#utils)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [filterOrElseW](#filterorelsew)
  - [run](#run)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [~~evalState~~](#evalstate)
  - [~~execState~~](#execstate)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <S, R, E, A>(
  that: Lazy<StateReaderTaskEither<S, R, E, A>>
) => (fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.6.2

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <S, R2, E2, B>(
  that: () => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A>(fa: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B | A>
```

Added in v2.9.0

# Applicative

## of

Wrap a value into the type constructor.

**Signature**

```ts
export declare const of: <S, R, E, A>(a: A) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.7.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <S, Q, D, A>(
  fa: StateReaderTaskEither<S, Q, D, A>
) => <R, E, B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, Q & R, D | E, B>
```

Added in v2.8.0

# Bifunctor

## bimap

Map a pair of functions over the two last type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B>
```

Added in v2.6.2

## mapLeft

Map a function over the third type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(
  f: (e: E) => G
) => <S, R, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A>
```

Added in v2.6.2

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => <Q, D>(ma: StateReaderTaskEither<S, Q, D, A>) => StateReaderTaskEither<S, Q & R, E | D, B>
```

Added in v2.6.0

# MonadIO

## fromIO

**Signature**

```ts
export declare const fromIO: <S, R, E, A>(fa: IO<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.7.0

# MonadTask

## fromTask

**Signature**

```ts
export declare const fromTask: <S, R, E, A>(fa: Task<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.7.0

# MonadThrow

## throwError

**Signature**

```ts
export declare const throwError: <S, R, E, A>(e: E) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.7.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <S, R, E, B>(
  fb: StateReaderTaskEither<S, R, E, B>
) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <S, R, E, B>(
  fb: StateReaderTaskEither<S, R, E, B>
) => <A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chainEitherK).

**Signature**

```ts
export declare const chainEitherKW: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <S, R, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
```

Added in v2.6.1

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## chainFirstW

Less strict version of [`chainFirst`](#chainFirst).

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirstW: <S, R, D, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, D, B>
) => <Q, E>(ma: StateReaderTaskEither<S, Q, E, A>) => StateReaderTaskEither<S, Q & R, D | E, A>
```

Added in v2.8.0

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainIOEitherK).

**Signature**

```ts
export declare const chainIOEitherKW: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <S, R, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
```

Added in v2.6.1

## chainReaderTaskEitherK

**Signature**

```ts
export declare const chainReaderTaskEitherK: <R, E, A, B>(
  f: (a: A) => RTE.ReaderTaskEither<R, E, B>
) => <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## chainReaderTaskEitherKW

Less strict version of [`chainReaderTaskEitherK`](#chainReaderTaskEitherK).

**Signature**

```ts
export declare const chainReaderTaskEitherKW: <R, E, A, B>(
  f: (a: A) => RTE.ReaderTaskEither<R, E, B>
) => <S, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
```

Added in v2.6.1

## chainTaskEitherK

**Signature**

```ts
export declare const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## chainTaskEitherKW

Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).

**Signature**

```ts
export declare const chainTaskEitherKW: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <S, R, D>(ma: StateReaderTaskEither<S, R, D, A>) => StateReaderTaskEither<S, R, E | D, B>
```

Added in v2.6.1

## filterOrElse

Derivable from `MonadThrow`.

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, A>
}
```

Added in v2.4.4

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <S, R, E, A>(
  mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## fromEitherK

**Signature**

```ts
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## fromIOEitherK

**Signature**

```ts
export declare function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## fromReaderTaskEitherK

**Signature**

```ts
export declare function fromReaderTaskEitherK<R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => ReaderTaskEither<R, E, B>
): <S>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## fromTaskEitherK

**Signature**

```ts
export declare function fromTaskEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

# constructors

## fromEither

Derivable from `MonadThrow`.

**Signature**

```ts
export declare const fromEither: <S, R, E, A>(ma: E.Either<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## fromIOEither

**Signature**

```ts
export declare function fromIOEither<S, R, E, A>(ma: IOEither<E, A>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## fromOption

Derivable from `MonadThrow`.

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <S, R, A>(ma: Option<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## fromPredicate

Derivable from `MonadThrow`.

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    a: A
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => StateReaderTaskEither<S, R, E, A>
}
```

Added in v2.4.4

## fromReaderEither

**Signature**

```ts
export declare function fromReaderEither<S, R, E, A>(ma: ReaderEither<R, E, A>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## fromReaderTaskEither

**Signature**

```ts
export declare const fromReaderTaskEither: <S, R, E, A>(
  ma: RTE.ReaderTaskEither<R, E, A>
) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## fromTaskEither

**Signature**

```ts
export declare function fromTaskEither<S, R, E, A>(ma: TaskEither<E, A>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## get

Get the current state

**Signature**

```ts
export declare const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S>
```

Added in v2.0.0

## gets

Get a value which depends on the current state

**Signature**

```ts
export declare const gets: <S, R, E = never, A = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## left

**Signature**

```ts
export declare const left: <S, R, E = never, A = never>(e: E) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## leftIO

**Signature**

```ts
export declare function leftIO<S, R, E = never, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## leftReader

**Signature**

```ts
export declare function leftReader<S, R, E = never, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## leftState

**Signature**

```ts
export declare const leftState: <S, R, E = never, A = never>(me: State<S, E>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## leftTask

**Signature**

```ts
export declare function leftTask<S, R, E = never, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## modify

Modify the state by applying a function to the current state

**Signature**

```ts
export declare const modify: <S, R, E = never>(f: (s: S) => S) => StateReaderTaskEither<S, R, E, void>
```

Added in v2.0.0

## put

Set the state

**Signature**

```ts
export declare const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void>
```

Added in v2.0.0

## right

**Signature**

```ts
export declare const right: <S, R, E = never, A = never>(a: A) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## rightIO

**Signature**

```ts
export declare function rightIO<S, R, E = never, A = never>(ma: IO<A>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## rightReader

**Signature**

```ts
export declare function rightReader<S, R, E = never, A = never>(ma: Reader<R, A>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## rightState

**Signature**

```ts
export declare const rightState: <S, R, E = never, A = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## rightTask

**Signature**

```ts
export declare function rightTask<S, R, E = never, A = never>(ma: Task<A>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt4<'StateReaderTaskEither'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative4<'StateReaderTaskEither'>
```

Added in v2.7.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor4<'StateReaderTaskEither'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor4<'StateReaderTaskEither'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'StateReaderTaskEither'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## stateReaderTaskEither

**Signature**

```ts
export declare const stateReaderTaskEither: Monad4<'StateReaderTaskEither'> &
  Bifunctor4<'StateReaderTaskEither'> &
  Alt4<'StateReaderTaskEither'> &
  MonadTask4<'StateReaderTaskEither'> &
  MonadThrow4<'StateReaderTaskEither'>
```

Added in v2.0.0

## ~~stateReaderTaskEitherSeq~~

**Signature**

```ts
export declare const stateReaderTaskEitherSeq: Monad4<'StateReaderTaskEither'> &
  Bifunctor4<'StateReaderTaskEither'> &
  Alt4<'StateReaderTaskEither'> &
  MonadTask4<'StateReaderTaskEither'> &
  MonadThrow4<'StateReaderTaskEither'>
```

Added in v2.0.0

# model

## StateReaderTaskEither (interface)

**Signature**

```ts
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, [A, S]>
}
```

Added in v2.0.0

# utils

## apS

**Signature**

```ts
export declare const apS: <A, N extends string, S, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R, E, B>
) => (
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

**Signature**

```ts
export declare const apSW: <A, N extends string, S, Q, D, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, Q, D, B>
) => <R, E>(
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, Q & R, D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, { [K in N]: A }>
```

Added in v2.8.0

## bindW

**Signature**

```ts
export declare const bindW: <N extends string, A, S, Q, D, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, Q, D, B>
) => <R, E>(
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, Q & R, D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## evaluate

Run a computation in the `StateReaderTaskEither` monad, discarding the final state

**Signature**

```ts
export declare const evaluate: <S>(
  s: S
) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => RTE.ReaderTaskEither<R, E, A>
```

Added in v2.8.0

## execute

Run a computation in the `StateReaderTaskEither` monad discarding the result

**Signature**

```ts
export declare const execute: <S>(
  s: S
) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => RTE.ReaderTaskEither<R, E, S>
```

Added in v2.8.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterOrElse).

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E2 | E1, A>
}
```

Added in v2.9.0

## run

**Signature**

```ts
export declare function run<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S, r: R): Promise<Either<E, [A, S]>>
```

Added in v2.0.0

## sequenceArray

**Signature**

```ts
export declare const sequenceArray: <S, R, E, A>(
  arr: readonly StateReaderTaskEither<S, R, E, A>[]
) => StateReaderTaskEither<S, R, E, readonly A[]>
```

Added in v2.9.0

## traverseArray

**Signature**

```ts
export declare const traverseArray: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (arr: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <S, R, E, A, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (arr: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

Added in v2.9.0

## ~~evalState~~

Use `evaluate` instead

**Signature**

```ts
export declare const evalState: <S, R, E, A>(
  ma: StateReaderTaskEither<S, R, E, A>,
  s: S
) => RTE.ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## ~~execState~~

Use `execute` instead

**Signature**

```ts
export declare const execState: <S, R, E, A>(
  ma: StateReaderTaskEither<S, R, E, A>,
  s: S
) => RTE.ReaderTaskEither<R, E, S>
```

Added in v2.0.0
