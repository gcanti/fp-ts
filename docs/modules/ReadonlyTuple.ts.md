---
title: ReadonlyTuple.ts
nav_order: 74
parent: Modules
---

## ReadonlyTuple overview

Added in v2.5.0

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
  - [readonlyTuple](#readonlytuple)
- [model](#model)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [utils](#utils)
  - [sequence](#sequence)
  - [traverse](#traverse)

---

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: readonly [A, E]) => readonly [B, G]
```

Added in v2.5.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: readonly [A, E]) => readonly [A, G]
```

Added in v2.5.0

# Extend

## duplicate

**Signature**

```ts
export declare const duplicate: <E, A>(ma: readonly [A, E]) => readonly [readonly [A, E], E]
```

Added in v2.5.0

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (fa: readonly [A, E]) => B) => (wa: readonly [A, E]) => readonly [B, E]
```

Added in v2.5.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <E, A>(wa: readonly [A, E]) => A
```

Added in v2.6.2

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: readonly [A, E]) => M
```

Added in v2.5.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: readonly [A, E]) => B
```

Added in v2.5.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: readonly [A, E]) => B
```

Added in v2.5.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E]
```

Added in v2.5.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <E, A>(la: readonly [A, E]) => <B>(ab: readonly [B, A]) => readonly [B, E]
```

Added in v2.5.0

# combinators

## swap

**Signature**

```ts
export declare function swap<A, S>(sa: readonly [A, S]): readonly [S, A]
```

Added in v2.5.0

# destructors

## fst

**Signature**

```ts
export declare function fst<A, S>(sa: readonly [A, S]): A
```

Added in v2.5.0

## snd

**Signature**

```ts
export declare function snd<A, S>(sa: readonly [A, S]): S
```

Added in v2.5.0

# instances

## getApplicative

**Signature**

```ts
export declare function getApplicative<S>(M: Monoid<S>): Applicative2C<URI, S>
```

Added in v2.5.0

## getApply

**Signature**

```ts
export declare function getApply<S>(S: Semigroup<S>): Apply2C<URI, S>
```

Added in v2.5.0

## getChain

**Signature**

```ts
export declare function getChain<S>(S: Semigroup<S>): Chain2C<URI, S>
```

Added in v2.5.0

## getChainRec

**Signature**

```ts
export declare function getChainRec<S>(M: Monoid<S>): ChainRec2C<URI, S>
```

Added in v2.5.0

## getMonad

**Signature**

```ts
export declare function getMonad<S>(M: Monoid<S>): Monad2C<URI, S>
```

Added in v2.5.0

## readonlyTuple

**Signature**

```ts
export declare const readonlyTuple: Semigroupoid2<'ReadonlyTuple'> &
  Bifunctor2<'ReadonlyTuple'> &
  Comonad2<'ReadonlyTuple'> &
  Foldable2<'ReadonlyTuple'> &
  Traversable2<'ReadonlyTuple'>
```

Added in v2.5.0

# model

## URI

**Signature**

```ts
export declare const URI: 'ReadonlyTuple'
```

Added in v2.5.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

# utils

## sequence

**Signature**

```ts
export declare const sequence: Sequence2<'ReadonlyTuple'>
```

Added in v2.6.3

## traverse

**Signature**

```ts
export declare const traverse: PipeableTraverse2<'ReadonlyTuple'>
```

Added in v2.6.3
