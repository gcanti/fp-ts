---
title: Reader.ts
nav_order: 74
parent: Modules
---

## Reader overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReader](#asksreader)
  - [of](#of)
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
  - [FromIdentity](#fromidentity)
  - [FromReader](#fromreader)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
  - [Profunctor](#profunctor)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [unit](#unit)
- [model](#model)
  - [Reader (interface)](#reader-interface)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseNonEmptyReadonlyArray](#traversenonemptyreadonlyarray)
  - [traverseNonEmptyReadonlyArrayWithIndex](#traversenonemptyreadonlyarraywithindex)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [ReaderTypeLambda (interface)](#readertypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [composeKleisli](#composekleisli)
  - [flatten](#flatten)
  - [idKleisli](#idkleisli)
  - [local](#local)
  - [promap](#promap)

---

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => Reader<R, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `Reader`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => Reader<R, A>
```

Added in v3.0.0

## asksReader

**Signature**

```ts
export declare const asksReader: <R1, R2, A>(f: (r1: R1) => Reader<R2, A>) => Reader<R1 & R2, A>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Reader<unknown, A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Reader<unknown, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R2, B>
) => <R1>(self: Reader<R1, A>) => Reader<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R2, B>
) => <R1>(self: Reader<R1, A>) => Reader<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, A>(self: Reader<R, A>) => Reader<R, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(self: Reader<R, A>) => Reader<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ReaderTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<ReaderTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: kleisliCategory.KleisliCategory<ReaderTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<ReaderTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<ReaderTypeLambda>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: fromReader_.FromReader<ReaderTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderTypeLambda>
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: kleisliComposable.KleisliComposable<ReaderTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ReaderTypeLambda>
```

Added in v3.0.0

## Profunctor

**Signature**

```ts
export declare const Profunctor: profunctor.Profunctor<ReaderTypeLambda>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `Reader`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: Reader<R1, A>, fb: Reader<R2, B>) => Reader<R1 & R2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `Reader`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(fa: Reader<R1, A>, fb: Reader<R2, B>, fc: Reader<R3, C>) => Reader<R1 & R2 & R3, D>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <R>(self: Reader<R, unknown>) => Reader<R, B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, B>(fab: Reader<R, (a: A) => B>) => Reader<R, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: <R>(self: Reader<R, unknown>) => Reader<R, void>
```

Added in v3.0.0

# model

## Reader (interface)

**Signature**

```ts
export interface Reader<R, A> {
  (r: R): A
}
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, R2, B>(f: (a: A) => Reader<R2, B>) => <R1>(self: Reader<R1, A>) => Reader<R1 & R2, B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <R2>(that: Reader<R2, unknown>) => <R1, A>(self: Reader<R1, A>) => Reader<R1 & R2, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <R2, A>(that: Reader<R2, A>) => <R1>(self: Reader<R1, unknown>) => Reader<R1 & R2, A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, A>(arr: readonly Reader<R, A>[]) => Reader<R, readonly A[]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <A, R, B>(
  f: (a: A) => Reader<R, B>
) => (as: readonly [A, ...A[]]) => Reader<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (as: readonly [A, ...A[]]) => Reader<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, B>(
  f: (a: A) => Reader<R, B>
) => (as: readonly A[]) => Reader<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (as: readonly A[]) => Reader<R, readonly B[]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: Reader<unknown, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, A>(self: Reader<R, A>) => Reader<R, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <R2, B>(
  fb: Reader<R2, B>
) => <R1, A extends readonly unknown[]>(self: Reader<R1, A>) => Reader<R1 & R2, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <R2, B, A, C>(
  that: Reader<R2, B>,
  f: (a: A, b: B) => C
) => <R1>(self: Reader<R1, A>) => Reader<R1 & R2, C>
```

Added in v3.0.0

# type lambdas

## ReaderTypeLambda (interface)

**Signature**

```ts
export interface ReaderTypeLambda extends TypeLambda {
  readonly type: Reader<this['In1'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <R2, A>(fa: Reader<R2, A>) => <R1, B>(self: Reader<R1, (a: A) => B>) => Reader<R1 & R2, B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, R2, C>(
  bfc: (b: B) => Reader<R2, C>
) => <A, R1>(afb: (a: A) => Reader<R1, B>) => (a: A) => Reader<R1 & R2, C>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <R1, R2, A>(mma: Reader<R1, Reader<R2, A>>) => Reader<R1 & R2, A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => Reader<unknown, A>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: Reader<R1, A>) => Reader<R2, A>
```

Added in v3.0.0

## promap

**Signature**

```ts
export declare const promap: <Q, R, A, B>(f: (d: Q) => R, g: (a: A) => B) => (pea: Reader<R, A>) => Reader<Q, B>
```

Added in v3.0.0
