---
id: Map
title: Module Map
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts)

## empty

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L244-L244)

```ts
export const empty = ...
```

Added in v1.14.0

## map

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L743-L748)

```ts
export const map: Filterable2<URI> = ...
```

Added in v1.14.0

## collect

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L101-L111)

```ts
export const collect = <K>(O: Ord<K>): (<A, B>(m: Map<K, A>, f: (k: K, a: A) => B) => Array<B>) => { ... }
```

Added in v1.14.0

## fromFoldable

Create a Map from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L606-L622)

```ts
export function fromFoldable<K, F>(
  S: Setoid<K>,
  F: Foldable2v<F>
): <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>  { ... }
```

Added in v1.14.0

## getFilterableWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L692-L701)

```ts
export const getFilterableWithIndex = <K>(): FilterableWithIndex2C<URI, K, K> => { ... }
```

Added in v1.14.0

## getMonoid

Gets [Monoid](./Monoid.md) instance for Maps given [Semigroup](./Semigroup.md) instance for their values

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L259-L279)

```ts
export const getMonoid = <K, A>(SK: Setoid<K>, SA: Semigroup<A>): Monoid<Map<K, A>> => { ... }
```

Added in v1.14.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L249-L252)

```ts
export const getSetoid = <K, A>(SK: Setoid<K>, SA: Setoid<A>): Setoid<Map<K, A>> => { ... }
```

Added in v1.14.0

## getTraversableWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L731-L738)

```ts
export const getTraversableWithIndex = <K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K> => { ... }
```

Added in v1.14.0

## getWitherable

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L719-L726)

```ts
export const getWitherable = <K>(O: Ord<K>): Witherable2C<URI, K> => { ... }
```

Added in v1.14.0

## has

Test whether or not a key exists in a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L53-L56)

```ts
export const has = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => boolean) => { ... }
```

Added in v1.14.0

## insert

Insert or replace a key/value pair in a Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L145-L160)

```ts
export const insert = <K>(S: Setoid<K>): (<A>(k: K, a: A, m: Map<K, A>) => Map<K, A>) => { ... }
```

Added in v1.14.0

## isEmpty

Test whether or not a Map is empty

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L46-L46)

```ts
export const isEmpty = <K, A>(d: Map<K, A>): boolean => { ... }
```

Added in v1.14.0

## isMember

Test whether or not a value is a member of a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L63-L74)

```ts
export const isMember = <A>(S: Setoid<A>): (<K>(a: A, m: Map<K, A>) => boolean) => { ... }
```

Added in v1.14.0

## isSubmap

Test whether or not one Map contains all of the keys and values contained in another Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L225-L239)

```ts
export const isSubmap = <K, A>(SK: Setoid<K>, SA: Setoid<A>): ((d1: Map<K, A>, d2: Map<K, A>) => boolean) => { ... }
```

Added in v1.14.0

## keys

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L79-L85)

```ts
export const keys = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<K>) => { ... }
```

Added in v1.14.0

## keysSet

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L90-L96)

```ts
export const keysSet = <K>(S: Setoid<K>): (<A>(m: Map<K, A>) => Set<K>) => { ... }
```

Added in v1.14.0

## lookup

Lookup the value for a key in a `Map`.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L215-L218)

```ts
export const lookup = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<A>) => { ... }
```

Added in v1.14.0

## lookupWithKey

Lookup the value for a key in a `Map`.
If the result is a `Some`, the existing key is also returned.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L197-L209)

```ts
export const lookupWithKey = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<[K, A]>) => { ... }
```

Added in v1.14.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L185-L190)

```ts
export const pop = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<[A, Map<K, A>]>) => { ... }
```

Added in v1.14.0

## remove

Delete a key and value from a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L167-L178)

```ts
export const remove = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Map<K, A>) => { ... }
```

Added in v1.14.0

## singleton

Create a Map with one key/value pair

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L385-L387)

```ts
export const singleton = <K, A>(k: K, a: A): Map<K, A> => { ... }
```

Added in v1.14.0

## size

Calculate the number of key/value pairs in a Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L39-L39)

```ts
export const size = <K, A>(d: Map<K, A>): number => { ... }
```

Added in v1.14.0

## toArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L116-L119)

```ts
export const toArray = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<[K, A]>) => { ... }
```

Added in v1.14.0

## toUnfoldable

Unfolds a Map into a list of key/value pairs

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L131-L138)

```ts
export function toUnfoldable<K, F>(O: Ord<K>, unfoldable: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>  { ... }
```

Added in v1.14.0
