---
title: Tuple.ts
nav_order: 104
parent: Modules
---

## Tuple overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Extend](#extend)
  - [extend](#extend)
- [Extract](#extract)
  - [extract](#extract)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [Semigroupoid](#semigroupoid)
  - [compose](#compose)
- [combinators](#combinators)
  - [duplicate](#duplicate)
  - [flap](#flap)
  - [swap](#swap)
- [destructors](#destructors)
  - [fst](#fst)
  - [snd](#snd)
- [instances](#instances)
  - [Bifunctor](#bifunctor-1)
  - [Comonad](#comonad)
  - [Foldable](#foldable-1)
  - [Functor](#functor-1)
  - [Semigroupoid](#semigroupoid-1)
  - [Traversable](#traversable)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getChain](#getchain)
  - [getChainRec](#getchainrec)
  - [getMonad](#getmonad)
  - [~~tuple~~](#tuple)
- [utils](#utils)
  - [sequence](#sequence)
  - [traverse](#traverse)

---

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: [A, E]) => [B, G]
```

Added in v2.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G]
```

Added in v2.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: [A, E]) => B) => (wa: [A, E]) => [B, E]
```

Added in v2.0.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <E, A>(wa: [A, E]) => A
```

Added in v2.6.2

# Foldable

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

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E]
```

Added in v2.0.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <A, B>(ab: [B, A]) => <C>(bc: [C, B]) => [C, A]
```

Added in v2.0.0

# combinators

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <E, A>(wa: [A, E]) => [[A, E], E]
```

Added in v2.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: [(a: A) => B, E]) => [B, E]
```

Added in v2.10.0

## swap

**Signature**

```ts
export declare const swap: <A, E>(sa: [A, E]) => [E, A]
```

Added in v2.0.0

# destructors

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

## getApplicative

**Signature**

```ts
export declare const getApplicative: <M>(M: Monoid<M>) => Applicative2C<'Tuple', M>
```

Added in v2.0.0

## getApply

**Signature**

```ts
export declare const getApply: <S>(S: Semigroup<S>) => Apply2C<'Tuple', S>
```

Added in v2.0.0

## getChain

**Signature**

```ts
export declare const getChain: <S>(S: Semigroup<S>) => Chain2C<'Tuple', S>
```

Added in v2.0.0

## getChainRec

**Signature**

```ts
export declare const getChainRec: <M>(M: Monoid<M>) => ChainRec2C<'Tuple', M>
```

Added in v2.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <M>(M: Monoid<M>) => Monad2C<'Tuple', M>
```

Added in v2.0.0

## ~~tuple~~

Use small, specific instances instead.

**Signature**

```ts
export declare const tuple: Semigroupoid2<'Tuple'> &
  Bifunctor2<'Tuple'> &
  Comonad2<'Tuple'> &
  Foldable2<'Tuple'> &
  Traversable2<'Tuple'>
```

Added in v2.0.0

# utils

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
