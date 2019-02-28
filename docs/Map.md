---
id: Map
title: Map
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts)

## empty

**Signature** (constant)

```ts
export const empty = ...
```

Added in v1.14.0

## map

**Signature** (constant)

```ts
export const map: Filterable2<URI> = ...
```

Added in v1.14.0

## collect

**Signature** (function)

```ts
export const collect = <K>(O: Ord<K>): (<A, B>(m: Map<K, A>, f: (k: K, a: A) => B) => Array<B>) => { ... }
```

Added in v1.14.0

## elem

Test whether or not a value is a member of a map

**Signature** (function)

```ts
export const elem = <A>(S: Setoid<A>) => <K>(a: A, m: Map<K, A>): boolean => { ... }
```

Added in v1.14.0

## fromFoldable

Create a map from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function)

```ts
export function fromFoldable<K, F>(
  S: Setoid<K>,
  F: Foldable2v<F>
): <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>  { ... }
```

Added in v1.14.0

## getFilterableWithIndex

**Signature** (function)

```ts
export const getFilterableWithIndex = <K>(): FilterableWithIndex2C<URI, K, K> => { ... }
```

Added in v1.14.0

## getMonoid

Gets [Monoid](./Monoid.md) instance for Maps given [Semigroup](./Semigroup.md) instance for their values

**Signature** (function)

```ts
export const getMonoid = <K, A>(SK: Setoid<K>, SA: Semigroup<A>): Monoid<Map<K, A>> => { ... }
```

Added in v1.14.0

## getSetoid

**Signature** (function)

```ts
export const getSetoid = <K, A>(SK: Setoid<K>, SA: Setoid<A>): Setoid<Map<K, A>> => { ... }
```

Added in v1.14.0

## getTraversableWithIndex

**Signature** (function)

```ts
export const getTraversableWithIndex = <K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K> => { ... }
```

Added in v1.14.0

## getWitherable

**Signature** (function)

```ts
export const getWitherable = <K>(O: Ord<K>): Witherable2C<URI, K> => { ... }
```

Added in v1.14.0

## insert

Insert or replace a key/value pair in a map

**Signature** (function)

```ts
export const insert = <K>(S: Setoid<K>): (<A>(k: K, a: A, m: Map<K, A>) => Map<K, A>) => { ... }
```

Added in v1.14.0

## isEmpty

Test whether or not a map is empty

**Signature** (function)

```ts
export const isEmpty = <K, A>(d: Map<K, A>): boolean => { ... }
```

Added in v1.14.0

## isSubmap

Test whether or not one Map contains all of the keys and values contained in another Map

**Signature** (function)

```ts
export const isSubmap = <K, A>(SK: Setoid<K>, SA: Setoid<A>): ((d1: Map<K, A>, d2: Map<K, A>) => boolean) => { ... }
```

Added in v1.14.0

## keys

Get a sorted array of the keys contained in a map

**Signature** (function)

```ts
export const keys = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<K>) => m => { ... }
```

Added in v1.14.0

## lookup

Lookup the value for a key in a `Map`.

**Signature** (function)

```ts
export const lookup = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<A>) => { ... }
```

Added in v1.14.0

## lookupWithKey

Lookup the value for a key in a `Map`.
If the result is a `Some`, the existing key is also returned.

**Signature** (function)

```ts
export const lookupWithKey = <K>(S: Setoid<K>) => <A>(k: K, m: Map<K, A>): Option<[K, A]> => { ... }
```

Added in v1.14.0

## member

Test whether or not a key exists in a map

**Signature** (function)

```ts
export const member = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => boolean) => { ... }
```

Added in v1.14.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function)

```ts
export const pop = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<[A, Map<K, A>]>) => { ... }
```

Added in v1.14.0

## remove

Delete a key and value from a map

**Signature** (function)

```ts
export const remove = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Map<K, A>) => { ... }
```

Added in v1.14.0

## singleton

Create a map with one key/value pair

**Signature** (function)

```ts
export const singleton = <K, A>(k: K, a: A): Map<K, A> => { ... }
```

Added in v1.14.0

## size

Calculate the number of key/value pairs in a map

**Signature** (function)

```ts
export const size = <K, A>(d: Map<K, A>): number => { ... }
```

Added in v1.14.0

## toArray

Get a sorted of the key/value pairs contained in a map

**Signature** (function)

```ts
export const toArray = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<[K, A]>) => { ... }
```

Added in v1.14.0

## toUnfoldable

Unfolds a map into a list of key/value pairs

**Signature** (function)

```ts
export function toUnfoldable<K, F>(O: Ord<K>, unfoldable: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>  { ... }
```

Added in v1.14.0

## values

Get a sorted array of the values contained in a map

**Signature** (function)

```ts
export const values = <A>(O: Ord<A>): (<K>(m: Map<K, A>) => Array<A>) => m => { ... }
```

Added in v1.14.0
