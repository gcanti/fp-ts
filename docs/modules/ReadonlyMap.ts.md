---
title: ReadonlyMap.ts
nav_order: 75
parent: Modules
---

## ReadonlyMap overview

Added in v2.5.0

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
  - [insertAt](#insertat)
  - [partitionMapWithIndex](#partitionmapwithindex)
  - [partitionWithIndex](#partitionwithindex)
- [constructors](#constructors)
  - [fromFoldable](#fromfoldable)
  - [fromMap](#frommap)
  - [singleton](#singleton)
- [destructors](#destructors)
  - [toMap](#tomap)
  - [toReadonlyArray](#toreadonlyarray)
  - [toUnfoldable](#tounfoldable)
- [instances](#instances)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [Functor](#functor-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getEq](#geteq)
  - [getFilterableWithIndex](#getfilterablewithindex)
  - [getFoldable](#getfoldable)
  - [getFoldableWithIndex](#getfoldablewithindex)
  - [getFunctorWithIndex](#getfunctorwithindex)
  - [getMonoid](#getmonoid)
  - [getShow](#getshow)
  - [getTraversable](#gettraversable)
  - [getTraversableWithIndex](#gettraversablewithindex)
  - [getWitherable](#getwitherable)
  - [~~readonlyMap~~](#readonlymap)
- [utils](#utils)
  - [collect](#collect)
  - [elem](#elem)
  - [empty](#empty)
  - [isEmpty](#isempty)
  - [isSubmap](#issubmap)
  - [keys](#keys)
  - [lookup](#lookup)
  - [lookupWithKey](#lookupwithkey)
  - [member](#member)
  - [modifyAt](#modifyat)
  - [pop](#pop)
  - [size](#size)
  - [updateAt](#updateat)
  - [values](#values)

---

# Compactable

## compact

**Signature**

```ts
export declare const compact: <K, A>(fa: ReadonlyMap<K, O.Option<A>>) => ReadonlyMap<K, A>
```

Added in v2.5.0

## separate

**Signature**

```ts
export declare const separate: <K, A, B>(
  fa: ReadonlyMap<K, Either<A, B>>
) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>>
```

Added in v2.5.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
  <A>(predicate: Predicate<A>): <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
}
```

Added in v2.5.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v2.5.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): <K>(
    fa: ReadonlyMap<K, A>
  ) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, B>>
  <A>(predicate: Predicate<A>): <K>(fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, A>>
}
```

Added in v2.5.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => <K>(fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>>
```

Added in v2.5.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v2.5.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <K, A, B>(f: (k: K, a: A) => B) => (fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v2.7.1

# combinators

## deleteAt

Delete a key and value from a map

**Signature**

```ts
export declare function deleteAt<K>(E: Eq<K>): (k: K) => <A>(m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

Added in v2.5.0

## filterMapWithIndex

**Signature**

```ts
export declare const filterMapWithIndex: <K, A, B>(
  f: (k: K, a: A) => O.Option<B>
) => (fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v2.10.0

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: <K, A>(p: (k: K, a: A) => boolean) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

Added in v2.10.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: ReadonlyMap<E, (a: A) => B>) => ReadonlyMap<E, B>
```

Added in v2.10.0

## insertAt

Insert or replace a key/value pair in a map

**Signature**

```ts
export declare function insertAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

Added in v2.5.0

## partitionMapWithIndex

**Signature**

```ts
export declare const partitionMapWithIndex: <K, A, B, C>(
  f: (k: K, a: A) => Either<B, C>
) => (fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, B>, ReadonlyMap<K, C>>
```

Added in v2.10.0

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: <K, A>(
  p: (k: K, a: A) => boolean
) => (fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, A>>
```

Added in v2.10.0

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
): <R, E>(fka: Kind3<F, R, E, readonly [K, A]>) => ReadonlyMap<K, A>
export declare function fromFoldable<F extends URIS2, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable2<F>
): <E>(fka: Kind2<F, E, readonly [K, A]>) => ReadonlyMap<K, A>
export declare function fromFoldable<F extends URIS, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Kind<F, readonly [K, A]>) => ReadonlyMap<K, A>
export declare function fromFoldable<F, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable<F>
): (fka: HKT<F, readonly [K, A]>) => ReadonlyMap<K, A>
```

Added in v2.5.0

## fromMap

**Signature**

```ts
export declare function fromMap<K, A>(m: Map<K, A>): ReadonlyMap<K, A>
```

Added in v2.5.0

## singleton

Create a map with one key/value pair

**Signature**

```ts
export declare function singleton<K, A>(k: K, a: A): ReadonlyMap<K, A>
```

Added in v2.5.0

# destructors

## toMap

**Signature**

```ts
export declare function toMap<K, A>(m: ReadonlyMap<K, A>): Map<K, A>
```

Added in v2.5.0

## toReadonlyArray

Get a sorted of the key/value pairs contained in a map

**Signature**

```ts
export declare function toReadonlyArray<K>(O: Ord<K>): <A>(m: ReadonlyMap<K, A>) => ReadonlyArray<readonly [K, A]>
```

Added in v2.5.0

## toUnfoldable

Unfolds a map into a list of key/value pairs

**Signature**

```ts
export declare function toUnfoldable<K, F extends URIS>(
  ord: Ord<K>,
  U: Unfoldable1<F>
): <A>(d: ReadonlyMap<K, A>) => Kind<F, readonly [K, A]>
export declare function toUnfoldable<K, F>(
  ord: Ord<K>,
  U: Unfoldable<F>
): <A>(d: ReadonlyMap<K, A>) => HKT<F, readonly [K, A]>
```

Added in v2.5.0

# instances

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable2<'ReadonlyMap'>
```

Added in v2.7.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable2<'ReadonlyMap'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReadonlyMap'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'ReadonlyMap'
```

Added in v2.5.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

## getEq

**Signature**

```ts
export declare function getEq<K, A>(SK: Eq<K>, SA: Eq<A>): Eq<ReadonlyMap<K, A>>
```

Added in v2.5.0

## getFilterableWithIndex

**Signature**

```ts
export declare function getFilterableWithIndex<K = never>(): FilterableWithIndex2C<URI, K, K>
```

Added in v2.5.0

## getFoldable

**Signature**

```ts
export declare const getFoldable: <K>(O: Ord<K>) => Foldable2C<'ReadonlyMap', K>
```

Added in v2.10.0

## getFoldableWithIndex

**Signature**

```ts
export declare const getFoldableWithIndex: <K>(O: Ord<K>) => FoldableWithIndex2C<'ReadonlyMap', K, K>
```

Added in v2.10.0

## getFunctorWithIndex

**Signature**

```ts
export declare const getFunctorWithIndex: <K = never>() => FunctorWithIndex2C<'ReadonlyMap', K, K>
```

Added in v2.10.0

## getMonoid

Gets `Monoid` instance for Maps given `Semigroup` instance for their values

**Signature**

```ts
export declare function getMonoid<K, A>(SK: Eq<K>, SA: Semigroup<A>): Monoid<ReadonlyMap<K, A>>
```

Added in v2.5.0

## getShow

**Signature**

```ts
export declare function getShow<K, A>(SK: Show<K>, SA: Show<A>): Show<ReadonlyMap<K, A>>
```

Added in v2.5.0

## getTraversable

**Signature**

```ts
export declare const getTraversable: <K>(O: Ord<K>) => Traversable2C<'ReadonlyMap', K>
```

Added in v2.10.0

## getTraversableWithIndex

**Signature**

```ts
export declare const getTraversableWithIndex: <K>(O: Ord<K>) => TraversableWithIndex2C<'ReadonlyMap', K, K>
```

Added in v2.10.0

## getWitherable

**Signature**

```ts
export declare function getWitherable<K>(O: Ord<K>): Witherable2C<URI, K> & TraversableWithIndex2C<URI, K, K>
```

Added in v2.5.0

## ~~readonlyMap~~

Use small, specific instances instead.

**Signature**

```ts
export declare const readonlyMap: Filterable2<'ReadonlyMap'>
```

Added in v2.5.0

# utils

## collect

**Signature**

```ts
export declare function collect<K>(
  O: Ord<K>
): <A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => ReadonlyArray<B>
```

Added in v2.5.0

## elem

Test whether or not a value is a member of a map

**Signature**

```ts
export declare function elem<A>(
  E: Eq<A>
): {
  (a: A): <K>(m: ReadonlyMap<K, A>) => boolean
  <K>(a: A, m: ReadonlyMap<K, A>): boolean
}
```

Added in v2.5.0

## empty

**Signature**

```ts
export declare const empty: ReadonlyMap<never, never>
```

Added in v2.5.0

## isEmpty

Test whether or not a map is empty

**Signature**

```ts
export declare function isEmpty<K, A>(d: ReadonlyMap<K, A>): boolean
```

Added in v2.5.0

## isSubmap

Test whether or not one `Map` contains all of the keys and values contained in another `Map`

**Signature**

```ts
export declare function isSubmap<K, A>(
  SK: Eq<K>,
  SA: Eq<A>
): {
  (that: ReadonlyMap<K, A>): (me: ReadonlyMap<K, A>) => boolean
  (me: ReadonlyMap<K, A>, that: ReadonlyMap<K, A>): boolean
}
```

Added in v2.5.0

## keys

Get a sorted array of the keys contained in a map

**Signature**

```ts
export declare function keys<K>(O: Ord<K>): <A>(m: ReadonlyMap<K, A>) => ReadonlyArray<K>
```

Added in v2.5.0

## lookup

Lookup the value for a key in a `Map`.

**Signature**

```ts
export declare function lookup<K>(
  E: Eq<K>
): {
  (k: K): <A>(m: ReadonlyMap<K, A>) => Option<A>
  <A>(k: K, m: ReadonlyMap<K, A>): Option<A>
}
```

Added in v2.5.0

## lookupWithKey

Lookup the value for a key in a `Map`.
If the result is a `Some`, the existing key is also returned.

**Signature**

```ts
export declare function lookupWithKey<K>(
  E: Eq<K>
): {
  (k: K): <A>(m: ReadonlyMap<K, A>) => Option<readonly [K, A]>
  <A>(k: K, m: ReadonlyMap<K, A>): Option<readonly [K, A]>
}
```

Added in v2.5.0

## member

Test whether or not a key exists in a map

**Signature**

```ts
export declare function member<K>(
  E: Eq<K>
): {
  (k: K): <A>(m: ReadonlyMap<K, A>) => boolean
  <A>(k: K, m: ReadonlyMap<K, A>): boolean
}
```

Added in v2.5.0

## modifyAt

**Signature**

```ts
export declare function modifyAt<K>(
  E: Eq<K>
): <A>(k: K, f: (a: A) => A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>
```

Added in v2.5.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export declare function pop<K>(E: Eq<K>): (k: K) => <A>(m: ReadonlyMap<K, A>) => Option<readonly [A, ReadonlyMap<K, A>]>
```

Added in v2.5.0

## size

Calculate the number of key/value pairs in a map

**Signature**

```ts
export declare function size<K, A>(d: ReadonlyMap<K, A>): number
```

Added in v2.5.0

## updateAt

**Signature**

```ts
export declare function updateAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>>
```

Added in v2.5.0

## values

Get a sorted array of the values contained in a map

**Signature**

```ts
export declare function values<A>(O: Ord<A>): <K>(m: ReadonlyMap<K, A>) => ReadonlyArray<A>
```

Added in v2.5.0
