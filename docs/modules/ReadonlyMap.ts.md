---
title: ReadonlyMap.ts
nav_order: 70
parent: Modules
---

# ReadonlyMap overview

Added in v2.5.0

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
- [fromMap](#frommap)
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
- [member](#member)
- [modifyAt](#modifyat)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [pop](#pop)
- [readonlyMap](#readonlymap)
- [separate](#separate)
- [singleton](#singleton)
- [size](#size)
- [toMap](#tomap)
- [toReadonlyArray](#toreadonlyarray)
- [toUnfoldable](#tounfoldable)
- [updateAt](#updateat)
- [values](#values)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

# URI

**Signature**

```ts
export const URI: "ReadonlyMap" = ...
```

Added in v2.5.0

# collect

**Signature**

```ts
export function collect<K>(O: Ord<K>): <A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => ReadonlyArray<B> { ... }
```

Added in v2.5.0

# compact

**Signature**

```ts
<E, A>(fa: ReadonlyMap<E, Option<A>>) => ReadonlyMap<E, A>
```

Added in v2.5.0

# deleteAt

Delete a key and value from a map

**Signature**

```ts
export function deleteAt<K>(E: Eq<K>): (k: K) => <A>(m: ReadonlyMap<K, A>) => ReadonlyMap<K, A> { ... }
```

Added in v2.5.0

# elem

Test whether or not a value is a member of a map

**Signature**

```ts
export function elem<A>(E: Eq<A>): <K>(a: A, m: ReadonlyMap<K, A>) => boolean { ... }
```

Added in v2.5.0

# empty

**Signature**

```ts
export const empty: ReadonlyMap<never, never> = ...
```

Added in v2.5.0

# filter

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): <E>(fa: ReadonlyMap<E, A>) => ReadonlyMap<E, B>; <A>(predicate: Predicate<A>): <E>(fa: ReadonlyMap<E, A>) => ReadonlyMap<E, A>; }
```

Added in v2.5.0

# filterMap

**Signature**

```ts
<A, B>(f: (a: A) => Option<B>) => <E>(fa: ReadonlyMap<E, A>) => ReadonlyMap<E, B>
```

Added in v2.5.0

# fromFoldable

Create a map from a foldable collection of key/value pairs, using the
specified `Magma` to combine values for duplicate keys.

**Signature**

```ts
export function fromFoldable<F extends URIS3, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable3<F>
): <R, E>(fka: Kind3<F, R, E, readonly [K, A]>) => ReadonlyMap<K, A>
export function fromFoldable<F extends URIS2, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable2<F>
): <E>(fka: Kind2<F, E, readonly [K, A]>) => ReadonlyMap<K, A>
export function fromFoldable<F extends URIS, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Kind<F, readonly [K, A]>) => ReadonlyMap<K, A>
export function fromFoldable<F, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable<F>
): (fka: HKT<F, readonly [K, A]>) => ReadonlyMap<K, A> { ... }
```

Added in v2.5.0

# fromMap

**Signature**

```ts
export function fromMap<K, A>(m: Map<K, A>): ReadonlyMap<K, A> { ... }
```

Added in v2.5.0

# getEq

**Signature**

```ts
export function getEq<K, A>(SK: Eq<K>, SA: Eq<A>): Eq<ReadonlyMap<K, A>> { ... }
```

Added in v2.5.0

# getFilterableWithIndex

**Signature**

```ts
export function getFilterableWithIndex<K = never>(): FilterableWithIndex2C<URI, K, K> { ... }
```

Added in v2.5.0

# getMonoid

Gets `Monoid` instance for Maps given `Semigroup` instance for their values

**Signature**

```ts
export function getMonoid<K, A>(SK: Eq<K>, SA: Semigroup<A>): Monoid<ReadonlyMap<K, A>> { ... }
```

Added in v2.5.0

# getShow

**Signature**

```ts
export function getShow<K, A>(SK: Show<K>, SA: Show<A>): Show<ReadonlyMap<K, A>> { ... }
```

Added in v2.5.0

# getWitherable

**Signature**

```ts
export function getWitherable<K>(O: Ord<K>): Witherable2C<URI, K> & TraversableWithIndex2C<URI, K, K> { ... }
```

Added in v2.5.0

# insertAt

Insert or replace a key/value pair in a map

**Signature**

```ts
export function insertAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A> { ... }
```

Added in v2.5.0

# isEmpty

Test whether or not a map is empty

**Signature**

```ts
export function isEmpty<K, A>(d: ReadonlyMap<K, A>): boolean { ... }
```

Added in v2.5.0

# isSubmap

Test whether or not one Map contains all of the keys and values contained in another Map

**Signature**

```ts
export function isSubmap<K, A>(SK: Eq<K>, SA: Eq<A>): (d1: ReadonlyMap<K, A>, d2: ReadonlyMap<K, A>) => boolean { ... }
```

Added in v2.5.0

# keys

Get a sorted array of the keys contained in a map

**Signature**

```ts
export function keys<K>(O: Ord<K>): <A>(m: ReadonlyMap<K, A>) => ReadonlyArray<K> { ... }
```

Added in v2.5.0

# lookup

Lookup the value for a key in a `Map`.

**Signature**

```ts
export function lookup<K>(E: Eq<K>): <A>(k: K, m: ReadonlyMap<K, A>) => Option<A> { ... }
```

Added in v2.5.0

# lookupWithKey

Lookup the value for a key in a `Map`.
If the result is a `Some`, the existing key is also returned.

**Signature**

```ts
export function lookupWithKey<K>(E: Eq<K>): <A>(k: K, m: ReadonlyMap<K, A>) => Option<readonly [K, A]> { ... }
```

Added in v2.5.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: ReadonlyMap<E, A>) => ReadonlyMap<E, B>
```

Added in v2.5.0

# member

Test whether or not a key exists in a map

**Signature**

```ts
export function member<K>(E: Eq<K>): <A>(k: K, m: ReadonlyMap<K, A>) => boolean { ... }
```

Added in v2.5.0

# modifyAt

**Signature**

```ts
export function modifyAt<K>(
  E: Eq<K>
): <A>(k: K, f: (a: A) => A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>> { ... }
```

Added in v2.5.0

# partition

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): <E>(fa: ReadonlyMap<E, A>) => Separated<ReadonlyMap<E, A>, ReadonlyMap<E, B>>; <A>(predicate: Predicate<A>): <E>(fa: ReadonlyMap<E, A>) => Separated<ReadonlyMap<E, A>, ReadonlyMap<E, A>>; }
```

Added in v2.5.0

# partitionMap

**Signature**

```ts
<A, B, C>(f: (a: A) => Either<B, C>) => <E>(fa: ReadonlyMap<E, A>) => Separated<ReadonlyMap<E, B>, ReadonlyMap<E, C>>
```

Added in v2.5.0

# pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export function pop<K>(E: Eq<K>): (k: K) => <A>(m: ReadonlyMap<K, A>) => Option<readonly [A, ReadonlyMap<K, A>]> { ... }
```

Added in v2.5.0

# readonlyMap

**Signature**

```ts
export const readonlyMap: Filterable2<URI> = ...
```

Added in v2.5.0

# separate

**Signature**

```ts
<E, A, B>(fa: ReadonlyMap<E, Either<A, B>>) => Separated<ReadonlyMap<E, A>, ReadonlyMap<E, B>>
```

Added in v2.5.0

# singleton

Create a map with one key/value pair

**Signature**

```ts
export function singleton<K, A>(k: K, a: A): ReadonlyMap<K, A> { ... }
```

Added in v2.5.0

# size

Calculate the number of key/value pairs in a map

**Signature**

```ts
export function size<K, A>(d: ReadonlyMap<K, A>): number { ... }
```

Added in v2.5.0

# toMap

**Signature**

```ts
export function toMap<K, A>(m: ReadonlyMap<K, A>): Map<K, A> { ... }
```

Added in v2.5.0

# toReadonlyArray

Get a sorted of the key/value pairs contained in a map

**Signature**

```ts
export function toReadonlyArray<K>(O: Ord<K>): <A>(m: ReadonlyMap<K, A>) => ReadonlyArray<readonly [K, A]> { ... }
```

Added in v2.5.0

# toUnfoldable

Unfolds a map into a list of key/value pairs

**Signature**

```ts
export function toUnfoldable<K, F extends URIS>(
  O: Ord<K>,
  U: Unfoldable1<F>
): <A>(d: ReadonlyMap<K, A>) => Kind<F, readonly [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, U: Unfoldable<F>): <A>(d: ReadonlyMap<K, A>) => HKT<F, readonly [K, A]> { ... }
```

Added in v2.5.0

# updateAt

**Signature**

```ts
export function updateAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => Option<ReadonlyMap<K, A>> { ... }
```

Added in v2.5.0

# values

Get a sorted array of the values contained in a map

**Signature**

```ts
export function values<A>(O: Ord<A>): <K>(m: ReadonlyMap<K, A>) => ReadonlyArray<A> { ... }
```

Added in v2.5.0
