---
title: Tuple2.ts
nav_order: 104
parent: Modules
---

## Tuple2 overview

Added in v3.0.0

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
  - [flap](#flap)
  - [swap](#swap)
- [derivable combinators](#derivable-combinators)
  - [duplicate](#duplicate)
- [instances](#instances)
  - [Bifunctor](#bifunctor-1)
  - [Comonad](#comonad)
  - [Foldable](#foldable-1)
  - [Functor](#functor-1)
  - [Semigroupoid](#semigroupoid-1)
  - [Traversable](#traversable)
  - [URI (type alias)](#uri-type-alias)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getChain](#getchain)
  - [getChainRec](#getchainrec)
  - [getMonad](#getmonad)
  - [getPointed](#getpointed)
- [utils](#utils)
  - [Tuple2 (type alias)](#tuple2-type-alias)
  - [fst](#fst)
  - [make](#make)
  - [snd](#snd)
  - [traverse](#traverse)

---

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Tuple2<E, A>) => Tuple2<G, B>
```

Added in v3.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: Tuple2<E, A>) => Tuple2<G, A>
```

Added in v3.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: Tuple2<E, A>) => B) => (wa: Tuple2<E, A>) => Tuple2<E, B>
```

Added in v3.0.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <E, A>(wa: Tuple2<E, A>) => A
```

Added in v3.0.0

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Tuple2<E, A>) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(fa: Tuple2<E, A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(fa: Tuple2<E, A>) => B
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Tuple2<E, A>) => Tuple2<E, B>
```

Added in v3.0.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <B, C>(bc: Tuple2<B, C>) => <A>(ab: Tuple2<A, B>) => Tuple2<A, C>
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Tuple2<E, (a: A) => B>) => Tuple2<E, B>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <A, E>(t: Tuple2<E, A>) => Tuple2<A, E>
```

Added in v3.0.0

# derivable combinators

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <E, A>(t: Tuple2<E, A>) => Tuple2<E, Tuple2<E, A>>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'Tuple2'>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad2<'Tuple2'>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable2<'Tuple2'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Tuple2'>
```

Added in v3.0.0

## Semigroupoid

**Signature**

```ts
export declare const Semigroupoid: Semigroupoid2<'Tuple2'>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable2<'Tuple2'>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'Tuple2'
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <M>(M: Monoid<M>) => Applicative2C<'Tuple2', M>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <S>(S: Semigroup<S>) => Apply2C<'Tuple2', S>
```

Added in v3.0.0

## getChain

**Signature**

```ts
export declare const getChain: <S>(S: Semigroup<S>) => Chain2C<'Tuple2', S>
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
export declare const getMonad: <M>(M: Monoid<M>) => Monad2C<'Tuple2', M>
```

Added in v3.0.0

## getPointed

**Signature**

```ts
export declare const getPointed: <M>(M: Monoid<M>) => Pointed2C<'Tuple2', M>
```

Added in v3.0.0

# utils

## Tuple2 (type alias)

**Signature**

```ts
export type Tuple2<E, A> = readonly [A, E]
```

Added in v3.0.0

## fst

**Signature**

```ts
export declare const fst: <A, E>(t: Tuple2<E, A>) => A
```

Added in v3.0.0

## make

**Signature**

```ts
export declare const make: <A, E>(a: A, e: E) => Tuple2<E, A>
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare const snd: <A, E>(t: Tuple2<E, A>) => E
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: Traverse2<'Tuple2'>
```

Added in v3.0.0
