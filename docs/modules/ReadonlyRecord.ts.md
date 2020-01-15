---
title: ReadonlyRecord.ts
nav_order: 72
parent: Modules
---

# ReadonlyRecord overview

Added in v2.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [ReadonlyRecord (type alias)](#readonlyrecord-type-alias)
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
- [fromRecord](#fromrecord)
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
- [readonlyRecord](#readonlyrecord)
- [reduce](#reduce)
- [reduceRight](#reduceright)
- [reduceRightWithIndex](#reducerightwithindex)
- [reduceWithIndex](#reducewithindex)
- [separate](#separate)
- [sequence](#sequence)
- [singleton](#singleton)
- [size](#size)
- [some](#some)
- [toReadonlyArray](#toreadonlyarray)
- [toRecord](#torecord)
- [toUnfoldable](#tounfoldable)
- [traverse](#traverse)
- [traverseWithIndex](#traversewithindex)
- [updateAt](#updateat)

---

# ReadonlyRecord (type alias)

**Signature**

```ts
export type ReadonlyRecord<K extends string, T> = Readonly<Record<K, T>>
```

Added in v2.5.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

# URI

**Signature**

```ts
export const URI: "ReadonlyRecord" = ...
```

Added in v2.5.0

# collect

Map a record into an array

**Signature**

```ts
export function collect<K extends string, A, B>(f: (k: K, a: A) => B): (r: ReadonlyRecord<K, A>) => ReadonlyArray<B> { ... }
```

**Example**

```ts
import { collect } from 'fp-ts/lib/ReadonlyRecord'

const x: { a: string; b: boolean } = { a: 'foo', b: false }
assert.deepStrictEqual(collect((key, val) => ({ key: key, value: val }))(x), [
  { key: 'a', value: 'foo' },
  { key: 'b', value: false }
])
```

Added in v2.5.0

# compact

**Signature**

```ts
<A>(fa: Readonly<Record<string, Option<A>>>) => Readonly<Record<string, A>>
```

Added in v2.5.0

# deleteAt

Delete a key and value from a map

**Signature**

```ts
export function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: ReadonlyRecord<KS, A>) => ReadonlyRecord<string extends K ? string : Exclude<KS, K>, A> { ... }
```

Added in v2.5.0

# elem

**Signature**

```ts
export function elem<A>(E: Eq<A>): (a: A, fa: ReadonlyRecord<string, A>) => boolean { ... }
```

Added in v2.5.0

# empty

**Signature**

```ts
export const empty: ReadonlyRecord<string, never> = ...
```

Added in v2.5.0

# every

**Signature**

```ts
export function every<A>(predicate: Predicate<A>): (r: ReadonlyRecord<string, A>) => boolean { ... }
```

Added in v2.5.0

# filter

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>; <A>(predicate: Predicate<A>): (fa: Readonly<Record<string, A>>) => Readonly<Record<string, A>>; }
```

Added in v2.5.0

# filterMap

**Signature**

```ts
<A, B>(f: (a: A) => Option<B>) => (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>
```

Added in v2.5.0

# filterMapWithIndex

**Signature**

```ts
export function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B> { ... }
```

Added in v2.5.0

# filterWithIndex

**Signature**

```ts
export function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, A> { ... }
```

Added in v2.5.0

# foldMap

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Readonly<Record<string, A>>) => M
```

Added in v2.5.0

# foldMapWithIndex

**Signature**

```ts
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: ReadonlyRecord<K, A>) => M { ... }
```

Added in v2.5.0

# fromFoldable

Create a record from a foldable collection of key/value pairs, using the
specified `Magma` to combine values for duplicate keys.

**Signature**

```ts
export function fromFoldable<F extends URIS3, A>(
  M: Magma<A>,
  F: Foldable3<F>
): <K extends string, R, E>(fka: Kind3<F, R, E, readonly [K, A]>) => ReadonlyRecord<K, A>
export function fromFoldable<F extends URIS2, A>(
  M: Magma<A>,
  F: Foldable2<F>
): <K extends string, E>(fka: Kind2<F, E, readonly [K, A]>) => ReadonlyRecord<K, A>
export function fromFoldable<F extends URIS, A>(
  M: Magma<A>,
  F: Foldable1<F>
): <K extends string>(fka: Kind<F, readonly [K, A]>) => ReadonlyRecord<K, A>
export function fromFoldable<F, A>(
  M: Magma<A>,
  F: Foldable<F>
): <K extends string>(fka: HKT<F, readonly [K, A]>) => ReadonlyRecord<K, A> { ... }
```

Added in v2.5.0

# fromFoldableMap

Create a record from a foldable collection using the specified functions to

- map to key/value pairs
- combine values for duplicate keys.

**Signature**

```ts
export function fromFoldableMap<F extends URIS3, B>(
  M: Magma<B>,
  F: Foldable3<F>
): <R, E, A, K extends string>(fa: Kind3<F, R, E, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B>
export function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <E, A, K extends string>(fa: Kind2<F, E, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B>
export function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A, K extends string>(fa: Kind<F, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: Foldable<F>
): <A, K extends string>(fa: HKT<F, A>, f: (a: A) => readonly [K, B]) => ReadonlyRecord<K, B> { ... }
```

**Example**

```ts
import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
import { readonlyArray, zip } from 'fp-ts/lib/ReadonlyArray'
import { identity } from 'fp-ts/lib/function'
import { ReadonlyRecord, fromFoldableMap } from 'fp-ts/lib/ReadonlyRecord'

// like lodash `zipObject` or ramda `zipObj`
export const zipObject = <K extends string, A>(
  keys: ReadonlyArray<K>,
  values: ReadonlyArray<A>
): ReadonlyRecord<K, A> => fromFoldableMap(getLastSemigroup<A>(), readonlyArray)(zip(keys, values), identity)

assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

// build a record from a field
interface User {
  id: string
  name: string
}

const users: ReadonlyArray<User> = [
  { id: 'id1', name: 'name1' },
  { id: 'id2', name: 'name2' },
  { id: 'id1', name: 'name3' }
]

assert.deepStrictEqual(
  fromFoldableMap(getLastSemigroup<User>(), readonlyArray)(users, user => [user.id, user]),
  {
    id1: { id: 'id1', name: 'name3' },
    id2: { id: 'id2', name: 'name2' }
  }
)
```

Added in v2.5.0

# fromRecord

**Signature**

```ts
export function fromRecord<K extends string, A>(r: Record<K, A>): ReadonlyRecord<K, A> { ... }
```

Added in v2.5.0

# getEq

**Signature**

```ts
export function getEq<K extends string, A>(E: Eq<A>): Eq<ReadonlyRecord<K, A>> { ... }
```

Added in v2.5.0

# getMonoid

Returns a `Semigroup` instance for records given a `Semigroup` instance for their values

**Signature**

```ts
export function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>> { ... }
```

**Example**

```ts
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { getMonoid } from 'fp-ts/lib/ReadonlyRecord'

const M = getMonoid(semigroupSum)
assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
```

Added in v2.5.0

# getShow

**Signature**

```ts
export function getShow<A>(S: Show<A>): Show<ReadonlyRecord<string, A>> { ... }
```

Added in v2.5.0

# hasOwnProperty (function)

**Signature**

```ts
export function hasOwnProperty<K extends string>(k: string, r: ReadonlyRecord<K, unknown>): k is K { ... }
```

Added in v2.5.0

# insertAt

Insert or replace a key/value pair in a record

**Signature**

```ts
export function insertAt<K extends string, A>(
  k: K,
  a: A
): <KS extends string>(r: ReadonlyRecord<KS, A>) => ReadonlyRecord<KS | K, A> { ... }
```

Added in v2.5.0

# isEmpty

Test whether a record is empty

**Signature**

```ts
export function isEmpty(r: ReadonlyRecord<string, unknown>): boolean { ... }
```

Added in v2.5.0

# isSubrecord

Test whether one record contains all of the keys and values contained in another record

**Signature**

```ts
export function isSubrecord<A>(E: Eq<A>): (x: ReadonlyRecord<string, A>, y: ReadonlyRecord<string, A>) => boolean { ... }
```

Added in v2.5.0

# keys

**Signature**

```ts
export function keys<K extends string>(r: ReadonlyRecord<K, unknown>): ReadonlyArray<K> { ... }
```

Added in v2.5.0

# lookup

Lookup the value for a key in a record

**Signature**

```ts
export function lookup<A>(k: string, r: ReadonlyRecord<string, A>): Option<A> { ... }
```

Added in v2.5.0

# map

Map a record passing the values to the iterating function

**Signature**

```ts
export function map<A, B>(f: (a: A) => B): <K extends string>(fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B> { ... }
```

Added in v2.5.0

# mapWithIndex

Map a record passing the keys to the iterating function

**Signature**

```ts
export function mapWithIndex<K extends string, A, B>(
  f: (k: K, a: A) => B
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B> { ... }
```

Added in v2.5.0

# modifyAt

**Signature**

```ts
export function modifyAt<A>(
  k: string,
  f: (a: A) => A
): <K extends string>(r: ReadonlyRecord<K, A>) => Option<ReadonlyRecord<K, A>> { ... }
```

Added in v2.5.0

# partition

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: Readonly<Record<string, A>>) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>>; <A>(predicate: Predicate<A>): (fa: Readonly<Record<string, A>>) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, A>>>; }
```

Added in v2.5.0

# partitionMap

**Signature**

```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: Readonly<Record<string, A>>) => Separated<Readonly<Record<string, B>>, Readonly<Record<string, C>>>
```

Added in v2.5.0

# partitionMapWithIndex

**Signature**

```ts
export function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>> { ... }
```

Added in v2.5.0

# partitionWithIndex

**Signature**

```ts
export function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>> { ... }
```

Added in v2.5.0

# pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export function pop<K extends string>(
  k: K
): <KS extends string, A>(
  r: ReadonlyRecord<KS, A>
) => Option<readonly [A, ReadonlyRecord<string extends K ? string : Exclude<KS, K>, A>]> { ... }
```

Added in v2.5.0

# readonlyRecord

**Signature**

```ts
export const readonlyRecord: FunctorWithIndex1<URI, string> &
  Foldable1<URI> &
  TraversableWithIndex1<URI, string> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, string> &
  Witherable1<URI> &
  FoldableWithIndex1<URI, string> = ...
```

Added in v2.5.0

# reduce

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Readonly<Record<string, A>>) => B
```

Added in v2.5.0

# reduceRight

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Readonly<Record<string, A>>) => B
```

Added in v2.5.0

# reduceRightWithIndex

**Signature**

```ts
export function reduceRightWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, a: A, b: B) => B
): (fa: ReadonlyRecord<K, A>) => B { ... }
```

Added in v2.5.0

# reduceWithIndex

**Signature**

```ts
export function reduceWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, b: B, a: A) => B
): (fa: ReadonlyRecord<K, A>) => B { ... }
```

Added in v2.5.0

# separate

**Signature**

```ts
<A, B>(fa: Readonly<Record<string, Either<A, B>>>) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>>
```

Added in v2.5.0

# sequence

**Signature**

```ts
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A>(ta: ReadonlyRecord<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A>(ta: ReadonlyRecord<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A>(ta: ReadonlyRecord<K, Kind2<F, E, A>>) => Kind2<F, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A>(ta: ReadonlyRecord<K, Kind2<F, E, A>>) => Kind2<F, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A>(ta: ReadonlyRecord<K, Kind<F, A>>) => Kind<F, ReadonlyRecord<K, A>>
export function sequence<F>(
  F: Applicative<F>
): <K extends string, A>(ta: ReadonlyRecord<K, HKT<F, A>>) => HKT<F, ReadonlyRecord<K, A>> { ... }
```

Added in v2.5.0

# singleton

Create a record with one key/value pair

**Signature**

```ts
export function singleton<K extends string, A>(k: K, a: A): ReadonlyRecord<K, A> { ... }
```

Added in v2.5.0

# size

Calculate the number of key/value pairs in a record

**Signature**

```ts
export function size(r: ReadonlyRecord<string, unknown>): number { ... }
```

Added in v2.5.0

# some

**Signature**

```ts
export function some<A>(predicate: (a: A) => boolean): (r: ReadonlyRecord<string, A>) => boolean { ... }
```

Added in v2.5.0

# toReadonlyArray

**Signature**

```ts
export const toReadonlyArray: <K extends string, A>(
  r: ReadonlyRecord<K, A>
) => ReadonlyArray<readonly [K, A]> = ...
```

Added in v2.5.0

# toRecord

**Signature**

```ts
export function toRecord<K extends string, A>(r: ReadonlyRecord<K, A>): Record<K, A> { ... }
```

Added in v2.5.0

# toUnfoldable

Unfolds a record into a list of key/value pairs

**Signature**

```ts
export function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => Kind<F, readonly [K, A]>
export function toUnfoldable<F>(
  U: Unfoldable<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => HKT<F, readonly [K, A]> { ... }
```

Added in v2.5.0

# traverse

**Signature**

```ts
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <R, E, A, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <R, A, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <E, A, B>(
  f: (a: A) => Kind2<F, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A, B>(
  f: (a: A) => Kind2<F, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Kind<F, B>) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>> { ... }
```

Added in v2.5.0

# traverseWithIndex

**Signature**

```ts
export function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A, B>(
  f: (k: K, a: A) => Kind2<F, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A, B>(
  f: (k: K, a: A) => Kind2<F, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(
  f: (k: K, a: A) => Kind<F, B>
) => (ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>> { ... }
```

Added in v2.5.0

# updateAt

**Signature**

```ts
export function updateAt<A>(
  k: string,
  a: A
): <K extends string>(r: ReadonlyRecord<K, A>) => Option<ReadonlyRecord<K, A>> { ... }
```

Added in v2.5.0
