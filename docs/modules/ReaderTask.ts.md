---
title: ReaderTask.ts
nav_order: 77
parent: Modules
---

## ReaderTask overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [delay](#delay)
  - [flatten](#flatten)
  - [local](#local)
  - [tap](#tap)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderTask](#asksreadertask)
  - [of](#of)
  - [sleep](#sleep)
- [conversions](#conversions)
  - [fromIO](#fromio)
  - [fromReader](#fromreader)
  - [fromReaderIO](#fromreaderio)
  - [fromTask](#fromtask)
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
  - [ComposableKind](#composablekind)
  - [Flattenable](#flattenable)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [FromTask](#fromtask)
  - [Functor](#functor)
  - [Monad](#monad)
  - [Pointed](#pointed)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift2Par](#lift2par)
  - [lift3](#lift3)
  - [lift3Par](#lift3par)
  - [liftIO](#liftio)
  - [liftReader](#liftreader)
  - [liftReaderIO](#liftreaderio)
  - [liftTask](#lifttask)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [ReaderTask (interface)](#readertask-interface)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapIO](#flatmapio)
  - [flatMapReader](#flatmapreader)
  - [flatMapReaderIO](#flatmapreaderio)
  - [flatMapTask](#flatmaptask)
  - [zipLeft](#zipleft)
  - [zipLeftPar](#zipleftpar)
  - [zipRight](#zipright)
  - [zipRightPar](#ziprightpar)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipFlattenPar](#zipflattenpar)
  - [zipWith](#zipwith)
  - [zipWithPar](#zipwithpar)
- [type lambdas](#type-lambdas)
  - [ReaderTaskTypeLambda (interface)](#readertasktypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [apPar](#appar)
  - [composeKind](#composekind)
  - [idKind](#idkind)
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

# combinators

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (duration: number) => <R, A>(self: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <R1, R2, A>(mma: ReaderTask<R1, ReaderTask<R2, A>>) => ReaderTask<R1 & R2, A>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderTask<R1, A>) => ReaderTask<R2, A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, R2, _>(
  f: (a: A) => ReaderTask<R2, _>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A>
```

Added in v3.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderTask<R, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderTask`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderTask<R, A>
```

Added in v3.0.0

## asksReaderTask

**Signature**

```ts
export declare const asksReaderTask: <R1, R2, A>(f: (r1: R1) => ReaderTask<R2, A>) => ReaderTask<R1 & R2, A>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => ReaderTask<unknown, A>
```

Added in v3.0.0

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: (duration: number) => ReaderTask<unknown, void>
```

Added in v3.0.0

# conversions

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => ReaderTask<unknown, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(fa: reader.Reader<R, A>) => ReaderTask<R, A>
```

Added in v3.0.0

## fromReaderIO

**Signature**

```ts
export declare const fromReaderIO: <R, A>(fa: ReaderIO<R, A>) => ReaderTask<R, A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A>(fa: task.Task<A>) => ReaderTask<unknown, A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: ReaderTask<unknown, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(self: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R2, B>
) => <R1>(self: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRightPar

A variant of `bind` that ignores the scope in parallel.

**Signature**

```ts
export declare const bindRightPar: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R2, B>
) => <R1>(self: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, A>(self: ReaderTask<R, A>) => ReaderTask<R, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(self: ReaderTask<R, A>) => ReaderTask<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ReaderTaskTypeLambda>
```

Added in v3.0.0

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: applicative.Applicative<ReaderTaskTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<ReaderTaskTypeLambda>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: apply.Apply<ReaderTaskTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: categoryKind.CategoryKind<ReaderTaskTypeLambda>
```

Added in v3.0.0

## ComposableKind

**Signature**

```ts
export declare const ComposableKind: composableKind.ComposableKind<ReaderTaskTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<ReaderTaskTypeLambda>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<ReaderTaskTypeLambda>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: fromReader_.FromReader<ReaderTaskTypeLambda>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: fromTask_.FromTask<ReaderTaskTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderTaskTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ReaderTaskTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<ReaderTaskTypeLambda>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `ReaderTask`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: ReaderTask<R1, A>, fb: ReaderTask<R2, B>) => ReaderTask<R1 & R2, C>
```

Added in v3.0.0

## lift2Par

Lifts a binary function into `ReaderTask` in parallel.

**Signature**

```ts
export declare const lift2Par: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: ReaderTask<R1, A>, fb: ReaderTask<R2, B>) => ReaderTask<R1 & R2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `ReaderTask`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(fa: ReaderTask<R1, A>, fb: ReaderTask<R2, B>, fc: ReaderTask<R3, C>) => ReaderTask<R1 & R2 & R3, D>
```

Added in v3.0.0

## lift3Par

Lifts a ternary function into `ReaderTask` in parallel.

**Signature**

```ts
export declare const lift3Par: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(fa: ReaderTask<R1, A>, fb: ReaderTask<R2, B>, fc: ReaderTask<R3, C>) => ReaderTask<R1 & R2 & R3, D>
```

Added in v3.0.0

## liftIO

**Signature**

```ts
export declare const liftIO: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => (...a: A) => ReaderTask<unknown, B>
```

Added in v3.0.0

## liftReader

**Signature**

```ts
export declare const liftReader: <A extends readonly unknown[], R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderTask<R, B>
```

Added in v3.0.0

## liftReaderIO

**Signature**

```ts
export declare const liftReaderIO: <A extends readonly unknown[], R, B>(
  f: (...a: A) => ReaderIO<R, B>
) => (...a: A) => ReaderTask<R, B>
```

Added in v3.0.0

## liftTask

**Signature**

```ts
export declare const liftTask: <A extends readonly unknown[], B>(
  f: (...a: A) => task.Task<B>
) => (...a: A) => ReaderTask<unknown, B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => ReaderTask<unknown, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => ReaderTask<unknown, void>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v3.0.0

# model

## ReaderTask (interface)

**Signature**

```ts
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, R2, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(self: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B>
```

Added in v3.0.0

## flatMapIO

**Signature**

```ts
export declare const flatMapIO: <A, B>(f: (a: A) => IO<B>) => <R>(self: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v3.0.0

## flatMapReader

**Signature**

```ts
export declare const flatMapReader: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B>
```

Added in v3.0.0

## flatMapReaderIO

**Signature**

```ts
export declare const flatMapReaderIO: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B>
```

Added in v3.0.0

## flatMapTask

**Signature**

```ts
export declare const flatMapTask: <A, B>(f: (a: A) => task.Task<B>) => <R>(self: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <R2, _>(
  that: ReaderTask<R2, _>
) => <R1, A>(self: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A>
```

Added in v3.0.0

## zipLeftPar

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const zipLeftPar: <R, _>(second: ReaderTask<R, _>) => <A>(self: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <R2, A>(
  that: ReaderTask<R2, A>
) => <R1, _>(self: ReaderTask<R1, _>) => ReaderTask<R1 & R2, A>
```

Added in v3.0.0

## zipRightPar

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const zipRightPar: <R, A>(second: ReaderTask<R, A>) => <_>(self: ReaderTask<R, _>) => ReaderTask<R, A>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: ReaderTask<unknown, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, A>(self: ReaderTask<R, A>) => ReaderTask<R, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <R2, B>(
  fb: ReaderTask<R2, B>
) => <R1, A extends readonly unknown[]>(self: ReaderTask<R1, A>) => ReaderTask<R1 & R2, readonly [...A, B]>
```

Added in v3.0.0

## zipFlattenPar

Zips this effect with the specified effect in parallel.

**Signature**

```ts
export declare const zipFlattenPar: <R2, B>(
  fb: ReaderTask<R2, B>
) => <R1, A extends readonly unknown[]>(self: ReaderTask<R1, A>) => ReaderTask<R1 & R2, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <R2, B, A, C>(
  that: ReaderTask<R2, B>,
  f: (a: A, b: B) => C
) => <R1>(self: ReaderTask<R1, A>) => ReaderTask<R1 & R2, C>
```

Added in v3.0.0

## zipWithPar

Zips this effect with the specified effect using the specified combiner function in parallel.

**Signature**

```ts
export declare const zipWithPar: <S, R2, O2, E2, B, A, C>(
  that: ReaderTask<R2, B>,
  f: (a: A, b: B) => C
) => <R1, O1, E1>(self: ReaderTask<R1, A>) => ReaderTask<R1 & R2, C>
```

Added in v3.0.0

# type lambdas

## ReaderTaskTypeLambda (interface)

**Signature**

```ts
export interface ReaderTaskTypeLambda extends TypeLambda {
  readonly type: ReaderTask<this['In1'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <R2, A>(
  fa: ReaderTask<R2, A>
) => <R1, B>(self: ReaderTask<R1, (a: A) => B>) => ReaderTask<R1 & R2, B>
```

Added in v3.0.0

## apPar

**Signature**

```ts
export declare const apPar: <R2, A>(
  fa: ReaderTask<R2, A>
) => <R1, B>(fab: ReaderTask<R1, (a: A) => B>) => ReaderTask<R1 & R2, B>
```

Added in v3.0.0

## composeKind

**Signature**

```ts
export declare const composeKind: <B, R2, C>(
  bfc: (b: B) => ReaderTask<R2, C>
) => <A, R1>(afb: (a: A) => ReaderTask<R1, B>) => (a: A) => ReaderTask<R1 & R2, C>
```

Added in v3.0.0

## idKind

**Signature**

```ts
export declare const idKind: <A>() => (a: A) => ReaderTask<unknown, A>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, A>(arr: readonly ReaderTask<R, A>[]) => ReaderTask<R, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <R, A>(arr: readonly ReaderTask<R, A>[]) => ReaderTask<R, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, B>(
  f: (a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, R, B>(
  f: (a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, R, B>(
  f: (a: A) => ReaderTask<R, B>
) => (as: readonly [A, ...A[]]) => ReaderTask<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayPar

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayPar: <A, R, B>(
  f: (a: A) => ReaderTask<R, B>
) => (as: readonly [A, ...A[]]) => ReaderTask<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: readonly [A, ...A[]]) => ReaderTask<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexPar

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexPar: <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: readonly [A, ...A[]]) => ReaderTask<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: ReaderTask<unknown, void>
```

Added in v3.0.0
