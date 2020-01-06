---
title: Record.ts
nav_order: 69
parent: Modules
---

# Record overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [empty (constant)](#empty-constant)
- [record (constant)](#record-constant)
- [toArray (constant)](#toarray-constant)
- [collect (function)](#collect-function)
- [deleteAt (function)](#deleteat-function)
- [elem (function)](#elem-function)
- [every (function)](#every-function)
- [filterMapWithIndex (function)](#filtermapwithindex-function)
- [filterWithIndex (function)](#filterwithindex-function)
- [foldMapWithIndex (function)](#foldmapwithindex-function)
- [fromFoldable (function)](#fromfoldable-function)
- [fromFoldableMap (function)](#fromfoldablemap-function)
- [getEq (function)](#geteq-function)
- [getMonoid (function)](#getmonoid-function)
- [getShow (function)](#getshow-function)
- [hasOwnProperty (function)](#hasownproperty-function)
- [insertAt (function)](#insertat-function)
- [isEmpty (function)](#isempty-function)
- [isSubrecord (function)](#issubrecord-function)
- [keys (function)](#keys-function)
- [lookup (function)](#lookup-function)
- [map (function)](#map-function)
- [mapWithIndex (function)](#mapwithindex-function)
- [modifyAt (function)](#modifyat-function)
- [partitionMapWithIndex (function)](#partitionmapwithindex-function)
- [partitionWithIndex (function)](#partitionwithindex-function)
- [pop (function)](#pop-function)
- [reduceRightWithIndex (function)](#reducerightwithindex-function)
- [reduceWithIndex (function)](#reducewithindex-function)
- [sequence (function)](#sequence-function)
- [singleton (function)](#singleton-function)
- [size (function)](#size-function)
- [some (function)](#some-function)
- [toUnfoldable (function)](#tounfoldable-function)
- [traverse (function)](#traverse-function)
- [traverseWithIndex (function)](#traversewithindex-function)
- [updateAt (function)](#updateat-function)
- [compact (export)](#compact-export)
- [filter (export)](#filter-export)
- [filterMap (export)](#filtermap-export)
- [foldMap (export)](#foldmap-export)
- [partition (export)](#partition-export)
- [partitionMap (export)](#partitionmap-export)
- [reduce (export)](#reduce-export)
- [reduceRight (export)](#reduceright-export)
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
export const URI: "Record" = ...
```

Added in v2.0.0

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

# toArray (constant)

**Signature**

```ts
export const toArray: <K extends string, A>(r: Record<K, A>) => Array<[K, A]> = ...
```

Added in v2.0.0

# collect (function)

Map a record into an array

**Signature**

```ts
export function collect<K extends string, A, B>(f: (k: K, a: A) => B): (r: Record<K, A>) => Array<B> { ... }
```

**Example**

```ts
import { collect } from 'fp-ts/lib/Record'

const x: { a: string; b: boolean } = { a: 'foo', b: false }
assert.deepStrictEqual(collect((key, val) => ({ key: key, value: val }))(x), [
  { key: 'a', value: 'foo' },
  { key: 'b', value: false }
])
```

Added in v2.0.0

# deleteAt (function)

Delete a key and value from a map

**Signature**

```ts
export function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Record<string extends K ? string : Exclude<KS, K>, A> { ... }
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
export function every<A>(predicate: Predicate<A>): (r: Record<string, A>) => boolean { ... }
```

Added in v2.0.0

# filterMapWithIndex (function)

**Signature**

```ts
export function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: Record<K, A>) => Record<string, B> { ... }
```

Added in v2.0.0

# filterWithIndex (function)

**Signature**

```ts
export function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Record<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Record<string, A> { ... }
```

Added in v2.0.0

# foldMapWithIndex (function)

**Signature**

```ts
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: Record<K, A>) => M { ... }
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
): <K extends string, R, E>(fka: Kind3<F, R, E, [K, A]>) => Record<K, A>
export function fromFoldable<F extends URIS2, A>(
  M: Magma<A>,
  F: Foldable2<F>
): <K extends string, E>(fka: Kind2<F, E, [K, A]>) => Record<K, A>
export function fromFoldable<F extends URIS, A>(
  M: Magma<A>,
  F: Foldable1<F>
): <K extends string>(fka: Kind<F, [K, A]>) => Record<K, A>
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
): <R, E, A, K extends string>(fa: Kind3<F, R, E, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <E, A, K extends string>(fa: Kind2<F, E, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A, K extends string>(fa: Kind<F, A>, f: (a: A) => [K, B]) => Record<K, B>
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

const users: Array<User> = [
  { id: 'id1', name: 'name1' },
  { id: 'id2', name: 'name2' },
  { id: 'id1', name: 'name3' }
]

assert.deepStrictEqual(
  fromFoldableMap(getLastSemigroup<User>(), array)(users, user => [user.id, user]),
  {
    id1: { id: 'id1', name: 'name3' },
    id2: { id: 'id2', name: 'name2' }
  }
)
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
export function getShow<A>(S: Show<A>): Show<Record<string, A>> { ... }
```

Added in v2.0.0

# hasOwnProperty (function)

**Signature**

```ts
export function hasOwnProperty<K extends string>(k: string, r: Record<K, unknown>): k is K { ... }
```

Added in v2.0.0

# insertAt (function)

Insert or replace a key/value pair in a record

**Signature**

```ts
export function insertAt<K extends string, A>(k: K, a: A): <KS extends string>(r: Record<KS, A>) => Record<KS | K, A> { ... }
```

Added in v2.0.0

# isEmpty (function)

Test whether a record is empty

**Signature**

```ts
export function isEmpty(r: Record<string, unknown>): boolean { ... }
```

Added in v2.0.0

# isSubrecord (function)

Test whether one record contains all of the keys and values contained in another record

**Signature**

```ts
export function isSubrecord<A>(E: Eq<A>): (x: Record<string, A>, y: Record<string, A>) => boolean { ... }
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
export function lookup<A>(k: string, r: Record<string, A>): Option<A> { ... }
```

Added in v2.0.0

# map (function)

Map a record passing the values to the iterating function

**Signature**

```ts
export function map<A, B>(f: (a: A) => B): <K extends string>(fa: Record<K, A>) => Record<K, B> { ... }
```

Added in v2.0.0

# mapWithIndex (function)

Map a record passing the keys to the iterating function

**Signature**

```ts
export function mapWithIndex<K extends string, A, B>(f: (k: K, a: A) => B): (fa: Record<K, A>) => Record<K, B> { ... }
```

Added in v2.0.0

# modifyAt (function)

**Signature**

```ts
export function modifyAt<A>(k: string, f: (a: A) => A): <K extends string>(r: Record<K, A>) => Option<Record<K, A>> { ... }
```

Added in v2.0.0

# partitionMapWithIndex (function)

**Signature**

```ts
export function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (fa: Record<K, A>) => Separated<Record<string, B>, Record<string, C>> { ... }
```

Added in v2.0.0

# partitionWithIndex (function)

**Signature**

```ts
export function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, A>> { ... }
```

Added in v2.0.0

# pop (function)

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export function pop<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Option<[A, Record<string extends K ? string : Exclude<KS, K>, A>]> { ... }
```

Added in v2.0.0

# reduceRightWithIndex (function)

**Signature**

```ts
export function reduceRightWithIndex<K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B): (fa: Record<K, A>) => B { ... }
```

Added in v2.0.0

# reduceWithIndex (function)

**Signature**

```ts
export function reduceWithIndex<K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B): (fa: Record<K, A>) => B { ... }
```

Added in v2.0.0

# sequence (function)

**Signature**

```ts
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A>(ta: Record<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, Record<K, A>>
export function sequence<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A>(ta: Record<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, Record<K, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A>(ta: Record<K, Kind2<F, E, A>>) => Kind2<F, E, Record<K, A>>
export function sequence<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A>(ta: Record<K, Kind2<F, E, A>>) => Kind2<F, E, Record<K, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A>(ta: Record<K, Kind<F, A>>) => Kind<F, Record<K, A>>
export function sequence<F>(F: Applicative<F>): <K extends string, A>(ta: Record<K, HKT<F, A>>) => HKT<F, Record<K, A>> { ... }
```

Added in v2.0.0

# singleton (function)

Create a record with one key/value pair

**Signature**

```ts
export function singleton<K extends string, A>(k: K, a: A): Record<K, A> { ... }
```

Added in v2.0.0

# size (function)

Calculate the number of key/value pairs in a record

**Signature**

```ts
export function size(r: Record<string, unknown>): number { ... }
```

Added in v2.0.0

# some (function)

**Signature**

```ts
export function some<A>(predicate: (a: A) => boolean): (r: Record<string, A>) => boolean { ... }
```

Added in v2.0.0

# toUnfoldable (function)

Unfolds a record into a list of key/value pairs

**Signature**

```ts
export function toUnfoldable<F extends URIS>(
  unfoldable: Unfoldable1<F>
): <K extends string, A>(r: Record<K, A>) => Kind<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <K extends string, A>(r: Record<K, A>) => HKT<F, [K, A]> { ... }
```

Added in v2.0.0

# traverse (function)

**Signature**

```ts
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <R, E, A, B>(f: (a: A) => Kind3<F, R, E, B>) => <K extends string>(ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverse<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <R, A, B>(f: (a: A) => Kind3<F, R, E, B>) => <K extends string>(ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <E, A, B>(f: (a: A) => Kind2<F, E, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverse<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A, B>(f: (a: A) => Kind2<F, E, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Kind<F, B>) => <K extends string>(ta: Record<K, A>) => Kind<F, Record<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: Record<K, A>) => HKT<F, Record<K, B>> { ... }
```

Added in v2.0.0

# traverseWithIndex (function)

**Signature**

```ts
export function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverseWithIndex<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A, B>(f: (k: K, a: A) => Kind2<F, E, B>) => (ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverseWithIndex<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A, B>(f: (k: K, a: A) => Kind2<F, E, B>) => (ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(f: (k: K, a: A) => Kind<F, B>) => (ta: Record<K, A>) => Kind<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: Record<K, A>) => HKT<F, Record<K, B>> { ... }
```

Added in v2.0.0

# updateAt (function)

**Signature**

```ts
export function updateAt<A>(k: string, a: A): <K extends string>(r: Record<K, A>) => Option<Record<K, A>> { ... }
```

Added in v2.0.0

# compact (export)

**Signature**

```ts
<A>(fa: Record<string, Option<A>>) => Record<string, A>
```

Added in v2.0.0

# filter (export)

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: Record<string, A>) => Record<string, B>; <A>(predicate: Predicate<A>): (fa: Record<string, A>) => Record<string, A>; }
```

Added in v2.0.0

# filterMap (export)

**Signature**

```ts
<A, B>(f: (a: A) => Option<B>) => (fa: Record<string, A>) => Record<string, B>
```

Added in v2.0.0

# foldMap (export)

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Record<string, A>) => M
```

Added in v2.0.0

# partition (export)

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, B>>; <A>(predicate: Predicate<A>): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, A>>; }
```

Added in v2.0.0

# partitionMap (export)

**Signature**

```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: Record<string, A>) => Separated<Record<string, B>, Record<string, C>>
```

Added in v2.0.0

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Record<string, A>) => B
```

Added in v2.0.0

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Record<string, A>) => B
```

Added in v2.0.0

# separate (export)

**Signature**

```ts
<A, B>(fa: Record<string, Either<A, B>>) => Separated<Record<string, A>, Record<string, B>>
```

Added in v2.0.0
