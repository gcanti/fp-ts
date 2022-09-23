---
title: Map.ts
nav_order: 59
parent: Modules
---

## Map overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [Functor](#functor)
  - [map](#map)
- [FunctorWithIndex](#functorwithindex)
  - [mapWithIndex](#mapwithindex)
- [combinators](#combinators)
  - [deleteAt](#deleteat)
  - [filterMapWithIndex](#filtermapwithindex)
  - [filterWithIndex](#filterwithindex)
  - [flap](#flap)
  - [partitionMapWithIndex](#partitionmapwithindex)
  - [partitionWithIndex](#partitionwithindex)
  - [upsertAt](#upsertat)
  - [~~insertAt~~](#insertat)
- [constructors](#constructors)
  - [fromFoldable](#fromfoldable)
- [instances](#instances)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [Functor](#functor-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getDifferenceMagma](#getdifferencemagma)
  - [getEq](#geteq)
  - [getFilterableWithIndex](#getfilterablewithindex)
  - [getFoldable](#getfoldable)
  - [getFoldableWithIndex](#getfoldablewithindex)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getMonoid](#getmonoid)
  - [getShow](#getshow)
  - [getTraversableWithIndex](#gettraversablewithindex)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
  - [getWitherable](#getwitherable)
  - [~~map\_~~](#map_)
- [utils](#utils)
  - [collect](#collect)
  - [difference](#difference)
  - [elem](#elem)
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
  - [pop](#pop)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
  - [singleton](#singleton)
  - [size](#size)
  - [toArray](#toarray)
  - [toUnfoldable](#tounfoldable)
  - [union](#union)
  - [updateAt](#updateat)
  - [values](#values)
  - [~~empty~~](#empty)

---

# Compactable

## compact

**Signature**

```ts
export declare const compact: <K, A>(fa: Map<K, O.Option<A>>) => Map<K, A>
```

Added in v2.0.0

## separate

**Signature**

```ts
export declare const separate: <K, A, B>(fa: Map<K, Either<A, B>>) => Separated<Map<K, A>, Map<K, B>>
```

Added in v2.0.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): <K>(fa: Map<K, A>) => Map<K, B>
  <A>(predicate: Predicate<A>): <K, B extends A>(fb: Map<K, B>) => Map<K, B>
  <A>(predicate: Predicate<A>): <K>(fa: Map<K, A>) => Map<K, A>
}
```

Added in v2.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => <K>(fa: Map<K, A>) => Map<K, B>
```

Added in v2.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): <K>(fa: Map<K, A>) => Separated<Map<K, A>, Map<K, B>>
  <A>(predicate: Predicate<A>): <K, B extends A>(fb: Map<K, B>) => Separated<Map<K, B>, Map<K, B>>
  <A>(predicate: Predicate<A>): <K>(fa: Map<K, A>) => Separated<Map<K, A>, Map<K, A>>
}
```

Added in v2.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => <K>(fa: Map<K, A>) => Separated<Map<K, B>, Map<K, C>>
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <K>(fa: Map<K, A>) => Map<K, B>
```

Added in v2.0.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <K, A, B>(f: (k: K, a: A) => B) => (fa: Map<K, A>) => Map<K, B>
```

Added in v2.7.1

# combinators

## deleteAt

Delete a key and value from a map

**Signature**

```ts
export declare const deleteAt: <K>(E: Eq<K>) => (k: K) => <A>(m: Map<K, A>) => Map<K, A>
```

Added in v2.0.0

## filterMapWithIndex

**Signature**

```ts
export declare const filterMapWithIndex: <K, A, B>(f: (k: K, a: A) => O.Option<B>) => (fa: Map<K, A>) => Map<K, B>
```

Added in v2.10.0

## filterWithIndex

**Signature**

```ts
export declare function filterWithIndex<K, A, B extends A>(p: (k: K, a: A) => a is B): (m: Map<K, A>) => Map<K, B>
export declare function filterWithIndex<K, A>(p: (k: K, a: A) => boolean): <B extends A>(m: Map<K, B>) => Map<K, B>
export declare function filterWithIndex<K, A>(p: (k: K, a: A) => boolean): (m: Map<K, A>) => Map<K, A>
```

Added in v2.10.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Map<E, (a: A) => B>) => Map<E, B>
```

Added in v2.10.0

## partitionMapWithIndex

**Signature**

```ts
export declare const partitionMapWithIndex: <K, A, B, C>(
  f: (k: K, a: A) => Either<B, C>
) => (fa: Map<K, A>) => Separated<Map<K, B>, Map<K, C>>
```

Added in v2.10.0

## partitionWithIndex

**Signature**

```ts
export declare function partitionWithIndex<K, A, B extends A>(
  predicateWithIndex: (k: K, a: A) => a is B
): (fa: Map<K, A>) => Separated<Map<K, A>, Map<K, B>>
export declare function partitionWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): <B extends A>(fb: Map<K, B>) => Separated<Map<K, B>, Map<K, B>>
export declare function partitionWithIndex<K, A>(
  predicateWithIndex: (k: K, a: A) => boolean
): (fa: Map<K, A>) => Separated<Map<K, A>, Map<K, A>>
```

Added in v2.10.0

## upsertAt

Insert or replace a key/value pair in a `Map`.

**Signature**

```ts
export declare const upsertAt: <K>(E: Eq<K>) => <A>(k: K, a: A) => (m: Map<K, A>) => Map<K, A>
```

Added in v2.0.0

## ~~insertAt~~

Use [`upsertAt`](#upsertat) instead.

**Signature**

```ts
export declare const insertAt: <K>(E: Eq<K>) => <A>(k: K, a: A) => (m: Map<K, A>) => Map<K, A>
```

Added in v2.0.0

# constructors

## fromFoldable

Create a map from a foldable collection of key/value pairs, using the
specified `Magma` to combine values for duplicate keys.

**Signature**

```ts
export declare function fromFoldable<F extends URIS3, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable3<F>
): <R, E>(fka: Kind3<F, R, E, [K, A]>) => Map<K, A>
export declare function fromFoldable<F extends URIS2, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable2<F>
): <E>(fka: Kind2<F, E, [K, A]>) => Map<K, A>
export declare function fromFoldable<F extends URIS, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Kind<F, [K, A]>) => Map<K, A>
export declare function fromFoldable<F, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable<F>): (fka: HKT<F, [K, A]>) => Map<K, A>
```

Added in v2.0.0

# instances

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable2<'Map'>
```

Added in v2.7.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable2<'Map'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Map'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Map'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <K>(E: Eq<K>) => <A>() => Magma<Map<K, A>>
```

Added in v2.11.0

## getEq

**Signature**

```ts
export declare const getEq: <K, A>(SK: Eq<K>, SA: Eq<A>) => Eq<Map<K, A>>
```

Added in v2.0.0

## getFilterableWithIndex

**Signature**

```ts
export declare function getFilterableWithIndex<K = never>(): FilterableWithIndex2C<URI, K, K>
```

Added in v2.0.0

## getFoldable

**Signature**

```ts
export declare const getFoldable: <K>(O: Ord<K>) => Foldable2C<'Map', K>
```

Added in v2.11.0

## getFoldableWithIndex

**Signature**

```ts
export declare const getFoldableWithIndex: <K>(O: Ord<K>) => FoldableWithIndex2C<'Map', K, K>
```

Added in v2.10.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <K, A>(E: Eq<K>, S: Semigroup<A>) => Semigroup<Map<K, A>>
```

Added in v2.11.0

## getMonoid

Gets `Monoid` instance for Maps given `Semigroup` instance for their values

**Signature**

```ts
export declare function getMonoid<K, A>(SK: Eq<K>, SA: Semigroup<A>): Monoid<Map<K, A>>
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare const getShow: <K, A>(SK: Show<K>, SA: Show<A>) => Show<Map<K, A>>
```

Added in v2.0.0

## getTraversableWithIndex

**Signature**

```ts
export declare const getTraversableWithIndex: <K>(O: Ord<K>) => TraversableWithIndex2C<'Map', K, K>
```

Added in v2.10.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <K, A>(E: Eq<K>, S: Semigroup<A>) => Monoid<Map<K, A>>
```

Added in v2.11.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <K, A>(E: Eq<K>, S: Semigroup<A>) => Semigroup<Map<K, A>>
```

Added in v2.11.0

## getWitherable

**Signature**

```ts
export declare function getWitherable<K>(O: Ord<K>): Witherable2C<URI, K> & TraversableWithIndex2C<URI, K, K>
```

Added in v2.0.0

## ~~map\_~~

Use [`Filterable`](#filterable) instead.

**Signature**

```ts
export declare const map_: Filterable2<'Map'>
```

Added in v2.0.0

# utils

## collect

**Signature**

```ts
export declare function collect<K>(O: Ord<K>): <A, B>(f: (k: K, a: A) => B) => (m: Map<K, A>) => Array<B>
```

Added in v2.0.0

## difference

**Signature**

```ts
export declare const difference: <K>(E: Eq<K>) => <A>(_second: Map<K, A>) => (first: Map<K, A>) => Map<K, A>
```

Added in v2.11.0

## elem

Test whether or not a value is a member of a map

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => { (a: A): <K>(m: Map<K, A>) => boolean; <K>(a: A, m: Map<K, A>): boolean }
```

Added in v2.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: <K>(O: Ord<K>) => <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (m: Map<K, A>) => M
```

Added in v2.11.0

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <K>(
  O: Ord<K>
) => <M>(M: Monoid<M>) => <A>(f: (k: K, a: A) => M) => (m: Map<K, A>) => M
```

Added in v2.11.0

## intersection

**Signature**

```ts
export declare const intersection: <K, A>(
  E: Eq<K>,
  M: Magma<A>
) => (second: Map<K, A>) => (first: Map<K, A>) => Map<K, A>
```

Added in v2.11.0

## isEmpty

Test whether or not a map is empty

**Signature**

```ts
export declare const isEmpty: <K, A>(m: Map<K, A>) => boolean
```

Added in v2.0.0

## isSubmap

Test whether or not one `Map` contains all of the keys and values contained in another `Map`

**Signature**

```ts
export declare const isSubmap: <K, A>(
  SK: Eq<K>,
  SA: Eq<A>
) => { (that: Map<K, A>): (me: Map<K, A>) => boolean; (me: Map<K, A>, that: Map<K, A>): boolean }
```

Added in v2.0.0

## keys

Get a sorted `Array` of the keys contained in a `Map`.

**Signature**

```ts
export declare const keys: <K>(O: Ord<K>) => <A>(m: Map<K, A>) => K[]
```

Added in v2.0.0

## lookup

Lookup the value for a key in a `Map`.

**Signature**

```ts
export declare const lookup: <K>(E: Eq<K>) => {
  (k: K): <A>(m: Map<K, A>) => O.Option<A>
  <A>(k: K, m: Map<K, A>): O.Option<A>
}
```

Added in v2.0.0

## lookupWithKey

Lookup the value for a key in a `Map`.
If the result is a `Some`, the existing key is also returned.

**Signature**

```ts
export declare function lookupWithKey<K>(E: Eq<K>): {
  (k: K): <A>(m: Map<K, A>) => Option<[K, A]>
  <A>(k: K, m: Map<K, A>): Option<[K, A]>
}
```

Added in v2.0.0

## member

Test whether or not a key exists in a map

**Signature**

```ts
export declare const member: <K>(E: Eq<K>) => { (k: K): <A>(m: Map<K, A>) => boolean; <A>(k: K, m: Map<K, A>): boolean }
```

Added in v2.0.0

## modifyAt

**Signature**

```ts
export declare const modifyAt: <K>(E: Eq<K>) => <A>(k: K, f: (a: A) => A) => (m: Map<K, A>) => O.Option<Map<K, A>>
```

Added in v2.0.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export declare function pop<K>(E: Eq<K>): (k: K) => <A>(m: Map<K, A>) => Option<[A, Map<K, A>]>
```

Added in v2.0.0

## reduce

**Signature**

```ts
export declare const reduce: <K>(O: Ord<K>) => <B, A>(b: B, f: (b: B, a: A) => B) => (m: Map<K, A>) => B
```

Added in v2.11.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <K>(O: Ord<K>) => <B, A>(b: B, f: (a: A, b: B) => B) => (m: Map<K, A>) => B
```

Added in v2.11.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <K>(
  O: Ord<K>
) => <B, A>(b: B, f: (k: K, a: A, b: B) => B) => (m: Map<K, A>) => B
```

Added in v2.11.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <K>(O: Ord<K>) => <B, A>(b: B, f: (k: K, b: B, a: A) => B) => (m: Map<K, A>) => B
```

Added in v2.11.0

## singleton

Create a map with one key/value pair

**Signature**

```ts
export declare const singleton: <K, A>(k: K, a: A) => Map<K, A>
```

Added in v2.0.0

## size

Calculate the number of key/value pairs in a map

**Signature**

```ts
export declare const size: <K, A>(m: Map<K, A>) => number
```

Added in v2.0.0

## toArray

Get a sorted `Array` of the key/value pairs contained in a `Map`.

**Signature**

```ts
export declare function toArray<K>(O: Ord<K>): <A>(m: Map<K, A>) => Array<[K, A]>
```

Added in v2.0.0

## toUnfoldable

Unfolds a map into a list of key/value pairs

**Signature**

```ts
export declare function toUnfoldable<K, F extends URIS>(
  ord: Ord<K>,
  U: Unfoldable1<F>
): <A>(d: Map<K, A>) => Kind<F, [K, A]>
export declare function toUnfoldable<K, F>(ord: Ord<K>, U: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>
```

Added in v2.0.0

## union

**Signature**

```ts
export declare const union: <K, A>(E: Eq<K>, M: Magma<A>) => (second: Map<K, A>) => (first: Map<K, A>) => Map<K, A>
```

Added in v2.11.0

## updateAt

**Signature**

```ts
export declare const updateAt: <K>(E: Eq<K>) => <A>(k: K, a: A) => (m: Map<K, A>) => O.Option<Map<K, A>>
```

Added in v2.0.0

## values

Get a sorted `Array` of the values contained in a `Map`.

**Signature**

```ts
export declare const values: <A>(O: Ord<A>) => <K>(m: Map<K, A>) => A[]
```

Added in v2.0.0

## ~~empty~~

Use a `new Map()` instead.

**Signature**

```ts
export declare const empty: Map<never, never>
```

Added in v2.0.0
