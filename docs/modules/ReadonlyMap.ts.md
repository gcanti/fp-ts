---
title: ReadonlyMap.ts
nav_order: 63
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
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [FilterableWithIndex](#filterablewithindex)
  - [filterMapWithIndex](#filtermapwithindex)
  - [filterWithIndex](#filterwithindex)
  - [partitionMapWithIndex](#partitionmapwithindex)
  - [partitionWithIndex](#partitionwithindex)
- [Functor](#functor)
  - [map](#map)
- [combinator](#combinator)
  - [mapWithIndex](#mapwithindex)
- [combinators](#combinators)
  - [deleteAt](#deleteat)
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
  - [size](#size)
  - [toReadonlyArray](#toreadonlyarray)
  - [toUnfoldable](#tounfoldable)
  - [updateAt](#updateat)
  - [values](#values)

---

# Compactable

## compact

**Signature**

```ts
export declare const compact: <E, A>(fa: ReadonlyMap<E, O.Option<A>>) => ReadonlyMap<E, A>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <E, A, B>(
  fa: ReadonlyMap<E, Either<A, B>>
) => Separated<ReadonlyMap<E, A>, ReadonlyMap<E, B>>
```

Added in v3.0.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: Filter2<'ReadonlyMap'>
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => <E>(fa: ReadonlyMap<E, A>) => ReadonlyMap<E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: Partition2<'ReadonlyMap'>
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => <E>(fa: ReadonlyMap<E, A>) => Separated<ReadonlyMap<E, B>, ReadonlyMap<E, C>>
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

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: <K, A>(p: (k: K, a: A) => boolean) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
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

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: <K, A>(
  p: (k: K, a: A) => boolean
) => (fa: ReadonlyMap<K, A>) => Separated<ReadonlyMap<K, A>, ReadonlyMap<K, A>>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: ReadonlyMap<E, A>) => ReadonlyMap<E, B>
```

Added in v3.0.0

# combinator

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <K, A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v3.0.0

# combinators

## deleteAt

Delete the element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const deleteAt: <K>(E: Eq<K>) => (k: K) => <A>(m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
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

Delete a key and value from a `ReadonlyMap`, returning the value as well as the subsequent `ReadonlyMap`.

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

Create a `ReadonlyMap` from a foldable collection of key/value pairs, using the
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
export declare const Compactable: Compactable2<'ReadonlyMap'>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable2<'ReadonlyMap'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReadonlyMap'>
```

Added in v3.0.0

## URI

**Signature**

```ts
export declare const URI: 'ReadonlyMap'
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <K, A>(SK: Eq<K>, SA: Eq<A>) => Eq<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getFilterableWithIndex

**Signature**

```ts
export declare const getFilterableWithIndex: <K = never>() => FilterableWithIndex2C<'ReadonlyMap', K, K>
```

Added in v3.0.0

## getFoldable

**Signature**

```ts
export declare const getFoldable: <K>(O: Ord<K>) => Foldable2C<'ReadonlyMap', K>
```

Added in v3.0.0

## getFoldableWithIndex

**Signature**

```ts
export declare const getFoldableWithIndex: <K>(O: Ord<K>) => FoldableWithIndex2C<'ReadonlyMap', K, K>
```

Added in v3.0.0

## getFunctorWithIndex

**Signature**

```ts
export declare const getFunctorWithIndex: <K = never>() => FunctorWithIndex2C<'ReadonlyMap', K, K>
```

Added in v3.0.0

## getMonoid

Get a `Monoid` instance for `ReadonlyMap` given a `Semigroup` instance for its values.

**Signature**

```ts
export declare const getMonoid: <K, A>(SK: Eq<K>, SA: Semigroup<A>) => Monoid<ReadonlyMap<K, A>>
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
export declare const getTraversable: <K>(O: Ord<K>) => Traversable2C<'ReadonlyMap', K>
```

Added in v3.0.0

## getTraversableWithIndex

**Signature**

```ts
export declare const getTraversableWithIndex: <K>(O: Ord<K>) => TraversableWithIndex2C<'ReadonlyMap', K, K>
```

Added in v3.0.0

## getWitherable

**Signature**

```ts
export declare const getWitherable: <K>(O: Ord<K>) => Witherable2C<'ReadonlyMap', K>
```

Added in v3.0.0

# utils

## collect

**Signature**

```ts
export declare const collect: <K>(O: Ord<K>) => <A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => readonly B[]
```

Added in v3.0.0

## elem

Test whether or not a value is a member of a `ReadonlyMap`.

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => (a: A) => <K>(m: ReadonlyMap<K, A>) => boolean
```

Added in v3.0.0

## empty

An empty `ReadonlyMap`.

**Signature**

```ts
export declare const empty: ReadonlyMap<never, never>
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
  SK: Eq<K>,
  SA: Eq<A>
) => (second: ReadonlyMap<K, A>) => (first: ReadonlyMap<K, A>) => boolean
```

Added in v3.0.0

## keys

Get a sorted array of the keys contained in a `ReadonlyMap`.

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

Unfolds a `ReadonlyMap` into a list of key/value pairs.

**Signature**

```ts
export declare function toUnfoldable<K, F extends URIS>(
  O: Ord<K>,
  U: Unfoldable1<F>
): <A>(d: ReadonlyMap<K, A>) => Kind<F, readonly [K, A]>
export declare function toUnfoldable<K, F>(
  O: Ord<K>,
  U: Unfoldable<F>
): <A>(d: ReadonlyMap<K, A>) => HKT<F, readonly [K, A]>
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

Get a sorted array of the values contained in a `ReadonlyMap`.

**Signature**

```ts
export declare const values: <A>(O: Ord<A>) => <K>(m: ReadonlyMap<K, A>) => readonly A[]
```

Added in v3.0.0
