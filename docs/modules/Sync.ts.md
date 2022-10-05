---
title: Sync.ts
nav_order: 97
parent: Modules
---

## Sync overview

```ts
interface Sync<A> {
  (): A
}
```

`Sync<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
type `A` and **never fails**.

If you want to represent a synchronous computation that may fail, please see `SyncResult`.
If you want to represent a synchronous computation that may yield nothing, please see `SyncOption`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [succeed](#succeed)
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
  - [Flattenable](#flattenable)
  - [FlattenableRec](#flattenablerec)
  - [FromIdentity](#fromidentity)
  - [FromSync](#fromsync)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [unit](#unit)
- [model](#model)
  - [Sync (interface)](#sync-interface)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapRec](#flatmaprec)
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
  - [SyncTypeLambda (interface)](#synctypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [composeKleisli](#composekleisli)
  - [flatten](#flatten)
  - [idKleisli](#idkleisli)
  - [tap](#tap)

---

# constructors

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => Sync<A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Sync<{}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Sync<B>
) => (self: Sync<A>) => Sync<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Sync<B>
) => (self: Sync<A>) => Sync<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(self: Sync<A>) => Sync<{ readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Sync<A>) => Sync<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<SyncTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<SyncTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: kleisliCategory.KleisliCategory<SyncTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<SyncTypeLambda>
```

Added in v3.0.0

## FlattenableRec

**Signature**

```ts
export declare const FlattenableRec: flatMapableRec.FlattenableRec<SyncTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<SyncTypeLambda>
```

Added in v3.0.0

## FromSync

**Signature**

```ts
export declare const FromSync: fromSync_.FromSync<SyncTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<SyncTypeLambda>
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: kleisliComposable.KleisliComposable<SyncTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<SyncTypeLambda>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `Sync`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Sync<A>, fb: Sync<B>) => Sync<C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `Sync`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Sync<A>, fb: Sync<B>, fc: Sync<C>) => Sync<D>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => Sync<void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => Sync<void>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => (self: Sync<unknown>) => Sync<B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Sync<(a: A) => B>) => Sync<B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Sync<A>) => Sync<B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: (self: Sync<unknown>) => Sync<void>
```

Added in v3.0.0

# model

## Sync (interface)

**Signature**

```ts
export interface Sync<A> {
  (): A
}
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => Sync<B>) => (self: Sync<A>) => Sync<B>
```

Added in v3.0.0

## flatMapRec

**Signature**

```ts
export declare const flatMapRec: <A, B>(f: (a: A) => Sync<Result<A, B>>) => (a: A) => Sync<B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: (that: Sync<unknown>) => <A>(self: Sync<A>) => Sync<A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: Sync<A>) => (self: Sync<unknown>) => Sync<A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(arr: readonly Sync<A>[]) => Sync<readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(f: (a: A) => Sync<B>) => (as: readonly A[]) => Sync<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Sync<B>
) => (as: readonly A[]) => Sync<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, B>(
  f: (a: A) => Sync<B>
) => (as: readonly [A, ...A[]]) => Sync<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Sync<B>
) => (as: readonly [A, ...A[]]) => Sync<readonly [B, ...B[]]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: Sync<readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: Sync<A>) => Sync<readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <B>(
  fb: Sync<B>
) => <A extends readonly unknown[]>(self: Sync<A>) => Sync<readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <B, A, C>(that: Sync<B>, f: (a: A, b: B) => C) => (self: Sync<A>) => Sync<C>
```

Added in v3.0.0

# type lambdas

## SyncTypeLambda (interface)

**Signature**

```ts
export interface SyncTypeLambda extends TypeLambda {
  readonly type: Sync<this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <A>(fa: Sync<A>) => <B>(fab: Sync<(a: A) => B>) => Sync<B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, C>(bfc: (b: B) => Sync<C>) => <A>(afb: (a: A) => Sync<B>) => (a: A) => Sync<C>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: Sync<Sync<A>>) => Sync<A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => Sync<A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A>(f: (a: A) => Sync<unknown>) => (self: Sync<A>) => Sync<A>
```

Added in v3.0.0
