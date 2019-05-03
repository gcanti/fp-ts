---
title: Record.ts
nav_order: 70
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [empty (constant)](#empty-constant)
- [record (constant)](#record-constant)
- [collect (function)](#collect-function)
- [elem (function)](#elem-function)
- [every (function)](#every-function)
- [filter (function)](#filter-function)
- [filterMapWithIndex (function)](#filtermapwithindex-function)
- [filterWithIndex (function)](#filterwithindex-function)
- [foldMapWithIndex (function)](#foldmapwithindex-function)
- [fromFoldable (function)](#fromfoldable-function)
- [fromFoldableMap (function)](#fromfoldablemap-function)
- [getEq (function)](#geteq-function)
- [getMonoid (function)](#getmonoid-function)
- [getShow (function)](#getshow-function)
- [insert (function)](#insert-function)
- [isEmpty (function)](#isempty-function)
- [isSubrecord (function)](#issubrecord-function)
- [keys (function)](#keys-function)
- [lookup (function)](#lookup-function)
- [map (function)](#map-function)
- [mapWithIndex (function)](#mapwithindex-function)
- [partitionMapWithIndex (function)](#partitionmapwithindex-function)
- [partitionWithIndex (function)](#partitionwithindex-function)
- [pop (function)](#pop-function)
- [reduceRightWithIndex (function)](#reducerightwithindex-function)
- [reduceWithIndex (function)](#reducewithindex-function)
- [remove (function)](#remove-function)
- [sequence (function)](#sequence-function)
- [singleton (function)](#singleton-function)
- [size (function)](#size-function)
- [some (function)](#some-function)
- [toArray (function)](#toarray-function)
- [toUnfoldable (function)](#tounfoldable-function)
- [traverse (function)](#traverse-function)
- [traverseWithIndex (function)](#traversewithindex-function)

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
export const empty: Record<string, never> = ...
```

Added in v2.0.0

# record (constant)

**Signature**

```ts
export const record: FunctorWithIndex1<URI, string> &
  Foldable1<URI> &
  TraversableWithIndex1<URI, string> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, string> &
  Witherable1<URI> &
  FoldableWithIndex1<URI, string> = ...
```

Added in v2.0.0

# collect (function)

**Signature**

```ts
export function collect<K extends string, A, B>(r: Record<K, A>, f: (k: K, a: A) => B): Array<B> { ... }
```

Added in v2.0.0

# elem (function)

**Signature**

```ts
export function elem<A>(E: Eq<A>): (a: A, fa: Record<string, A>) => boolean { ... }
```

Added in v2.0.0

# every (function)

**Signature**

```ts
export function every<A>(fa: Record<string, A>, predicate: (a: A) => boolean): boolean { ... }
```

Added in v2.0.0

# filter (function)

**Signature**

```ts
export function filter<A, B extends A>(fa: Record<string, A>, p: Refinement<A, B>): Record<string, B>
export function filter<A>(fa: Record<string, A>, p: Predicate<A>): Record<string, A> { ... }
```

Added in v2.0.0

# filterMapWithIndex (function)

**Signature**

```ts
export function filterMapWithIndex<K extends string, A, B>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Option<B>
): Record<string, B>
export function filterMapWithIndex<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B> { ... }
```

Added in v2.0.0

# filterWithIndex (function)

**Signature**

```ts
export function filterWithIndex<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Record<string, A>
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A> { ... }
```

Added in v2.0.0

# foldMapWithIndex (function)

**Signature**

```ts
export function foldMapWithIndex<M>(M: Monoid<M>): <K extends string, A>(fa: Record<K, A>, f: (k: K, a: A) => M) => M { ... }
```

Added in v2.0.0

# fromFoldable (function)

Create a record from a foldable collection of key/value pairs, using the
specified `Magma` to combine values for duplicate keys.

**Signature**

```ts
export function fromFoldable<F extends URIS3, A>(
  M: Magma<A>,
  F: Foldable3<F>
): <K extends string, U, L>(fka: Type3<F, U, L, [K, A]>) => Record<K, A>
export function fromFoldable<F extends URIS2, A>(
  M: Magma<A>,
  F: Foldable2<F>
): <K extends string, L>(fka: Type2<F, L, [K, A]>) => Record<K, A>
export function fromFoldable<F extends URIS, A>(
  M: Magma<A>,
  F: Foldable1<F>
): <K extends string>(fka: Type<F, [K, A]>) => Record<K, A>
export function fromFoldable<F, A>(M: Magma<A>, F: Foldable<F>): <K extends string>(fka: HKT<F, [K, A]>) => Record<K, A> { ... }
```

Added in v2.0.0

# fromFoldableMap (function)

Create a record from a foldable collection using the specified functions to

- map to key/value pairs
- combine values for duplicate keys.

**Signature**

```ts
export function fromFoldableMap<F extends URIS3, B>(
  M: Magma<B>,
  F: Foldable3<F>
): <U, L, A, K extends string>(fa: Type3<F, U, L, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <L, A, K extends string>(fa: Type2<F, L, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A, K extends string>(fa: Type<F, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: Foldable<F>
): <A, K extends string>(fa: HKT<F, A>, f: (a: A) => [K, B]) => Record<K, B> { ... }
```

**Example**

```ts
import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
import { array, zip } from 'fp-ts/lib/Array'
import { identity } from 'fp-ts/lib/function'
import { fromFoldableMap } from 'fp-ts/lib/Record'

// like lodash `zipObject` or ramda `zipObj`
export const zipObject = <K extends string, A>(keys: Array<K>, values: Array<A>): Record<K, A> =>
  fromFoldableMap(getLastSemigroup<A>(), array)(zip(keys, values), identity)

assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

// build a record from a field
interface User {
  id: string
  name: string
}

const users: Array<User> = [{ id: 'id1', name: 'name1' }, { id: 'id2', name: 'name2' }, { id: 'id1', name: 'name3' }]

assert.deepStrictEqual(fromFoldableMap(getLastSemigroup<User>(), array)(users, user => [user.id, user]), {
  id1: { id: 'id1', name: 'name3' },
  id2: { id: 'id2', name: 'name2' }
})
```

Added in v2.0.0

# getEq (function)

**Signature**

```ts
export function getEq<K extends string, A>(E: Eq<A>): Eq<Record<K, A>> { ... }
```

Added in v2.0.0

# getMonoid (function)

Returns a `Semigroup` instance for records given a `Semigroup` instance for their values

**Signature**

```ts
export function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<Record<K, A>> { ... }
```

**Example**

```ts
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { getMonoid } from 'fp-ts/lib/Record'

const M = getMonoid(semigroupSum)
assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export const getShow = <A>(S: Show<A>): Show<Record<string, A>> => ...
```

Added in v2.0.0

# insert (function)

Insert or replace a key/value pair in a map

**Signature**

```ts
export function insert<KS extends string, K extends string, A>(k: K, a: A, d: Record<KS, A>): Record<KS | K, A> { ... }
```

Added in v2.0.0

# isEmpty (function)

Test whether a record is empty

**Signature**

```ts
export const isEmpty = (r: Record<string, unknown>): boolean => ...
```

Added in v2.0.0

# isSubrecord (function)

Test whether one record contains all of the keys and values contained in another record

**Signature**

```ts
export const isSubrecord = <A>(E: Eq<A>) => (d1: Record<string, A>, d2: Record<string, A>): boolean => ...
```

Added in v2.0.0

# keys (function)

**Signature**

```ts
export function keys<K extends string>(r: Record<K, unknown>): Array<K> { ... }
```

Added in v2.0.0

# lookup (function)

Lookup the value for a key in a record

**Signature**

```ts
export const lookup = <A>(key: string, fa: Record<string, A>): Option<A> => ...
```

Added in v2.0.0

# map (function)

**Signature**

```ts
export function map<K extends string, A, B>(fa: Record<K, A>, f: (a: A) => B): Record<K, B> { ... }
```

Added in v2.0.0

# mapWithIndex (function)

**Signature**

```ts
export function mapWithIndex<K extends string, A, B>(fa: Record<K, A>, f: (k: K, a: A) => B): Record<K, B> { ... }
```

Added in v2.0.0

# partitionMapWithIndex (function)

**Signature**

```ts
export function partitionMapWithIndex<K extends string, RL, RR, A>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithIndex<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> { ... }
```

Added in v2.0.0

# partitionWithIndex (function)

**Signature**

```ts
export function partitionWithIndex<K extends string, A>(
  fa: Record<K, A>,
  p: (key: K, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithIndex<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>> { ... }
```

Added in v2.0.0

# pop (function)

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export function pop<K extends string, KS extends string, A>(
  k: K,
  d: Record<KS, A>
): Option<[A, Record<Exclude<KS, K>, A>]> { ... }
```

Added in v2.0.0

# reduceRightWithIndex (function)

**Signature**

```ts
export function reduceRightWithIndex<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, a: A, b: B) => B): B { ... }
```

Added in v2.0.0

# reduceWithIndex (function)

**Signature**

```ts
export function reduceWithIndex<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, b: B, a: A) => B): B { ... }
```

Added in v2.0.0

# remove (function)

Delete a key and value from a map

**Signature**

```ts
export function remove<K extends string, KS extends string, A>(
  k: K,
  d: Record<KS, A>
): Record<string extends K ? string : Exclude<KS, K>, A> { ... }
```

Added in v2.0.0

# sequence (function)

**Signature**

```ts
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, U, L, A>(ta: Record<K, Type3<F, U, L, A>>) => Type3<F, U, L, Record<K, A>>
export function sequence<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <K extends string, A>(ta: Record<K, Type3<F, U, L, A>>) => Type3<F, U, L, Record<K, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, L, A>(ta: Record<K, Type2<F, L, A>>) => Type2<F, L, Record<K, A>>
export function sequence<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <K extends string, A>(ta: Record<K, Type2<F, L, A>>) => Type2<F, L, Record<K, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A>(ta: Record<K, Type<F, A>>) => Type<F, Record<K, A>>
export function sequence<F>(F: Applicative<F>): <K extends string, A>(ta: Record<K, HKT<F, A>>) => HKT<F, Record<K, A>> { ... }
```

Added in v2.0.0

# singleton (function)

Create a record with one key/value pair

**Signature**

```ts
export const singleton = <K extends string, A>(k: K, a: A): Record<K, A> => ...
```

Added in v2.0.0

# size (function)

Calculate the number of key/value pairs in a record

**Signature**

```ts
export const size = (r: Record<string, unknown>): number => ...
```

Added in v2.0.0

# some (function)

**Signature**

```ts
export function some<A>(fa: Record<string, A>, predicate: (a: A) => boolean): boolean { ... }
```

Added in v2.0.0

# toArray (function)

**Signature**

```ts
export function toArray<K extends string, A>(d: Record<K, A>): Array<[K, A]> { ... }
```

Added in v2.0.0

# toUnfoldable (function)

Unfolds a record into a list of key/value pairs

**Signature**

```ts
export function toUnfoldable<F extends URIS>(
  unfoldable: Unfoldable1<F>
): <K extends string, A>(d: Record<K, A>) => Type<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <K extends string, A>(d: Record<K, A>) => HKT<F, [K, A]> { ... }
```

Added in v2.0.0

# traverse (function)

**Signature**

```ts
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, U, L, A, B>(ta: Record<K, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<K, B>>
export function traverse<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <K extends string, A, B>(ta: Record<K, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<K, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, L, A, B>(ta: Record<K, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<K, B>>
export function traverse<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <K extends string, A, B>(ta: Record<K, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<K, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(ta: Record<K, A>, f: (a: A) => Type<F, B>) => Type<F, Record<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <K extends string, A, B>(ta: Record<K, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<K, B>> { ... }
```

Added in v2.0.0

# traverseWithIndex (function)

**Signature**

```ts
export function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, U, L, A, B>(
  ta: Record<K, A>,
  f: (k: K, a: A) => Type3<F, U, L, B>
) => Type3<F, U, L, Record<K, B>>
export function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, L, A, B>(ta: Record<K, A>, f: (k: K, a: A) => Type2<F, L, B>) => Type2<F, L, Record<K, B>>
export function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(ta: Record<K, A>, f: (k: K, a: A) => Type<F, B>) => Type<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(ta: Record<K, A>, f: (k: K, a: A) => HKT<F, B>) => HKT<F, Record<K, B>> { ... }
```

Added in v2.0.0
