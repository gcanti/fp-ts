---
title: Reader.ts
nav_order: 72
parent: Modules
---

## Reader overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Category](#category)
  - [id](#id)
- [Composable](#composable)
  - [compose](#compose)
- [Flat](#flat)
  - [flatMap](#flatmap)
- [Functor](#functor)
  - [map](#map)
- [HKT](#hkt)
  - [ReaderF (interface)](#readerf-interface)
- [Pointed](#pointed)
  - [of](#of)
- [Profunctor](#profunctor)
  - [promap](#promap)
- [combinators](#combinators)
  - [apSecond](#apsecond)
  - [flap](#flap)
  - [flatten](#flatten)
  - [local](#local)
  - [zipLeftPar](#zipleftpar)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReader](#asksreader)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Category](#category-1)
  - [Flat](#flat-1)
  - [FromReader](#fromreader)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [Profunctor](#profunctor-1)
- [model](#model)
  - [Reader (interface)](#reader-interface)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [tupled](#tupled)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R2, A>(fa: Reader<R2, A>) => <R1, B>(fab: Reader<R1, (a: A) => B>) => Reader<R1 & R2, B>
```

Added in v3.0.0

# Category

## id

**Signature**

```ts
export declare const id: <A>() => Reader<A, A>
```

Added in v3.0.0

# Composable

## compose

**Signature**

```ts
export declare const compose: <B, C>(bc: Reader<B, C>) => <A>(ab: Reader<A, B>) => Reader<A, C>
```

Added in v3.0.0

# Flat

## flatMap

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const flatMap: <A, R2, B>(f: (a: A) => Reader<R2, B>) => <R1>(ma: Reader<R1, A>) => Reader<R1 & R2, B>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B>
```

Added in v3.0.0

# HKT

## ReaderF (interface)

**Signature**

```ts
export interface ReaderF extends HKT {
  readonly type: Reader<this['Contravariant1'], this['Covariant1']>
}
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, R = unknown>(a: A) => Reader<R, A>
```

Added in v3.0.0

# Profunctor

## promap

**Signature**

```ts
export declare const promap: <Q, R, A, B>(f: (d: Q) => R, g: (a: A) => B) => (pea: Reader<R, A>) => Reader<Q, B>
```

Added in v3.0.0

# combinators

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <R2, B>(second: Reader<R2, B>) => <R1, A>(self: Reader<R1, A>) => Reader<R1 & R2, B>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, B>(fab: Reader<R, (a: A) => B>) => Reader<R, B>
```

Added in v3.0.0

## flatten

Derivable from `Flat`.

**Signature**

```ts
export declare const flatten: <R1, R2, A>(mma: Reader<R1, Reader<R2, A>>) => Reader<R1 & R2, A>
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

## zipLeftPar

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const zipLeftPar: <R2, B>(second: Reader<R2, B>) => <R1, A>(self: Reader<R1, A>) => Reader<R1 & R2, A>
```

Added in v3.0.0

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

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ReaderF>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<ReaderF>
```

Added in v3.0.0

## Category

**Signature**

```ts
export declare const Category: category.Category<ReaderF>
```

Added in v3.0.0

## Flat

**Signature**

```ts
export declare const Flat: flat.Flat<ReaderF>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: fromReader_.FromReader<ReaderF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderF>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ReaderF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<ReaderF>
```

Added in v3.0.0

## Profunctor

**Signature**

```ts
export declare const Profunctor: profunctor.Profunctor<ReaderF>
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

# utils

## ApT

**Signature**

```ts
export declare const ApT: Reader<unknown, readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: Reader<unknown, {}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <R2, B>(
  fb: Reader<R2, B>
) => <R1, A extends readonly unknown[]>(fas: Reader<R1, A>) => Reader<R1 & R2, readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, A>(fa: Reader<R, A>) => Reader<R, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(fa: Reader<R, A>) => Reader<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, A>(arr: readonly Reader<R, A>[]) => Reader<R, readonly A[]>
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

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, R, B>(
  f: (a: A) => Reader<R, B>
) => (as: ReadonlyNonEmptyArray<A>) => Reader<R, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (as: ReadonlyNonEmptyArray<A>) => Reader<R, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, A>(fa: Reader<R, A>) => Reader<R, readonly [A]>
```

Added in v3.0.0
