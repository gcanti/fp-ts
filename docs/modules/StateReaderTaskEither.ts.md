---
title: StateReaderTaskEither.ts
nav_order: 100
parent: Modules
---

## StateReaderTaskEither overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksStateReaderTaskEither](#asksstatereadertaskeither)
  - [asksStateReaderTaskEitherW](#asksstatereadertaskeitherw)
  - [fromReaderTaskEither](#fromreadertaskeither)
  - [get](#get)
  - [gets](#gets)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftReader](#leftreader)
  - [leftState](#leftstate)
  - [leftTask](#lefttask)
  - [modify](#modify)
  - [of](#of)
  - [put](#put)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightReader](#rightreader)
  - [rightState](#rightstate)
  - [rightTask](#righttask)
- [conversions](#conversions)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromReader](#fromreader)
  - [fromReaderEither](#fromreadereither)
  - [fromState](#fromstate)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [do notation](#do-notation)
  - [apSW](#apsw)
- [error handling](#error-handling)
  - [alt](#alt)
  - [altW](#altw)
  - [mapLeft](#mapleft)
- [filtering](#filtering)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
- [instances](#instances)
  - [Alt](#alt)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor)
  - [Chain](#chain)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [FromState](#fromstate)
  - [FromTask](#fromtask)
  - [Functor](#functor)
  - [Monad](#monad)
  - [MonadIO](#monadio)
  - [MonadTask](#monadtask)
  - [MonadThrow](#monadthrow)
  - [Pointed](#pointed)
- [lifting](#lifting)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [fromPredicate](#frompredicate)
  - [fromReaderK](#fromreaderk)
  - [fromReaderTaskEitherK](#fromreadertaskeitherk)
  - [fromStateK](#fromstatek)
  - [fromTaskEitherK](#fromtaskeitherk)
  - [fromTaskK](#fromtaskk)
- [mapping](#mapping)
  - [bimap](#bimap)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [StateReaderTaskEither (interface)](#statereadertaskeither-interface)
- [sequencing](#sequencing)
  - [chain](#chain)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirst](#chainfirst)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstEitherKW](#chainfirsteitherkw)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainFirstReaderKW](#chainfirstreaderkw)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainFirstW](#chainfirstw)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOEitherKW](#chainioeitherkw)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [chainReaderK](#chainreaderk)
  - [chainReaderKW](#chainreaderkw)
  - [chainReaderTaskEitherK](#chainreadertaskeitherk)
  - [chainReaderTaskEitherKW](#chainreadertaskeitherkw)
  - [chainStateK](#chainstatek)
  - [chainTaskEitherK](#chaintaskeitherk)
  - [chainTaskEitherKW](#chaintaskeitherkw)
  - [chainTaskK](#chaintaskk)
  - [chainW](#chainw)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
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
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apFirstW](#apfirstw)
  - [apS](#aps)
  - [apSecond](#apsecond)
  - [apSecondW](#apsecondw)
  - [apW](#apw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [let](#let)
  - [local](#local)
  - [throwError](#throwerror)
- [zone of death](#zone-of-death)
  - [~~evalState~~](#evalstate)
  - [~~execState~~](#execstate)
  - [~~run~~](#run)
  - [~~stateReaderTaskEitherSeq~~](#statereadertaskeitherseq)
  - [~~stateReaderTaskEither~~](#statereadertaskeither)

---

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <S, R, E = never>() => StateReaderTaskEither<S, R, E, R>
```

Added in v2.11.0

## asks

Projects a value from the global context in a `ReaderEither`.

**Signature**

```ts
export declare const asks: <S, R, A, E = never>(f: (r: R) => A) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.11.0

## asksStateReaderTaskEither

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksStateReaderTaskEither: <R, S, E, A>(
  f: (r: R) => StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.11.0

## asksStateReaderTaskEitherW

Less strict version of [`asksStateReaderTaskEither`](#asksstatereadertaskeither).

**Signature**

```ts
export declare const asksStateReaderTaskEitherW: <R1, S, R2, E, A>(
  f: (r1: R1) => StateReaderTaskEither<S, R2, E, A>
) => StateReaderTaskEither<S, R1 & R2, E, A>
```

Added in v2.11.0

## fromReaderTaskEither

**Signature**

```ts
export declare const fromReaderTaskEither: <R, E, A, S>(
  fa: RTE.ReaderTaskEither<R, E, A>
) => StateReaderTaskEither<S, R, E, A>
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
export declare const left: <S, R, E, A = never>(e: E) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## leftIO

**Signature**

```ts
export declare function leftIO<S, R, E, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## leftReader

**Signature**

```ts
export declare function leftReader<S, R, E, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## leftState

**Signature**

```ts
export declare const leftState: <S, R, E, A = never>(me: State<S, E>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## leftTask

**Signature**

```ts
export declare function leftTask<S, R, E, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## modify

Modify the state by applying a function to the current state

**Signature**

```ts
export declare const modify: <S, R, E = never>(f: Endomorphism<S>) => StateReaderTaskEither<S, R, E, void>
```

Added in v2.0.0

## of

**Signature**

```ts
export declare const of: <S, R = unknown, E = never, A = never>(a: A) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.7.0

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

# conversions

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A, S, R = unknown>(fa: E.Either<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, S, R = unknown, E = never>(fa: IO<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.7.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A, S, R = unknown>(fa: IOEither<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(
  onNone: Lazy<E>
) => <A, S, R = unknown>(fa: Option<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A, S, E = never>(fa: R.Reader<R, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.11.0

## fromReaderEither

**Signature**

```ts
export declare const fromReaderEither: <R, E, A, S>(fa: ReaderEither<R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## fromState

**Signature**

```ts
export declare const fromState: <S, A, R = unknown, E = never>(fa: State<S, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.10.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A, S, R = unknown, E = never>(fa: Task<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.7.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <E, A, S, R = unknown>(fa: TaskEither<E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

# do notation

## apSW

Less strict version of [`apS`](#aps).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apSW: <A, N extends string, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

# error handling

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

The `W` suffix (short for **W**idening) means that the environment, the error and the return types will be merged.

**Signature**

```ts
export declare const altW: <S, R2, E2, B>(
  that: () => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A>(fa: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2, B | A>
```

Added in v2.9.0

## mapLeft

Map a function over the third type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(
  f: (e: E) => G
) => <S, R, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A>
```

Added in v2.6.2

# filtering

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R, B extends A>(
    mb: StateReaderTaskEither<S, R, E, B>
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(
    ma: StateReaderTaskEither<S, R, E, A>
  ) => StateReaderTaskEither<S, R, E, A>
}
```

Added in v2.4.4

## filterOrElseW

Less strict version of [`filterOrElse`](#filterorelse).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, R, E1, B extends A>(
    mb: StateReaderTaskEither<S, R, E1, B>
  ) => StateReaderTaskEither<S, R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E2 | E1, A>
}
```

Added in v2.9.0

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

## Apply

**Signature**

```ts
export declare const Apply: Apply4<'StateReaderTaskEither'>
```

Added in v2.10.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor4<'StateReaderTaskEither'>
```

Added in v2.7.0

## Chain

**Signature**

```ts
export declare const Chain: Chain4<'StateReaderTaskEither'>
```

Added in v2.10.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither4<'StateReaderTaskEither'>
```

Added in v2.10.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO4<'StateReaderTaskEither'>
```

Added in v2.10.0

## FromReader

**Signature**

```ts
export declare const FromReader: FromReader4<'StateReaderTaskEither'>
```

Added in v2.11.0

## FromState

**Signature**

```ts
export declare const FromState: FromState4<'StateReaderTaskEither'>
```

Added in v2.11.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask4<'StateReaderTaskEither'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor4<'StateReaderTaskEither'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad4<'StateReaderTaskEither'>
```

Added in v2.10.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO4<'StateReaderTaskEither'>
```

Added in v2.10.0

## MonadTask

**Signature**

```ts
export declare const MonadTask: MonadTask4<'StateReaderTaskEither'>
```

Added in v2.10.0

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow4<'StateReaderTaskEither'>
```

Added in v2.10.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed4<'StateReaderTaskEither'>
```

Added in v2.10.0

# lifting

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => E.Either<E, B>
) => <S, R = unknown>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => IOEither<E, B>
) => <S, R = unknown>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => <S, R = unknown, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.10.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => Option<B>
) => <S, R = unknown>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.10.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R = unknown>(
    a: A
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R = unknown, B extends A = A>(
    b: B
  ) => StateReaderTaskEither<S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R = unknown>(a: A) => StateReaderTaskEither<S, R, E, A>
}
```

Added in v2.4.4

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => R.Reader<R, B>
) => <S, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.11.0

## fromReaderTaskEitherK

**Signature**

```ts
export declare const fromReaderTaskEitherK: <R, E, A extends readonly unknown[], B>(
  f: (...a: A) => RTE.ReaderTaskEither<R, E, B>
) => <S>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## fromStateK

**Signature**

```ts
export declare const fromStateK: <A extends readonly unknown[], S, B>(
  f: (...a: A) => State<S, B>
) => <R = unknown, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.11.0

## fromTaskEitherK

**Signature**

```ts
export declare const fromTaskEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => TaskEither<E, B>
) => <S, R = unknown>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => Task<B>
) => <S, R = unknown, E = never>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.10.0

# mapping

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

## flap

**Signature**

```ts
export declare const flap: <A>(
  a: A
) => <S, R, E, B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.10.0

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

# model

## StateReaderTaskEither (interface)

**Signature**

```ts
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, [A, S]>
}
```

Added in v2.0.0

# sequencing

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
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

Less strict version of [`chainEitherK`](#chaineitherk).

The `W` suffix (short for **W**idening) means that the error types will be merged.

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainEitherKW: <E2, A, B>(
  f: (a: A) => E.Either<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v2.6.1

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.12.0

## chainFirstEitherKW

Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, A>
```

Added in v2.12.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.10.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <S, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.11.0

## chainFirstReaderKW

Less strict version of [`chainFirstReaderK`](#chainFirstReaderK).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <S, R2, E>(ma: StateReaderTaskEither<S, R2, E, A>) => StateReaderTaskEither<S, R1 & R2, E, A>
```

Added in v2.11.0

## chainFirstTaskK

**Signature**

```ts
export declare const chainFirstTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.10.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainFirstW: <S, R2, E2, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(ma: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, A>
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

Less strict version of [`chainIOEitherK`](#chainioeitherk).

**Signature**

```ts
export declare const chainIOEitherKW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v2.6.1

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.10.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(
  f: (a: A) => Option<B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.10.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <S, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.11.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainReaderK).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <S, R2, E>(ma: StateReaderTaskEither<S, R2, E, A>) => StateReaderTaskEither<S, R1 & R2, E, B>
```

Added in v2.11.0

## chainReaderTaskEitherK

**Signature**

```ts
export declare const chainReaderTaskEitherK: <R, E, A, B>(
  f: (a: A) => RTE.ReaderTaskEither<R, E, B>
) => <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## chainReaderTaskEitherKW

Less strict version of [`chainReaderTaskEitherK`](#chainreadertaskeitherk).

**Signature**

```ts
export declare const chainReaderTaskEitherKW: <R, E2, A, B>(
  f: (a: A) => RTE.ReaderTaskEither<R, E2, B>
) => <S, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v2.6.1

## chainStateK

**Signature**

```ts
export declare const chainStateK: <A, S, B>(
  f: (a: A) => State<S, B>
) => <R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.11.0

## chainTaskEitherK

**Signature**

```ts
export declare const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.4.0

## chainTaskEitherKW

Less strict version of [`chainTaskEitherK`](#chaintaskeitherk).

**Signature**

```ts
export declare const chainTaskEitherKW: <E2, A, B>(
  f: (a: A) => TaskEither<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v2.6.1

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <S, R, E>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.10.0

## chainW

Less strict version of [`chain`](#chain).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainW: <S, R2, E2, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(ma: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B>
```

Added in v2.6.0

## flatten

**Signature**

```ts
export declare const flatten: <S, R, E, A>(
  mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## flattenW

Less strict version of [`flatten`](#flatten).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const flattenW: <S, R1, E1, R2, E2, A>(
  mma: StateReaderTaskEither<S, R1, E1, StateReaderTaskEither<S, R2, E2, A>>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A>
```

Added in v2.11.0

# traversing

## sequenceArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceArray: <S, R, E, A>(
  arr: readonly StateReaderTaskEither<S, R, E, A>[]
) => StateReaderTaskEither<S, R, E, readonly A[]>
```

Added in v2.9.0

## traverseArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseArray: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <S, R, E, A, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

Added in v2.9.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, S, R, E, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, S, R, E, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: ReadonlyNonEmptyArray<A>) => StateReaderTaskEither<S, R, E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

# type lambdas

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

# utils

## ap

**Signature**

```ts
export declare const ap: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <S, R, E, B>(
  second: StateReaderTaskEither<S, R, E, B>
) => <A>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.0.0

## apFirstW

Less strict version of [`apFirst`](#apfirst).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apFirstW: <S, R2, E2, A, B>(
  second: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(first: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, A>
```

Added in v2.12.0

## apS

**Signature**

```ts
export declare const apS: <N, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R, E, B>
) => (
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <S, R, E, B>(
  second: StateReaderTaskEither<S, R, E, B>
) => <A>(first: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v2.0.0

## apSecondW

Less strict version of [`apSecond`](#apsecond).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apSecondW: <S, R2, E2, A, B>(
  second: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(first: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B>
```

Added in v2.12.0

## apW

Less strict version of [`ap`](#ap).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apW: <S, R2, E2, A>(
  fa: StateReaderTaskEither<S, R2, E2, A>
) => <R1, E1, B>(fab: StateReaderTaskEither<S, R1, E1, (a: A) => B>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (
  ma: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(
  name: N
) => <S, R, E, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, { readonly [K in N]: A }>
```

Added in v2.8.0

## bindW

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const bindW: <N extends string, A, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
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

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, E>(
  fa: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <S, E, A>(ma: StateReaderTaskEither<S, R1, E, A>) => StateReaderTaskEither<S, R2, E, A>
```

Added in v2.11.0

## throwError

**Signature**

```ts
export declare const throwError: <S, R, E, A>(e: E) => StateReaderTaskEither<S, R, E, A>
```

Added in v2.7.0

# zone of death

## ~~evalState~~

Use [`evaluate`](#evaluate) instead

**Signature**

```ts
export declare const evalState: <S, R, E, A>(
  ma: StateReaderTaskEither<S, R, E, A>,
  s: S
) => RTE.ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## ~~execState~~

Use [`execute`](#execute) instead

**Signature**

```ts
export declare const execState: <S, R, E, A>(
  ma: StateReaderTaskEither<S, R, E, A>,
  s: S
) => RTE.ReaderTaskEither<R, E, S>
```

Added in v2.0.0

## ~~run~~

**Signature**

```ts
export declare function run<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S, r: R): Promise<Either<E, [A, S]>>
```

Added in v2.0.0

## ~~stateReaderTaskEitherSeq~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `SRTE.Functor` instead of `SRTE.stateReaderTaskEitherSeq`
(where `SRTE` is from `import SRTE from 'fp-ts/StateReaderTaskEither'`)

**Signature**

```ts
export declare const stateReaderTaskEitherSeq: Monad4<'StateReaderTaskEither'> &
  Bifunctor4<'StateReaderTaskEither'> &
  Alt4<'StateReaderTaskEither'> &
  MonadTask4<'StateReaderTaskEither'> &
  MonadThrow4<'StateReaderTaskEither'>
```

Added in v2.0.0

## ~~stateReaderTaskEither~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `SRTE.Functor` instead of `SRTE.stateReaderTaskEither`
(where `SRTE` is from `import SRTE from 'fp-ts/StateReaderTaskEither'`)

**Signature**

```ts
export declare const stateReaderTaskEither: Monad4<'StateReaderTaskEither'> &
  Bifunctor4<'StateReaderTaskEither'> &
  Alt4<'StateReaderTaskEither'> &
  MonadTask4<'StateReaderTaskEither'> &
  MonadThrow4<'StateReaderTaskEither'>
```

Added in v2.0.0
