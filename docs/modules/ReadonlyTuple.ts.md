---
title: ReadonlyTuple.ts
nav_order: 89
parent: Modules
---

## ReadonlyTuple overview

Added in v2.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapSnd](#mapsnd)
- [Extend](#extend)
  - [extend](#extend)
- [Extract](#extract)
  - [extract](#extract)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [mapFst](#mapfst)
- [Semigroupoid](#semigroupoid)
  - [compose](#compose)
- [combinators](#combinators)
  - [duplicate](#duplicate)
  - [flap](#flap)
  - [swap](#swap)
- [destructors](#destructors)
  - [fst](#fst)
  - [snd](#snd)
- [instance operations](#instance-operations)
  - [map](#map)
  - [mapLeft](#mapleft)
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
  - [~~readonlyTuple~~](#readonlytuple)
- [utils](#utils)
  - [sequence](#sequence)
  - [traverse](#traverse)

---

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  mapSnd: (e: E) => G,
  mapFst: (a: A) => B
) => (fa: readonly [A, E]) => readonly [B, G]
```

Added in v2.5.0

## mapSnd

Map a function over the second component of a `ReadonlyTuple`.

This is the `mapLeft` operation of the `Bifunctor` instance.

**Signature**

```ts
export declare const mapSnd: <E, G>(f: (e: E) => G) => <A>(fa: readonly [A, E]) => readonly [A, G]
```

Added in v2.10.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: readonly [A, E]) => B) => (wa: readonly [A, E]) => readonly [B, E]
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

## mapFst

Map a function over the first component of a `ReadonlyTuple`.

This is the `map` operation of the `Functor` instance.

**Signature**

```ts
export declare const mapFst: <A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E]
```

Added in v2.10.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <A, B>(ab: readonly [B, A]) => <C>(bc: readonly [C, B]) => readonly [C, A]
```

Added in v2.5.0

# combinators

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <E, A>(wa: readonly [A, E]) => readonly [readonly [A, E], E]
```

Added in v2.5.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: readonly [(a: A) => B, E]) => readonly [B, E]
```

Added in v2.10.0

## swap

**Signature**

```ts
export declare const swap: <A, E>(ea: readonly [A, E]) => readonly [E, A]
```

Added in v2.5.0

# destructors

## fst

**Signature**

```ts
export declare function fst<A, E>(ea: readonly [A, E]): A
```

Added in v2.5.0

## snd

**Signature**

```ts
export declare function snd<A, E>(ea: readonly [A, E]): E
```

Added in v2.5.0

# instance operations

## map

Alias of [`mapFst`](#mapfst).

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: readonly [A, E]) => readonly [B, E]
```

Added in v2.5.0

## mapLeft

Alias of [`mapSnd`](#mapsnd).

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: readonly [A, E]) => readonly [A, G]
```

Added in v2.5.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'ReadonlyTuple'>
```

Added in v2.7.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad2<'ReadonlyTuple'>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable2<'ReadonlyTuple'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReadonlyTuple'>
```

Added in v2.7.0

## Semigroupoid

**Signature**

```ts
export declare const Semigroupoid: Semigroupoid2<'ReadonlyTuple'>
```

Added in v2.7.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable2<'ReadonlyTuple'>
```

Added in v2.7.0

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

## getApplicative

**Signature**

```ts
export declare function getApplicative<M>(M: Monoid<M>): Applicative2C<URI, M>
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
export declare function getChainRec<M>(M: Monoid<M>): ChainRec2C<URI, M>
```

Added in v2.5.0

## getMonad

**Signature**

```ts
export declare function getMonad<M>(M: Monoid<M>): Monad2C<URI, M>
```

Added in v2.5.0

## ~~readonlyTuple~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `RT.Functor` instead of `RT.readonlyTuple`
(where `RT` is from `import RT from 'fp-ts/ReadonlyTuple'`)

**Signature**

```ts
export declare const readonlyTuple: Semigroupoid2<'ReadonlyTuple'> &
  Bifunctor2<'ReadonlyTuple'> &
  Comonad2<'ReadonlyTuple'> &
  Foldable2<'ReadonlyTuple'> &
  Traversable2<'ReadonlyTuple'>
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
