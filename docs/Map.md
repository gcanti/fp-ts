---
id: Map
title: Module Map
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts)

## empty

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L315-L315)

```ts
export const empty = ...
```

Added in v1.14.0

## map

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L814-L819)

```ts
export const map: Filterable2<URI> = ...
```

Added in v1.14.0

## collect

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L170-L180)

```ts
export const collect = <K>(O: Ord<K>): (<A, B>(m: Map<K, A>, f: (k: K, a: A) => B) => Array<B>) => { ... }
```

Added in v1.14.0

## elemKey

Find the key of the first occurence of a value in a Map equal to the specified value

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L61-L73)

```ts
export const elemKey = <A>(S: Setoid<A>): (<K>(a: A, m: Map<K, A>) => Option<K>) => { ... }
```

Added in v1.14.0

## fromFoldable

Create a Map from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L677-L693)

```ts
export function fromFoldable<K, F>(
  S: Setoid<K>,
  F: Foldable2v<F>
): <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>  { ... }
```

Added in v1.14.0

## getFilterableWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L763-L772)

```ts
export const getFilterableWithIndex = <K>(): FilterableWithIndex2C<URI, K, K> => { ... }
```

Added in v1.14.0

## getMonoid

Gets [Monoid](./Monoid.md) instance for Maps given [Semigroup](./Semigroup.md) instance for their values

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L330-L350)

```ts
export const getMonoid = <K, A>(SK: Setoid<K>, SA: Semigroup<A>): Monoid<Map<K, A>> => { ... }
```

Added in v1.14.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L320-L323)

```ts
export const getSetoid = <K, A>(SK: Setoid<K>, SA: Setoid<A>): Setoid<Map<K, A>> => { ... }
```

Added in v1.14.0

## getTraversableWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L802-L809)

```ts
export const getTraversableWithIndex = <K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K> => { ... }
```

Added in v1.14.0

## getWitherable

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L790-L797)

```ts
export const getWitherable = <K>(O: Ord<K>): Witherable2C<URI, K> => { ... }
```

Added in v1.14.0

## has

Test whether or not a key exists in a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L51-L54)

```ts
export const has = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => boolean) => { ... }
```

Added in v1.14.0

## insert

Insert or replace a key/value pair in a Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L214-L229)

```ts
export const insert = <K>(S: Setoid<K>): (<A>(k: K, a: A, m: Map<K, A>) => Map<K, A>) => { ... }
```

Added in v1.14.0

## isEmpty

Test whether or not a Map is empty

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L44-L44)

```ts
export const isEmpty = <K, A>(d: Map<K, A>): boolean => { ... }
```

Added in v1.14.0

## isMember

Test whether or not a value is a member of a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L80-L91)

```ts
export const isMember = <A>(S: Setoid<A>): (<K>(a: A, m: Map<K, A>) => boolean) => { ... }
```

Added in v1.14.0

## isSubmap

Test whether or not one Map contains all of the keys and values contained in another Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L296-L310)

```ts
export const isSubmap = <K, A>(SK: Setoid<K>, SA: Setoid<A>): ((d1: Map<K, A>, d2: Map<K, A>) => boolean) => { ... }
```

Added in v1.14.0

## keys

Get a sorted Array of the values contained in a Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L98-L98)

```ts
export const keys = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<K>) => m => { ... }
```

Added in v1.14.0

## keysSet

Get a Set of the keys contained in a Map (does not sort keys)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L105-L128)

```ts
export const keysSet = <K>(S: Setoid<K>): (<A>(m: Map<K, A>) => Set<K>) => { ... }
```

Added in v1.14.0

## lookup

Lookup the value for a key in a `Map`.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L286-L289)

```ts
export const lookup = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<A>) => { ... }
```

Added in v1.14.0

## lookupWithKey

Lookup the value for a key in a `Map`.
If the result is a `Some`, the existing key is also returned.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L267-L279)

```ts
export const lookupWithKey = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<[K, A]>) => { ... }
```

Added in v1.14.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L254-L259)

```ts
export const pop = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<[A, Map<K, A>]>) => { ... }
```

Added in v1.14.0

## remove

Delete a key and value from a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L236-L247)

```ts
export const remove = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Map<K, A>) => { ... }
```

Added in v1.14.0

## singleton

Create a Map with one key/value pair

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L456-L458)

```ts
export const singleton = <K, A>(k: K, a: A): Map<K, A> => { ... }
```

Added in v1.14.0

## size

Calculate the number of key/value pairs in a Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L37-L37)

```ts
export const size = <K, A>(d: Map<K, A>): number => { ... }
```

Added in v1.14.0

## toArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L185-L188)

```ts
export const toArray = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<[K, A]>) => { ... }
```

Added in v1.14.0

## toUnfoldable

Unfolds a Map into a list of key/value pairs

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L200-L207)

```ts
export function toUnfoldable<K, F>(O: Ord<K>, unfoldable: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>  { ... }
```

Added in v1.14.0

## values

Get a sorted Array of the values contained in a Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L135-L135)

```ts
export const values = <A>(O: Ord<A>): (<K>(m: Map<K, A>) => Array<A>) => m => { ... }
```

Added in v1.14.0

## valuesSet

Get a Set of the values contained in a Map (does not sort values)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L142-L165)

```ts
export const valuesSet = <A>(S: Setoid<A>): (<K>(m: Map<K, A>) => Set<A>) => { ... }
```

Added in v1.14.0
