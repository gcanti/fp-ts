---
id: Map
title: Module Map
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts)

## empty

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L223-L223)

```ts
export const empty = ...
```

Added in v1.14.0

## collect

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L75-L89)

```ts
export const collect = <K>(O: Ord<K>): (<A, B>(m: Map<K, A>, f: (k: K, a: A) => B) => Array<B>) => { ... }
```

Added in v1.14.0

## compact

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L446-L457)

```ts
export const compact = <K, A>(fa: Map<K, Option<A>>): Map<K, A> => { ... }
```

Added in v1.14.0

## filter

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L265-L267)

```ts
export function filter<K, A>(fa: Map<K, A>, p: Predicate<A>): Map<K, A>  { ... }
```

Added in v1.14.0

## filterMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L566-L568)

```ts
export const filterMap = <K, A, B>(fa: Map<K, A>, f: (a: A) => Option<B>): Map<K, B> => { ... }
```

Added in v1.14.0

## filterMapWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L624-L636)

```ts
export const filterMapWithIndex = <K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => Option<B>): Map<K, B> => { ... }
```

Added in v1.14.0

## filterWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L641-L652)

```ts
export const filterWithIndex = <K, A>(fa: Map<K, A>, p: (k: K, a: A) => boolean): Map<K, A> => { ... }
```

Added in v1.14.0

## foldMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L298-L299)

```ts
export const foldMap = <M>(M: Monoid<M>): (<K, A>(fa: Map<K, A>, f: (a: A) => M) => M) => (fa, f) =>
  foldMapWithKey(M)(fa, (_, a) => { ... }
```

Added in v1.14.0

## foldMapWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L328-L339)

```ts
export const foldMapWithKey = <M>(M: Monoid<M>): (<K, A>(fa: Map<K, A>, f: (k: K, a: A) => M) => M) => { ... }
```

Added in v1.14.0

## foldr

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L304-L306)

```ts
export const foldr = <K>(O: Ord<K>): (<A, B>(fa: Map<K, A>, b: B, f: (a: A, b: B) => B) => B) => { ... }
```

Added in v1.14.0

## foldrWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L344-L356)

```ts
export const foldrWithKey = <K>(O: Ord<K>): (<A, B>(fa: Map<K, A>, b: B, f: (k: K, a: A, b: B) => B) => B) => { ... }
```

Added in v1.14.0

## fromFoldable

Create a Map from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L677-L689)

```ts
export function fromFoldable<K, F>(
  S: Setoid<K>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>  { ... }
```

Added in v1.14.0

## getMonoid

Gets [Monoid](./Monoid.md) instance for Maps given [Semigroup](./Semigroup.md) instance for their values

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L238-L258)

```ts
export const getMonoid = <K, A>(SK: Setoid<K>, SA: Semigroup<A>): Monoid<Map<K, A>> => { ... }
```

Added in v1.14.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L228-L231)

```ts
export const getSetoid = <K, A>(SK: Setoid<K>, SA: Setoid<A>): Setoid<Map<K, A>> => { ... }
```

Added in v1.14.0

## has

Test whether or not a key exists in a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L34-L37)

```ts
export const has = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => boolean) => { ... }
```

Added in v1.14.0

## insert

Insert or replace a key/value pair in a Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L123-L138)

```ts
export const insert = <K>(S: Setoid<K>): (<A>(k: K, a: A, m: Map<K, A>) => Map<K, A>) => { ... }
```

Added in v1.14.0

## isEmpty

Test whether or not a Map is empty

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L27-L27)

```ts
export const isEmpty = <K, A>(d: Map<K, A>): boolean => { ... }
```

Added in v1.14.0

## isMember

Test whether or not a value is a member of a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L44-L54)

```ts
export const isMember = <A>(SA: Setoid<A>): (<K>(a: A, m: Map<K, A>) => boolean) => { ... }
```

Added in v1.14.0

## isSubmap

Test whether or not one Map contains all of the keys and values contained in another Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L203-L218)

```ts
export const isSubmap = <K, A>(SK: Setoid<K>, SA: Setoid<A>): ((d1: Map<K, A>, d2: Map<K, A>) => boolean) => { ... }
```

Added in v1.14.0

## keys

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L59-L65)

```ts
export const keys = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<K>) => { ... }
```

Added in v1.14.0

## keysSet

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L70-L70)

```ts
export const keysSet = <K, A>(m: Map<K, A>): Set<K> => { ... }
```

Added in v1.14.0

## lookup

Lookup the value for a key in a `Map`.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L193-L196)

```ts
export const lookup = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<A>) => { ... }
```

Added in v1.14.0

## lookupWithKey

Lookup the value for a key in a `Map`.
If the result is a `Some`, the existing key is also returned.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L175-L187)

