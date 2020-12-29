---
title: ReadonlyTuple2.ts
nav_order: 67
parent: Modules
---

## ReadonlyTuple2 overview

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
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getMonad](#getmonad)
  - [getPointed](#getpointed)
- [utils](#utils)
  - [ReadonlyTuple2 (type alias)](#readonlytuple2-type-alias)
  - [fst](#fst)
  - [sequence](#sequence)
  - [snd](#snd)
  - [traverse](#traverse)

---

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (fea: ReadonlyTuple2<E, A>) => ReadonlyTuple2<G, B>
```

Added in v3.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: ReadonlyTuple2<E, A>) => ReadonlyTuple2<G, A>
```

Added in v3.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(
  f: (wa: ReadonlyTuple2<E, A>) => B
) => (wa: ReadonlyTuple2<E, A>) => ReadonlyTuple2<E, B>
```

Added in v3.0.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <E, A>(wa: ReadonlyTuple2<E, A>) => A
```

Added in v3.0.0

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: ReadonlyTuple2<E, A>) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(fa: ReadonlyTuple2<E, A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(fa: ReadonlyTuple2<E, A>) => B
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: ReadonlyTuple2<E, A>) => ReadonlyTuple2<E, B>
```

Added in v3.0.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <B, C>(bc: ReadonlyTuple2<B, C>) => <A>(ab: ReadonlyTuple2<A, B>) => ReadonlyTuple2<A, C>
```

Added in v3.0.0

# combinators

## swap

**Signature**

```ts
export declare const swap: <A, E>(t: ReadonlyTuple2<E, A>) => ReadonlyTuple2<A, E>
```

Added in v3.0.0

# derivable combinators

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <E, A>(t: ReadonlyTuple2<E, A>) => ReadonlyTuple2<E, ReadonlyTuple2<E, A>>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'ReadonlyTuple'>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad2<'ReadonlyTuple'>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable2<'ReadonlyTuple'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReadonlyTuple'>
```

Added in v3.0.0

## Semigroupoid

**Signature**

```ts
export declare const Semigroupoid: Semigroupoid2<'ReadonlyTuple'>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable2<'ReadonlyTuple'>
```

Added in v3.0.0

## URI

**Signature**

```ts
export declare const URI: 'ReadonlyTuple'
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <M>(M: Monoid<M>) => Applicative2C<'ReadonlyTuple', M>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <S>(S: Semigroup<S>) => Apply2C<'ReadonlyTuple', S>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <M>(M: Monoid<M>) => Monad2C<'ReadonlyTuple', M>
```

Added in v3.0.0

## getPointed

**Signature**

```ts
export declare const getPointed: <M>(M: Monoid<M>) => Pointed2C<'ReadonlyTuple', M>
```

Added in v3.0.0

# utils

## ReadonlyTuple2 (type alias)

**Signature**

```ts
export type ReadonlyTuple2<E, A> = readonly [A, E]
```

Added in v3.0.0

## fst

**Signature**

```ts
export declare const fst: <A, E>(t: ReadonlyTuple2<E, A>) => A
```

Added in v3.0.0

## sequence

**Signature**

```ts
export declare const sequence: Sequence2<'ReadonlyTuple'>
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare const snd: <A, E>(t: ReadonlyTuple2<E, A>) => E
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: Traverse2<'ReadonlyTuple'>
```

Added in v3.0.0
