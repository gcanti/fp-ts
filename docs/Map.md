---
id: Map
title: Module Map
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts)

## empty

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L159-L159)

```ts
export const empty = ...
```

Added in v1.14.0

## collect

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L48-L58)

```ts
export function collect<K, A, B>(d: Map<K, A>, f: (k: K, a: A) => B): Array<B>  { ... }
```

Added in v1.14.0

## compact

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L330-L340)

```ts
export const compact = <K, A>(fa: Map<K, Option<A>>): Map<K, A> => { ... }
```

Added in v1.14.0

## filter

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L152-L154)

```ts
export function filter<K, A>(fa: Map<K, A>, p: Predicate<A>): Map<K, A>  { ... }
```

Added in v1.14.0

## filterMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L451-L453)

```ts
export const filterMap = <K, A, B>(fa: Map<K, A>, f: (a: A) => Option<B>): Map<K, B> => { ... }
```

Added in v1.14.0

## filterMapWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L513-L523)

```ts
export function filterMapWithIndex<K, A, B>(fa: Map<K, A>, f: (key: K, a: A) => Option<B>): Map<K, B>  { ... }
```

Added in v1.14.0

## filterWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L528-L538)

```ts
export function filterWithIndex<K, A>(fa: Map<K, A>, p: (key: K, a: A) => boolean): Map<K, A>  { ... }
```

Added in v1.14.0

## foldMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L190-L193)

```ts
export const foldMap = <M>(M: Monoid<M>): (<K, A>(fa: Map<K, A>, f: (a: A) => M) => M) => { ... }
```

Added in v1.14.0

## foldMapWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L219-L228)

```ts
export const foldMapWithKey = <M>(M: Monoid<M>) => <K, A>(fa: Map<K, A>, f: (k: K, a: A) => M): M => { ... }
```

Added in v1.14.0

## foldr

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L198-L200)

```ts
export const foldr = <K, A, B>(fa: Map<K, A>, b: B, f: (a: A, b: B) => B): B => { ... }
```

Added in v1.14.0

## foldrWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L233-L242)

```ts
export function foldrWithKey<K, A, B>(fa: Map<K, A>, b: B, f: (k: K, a: A, b: B) => B): B  { ... }
```

Added in v1.14.0

## fromFoldable

Create a Map from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L558-L565)

```ts
export function fromFoldable<F>(F: Foldable<F>): <K, A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Map<K, A>  { ... }
```

Added in v1.14.0

## getMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L136-L138)

```ts
export const getMonoid = <K, A>(S: Semigroup<A>): Monoid<Map<K, A>> => { ... }
```

Added in v1.14.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L129-L132)

```ts
export const getSetoid = <K, A>(S: Setoid<A>): Setoid<Map<K, A>> => { ... }
```

Added in v1.14.0

## insert

Insert or replace a key/value pair in a Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L84-L88)

```ts
export function insert<K, A>(k: K, a: A, d: Map<K, A>): Map<K, A>  { ... }
```

Added in v1.14.0

## isEmpty

Test whether a Map is empty

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L27-L29)

```ts
export const isEmpty = <K, A>(d: Map<K, A>): boolean => { ... }
```

Added in v1.14.0

## isSubmap

Test whether one Map contains all of the keys and values contained in another Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L117-L124)

```ts
export const isSubmap = <K, A>(S: Setoid<A>) => (d1: Map<K, A>, d2: Map<K, A>): boolean => { ... }
```

Added in v1.14.0

## keys

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L34-L36)

```ts
export const keys = <K, A>(d: Map<K, A>): Array<K> => { ... }
```

Added in v1.14.0

## lookup

Lookup the value for a key in a Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L144-L146)

```ts
export const lookup = <K, A>(key: K, fa: Map<K, A>): Option<A> => { ... }
```

Added in v1.14.0

## map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L176-L178)

```ts
export function map<K, A, B>(fa: Map<K, A>, f: (a: A) => B): Map<K, B>  { ... }
```

Added in v1.14.0

## mapWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L164-L171)

```ts
export function mapWithKey<K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => B): Map<K, B>  { ... }
```

Added in v1.14.0

## partition

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L355-L357)

