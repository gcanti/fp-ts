---
title: StateReaderTaskEither.ts
nav_order: 91
parent: Modules
---

## StateReaderTaskEither overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor](#bifunctor)
  - [mapBoth](#mapboth)
  - [mapError](#maperror)
- [Functor](#functor)
  - [map](#map)
- [Pointed](#pointed)
  - [of](#of)
- [SemigroupK](#semigroupk)
  - [combineK](#combinek)
- [combinators](#combinators)
  - [ap](#ap)
  - [delay](#delay)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [flap](#flap)
  - [flatMap](#flatmap)
  - [flatMapEitherK](#flatmapeitherk)
  - [flatMapIOEitherK](#flatmapioeitherk)
  - [flatMapIOK](#flatmapiok)
  - [flatMapOptionK](#flatmapoptionk)
  - [flatMapReaderK](#flatmapreaderk)
  - [flatMapReaderTaskEitherK](#flatmapreadertaskeitherk)
  - [flatMapStateK](#flatmapstatek)
  - [flatMapTaskEitherK](#flatmaptaskeitherk)
  - [flatMapTaskK](#flatmaptaskk)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [fromReaderK](#fromreaderk)
  - [fromReaderTaskEitherK](#fromreadertaskeitherk)
  - [fromStateK](#fromstatek)
  - [fromTaskEitherK](#fromtaskeitherk)
  - [fromTaskK](#fromtaskk)
  - [local](#local)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [tap](#tap)
  - [tapError](#taperror)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksStateReaderTaskEither](#asksstatereadertaskeither)
  - [fromPredicate](#frompredicate)
  - [fromReaderTaskEither](#fromreadertaskeither)
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
  - [sleep](#sleep)
- [do notation](#do-notation)
  - [bindT](#bindt)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor-1)
  - [Flattenable](#flattenable)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [FromState](#fromstate)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [SemigroupK](#semigroupk-1)
- [interop](#interop)
  - [flatMapNullableK](#flatmapnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [model](#model)
  - [StateReaderTaskEither (interface)](#statereadertaskeither-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromReader](#fromreader)
  - [fromReaderEither](#fromreadereither)
  - [fromState](#fromstate)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [type lambdas](#type-lambdas)
  - [StateReaderTaskEitherTypeLambda (interface)](#statereadertaskeithertypelambda-interface)
- [utils](#utils)
  - [bind](#bind)
  - [bindPar](#bindpar)
  - [bindTPar](#bindtpar)
  - [bindTo](#bindto)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [let](#let)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [tupled](#tupled)
  - [unit](#unit)

---

# Bifunctor

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B>
```

Added in v3.0.0

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(
  f: (e: E) => G
) => <S, R, A>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A>
```

Added in v3.0.0

# Functor

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, S>(a: A) => StateReaderTaskEither<S, unknown, never, A>
```

Added in v3.0.0

# SemigroupK

## combineK

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const combineK: <S, R2, E2, B>(
  second: LazyArg<StateReaderTaskEither<S, R2, E2, B>>
) => <R1, E1, A>(self: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2, B | A>
```

Added in v3.0.0

# combinators

## ap

**Signature**

```ts
export declare const ap: <S, R2, E2, A>(
  fa: StateReaderTaskEither<S, R2, E2, A>
) => <R1, E1, B>(self: StateReaderTaskEither<S, R1, E1, (a: A) => B>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (
  duration: number
) => <S, R, E, A>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, C>
  ) => StateReaderTaskEither<S, R, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <S, R, E1>(
    mb: StateReaderTaskEither<S, R, E1, B>
  ) => StateReaderTaskEither<S, R, E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <S, R>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(
  a: A
) => <S, R, E, B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(self: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## flatMapEitherK

**Signature**

```ts
export declare const flatMapEitherK: <A, E2, B>(
  f: (a: A) => either.Either<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## flatMapIOEitherK

**Signature**

```ts
export declare const flatMapIOEitherK: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## flatMapIOK

**Signature**

```ts
export declare const flatMapIOK: <A, B>(
  f: (a: A) => IO<B>
) => <S, R, E>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## flatMapOptionK

**Signature**

```ts
export declare const flatMapOptionK: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## flatMapReaderK

**Signature**

```ts
export declare const flatMapReaderK: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <S, R1, E>(ma: StateReaderTaskEither<S, R1, E, A>) => StateReaderTaskEither<S, R1 & R2, E, B>
```

Added in v3.0.0

## flatMapReaderTaskEitherK

**Signature**

```ts
export declare const flatMapReaderTaskEitherK: <A, R, E2, B>(
  f: (a: A) => readerTaskEither.ReaderTaskEither<R, E2, B>
) => <S, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## flatMapStateK

**Signature**

```ts
export declare const flatMapStateK: <A, S, B>(
  f: (a: A) => State<S, B>
) => <R, E>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## flatMapTaskEitherK

**Signature**

```ts
export declare const flatMapTaskEitherK: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E2 | E1, B>
```

Added in v3.0.0

## flatMapTaskK

**Signature**

```ts
export declare const flatMapTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <S, R, E>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## flatten

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <S, R1, E1, R2, E2, A>(
  mma: StateReaderTaskEither<S, R1, E1, StateReaderTaskEither<S, R2, E2, A>>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => either.Either<E, B>
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, E, B>
```

Added in v3.0.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => IOEither<E, B>
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, E, B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, never, B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, E, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => <S>(...a: A) => StateReaderTaskEither<S, R, never, B>
```

Added in v3.0.0

## fromReaderTaskEitherK

**Signature**

```ts
export declare const fromReaderTaskEitherK: <A extends readonly unknown[], R, E, B>(
  f: (...a: A) => readerTaskEither.ReaderTaskEither<R, E, B>
) => <S>(...a: A) => StateReaderTaskEither<S, R, E, B>
```

Added in v3.0.0

## fromStateK

**Signature**

```ts
export declare const fromStateK: <A extends readonly unknown[], S, B>(
  f: (...a: A) => State<S, B>
) => (...a: A) => StateReaderTaskEither<S, unknown, never, B>
```

Added in v3.0.0

## fromTaskEitherK

**Signature**

```ts
export declare const fromTaskEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => TaskEither<E, B>
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, E, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => Task<B>
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, never, B>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <S, E, A>(ma: StateReaderTaskEither<S, R1, E, A>) => StateReaderTaskEither<S, R2, E, A>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <S, R>(
    self: StateReaderTaskEither<S, R, E, C>
  ) => readonly [StateReaderTaskEither<S, R, E, C>, StateReaderTaskEither<S, R, E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <S, R>(
    self: StateReaderTaskEither<S, R, E, B>
  ) => readonly [StateReaderTaskEither<S, R, E, B>, StateReaderTaskEither<S, R, E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => either.Either<B, C>,
  onEmpty: (a: A) => E
) => <S, R>(
  self: StateReaderTaskEither<S, R, E, A>
) => readonly [StateReaderTaskEither<S, R, E, B>, StateReaderTaskEither<S, R, E, C>]
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, S, R2, E2, _>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, _>
) => <R1, E1>(self: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, S, R2, E2, _>(
  onError: (e: E1) => StateReaderTaskEither<S, R2, E2, _>
) => <R1, A>(self: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <S, R2, E2, _>(
  second: StateReaderTaskEither<S, R2, E2, _>
) => <R1, E1, A>(self: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <S, R2, E2, A>(
  second: StateReaderTaskEither<S, R2, E2, A>
) => <R1, E1, _>(self: StateReaderTaskEither<S, R1, E1, _>) => StateReaderTaskEither<S, R1 & R2, E2 | E1, A>
```

Added in v3.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <S, R>() => StateReaderTaskEither<S, R, never, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderEither`.

**Signature**

```ts
export declare const asks: <R, A, S>(f: (r: R) => A) => StateReaderTaskEither<S, R, never, A>
```

Added in v3.0.0

## asksStateReaderTaskEither

**Signature**

```ts
export declare const asksStateReaderTaskEither: <R1, S, R2, E, A>(
  f: (r1: R1) => StateReaderTaskEither<S, R2, E, A>
) => StateReaderTaskEither<S, R1 & R2, E, A>
```

Added in v3.0.0

## fromPredicate

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <S>(
    c: C
  ) => StateReaderTaskEither<S, unknown, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <S>(
    b: B
  ) => StateReaderTaskEither<S, unknown, E, B>
}
```

Added in v3.0.0

## fromReaderTaskEither

**Signature**

```ts
export declare const fromReaderTaskEither: <R, E, A, S>(
  fa: readerTaskEither.ReaderTaskEither<R, E, A>
) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## get

Get the current state

**Signature**

```ts
export declare const get: <S>() => StateReaderTaskEither<S, unknown, never, S>
```

Added in v3.0.0

## gets

Get a value which depends on the current state

**Signature**

```ts
export declare const gets: <S, A>(f: (s: S) => A) => StateReaderTaskEither<S, unknown, never, A>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E, S>(e: E) => StateReaderTaskEither<S, unknown, E, never>
```

Added in v3.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E, S>(me: IO<E>) => StateReaderTaskEither<S, unknown, E, never>
```

Added in v3.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E, S>(me: reader.Reader<R, E>) => StateReaderTaskEither<S, R, E, never>
```

Added in v3.0.0

## leftState

**Signature**

```ts
export declare const leftState: <S, E>(me: State<S, E>) => StateReaderTaskEither<S, unknown, E, never>
```

Added in v3.0.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E, S>(me: Task<E>) => StateReaderTaskEither<S, unknown, E, never>
```

Added in v3.0.0

## modify

Modify the state by applying a function to the current state

**Signature**

```ts
export declare const modify: <S>(f: Endomorphism<S>) => StateReaderTaskEither<S, unknown, never, void>
```

Added in v3.0.0

## put

Set the state

**Signature**

```ts
export declare const put: <S>(s: S) => StateReaderTaskEither<S, unknown, never, void>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A, S>(a: A) => StateReaderTaskEither<S, unknown, never, A>
```

Added in v3.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <A, S>(ma: IO<A>) => StateReaderTaskEither<S, unknown, never, A>
```

Added in v3.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, A, S>(ma: reader.Reader<R, A>) => StateReaderTaskEither<S, R, never, A>
```

Added in v3.0.0

## rightState

**Signature**

```ts
export declare const rightState: <S, A>(ma: State<S, A>) => StateReaderTaskEither<S, unknown, never, A>
```

Added in v3.0.0

## rightTask

**Signature**

```ts
export declare const rightTask: <A, S>(ma: Task<A>) => StateReaderTaskEither<S, unknown, never, A>
```

Added in v3.0.0

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: <S>(duration: number) => StateReaderTaskEither<S, unknown, never, void>
```

Added in v3.0.0

# do notation

## bindT

**Signature**

```ts
export declare const bindT: <A extends readonly unknown[], S, R2, E2, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  self: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: fromReader_.FromReader<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## FromState

**Signature**

```ts
export declare const FromState: fromState_.FromState<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: fromTask_.FromTask<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed_<StateReaderTaskEitherTypeLambda>
```

Added in v3.0.0

## SemigroupK

**Signature**

```ts
export declare const SemigroupK: semigroupK.SemigroupK<StateReaderTaskEitherTypeLambda>
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
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, NonNullable<B>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(
  onNullable: LazyArg<E>
) => <A, S>(a: A) => StateReaderTaskEither<S, unknown, E, NonNullable<A>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  onNullable: LazyArg<E>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => <S>(...a: A) => StateReaderTaskEither<S, unknown, E, NonNullable<B>>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: <S>(...x: ReadonlyArray<unknown>) => StateReaderTaskEither<S, unknown, never, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: <S>(...x: ReadonlyArray<unknown>) => StateReaderTaskEither<S, unknown, never, void>
```

Added in v3.0.0

# model

## StateReaderTaskEither (interface)

**Signature**

```ts
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, readonly [S, A]>
}
```

Added in v3.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A, S>(fa: either.Either<E, A>) => StateReaderTaskEither<S, unknown, E, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, S>(fa: IO<A>) => StateReaderTaskEither<S, unknown, never, A>
```

Added in v3.0.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A, S>(fa: IOEither<E, A>) => StateReaderTaskEither<S, unknown, E, A>
```

Added in v3.0.0

## fromOption

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromOption: <E>(
  onNone: LazyArg<E>
) => <A, S, R>(fa: Option<A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A, S>(fa: reader.Reader<R, A>) => StateReaderTaskEither<S, R, never, A>
```

Added in v3.0.0

## fromReaderEither

**Signature**

```ts
export declare const fromReaderEither: <R, E, A, S>(fa: ReaderEither<R, E, A>) => StateReaderTaskEither<S, R, E, A>
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare const fromState: <S, A>(fa: State<S, A>) => StateReaderTaskEither<S, unknown, never, A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A, S>(fa: Task<A>) => StateReaderTaskEither<S, unknown, never, A>
```

Added in v3.0.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <E, A, S>(fa: TaskEither<E, A>) => StateReaderTaskEither<S, unknown, E, A>
```

Added in v3.0.0

# type lambdas

## StateReaderTaskEitherTypeLambda (interface)

**Signature**

```ts
export interface StateReaderTaskEitherTypeLambda extends TypeLambda {
  readonly type: StateReaderTaskEither<this['InOut1'], this['In1'], this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  self: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindPar

**Signature**

```ts
export declare const bindPar: <N extends string, A, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  self: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTPar

**Signature**

```ts
export declare const bindTPar: <S, R2, E2, B>(
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1, A extends readonly unknown[]>(
  self: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <S, R, E, A>(self: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## evaluate

Run a computation in the `StateReaderTaskEither` monad, discarding the final state

**Signature**

```ts
export declare const evaluate: <S>(
  s: S
) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => readerTaskEither.ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## execute

Run a computation in the `StateReaderTaskEither` monad discarding the result

**Signature**

```ts
export declare const execute: <S>(
  s: S
) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => readerTaskEither.ReaderTaskEither<R, E, S>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, E>(
  self: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## lift2

Lifts a binary function into `StateReaderTaskEither`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <S, R1, E1, R2, E2>(
  fa: StateReaderTaskEither<S, R1, E1, A>,
  fb: StateReaderTaskEither<S, R2, E2, B>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `StateReaderTaskEither`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S, R1, E1, R2, E2, R3, E3>(
  fa: StateReaderTaskEither<S, R1, E1, A>,
  fb: StateReaderTaskEither<S, R2, E2, B>,
  fc: StateReaderTaskEither<S, R3, E3, C>
) => StateReaderTaskEither<S, R1 & R2 & R3, E1 | E2 | E3, D>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <S, R, E, A>(
  arr: readonly StateReaderTaskEither<S, R, E, A>[]
) => StateReaderTaskEither<S, R, E, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, S, R, E, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, S, R, E, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: readonly A[]) => StateReaderTaskEither<S, R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, S, R, E, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: readonly [A, ...A[]]) => StateReaderTaskEither<S, R, E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, S, R, E, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: readonly [A, ...A[]]) => StateReaderTaskEither<S, R, E, readonly [B, ...B[]]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <S, R, E, A>(
  self: StateReaderTaskEither<S, R, E, A>
) => StateReaderTaskEither<S, R, E, readonly [A]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: <S>() => StateReaderTaskEither<S, unknown, never, void>
```

Added in v3.0.0
