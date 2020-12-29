---
title: StateReaderTaskEither.ts
nav_order: 74
parent: Modules
---

## StateReaderTaskEither overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [FromIO](#fromio)
  - [fromIO](#fromio)
- [FromTask](#fromtask)
  - [fromTask](#fromtask)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirstW](#chainfirstw)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOEitherKW](#chainioeitherkw)
  - [chainReaderTaskEitherK](#chainreadertaskeitherk)
  - [chainReaderTaskEitherKW](#chainreadertaskeitherkw)
  - [chainTaskEitherK](#chaintaskeitherk)
  - [chainTaskEitherKW](#chaintaskeitherkw)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
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
  - [fromState](#fromstate)
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
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Bifunctor](#bifunctor-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio-1)
  - [FromTask](#fromtask-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [model](#model)
  - [StateReaderTaskEither (interface)](#statereadertaskeither-interface)
- [utils](#utils)
  - [apS](#aps)
  - [apSW](#apsw)
  - [apT](#apt)
  - [apTW](#aptw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [tupled](#tupled)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <S, R, E, A>(
  second: Lazy<StateReaderTaskEither<S, R, E, A>>
) => (first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <S, R2, E2, B>(
  second: () => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A>(first: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B | A>
```

Added in v3.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <S, R2, E2, A>(
  fa: StateReaderTaskEither<S, R2, E2, A>
) => <R1, E1, B>(fab: StateReaderTaskEither<S, R1, E1, (a: A) => B>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B>
```

Added in v3.0.0

# Bifunctor

## bimap

Map a pair of functions over the two last type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(fea: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B>
```

Added in v3.0.0

## mapLeft

Map a function over the third type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(
  f: (e: E) => G
) => <S, R, A>(fea: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A>
```

Added in v3.0.0

# FromIO

## fromIO

**Signature**

```ts
export declare const fromIO: <A, S, R, E>(fa: IO<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

# FromTask

## fromTask

**Signature**

```ts
export declare const fromTask: <A, S, R, E>(fa: Task<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

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

Added in v3.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, S, R, E, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(ma: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, S, R, E>(a: A) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

# combinators

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chainEitherK).

**Signature**

```ts
export declare const chainEitherKW: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## chainFirstW

Less strict version of [`chainFirst`](#chainFirst).

**Signature**

```ts
export declare const chainFirstW: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(first: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainIOEitherK).

**Signature**

```ts
export declare const chainIOEitherKW: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## chainReaderTaskEitherK

**Signature**

```ts
export declare const chainReaderTaskEitherK: <R, E, A, B>(
  f: (a: A) => RTE.ReaderTaskEither<R, E, B>
) => <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainReaderTaskEitherKW

Less strict version of [`chainReaderTaskEitherK`](#chainReaderTaskEitherK).

**Signature**

```ts
export declare const chainReaderTaskEitherKW: <A, R, E2, B>(
  f: (a: A) => RTE.ReaderTaskEither<R, E2, B>
) => <S, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## chainTaskEitherK

**Signature**

```ts
export declare const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainTaskEitherKW

Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).

**Signature**

```ts
export declare const chainTaskEitherKW: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, A>
}
```

Added in v3.0.0

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

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => E.Either<E, B>
) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => IOEither<E, B>
) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromReaderTaskEitherK

**Signature**

```ts
export declare const fromReaderTaskEitherK: <A extends readonly unknown[], R, E, B>(
  f: (...a: A) => RTE.ReaderTaskEither<R, E, B>
) => <S>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromTaskEitherK

**Signature**

```ts
export declare const fromTaskEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => TaskEither<E, B>
) => <S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

# constructors

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A, S, R>(e: E.Either<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A, S, R>(ma: IOEither<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromOption

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A, S, R>(ma: Option<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromPredicate

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicate: {
  <A, B>(refinement: Refinement<A, B>): <S, R>(a: A) => StateReaderTaskEither<S, R, A, B>
  <A>(predicate: Predicate<A>): <S, R>(a: A) => StateReaderTaskEither<S, R, A, A>
}
```

Added in v3.0.0

## fromReaderEither

**Signature**

```ts
export declare const fromReaderEither: <R, E, A, S>(ma: ReaderEither<R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromReaderTaskEither

**Signature**

```ts
export declare const fromReaderTaskEither: <R, E, A, S>(
  ma: RTE.ReaderTaskEither<R, E, A>
) => ST.StateT3<'ReaderTaskEither', S, R, E, A>
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare const fromState: <S, A, R, E>(sa: State<S, A>) => ST.StateT3<'ReaderTaskEither', S, R, E, A>
```

Added in v3.0.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <E, A, S, R>(ma: TaskEither<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## get

Get the current state

**Signature**

```ts
export declare const get: <S, R, E>() => ST.StateT3<'ReaderTaskEither', S, R, E, S>
```

Added in v3.0.0

## gets

Get a value which depends on the current state

**Signature**

```ts
export declare const gets: <S, A, R, E>(f: (s: S) => A) => ST.StateT3<'ReaderTaskEither', S, R, E, A>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E, S, R, A = never>(e: E) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E, S, R, A = never>(me: IO<E>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E, S, A = never>(me: Reader<R, E>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## leftState

**Signature**

```ts
export declare const leftState: <S, E, R, A = never>(me: State<S, E>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E, S, R, A = never>(me: Task<E>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## modify

Modify the state by applying a function to the current state

**Signature**

```ts
export declare const modify: <S, R, E>(f: Endomorphism<S>) => ST.StateT3<'ReaderTaskEither', S, R, E, void>
```

Added in v3.0.0

## put

Set the state

**Signature**

```ts
export declare const put: <S, R, E>(s: S) => ST.StateT3<'ReaderTaskEither', S, R, E, void>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A, S, R, E = never>(a: A) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <A, S, R, E = never>(ma: IO<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, A, S, E = never>(ma: Reader<R, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## rightState

**Signature**

```ts
export declare const rightState: <S, A, R, E = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## rightTask

**Signature**

```ts
export declare const rightTask: <A, S, R, E = never>(ma: Task<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <S, R, E, B>(
  second: StateReaderTaskEither<S, R, E, B>
) => <A>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <S, R, E, B>(
  second: StateReaderTaskEither<S, R, E, B>
) => <A>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, S, R, E, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <S, R, E, A>(
  mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt4<'StateReaderTaskEither'>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative4<'StateReaderTaskEither'>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply4<'StateReaderTaskEither'>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor4<'StateReaderTaskEither'>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither4<'StateReaderTaskEither'>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO4<'StateReaderTaskEither'>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask4<'StateReaderTaskEither'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor4<'StateReaderTaskEither'>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad4<'StateReaderTaskEither'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed4<'StateReaderTaskEither'>
```

Added in v3.0.0

## URI

**Signature**

```ts
export declare const URI: 'StateReaderTaskEither'
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

# model

## StateReaderTaskEither (interface)

**Signature**

```ts
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, readonly [A, S]>
}
```

Added in v3.0.0

# utils

## apS

**Signature**

```ts
export declare const apS: <N, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R, E, B>
) => (
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apSW

Less strict version of [`apS`](#apS).

**Signature**

```ts
export declare const apSW: <A, N extends string, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <S, R, E, B>(
  fb: StateReaderTaskEither<S, R, E, B>
) => <A>(fas: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, readonly [any, B]>
```

Added in v3.0.0

## apTW

Less strict version of [`apT`](#apT).

**Signature**

```ts
export declare const apTW: <S, R2, E2, B>(
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A extends readonly unknown[]>(
  fas: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, readonly [any, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (
  ma: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(
  name: N
) => <S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, { [K in N]: A }>
```

Added in v3.0.0

## bindW

Less strict version of [`bind`](#bind).

**Signature**

```ts
export declare const bindW: <N extends string, A, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## evaluate

Run a computation in the `StateReaderTaskEither` monad, discarding the final state

**Signature**

```ts
export declare const evaluate: <S>(
  s: S
) => <R, E, A>(ma: ST.StateT3<'ReaderTaskEither', S, R, E, A>) => RTE.ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## execute

Run a computation in the `StateReaderTaskEither` monad discarding the result

**Signature**

```ts
export declare const execute: <S>(
  s: S
) => <R, E, A>(ma: ST.StateT3<'ReaderTaskEither', S, R, E, A>) => RTE.ReaderTaskEither<R, E, S>
```

Added in v3.0.0

## sequenceArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceArray: <S, R, E, A>(
  arr: readonly StateReaderTaskEither<S, R, E, A>[]
) => StateReaderTaskEither<S, R, E, readonly A[]>
```

Added in v3.0.0

## traverseArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseArray: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (arr: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

Added in v3.0.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <S, R, E, A, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (arr: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <S, R, E, A>(
  a: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, readonly [A]>
```

Added in v3.0.0
