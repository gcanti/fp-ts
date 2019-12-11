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
- [URI (constant)](#uri-constant)
- [empty (constant)](#empty-constant)
- [map\_ (constant)](#map_-constant)
- [collect (function)](#collect-function)
- [deleteAt (function)](#deleteat-function)
- [elem (function)](#elem-function)
- [fromFoldable (function)](#fromfoldable-function)
- [getEq (function)](#geteq-function)
- [getFilterableWithIndex (function)](#getfilterablewithindex-function)
- [getMonoid (function)](#getmonoid-function)
- [getShow (function)](#getshow-function)
- [getWitherable (function)](#getwitherable-function)
- [insertAt (function)](#insertat-function)
- [isEmpty (function)](#isempty-function)
- [isSubmap (function)](#issubmap-function)
- [keys (function)](#keys-function)
- [lookup (function)](#lookup-function)
- [lookupWithKey (function)](#lookupwithkey-function)
- [member (function)](#member-function)
- [modifyAt (function)](#modifyat-function)
- [pop (function)](#pop-function)
- [singleton (function)](#singleton-function)
- [size (function)](#size-function)
- [toArray (function)](#toarray-function)
- [toUnfoldable (function)](#tounfoldable-function)
- [updateAt (function)](#updateat-function)
- [values (function)](#values-function)
- [compact (export)](#compact-export)
- [filter (export)](#filter-export)
- [filterMap (export)](#filtermap-export)
- [map (export)](#map-export)
- [partition (export)](#partition-export)
- [partitionMap (export)](#partitionmap-export)
- [separate (export)](#separate-export)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI (constant)

**Signature**

```ts
export const URI: "Map" = ...
```

Added in v2.0.0

# empty (constant)

**Signature**

```ts
export const empty: Map<never, never> = ...
```

Added in v2.0.0

# map\_ (constant)

**Signature**

```ts
export const map_: Filterable2<URI> = ...
```

Added in v2.0.0

# collect (function)

**Signature**

```ts
export function collect<K>(O: Ord<K>): <A, B>(f: (k: K, a: A) => B) => (m: Map<K, A>) => Array<B> { ... }
```

Added in v2.0.0

# deleteAt (function)

Delete a key and value from a map

**Signature**

```ts
export function deleteAt<K>(E: Eq<K>): (k: K) => <A>(m: Map<K, A>) => Map<K, A> { ... }
```

Added in v2.0.0

# elem (function)

Test whether or not a value is a member of a map

**Signature**

```ts
export function elem<A>(E: Eq<A>): <K>(a: A, m: Map<K, A>) => boolean { ... }
```

Added in v2.0.0

# fromFoldable (function)

Create a map from a foldable collection of key/value pairs, using the
specified `Magma` to combine values for duplicate keys.

**Signature**

```ts
export function fromFoldable<F extends URIS3, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable3<F>
): <R, E>(fka: Kind3<F, R, E, [K, A]>) => Map<K, A>
export function fromFoldable<F extends URIS2, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable2<F>
): <E>(fka: Kind2<F, E, [K, A]>) => Map<K, A>
export function fromFoldable<F extends URIS, K, A>(
  E: Eq<K>,
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Kind<F, [K, A]>) => Map<K, A>
export function fromFoldable<F, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable<F>): (fka: HKT<F, [K, A]>) => Map<K, A> { ... }
```

Added in v2.0.0

# getEq (function)

**Signature**

```ts
export function getEq<K, A>(SK: Eq<K>, SA: Eq<A>): Eq<Map<K, A>> { ... }
```

Added in v2.0.0

# getFilterableWithIndex (function)

**Signature**

```ts
export function getFilterableWithIndex<K = never>(): FilterableWithIndex2C<URI, K, K> { ... }
```

Added in v2.0.0

# getMonoid (function)

Gets `Monoid` instance for Maps given `Semigroup` instance for their values

**Signature**

```ts
export function getMonoid<K, A>(SK: Eq<K>, SA: Semigroup<A>): Monoid<Map<K, A>> { ... }
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export function getShow<K, A>(SK: Show<K>, SA: Show<A>): Show<Map<K, A>> { ... }
```

Added in v2.0.0

# getWitherable (function)

**Signature**

```ts
export function getWitherable<K>(O: Ord<K>): Witherable2C<URI, K> & TraversableWithIndex2C<URI, K, K> { ... }
```

Added in v2.0.0

# insertAt (function)

Insert or replace a key/value pair in a map

**Signature**

```ts
export function insertAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: Map<K, A>) => Map<K, A> { ... }
```

Added in v2.0.0

# isEmpty (function)

Test whether or not a map is empty

**Signature**

```ts
export function isEmpty<K, A>(d: Map<K, A>): boolean { ... }
```

Added in v2.0.0

# isSubmap (function)

Test whether or not one Map contains all of the keys and values contained in another Map

**Signature**

```ts
export function isSubmap<K, A>(SK: Eq<K>, SA: Eq<A>): (d1: Map<K, A>, d2: Map<K, A>) => boolean { ... }
```

Added in v2.0.0

# keys (function)

Get a sorted array of the keys contained in a map

**Signature**

```ts
export function keys<K>(O: Ord<K>): <A>(m: Map<K, A>) => Array<K> { ... }
```

Added in v2.0.0

# lookup (function)

Lookup the value for a key in a `Map`.

**Signature**

```ts
export function lookup<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => Option<A> { ... }
```

Added in v2.0.0

# lookupWithKey (function)

Lookup the value for a key in a `Map`.
If the result is a `Some`, the existing key is also returned.

**Signature**

```ts
export function lookupWithKey<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => Option<[K, A]> { ... }
```

Added in v2.0.0

# member (function)

Test whether or not a key exists in a map

**Signature**

```ts
export function member<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => boolean { ... }
```

Added in v2.0.0

# modifyAt (function)

**Signature**

```ts
export function modifyAt<K>(E: Eq<K>): <A>(k: K, f: (a: A) => A) => (m: Map<K, A>) => Option<Map<K, A>> { ... }
```

Added in v2.0.0

# pop (function)

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export function pop<K>(E: Eq<K>): (k: K) => <A>(m: Map<K, A>) => Option<[A, Map<K, A>]> { ... }
```

Added in v2.0.0

# singleton (function)

Create a map with one key/value pair

**Signature**

```ts
export function singleton<K, A>(k: K, a: A): Map<K, A> { ... }
```

Added in v2.0.0

# size (function)

Calculate the number of key/value pairs in a map

**Signature**

```ts
export function size<K, A>(d: Map<K, A>): number { ... }
```

Added in v2.0.0

# toArray (function)

Get a sorted of the key/value pairs contained in a map

**Signature**

```ts
export function toArray<K>(O: Ord<K>): <A>(m: Map<K, A>) => Array<[K, A]> { ... }
```

Added in v2.0.0

# toUnfoldable (function)

Unfolds a map into a list of key/value pairs

**Signature**

```ts
export function toUnfoldable<K, F extends URIS>(O: Ord<K>, U: Unfoldable1<F>): <A>(d: Map<K, A>) => Kind<F, [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, U: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]> { ... }
```

Added in v2.0.0

# updateAt (function)

**Signature**

```ts
export function updateAt<K>(E: Eq<K>): <A>(k: K, a: A) => (m: Map<K, A>) => Option<Map<K, A>> { ... }
```

Added in v2.0.0

# values (function)

Get a sorted array of the values contained in a map

**Signature**

```ts
export function values<A>(O: Ord<A>): <K>(m: Map<K, A>) => Array<A> { ... }
```

Added in v2.0.0

# compact (export)

**Signature**

```ts
<E, A>(fa: Map<E, Option<A>>) => Map<E, A>
```

Added in v2.0.0

# filter (export)

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): <E>(fa: Map<E, A>) => Map<E, B>; <A>(predicate: Predicate<A>): <E>(fa: Map<E, A>) => Map<E, A>; }
```

Added in v2.0.0

# filterMap (export)

**Signature**

```ts
<A, B>(f: (a: A) => Option<B>) => <E>(fa: Map<E, A>) => Map<E, B>
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Map<E, A>) => Map<E, B>
```

Added in v2.0.0

# partition (export)

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): <E>(fa: Map<E, A>) => Separated<Map<E, A>, Map<E, B>>; <A>(predicate: Predicate<A>): <E>(fa: Map<E, A>) => Separated<Map<E, A>, Map<E, A>>; }
```

Added in v2.0.0

# partitionMap (export)

**Signature**

```ts
<A, B, C>(f: (a: A) => Either<B, C>) => <E>(fa: Map<E, A>) => Separated<Map<E, B>, Map<E, C>>
```

Added in v2.0.0

# separate (export)

**Signature**

```ts
<E, A, B>(fa: Map<E, Either<A, B>>) => Separated<Map<E, A>, Map<E, B>>
```

Added in v2.0.0
