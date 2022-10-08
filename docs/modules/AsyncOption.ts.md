---
title: AsyncOption.ts
nav_order: 6
parent: Modules
---

## AsyncOption overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [none](#none)
  - [sleep](#sleep)
  - [some](#some)
- [conversions](#conversions)
  - [fromAsync](#fromasync)
  - [fromAsyncResult](#fromasyncresult)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromResult](#fromresult)
  - [fromSync](#fromsync)
  - [fromSyncResult](#fromsyncresult)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [guard](#guard)
  - [let](#let)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [getOrElse](#getorelse)
  - [getOrElseAsync](#getorelseasync)
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
  - [Alternative](#alternative)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [CategoryKind](#categorykind)
  - [Compactable](#compactable)
  - [Filterable](#filterable)
  - [Flattenable](#flattenable)
  - [FromAsync](#fromasync)
  - [FromIdentity](#fromidentity)
  - [FromOption](#fromoption)
  - [FromResult](#fromresult)
  - [FromSync](#fromsync)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
- [interop](#interop)
  - [fromRejectable](#fromrejectable)
  - [liftRejectable](#liftrejectable)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftAsync](#liftasync)
  - [liftAsyncResult](#liftasyncresult)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftResult](#liftresult)
  - [liftSync](#liftsync)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [unit](#unit)
- [model](#model)
  - [AsyncOption (interface)](#asyncoption-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchAsync](#matchasync)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapAsync](#flatmapasync)
  - [flatMapAsyncResult](#flatmapasyncresult)
  - [flatMapNullable](#flatmapnullable)
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
  - [AsyncOptionTypeLambda (interface)](#asyncoptiontypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [composeKleisli](#composekleisli)
  - [delay](#delay)
  - [flatten](#flatten)
  - [idKleisli](#idkleisli)
  - [orElse](#orelse)
  - [tap](#tap)

---

# constructors

## none

**Signature**

```ts
export declare const none: AsyncOption<never>
```

Added in v3.0.0

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: (duration: number) => AsyncOption<void>
```

Added in v3.0.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => AsyncOption<A>
```

Added in v3.0.0

# conversions

## fromAsync

**Signature**

```ts
export declare const fromAsync: <A>(fa: async.Async<A>) => AsyncOption<A>
```

Added in v3.0.0

## fromAsyncResult

**Signature**

```ts
export declare const fromAsyncResult: <A>(fa: AsyncResult<unknown, A>) => AsyncOption<A>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => AsyncOption<NonNullable<A>>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(fa: option.Option<A>) => AsyncOption<A>
```

Added in v3.0.0

## fromResult

**Signature**

```ts
export declare const fromResult: <A>(fa: Result<unknown, A>) => AsyncOption<A>
```

Added in v3.0.0

## fromSync

**Signature**

```ts
export declare const fromSync: <A>(fa: Sync<A>) => AsyncOption<A>
```

Added in v3.0.0

## fromSyncResult

**Signature**

```ts
export declare const fromSyncResult: <A>(fa: SyncResult<unknown, A>) => AsyncOption<A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: AsyncOption<{}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AsyncOption<B>
) => (self: AsyncOption<A>) => AsyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: AsyncOption<B>
) => (self: AsyncOption<A>) => AsyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <A>(self: AsyncOption<A>) => AsyncOption<{ readonly [K in N]: A }>
```

Added in v3.0.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => AsyncOption<void>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: AsyncOption<A>) => AsyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## catchAll

Lazy version of `orElse`.

**Signature**

```ts
export declare const catchAll: <B>(that: LazyArg<AsyncOption<B>>) => <A>(self: AsyncOption<A>) => AsyncOption<B | A>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onNone: B) => <A>(self: AsyncOption<A>) => async.Async<B | A>
```

Added in v3.0.0

## getOrElseAsync

**Signature**

```ts
export declare const getOrElseAsync: <B>(onNone: async.Async<B>) => <A>(self: AsyncOption<A>) => async.Async<B | A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: (onNone: AsyncOption<unknown>) => <A>(self: AsyncOption<A>) => AsyncOption<A>
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <A>(foa: AsyncOption<option.Option<A>>) => AsyncOption<A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: AsyncOption<C>) => AsyncOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: AsyncOption<B>) => AsyncOption<B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => option.Option<B>) => (fa: AsyncOption<A>) => AsyncOption<B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: AsyncOption<C>
  ) => readonly [AsyncOption<C>, AsyncOption<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: AsyncOption<B>) => readonly [AsyncOption<B>, AsyncOption<B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => (fa: AsyncOption<A>) => readonly [AsyncOption<B>, AsyncOption<C>]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: AsyncOption<Result<A, B>>) => readonly [AsyncOption<A>, AsyncOption<B>]
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: alt.Alt<AsyncOptionTypeLambda>
```

Added in v3.0.0

## Alternative

**Signature**

```ts
export declare const Alternative: alternative.Alternative<AsyncOptionTypeLambda>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<AsyncOptionTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<AsyncOptionTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: kleisliCategory.KleisliCategory<AsyncOptionTypeLambda>
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: compactable.Compactable<AsyncOptionTypeLambda>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: filterable.Filterable<AsyncOptionTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<AsyncOptionTypeLambda>
```

Added in v3.0.0

## FromAsync

**Signature**

```ts
export declare const FromAsync: fromAsync_.FromAsync<AsyncOptionTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<AsyncOptionTypeLambda>
```

Added in v3.0.0

## FromOption

**Signature**

```ts
export declare const FromOption: fromOption_.FromOption<AsyncOptionTypeLambda>
```

Added in v3.0.0

## FromResult

**Signature**

```ts
export declare const FromResult: fromResult_.FromResult<AsyncOptionTypeLambda>
```

Added in v3.0.0

## FromSync

**Signature**

```ts
export declare const FromSync: fromSync_.FromSync<AsyncOptionTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<AsyncOptionTypeLambda>
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: kleisliComposable.KleisliComposable<AsyncOptionTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<AsyncOptionTypeLambda>
```

Added in v3.0.0

# interop

## fromRejectable

Converts a `Promise` that may reject to a `AsyncOption`.

**Signature**

```ts
export declare const fromRejectable: <A>(f: LazyArg<Promise<A>>) => AsyncOption<A>
```

Added in v3.0.0

## liftRejectable

Lifts a function returning a `Promise` to one returning a `AsyncOption`.

**Signature**

```ts
export declare const liftRejectable: <A extends readonly unknown[], B>(
  f: (...a: A) => Promise<B>
) => (...a: A) => AsyncOption<B>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `AsyncOption`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => (fa: AsyncOption<A>, fb: AsyncOption<B>) => AsyncOption<C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `AsyncOption`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: AsyncOption<A>, fb: AsyncOption<B>, fc: AsyncOption<C>) => AsyncOption<D>
```

Added in v3.0.0

## liftAsync

**Signature**

```ts
export declare const liftAsync: <A extends readonly unknown[], B>(
  f: (...a: A) => async.Async<B>
) => (...a: A) => AsyncOption<B>
```

Added in v3.0.0

## liftAsyncResult

**Signature**

```ts
export declare const liftAsyncResult: <A extends readonly unknown[], B>(
  f: (...a: A) => AsyncResult<unknown, B>
) => (...a: A) => AsyncOption<B>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => AsyncOption<NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B>(
  f: (...a: A) => option.Option<B>
) => (...a: A) => AsyncOption<B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => AsyncOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => AsyncOption<B>
}
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => AsyncOption<B>
```

Added in v3.0.0

## liftSync

**Signature**

```ts
export declare const liftSync: <A extends readonly unknown[], B>(f: (...a: A) => Sync<B>) => (...a: A) => AsyncOption<B>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => (self: AsyncOption<unknown>) => AsyncOption<B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: AsyncOption<(a: A) => B>) => AsyncOption<B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: AsyncOption<A>) => AsyncOption<B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: (self: AsyncOption<unknown>) => AsyncOption<void>
```

Added in v3.0.0

# model

## AsyncOption (interface)

**Signature**

```ts
export interface AsyncOption<A> extends Async<Option<A>> {}
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <B, A, C = B>(
  onNone: LazyArg<B>,
  onSome: (a: A) => C
) => (ma: AsyncOption<A>) => async.Async<B | C>
```

Added in v3.0.0

## matchAsync

**Signature**

```ts
export declare const matchAsync: <B, A, C = B>(
  onNone: LazyArg<async.Async<B>>,
  onSome: (a: A) => async.Async<C>
) => (ma: AsyncOption<A>) => async.Async<B | C>
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => AsyncOption<B>) => (self: AsyncOption<A>) => AsyncOption<B>
```

Added in v3.0.0

## flatMapAsync

**Signature**

```ts
export declare const flatMapAsync: <A, B>(f: (a: A) => async.Async<B>) => (self: AsyncOption<A>) => AsyncOption<B>
```

Added in v3.0.0

## flatMapAsyncResult

**Signature**

```ts
export declare const flatMapAsyncResult: <A, B>(
  f: (a: A) => AsyncResult<unknown, B>
) => (ma: AsyncOption<A>) => AsyncOption<B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: AsyncOption<A>) => AsyncOption<NonNullable<B>>
```

Added in v3.0.0

## flatMapResult

**Signature**

```ts
export declare const flatMapResult: <A, E, B>(f: (a: A) => Result<E, B>) => (ma: AsyncOption<A>) => AsyncOption<B>
```

Added in v3.0.0

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => (self: AsyncOption<A>) => AsyncOption<B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: (that: AsyncOption<unknown>) => <A>(self: AsyncOption<A>) => AsyncOption<A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: AsyncOption<A>) => (self: AsyncOption<unknown>) => AsyncOption<A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(arr: readonly AsyncOption<A>[]) => AsyncOption<readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <A>(arr: readonly AsyncOption<A>[]) => AsyncOption<readonly A[]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <A, B>(
  f: (a: A) => AsyncOption<B>
) => (as: readonly [A, ...A[]]) => AsyncOption<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayPar

Equivalent to `NonEmptyReadonlyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayPar: <A, B>(
  f: (a: A) => AsyncOption<B>
) => (as: readonly [A, ...A[]]) => AsyncOption<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => AsyncOption<B>
) => (as: readonly [A, ...A[]]) => AsyncOption<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndexPar

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndexPar: <A, B>(
  f: (index: number, a: A) => AsyncOption<B>
) => (as: readonly [A, ...A[]]) => AsyncOption<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(
  f: (a: A) => AsyncOption<B>
) => (as: readonly A[]) => AsyncOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, B>(
  f: (a: A) => AsyncOption<B>
) => (as: readonly A[]) => AsyncOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => AsyncOption<B>
) => (as: readonly A[]) => AsyncOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, B>(
  f: (index: number, a: A) => AsyncOption<B>
) => (as: readonly A[]) => AsyncOption<readonly B[]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: AsyncOption<readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: AsyncOption<A>) => AsyncOption<readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <B>(
  fb: AsyncOption<B>
) => <A extends readonly unknown[]>(self: AsyncOption<A>) => AsyncOption<readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <B, A, C>(
  that: AsyncOption<B>,
  f: (a: A, b: B) => C
) => (self: AsyncOption<A>) => AsyncOption<C>
```

Added in v3.0.0

# type lambdas

## AsyncOptionTypeLambda (interface)

**Signature**

```ts
export interface AsyncOptionTypeLambda extends TypeLambda {
  readonly type: AsyncOption<this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <A>(fa: AsyncOption<A>) => <B>(self: AsyncOption<(a: A) => B>) => AsyncOption<B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, C>(
  bfc: (b: B) => AsyncOption<C>
) => <A>(afb: (a: A) => AsyncOption<B>) => (a: A) => AsyncOption<C>
```

Added in v3.0.0

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (duration: number) => <A>(self: AsyncOption<A>) => AsyncOption<A>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: AsyncOption<AsyncOption<A>>) => AsyncOption<A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => AsyncOption<A>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <B>(that: AsyncOption<B>) => <A>(self: AsyncOption<A>) => AsyncOption<B | A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A>(f: (a: A) => AsyncOption<unknown>) => (self: AsyncOption<A>) => AsyncOption<A>
```

Added in v3.0.0