```ts
export const lookupWithKey = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<[K, A]>) => { ... }
```

Added in v1.14.0

## map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L286-L286)

```ts
export const map = <K, A, B>(fa: Map<K, A>, f: (a: A) => B): Map<K, B> => mapWithKey(fa, (_, a) => { ... }
```

Added in v1.14.0

## mapWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L272-L281)

```ts
export const mapWithKey = <K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => B): Map<K, B> => { ... }
```

Added in v1.14.0

## partition

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L470-L471)

```ts
export const partition = <K, A>(fa: Map<K, A>, p: Predicate<A>): Separated<Map<K, A>, Map<K, A>> =>
  partitionWithIndex(fa, (_, a) => { ... }
```

Added in v1.14.0

## partitionMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L462-L465)

```ts
export const partitionMap = <K, RL, RR, A>(
  fa: Map<K, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Map<K, RL>, Map<K, RR>> => partitionMapWithIndex(fa, (_, a) => { ... }
```

Added in v1.14.0

## partitionMapWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L573-L594)

```ts
export const partitionMapWithIndex = <K, RL, RR, A>(
  fa: Map<K, A>,
  f: (k: K, a: A) => Either<RL, RR>
): Separated<Map<K, RL>, Map<K, RR>> => { ... }
```

Added in v1.14.0

## partitionWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L599-L619)

```ts
export const partitionWithIndex = <K, A>(
  fa: Map<K, A>,
  p: (k: K, a: A) => boolean
): Separated<Map<K, A>, Map<K, A>> => { ... }
```

Added in v1.14.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L163-L168)

```ts
export const pop = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Option<[A, Map<K, A>]>) => { ... }
```

Added in v1.14.0

## reduce

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L291-L293)

```ts
export const reduce = <K>(O: Ord<K>): (<A, B>(fa: Map<K, A>, b: B, f: (b: B, a: A) => B) => B) => { ... }
```

Added in v1.14.0

## reduceWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L311-L323)

```ts
export const reduceWithKey = <K>(O: Ord<K>): (<A, B>(fa: Map<K, A>, b: B, f: (k: K, b: B, a: A) => B) => B) => { ... }
```

Added in v1.14.0

## remove

Delete a key and value from a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L145-L156)

```ts
export const remove = <K>(S: Setoid<K>): (<A>(k: K, m: Map<K, A>) => Map<K, A>) => { ... }
```

Added in v1.14.0

## separate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L476-L493)

```ts
export const separate = <K, RL, RR>(fa: Map<K, Either<RL, RR>>): Separated<Map<K, RL>, Map<K, RR>> => { ... }
```

Added in v1.14.0

## sequence

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L438-L441)

```ts
export function sequence<F>(F: Applicative<F>): <K, A>(ta: Map<K, HKT<F, A>>) => HKT<F, Map<K, A>>  { ... }
```

Added in v1.14.0

## singleton

Create a Map with one key/value pair

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L363-L365)

```ts
export const singleton = <K, A>(k: K, a: A): Map<K, A> => { ... }
```

Added in v1.14.0

## size

Calculate the number of key/value pairs in a Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L20-L20)

```ts
export const size = <K, A>(d: Map<K, A>): number => { ... }
```

Added in v1.14.0

## toArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L94-L97)

```ts
export const toArray = <K>(O: Ord<K>): (<A>(m: Map<K, A>) => Array<[K, A]>) => { ... }
```

Added in v1.14.0

## toUnfoldable

Unfolds a Map into a list of key/value pairs

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L109-L116)

```ts
export function toUnfoldable<K, F>(O: Ord<K>, unfoldable: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>  { ... }
```

Added in v1.14.0

## traverse

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L416-L419)

```ts
export function traverse<F>(F: Applicative<F>): <K, A, B>(ta: Map<K, A>, f: (a: A) => HKT<F, B>) => HKT<F, Map<K, B>>  { ... }
```

Added in v1.14.0

## traverseWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L382-L395)

```ts
export function traverseWithKey<F>(
  F: Applicative<F>
): <K, A, B>(ta: Map<K, A>, f: (k: K, a: A) => HKT<F, B>) => HKT<F, Map<K, B>>  { ... }
```

Added in v1.14.0

## wilt

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L556-L561)

```ts
export function wilt<F>(
  F: Applicative<F>
): (<K, RL, RR, A>(wa: Map<K, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<Map<K, RL>, Map<K, RR>>>)  { ... }
```

Added in v1.14.0

## wither

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L516-L521)

```ts
export function wither<F>(
  F: Applicative<F>
): (<K, A, B>(wa: Map<K, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Map<K, B>>)  { ... }
```

Added in v1.14.0
