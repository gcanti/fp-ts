---
title: ReaderTaskWriter.ts
nav_order: 79
parent: Modules
---

## ReaderTaskWriter overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [HKT](#hkt)
  - [ReaderTaskWriterF (interface)](#readertaskwriterf-interface)
  - [ReaderTaskWriterFFixedW (interface)](#readertaskwriterffixedw-interface)
- [combinators](#combinators)
  - [flap](#flap)
  - [fromReaderWriterK](#fromreaderwriterk)
  - [fromTaskWriterK](#fromtaskwriterk)
  - [fromWriterK](#fromwriterk)
  - [local](#local)
- [constructors](#constructors)
  - [asksReaderTaskWriter](#asksreadertaskwriter)
  - [fromIO](#fromio)
  - [fromReader](#fromreader)
  - [fromReaderTask](#fromreadertask)
  - [fromTask](#fromtask)
  - [fromTaskWriter](#fromtaskwriter)
  - [tell](#tell)
- [instances](#instances)
  - [Bifunctor](#bifunctor)
  - [FromWriter](#fromwriter)
  - [Functor](#functor)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getChain](#getchain)
  - [getFromIO](#getfromio)
  - [getFromReader](#getfromreader)
  - [getFromTask](#getfromtask)
  - [getMonad](#getmonad)
  - [getPointed](#getpointed)
- [model](#model)
  - [ReaderTaskWriter (interface)](#readertaskwriter-interface)
- [natural transformations](#natural-transformations)
  - [fromReaderWriter](#fromreaderwriter)
  - [fromWriter](#fromwriter)
- [type class operations](#type-class-operations)
  - [bimap](#bimap)
  - [map](#map)
  - [mapLeft](#mapleft)
- [utils](#utils)
  - [bindTo](#bindto)
  - [censor](#censor)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [fst](#fst)
  - [let](#let)
  - [listen](#listen)
  - [listens](#listens)
  - [mapFst](#mapfst)
  - [mapSnd](#mapsnd)
  - [pass](#pass)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [snd](#snd)
  - [swap](#swap)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [tupled](#tupled)

---

# HKT

## ReaderTaskWriterF (interface)

**Signature**

```ts
export interface ReaderTaskWriterF extends HKT {
  readonly type: ReaderTaskWriter<this['Contravariant1'], this['Covariant2'], this['Covariant1']>
}
```

Added in v3.0.0

## ReaderTaskWriterFFixedW (interface)

**Signature**

```ts
export interface ReaderTaskWriterFFixedW<W> extends HKT {
  readonly type: ReaderTaskWriter<this['Contravariant1'], W, this['Covariant1']>
}
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, E, B>(fab: ReaderTaskWriter<R, E, (a: A) => B>) => ReaderTaskWriter<R, E, B>
```

Added in v3.0.0

## fromReaderWriterK

**Signature**

```ts
export declare const fromReaderWriterK: <A extends readonly unknown[], R, W, B>(
  f: (...a: A) => Reader<R, WriterModule.Writer<W, B>>
) => (...a: A) => ReaderTaskWriter<R, W, B>
```

Added in v3.0.0

## fromTaskWriterK

**Signature**

```ts
export declare const fromTaskWriterK: <A extends readonly unknown[], W, B>(
  f: (...a: A) => Task<WriterModule.Writer<W, B>>
) => <R = unknown>(...a: A) => ReaderTaskWriter<R, W, B>
```

Added in v3.0.0

## fromWriterK

**Signature**

```ts
export declare const fromWriterK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => WriterModule.Writer<E, B>
) => <R = unknown>(...a: A) => ReaderTaskWriter<R, E, B>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <W, A>(ma: ReaderTaskWriter<R1, W, A>) => ReaderTaskWriter<R2, W, A>
```

Added in v3.0.0

# constructors

## asksReaderTaskWriter

**Signature**

```ts
export declare const asksReaderTaskWriter: <R1, R2, W, A>(
  f: (r1: R1) => ReaderTaskWriter<R2, W, A>
) => ReaderTaskWriter<R1 & R2, W, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <W>(w: W) => <A, R = unknown>(fa: IO<A>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <W>(w: W) => <R, A>(fa: Reader<R, A>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fromReaderTask

**Signature**

```ts
export declare const fromReaderTask: <W>(
  w: W
) => <R, A>(a: ReaderTaskModule.ReaderTask<R, A>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <W>(w: W) => <A, R = unknown>(fa: Task<A>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fromTaskWriter

**Signature**

```ts
export declare const fromTaskWriter: <W, A, R = unknown>(
  a: Task<WriterModule.Writer<W, A>>
) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## tell

Appends a value to the accumulator

**Signature**

```ts
export declare const tell: <W, R>(w: W) => ReaderTaskWriter<R, W, void>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: BifunctorModule.Bifunctor<ReaderTaskWriterF>
```

Added in v3.0.0

## FromWriter

**Signature**

```ts
export declare const FromWriter: FromWriterModule.FromWriter<ReaderTaskWriterF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: FunctorModule.Functor<ReaderTaskWriterF>
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <W>(
  A: Apply<ReaderTaskModule.ReaderTaskF>,
  M: Monoid<W>
) => Applicative<ReaderTaskWriterFFixedW<W>>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <W>(
  A: Apply<ReaderTaskModule.ReaderTaskF>,
  S: Semigroup<W>
) => Apply<ReaderTaskWriterFFixedW<W>>
```

Added in v3.0.0

## getChain

**Signature**

```ts
export declare const getChain: <W>(S: Semigroup<W>) => Chain<ReaderTaskWriterFFixedW<W>>
```

Added in v3.0.0

## getFromIO

**Signature**

```ts
export declare const getFromIO: <W>(M: Monoid<W>) => FromIO<ReaderTaskWriterFFixedW<W>>
```

Added in v3.0.0

## getFromReader

**Signature**

```ts
export declare const getFromReader: <W>(M: Monoid<W>) => FromReader<ReaderTaskWriterFFixedW<W>>
```

Added in v3.0.0

## getFromTask

**Signature**

```ts
export declare const getFromTask: <W>(M: Monoid<W>) => FromTask<ReaderTaskWriterFFixedW<W>>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <W>(M: Monoid<W>) => Monad<ReaderTaskWriterFFixedW<W>>
```

Added in v3.0.0

## getPointed

**Signature**

```ts
export declare const getPointed: <W>(M: Monoid<W>) => Pointed<ReaderTaskWriterFFixedW<W>>
```

Added in v3.0.0

# model

## ReaderTaskWriter (interface)

**Signature**

```ts
export interface ReaderTaskWriter<R, W, A> extends Reader<R, Task<Writer<W, A>>> {}
```

Added in v3.0.0

# natural transformations

## fromReaderWriter

**Signature**

```ts
export declare const fromReaderWriter: <R, W, A>(fa: Reader<R, WriterModule.Writer<W, A>>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fromWriter

**Signature**

```ts
export declare const fromWriter: <W, A, R = unknown>(w: WriterModule.Writer<W, A>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

# type class operations

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fea: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, G, B>
```

Added in v3.0.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, E, B>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <E, G>(
  f: (e: E) => G
) => <R, A>(fea: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, G, A>
```

Added in v3.0.0

# utils

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, E, A>(fa: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## censor

**Signature**

```ts
export declare const censor: <W>(f: (w: W) => W) => <R, A>(fwa: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## evaluate

Alias of [`fst`](#fst).

**Signature**

```ts
export declare const evaluate: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => ReaderTaskModule.ReaderTask<R, A>
```

Added in v3.0.0

## execute

Alias of [`snd`](#snd).

**Signature**

```ts
export declare const execute: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => ReaderTaskModule.ReaderTask<R, W>
```

Added in v3.0.0

## fst

**Signature**

```ts
export declare const fst: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => ReaderTaskModule.ReaderTask<R, A>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  fa: ReaderTaskWriter<R, E, A>
) => ReaderTaskWriter<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## listen

**Signature**

```ts
export declare const listen: <R, W, A>(fwa: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, W, readonly [A, W]>
```

Added in v3.0.0

## listens

**Signature**

```ts
export declare const listens: <W, B>(
  f: (w: W) => B
) => <R, A>(fwa: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, W, readonly [A, B]>
```

Added in v3.0.0

## mapFst

Maps a function over the first component of a `Writer`.

Alias of [`map`](#map)

**Signature**

```ts
export declare const mapFst: <A, B>(
  f: (a: A) => B
) => <R, E>(fa: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, E, B>
```

Added in v3.0.0

## mapSnd

Maps a function over the second component of a `Writer`.

Alias of [`mapLeft`](#mapleft)

**Signature**

```ts
export declare const mapSnd: <E, G>(
  f: (e: E) => G
) => <R, A>(fea: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, G, A>
```

Added in v3.0.0

## pass

**Signature**

```ts
export declare const pass: <R, W, A>(
  fwa: ReaderTaskWriter<R, W, readonly [A, (w: W) => W]>
) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(getApplicative(A, M))`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <W>(
  A: Apply<ReaderTaskModule.ReaderTaskF>,
  M: Monoid<W>
) => <R, A>(arr: readonly ReaderTaskWriter<R, W, A>[]) => ReaderTaskWriter<R, W, readonly A[]>
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare const snd: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => ReaderTaskModule.ReaderTask<R, W>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, A, W>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(getApplicative(A, M))`.

**Signature**

```ts
export declare const traverseReadonlyArray: <W>(
  A: Apply<ReaderTaskModule.ReaderTaskF>,
  M: Monoid<W>
) => <A, R, B>(f: (a: A) => ReaderTaskWriter<R, W, B>) => (as: readonly A[]) => ReaderTaskWriter<R, W, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(A, M))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <W>(
  A: Apply<ReaderTaskModule.ReaderTaskF>,
  M: Monoid<W>
) => <A, R, B>(
  f: (index: number, a: A) => ReaderTaskWriter<R, W, B>
) => (as: readonly A[]) => ReaderTaskWriter<R, W, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(A, M))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <W>(
  A: Apply<ReaderTaskModule.ReaderTaskF>,
  S: Semigroup<W>
) => <A, R, B>(
  f: (a: A) => ReaderTaskWriter<R, W, B>
) => (
  as: ReadonlyNonEmptyArrayModule.ReadonlyNonEmptyArray<A>
) => ReaderTaskWriter<R, W, ReadonlyNonEmptyArrayModule.ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(A, M))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <W>(
  A: Apply<ReaderTaskModule.ReaderTaskF>,
  S: Semigroup<W>
) => <A, R, B>(
  f: (index: number, a: A) => ReaderTaskWriter<R, W, B>
) => (
  as: ReadonlyNonEmptyArrayModule.ReadonlyNonEmptyArray<A>
) => ReaderTaskWriter<R, W, ReadonlyNonEmptyArrayModule.ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, E, A>(fa: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, E, readonly [A]>
```

Added in v3.0.0
