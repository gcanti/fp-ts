---
title: Map.ts
nav_order: 52
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [URI](#uri)
- [URI](#uri-1)
- [empty](#empty)
- [map](#map)
- [collect](#collect)
- [elem](#elem)
- [fromFoldable](#fromfoldable)
- [getFilterableWithIndex](#getfilterablewithindex)
- [getMonoid](#getmonoid)
- [getSetoid](#getsetoid)
- [getTraversableWithIndex](#gettraversablewithindex)
- [getWitherable](#getwitherable)
- [insert](#insert)
- [isEmpty](#isempty)
- [isSubmap](#issubmap)
- [keys](#keys)
- [lookup](#lookup)
- [lookupWithKey](#lookupwithkey)
- [member](#member)
- [pop](#pop)
- [remove](#remove)
- [singleton](#singleton)
- [size](#size)
- [toArray](#toarray)
- [toUnfoldable](#tounfoldable)
- [values](#values)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# empty

**Signature** (constant)

```ts
export const empty = ...
```

Added in v1.14.0

# map

**Signature** (constant)

```ts
export const map: Filterable2<URI> = ...
```

Added in v1.14.0

# collect

**Signature** (function)

```ts
export const collect = <K>(O: Ord<K>): (<A, B>(m: Map<K, A>, f: (k: K, a: A) => B) => Array<B>) => ...
```

Added in v1.14.0

# elem

Test whether or not a value is a member of a map

**Signature** (function)

```ts
export const elem = <A>(S: Setoid<A>) => <K>(a: A, m: Map<K, A>): boolean => ...
```

Added in v1.14.0

# fromFoldable

Create a map from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function)

```ts
export function fromFoldable<K, F extends URIS3>(
  S: Setoid<K>,
  F: Foldable2v3<F>
): <U, L, A>(ta: Type3<F, U, L, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F extends URIS2>(
  S: Setoid<K>,
  F: Foldable2v2<F>
): <L, A>(ta: Type2<F, L, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F extends URIS>(
  S: Setoid<K>,
  F: Foldable2v1<F>
): <A>(ta: Type<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F>(
  S: Setoid<K>,
  F: Foldable2v<F>
): <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F>(
  S: Setoid<K>,
  F: Foldable2v<F>
): <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A> { ... }
```

Added in v1.14.0

# getFilterableWithIndex

**Signature** (function)

```ts
export const getFilterableWithIndex = <K>(): FilterableWithIndex2C<URI, K, K> => ...
```

Added in v1.14.0

# getMonoid

Gets `Monoid` instance for Maps given `Semigroup` instance for their values

**Signature** (function)

```ts
export const getMonoid = <K, A>(SK: Setoid<K>, SA: Semigroup<A>): Monoid<Map<K, A>> => ...
```

Added in v1.14.0

# getSetoid

**Signature** (function)

```ts
export const getSetoid = <K, A>(SK: Setoid<K>, SA: Setoid<A>): Setoid<Map<K, A>> => ...
```

Added in v1.14.0

# getTraversableWithIndex

**Signature** (function)

```ts
export const getTraversableWithIndex = <K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K> => ...
```

Added in v1.14.0

# getWitherable

**Signature** (function)

```ts
export const getWitherable = <K>(O: Ord<K>): Witherable2C<URI, K> => ...
```

Added in v1.14.0

# insert

Insert or replace a key/value pair in a map

**Signature** (function)

```ts
export const insert = <K>(S: Setoid<K>): (<A>(k: K, a: A, m: Map<K, A>) => Map<K, A>) => ...
```

Added in v1.14.0

# isEmpty

Test whether or not a map is empty

**Signature** (function)

```ts
export const isEmpty = <K, A>(d: Map<K, A>): boolean => ...
```

Added in v1.14.0

# isSubmap

Test whether or not one Map contains all of the keys and values contained in another Map

**Signature** (function)

```ts
export const isSubmap = <K, A>(SK: Setoid<K>, SA: Setoid<A>): ((d1: Map<K, A>, d2: Map<K, A>) => boolean) => ...
```

Added in v1.14.0

# keys

Get a sorted array of the keys contained in a map

**Signature** (function)

```ts
export const keys = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<K>) => m => ...
```

Added in v1.14.0

# lookup

Lookup the value for a key in a `Map`.

**Signature** (function)

```ts
export const lookup = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<A>) => ...
```

Added in v1.14.0

# lookupWithKey

Lookup the value for a key in a `Map`.
If the result is a `Some`, the existing key is also returned.

**Signature** (function)

```ts
export const lookupWithKey = <K>(S: Setoid<K>) => <A>(k: K, m: Map<K, A>): Option<[K, A]> => ...
```

Added in v1.14.0

# member

Test whether or not a key exists in a map

**Signature** (function)

```ts
export const member = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => boolean) => ...
```

Added in v1.14.0

# pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function)

```ts
export const pop = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<[A, Map<K, A>]>) => ...
```

Added in v1.14.0

# remove

Delete a key and value from a map

**Signature** (function)

```ts
export const remove = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Map<K, A>) => ...
```

Added in v1.14.0

# singleton

Create a map with one key/value pair

**Signature** (function)

```ts
export const singleton = <K, A>(k: K, a: A): Map<K, A> => ...
```

Added in v1.14.0

# size

Calculate the number of key/value pairs in a map

**Signature** (function)

```ts
export const size = <K, A>(d: Map<K, A>): number => ...
```

Added in v1.14.0

# toArray

Get a sorted of the key/value pairs contained in a map

**Signature** (function)

```ts
export const toArray = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<[K, A]>) => ...
```

Added in v1.14.0

# toUnfoldable

Unfolds a map into a list of key/value pairs

**Signature** (function)

```ts
export function toUnfoldable<K, F extends URIS>(
  O: Ord<K>,
  unfoldable: Unfoldable1<F>
): <A>(d: Map<K, A>) => Type<F, [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, unfoldable: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, unfoldable: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]> { ... }
```

Added in v1.14.0

# values

Get a sorted array of the values contained in a map

**Signature** (function)

```ts
export const values = <A>(O: Ord<A>): (<K>(m: Map<K, A>) => Array<A>) => m => ...
```

Added in v1.14.0
