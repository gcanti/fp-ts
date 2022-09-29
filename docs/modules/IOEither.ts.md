---
title: IOEither.ts
nav_order: 53
parent: Modules
---

## IOEither overview

`IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`.

If you want to represent a synchronous computation that never fails, please see `IO`.
If you want to represent a synchronous computation that may yield nothing, please see `IOOption`.

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
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [flap](#flap)
  - [flatMap](#flatmap)
  - [flatMapEitherK](#flatmapeitherk)
  - [flatMapIOK](#flatmapiok)
  - [flatMapOptionK](#flatmapoptionk)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [orElse](#orelse)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [swap](#swap)
  - [tap](#tap)
  - [tapError](#taperror)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [leftIO](#leftio)
  - [right](#right)
  - [rightIO](#rightio)
- [destructors](#destructors)
  - [getOrElse](#getorelse)
  - [getOrElseWithEffect](#getorelsewitheffect)
  - [match](#match)
  - [matchWithEffect](#matchwitheffect)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor-1)
  - [Flattenable](#flattenable)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
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
  - [tryCatch](#trycatch)
  - [tryCatchK](#trycatchk)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [model](#model)
  - [IOEither (interface)](#ioeither-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromOption](#fromoption)
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
- [type lambdas](#type-lambdas)
  - [IOEitherTypeLambda (interface)](#ioeithertypelambda-interface)
- [utils](#utils)
  - [bracket](#bracket)
  - [lift2](#lift2)
  - [lift3](#lift3)
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

# Bifunctor

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: IOEither<E, A>) => IOEither<G, B>
```

Added in v3.0.0

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(f: (e: E) => G) => <A>(self: IOEither<E, A>) => IOEither<G, A>
```

Added in v3.0.0

# Functor

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => IOEither<never, A>
```

Added in v3.0.0

# SemigroupK

## combineK

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const combineK: <E2, B>(
  second: LazyArg<IOEither<E2, B>>
) => <E1, A>(self: IOEither<E1, A>) => IOEither<E2, B | A>
```

Added in v3.0.0

# combinators

## ap

**Signature**

```ts
export declare const ap: <E2, A>(
  fa: IOEither<E2, A>
) => <E1, B>(self: IOEither<E1, (a: A) => B>) => IOEither<E2 | E1, B>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <E1>(
    ma: IOEither<E1, C>
  ) => IOEither<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <E1>(
    mb: IOEither<E1, B>
  ) => IOEither<E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => (self: IOEither<E, A>) => IOEither<E, B>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(self: IOEither<E1, A>) => IOEither<E2 | E1, B>
```

Added in v3.0.0

## flatMapEitherK

**Signature**

```ts
export declare const flatMapEitherK: <A, E2, B>(
  f: (a: A) => either.Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, B>
```

Added in v3.0.0

## flatMapIOK

**Signature**

```ts
export declare const flatMapIOK: <A, B>(f: (a: A) => io.IO<B>) => <E>(self: IOEither<E, A>) => IOEither<E, B>
```

Added in v3.0.0

## flatMapOptionK

**Signature**

```ts
export declare const flatMapOptionK: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v3.0.0

## flatten

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <E1, E2, A>(mma: IOEither<E1, IOEither<E2, A>>) => IOEither<E1 | E2, A>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => either.Either<E, B>
) => (...a: A) => IOEither<E, B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => io.IO<B>
) => (...a: A) => IOEither<never, B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => IOEither<E, B>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <E1, E2, B>(
  onError: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E2, B | A>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (
    self: IOEither<E, C>
  ) => readonly [IOEither<E, C>, IOEither<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (
    self: IOEither<E, B>
  ) => readonly [IOEither<E, B>, IOEither<E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => either.Either<B, C>,
  onEmpty: (a: A) => E
) => (self: IOEither<E, A>) => readonly [IOEither<E, B>, IOEither<E, C>]
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, E2, _>(
  f: (a: A) => IOEither<E2, _>
) => <E1>(self: IOEither<E1, A>) => IOEither<E2 | E1, A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, E2, _>(
  onError: (e: E1) => IOEither<E2, _>
) => <A>(self: IOEither<E1, A>) => IOEither<E1 | E2, A>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <E2, _>(that: IOEither<E2, _>) => <E1, A>(self: IOEither<E1, A>) => IOEither<E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <E2, A>(that: IOEither<E2, A>) => <E1, _>(self: IOEither<E1, _>) => IOEither<E2 | E1, A>
```

Added in v3.0.0

# constructors

## fromPredicate

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => IOEither<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => IOEither<E, B>
}
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E>(e: E) => IOEither<E, never>
```

Added in v3.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E>(me: io.IO<E>) => IOEither<E, never>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A>(a: A) => IOEither<never, A>
```

Added in v3.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <A>(ma: io.IO<A>) => IOEither<never, A>
```

Added in v3.0.0

# destructors

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, B>(onError: (e: E) => B) => <A>(ma: IOEither<E, A>) => io.IO<B | A>
```

Added in v3.0.0

## getOrElseWithEffect

**Signature**

```ts
export declare const getOrElseWithEffect: <E, B>(onError: (e: E) => io.IO<B>) => <A>(ma: IOEither<E, A>) => io.IO<B | A>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => (ma: IOEither<E, A>) => io.IO<B | C>
```

Added in v3.0.0

## matchWithEffect

**Signature**

```ts
export declare const matchWithEffect: <E, B, A, C = B>(
  onError: (e: E) => io.IO<B>,
  onSuccess: (a: A) => io.IO<C>
) => (ma: IOEither<E, A>) => io.IO<B | C>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<IOEitherTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<IOEitherTypeLambda>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<IOEitherTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<IOEitherTypeLambda>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<IOEitherTypeLambda>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<IOEitherTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<IOEitherTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<IOEitherTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<IOEitherTypeLambda>
```

Added in v3.0.0

## SemigroupK

**Signature**

```ts
export declare const SemigroupK: semigroupK.SemigroupK<IOEitherTypeLambda>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(
  M: Monoid<E>
) => compactable.Compactable<either.ValidatedTypeLambda<IOEitherTypeLambda, E>>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(
  M: Monoid<E>
) => filterable.Filterable<either.ValidatedTypeLambda<IOEitherTypeLambda, E>>
```

Added in v3.0.0

## getValidatedApplicative

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedApplicative: <E>(
  Semigroup: Semigroup<E>
) => applicative.Applicative<either.ValidatedTypeLambda<IOEitherTypeLambda, E>>
```

Added in v3.0.0

## getValidatedSemigroupK

The default [`SemigroupK`](#semigroupk) instance returns the last error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedSemigroupK: <E>(
  Semigroup: Semigroup<E>
) => semigroupK.SemigroupK<either.ValidatedTypeLambda<IOEitherTypeLambda, E>>
```

Added in v3.0.0

# interop

## flatMapNullableK

**Signature**

```ts
export declare const flatMapNullableK: <E>(
  onNullable: LazyArg<E>
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: IOEither<E, A>) => IOEither<E, NonNullable<B>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => IOEither<E, NonNullable<A>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  onNullable: LazyArg<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => B | null | undefined) => (...a: A) => IOEither<E, NonNullable<B>>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: IOEither<E, A>) => io.IO<E | A>
```

Added in v3.0.0

## tryCatch

Constructs a new `IOEither` from a function that performs a side effect and might throw.

See also [`tryCatchK`](#tryCatchK).

**Signature**

```ts
export declare const tryCatch: <A, E>(f: LazyArg<A>, onThrow: (error: unknown) => E) => IOEither<E, A>
```

Added in v3.0.0

## tryCatchK

Converts a function that may throw to one returning a `IOEither`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
) => (...a: A) => IOEither<E, B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => IOEither<never, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => IOEither<never, void>
```

Added in v3.0.0

# model

## IOEither (interface)

**Signature**

```ts
export interface IOEither<E, A> extends IO<Either<E, A>> {}
```

Added in v3.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(fa: either.Either<E, A>) => IOEither<E, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: io.IO<A>) => IOEither<never, A>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => IOEither<E, A>
```

Added in v3.0.0

# struct sequencing

## Do

**Signature**

```ts
export declare const Do: IOEither<never, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E2, B>
) => <E1>(self: IOEither<E1, A>) => IOEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E2, B>
) => <E1>(self: IOEither<E1, A>) => IOEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <E, A>(self: IOEither<E, A>) => IOEither<E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: IOEither<E, A>) => IOEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: IOEither<never, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(self: IOEither<E, A>) => IOEither<E, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <E2, B>(
  fb: IOEither<E2, B>
) => <E1, A extends readonly unknown[]>(self: IOEither<E1, A>) => IOEither<E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

# type lambdas

## IOEitherTypeLambda (interface)

**Signature**

```ts
export interface IOEitherTypeLambda extends TypeLambda {
  readonly type: IOEither<this['Out2'], this['Out1']>
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
export declare const bracket: <E1, A, E2, B, E3>(
  acquire: IOEither<E1, A>,
  use: (a: A) => IOEither<E2, B>,
  release: (a: A, e: either.Either<E2, B>) => IOEither<E3, void>
) => IOEither<E1 | E2 | E3, B>
```

Added in v3.0.0

## lift2

Lifts a binary function into `IOEither`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: IOEither<E1, A>, fb: IOEither<E2, B>) => IOEither<E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `IOEither`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(fa: IOEither<E1, A>, fb: IOEither<E2, B>, fc: IOEither<E3, C>) => IOEither<E1 | E2 | E3, D>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E, A>(arr: readonly IOEither<E, A>[]) => IOEither<E, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <E, A>(arr: readonly IOEither<E, A>[]) => IOEither<E, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (as: readonly [A, ...A[]]) => IOEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayPar

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayPar: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (as: readonly [A, ...A[]]) => IOEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly [A, ...A[]]) => IOEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexPar

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexPar: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly [A, ...A[]]) => IOEither<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: IOEither<never, void>
```

Added in v3.0.0
