---
title: Map.ts
nav_order: 53
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [empty (constant)](#empty-constant)
- [map (constant)](#map-constant)
- [collect (function)](#collect-function)
- [elem (function)](#elem-function)
- [fromFoldable (function)](#fromfoldable-function)
- [getFilterableWithIndex (function)](#getfilterablewithindex-function)
- [getMonoid (function)](#getmonoid-function)
- [getSetoid (function)](#getsetoid-function)
- [getShow (function)](#getshow-function)
- [getTraversableWithIndex (function)](#gettraversablewithindex-function)
- [getWitherable (function)](#getwitherable-function)
- [insert (function)](#insert-function)
- [isEmpty (function)](#isempty-function)
- [isSubmap (function)](#issubmap-function)
- [keys (function)](#keys-function)
- [lookup (function)](#lookup-function)
- [lookupWithKey (function)](#lookupwithkey-function)
- [member (function)](#member-function)
- [pop (function)](#pop-function)
- [remove (function)](#remove-function)
- [singleton (function)](#singleton-function)
- [size (function)](#size-function)
- [toArray (function)](#toarray-function)
- [toUnfoldable (function)](#tounfoldable-function)
- [values (function)](#values-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# empty (constant)

**Signature**

```ts
export const empty = ...
```

Added in v1.14.0

# map (constant)

**Signature**

```ts
export const map: Filterable2<URI> = ...
```

Added in v1.14.0

# collect (function)

**Signature**

```ts
export const collect = <K>(O: Ord<K>): (<A, B>(m: Map<K, A>, f: (k: K, a: A) => B) => Array<B>) => ...
```

Added in v1.14.0

# elem (function)

Test whether or not a value is a member of a map

**Signature**

```ts
export const elem = <A>(S: Setoid<A>) => <K>(a: A, m: Map<K, A>): boolean => ...
```

Added in v1.14.0

# fromFoldable (function)

Create a map from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature**

```ts
export function fromFoldable<K, F extends URIS3>(
  S: Setoid<K>,
  F: Foldable2v3<F>
): <U, L, A>(ta: Type3<F, U, L, [K, A]>, onConflict: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F extends URIS2>(
  S: Setoid<K>,
  F: Foldable2v2<F>
): <L, A>(ta: Type2<F, L, [K, A]>, onConflict: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F extends URIS>(
  S: Setoid<K>,
  F: Foldable2v1<F>
): <A>(ta: Type<F, [K, A]>, onConflict: (existing: A, a: A) => A) => Map<K, A>
export function fromFoldable<K, F>(
  S: Setoid<K>,
  F: Foldable2v<F>
): <A>(ta: HKT<F, [K, A]>, onConflict: (existing: A, a: A) => A) => Map<K, A> { ... }
```

Added in v1.14.0

# getFilterableWithIndex (function)

**Signature**

```ts
export const getFilterableWithIndex = <K>(): FilterableWithIndex2C<URI, K, K> => ...
```

Added in v1.14.0

# getMonoid (function)

Gets `Monoid` instance for Maps given `Semigroup` instance for their values

**Signature**

```ts
export const getMonoid = <K, A>(SK: Setoid<K>, SA: Semigroup<A>): Monoid<Map<K, A>> => ...
```

Added in v1.14.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <K, A>(SK: Setoid<K>, SA: Setoid<A>): Setoid<Map<K, A>> => ...
```

Added in v1.14.0

# getShow (function)

**Signature**

```ts
export const getShow = <K, A>(SK: Show<K>, SA: Show<A>): Show<Map<K, A>> => ...
```

Added in v1.17.0

# getTraversableWithIndex (function)

**Signature**

```ts
export const getTraversableWithIndex = <K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K> => ...
```

Added in v1.14.0

# getWitherable (function)

**Signature**

```ts
export const getWitherable = <K>(O: Ord<K>): Witherable2C<URI, K> => ...
```

Added in v1.14.0

# insert (function)

Insert or replace a key/value pair in a map

**Signature**

```ts
export const insert = <K>(S: Setoid<K>): (<A>(k: K, a: A, m: Map<K, A>) => Map<K, A>) => ...
```

Added in v1.14.0

# isEmpty (function)

Test whether or not a map is empty

**Signature**

```ts
export const isEmpty = <K, A>(d: Map<K, A>): boolean => ...
```

Added in v1.14.0

# isSubmap (function)

Test whether or not one Map contains all of the keys and values contained in another Map

**Signature**

```ts
export const isSubmap = <K, A>(SK: Setoid<K>, SA: Setoid<A>): ((d1: Map<K, A>, d2: Map<K, A>) => boolean) => ...
```

Added in v1.14.0

# keys (function)

Get a sorted array of the keys contained in a map

**Signature**

```ts
export const keys = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<K>) => m => ...
```

Added in v1.14.0

# lookup (function)

Lookup the value for a key in a `Map`.

**Signature**

```ts
export const lookup = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<A>) => ...
```

Added in v1.14.0

# lookupWithKey (function)

Lookup the value for a key in a `Map`.
If the result is a `Some`, the existing key is also returned.

**Signature**

```ts
export const lookupWithKey = <K>(S: Setoid<K>) => <A>(k: K, m: Map<K, A>): Option<[K, A]> => ...
```

Added in v1.14.0

# member (function)

Test whether or not a key exists in a map

**Signature**

```ts
export const member = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => boolean) => ...
```

Added in v1.14.0

# pop (function)

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export const pop = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<[A, Map<K, A>]>) => ...
```

Added in v1.14.0

# remove (function)

Delete a key and value from a map

**Signature**

```ts
export const remove = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Map<K, A>) => ...
```

Added in v1.14.0

# singleton (function)

Create a map with one key/value pair

**Signature**

```ts
export const singleton = <K, A>(k: K, a: A): Map<K, A> => ...
```

Added in v1.14.0

# size (function)

Calculate the number of key/value pairs in a map

**Signature**

```ts
export const size = <K, A>(d: Map<K, A>): number => ...
```

Added in v1.14.0

# toArray (function)

Get a sorted of the key/value pairs contained in a map

**Signature**

```ts
export const toArray = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<[K, A]>) => ...
```

Added in v1.14.0

# toUnfoldable (function)

Unfolds a map into a list of key/value pairs

**Signature**

```ts
export function toUnfoldable<K, F extends URIS>(
  O: Ord<K>,
  unfoldable: Unfoldable1<F>
): <A>(d: Map<K, A>) => Type<F, [K, A]>
export function toUnfoldable<K, F>(O: Ord<K>, unfoldable: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]> { ... }
```

Added in v1.14.0

# values (function)

Get a sorted array of the values contained in a map

**Signature**

```ts
export const values = <A>(O: Ord<A>): (<K>(m: Map<K, A>) => Array<A>) => m => ...
```

Added in v1.14.0
