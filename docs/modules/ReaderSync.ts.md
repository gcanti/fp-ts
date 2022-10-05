---
title: ReaderSync.ts
nav_order: 76
parent: Modules
---

## ReaderSync overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [fromReader](#fromreader)
  - [fromSync](#fromsync)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [CategoryKind](#categorykind)
  - [ComposableKind](#composablekind)
  - [Flattenable](#flattenable)
  - [FromIdentity](#fromidentity)
  - [FromReader](#fromreader)
  - [FromSync](#fromsync)
  - [Functor](#functor)
  - [Monad](#monad)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftReader](#liftreader)
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
  - [ReaderSync (interface)](#readersync-interface)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapReader](#flatmapreader)
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
  - [ReaderSyncTypeLambda (interface)](#readersynctypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [asksReaderSync](#asksreadersync)
  - [composeKind](#composekind)
  - [flatMapSync](#flatmapsync)
  - [flatten](#flatten)
  - [idKind](#idkind)
  - [local](#local)
  - [tap](#tap)

---

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderSync<R, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderSync`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderSync<R, A>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => ReaderSync<unknown, A>
```

Added in v3.0.0

# conversions

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(fa: reader.Reader<R, A>) => ReaderSync<R, A>
```

Added in v3.0.0

## fromSync

**Signature**

```ts
export declare const fromSync: <A>(fa: sync.Sync<A>) => ReaderSync<unknown, A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: ReaderSync<unknown, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderSync<R2, B>
) => <R1>(self: ReaderSync<R1, A>) => ReaderSync<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderSync<R2, B>
) => <R1>(self: ReaderSync<R1, A>) => ReaderSync<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, A>(self: ReaderSync<R, A>) => ReaderSync<R, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(self: ReaderSync<R, A>) => ReaderSync<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ReaderSyncTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<ReaderSyncTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: categoryKind.CategoryKind<ReaderSyncTypeLambda>
```

Added in v3.0.0

## ComposableKind

**Signature**

```ts
export declare const ComposableKind: composableKind.ComposableKind<ReaderSyncTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<ReaderSyncTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<ReaderSyncTypeLambda>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: fromReader_.FromReader<ReaderSyncTypeLambda>
```

Added in v3.0.0

## FromSync

**Signature**

```ts
export declare const FromSync: fromSync_.FromSync<ReaderSyncTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderSyncTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ReaderSyncTypeLambda>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `ReaderSync`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: ReaderSync<R1, A>, fb: ReaderSync<R2, B>) => ReaderSync<R1 & R2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `ReaderSync`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(fa: ReaderSync<R1, A>, fb: ReaderSync<R2, B>, fc: ReaderSync<R3, C>) => ReaderSync<R1 & R2 & R3, D>
```

Added in v3.0.0

## liftReader

**Signature**

```ts
export declare const liftReader: <A extends readonly unknown[], R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderSync<R, B>
```

Added in v3.0.0

## liftSync

**Signature**

```ts
export declare const liftSync: <A extends readonly unknown[], B>(
  f: (...a: A) => sync.Sync<B>
) => (...a: A) => ReaderSync<unknown, B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => ReaderSync<unknown, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => ReaderSync<unknown, void>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <R>(self: ReaderSync<R, unknown>) => ReaderSync<R, B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, B>(fab: ReaderSync<R, (a: A) => B>) => ReaderSync<R, B>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderSync<R, A>) => ReaderSync<R, B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: <R>(self: ReaderSync<R, unknown>) => ReaderSync<R, void>
```

Added in v3.0.0

# model

## ReaderSync (interface)

**Signature**

```ts
export interface ReaderSync<R, A> {
  (r: R): Sync<A>
}
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, R2, B>(
  f: (a: A) => ReaderSync<R2, B>
) => <R1>(self: ReaderSync<R1, A>) => ReaderSync<R1 & R2, B>
```

Added in v3.0.0

## flatMapReader

**Signature**

```ts
export declare const flatMapReader: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1>(ma: ReaderSync<R1, A>) => ReaderSync<R1 & R2, B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <R2>(
  that: ReaderSync<R2, unknown>
) => <R1, A>(self: ReaderSync<R1, A>) => ReaderSync<R1 & R2, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <R2, A>(
  that: ReaderSync<R2, A>
) => <R1>(self: ReaderSync<R1, unknown>) => ReaderSync<R1 & R2, A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, A>(arr: readonly ReaderSync<R, A>[]) => ReaderSync<R, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, B>(
  f: (a: A) => ReaderSync<R, B>
) => (as: readonly A[]) => ReaderSync<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderSync<R, B>
) => (as: readonly A[]) => ReaderSync<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, R, B>(
  f: (a: A) => ReaderSync<R, B>
) => (as: readonly [A, ...A[]]) => ReaderSync<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderSync<R, B>
) => (as: readonly [A, ...A[]]) => ReaderSync<R, readonly [B, ...B[]]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: ReaderSync<unknown, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, A>(self: ReaderSync<R, A>) => ReaderSync<R, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <R2, B>(
  fb: ReaderSync<R2, B>
) => <R1, A extends readonly unknown[]>(self: ReaderSync<R1, A>) => ReaderSync<R1 & R2, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <R2, B, A, C>(
  that: ReaderSync<R2, B>,
  f: (a: A, b: B) => C
) => <R1>(self: ReaderSync<R1, A>) => ReaderSync<R1 & R2, C>
```

Added in v3.0.0

# type lambdas

## ReaderSyncTypeLambda (interface)

**Signature**

```ts
export interface ReaderSyncTypeLambda extends TypeLambda {
  readonly type: ReaderSync<this['In1'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <R2, A>(
  fa: ReaderSync<R2, A>
) => <R1, B>(self: ReaderSync<R1, (a: A) => B>) => ReaderSync<R1 & R2, B>
```

Added in v3.0.0

## asksReaderSync

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksReaderSync: <R1, R2, A>(f: (r1: R1) => ReaderSync<R2, A>) => ReaderSync<R1 & R2, A>
```

Added in v3.0.0

## composeKind

**Signature**

```ts
export declare const composeKind: <B, R2, C>(
  bfc: (b: B) => ReaderSync<R2, C>
) => <A, R1>(afb: (a: A) => ReaderSync<R1, B>) => (a: A) => ReaderSync<R1 & R2, C>
```

Added in v3.0.0

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <A, B>(f: (a: A) => sync.Sync<B>) => <R>(self: ReaderSync<R, A>) => ReaderSync<R, B>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <R1, R2, A>(mma: ReaderSync<R1, ReaderSync<R2, A>>) => ReaderSync<R1 & R2, A>
```

Added in v3.0.0

## idKind

**Signature**

```ts
export declare const idKind: <A>() => (a: A) => ReaderSync<unknown, A>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderSync<R1, A>) => ReaderSync<R2, A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, R2>(
  f: (a: A) => ReaderSync<R2, unknown>
) => <R1>(ma: ReaderSync<R1, A>) => ReaderSync<R1 & R2, A>
```

Added in v3.0.0
