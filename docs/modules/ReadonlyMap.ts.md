---
title: ReadonlyMap.ts
nav_order: 81
parent: Modules
---

## ReadonlyMap overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filterMap](#filtermap)
  - [partitionMap](#partitionmap)
- [FilterableWithIndex](#filterablewithindex)
  - [filterMapWithIndex](#filtermapwithindex)
  - [partitionMapWithIndex](#partitionmapwithindex)
- [Functor](#functor)
  - [map](#map)
- [FunctorWithIndex](#functorwithindex)
  - [mapWithIndex](#mapwithindex)
- [HKT](#hkt)
  - [ReadonlyMapF (interface)](#readonlymapf-interface)
  - [ReadonlyMapFFixedK (interface)](#readonlymapffixedk-interface)
- [combinator](#combinator)
  - [getDifferenceMagma](#getdifferencemagma)
- [combinators](#combinators)
  - [deleteAt](#deleteat)
  - [flap](#flap)
  - [insertAt](#insertat)
  - [pop](#pop)
  - [upsertAt](#upsertat)
- [constructors](#constructors)
  - [fromFoldable](#fromfoldable)
  - [singleton](#singleton)
- [instances](#instances)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [Functor](#functor-1)
  - [getEq](#geteq)
  - [getFilterableWithIndex](#getfilterablewithindex)
  - [getFoldable](#getfoldable)
  - [getFoldableWithIndex](#getfoldablewithindex)
  - [getFunctorWithIndex](#getfunctorwithindex)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getMonoid](#getmonoid)
  - [getShow](#getshow)
  - [getTraversable](#gettraversable)
  - [getTraversableWithIndex](#gettraversablewithindex)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
  - [getWitherable](#getwitherable)
- [utils](#utils)
  - [collect](#collect)
  - [difference](#difference)
  - [elem](#elem)
  - [empty](#empty)
  - [filter](#filter)
  - [filterWithIndex](#filterwithindex)
  - [foldMap](#foldmap)
  - [foldMapWithIndex](#foldmapwithindex)
  - [intersection](#intersection)
  - [isEmpty](#isempty)
  - [isSubmap](#issubmap)
  - [keys](#keys)
  - [lookup](#lookup)
  - [lookupWithKey](#lookupwithkey)
  - [member](#member)
  - [modifyAt](#modifyat)
  - [partition](#partition)
  - [partitionWithIndex](#partitionwithindex)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
  - [refine](#refine)
  - [refineWithIndex](#refinewithindex)
  - [refinement](#refinement)
  - [refinementWithIndex](#refinementwithindex)
  - [sequence](#sequence)
  - [size](#size)
  - [toReadonlyArray](#toreadonlyarray)
  - [toUnfoldable](#tounfoldable)
  - [traverse](#traverse)
  - [traverseWithIndex](#traversewithindex)
  - [union](#union)
  - [updateAt](#updateat)
  - [values](#values)
  - [wilt](#wilt)
  - [wither](#wither)

---

# Compactable

## compact

**Signature**

```ts
export declare const compact: <K, A>(m: ReadonlyMap<K, O.Option<A>>) => ReadonlyMap<K, A>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <K, A, B>(
  fa: ReadonlyMap<K, Either<A, B>>
) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>>
```

Added in v3.0.0

# Filterable

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => <K>(fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>>
```

Added in v3.0.0

# FilterableWithIndex

## filterMapWithIndex

**Signature**

```ts
export declare const filterMapWithIndex: <K, A, B>(
  f: (k: K, a: A) => O.Option<B>
) => (fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## partitionMapWithIndex

**Signature**

```ts
export declare const partitionMapWithIndex: <K, A, B, C>(
  f: (k: K, a: A) => Either<B, C>
) => (fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v3.0.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <K, A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v3.0.0

# HKT

## ReadonlyMapF (interface)

**Signature**

```ts
export interface ReadonlyMapF extends HKT {
  readonly type: ReadonlyMap<this['Invariant1'], this['Covariant1']>
}
```

Added in v3.0.0

## ReadonlyMapFFixedK (interface)

**Signature**

```ts
export interface ReadonlyMapFFixedK<K> extends HKT {
  readonly type: ReadonlyMap<K, this['Covariant1']>
}
```

Added in v3.0.0

# combinator

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <K>(E: Eq<K>) => <A>() => Magma<ReadonlyMap<K, A>>
```

Added in v3.0.0

# combinators

## deleteAt

Delete the element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const deleteAt: <K>(E: Eq<K>) => (k: K) => <A>(m: ReadonlyMap<K, A>) => O.Option<ReadonlyMap<K, A>>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <K, B>(fab: ReadonlyMap<K, (a: A) => B>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## insertAt

Insert an element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key already exists.

**Signature**

```ts
export declare const insertAt: <K>(E: Eq<K>) => <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => O.Option<ReadonlyMap<K, A>>
```

Added in v3.0.0

## pop

Delete a key and value from a `ReadonlyMap`, returning the value as well as the subsequent `ReadonlyMap`,
or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const pop: <K>(
  E: Eq<K>
) => (k: K) => <A>(m: ReadonlyMap<K, A>) => O.Option<readonly [A, ReadonlyMap<K, A>]>
```

Added in v3.0.0

## upsertAt

Insert or replace a key/value pair in a `ReadonlyMap`.

**Signature**

```ts
export declare const upsertAt: <K>(E: Eq<K>) => <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

Added in v3.0.0

# constructors

## fromFoldable

Create a `ReadonlyRecord` from a `Foldable` collection of key/value pairs, using the
specified `Magma` to combine values for duplicate keys, and the specified `f` to map to key/value pairs.

**Signature**

```ts
export declare function fromFoldable<F extends HKT>(
  F: Foldable<F>
): <K, B>(
  E: Eq<K>,
  M: Magma<B>
) => <A>(f: (a: A) => readonly [K, B]) => <S, R, W, E>(fka: Kind<F, S, R, W, E, A>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## singleton

Create a `ReadonlyMap` from one key/value pair.

**Signature**

```ts
export declare const singleton: <K, A>(k: K, a: A) => ReadonlyMap<K, A>
```

Added in v3.0.0

# instances

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable_<ReadonlyMapF>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: FilterableModule.Filterable<ReadonlyMapF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor_<ReadonlyMapF>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <K, A>(EK: Eq<K>, EA: Eq<A>) => Eq<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getFilterableWithIndex

**Signature**

```ts
export declare const getFilterableWithIndex: <K = never>() => FilterableWithIndexModule.FilterableWithIndex<
  ReadonlyMapFFixedK<K>,
  K
>
```

Added in v3.0.0

## getFoldable

**Signature**

```ts
export declare const getFoldable: <K>(O: Ord<K>) => Foldable<ReadonlyMapFFixedK<K>>
```

Added in v3.0.0

## getFoldableWithIndex

**Signature**

```ts
export declare const getFoldableWithIndex: <K>(O: Ord<K>) => FoldableWithIndex<ReadonlyMapFFixedK<K>, K>
```

Added in v3.0.0

## getFunctorWithIndex

**Signature**

```ts
export declare const getFunctorWithIndex: <K = never>() => FunctorWithIndex<ReadonlyMapFFixedK<K>, K>
```

Added in v3.0.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <K, A>(E: Eq<K>, S: Semigroup<A>) => Semigroup<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getMonoid

Get a `Monoid` instance for `ReadonlyMap` given a `Semigroup` instance for its values.

**Signature**

```ts
export declare const getMonoid: <K, A>(EK: Eq<K>, SA: Semigroup<A>) => Monoid<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <K, A>(SK: Show<K>, SA: Show<A>) => Show<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getTraversable

**Signature**

```ts
export declare const getTraversable: <K>(O: Ord<K>) => Traversable<ReadonlyMapFFixedK<K>>
```

Added in v3.0.0

## getTraversableWithIndex

**Signature**

```ts
export declare const getTraversableWithIndex: <K>(O: Ord<K>) => TraversableWithIndex<ReadonlyMapFFixedK<K>, K>
```

Added in v3.0.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <K, A>(E: Eq<K>, S: Semigroup<A>) => Monoid<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <K, A>(E: Eq<K>, S: Semigroup<A>) => Semigroup<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getWitherable

**Signature**

```ts
export declare const getWitherable: <K>(O: Ord<K>) => Witherable<ReadonlyMapFFixedK<K>>
```

Added in v3.0.0

# utils

## collect

**Signature**

```ts
export declare const collect: <K>(O: Ord<K>) => <A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => readonly B[]
```

Added in v3.0.0

## difference

**Signature**

```ts
export declare const difference: <K>(
  E: Eq<K>
) => <A>(_second: ReadonlyMap<K, A>) => (first: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `ReadonlyMap`.

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => (a: A) => <K>(m: ReadonlyMap<K, A>) => boolean
```

Added in v3.0.0

## empty

An empty `ReadonlyMap`.

**Signature**

```ts
export declare const empty: <K>() => ReadonlyMap<K, never>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: <B extends A, A = B>(
  predicate: Predicate<A>
) => <K>(fb: ReadonlyMap<K, B>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: <K, B extends A, A = B>(
  predicate: (i: K, a: A) => boolean
) => (fb: ReadonlyMap<K, B>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: <K>(O: Ord<K>) => <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: ReadonlyMap<K, A>) => M
```

Added in v3.0.0

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <K>(
  O: Ord<K>
) => <M>(M: Monoid<M>) => <A>(f: (i: K, a: A) => M) => (fa: ReadonlyMap<K, A>) => M
```

Added in v3.0.0

## intersection

**Signature**

```ts
export declare const intersection: <K, A>(
  E: Eq<K>,
  M: Magma<A>
) => (second: ReadonlyMap<K, A>) => (first: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

Added in v3.0.0

## isEmpty

Test whether or not a `ReadonlyMap` is empty.

**Signature**

```ts
export declare const isEmpty: <K, A>(d: ReadonlyMap<K, A>) => boolean
```

Added in v3.0.0

## isSubmap

Test whether or not one `ReadonlyMap` contains all of the keys and values contained in another `ReadonlyMap`.

**Signature**

```ts
export declare const isSubmap: <K, A>(
  EK: Eq<K>,
  SA: Eq<A>
) => (second: ReadonlyMap<K, A>) => (first: ReadonlyMap<K, A>) => boolean
```

Added in v3.0.0

## keys

Get a sorted `ReadonlyArray` of the keys contained in a `ReadonlyMap`.

**Signature**

```ts
export declare const keys: <K>(O: Ord<K>) => <A>(m: ReadonlyMap<K, A>) => readonly K[]
```

Added in v3.0.0

## lookup

Lookup the value for a key in a `ReadonlyMap`.

**Signature**

```ts
export declare const lookup: <K>(E: Eq<K>) => (k: K) => <A>(m: ReadonlyMap<K, A>) => O.Option<A>
```

Added in v3.0.0

## lookupWithKey

Lookup the value for a key in a `ReadonlyMap`.
If the result is a `Some`, the existing key is also returned.

**Signature**

```ts
export declare const lookupWithKey: <K>(E: Eq<K>) => (k: K) => <A>(m: ReadonlyMap<K, A>) => O.Option<readonly [K, A]>
```

Added in v3.0.0

## member

Test whether or not a key exists in a `ReadonlyMap`.

**Signature**

```ts
export declare const member: <K>(E: Eq<K>) => (k: K) => <A>(m: ReadonlyMap<K, A>) => boolean
```

Added in v3.0.0

## modifyAt

Apply a function to the element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const modifyAt: <K>(
  E: Eq<K>
) => <A>(k: K, f: Endomorphism<A>) => (m: ReadonlyMap<K, A>) => O.Option<ReadonlyMap<K, A>>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: <B extends A, A = B>(
  predicate: Predicate<A>
) => <K>(fb: ReadonlyMap<K, B>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, B>>
```

Added in v3.0.0

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: <K, B extends A, A = B>(
  predicate: (i: K, a: A) => boolean
) => (fb: ReadonlyMap<K, B>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, B>>
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <K>(O: Ord<K>) => <B, A>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyMap<K, A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <K>(O: Ord<K>) => <B, A>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyMap<K, A>) => B
```

Added in v3.0.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <K>(
  O: Ord<K>
) => <B, A>(b: B, f: (i: K, a: A, b: B) => B) => (fa: ReadonlyMap<K, A>) => B
```

Added in v3.0.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <K>(
  O: Ord<K>
) => <B, A>(b: B, f: (i: K, b: B, a: A) => B) => (fa: ReadonlyMap<K, A>) => B
```

Added in v3.0.0

## refine

**Signature**

```ts
export declare const refine: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => <K>(fc: ReadonlyMap<K, C>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## refineWithIndex

**Signature**

```ts
export declare const refineWithIndex: <K, C extends A, B extends A, A = C>(
  refinement: (i: K, a: A) => a is B
) => (fc: ReadonlyMap<K, C>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## refinement

**Signature**

```ts
export declare const refinement: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => <K>(fc: ReadonlyMap<K, C>) => Separated<ReadonlyMap<K, C>, ReadonlyMap<K, B>>
```

Added in v3.0.0

## refinementWithIndex

**Signature**

```ts
export declare const refinementWithIndex: <K, C extends A, B extends A, A = C>(
  refinement: (i: K, a: A) => a is B
) => (fb: ReadonlyMap<K, C>) => Separated<ReadonlyMap<K, C>, ReadonlyMap<K, B>>
```

Added in v3.0.0

## sequence

**Signature**

```ts
export declare const sequence: <K>(
  O: Ord<K>
) => <F extends HKT>(
  F: Applicative<F>
) => <S, R, W, E, A>(ta: ReadonlyMap<K, Kind<F, S, R, W, E, A>>) => Kind<F, S, R, W, E, ReadonlyMap<K, A>>
```

Added in v3.0.0

## size

Calculate the number of key/value pairs in a `ReadonlyMap`.

**Signature**

```ts
export declare const size: <K, A>(d: ReadonlyMap<K, A>) => number
```

Added in v3.0.0

## toReadonlyArray

Get a sorted `ReadonlyArray` of the key/value pairs contained in a `ReadonlyMap`.

**Signature**

```ts
export declare const toReadonlyArray: <K>(O: Ord<K>) => <A>(m: ReadonlyMap<K, A>) => readonly (readonly [K, A])[]
```

Added in v3.0.0

## toUnfoldable

Unfolds a `ReadonlyMap` into a data structure of key/value pairs.

**Signature**

```ts
export declare function toUnfoldable<F extends HKT>(
  U: Unfoldable<F>
): <K>(o: Ord<K>) => <A, S, R, W, E>(d: ReadonlyMap<K, A>) => Kind<F, S, R, W, E, readonly [K, A]>
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: <K>(
  O: Ord<K>
) => <F extends HKT>(
  F: Applicative<F>
) => <A, S, R, W, E, B>(
  f: (a: A) => Kind<F, S, R, W, E, B>
) => (ta: ReadonlyMap<K, A>) => Kind<F, S, R, W, E, ReadonlyMap<K, B>>
```

Added in v3.0.0

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: <K>(
  O: Ord<K>
) => <F extends HKT>(
  F: Applicative<F>
) => <A, S, R, W, E, B>(
  f: (i: K, a: A) => Kind<F, S, R, W, E, B>
) => (ta: ReadonlyMap<K, A>) => Kind<F, S, R, W, E, ReadonlyMap<K, B>>
```

Added in v3.0.0

## union

**Signature**

```ts
export declare const union: <K, A>(
  E: Eq<K>,
  M: Magma<A>
) => (second: ReadonlyMap<K, A>) => (first: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

Added in v3.0.0

## updateAt

Change the element at the specified keys, creating a new `ReadonlyMap`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const updateAt: <K>(E: Eq<K>) => <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => O.Option<ReadonlyMap<K, A>>
```

Added in v3.0.0

## values

Get a sorted `ReadonlyArray` of the values contained in a `ReadonlyMap`.

**Signature**

```ts
export declare const values: <A>(O: Ord<A>) => <K>(m: ReadonlyMap<K, A>) => readonly A[]
```

Added in v3.0.0

## wilt

**Signature**

```ts
export declare const wilt: <K>(
  O: Ord<K>
) => <F extends HKT>(
  F: Applicative<F>
) => <A, S, R, W, E, B, C>(
  f: (a: A) => Kind<F, S, R, W, E, Either<B, C>>
) => (wa: ReadonlyMap<K, A>) => Kind<F, S, R, W, E, Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>>>
```

Added in v3.0.0

## wither

**Signature**

```ts
export declare const wither: <K>(
  O: Ord<K>
) => <F extends HKT>(
  F: Applicative<F>
) => <A, S, R, W, E, B>(
  f: (a: A) => Kind<F, S, R, W, E, O.Option<B>>
) => (ta: ReadonlyMap<K, A>) => Kind<F, S, R, W, E, ReadonlyMap<K, B>>
```

Added in v3.0.0
