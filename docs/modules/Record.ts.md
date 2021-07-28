---
title: Record.ts
nav_order: 88
parent: Modules
---

## Record overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Witherable](#witherable)
  - [wilt](#wilt)
  - [wither](#wither)
- [combinators](#combinators)
  - [difference](#difference)
  - [flap](#flap)
  - [intersection](#intersection)
  - [union](#union)
  - [upsertAt](#upsertat)
- [instances](#instances)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [FilterableWithIndex](#filterablewithindex)
  - [Functor](#functor)
  - [FunctorWithIndex](#functorwithindex)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getDifferenceMagma](#getdifferencemagma)
  - [getEq](#geteq)
  - [getFoldable](#getfoldable)
  - [getFoldableWithIndex](#getfoldablewithindex)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getMonoid](#getmonoid)
  - [getShow](#getshow)
  - [getTraversable](#gettraversable)
  - [getTraversableWithIndex](#gettraversablewithindex)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
  - [getWitherable](#getwitherable)
  - [~~FoldableWithIndex~~](#foldablewithindex)
  - [~~Foldable~~](#foldable)
  - [~~TraversableWithIndex~~](#traversablewithindex)
  - [~~Traversable~~](#traversable)
  - [~~Witherable~~](#witherable)
  - [~~record~~](#record)
- [utils](#utils)
  - [collect](#collect)
  - [deleteAt](#deleteat)
  - [elem](#elem)
  - [every](#every)
  - [filterMapWithIndex](#filtermapwithindex)
  - [filterWithIndex](#filterwithindex)
  - [foldMapWithIndex](#foldmapwithindex)
  - [fromFoldable](#fromfoldable)
  - [fromFoldableMap](#fromfoldablemap)
  - [has](#has)
  - [isEmpty](#isempty)
  - [isSubrecord](#issubrecord)
  - [keys](#keys)
  - [lookup](#lookup)
  - [map](#map)
  - [mapWithIndex](#mapwithindex)
  - [modifyAt](#modifyat)
  - [partitionMapWithIndex](#partitionmapwithindex)
  - [partitionWithIndex](#partitionwithindex)
  - [pop](#pop)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
  - [sequence](#sequence)
  - [singleton](#singleton)
  - [size](#size)
  - [some](#some)
  - [toArray](#toarray)
  - [toUnfoldable](#tounfoldable)
  - [traverse](#traverse)
  - [traverseWithIndex](#traversewithindex)
  - [updateAt](#updateat)
  - [~~empty~~](#empty)
  - [~~hasOwnProperty (function)~~](#hasownproperty-function)
  - [~~insertAt~~](#insertat)

---

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(fa: Record<string, Option<A>>) => Record<string, A>
```

Added in v2.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(
  fa: Record<string, Either<A, B>>
) => Separated<Record<string, A>, Record<string, B>>
```

Added in v2.0.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Record<string, A>) => Record<string, B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Record<string, B>) => Record<string, B>
  <A>(predicate: Predicate<A>): (fa: Record<string, A>) => Record<string, A>
}
```

Added in v2.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Record<string, A>) => Record<string, B>
```

Added in v2.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fa: Record<string, A>
  ) => Separated<Record<string, A>, Record<string, B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Record<string, B>) => Separated<Record<string, B>, Record<string, B>>
  <A>(predicate: Predicate<A>): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, A>>
}
```

Added in v2.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Record<string, A>) => Separated<Record<string, B>, Record<string, C>>
```

Added in v2.0.0

# Foldable

## foldMap

**Signature**

```ts
export declare function foldMap(
  O: Ord<string>
): <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Record<string, A>) => M
export declare function foldMap<M>(M: Monoid<M>): <A>(f: (a: A) => M) => (fa: Record<string, A>) => M
```

Added in v2.0.0

## reduce

**Signature**

```ts
export declare function reduce(O: Ord<string>): <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Record<string, A>) => B
export declare function reduce<A, B>(b: B, f: (b: B, a: A) => B): (fa: Record<string, A>) => B
```

Added in v2.0.0

## reduceRight

**Signature**

```ts
export declare function reduceRight(O: Ord<string>): <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Record<string, A>) => B
export declare function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): (fa: Record<string, A>) => B
```

Added in v2.0.0

# Witherable

## wilt

**Signature**

```ts
export declare const wilt: PipeableWilt1<'Record'>
```

Added in v2.6.5

## wither

**Signature**

```ts
export declare const wither: PipeableWither1<'Record'>
```

Added in v2.6.5

# combinators

## difference

**Signature**

```ts
export declare const difference: <A>(second: Record<string, A>) => (first: Record<string, A>) => Record<string, A>
```

Added in v2.11.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Record<string, (a: A) => B>) => Record<string, B>
```

Added in v2.10.0

## intersection

**Signature**

```ts
export declare const intersection: <A>(
  M: Magma<A>
) => (second: Record<string, A>) => (first: Record<string, A>) => Record<string, A>
```

Added in v2.11.0

## union

**Signature**

```ts
export declare const union: <A>(
  M: Magma<A>
) => (second: Record<string, A>) => (first: Record<string, A>) => Record<string, A>
```

Added in v2.11.0

## upsertAt

Insert or replace a key/value pair in a `Record`.

**Signature**

```ts
export declare const upsertAt: <A>(k: string, a: A) => (r: Record<string, A>) => Record<string, A>
```

Added in v2.10.0

# instances

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'Record'>
```

Added in v2.7.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'Record'>
```

Added in v2.7.0

## FilterableWithIndex

**Signature**

```ts
export declare const FilterableWithIndex: FilterableWithIndex1<'Record', string>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'Record'>
```

Added in v2.7.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'Record', string>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Record'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <A>() => Magma<Record<string, A>>
```

Added in v2.11.0

## getEq

**Signature**

```ts
export declare const getEq: <K extends string, A>(E: Eq<A>) => Eq<Record<K, A>>
```

Added in v2.0.0

## getFoldable

**Signature**

```ts
export declare const getFoldable: (O: Ord<string>) => Foldable1<URI>
```

Added in v2.11.0

## getFoldableWithIndex

**Signature**

```ts
export declare const getFoldableWithIndex: (O: Ord<string>) => FoldableWithIndex1<URI, string>
```

Added in v2.11.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(S: Semigroup<A>) => Semigroup<Record<string, A>>
```

Added in v2.11.0

## getMonoid

Returns a `Monoid` instance for `Record`s given a `Semigroup` instance for their values.

**Signature**

```ts
export declare const getMonoid: <K extends string, A>(S: Semigroup<A>) => Monoid<Record<K, A>>
```

**Example**

```ts
import { SemigroupSum } from 'fp-ts/number'
import { getMonoid } from 'fp-ts/Record'

const M = getMonoid(SemigroupSum)
assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare function getShow(O: Ord<string>): <A>(S: Show<A>) => Show<Record<string, A>>
export declare function getShow<A>(S: Show<A>): Show<Record<string, A>>
```

Added in v2.0.0

## getTraversable

**Signature**

```ts
export declare const getTraversable: (O: Ord<string>) => Traversable1<URI>
```

Added in v2.11.0

## getTraversableWithIndex

**Signature**

```ts
export declare const getTraversableWithIndex: (O: Ord<string>) => TraversableWithIndex1<URI, string>
```

Added in v2.11.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <A>(S: Semigroup<A>) => Monoid<Record<string, A>>
```

Added in v2.11.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(S: Semigroup<A>) => Semigroup<Record<string, A>>
```

Added in v2.11.0

## getWitherable

**Signature**

```ts
export declare const getWitherable: (O: Ord<string>) => Witherable1<URI>
```

Added in v2.11.0

## ~~FoldableWithIndex~~

Use `getFoldableWithIndex` instead.

**Signature**

```ts
export declare const FoldableWithIndex: FoldableWithIndex1<'Record', string>
```

Added in v2.7.0

## ~~Foldable~~

Use `getFoldable` instead.

**Signature**

```ts
export declare const Foldable: Foldable1<'Record'>
```

Added in v2.7.0

## ~~TraversableWithIndex~~

Use the `getTraversableWithIndex` instead.

**Signature**

```ts
export declare const TraversableWithIndex: TraversableWithIndex1<'Record', string>
```

Added in v2.7.0

## ~~Traversable~~

Use `getTraversable` instead.

**Signature**

```ts
export declare const Traversable: Traversable1<'Record'>
```

Added in v2.7.0

## ~~Witherable~~

Use `getWitherable` instead.

**Signature**

```ts
export declare const Witherable: Witherable1<'Record'>
```

Added in v2.7.0

## ~~record~~

Use small, specific instances instead.

**Signature**

```ts
export declare const record: FunctorWithIndex1<'Record', string> &
  FoldableWithIndex1<'Record', string> &
  FilterableWithIndex1<'Record', string> &
  TraversableWithIndex1<'Record', string> &
  Witherable1<'Record'>
```

Added in v2.0.0

# utils

## collect

Map a `Record` into an `Array`.

**Signature**

```ts
export declare function collect(
  O: Ord<string>
): <K extends string, A, B>(f: (k: K, a: A) => B) => (r: Record<K, A>) => Array<B>
export declare function collect<K extends string, A, B>(f: (k: K, a: A) => B): (r: Record<K, A>) => Array<B>
```

**Example**

```ts
import { collect } from 'fp-ts/Record'
import { Ord } from 'fp-ts/string'

const x: { readonly a: string; readonly b: boolean } = { a: 'c', b: false }
assert.deepStrictEqual(collect(Ord)((key, val) => ({ key: key, value: val }))(x), [
  { key: 'a', value: 'c' },
  { key: 'b', value: false },
])
```

Added in v2.0.0

## deleteAt

Delete a key and value from a `Record`.

**Signature**

```ts
export declare function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Record<string extends K ? string : Exclude<KS, K>, A>
```

Added in v2.0.0

## elem

**Signature**

```ts
export declare const elem: <A>(
  E: Eq<A>
) => { (a: A): (fa: Record<string, A>) => boolean; (a: A, fa: Record<string, A>): boolean }
```

Added in v2.0.0

## every

**Signature**

```ts
export declare const every: <A>(predicate: Predicate<A>) => (r: Record<string, A>) => boolean
```

Added in v2.0.0

## filterMapWithIndex

**Signature**

```ts
export declare const filterMapWithIndex: <K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
) => (fa: Record<K, A>) => Record<string, B>
```

Added in v2.0.0

## filterWithIndex

**Signature**

```ts
export declare function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Record<string, B>
export declare function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): <B extends A>(fb: Record<K, B>) => Record<string, B>
export declare function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Record<string, A>
```

Added in v2.0.0

## foldMapWithIndex

**Signature**

```ts
export declare function foldMapWithIndex(
  O: Ord<string>
): <M>(M: Monoid<M>) => <K extends string, A>(f: (k: K, a: A) => M) => (fa: Record<K, A>) => M
export declare function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: Record<K, A>) => M
```

Added in v2.0.0

## fromFoldable

Create a `Record` from a foldable collection of key/value pairs, using the
specified `Magma` to combine values for duplicate keys.

**Signature**

```ts
export declare function fromFoldable<F extends URIS3, A>(
  M: Magma<A>,
  F: Foldable3<F>
): <R, E>(fka: Kind3<F, R, E, [string, A]>) => Record<string, A>
export declare function fromFoldable<F extends URIS2, A>(
  M: Magma<A>,
  F: Foldable2<F>
): <E>(fka: Kind2<F, E, [string, A]>) => Record<string, A>
export declare function fromFoldable<F extends URIS, A>(
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Kind<F, [string, A]>) => Record<string, A>
export declare function fromFoldable<F, A>(
  M: Magma<A>,
  F: FoldableHKT<F>
): (fka: HKT<F, [string, A]>) => Record<string, A>
```

Added in v2.0.0

## fromFoldableMap

Create a `Record` from a foldable collection using the specified functions to

- map to key/value pairs
- combine values for duplicate keys.

**Signature**

```ts
export declare function fromFoldableMap<F extends URIS3, B>(
  M: Magma<B>,
  F: Foldable3<F>
): <R, E, A>(fa: Kind3<F, R, E, A>, f: (a: A) => [string, B]) => Record<string, B>
export declare function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <E, A>(fa: Kind2<F, E, A>, f: (a: A) => [string, B]) => Record<string, B>
export declare function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A>(fa: Kind<F, A>, f: (a: A) => [string, B]) => Record<string, B>
export declare function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: FoldableHKT<F>
): <A>(fa: HKT<F, A>, f: (a: A) => [string, B]) => Record<string, B>
```

**Example**

```ts
import { last } from 'fp-ts/Semigroup'
import { Foldable, zip } from 'fp-ts/Array'
import { identity } from 'fp-ts/function'
import { fromFoldableMap } from 'fp-ts/Record'

export const zipObject = <K extends string, A>(keys: Array<K>, values: Array<A>): Record<K, A> =>
  fromFoldableMap(last<A>(), Foldable)(zip(keys, values), identity)

assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

interface User {
  readonly id: string
  readonly name: string
}

const users: Array<User> = [
  { id: 'id1', name: 'name1' },
  { id: 'id2', name: 'name2' },
  { id: 'id1', name: 'name3' },
]

assert.deepStrictEqual(
  fromFoldableMap(last<User>(), Foldable)(users, (user) => [user.id, user]),
  {
    id1: { id: 'id1', name: 'name3' },
    id2: { id: 'id2', name: 'name2' },
  }
)
```

Added in v2.0.0

## has

Test whether or not a key exists in a `Record`.

Note. This function is not pipeable because is a `Refinement`.

**Signature**

```ts
export declare const has: <K extends string>(k: string, r: Record<K, unknown>) => k is K
```

Added in v2.10.0

## isEmpty

Test whether a `Record` is empty.

**Signature**

```ts
export declare const isEmpty: <A>(r: Record<string, A>) => boolean
```

Added in v2.0.0

## isSubrecord

Test whether one `Record` contains all of the keys and values contained in another `Record`.

**Signature**

```ts
export declare const isSubrecord: <A>(
  E: Eq<A>
) => {
  (that: Record<string, A>): (me: Record<string, A>) => boolean
  (me: Record<string, A>, that: Record<string, A>): boolean
}
```

Added in v2.0.0

## keys

**Signature**

```ts
export declare const keys: <K extends string>(r: Record<K, unknown>) => K[]
```

Added in v2.0.0

## lookup

Lookup the value for a key in a `Record`.

**Signature**

```ts
export declare const lookup: {
  (k: string): <A>(r: Record<string, A>) => Option<A>
  <A>(k: string, r: Record<string, A>): Option<A>
}
```

Added in v2.0.0

## map

Map a `Record` passing the values to the iterating function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <K extends string>(fa: Record<K, A>) => Record<K, B>
```

Added in v2.0.0

## mapWithIndex

Map a `Record` passing the keys to the iterating function.

**Signature**

```ts
export declare const mapWithIndex: <K extends string, A, B>(f: (k: K, a: A) => B) => (fa: Record<K, A>) => Record<K, B>
```

Added in v2.0.0

## modifyAt

**Signature**

```ts
export declare const modifyAt: <A>(
  k: string,
  f: (a: A) => A
) => <K extends string>(r: Record<K, A>) => Option<Record<K, A>>
```

Added in v2.0.0

## partitionMapWithIndex

**Signature**

```ts
export declare const partitionMapWithIndex: <K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
) => (fa: Record<K, A>) => Separated<Record<string, B>, Record<string, C>>
```

Added in v2.0.0

## partitionWithIndex

**Signature**

```ts
export declare function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, B>>
export declare function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): <B extends A>(fb: Record<K, B>) => Separated<Record<string, B>, Record<string, B>>
export declare function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, A>>
```

Added in v2.0.0

## pop

Delete a key and value from a `Record`, returning the value as well as the subsequent `Record`.

**Signature**

```ts
export declare function pop<K extends string>(
  k: K
): <KS extends string, A>(r: Record<KS, A>) => Option<[A, Record<string extends K ? string : Exclude<KS, K>, A>]>
```

Added in v2.0.0

## reduceRightWithIndex

**Signature**

```ts
export declare function reduceRightWithIndex(
  O: Ord<string>
): <K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B) => (fa: Record<K, A>) => B
export declare function reduceRightWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, a: A, b: B) => B
): (fa: Record<K, A>) => B
```

Added in v2.0.0

## reduceWithIndex

**Signature**

```ts
export declare function reduceWithIndex(
  O: Ord<string>
): <K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B) => (fa: Record<K, A>) => B
export declare function reduceWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, b: B, a: A) => B
): (fa: Record<K, A>) => B
```

Added in v2.0.0

## sequence

**Signature**

```ts
export declare function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A>(ta: Record<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, Record<K, A>>
export declare function sequence<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A>(ta: Record<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, Record<K, A>>
export declare function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A>(ta: Record<K, Kind2<F, E, A>>) => Kind2<F, E, Record<K, A>>
export declare function sequence<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A>(ta: Record<K, Kind2<F, E, A>>) => Kind2<F, E, Record<K, A>>
export declare function sequence<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A>(ta: Record<K, Kind<F, A>>) => Kind<F, Record<K, A>>
export declare function sequence<F>(
  F: Applicative<F>
): <K extends string, A>(ta: Record<K, HKT<F, A>>) => HKT<F, Record<K, A>>
```

Added in v2.0.0

## singleton

Create a `Record` with one key/value pair.

**Signature**

```ts
export declare const singleton: <A>(k: string, a: A) => Record<string, A>
```

Added in v2.0.0

## size

Calculate the number of key/value pairs in a `Record`.

**Signature**

```ts
export declare const size: <A>(r: Record<string, A>) => number
```

Added in v2.0.0

## some

**Signature**

```ts
export declare const some: <A>(predicate: (a: A) => boolean) => (r: Record<string, A>) => boolean
```

Added in v2.0.0

## toArray

Get a sorted `Array` of the key/value pairs contained in a `Record`.

**Signature**

```ts
export declare const toArray: <K extends string, A>(r: Record<K, A>) => [K, A][]
```

Added in v2.0.0

## toUnfoldable

Unfolds a `Record` into a list of key/value pairs.

**Signature**

```ts
export declare function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K extends string, A>(r: Record<K, A>) => Kind<F, [K, A]>
export declare function toUnfoldable<F>(U: Unfoldable<F>): <K extends string, A>(r: Record<K, A>) => HKT<F, [K, A]>
```

Added in v2.0.0

## traverse

**Signature**

```ts
export declare function traverse<F extends URIS3>(
  F: Applicative3<F>
): <R, E, A, B>(f: (a: A) => Kind3<F, R, E, B>) => <K extends string>(ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export declare function traverse<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <R, A, B>(f: (a: A) => Kind3<F, R, E, B>) => <K extends string>(ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export declare function traverse<F extends URIS2>(
  F: Applicative2<F>
): <E, A, B>(f: (a: A) => Kind2<F, E, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export declare function traverse<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A, B>(f: (a: A) => Kind2<F, E, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export declare function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Kind<F, B>) => <K extends string>(ta: Record<K, A>) => Kind<F, Record<K, B>>
export declare function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: Record<K, A>) => HKT<F, Record<K, B>>
```

Added in v2.0.0

## traverseWithIndex

**Signature**

```ts
export declare function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export declare function traverseWithIndex<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: Record<K, A>) => Kind3<F, R, E, Record<K, B>>
export declare function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A, B>(f: (k: K, a: A) => Kind2<F, E, B>) => (ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export declare function traverseWithIndex<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A, B>(f: (k: K, a: A) => Kind2<F, E, B>) => (ta: Record<K, A>) => Kind2<F, E, Record<K, B>>
export declare function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(f: (k: K, a: A) => Kind<F, B>) => (ta: Record<K, A>) => Kind<F, Record<K, B>>
export declare function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: Record<K, A>) => HKT<F, Record<K, B>>
```

Added in v2.0.0

## updateAt

**Signature**

```ts
export declare const updateAt: <A>(k: string, a: A) => <K extends string>(r: Record<K, A>) => Option<Record<K, A>>
```

Added in v2.0.0

## ~~empty~~

Use a new `{}` instead.

**Signature**

```ts
export declare const empty: Record<string, never>
```

Added in v2.0.0

## ~~hasOwnProperty (function)~~

Use [`has`](#has) instead.

**Signature**

```ts
export declare const hasOwnProperty: <K extends string>(k: string, r: Record<K, unknown>) => k is K
```

Added in v2.0.0

## ~~insertAt~~

Use [`upsertAt`](#upsertat) instead.

**Signature**

```ts
export declare const insertAt: <A>(k: string, a: A) => (r: Record<string, A>) => Record<string, A>
```

Added in v2.0.0