```ts
export const partition = <K, A>(fa: Map<K, A>, p: Predicate<A>): Separated<Map<K, A>, Map<K, A>> => { ... }
```

Added in v1.14.0

## partitionMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L345-L350)

```ts
export const partitionMap = <K, RL, RR, A>(
  fa: Map<K, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Map<K, RL>, Map<K, RR>> => { ... }
```

Added in v1.14.0

## partitionMapWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L466-L485)

```ts
export function partitionMapWithIndex<K, RL, RR, A>(
  fa: Map<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Map<K, RL>, Map<K, RR>>  { ... }
```

Added in v1.14.0

## partitionWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L492-L508)

```ts
export function partitionWithIndex<K, A>(fa: Map<K, A>, p: (key: K, a: A) => boolean): Separated<Map<K, A>, Map<K, A>>  { ... }
```

Added in v1.14.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L107-L110)

```ts
export const pop = <K, A>(k: K, d: Map<K, A>): Option<[A, Map<K, A>]> => { ... }
```

Added in v1.14.0

## reduce

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L183-L185)

```ts
export const reduce = <K, A, B>(fa: Map<K, A>, b: B, f: (b: B, a: A) => B): B => { ... }
```

Added in v1.14.0

## reduceWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L205-L214)

```ts
export function reduceWithKey<K, A, B>(fa: Map<K, A>, b: B, f: (k: K, b: B, a: A) => B): B  { ... }
```

Added in v1.14.0

## remove

Delete a key and value from a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L96-L100)

```ts
export function remove<K, A>(k: K, d: Map<K, A>): Map<K, A>  { ... }
```

Added in v1.14.0

## separate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L362-L378)

```ts
export const separate = <K, RL, RR>(fa: Map<K, Either<RL, RR>>): Separated<Map<K, RL>, Map<K, RR>> => { ... }
```

Added in v1.14.0

## sequence

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L322-L325)

```ts
export function sequence<F>(F: Applicative<F>): <K, A>(ta: Map<K, HKT<F, A>>) => HKT<F, Map<K, A>>  { ... }
```

Added in v1.14.0

## singleton

Create a Map with one key/value pair

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L249-L251)

```ts
export const singleton = <K, A>(k: K, a: A): Map<K, A> => { ... }
```

Added in v1.14.0

## size

Calculate the number of key/value pairs in a Map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L18-L20)

```ts
export const size = <K, A>(d: Map<K, A>): number => { ... }
```

Added in v1.14.0

## toArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L63-L65)

```ts
export function toArray<K, A>(d: Map<K, A>): Array<[K, A]>  { ... }
```

Added in v1.14.0

## toUnfoldable

Unfolds a Map into a list of key/value pairs

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L72-L76)

```ts
export const toUnfoldable = <F>(unfoldable: Unfoldable<F>) => <K, A>(d: Map<K, A>): HKT<F, [K, A]> => { ... }
```

Added in v1.14.0

## traverse

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L300-L303)

```ts
export function traverse<F>(F: Applicative<F>): <K, A, B>(ta: Map<K, A>, f: (a: A) => HKT<F, B>) => HKT<F, Map<K, B>>  { ... }
```

Added in v1.14.0

## traverseWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L268-L279)

```ts
export function traverseWithKey<F>(
  F: Applicative<F>
): <K, A, B>(ta: Map<K, A>, f: (k: K, a: A) => HKT<F, B>) => HKT<F, Map<K, B>>  { ... }
```

Added in v1.14.0

## unsafeLookup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L41-L43)

```ts
export const unsafeLookup = <K, A>(k: K, d: Map<K, A>): A => { ... }
```

Added in v1.14.0

## wilt

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L441-L446)

```ts
export function wilt<F>(
  F: Applicative<F>
): (<K, RL, RR, A>(wa: Map<K, A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<Map<K, RL>, Map<K, RR>>>)  { ... }
```

Added in v1.14.0

## wither

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Map.ts#L401-L406)

```ts
export function wither<F>(
  F: Applicative<F>
): (<K, A, B>(wa: Map<K, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Map<K, B>>)  { ... }
```

Added in v1.14.0
