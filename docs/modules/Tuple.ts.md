---
title: Tuple.ts
nav_order: 116
parent: Modules
---

## Tuple overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Extract](#extract)
  - [extract](#extract)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [instances](#instances)
  - [Bifunctor](#bifunctor)
  - [Comonad](#comonad)
  - [Foldable](#foldable)
  - [Functor](#functor)
  - [Semigroupoid](#semigroupoid)
  - [Traversable](#traversable)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getChain](#getchain)
  - [getChainRec](#getchainrec)
  - [getMonad](#getmonad)
- [mapping](#mapping)
  - [bimap](#bimap)
  - [flap](#flap)
  - [mapFst](#mapfst)
  - [mapSnd](#mapsnd)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [type lambdas](#type-lambdas)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [utils](#utils)
  - [compose](#compose)
  - [duplicate](#duplicate)
  - [extend](#extend)
  - [fst](#fst)
  - [snd](#snd)
  - [swap](#swap)
- [zone of death](#zone-of-death)
  - [~~mapLeft~~](#mapleft)
  - [~~map~~](#map)
  - [~~tuple~~](#tuple)

---

# Extract

## extract

**Signature**

```ts
export declare const extract: <E, A>(wa: [A, E]) => A
```

Added in v2.6.2

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: [A, E]) => M
```

Added in v2.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: [A, E]) => B
```

Added in v2.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: [A, E]) => B
```

Added in v2.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'Tuple'>
```

Added in v2.7.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad2<'Tuple'>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable2<'Tuple'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Tuple'>
```

Added in v2.7.0

## Semigroupoid

**Signature**

```ts
export declare const Semigroupoid: Semigroupoid2<'Tuple'>
```

Added in v2.7.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable2<'Tuple'>
```

Added in v2.7.0

## getApplicative

**Signature**

```ts
export declare function getApplicative<M>(M: Monoid<M>): Applicative2C<URI, M>
```

Added in v2.0.0

## getApply

**Signature**

```ts
export declare function getApply<S>(S: Semigroup<S>): Apply2C<URI, S>
```

Added in v2.0.0

## getChain

**Signature**

```ts
export declare function getChain<S>(S: Semigroup<S>): Chain2C<URI, S>
```

Added in v2.0.0

## getChainRec

**Signature**

```ts
export declare function getChainRec<M>(M: Monoid<M>): ChainRec2C<URI, M>
```

Added in v2.0.0

## getMonad

**Signature**

```ts
export declare function getMonad<M>(M: Monoid<M>): Monad2C<URI, M>
```

Added in v2.0.0

# mapping

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(mapSnd: (e: E) => G, mapFst: (a: A) => B) => (fa: [A, E]) => [B, G]
```

Added in v2.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: [(a: A) => B, E]) => [B, E]
```

Added in v2.10.0

## mapFst

Map a function over the first component of a `Tuple`.

This is the `map` operation of the `Functor` instance.

**Signature**

```ts
export declare const mapFst: <A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E]
```

Added in v2.0.0

## mapSnd

Map a function over the second component of a `Tuple`.

This is the `mapLeft` operation of the `Bifunctor` instance.

**Signature**

```ts
export declare const mapSnd: <E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G]
```

Added in v2.10.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: Sequence2<'Tuple'>
```

Added in v2.6.3

## traverse

**Signature**

```ts
export declare const traverse: PipeableTraverse2<'Tuple'>
```

Added in v2.6.3

# type lambdas

## URI

**Signature**

```ts
export declare const URI: 'Tuple'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# utils

## compose

**Signature**

```ts
export declare const compose: <A, B>(ab: [B, A]) => <C>(bc: [C, B]) => [C, A]
```

Added in v2.0.0

## duplicate

**Signature**

```ts
export declare const duplicate: <E, A>(wa: [A, E]) => [[A, E], E]
```

Added in v2.0.0

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: [A, E]) => B) => (wa: [A, E]) => [B, E]
```

Added in v2.0.0

## fst

**Signature**

```ts
export declare const fst: <A, E>(ea: [A, E]) => A
```

Added in v2.0.0

## snd

**Signature**

```ts
export declare const snd: <A, E>(ea: [A, E]) => E
```

Added in v2.0.0

## swap

**Signature**

```ts
export declare const swap: <A, E>(ea: [A, E]) => [E, A]
```

Added in v2.0.0

# zone of death

## ~~mapLeft~~

Use [`mapSnd`](#mapsnd) instead.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G]
```

Added in v2.0.0

## ~~map~~

Use [`mapFst`](#mapfst) instead.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E]
```

Added in v2.0.0

## ~~tuple~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `T.Functor` instead of `T.tuple`
(where `T` is from `import T from 'fp-ts/Tuple'`)

**Signature**

```ts
export declare const tuple: Semigroupoid2<'Tuple'> &
  Bifunctor2<'Tuple'> &
  Comonad2<'Tuple'> &
  Foldable2<'Tuple'> &
  Traversable2<'Tuple'>
```

Added in v2.0.0
