---
title: ReaderAsync.ts
nav_order: 72
parent: Modules
---

## ReaderAsync overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderAsync](#asksreaderasync)
  - [sleep](#sleep)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [fromAsync](#fromasync)
  - [fromReader](#fromreader)
  - [fromReaderSync](#fromreadersync)
  - [fromSync](#fromsync)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindRightPar](#bindrightpar)
  - [bindTo](#bindto)
  - [let](#let)
- [instances](#instances)
  - [Applicative](#applicative)
  - [ApplicativePar](#applicativepar)
  - [Apply](#apply)
  - [ApplyPar](#applypar)
  - [CategoryKind](#categorykind)
  - [Flattenable](#flattenable)
  - [FromAsync](#fromasync)
  - [FromIdentity](#fromidentity)
  - [FromReader](#fromreader)
  - [FromSync](#fromsync)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift2Par](#lift2par)
  - [lift3](#lift3)
  - [lift3Par](#lift3par)
  - [liftAsync](#liftasync)
  - [liftReader](#liftreader)
  - [liftReaderSync](#liftreadersync)
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
  - [ReaderAsync (interface)](#readerasync-interface)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapAsync](#flatmapasync)
  - [flatMapReader](#flatmapreader)
  - [flatMapReaderSync](#flatmapreadersync)
  - [flatMapSync](#flatmapsync)
  - [zipLeft](#zipleft)
  - [zipLeftPar](#zipleftpar)
  - [zipRight](#zipright)
  - [zipRightPar](#ziprightpar)
- [traversing](#traversing)
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
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipFlattenPar](#zipflattenpar)
  - [zipWith](#zipwith)
  - [zipWithPar](#zipwithpar)
- [type lambdas](#type-lambdas)
  - [ReaderAsyncTypeLambda (interface)](#readerasynctypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [apPar](#appar)
  - [composeKleisli](#composekleisli)
  - [delay](#delay)
  - [flatten](#flatten)
  - [idKleisli](#idkleisli)
  - [local](#local)
  - [tap](#tap)

---

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderAsync<R, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderAsync`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderAsync<R, A>
```

Added in v3.0.0

## asksReaderAsync

**Signature**

```ts
export declare const asksReaderAsync: <R1, R2, A>(f: (r1: R1) => ReaderAsync<R2, A>) => ReaderAsync<R1 & R2, A>
```

Added in v3.0.0

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: (duration: number) => ReaderAsync<unknown, void>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => ReaderAsync<unknown, A>
```

Added in v3.0.0

# conversions

## fromAsync

**Signature**

```ts
export declare const fromAsync: <A>(fa: async.Async<A>) => ReaderAsync<unknown, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(fa: reader.Reader<R, A>) => ReaderAsync<R, A>
```

Added in v3.0.0

## fromReaderSync

**Signature**

```ts
export declare const fromReaderSync: <R, A>(fa: ReaderSync<R, A>) => ReaderAsync<R, A>
```

Added in v3.0.0

## fromSync

**Signature**

```ts
export declare const fromSync: <A>(fa: Sync<A>) => ReaderAsync<unknown, A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: ReaderAsync<unknown, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderAsync<R2, B>
) => <R1>(
  self: ReaderAsync<R1, A>
) => ReaderAsync<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderAsync<R2, B>
) => <R1>(
  self: ReaderAsync<R1, A>
) => ReaderAsync<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRightPar

A variant of `bind` that ignores the scope in parallel.

**Signature**

```ts
export declare const bindRightPar: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderAsync<R2, B>
) => <R1>(
  self: ReaderAsync<R1, A>
) => ReaderAsync<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, A>(self: ReaderAsync<R, A>) => ReaderAsync<R, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(self: ReaderAsync<R, A>) => ReaderAsync<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: applicative.Applicative<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: apply.Apply<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: kleisliCategory.KleisliCategory<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## FromAsync

**Signature**

```ts
export declare const FromAsync: fromAsync_.FromAsync<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: fromReader_.FromReader<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## FromSync

**Signature**

```ts
export declare const FromSync: fromSync_.FromSync<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: kleisliComposable.KleisliComposable<ReaderAsyncTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ReaderAsyncTypeLambda>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `ReaderAsync`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: ReaderAsync<R1, A>, fb: ReaderAsync<R2, B>) => ReaderAsync<R1 & R2, C>
```

Added in v3.0.0

## lift2Par

Lifts a binary function into `ReaderAsync` in parallel.

**Signature**

```ts
export declare const lift2Par: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: ReaderAsync<R1, A>, fb: ReaderAsync<R2, B>) => ReaderAsync<R1 & R2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `ReaderAsync`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(
  fa: ReaderAsync<R1, A>,
  fb: ReaderAsync<R2, B>,
  fc: ReaderAsync<R3, C>
) => ReaderAsync<R1 & R2 & R3, D>
```

Added in v3.0.0

## lift3Par

Lifts a ternary function into `ReaderAsync` in parallel.

**Signature**

```ts
export declare const lift3Par: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(
  fa: ReaderAsync<R1, A>,
  fb: ReaderAsync<R2, B>,
  fc: ReaderAsync<R3, C>
) => ReaderAsync<R1 & R2 & R3, D>
```

Added in v3.0.0

## liftAsync

**Signature**

```ts
export declare const liftAsync: <A extends readonly unknown[], B>(
  f: (...a: A) => async.Async<B>
) => (...a: A) => ReaderAsync<unknown, B>
```

Added in v3.0.0

## liftReader

**Signature**

```ts
export declare const liftReader: <A extends readonly unknown[], R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderAsync<R, B>
```

Added in v3.0.0

## liftReaderSync

**Signature**

```ts
export declare const liftReaderSync: <A extends readonly unknown[], R, B>(
  f: (...a: A) => ReaderSync<R, B>
) => (...a: A) => ReaderAsync<R, B>
```

Added in v3.0.0

## liftSync

**Signature**

```ts
export declare const liftSync: <A extends readonly unknown[], B>(
  f: (...a: A) => Sync<B>
) => (...a: A) => ReaderAsync<unknown, B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => ReaderAsync<unknown, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => ReaderAsync<unknown, void>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <R>(self: ReaderAsync<R, unknown>) => ReaderAsync<R, B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, B>(fab: ReaderAsync<R, (a: A) => B>) => ReaderAsync<R, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderAsync<R, A>) => ReaderAsync<R, B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: <R>(self: ReaderAsync<R, unknown>) => ReaderAsync<R, void>
```

Added in v3.0.0

# model

## ReaderAsync (interface)

**Signature**

```ts
export interface ReaderAsync<R, A> {
  (r: R): Async<A>
}
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, R2, B>(
  f: (a: A) => ReaderAsync<R2, B>
) => <R1>(self: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, B>
```

Added in v3.0.0

## flatMapAsync

**Signature**

```ts
export declare const flatMapAsync: <A, B>(
  f: (a: A) => async.Async<B>
) => <R>(self: ReaderAsync<R, A>) => ReaderAsync<R, B>
```

Added in v3.0.0

## flatMapReader

**Signature**

```ts
export declare const flatMapReader: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1>(ma: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, B>
```

Added in v3.0.0

## flatMapReaderSync

**Signature**

```ts
export declare const flatMapReaderSync: <A, R2, B>(
  f: (a: A) => ReaderSync<R2, B>
) => <R1>(ma: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, B>
```

Added in v3.0.0

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => <R>(self: ReaderAsync<R, A>) => ReaderAsync<R, B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <R2>(
  that: ReaderAsync<R2, unknown>
) => <R1, A>(self: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, A>
```

Added in v3.0.0

## zipLeftPar

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const zipLeftPar: <R>(that: ReaderAsync<R, unknown>) => <A>(self: ReaderAsync<R, A>) => ReaderAsync<R, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <R2, A>(
  that: ReaderAsync<R2, A>
) => <R1>(self: ReaderAsync<R1, unknown>) => ReaderAsync<R1 & R2, A>
```

Added in v3.0.0

## zipRightPar

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const zipRightPar: <R, A>(
  that: ReaderAsync<R, A>
) => (self: ReaderAsync<R, unknown>) => ReaderAsync<R, A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, A>(arr: readonly ReaderAsync<R, A>[]) => ReaderAsync<R, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <R, A>(arr: readonly ReaderAsync<R, A>[]) => ReaderAsync<R, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, B>(
  f: (a: A) => ReaderAsync<R, B>
) => (as: readonly A[]) => ReaderAsync<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, R, B>(
  f: (a: A) => ReaderAsync<R, B>
) => (as: readonly A[]) => ReaderAsync<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderAsync<R, B>
) => (as: readonly A[]) => ReaderAsync<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, R, B>(
  f: (index: number, a: A) => ReaderAsync<R, B>
) => (as: readonly A[]) => ReaderAsync<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, R, B>(
  f: (a: A) => ReaderAsync<R, B>
) => (as: readonly [A, ...A[]]) => ReaderAsync<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayPar

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayPar: <A, R, B>(
  f: (a: A) => ReaderAsync<R, B>
) => (as: readonly [A, ...A[]]) => ReaderAsync<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderAsync<R, B>
) => (as: readonly [A, ...A[]]) => ReaderAsync<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexPar

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexPar: <A, R, B>(
  f: (index: number, a: A) => ReaderAsync<R, B>
) => (as: readonly [A, ...A[]]) => ReaderAsync<R, readonly [B, ...B[]]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: ReaderAsync<unknown, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, A>(self: ReaderAsync<R, A>) => ReaderAsync<R, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <R2, B>(
  fb: ReaderAsync<R2, B>
) => <R1, A extends readonly unknown[]>(self: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, readonly [...A, B]>
```

Added in v3.0.0

## zipFlattenPar

Zips this effect with the specified effect in parallel.

**Signature**

```ts
export declare const zipFlattenPar: <R2, B>(
  fb: ReaderAsync<R2, B>
) => <R1, A extends readonly unknown[]>(self: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <R2, B, A, C>(
  that: ReaderAsync<R2, B>,
  f: (a: A, b: B) => C
) => <R1>(self: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, C>
```

Added in v3.0.0

## zipWithPar

Zips this effect with the specified effect using the specified combiner function in parallel.

**Signature**

```ts
export declare const zipWithPar: <S, R2, O2, E2, B, A, C>(
  that: ReaderAsync<R2, B>,
  f: (a: A, b: B) => C
) => <R1, O1, E1>(self: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, C>
```

Added in v3.0.0

# type lambdas

## ReaderAsyncTypeLambda (interface)

**Signature**

```ts
export interface ReaderAsyncTypeLambda extends TypeLambda {
  readonly type: ReaderAsync<this['In1'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <R2, A>(
  fa: ReaderAsync<R2, A>
) => <R1, B>(self: ReaderAsync<R1, (a: A) => B>) => ReaderAsync<R1 & R2, B>
```

Added in v3.0.0

## apPar

**Signature**

```ts
export declare const apPar: <R2, A>(
  fa: ReaderAsync<R2, A>
) => <R1, B>(fab: ReaderAsync<R1, (a: A) => B>) => ReaderAsync<R1 & R2, B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, R2, C>(
  bfc: (b: B) => ReaderAsync<R2, C>
) => <A, R1>(afb: (a: A) => ReaderAsync<R1, B>) => (a: A) => ReaderAsync<R1 & R2, C>
```

Added in v3.0.0

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (duration: number) => <R, A>(self: ReaderAsync<R, A>) => ReaderAsync<R, A>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <R1, R2, A>(mma: ReaderAsync<R1, ReaderAsync<R2, A>>) => ReaderAsync<R1 & R2, A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => ReaderAsync<unknown, A>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderAsync<R1, A>) => ReaderAsync<R2, A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, R2>(
  f: (a: A) => ReaderAsync<R2, unknown>
) => <R1>(ma: ReaderAsync<R1, A>) => ReaderAsync<R1 & R2, A>
```

Added in v3.0.0
