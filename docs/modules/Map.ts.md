---
title: Map.ts
nav_order: 49
parent: Modules
---

# Map overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [collect](#collect)
- [compact](#compact)
- [deleteAt](#deleteat)
- [elem](#elem)
- [empty](#empty)
- [filter](#filter)
- [filterMap](#filtermap)
- [fromFoldable](#fromfoldable)
- [getEq](#geteq)
- [getFilterableWithIndex](#getfilterablewithindex)
- [getMonoid](#getmonoid)
- [getShow](#getshow)
- [getWitherable](#getwitherable)
- [insertAt](#insertat)
- [isEmpty](#isempty)
- [isSubmap](#issubmap)
- [keys](#keys)
- [lookup](#lookup)
- [lookupWithKey](#lookupwithkey)
- [map](#map)
- [map\_](#map_)
- [member](#member)
- [modifyAt](#modifyat)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [pop](#pop)
- [separate](#separate)
- [singleton](#singleton)
- [size](#size)
- [toArray](#toarray)
- [toUnfoldable](#tounfoldable)
- [updateAt](#updateat)
- [values](#values)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export declare const URI: 'Map'
```

Added in v2.0.0

# collect

**Signature**

```ts
export declare const collect: <K>(O: Ord<K>) => <A, B>(f: (k: K, a: A) => B) => (m: Map<K, A>) => B[]
```

Added in v2.0.0

# compact

**Signature**

```ts
export declare const compact: <E, A>(fa: Map<E, Option<A>>) => Map<E, A>
```

Added in v2.0.0

# deleteAt

Delete a key and value from a map

**Signature**

```ts
export declare const deleteAt: <K>(E: Eq<K>) => (k: K) => <A>(m: Map<K, A>) => Map<K, A>
```

Added in v2.0.0

# elem

Test whether or not a value is a member of a map

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => <K>(a: A, m: Map<K, A>) => boolean
```

Added in v2.0.0

# empty

**Signature**

```ts
export declare const empty: Map<never, never>
```

Added in v2.0.0

# filter

**Signature**

```ts
export declare const filter: {
  <A, B>(refinement: Refinement<A, B>): <E>(fa: Map<E, A>) => Map<E, B>
  <A>(predicate: Predicate<A>): <E>(fa: Map<E, A>) => Map<E, A>
}
```

Added in v2.0.0

# filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => <E>(fa: Map<E, A>) => Map<E, B>
```

Added in v2.0.0

# fromFoldable

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

# getEq

**Signature**

```ts
export declare const getEq: <K, A>(SK: Eq<K>, SA: Eq<A>) => Eq<Map<K, A>>
```

Added in v2.0.0

# getFilterableWithIndex

**Signature**

```ts
export declare const getFilterableWithIndex: <K = never>() => FilterableWithIndex2C<'Map', K, K>
```

Added in v2.0.0

# getMonoid

Gets `Monoid` instance for Maps given `Semigroup` instance for their values

**Signature**

```ts
export declare const getMonoid: <K, A>(SK: Eq<K>, SA: Semigroup<A>) => Monoid<Map<K, A>>
```

Added in v2.0.0

# getShow

**Signature**

```ts
export declare const getShow: <K, A>(SK: Show<K>, SA: Show<A>) => Show<Map<K, A>>
```

Added in v2.0.0

# getWitherable

**Signature**

```ts
export declare const getWitherable: <K>(O: Ord<K>) => Witherable2C<'Map', K> & TraversableWithIndex2C<'Map', K, K>
```

Added in v2.0.0

# insertAt

Insert or replace a key/value pair in a map

**Signature**

```ts
export declare const insertAt: <K>(E: Eq<K>) => <A>(k: K, a: A) => (m: Map<K, A>) => Map<K, A>
```

Added in v2.0.0

# isEmpty

Test whether or not a map is empty

**Signature**

```ts
export declare const isEmpty: <K, A>(d: Map<K, A>) => boolean
```

Added in v2.0.0

# isSubmap

Test whether or not one Map contains all of the keys and values contained in another Map

**Signature**

```ts
export declare const isSubmap: <K, A>(SK: Eq<K>, SA: Eq<A>) => (d1: Map<K, A>, d2: Map<K, A>) => boolean
```

Added in v2.0.0

# keys

Get a sorted array of the keys contained in a map

**Signature**

```ts
export declare const keys: <K>(O: Ord<K>) => <A>(m: Map<K, A>) => K[]
```

Added in v2.0.0

# lookup

Lookup the value for a key in a `Map`.

**Signature**

```ts
export declare const lookup: <K>(E: Eq<K>) => <A>(k: K, m: Map<K, A>) => Option<A>
```

Added in v2.0.0

# lookupWithKey

Lookup the value for a key in a `Map`.
If the result is a `Some`, the existing key is also returned.

**Signature**

```ts
export declare const lookupWithKey: <K>(E: Eq<K>) => <A>(k: K, m: Map<K, A>) => Option<[K, A]>
```

Added in v2.0.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Map<E, A>) => Map<E, B>
```

Added in v2.0.0

# map\_

**Signature**

```ts
export declare const map_: Filterable2<'Map'>
```

Added in v2.0.0

# member

Test whether or not a key exists in a map

**Signature**

```ts
export declare const member: <K>(E: Eq<K>) => <A>(k: K, m: Map<K, A>) => boolean
```

Added in v2.0.0

# modifyAt

**Signature**

```ts
export declare const modifyAt: <K>(E: Eq<K>) => <A>(k: K, f: (a: A) => A) => (m: Map<K, A>) => Option<Map<K, A>>
```

Added in v2.0.0

# partition

**Signature**

```ts
export declare const partition: {
  <A, B>(refinement: Refinement<A, B>): <E>(fa: Map<E, A>) => Separated<Map<E, A>, Map<E, B>>
  <A>(predicate: Predicate<A>): <E>(fa: Map<E, A>) => Separated<Map<E, A>, Map<E, A>>
}
```

Added in v2.0.0

# partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => <E>(fa: Map<E, A>) => Separated<Map<E, B>, Map<E, C>>
```

Added in v2.0.0

# pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export declare const pop: <K>(E: Eq<K>) => (k: K) => <A>(m: Map<K, A>) => Option<[A, Map<K, A>]>
```

Added in v2.0.0

# separate

**Signature**

```ts
export declare const separate: <E, A, B>(fa: Map<E, Either<A, B>>) => Separated<Map<E, A>, Map<E, B>>
```

Added in v2.0.0

# singleton

Create a map with one key/value pair

**Signature**

```ts
export declare const singleton: <K, A>(k: K, a: A) => Map<K, A>
```

Added in v2.0.0

# size

Calculate the number of key/value pairs in a map

**Signature**

```ts
export declare const size: <K, A>(d: Map<K, A>) => number
```

Added in v2.0.0

# toArray

Get a sorted of the key/value pairs contained in a map

**Signature**

```ts
export declare const toArray: <K>(O: Ord<K>) => <A>(m: Map<K, A>) => [K, A][]
```

Added in v2.0.0

# toUnfoldable

Unfolds a map into a list of key/value pairs

**Signature**

```ts
export declare function toUnfoldable<K, F extends URIS>(
  O: Ord<K>,
  U: Unfoldable1<F>
): <A>(d: Map<K, A>) => Kind<F, [K, A]>
export declare function toUnfoldable<K, F>(O: Ord<K>, U: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>
```

Added in v2.0.0

# updateAt

**Signature**

```ts
export declare const updateAt: <K>(E: Eq<K>) => <A>(k: K, a: A) => (m: Map<K, A>) => Option<Map<K, A>>
```

Added in v2.0.0

# values

Get a sorted array of the values contained in a map

**Signature**

```ts
export declare const values: <A>(O: Ord<A>) => <K>(m: Map<K, A>) => A[]
```

Added in v2.0.0
