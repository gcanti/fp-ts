---
title: Record.ts
nav_order: 75
parent: Modules
---

# Record overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [collect](#collect)
- [compact](#compact)
- [deleteAt](#deleteat)
- [elem](#elem)
- [empty](#empty)
- [every](#every)
- [filter](#filter)
- [filterMap](#filtermap)
- [filterMapWithIndex](#filtermapwithindex)
- [filterWithIndex](#filterwithindex)
- [foldMap](#foldmap)
- [foldMapWithIndex](#foldmapwithindex)
- [fromFoldable](#fromfoldable)
- [fromFoldableMap](#fromfoldablemap)
- [getEq](#geteq)
- [getMonoid](#getmonoid)
- [getShow](#getshow)
- [hasOwnProperty (function)](#hasownproperty-function)
- [insertAt](#insertat)
- [isEmpty](#isempty)
- [isSubrecord](#issubrecord)
- [keys](#keys)
- [lookup](#lookup)
- [map](#map)
- [mapWithIndex](#mapwithindex)
- [modifyAt](#modifyat)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [partitionMapWithIndex](#partitionmapwithindex)
- [partitionWithIndex](#partitionwithindex)
- [pop](#pop)
- [record](#record)
- [reduce](#reduce)
- [reduceRight](#reduceright)
- [reduceRightWithIndex](#reducerightwithindex)
- [reduceWithIndex](#reducewithindex)
- [separate](#separate)
- [sequence](#sequence)
- [singleton](#singleton)
- [size](#size)
- [some](#some)
- [toArray](#toarray)
- [toUnfoldable](#tounfoldable)
- [traverse](#traverse)
- [traverseWithIndex](#traversewithindex)
- [updateAt](#updateat)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export const URI: "Record" = ...
```

Added in v2.0.0

# collect

Map a record into an array

**Signature**

```ts
export const collect: <K extends string, A, B>(
  f: (k: K, a: A) => B
) => (r: Record<K, A>) => Array<B> = ...
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

# compact

**Signature**

```ts
<A>(fa: Record<string, Option<A>>) => Record<string, A>
```

Added in v2.0.0

# deleteAt

Delete a key and value from a map

**Signature**

```ts
export function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Record<string extends K ? string : Exclude<KS, K>, A> { ... }
```

Added in v2.0.0

# elem

**Signature**

```ts
export const elem: <A>(E: Eq<A>) => (a: A, fa: Record<string, A>) => boolean = ...
```

Added in v2.0.0

# empty

**Signature**

```ts
export const empty: Record<string, never> = ...
```

Added in v2.0.0

# every

**Signature**

```ts
export const every: <A>(predicate: Predicate<A>) => (r: Record<string, A>) => boolean = ...
```

Added in v2.0.0

# filter

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: Record<string, A>) => Record<string, B>; <A>(predicate: Predicate<A>): (fa: Record<string, A>) => Record<string, A>; }
```

Added in v2.0.0

# filterMap

**Signature**

```ts
<A, B>(f: (a: A) => Option<B>) => (fa: Record<string, A>) => Record<string, B>
```

Added in v2.0.0

# filterMapWithIndex

**Signature**

```ts
export function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: Record<K, A>) => Record<string, B> { ... }
```

Added in v2.0.0

# filterWithIndex

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

# foldMap

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Record<string, A>) => M
```

Added in v2.0.0

# foldMapWithIndex

**Signature**

```ts
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: Record<K, A>) => M { ... }
```

Added in v2.0.0

# fromFoldable

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

# fromFoldableMap

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

# getEq

**Signature**

```ts
export function getEq<K extends string, A>(E: Eq<A>): Eq<Record<K, A>> { ... }
```

Added in v2.0.0

# getMonoid

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

# getShow

**Signature**

```ts
export const getShow: <A>(S: Show<A>) => Show<Record<string, A>> = ...
```

Added in v2.0.0

# hasOwnProperty (function)

**Signature**

```ts
export const hasOwnProperty: <K extends string>(k: string, r: Record<K, unknown>) => k is K = ...
```

Added in v2.0.0

# insertAt

Insert or replace a key/value pair in a record

**Signature**

```ts
export function insertAt<K extends string, A>(k: K, a: A): <KS extends string>(r: Record<KS, A>) => Record<KS | K, A> { ... }
```

Added in v2.0.0

# isEmpty

Test whether a record is empty

**Signature**

```ts
export const isEmpty: (r: Record<string, unknown>) => boolean = ...
```

Added in v2.0.0

# isSubrecord

Test whether one record contains all of the keys and values contained in another record

**Signature**

```ts
export const isSubrecord: <A>(E: Eq<A>) => (x: Record<string, A>, y: Record<string, A>) => boolean = ...
```

Added in v2.0.0

# keys

**Signature**

```ts
export const keys: <K extends string>(r: Record<K, unknown>) => Array<K> = ...
```

Added in v2.0.0

# lookup

Lookup the value for a key in a record

**Signature**

```ts
export const lookup: <A>(k: string, r: Record<string, A>) => Option<A> = ...
```

Added in v2.0.0

# map

Map a record passing the values to the iterating function

**Signature**

```ts
export function map<A, B>(f: (a: A) => B): <K extends string>(fa: Record<K, A>) => Record<K, B> { ... }
```

Added in v2.0.0

# mapWithIndex

Map a record passing the keys to the iterating function

**Signature**

```ts
export function mapWithIndex<K extends string, A, B>(f: (k: K, a: A) => B): (fa: Record<K, A>) => Record<K, B> { ... }
```

Added in v2.0.0

# modifyAt

**Signature**

```ts
export const : <A>(k: string, f: (a: A) => A) => <K extends string>(r: Record<K, A>) => Option<Record<K, A>> = ...
```

Added in v2.0.0

# partition

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, B>>; <A>(predicate: Predicate<A>): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, A>>; }
```

Added in v2.0.0

# partitionMap

**Signature**

```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: Record<string, A>) => Separated<Record<string, B>, Record<string, C>>
```

Added in v2.0.0

# partitionMapWithIndex

**Signature**

```ts
export function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (fa: Record<K, A>) => Separated<Record<string, B>, Record<string, C>> { ... }
```

Added in v2.0.0

# partitionWithIndex

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

# pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export function pop<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Option<[A, Record<string extends K ? string : Exclude<KS, K>, A>]> { ... }
```

Added in v2.0.0

# record

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

# reduce

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Record<string, A>) => B
```

Added in v2.0.0

# reduceRight

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Record<string, A>) => B
```

Added in v2.0.0

# reduceRightWithIndex

**Signature**

```ts
export function reduceRightWithIndex<K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B): (fa: Record<K, A>) => B { ... }
```

Added in v2.0.0

# reduceWithIndex

**Signature**

```ts
export function reduceWithIndex<K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B): (fa: Record<K, A>) => B { ... }
```

Added in v2.0.0

# separate

**Signature**

```ts
<A, B>(fa: Record<string, Either<A, B>>) => Separated<Record<string, A>, Record<string, B>>
```

Added in v2.0.0

# sequence

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

# singleton

Create a record with one key/value pair

**Signature**

```ts
export const singleton: <K extends string, A>(k: K, a: A) => Record<K, A> = ...
```

Added in v2.0.0

# size

Calculate the number of key/value pairs in a record

**Signature**

```ts
export const size: (r: Record<string, unknown>) => number = ...
```

Added in v2.0.0

# some

**Signature**

```ts
export const some: <A>(predicate: (a: A) => boolean) => (r: Record<string, A>) => boolean = ...
```

Added in v2.0.0

# toArray

**Signature**

```ts
export const toArray: <K extends string, A>(r: Record<K, A>) => Array<[K, A]> = ...
```

Added in v2.0.0

# toUnfoldable

Unfolds a record into a list of key/value pairs

**Signature**

```ts
export function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K extends string, A>(r: Record<K, A>) => Kind<F, [K, A]>
export function toUnfoldable<F>(U: Unfoldable<F>): <K extends string, A>(r: Record<K, A>) => HKT<F, [K, A]> { ... }
```

Added in v2.0.0

# traverse

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

# traverseWithIndex

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

# updateAt

**Signature**

```ts
export const updateAt: <A>(k: string, a: A) => <K extends string>(r: Record<K, A>) => Option<Record<K, A>> = ...
```

Added in v2.0.0
