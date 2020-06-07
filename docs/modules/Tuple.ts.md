---
title: Tuple.ts
nav_order: 96
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
  - [duplicate](#duplicate)
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
  - [swap](#swap)
- [destructors](#destructors)
  - [fst](#fst)
  - [snd](#snd)
- [instances](#instances)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getChain](#getchain)
  - [getChainRec](#getchainrec)
  - [getMonad](#getmonad)
  - [tuple](#tuple)
- [model](#model)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [utils](#utils)
  - [sequence](#sequence)
  - [traverse](#traverse)

---

# Bifunctor

## bimap

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: [A, E]) => [B, G]
```

Added in v2.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G]
```

Added in v2.0.0

# Extend

## duplicate

**Signature**

```ts
export declare const duplicate: <E, A>(ma: [A, E]) => [[A, E], E]
```

Added in v2.0.0

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

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E]
```

Added in v2.0.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <E, A>(la: [A, E]) => <B>(ab: [B, A]) => [B, E]
```

Added in v2.0.0

# combinators

## swap

**Signature**

```ts
export declare const swap: <A, S>(sa: [A, S]) => [S, A]
```

Added in v2.0.0

# destructors

## fst

**Signature**

```ts
export declare const fst: <A, S>(sa: [A, S]) => A
```

Added in v2.0.0

## snd

**Signature**

```ts
export declare const snd: <A, S>(sa: [A, S]) => S
```

Added in v2.0.0

# instances

## getApplicative

**Signature**

```ts
export declare const getApplicative: <S>(M: Monoid<S>) => Applicative2C<'Tuple', S>
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
export declare const getChainRec: <S>(M: Monoid<S>) => ChainRec2C<'Tuple', S>
```

Added in v2.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <S>(M: Monoid<S>) => Monad2C<'Tuple', S>
```

Added in v2.0.0

## tuple

**Signature**

```ts
export declare const tuple: Semigroupoid2<'Tuple'> &
  Bifunctor2<'Tuple'> &
  Comonad2<'Tuple'> &
  Foldable2<'Tuple'> &
  Traversable2<'Tuple'>
```

Added in v2.0.0

# model

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
