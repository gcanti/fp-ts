---
title: Writer.ts
nav_order: 110
parent: Modules
---

## Writer overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [censor](#censor)
  - [flap](#flap)
  - [listen](#listen)
  - [listens](#listens)
  - [pass](#pass)
  - [swap](#swap)
- [constructors](#constructors)
  - [tell](#tell)
  - [writer](#writer)
- [instances](#instances)
  - [Bifunctor](#bifunctor)
  - [Comonad](#comonad)
  - [Foldable](#foldable)
  - [Functor](#functor)
  - [Semigroupoid](#semigroupoid)
  - [Traversable](#traversable)
  - [URI (type alias)](#uri-type-alias)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getChain](#getchain)
  - [getChainRec](#getchainrec)
  - [getMonad](#getmonad)
  - [getPointed](#getpointed)
- [model](#model)
  - [Writer (type alias)](#writer-type-alias)
- [type class operations](#type-class-operations)
  - [bimap](#bimap)
  - [compose](#compose)
  - [duplicate](#duplicate)
  - [extend](#extend)
  - [extract](#extract)
  - [foldMap](#foldmap)
  - [map](#map)
  - [mapLeft](#mapleft)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
  - [traverse](#traverse)
- [utils](#utils)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [fst](#fst)
  - [mapFst](#mapfst)
  - [mapSnd](#mapsnd)
  - [snd](#snd)

---

# combinators

## censor

Modify the final accumulator value by applying a function

**Signature**

```ts
export declare const censor: <W>(f: (w: W) => W) => <A>(fa: Writer<W, A>) => Writer<W, A>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Writer<E, (a: A) => B>) => Writer<E, B>
```

Added in v3.0.0

## listen

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export declare const listen: <W, A>(fa: Writer<W, A>) => Writer<W, readonly [A, W]>
```

Added in v3.0.0

## listens

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export declare const listens: <W, B>(f: (w: W) => B) => <A>(fa: Writer<W, A>) => Writer<W, readonly [A, B]>
```

Added in v3.0.0

## pass

Applies the returned function to the accumulator

**Signature**

```ts
export declare const pass: <W, A>(fa: Writer<W, readonly [A, (w: W) => W]>) => Writer<W, A>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(t: Writer<E, A>) => Writer<A, E>
```

Added in v3.0.0

# constructors

## tell

Appends a value to the accumulator

**Signature**

```ts
export declare const tell: <W>(w: W) => Writer<W, void>
```

Added in v3.0.0

## writer

**Signature**

```ts
export declare const writer: <A, W>(a: A, w: W) => Writer<W, A>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'Writer'>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad2<'Writer'>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable2<'Writer'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Writer'>
```

Added in v3.0.0

## Semigroupoid

**Signature**

```ts
export declare const Semigroupoid: Semigroupoid2<'Writer'>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable2<'Writer'>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'Writer'
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <W>(M: Monoid<W>) => Applicative2C<'Writer', W>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <W>(S: Semigroup<W>) => Apply2C<'Writer', W>
```

Added in v3.0.0

## getChain

**Signature**

```ts
export declare const getChain: <W>(S: Semigroup<W>) => Chain2C<'Writer', W>
```

Added in v3.0.0

## getChainRec

**Signature**

```ts
export declare function getChainRec<M>(M: Monoid<M>): ChainRec2C<URI, M>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <W>(M: Monoid<W>) => Monad2C<'Writer', W>
```

Added in v3.0.0

## getPointed

**Signature**

```ts
export declare const getPointed: <W>(M: Monoid<W>) => Pointed2C<'Writer', W>
```

Added in v3.0.0

# model

## Writer (type alias)

**Signature**

```ts
export type Writer<W, A> = readonly [A, W]
```

Added in v3.0.0

# type class operations

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(mapSnd: (e: E) => G, mapFst: (a: A) => B) => (t: Writer<E, A>) => Writer<G, B>
```

Added in v3.0.0

## compose

**Signature**

```ts
export declare const compose: <B, C>(bc: Writer<B, C>) => <A>(ab: Writer<A, B>) => Writer<A, C>
```

Added in v3.0.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <E, A>(t: Writer<E, A>) => Writer<E, Writer<E, A>>
```

Added in v3.0.0

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: Writer<E, A>) => B) => (wa: Writer<E, A>) => Writer<E, B>
```

Added in v3.0.0

## extract

**Signature**

```ts
export declare const extract: <E, A>(wa: Writer<E, A>) => A
```

Added in v3.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Writer<E, A>) => M
```

Added in v3.0.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: Writer<E, A>) => Writer<G, A>
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(fa: Writer<E, A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(fa: Writer<E, A>) => B
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: Traverse2<'Writer'>
```

Added in v3.0.0

# utils

## evaluate

Alias of [`fst`](#fst).

**Signature**

```ts
export declare const evaluate: <W, A>(fa: Writer<W, A>) => A
```

Added in v3.0.0

## execute

Alias of [`snd`](#snd).

**Signature**

```ts
export declare const execute: <W, A>(fa: Writer<W, A>) => W
```

Added in v3.0.0

## fst

**Signature**

```ts
export declare const fst: <E, A>(t: Writer<E, A>) => A
```

Added in v3.0.0

## mapFst

Maps a function over the first component of a `Writer`.

Alias of [`map`](#map)

**Signature**

```ts
export declare const mapFst: <A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B>
```

Added in v3.0.0

## mapSnd

Maps a function over the second component of a `Writer`.

Alias of [`mapLeft`](#mapleft)

**Signature**

```ts
export declare const mapSnd: <E, G>(f: (e: E) => G) => <A>(fea: Writer<E, A>) => Writer<G, A>
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare const snd: <E, A>(t: Writer<E, A>) => E
```

Added in v3.0.0
