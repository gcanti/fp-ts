---
title: ReaderEither.ts
nav_order: 74
parent: Modules
---

## ReaderEither overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [SemigroupK](#semigroupk)
  - [orElse](#orelse)
- [combinators](#combinators)
  - [flatten](#flatten)
  - [local](#local)
  - [swap](#swap)
  - [tap](#tap)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderEither](#asksreadereither)
  - [left](#left)
  - [leftReader](#leftreader)
  - [of](#of)
  - [right](#right)
  - [rightReader](#rightreader)
- [conversions](#conversions)
  - [fromEither](#fromeither)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromReader](#fromreader)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [getOrElse](#getorelse)
  - [getOrElseReader](#getorelsereader)
  - [getValidatedApplicative](#getvalidatedapplicative)
  - [getValidatedSemigroupKind](#getvalidatedsemigroupkind)
  - [mapError](#maperror)
  - [tapError](#taperror)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [separate](#separate)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor)
  - [CategoryKind](#categorykind)
  - [ComposableKind](#composablekind)
  - [Flattenable](#flattenable)
  - [FromEither](#fromeither)
  - [FromReader](#fromreader)
  - [Functor](#functor)
  - [Monad](#monad)
  - [Pointed](#pointed)
  - [SemigroupKind](#semigroupkind)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
- [interop](#interop)
  - [toUnion](#tounion)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftEither](#lifteither)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftReader](#liftreader)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
- [model](#model)
  - [ReaderEither (interface)](#readereither-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchReader](#matchreader)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapEither](#flatmapeither)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatMapReader](#flatmapreader)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [ReaderEitherTypeLambda (interface)](#readereithertypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [bracket](#bracket)
  - [composeKind](#composekind)
  - [idKind](#idkind)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [unit](#unit)

---

# SemigroupK

## orElse

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const orElse: <R2, E2, B>(
  that: ReaderEither<R2, E2, B>
) => <R1, E1, A>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2, B | A>
```

Added in v3.0.0

# combinators

## flatten

**Signature**

```ts
export declare const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderEither<R1, E1, ReaderEither<R2, E2, A>>
) => ReaderEither<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <E, A>(ma: ReaderEither<R1, E, A>) => ReaderEither<R2, E, A>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, R2, E2, _>(
  f: (a: A) => ReaderEither<R2, E2, _>
) => <R1, E1>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderEither<R, never, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderEither`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderEither<R, never, A>
```

Added in v3.0.0

## asksReaderEither

**Signature**

```ts
export declare const asksReaderEither: <R1, R2, E, A>(
  f: (r1: R1) => ReaderEither<R2, E, A>
) => ReaderEither<R1 & R2, E, A>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E>(e: E) => ReaderEither<unknown, E, never>
```

Added in v3.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E>(me: reader.Reader<R, E>) => ReaderEither<R, E, never>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => ReaderEither<unknown, never, A>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A>(a: A) => ReaderEither<unknown, never, A>
```

Added in v3.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, A>(ma: reader.Reader<R, A>) => ReaderEither<R, never, A>
```

Added in v3.0.0

# conversions

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(fa: either.Either<E, A>) => ReaderEither<unknown, E, A>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => ReaderEither<unknown, E, NonNullable<A>>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => ReaderEither<unknown, E, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(fa: reader.Reader<R, A>) => ReaderEither<R, never, A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: ReaderEither<unknown, never, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(
  self: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderEither<R2, E2, B>
) => <R1, E1>(
  self: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderEither<R, E, A>) => ReaderEither<R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderEither<R, E, A>
) => ReaderEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## catchAll

Recovers from all errors.

**Signature**

```ts
export declare const catchAll: <E1, R1, E2, B>(
  onError: (e: E1) => ReaderEither<R1, E2, B>
) => <R2, A>(ma: ReaderEither<R2, E1, A>) => ReaderEither<R1 & R2, E2, B | A>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, B>(
  onError: (e: E) => B
) => <R, A>(ma: ReaderEither<R, E, A>) => reader.Reader<R, B | A>
```

Added in v3.0.0

## getOrElseReader

**Signature**

```ts
export declare const getOrElseReader: <E, R2, B>(
  onError: (e: E) => reader.Reader<R2, B>
) => <R1, A>(ma: ReaderEither<R1, E, A>) => reader.Reader<R1 & R2, B | A>
```

Added in v3.0.0

## getValidatedApplicative

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedApplicative: <E>(
  Semigroup: Semigroup<E>
) => applicative.Applicative<either.ValidatedTypeLambda<ReaderEitherTypeLambda, E>>
```

Added in v3.0.0

## getValidatedSemigroupKind

The default [`SemigroupKind`](#semigroupkind) instance returns the last error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedSemigroupKind: <E>(
  Semigroup: Semigroup<E>
) => semigroupKind.SemigroupKind<either.ValidatedTypeLambda<ReaderEitherTypeLambda, E>>
```

Added in v3.0.0

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(f: (e: E) => G) => <R, A>(self: ReaderEither<R, E, A>) => ReaderEither<R, G, A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, R2, E2, _>(
  onError: (e: E1) => ReaderEither<R2, E2, _>
) => <R1, A>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <E>(
  onNone: LazyArg<E>
) => <R, A>(self: ReaderEither<R, E, Option<A>>) => ReaderEither<R, E, A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <R, E1>(
    ma: ReaderEither<R, E1, C>
  ) => ReaderEither<R, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <R, E1>(
    mb: ReaderEither<R, E1, B>
  ) => ReaderEither<R, E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <R>(self: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <R>(
    self: ReaderEither<R, E, C>
  ) => readonly [ReaderEither<R, E, C>, ReaderEither<R, E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <R>(
    self: ReaderEither<R, E, B>
  ) => readonly [ReaderEither<R, E, B>, ReaderEither<R, E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => either.Either<B, C>,
  onEmpty: (a: A) => E
) => <R>(self: ReaderEither<R, E, A>) => readonly [ReaderEither<R, E, B>, ReaderEither<R, E, C>]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <E>(
  onEmpty: LazyArg<E>
) => <R, A, B>(self: ReaderEither<R, E, either.Either<A, B>>) => readonly [ReaderEither<R, E, A>, ReaderEither<R, E, B>]
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ReaderEitherTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<ReaderEitherTypeLambda>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<ReaderEitherTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: categoryKind.CategoryKind<ReaderEitherTypeLambda>
```

Added in v3.0.0

## ComposableKind

**Signature**

```ts
export declare const ComposableKind: composableKind.ComposableKind<ReaderEitherTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<ReaderEitherTypeLambda>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<ReaderEitherTypeLambda>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: fromReader_.FromReader<ReaderEitherTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderEitherTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ReaderEitherTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<ReaderEitherTypeLambda>
```

Added in v3.0.0

## SemigroupKind

**Signature**

```ts
export declare const SemigroupKind: semigroupKind.SemigroupKind<ReaderEitherTypeLambda>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(
  onNone: LazyArg<E>
) => Compactable<either.ValidatedTypeLambda<ReaderEitherTypeLambda, E>>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(
  M: Monoid<E>
) => filterable.Filterable<either.ValidatedTypeLambda<ReaderEitherTypeLambda, E>>
```

Added in v3.0.0

# interop

## toUnion

**Signature**

```ts
export declare const toUnion: <R, E, A>(fa: ReaderEither<R, E, A>) => reader.Reader<R, E | A>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `ReaderEither`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, E1, R2, E2>(fa: ReaderEither<R1, E1, A>, fb: ReaderEither<R2, E2, B>) => ReaderEither<R1 & R2, E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `ReaderEither`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, E1, R2, E2, R3, E3>(
  fa: ReaderEither<R1, E1, A>,
  fb: ReaderEither<R2, E2, B>,
  fc: ReaderEither<R3, E3, C>
) => ReaderEither<R1 & R2 & R3, E1 | E2 | E3, D>
```

Added in v3.0.0

## liftEither

**Signature**

```ts
export declare const liftEither: <A extends readonly unknown[], E, B>(
  f: (...a: A) => either.Either<E, B>
) => (...a: A) => ReaderEither<unknown, E, B>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: LazyArg<E>
) => (...a: A) => ReaderEither<unknown, E, NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => ReaderEither<unknown, E, B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (
    c: C
  ) => ReaderEither<unknown, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => ReaderEither<unknown, E, B>
}
```

Added in v3.0.0

## liftReader

**Signature**

```ts
export declare const liftReader: <A extends readonly unknown[], R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderEither<R, never, B>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, E, B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
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
) => <R>(self: ReaderEither<R, E, A>) => ReaderEither<R, G, B>
```

Added in v3.0.0

# model

## ReaderEither (interface)

**Signature**

```ts
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => <R>(ma: reader.Reader<R, either.Either<E, A>>) => reader.Reader<R, B | C>
```

Added in v3.0.0

## matchReader

**Signature**

```ts
export declare const matchReader: <E, R2, B, A, R3, C = B>(
  onError: (e: E) => reader.Reader<R2, B>,
  onSuccess: (a: A) => reader.Reader<R3, C>
) => <R1>(ma: reader.Reader<R1, either.Either<E, A>>) => reader.Reader<R1 & R2 & R3, B | C>
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## flatMapEither

**Signature**

```ts
export declare const flatMapEither: <A, E2, B>(
  f: (a: A) => either.Either<E2, B>
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E2 | E1, B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: LazyArg<E2>
) => <R, E1>(self: ReaderEither<R, E1, A>) => ReaderEither<R, E2 | E1, NonNullable<B>>
```

Added in v3.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E2
) => <R, E1>(self: ReaderEither<R, E1, A>) => ReaderEither<R, E2 | E1, B>
```

Added in v3.0.0

## flatMapReader

**Signature**

```ts
export declare const flatMapReader: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1, E>(ma: ReaderEither<R1, E, A>) => ReaderEither<R1 & R2, E, B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <R2, E2, _>(
  that: ReaderEither<R2, E2, _>
) => <R1, E1, A>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <R2, E2, A>(
  that: ReaderEither<R2, E2, A>
) => <R1, E1, _>(self: ReaderEither<R1, E1, _>) => ReaderEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: ReaderEither<unknown, never, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, E, A>(self: ReaderEither<R, E, A>) => ReaderEither<R, E, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <R2, E2, B>(
  fb: ReaderEither<R2, E2, B>
) => <R1, E1, A extends readonly unknown[]>(
  self: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <R2, E2, B, A, C>(
  that: ReaderEither<R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E2 | E1, C>
```

Added in v3.0.0

# type lambdas

## ReaderEitherTypeLambda (interface)

**Signature**

```ts
export interface ReaderEitherTypeLambda extends TypeLambda {
  readonly type: ReaderEither<this['In1'], this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <R2, E2, A>(
  fa: ReaderEither<R2, E2, A>
) => <R1, E1, B>(self: ReaderEither<R1, E1, (a: A) => B>) => ReaderEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare const bracket: <R, E, A, B>(
  aquire: ReaderEither<R, E, A>,
  use: (a: A) => ReaderEither<R, E, B>,
  release: (a: A, e: either.Either<E, B>) => ReaderEither<R, E, void>
) => ReaderEither<R, E, B>
```

Added in v3.0.0

## composeKind

**Signature**

```ts
export declare const composeKind: <B, R2, E2, C>(
  bfc: (b: B) => ReaderEither<R2, E2, C>
) => <A, R1, E1>(afb: (a: A) => ReaderEither<R1, E1, B>) => (a: A) => ReaderEither<R1 & R2, E2 | E1, C>
```

Added in v3.0.0

## idKind

**Signature**

```ts
export declare const idKind: <A>() => (a: A) => ReaderEither<unknown, never, A>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, E, A>(
  arr: readonly ReaderEither<R, E, A>[]
) => ReaderEither<R, E, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (as: readonly A[]) => ReaderEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderEither<R, E, B>
) => (as: readonly A[]) => ReaderEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (as: readonly [A, ...A[]]) => ReaderEither<R, E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderEither<R, E, B>
) => (as: readonly [A, ...A[]]) => ReaderEither<R, E, readonly [B, ...B[]]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: ReaderEither<unknown, never, void>
```

Added in v3.0.0
