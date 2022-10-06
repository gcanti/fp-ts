---
title: SyncOption.ts
nav_order: 98
parent: Modules
---

## SyncOption overview

`SyncOption<A>` represents a synchronous computation that either yields a value of type `A` or nothing.

If you want to represent a synchronous computation that never fails, please see `Sync`.
If you want to represent a synchronous computation that may fail, please see `SyncResult`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [none](#none)
  - [some](#some)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromResult](#fromresult)
  - [fromSync](#fromsync)
  - [fromSyncResult](#fromsyncresult)
  - [toNull](#tonull)
  - [toUndefined](#toundefined)
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
  - [getOrElseSync](#getorelsesync)
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
  - [FromIdentity](#fromidentity)
  - [FromOption](#fromoption)
  - [FromResult](#fromresult)
  - [FromSync](#fromsync)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
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
  - [unit](#unit)
- [model](#model)
  - [SyncOption (interface)](#syncoption-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchSync](#matchsync)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapResult](#flatmapresult)
  - [flatMapSync](#flatmapsync)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [SyncOptionTypeLambda (interface)](#syncoptiontypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [composeKleisli](#composekleisli)
  - [flatten](#flatten)
  - [idKleisli](#idkleisli)
  - [orElse](#orelse)
  - [tap](#tap)

---

# constructors

## none

**Signature**

```ts
export declare const none: SyncOption<never>
```

Added in v3.0.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => SyncOption<A>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => SyncOption<A>
```

Added in v3.0.0

# conversions

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => SyncOption<NonNullable<A>>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(fa: option.Option<A>) => SyncOption<A>
```

Added in v3.0.0

## fromResult

**Signature**

```ts
export declare const fromResult: <A>(e: Result<unknown, A>) => sync.Sync<option.Option<A>>
```

Added in v3.0.0

## fromSync

**Signature**

```ts
export declare const fromSync: <A>(ma: sync.Sync<A>) => SyncOption<A>
```

Added in v3.0.0

## fromSyncResult

**Signature**

```ts
export declare const fromSyncResult: <A>(ma: SyncResult<unknown, A>) => SyncOption<A>
```

Added in v3.0.0

## toNull

**Signature**

```ts
export declare const toNull: <A>(self: SyncOption<A>) => sync.Sync<A | null>
```

Added in v3.0.0

## toUndefined

**Signature**

```ts
export declare const toUndefined: <A>(self: SyncOption<A>) => sync.Sync<A | undefined>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: SyncOption<{}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => SyncOption<B>
) => (self: SyncOption<A>) => SyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: SyncOption<B>
) => (self: SyncOption<A>) => SyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <A>(self: SyncOption<A>) => SyncOption<{ readonly [K in N]: A }>
```

Added in v3.0.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => SyncOption<void>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: SyncOption<A>) => SyncOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## catchAll

Lazy version of `orElse`.

**Signature**

```ts
export declare const catchAll: <B>(that: LazyArg<SyncOption<B>>) => <A>(self: SyncOption<A>) => SyncOption<B | A>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onNone: B) => <A>(self: SyncOption<A>) => sync.Sync<B | A>
```

Added in v3.0.0

## getOrElseSync

**Signature**

```ts
export declare const getOrElseSync: <B>(onNone: sync.Sync<B>) => <A>(self: SyncOption<A>) => sync.Sync<B | A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: (onNone: SyncOption<unknown>) => <A>(self: SyncOption<A>) => SyncOption<A>
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <A>(foa: SyncOption<option.Option<A>>) => SyncOption<A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: SyncOption<C>) => SyncOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: SyncOption<B>) => SyncOption<B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => option.Option<B>) => (fga: SyncOption<A>) => SyncOption<B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: SyncOption<C>
  ) => readonly [SyncOption<C>, SyncOption<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: SyncOption<B>) => readonly [SyncOption<B>, SyncOption<B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => (fa: SyncOption<A>) => readonly [SyncOption<B>, SyncOption<C>]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: SyncOption<Result<A, B>>) => readonly [SyncOption<A>, SyncOption<B>]
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: alt.Alt<SyncOptionTypeLambda>
```

Added in v3.0.0

## Alternative

**Signature**

```ts
export declare const Alternative: alternative.Alternative<SyncOptionTypeLambda>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<SyncOptionTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<SyncOptionTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: kleisliCategory.KleisliCategory<SyncOptionTypeLambda>
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: compactable.Compactable<SyncOptionTypeLambda>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: filterable.Filterable<SyncOptionTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<SyncOptionTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<SyncOptionTypeLambda>
```

Added in v3.0.0

## FromOption

**Signature**

```ts
export declare const FromOption: fromOption_.FromOption<SyncOptionTypeLambda>
```

Added in v3.0.0

## FromResult

**Signature**

```ts
export declare const FromResult: fromResult_.FromResult<SyncOptionTypeLambda>
```

Added in v3.0.0

## FromSync

**Signature**

```ts
export declare const FromSync: fromSync_.FromSync<SyncOptionTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<SyncOptionTypeLambda>
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: kleisliComposable.KleisliComposable<SyncOptionTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<SyncOptionTypeLambda>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `SyncOption`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: SyncOption<A>, fb: SyncOption<B>) => SyncOption<C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `SyncOption`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: SyncOption<A>, fb: SyncOption<B>, fc: SyncOption<C>) => SyncOption<D>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => SyncOption<NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B>(
  f: (...a: A) => option.Option<B>
) => (...a: A) => SyncOption<B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => SyncOption<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => SyncOption<B>
}
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => SyncOption<B>
```

Added in v3.0.0

## liftSync

**Signature**

```ts
export declare const liftSync: <A extends readonly unknown[], B>(
  f: (...a: A) => sync.Sync<B>
) => (...a: A) => SyncOption<B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => SyncOption<void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => SyncOption<void>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => (self: SyncOption<unknown>) => SyncOption<B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: SyncOption<(a: A) => B>) => SyncOption<B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: SyncOption<A>) => SyncOption<B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: (self: SyncOption<unknown>) => SyncOption<void>
```

Added in v3.0.0

# model

## SyncOption (interface)

**Signature**

```ts
export interface SyncOption<A> extends Sync<Option<A>> {}
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <B, A, C = B>(
  onNone: LazyArg<B>,
  onSome: (a: A) => C
) => (ma: SyncOption<A>) => sync.Sync<B | C>
```

Added in v3.0.0

## matchSync

**Signature**

```ts
export declare const matchSync: <B, A, C = B>(
  onNone: LazyArg<sync.Sync<B>>,
  onSome: (a: A) => sync.Sync<C>
) => (ma: SyncOption<A>) => sync.Sync<B | C>
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => SyncOption<B>) => (self: SyncOption<A>) => SyncOption<B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: SyncOption<A>) => SyncOption<NonNullable<B>>
```

Added in v3.0.0

## flatMapResult

**Signature**

```ts
export declare const flatMapResult: <A, E, B>(f: (a: A) => Result<E, B>) => (ma: SyncOption<A>) => SyncOption<B>
```

Added in v3.0.0

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <A, B>(f: (a: A) => sync.Sync<B>) => (self: SyncOption<A>) => SyncOption<B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: (that: SyncOption<unknown>) => <A>(self: SyncOption<A>) => SyncOption<A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: SyncOption<A>) => (self: SyncOption<unknown>) => SyncOption<A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(arr: readonly SyncOption<A>[]) => SyncOption<readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(
  f: (a: A) => SyncOption<B>
) => (as: readonly A[]) => SyncOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => SyncOption<B>
) => (as: readonly A[]) => SyncOption<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, B>(
  f: (a: A) => SyncOption<B>
) => (as: readonly [A, ...A[]]) => SyncOption<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => SyncOption<B>
) => (as: readonly [A, ...A[]]) => SyncOption<readonly [B, ...B[]]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: SyncOption<readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: SyncOption<A>) => SyncOption<readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <B>(
  fb: SyncOption<B>
) => <A extends readonly unknown[]>(self: SyncOption<A>) => SyncOption<readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <B, A, C>(
  that: SyncOption<B>,
  f: (a: A, b: B) => C
) => (self: SyncOption<A>) => SyncOption<C>
```

Added in v3.0.0

# type lambdas

## SyncOptionTypeLambda (interface)

**Signature**

```ts
export interface SyncOptionTypeLambda extends TypeLambda {
  readonly type: SyncOption<this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <A>(fa: SyncOption<A>) => <B>(fab: SyncOption<(a: A) => B>) => SyncOption<B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, C>(
  bfc: (b: B) => SyncOption<C>
) => <A>(afb: (a: A) => SyncOption<B>) => (a: A) => SyncOption<C>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: SyncOption<SyncOption<A>>) => SyncOption<A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => SyncOption<A>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <B>(that: SyncOption<B>) => <A>(self: SyncOption<A>) => SyncOption<B | A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A>(f: (a: A) => SyncOption<unknown>) => (self: SyncOption<A>) => SyncOption<A>
```

Added in v3.0.0
