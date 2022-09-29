---
title: ReaderIO.ts
nav_order: 74
parent: Modules
---

## ReaderIO overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [ap](#ap)
  - [asksReaderIO](#asksreaderio)
  - [flatMapIOK](#flatmapiok)
  - [flatten](#flatten)
  - [fromIOK](#fromiok)
  - [fromReaderK](#fromreaderk)
  - [local](#local)
  - [tap](#tap)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [of](#of)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Flattenable](#flattenable)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [Functor](#functor)
  - [Monad](#monad)
  - [Pointed](#pointed)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [ReaderIO (interface)](#readerio-interface)
- [natural transformations](#natural-transformations)
  - [fromIO](#fromio)
  - [fromReader](#fromreader)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
- [sequencing, lifting](#sequencing-lifting)
  - [flatMapReaderK](#flatmapreaderk)
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
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [ReaderIOTypeLambda (interface)](#readeriotypelambda-interface)
- [utils](#utils)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [unit](#unit)

---

# combinators

## ap

**Signature**

```ts
export declare const ap: <R2, A>(
  fa: ReaderIO<R2, A>
) => <R1, B>(self: ReaderIO<R1, (a: A) => B>) => ReaderIO<R1 & R2, B>
```

Added in v3.0.0

## asksReaderIO

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksReaderIO: <R1, R2, A>(f: (r1: R1) => ReaderIO<R2, A>) => ReaderIO<R1 & R2, A>
```

Added in v3.0.0

## flatMapIOK

**Signature**

```ts
export declare const flatMapIOK: <A, B>(f: (a: A) => I.IO<B>) => <R>(self: ReaderIO<R, A>) => ReaderIO<R, B>
```

Added in v3.0.0

## flatten

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <R1, R2, A>(mma: ReaderIO<R1, ReaderIO<R2, A>>) => ReaderIO<R1 & R2, A>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => I.IO<B>
) => (...a: A) => ReaderIO<unknown, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => (...a: A) => ReaderIO<R, B>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderIO<R1, A>) => ReaderIO<R2, A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, R2, _>(f: (a: A) => ReaderIO<R2, _>) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <R2, _>(that: ReaderIO<R2, _>) => <R1, A>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <R2, A>(that: ReaderIO<R2, A>) => <R1, _>(self: ReaderIO<R1, _>) => ReaderIO<R1 & R2, A>
```

Added in v3.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderIO<R, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderIO`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderIO<R, A>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => ReaderIO<unknown, A>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ReaderIOTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<ReaderIOTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<ReaderIOTypeLambda>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<ReaderIOTypeLambda>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: fromReader_.FromReader<ReaderIOTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderIOTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ReaderIOTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<ReaderIOTypeLambda>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `ReaderIO`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: ReaderIO<R1, A>, fb: ReaderIO<R2, B>) => ReaderIO<R1 & R2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `ReaderIO`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(fa: ReaderIO<R1, A>, fb: ReaderIO<R2, B>, fc: ReaderIO<R3, C>) => ReaderIO<R1 & R2 & R3, D>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => ReaderIO<unknown, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => ReaderIO<unknown, void>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, B>(fab: ReaderIO<R, (a: A) => B>) => ReaderIO<R, B>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderIO<R, A>) => ReaderIO<R, B>
```

Added in v3.0.0

# model

## ReaderIO (interface)

**Signature**

```ts
export interface ReaderIO<R, A> {
  (r: R): I.IO<A>
}
```

Added in v3.0.0

# natural transformations

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: I.IO<A>) => ReaderIO<unknown, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(fa: reader.Reader<R, A>) => ReaderIO<R, A>
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B>
```

Added in v3.0.0

# sequencing, lifting

## flatMapReaderK

**Signature**

```ts
export declare const flatMapReaderK: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B>
```

Added in v3.0.0

# struct sequencing

## Do

**Signature**

```ts
export declare const Do: ReaderIO<unknown, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderIO<R2, B>
) => <R1>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, A>(self: ReaderIO<R, A>) => ReaderIO<R, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(self: ReaderIO<R, A>) => ReaderIO<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: ReaderIO<unknown, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, A>(self: ReaderIO<R, A>) => ReaderIO<R, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <R2, B>(
  fb: ReaderIO<R2, B>
) => <R1, A extends readonly unknown[]>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <R2, B, A, C>(
  that: ReaderIO<R2, B>,
  f: (a: A, b: B) => C
) => <R1>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, C>
```

Added in v3.0.0

# type lambdas

## ReaderIOTypeLambda (interface)

**Signature**

```ts
export interface ReaderIOTypeLambda extends TypeLambda {
  readonly type: ReaderIO<this['In1'], this['Out1']>
}
```

Added in v3.0.0

# utils

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, A>(arr: readonly ReaderIO<R, A>[]) => ReaderIO<R, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => (as: readonly A[]) => ReaderIO<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
) => (as: readonly A[]) => ReaderIO<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => (as: readonly [A, ...A[]]) => ReaderIO<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
) => (as: readonly [A, ...A[]]) => ReaderIO<R, readonly [B, ...B[]]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: ReaderIO<unknown, void>
```

Added in v3.0.0
