---
title: ReaderTaskWriter.ts
nav_order: 78
parent: Modules
---

## ReaderTaskWriter overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [flap](#flap)
  - [fromReaderWriterK](#fromreaderwriterk)
  - [fromTaskWriterK](#fromtaskwriterk)
  - [fromWriterK](#fromwriterk)
  - [local](#local)
- [constructors](#constructors)
  - [asksReaderTaskWriter](#asksreadertaskwriter)
  - [asksReaderTaskWriterW](#asksreadertaskwriterw)
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
  - [URI (type alias)](#uri-type-alias)
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
  - [listen](#listen)
  - [listens](#listens)
  - [mapFst](#mapfst)
  - [mapSnd](#mapsnd)
  - [pass](#pass)
  - [snd](#snd)
  - [swap](#swap)
  - [tupled](#tupled)

---

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
  f: (...a: A) => Reader<R, Writer<W, B>>
) => (...a: A) => ReaderTaskWriter<R, W, B>
```

Added in v3.0.0

## fromTaskWriterK

**Signature**

```ts
export declare const fromTaskWriterK: <A extends readonly unknown[], W, B>(
  f: (...a: A) => Task<Writer<W, B>>
) => <R>(...a: A) => ReaderTaskWriter<R, W, B>
```

Added in v3.0.0

## fromWriterK

**Signature**

```ts
export declare const fromWriterK: <A, E, B>(f: (...a: A) => Writer<E, B>) => <R>(...a: A) => ReaderTaskWriter<R, E, B>
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
export declare const asksReaderTaskWriter: <R, W, A>(
  f: (r: R) => ReaderTaskWriter<R, W, A>
) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## asksReaderTaskWriterW

Less strict version of [`asksReaderTaskWriter`](#asksreadertaskwriter).

**Signature**

```ts
export declare const asksReaderTaskWriterW: <R1, R2, W, A>(
  f: (r1: R1) => ReaderTaskWriter<R2, W, A>
) => ReaderTaskWriter<R1 & R2, W, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <W>(w: W) => <A, R>(fa: IO<A>) => ReaderTaskWriter<R, W, A>
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
export declare const fromReaderTask: <W>(w: W) => <R, A>(a: RT.ReaderTask<R, A>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <W>(w: W) => <A, R>(fa: Task<A>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fromTaskWriter

**Signature**

```ts
export declare const fromTaskWriter: <W, A, R>(a: Task<Writer<W, A>>) => ReaderTaskWriter<R, W, A>
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
export declare const Bifunctor: Bifunctor3<'ReaderTaskWriter'>
```

Added in v3.0.0

## FromWriter

**Signature**

```ts
export declare const FromWriter: FromWriter3<'ReaderTaskWriter'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor3<'ReaderTaskWriter'>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'ReaderTaskWriter'
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <W>(A: Apply2<RT.URI>, M: Monoid<W>) => Applicative3C<'ReaderTaskWriter', W>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <W>(A: Apply2<RT.URI>, S: Semigroup<W>) => Apply3C<'ReaderTaskWriter', W>
```

Added in v3.0.0

## getChain

**Signature**

```ts
export declare const getChain: <W>(S: Semigroup<W>) => Chain3C<'ReaderTaskWriter', W>
```

Added in v3.0.0

## getFromIO

**Signature**

```ts
export declare const getFromIO: <W>(M: Monoid<W>) => FromIO3C<'ReaderTaskWriter', W>
```

Added in v3.0.0

## getFromReader

**Signature**

```ts
export declare const getFromReader: <W>(M: Monoid<W>) => FromReader3C<'ReaderTaskWriter', W>
```

Added in v3.0.0

## getFromTask

**Signature**

```ts
export declare const getFromTask: <W>(M: Monoid<W>) => FromTask3C<'ReaderTaskWriter', W>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <W>(M: Monoid<W>) => Monad3C<'ReaderTaskWriter', W>
```

Added in v3.0.0

## getPointed

**Signature**

```ts
export declare const getPointed: <W>(M: Monoid<W>) => Pointed3C<'ReaderTaskWriter', W>
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
export declare const fromReaderWriter: <R, W, A>(fa: Reader<R, Writer<W, A>>) => ReaderTaskWriter<R, W, A>
```

Added in v3.0.0

## fromWriter

**Signature**

```ts
export declare const fromWriter: <W, A, R>(w: Writer<W, A>) => ReaderTaskWriter<R, W, A>
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
export declare const bindTo: <N>(
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
export declare const evaluate: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => RT.ReaderTask<R, A>
```

Added in v3.0.0

## execute

Alias of [`snd`](#snd).

**Signature**

```ts
export declare const execute: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => RT.ReaderTask<R, W>
```

Added in v3.0.0

## fst

**Signature**

```ts
export declare const fst: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => RT.ReaderTask<R, A>
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

## snd

**Signature**

```ts
export declare const snd: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => RT.ReaderTask<R, W>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <R, W, A>(t: ReaderTaskWriter<R, W, A>) => ReaderTaskWriter<R, A, W>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, E, A>(fa: ReaderTaskWriter<R, E, A>) => ReaderTaskWriter<R, E, readonly [A]>
```

Added in v3.0.0
