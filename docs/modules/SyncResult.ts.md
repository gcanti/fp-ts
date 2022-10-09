---
title: SyncResult.ts
nav_order: 80
parent: Modules
---

## SyncResult overview

`SyncResult<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`.

If you want to represent a synchronous computation that never fails, please see `Sync`.
If you want to represent a synchronous computation that may yield nothing, please see `SyncOption`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fail](#fail)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [failSync](#failsync)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromResult](#fromresult)
  - [fromSync](#fromsync)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [firstSuccessOf](#firstsuccessof)
  - [firstSuccessOfNonEmpty](#firstsuccessofnonempty)
  - [flatMapError](#flatmaperror)
  - [getOrElse](#getorelse)
  - [getOrElseSync](#getorelsesync)
  - [getValidatedAlt](#getvalidatedalt)
  - [getValidatedApplicative](#getvalidatedapplicative)
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
  - [Alt](#alt)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor)
  - [CategoryKind](#categorykind)
  - [Flattenable](#flattenable)
  - [FromIdentity](#fromidentity)
  - [FromResult](#fromresult)
  - [FromSync](#fromsync)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
- [interop](#interop)
  - [fromThrowable](#fromthrowable)
  - [liftThrowable](#liftthrowable)
  - [toUnion](#tounion)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftResult](#liftresult)
  - [liftSync](#liftsync)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [unit](#unit)
- [model](#model)
  - [SyncResult (interface)](#syncresult-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchSync](#matchsync)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatMapResult](#flatmapresult)
  - [flatMapSync](#flatmapsync)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArrayPar](#sequencereadonlyarraypar)
  - [traverseNonEmptyReadonlyArray](#traversenonemptyreadonlyarray)
  - [traverseNonEmptyReadonlyArrayPar](#traversenonemptyreadonlyarraypar)
  - [traverseNonEmptyReadonlyArrayWithIndex](#traversenonemptyreadonlyarraywithindex)
  - [traverseNonEmptyReadonlyArrayWithIndexPar](#traversenonemptyreadonlyarraywithindexpar)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayPar](#traversereadonlyarraypar)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexPar](#traversereadonlyarraywithindexpar)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [SyncResultTypeLambda (interface)](#syncresulttypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [bracket](#bracket)
  - [composeKleisli](#composekleisli)
  - [flatten](#flatten)
  - [idKleisli](#idkleisli)
  - [orElse](#orelse)
  - [swap](#swap)
  - [tap](#tap)

---

# constructors

## fail

**Signature**

```ts
export declare const fail: <E>(e: E) => SyncResult<E, never>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => SyncResult<never, A>
```

Added in v3.0.0

# conversions

## failSync

**Signature**

```ts
export declare const failSync: <E>(me: sync.Sync<E>) => SyncResult<E, never>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: E) => <A>(a: A) => SyncResult<E, NonNullable<A>>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: E) => <A>(fa: Option<A>) => SyncResult<E, A>
```

Added in v3.0.0

## fromResult

**Signature**

```ts
export declare const fromResult: <E, A>(fa: result.Result<E, A>) => SyncResult<E, A>
```

Added in v3.0.0

## fromSync

**Signature**

```ts
export declare const fromSync: <A>(ma: sync.Sync<A>) => SyncResult<never, A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: SyncResult<never, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => SyncResult<E2, B>
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  fb: SyncResult<E2, B>
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <E, A>(self: SyncResult<E, A>) => SyncResult<E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: SyncResult<E, A>) => SyncResult<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## catchAll

Recovers from all errors.

**Signature**

```ts
export declare const catchAll: <E1, E2, B>(
  onError: (e: E1) => SyncResult<E2, B>
) => <A>(ma: SyncResult<E1, A>) => SyncResult<E2, B | A>
```

Added in v3.0.0

## firstSuccessOf

Returns an effect that runs each of the specified effects in order until one of them succeeds.

**Signature**

```ts
export declare const firstSuccessOf: <E, A>(
  startWith: SyncResult<E, A>
) => (iterable: Iterable<SyncResult<E, A>>) => SyncResult<E, A>
```

Added in v3.0.0

## firstSuccessOfNonEmpty

Returns an effect that runs the first effect and in case of failure, runs
each of the specified effects in order until one of them succeeds.

**Signature**

```ts
export declare const firstSuccessOfNonEmpty: <E, A>(
  head: SyncResult<E, A>,
  ...tail: readonly SyncResult<E, A>[]
) => SyncResult<E, A>
```

Added in v3.0.0

## flatMapError

Creates a composite effect that represents this effect followed by another
one that may depend on the error produced by this one.

**Signature**

```ts
export declare const flatMapError: <E1, E2>(
  f: (e: E1) => sync.Sync<E2>
) => <A>(self: SyncResult<E1, A>) => SyncResult<E2, A>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onError: B) => <A>(self: SyncResult<unknown, A>) => sync.Sync<B | A>
```

Added in v3.0.0

## getOrElseSync

**Signature**

```ts
export declare const getOrElseSync: <B>(onError: sync.Sync<B>) => <A>(self: SyncResult<unknown, A>) => sync.Sync<B | A>
```

Added in v3.0.0

## getValidatedAlt

The default [`Alt`](#semigroupkind) instance returns the last error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedAlt: <E>(
  Semigroup: Semigroup<E>
) => alt.Alt<result.ValidatedT<SyncResultTypeLambda, E>>
```

Added in v3.0.0

## getValidatedApplicative

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedApplicative: <E>(
  Semigroup: Semigroup<E>
) => applicative.Applicative<result.ValidatedT<SyncResultTypeLambda, E>>
```

Added in v3.0.0

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(f: (e: E) => G) => <A>(self: SyncResult<E, A>) => SyncResult<G, A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, E2>(
  onError: (e: E1) => SyncResult<E2, unknown>
) => <A>(self: SyncResult<E1, A>) => SyncResult<E1 | E2, A>
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <E>(onNone: E) => <A>(self: SyncResult<E, Option<A>>) => SyncResult<E, A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: E2): <E1>(
    ma: SyncResult<E1, C>
  ) => SyncResult<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: E2): <E1>(mb: SyncResult<E1, B>) => SyncResult<E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: E
) => (self: SyncResult<E, A>) => SyncResult<E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (
    self: SyncResult<E, C>
  ) => readonly [SyncResult<E, C>, SyncResult<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (
    self: SyncResult<E, B>
  ) => readonly [SyncResult<E, B>, SyncResult<E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => result.Result<B, C>,
  onEmpty: E
) => (self: SyncResult<E, A>) => readonly [SyncResult<E, B>, SyncResult<E, C>]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <E>(
  onEmpty: E
) => <A, B>(self: SyncResult<E, result.Result<A, B>>) => readonly [SyncResult<E, A>, SyncResult<E, B>]
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: alt.Alt<SyncResultTypeLambda>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<SyncResultTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<SyncResultTypeLambda>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<SyncResultTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: kleisliCategory.KleisliCategory<SyncResultTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<SyncResultTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<SyncResultTypeLambda>
```

Added in v3.0.0

## FromResult

**Signature**

```ts
export declare const FromResult: fromResult_.FromResult<SyncResultTypeLambda>
```

Added in v3.0.0

## FromSync

**Signature**

```ts
export declare const FromSync: fromSync_.FromSync<SyncResultTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<SyncResultTypeLambda>
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: kleisliComposable.KleisliComposable<SyncResultTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<SyncResultTypeLambda>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(onNone: E) => Compactable<result.ValidatedT<SyncResultTypeLambda, E>>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(onEmpty: E) => filterable.Filterable<result.ValidatedT<SyncResultTypeLambda, E>>
```

Added in v3.0.0

# interop

## fromThrowable

Constructs a new `SyncResult` from a function that performs a side effect and might throw.

**Signature**

```ts
export declare const fromThrowable: <A, E>(f: () => A, onThrow: (error: unknown) => E) => SyncResult<E, A>
```

Added in v3.0.0

## liftThrowable

Lifts a function that may throw to one returning a `SyncResult`.

**Signature**

```ts
export declare const liftThrowable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
) => (...a: A) => SyncResult<E, B>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: SyncResult<E, A>) => sync.Sync<E | A>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `SyncResult`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: SyncResult<E1, A>, fb: SyncResult<E2, B>) => SyncResult<E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `SyncResult`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(fa: SyncResult<E1, A>, fb: SyncResult<E2, B>, fc: SyncResult<E3, C>) => SyncResult<E1 | E2 | E3, D>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => SyncResult<E, NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => SyncResult<E, B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (c: C) => SyncResult<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (b: B) => SyncResult<E, B>
}
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => result.Result<E, B>
) => (...a: A) => SyncResult<E, B>
```

Added in v3.0.0

## liftSync

**Signature**

```ts
export declare const liftSync: <A extends readonly unknown[], B>(
  f: (...a: A) => sync.Sync<B>
) => (...a: A) => SyncResult<never, B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: <A extends readonly unknown[]>(...x: A) => SyncResult<never, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: <A extends readonly unknown[]>(...x: A) => SyncResult<never, void>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <E>(self: SyncResult<E, unknown>) => SyncResult<E, B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: SyncResult<E, (a: A) => B>) => SyncResult<E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: SyncResult<E, A>) => SyncResult<E, B>
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
) => (self: SyncResult<E, A>) => SyncResult<G, B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: <E>(self: SyncResult<E, unknown>) => SyncResult<E, void>
```

Added in v3.0.0

# model

## SyncResult (interface)

**Signature**

```ts
export interface SyncResult<E, A> extends Sync<Result<E, A>> {}
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => (ma: SyncResult<E, A>) => sync.Sync<B | C>
```

Added in v3.0.0

## matchSync

**Signature**

```ts
export declare const matchSync: <E, B, A, C = B>(
  onError: (e: E) => sync.Sync<B>,
  onSuccess: (a: A) => sync.Sync<C>
) => (ma: SyncResult<E, A>) => sync.Sync<B | C>
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, E2, B>(
  f: (a: A) => SyncResult<E2, B>
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, NonNullable<B>>
```

Added in v3.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: E2
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, B>
```

Added in v3.0.0

## flatMapResult

**Signature**

```ts
export declare const flatMapResult: <A, E2, B>(
  f: (a: A) => result.Result<E2, B>
) => <E1>(ma: SyncResult<E1, A>) => SyncResult<E2 | E1, B>
```

Added in v3.0.0

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <A, B>(f: (a: A) => sync.Sync<B>) => <E>(self: SyncResult<E, A>) => SyncResult<E, B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <E2>(
  that: SyncResult<E2, unknown>
) => <E1, A>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <E2, A>(
  that: SyncResult<E2, A>
) => <E1>(self: SyncResult<E1, unknown>) => SyncResult<E2 | E1, A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E, A>(arr: readonly SyncResult<E, A>[]) => SyncResult<E, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <E, A>(arr: readonly SyncResult<E, A>[]) => SyncResult<E, readonly A[]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <A, E, B>(
  f: (a: A) => SyncResult<E, B>
) => (as: readonly [A, ...A[]]) => SyncResult<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayPar

Equivalent to `NonEmptyReadonlyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayPar: <A, E, B>(
  f: (a: A) => SyncResult<E, B>
) => (as: readonly [A, ...A[]]) => SyncResult<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => SyncResult<E, B>
) => (as: readonly [A, ...A[]]) => SyncResult<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndexPar

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndexPar: <A, E, B>(
  f: (index: number, a: A) => SyncResult<E, B>
) => (as: readonly [A, ...A[]]) => SyncResult<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, E, B>(
  f: (a: A) => SyncResult<E, B>
) => (as: readonly A[]) => SyncResult<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, E, B>(
  f: (a: A) => SyncResult<E, B>
) => (as: readonly A[]) => SyncResult<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => SyncResult<E, B>
) => (as: readonly A[]) => SyncResult<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, E, B>(
  f: (index: number, a: A) => SyncResult<E, B>
) => (as: readonly A[]) => SyncResult<E, readonly B[]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: SyncResult<never, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(self: SyncResult<E, A>) => SyncResult<E, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <E2, B>(
  fb: SyncResult<E2, B>
) => <E1, A extends readonly unknown[]>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <E2, B, A, C>(
  that: SyncResult<E2, B>,
  f: (a: A, b: B) => C
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, C>
```

Added in v3.0.0

# type lambdas

## SyncResultTypeLambda (interface)

**Signature**

```ts
export interface SyncResultTypeLambda extends TypeLambda {
  readonly type: SyncResult<this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <E2, A>(
  fa: SyncResult<E2, A>
) => <E1, B>(self: SyncResult<E1, (a: A) => B>) => SyncResult<E2 | E1, B>
```

Added in v3.0.0

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Failure`

**Signature**

```ts
export declare const bracket: <E1, A, E2, B, E3>(
  acquire: SyncResult<E1, A>,
  use: (a: A) => SyncResult<E2, B>,
  release: (a: A, e: result.Result<E2, B>) => SyncResult<E3, void>
) => SyncResult<E1 | E2 | E3, B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, E2, C>(
  bfc: (b: B) => SyncResult<E2, C>
) => <A, E1>(afb: (a: A) => SyncResult<E1, B>) => (a: A) => SyncResult<E2 | E1, C>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <E1, E2, A>(mma: SyncResult<E1, SyncResult<E2, A>>) => SyncResult<E1 | E2, A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => SyncResult<never, A>
```

Added in v3.0.0

## orElse

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const orElse: <E2, B>(
  that: SyncResult<E2, B>
) => <E1, A>(self: SyncResult<E1, A>) => SyncResult<E2, B | A>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: SyncResult<E, A>) => SyncResult<A, E>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, E2>(
  f: (a: A) => SyncResult<E2, unknown>
) => <E1>(self: SyncResult<E1, A>) => SyncResult<E2 | E1, A>
```

Added in v3.0.0
