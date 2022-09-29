---
title: ReaderTaskEither.ts
nav_order: 77
parent: Modules
---

## ReaderTaskEither overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [SemigroupK](#semigroupk)
  - [combineK](#combinek)
- [combinators](#combinators)
  - [ap](#ap)
  - [delay](#delay)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromIOK](#fromiok)
  - [fromReaderEitherK](#fromreadereitherk)
  - [fromReaderIOK](#fromreaderiok)
  - [fromReaderK](#fromreaderk)
  - [fromReaderTaskK](#fromreadertaskk)
  - [fromTaskEitherK](#fromtaskeitherk)
  - [fromTaskK](#fromtaskk)
  - [local](#local)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [swap](#swap)
  - [tap](#tap)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderTaskEither](#asksreadertaskeither)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [fromReaderEither](#fromreadereither)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftReader](#leftreader)
  - [leftReaderIO](#leftreaderio)
  - [leftReaderTask](#leftreadertask)
  - [leftTask](#lefttask)
  - [of](#of)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightReader](#rightreader)
  - [rightReaderIO](#rightreaderio)
  - [rightReaderTask](#rightreadertask)
  - [rightTask](#righttask)
  - [sleep](#sleep)
- [error handling](#error-handling)
  - [mapError](#maperror)
  - [orElse](#orelse)
  - [tapError](#taperror)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor)
  - [Flattenable](#flattenable)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [FromTask](#fromtask)
  - [Functor](#functor)
  - [Monad](#monad)
  - [Pointed](#pointed)
  - [SemigroupK](#semigroupk-1)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
  - [getValidatedApplicative](#getvalidatedapplicative)
  - [getValidatedSemigroupK](#getvalidatedsemigroupk)
- [interop](#interop)
  - [flatMapNullableK](#flatmapnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [toUnion](#tounion)
- [lifting](#lifting)
  - [fromOptionK](#fromoptionk)
  - [lift2](#lift2)
  - [lift3](#lift3)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
- [model](#model)
  - [ReaderTaskEither (interface)](#readertaskeither-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromReader](#fromreader)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [pattern matching](#pattern-matching)
  - [getOrElse](#getorelse)
  - [getOrElseWithEffect](#getorelsewitheffect)
  - [match](#match)
  - [matchWithEffect](#matchwitheffect)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
- [sequencing, lifting](#sequencing-lifting)
  - [flatMapEitherK](#flatmapeitherk)
  - [flatMapIOEitherK](#flatmapioeitherk)
  - [flatMapIOK](#flatmapiok)
  - [flatMapOptionK](#flatmapoptionk)
  - [flatMapReaderEitherK](#flatmapreadereitherk)
  - [flatMapReaderIOK](#flatmapreaderiok)
  - [flatMapReaderK](#flatmapreaderk)
  - [flatMapReaderTaskK](#flatmapreadertaskk)
  - [flatMapTaskEitherK](#flatmaptaskeitherk)
  - [flatMapTaskK](#flatmaptaskk)
- [struct sequencing](#struct-sequencing)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [ReaderTaskEitherTypeLambda (interface)](#readertaskeithertypelambda-interface)
- [utils](#utils)
  - [bracket](#bracket)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArrayPar](#sequencereadonlyarraypar)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayPar](#traversereadonlyarraypar)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexPar](#traversereadonlyarraywithindexpar)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayPar](#traversereadonlynonemptyarraypar)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexPar](#traversereadonlynonemptyarraywithindexpar)
  - [unit](#unit)

---

# SemigroupK

## combineK

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const combineK: <R2, E2, B>(
  second: LazyArg<ReaderTaskEither<R2, E2, B>>
) => <R1, E1, A>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2, B | A>
```

Added in v3.0.0

# combinators

## ap

**Signature**

```ts
export declare const ap: <R2, E2, A>(
  fa: ReaderTaskEither<R2, E2, A>
) => <R1, E1, B>(self: ReaderTaskEither<R1, E1, (a: A) => B>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (
  duration: number
) => <R, E, A>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <R, E1>(
    ma: ReaderTaskEither<R, E1, C>
  ) => ReaderTaskEither<R, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <R, E1>(
    mb: ReaderTaskEither<R, E1, B>
  ) => ReaderTaskEither<R, E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <R>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## flatten

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderTaskEither<R1, E1, ReaderTaskEither<R2, E2, A>>
) => ReaderTaskEither<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => either.Either<E, B>
) => (...a: A) => ReaderTaskEither<unknown, E, B>
```

Added in v3.0.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => IOEither<E, B>
) => (...a: A) => ReaderTaskEither<unknown, E, B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => (...a: A) => ReaderTaskEither<unknown, never, B>
```

Added in v3.0.0

## fromReaderEitherK

**Signature**

```ts
export declare const fromReaderEitherK: <A extends readonly unknown[], R, E, B>(
  f: (...a: A) => ReaderEither<R, E, B>
) => (...a: A) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromReaderIOK

**Signature**

```ts
export declare const fromReaderIOK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => ReaderIO<R, B>
) => (...a: A) => ReaderTaskEither<R, never, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderTaskEither<R, never, B>
```

Added in v3.0.0

## fromReaderTaskK

**Signature**

```ts
export declare const fromReaderTaskK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => readerTask.ReaderTask<R, B>
) => (...a: A) => ReaderTaskEither<R, never, B>
```

Added in v3.0.0

## fromTaskEitherK

**Signature**

```ts
export declare const fromTaskEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => taskEither.TaskEither<E, B>
) => (...a: A) => ReaderTaskEither<unknown, E, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => task.Task<B>
) => (...a: A) => ReaderTaskEither<unknown, never, B>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <E, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R2, E, A>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <R>(
    self: ReaderTaskEither<R, E, C>
  ) => readonly [ReaderTaskEither<R, E, C>, ReaderTaskEither<R, E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <R>(
    self: ReaderTaskEither<R, E, B>
  ) => readonly [ReaderTaskEither<R, E, B>, ReaderTaskEither<R, E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => either.Either<B, C>,
  onEmpty: (a: A) => E
) => <R>(self: ReaderTaskEither<R, E, A>) => readonly [ReaderTaskEither<R, E, B>, ReaderTaskEither<R, E, C>]
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <R, E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, A, E>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, R2, E2, _>(
  f: (a: A) => ReaderTaskEither<R2, E2, _>
) => <R1, E1>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <R2, E2, _>(
  that: ReaderTaskEither<R2, E2, _>
) => <R1, E1, A>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <R2, E2, A>(
  that: ReaderTaskEither<R2, E2, A>
) => <R1, E1, _>(self: ReaderTaskEither<R1, E1, _>) => ReaderTaskEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderTaskEither<R, never, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderEither`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderTaskEither<R, never, A>
```

Added in v3.0.0

## asksReaderTaskEither

**Signature**

```ts
export declare const asksReaderTaskEither: <R1, R2, E, A>(
  f: (r1: R1) => ReaderTaskEither<R2, E, A>
) => ReaderTaskEither<R1 & R2, E, A>
```

Added in v3.0.0

## fromOption

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromOption: <E>(onNone: LazyArg<E>) => <A, R>(fa: Option<A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## fromPredicate

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (
    c: C
  ) => ReaderTaskEither<unknown, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => ReaderTaskEither<unknown, E, B>
}
```

Added in v3.0.0

## fromReaderEither

**Signature**

```ts
export declare const fromReaderEither: <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E>(e: E) => ReaderTaskEither<unknown, E, never>
```

Added in v3.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E>(me: IO<E>) => ReaderTaskEither<unknown, E, never>
```

Added in v3.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E>(me: reader.Reader<R, E>) => ReaderTaskEither<R, E, never>
```

Added in v3.0.0

## leftReaderIO

**Signature**

```ts
export declare const leftReaderIO: <R, E>(me: ReaderIO<R, E>) => ReaderTaskEither<R, E, never>
```

Added in v3.0.0

## leftReaderTask

**Signature**

```ts
export declare const leftReaderTask: <R, E>(me: readerTask.ReaderTask<R, E>) => ReaderTaskEither<R, E, never>
```

Added in v3.0.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E>(me: task.Task<E>) => ReaderTaskEither<unknown, E, never>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => ReaderTaskEither<unknown, never, A>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A>(a: A) => ReaderTaskEither<unknown, never, A>
```

Added in v3.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <A>(ma: IO<A>) => ReaderTaskEither<unknown, never, A>
```

Added in v3.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, A>(ma: reader.Reader<R, A>) => ReaderTaskEither<R, never, A>
```

Added in v3.0.0

## rightReaderIO

**Signature**

```ts
export declare const rightReaderIO: <R, A>(ma: ReaderIO<R, A>) => ReaderTaskEither<R, never, A>
```

Added in v3.0.0

## rightReaderTask

**Signature**

```ts
export declare const rightReaderTask: <R, A>(ma: readerTask.ReaderTask<R, A>) => ReaderTaskEither<R, never, A>
```

Added in v3.0.0

## rightTask

**Signature**

```ts
export declare const rightTask: <A>(ma: task.Task<A>) => ReaderTaskEither<unknown, never, A>
```

Added in v3.0.0

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: (duration: number) => ReaderTaskEither<unknown, never, void>
```

Added in v3.0.0

# error handling

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(
  f: (e: E) => G
) => <R, A>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <E1, R2, E2, B>(
  onError: (e: E1) => ReaderTaskEither<R2, E2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2, B | A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, R2, E2, _>(
  onError: (e: E1) => ReaderTaskEither<R2, E2, _>
) => <R1, A>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: fromReader_.FromReader<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: fromTask_.FromTask<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## SemigroupK

**Signature**

```ts
export declare const SemigroupK: semigroupK.SemigroupK<ReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(
  M: Monoid<E>
) => compactable.Compactable<either.ValidatedTypeLambda<ReaderTaskEitherTypeLambda, E>>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(
  M: Monoid<E>
) => filterable.Filterable<either.ValidatedTypeLambda<ReaderTaskEitherTypeLambda, E>>
```

Added in v3.0.0

## getValidatedApplicative

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedApplicative: <E>(
  Apply: apply.Apply<task.TaskTypeLambda>,
  Semigroup: Semigroup<E>
) => applicative.Applicative<either.ValidatedTypeLambda<ReaderTaskEitherTypeLambda, E>>
```

Added in v3.0.0

## getValidatedSemigroupK

The default [`SemigroupK`](#semigroupk) instance returns the last error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedSemigroupK: <E>(
  Semigroup: Semigroup<E>
) => semigroupK.SemigroupK<either.ValidatedTypeLambda<ReaderTaskEitherTypeLambda, E>>
```

Added in v3.0.0

# interop

## flatMapNullableK

**Signature**

```ts
export declare const flatMapNullableK: <E>(
  onNullable: LazyArg<E>
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, NonNullable<B>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(
  onNullable: LazyArg<E>
) => <A>(a: A) => ReaderTaskEither<unknown, E, NonNullable<A>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  onNullable: LazyArg<E>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => ReaderTaskEither<unknown, E, NonNullable<B>>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <R, E, A>(fa: ReaderTaskEither<R, E, A>) => readerTask.ReaderTask<R, E | A>
```

Added in v3.0.0

# lifting

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => ReaderTaskEither<unknown, E, B>
```

Added in v3.0.0

## lift2

Lifts a binary function into `ReaderTaskEither`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, E1, R2, E2>(
  fa: ReaderTaskEither<R1, E1, A>,
  fb: ReaderTaskEither<R2, E2, B>
) => ReaderTaskEither<R1 & R2, E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `ReaderTaskEither`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, E1, R2, E2, R3, E3>(
  fa: ReaderTaskEither<R1, E1, A>,
  fb: ReaderTaskEither<R2, E2, B>,
  fc: ReaderTaskEither<R3, E3, C>
) => ReaderTaskEither<R1 & R2 & R3, E1 | E2 | E3, D>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => ReaderTaskEither<unknown, never, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => ReaderTaskEither<unknown, never, void>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, E, B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, B>
```

Added in v3.0.0

# model

## ReaderTaskEither (interface)

**Signature**

```ts
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}
```

Added in v3.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(fa: either.Either<E, A>) => ReaderTaskEither<unknown, E, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => ReaderTaskEither<unknown, never, A>
```

Added in v3.0.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A>(fa: IOEither<E, A>) => ReaderTaskEither<unknown, E, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(fa: reader.Reader<R, A>) => ReaderTaskEither<R, never, A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A>(fa: task.Task<A>) => ReaderTaskEither<unknown, never, A>
```

Added in v3.0.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <E, A>(fa: taskEither.TaskEither<E, A>) => ReaderTaskEither<unknown, E, A>
```

Added in v3.0.0

# pattern matching

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, B>(
  onError: (e: E) => B
) => <R, A>(ma: ReaderTaskEither<R, E, A>) => readerTask.ReaderTask<R, B | A>
```

Added in v3.0.0

## getOrElseWithEffect

**Signature**

```ts
export declare const getOrElseWithEffect: <E, R2, B>(
  onError: (e: E) => readerTask.ReaderTask<R2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E, A>) => readerTask.ReaderTask<R1 & R2, B | A>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => <R>(ma: ReaderTaskEither<R, E, A>) => readerTask.ReaderTask<R, B | C>
```

Added in v3.0.0

## matchWithEffect

**Signature**

```ts
export declare const matchWithEffect: <E, R2, B, A, R3, C = B>(
  onError: (e: E) => readerTask.ReaderTask<R2, B>,
  onSuccess: (a: A) => readerTask.ReaderTask<R3, C>
) => <R1>(ma: ReaderTaskEither<R1, E, A>) => readerTask.ReaderTask<R1 & R2 & R3, B | C>
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, R2, E2, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

# sequencing, lifting

## flatMapEitherK

**Signature**

```ts
export declare const flatMapEitherK: <A, E2, B>(
  f: (a: A) => either.Either<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, B>
```

Added in v3.0.0

## flatMapIOEitherK

**Signature**

```ts
export declare const flatMapIOEitherK: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, B>
```

Added in v3.0.0

## flatMapIOK

**Signature**

```ts
export declare const flatMapIOK: <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## flatMapOptionK

**Signature**

```ts
export declare const flatMapOptionK: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## flatMapReaderEitherK

**Signature**

```ts
export declare const flatMapReaderEitherK: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## flatMapReaderIOK

**Signature**

```ts
export declare const flatMapReaderIOK: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B>
```

Added in v3.0.0

## flatMapReaderK

**Signature**

```ts
export declare const flatMapReaderK: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B>
```

Added in v3.0.0

## flatMapReaderTaskK

**Signature**

```ts
export declare const flatMapReaderTaskK: <A, R2, B>(
  f: (a: A) => readerTask.ReaderTask<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B>
```

Added in v3.0.0

## flatMapTaskEitherK

**Signature**

```ts
export declare const flatMapTaskEitherK: <A, E2, B>(
  f: (a: A) => taskEither.TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, B>
```

Added in v3.0.0

## flatMapTaskK

**Signature**

```ts
export declare const flatMapTaskK: <A, B>(
  f: (a: A) => task.Task<B>
) => <R, E>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

# struct sequencing

## Do

**Signature**

```ts
export declare const Do: ReaderTaskEither<unknown, never, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  self: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  self: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderTaskEither<R, E, A>
) => ReaderTaskEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: ReaderTaskEither<unknown, never, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, E, A>(self: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <R2, E2, B>(
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A extends readonly unknown[]>(
  self: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <R2, E2, B, A, C>(
  that: ReaderTaskEither<R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, C>
```

Added in v3.0.0

# type lambdas

## ReaderTaskEitherTypeLambda (interface)

**Signature**

```ts
export interface ReaderTaskEitherTypeLambda extends TypeLambda {
  readonly type: ReaderTaskEither<this['In1'], this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare const bracket: <R1, E1, A, R2, E2, B, R3, E3>(
  acquire: ReaderTaskEither<R1, E1, A>,
  use: (a: A) => ReaderTaskEither<R2, E2, B>,
  release: (a: A, e: either.Either<E2, B>) => ReaderTaskEither<R3, E3, void>
) => ReaderTaskEither<R1 & R2 & R3, E1 | E2 | E3, B>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, E, A>(
  arr: readonly ReaderTaskEither<R, E, A>[]
) => ReaderTaskEither<R, E, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <R, E, A>(
  arr: readonly ReaderTaskEither<R, E, A>[]
) => ReaderTaskEither<R, E, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly [A, ...A[]]) => ReaderTaskEither<R, E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayPar

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayPar: <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly [A, ...A[]]) => ReaderTaskEither<R, E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly [A, ...A[]]) => ReaderTaskEither<R, E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexPar

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexPar: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly [A, ...A[]]) => ReaderTaskEither<R, E, readonly [B, ...B[]]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: ReaderTaskEither<unknown, never, void>
```

Added in v3.0.0
