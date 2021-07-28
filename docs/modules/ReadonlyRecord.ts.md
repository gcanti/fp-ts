---
title: ReadonlyRecord.ts
nav_order: 85
parent: Modules
---

## ReadonlyRecord overview

Added in v2.5.0

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
  - [deleteAt](#deleteat)
  - [difference](#difference)
  - [filterMapWithIndex](#filtermapwithindex)
  - [flap](#flap)
  - [intersection](#intersection)
  - [map](#map)
  - [mapWithIndex](#mapwithindex)
  - [union](#union)
  - [upsertAt](#upsertat)
  - [~~insertAt~~](#insertat)
- [constructors](#constructors)
  - [singleton](#singleton)
- [destructors](#destructors)
  - [toUnfoldable](#tounfoldable)
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
  - [~~readonlyRecord~~](#readonlyrecord)
- [interop](#interop)
  - [fromRecord](#fromrecord)
  - [toRecord](#torecord)
- [model](#model)
  - [ReadonlyRecord (type alias)](#readonlyrecord-type-alias)
- [utils](#utils)
  - [collect](#collect)
  - [elem](#elem)
  - [empty](#empty)
  - [every](#every)
  - [filterWithIndex](#filterwithindex)
  - [foldMapWithIndex](#foldmapwithindex)
  - [fromFoldable](#fromfoldable)
  - [fromFoldableMap](#fromfoldablemap)
  - [has](#has)
  - [isEmpty](#isempty)
  - [isSubrecord](#issubrecord)
  - [keys](#keys)
  - [lookup](#lookup)
  - [modifyAt](#modifyat)
  - [partitionMapWithIndex](#partitionmapwithindex)
  - [partitionWithIndex](#partitionwithindex)
  - [pop](#pop)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
  - [sequence](#sequence)
  - [size](#size)
  - [some](#some)
  - [toReadonlyArray](#toreadonlyarray)
  - [traverse](#traverse)
  - [traverseWithIndex](#traversewithindex)
  - [updateAt](#updateat)
  - [~~hasOwnProperty (function)~~](#hasownproperty-function)

---

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(r: Readonly<Record<string, Option<A>>>) => Readonly<Record<string, A>>
```

Added in v2.5.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(
  r: Readonly<Record<string, Either<A, B>>>
) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>>
```

Added in v2.5.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Readonly<Record<string, B>>) => Readonly<Record<string, B>>
  <A>(predicate: Predicate<A>): (fa: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
}
```

Added in v2.5.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(
  f: (a: A) => Option<B>
) => (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>
```

Added in v2.5.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fa: Readonly<Record<string, A>>
  ) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>>
  <A>(predicate: Predicate<A>): <B extends A>(
    fb: Readonly<Record<string, B>>
  ) => Separated<Readonly<Record<string, B>>, Readonly<Record<string, B>>>
  <A>(predicate: Predicate<A>): (
    fa: Readonly<Record<string, A>>
  ) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, A>>>
}
```

Added in v2.5.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Readonly<Record<string, A>>) => Separated<Readonly<Record<string, B>>, Readonly<Record<string, C>>>
```

Added in v2.5.0

# Foldable

## foldMap

**Signature**

```ts
export declare function foldMap(
  O: Ord<string>
): <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: ReadonlyRecord<string, A>) => M
export declare function foldMap<M>(M: Monoid<M>): <A>(f: (a: A) => M) => (fa: ReadonlyRecord<string, A>) => M
```

Added in v2.5.0

## reduce

**Signature**

```ts
export declare function reduce(
  O: Ord<string>
): <A, B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyRecord<string, A>) => B
export declare function reduce<A, B>(b: B, f: (b: B, a: A) => B): (fa: ReadonlyRecord<string, A>) => B
```

Added in v2.5.0

## reduceRight

**Signature**

```ts
export declare function reduceRight(
  O: Ord<string>
): <A, B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyRecord<string, A>) => B
export declare function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): (fa: ReadonlyRecord<string, A>) => B
```

Added in v2.5.0

# Witherable

## wilt

**Signature**

```ts
export declare const wilt: PipeableWilt1<'ReadonlyRecord'>
```

Added in v2.6.5

## wither

**Signature**

```ts
export declare const wither: PipeableWither1<'ReadonlyRecord'>
```

Added in v2.6.5

# combinators

## deleteAt

Delete a key and value from a `ReadonlyRecord`.

**Signature**

```ts
export declare function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: ReadonlyRecord<KS, A>) => ReadonlyRecord<string extends K ? string : Exclude<KS, K>, A>
```

Added in v2.5.0

## difference

**Signature**

```ts
export declare const difference: <A>(
  second: Readonly<Record<string, A>>
) => (first: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

Added in v2.11.0

## filterMapWithIndex

**Signature**

```ts
export declare function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
```

Added in v2.5.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Readonly<Record<string, (a: A) => B>>) => Readonly<Record<string, B>>
```

Added in v2.10.0

## intersection

**Signature**

```ts
export declare const intersection: <A>(
  M: Magma<A>
) => (second: Readonly<Record<string, A>>) => (first: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

Added in v2.11.0

## map

Map a `ReadonlyRecord` passing the values to the iterating function.

**Signature**

```ts
export declare function map<A, B>(f: (a: A) => B): <K extends string>(fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
```

Added in v2.5.0

## mapWithIndex

Map a `ReadonlyRecord` passing the keys to the iterating function.

**Signature**

```ts
export declare function mapWithIndex<K extends string, A, B>(
  f: (k: K, a: A) => B
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
```

Added in v2.5.0

## union

**Signature**

```ts
export declare const union: <A>(
  M: Magma<A>
) => (second: Readonly<Record<string, A>>) => (first: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

Added in v2.11.0

## upsertAt

Insert or replace a key/value pair in a `ReadonlyRecord`.

**Signature**

```ts
export declare const upsertAt: <A>(k: string, a: A) => (r: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

Added in v2.10.0

## ~~insertAt~~

Use [`upsertAt`](#upsertat) instead.

**Signature**

```ts
export declare const insertAt: <A>(k: string, a: A) => (r: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

Added in v2.5.0

# constructors

## singleton

Create a `ReadonlyRecord` with one key/value pair.

**Signature**

```ts
export declare const singleton: <A>(k: string, a: A) => Readonly<Record<string, A>>
```

Added in v2.5.0

# destructors

## toUnfoldable

Unfolds a `ReadonlyRecord` into a list of key/value pairs.

**Signature**

```ts
export declare function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => Kind<F, readonly [K, A]>
export declare function toUnfoldable<F>(
  U: Unfoldable<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => HKT<F, readonly [K, A]>
```

Added in v2.5.0

# instances

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'ReadonlyRecord'>
```

Added in v2.7.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'ReadonlyRecord'>
```

Added in v2.7.0

## FilterableWithIndex

**Signature**

```ts
export declare const FilterableWithIndex: FilterableWithIndex1<'ReadonlyRecord', string>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'ReadonlyRecord'>
```

Added in v2.7.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'ReadonlyRecord', string>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'ReadonlyRecord'
```

Added in v2.5.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <A>() => Magma<Readonly<Record<string, A>>>
```

Added in v2.11.0

## getEq

**Signature**

```ts
export declare function getEq<K extends string, A>(E: Eq<A>): Eq<ReadonlyRecord<K, A>>
```

Added in v2.5.0

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
export declare const getIntersectionSemigroup: <A>(S: Semigroup<A>) => Semigroup<Readonly<Record<string, A>>>
```

Added in v2.11.0

## getMonoid

Returns a `Monoid` instance for `ReadonlyRecord`s given a `Semigroup` instance for their values.

**Signature**

```ts
export declare function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>>
```

**Example**

```ts
import { SemigroupSum } from 'fp-ts/number'
import { getMonoid } from 'fp-ts/ReadonlyRecord'

const M = getMonoid(SemigroupSum)
assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
```

Added in v2.5.0

## getShow

**Signature**

```ts
export declare function getShow(O: Ord<string>): <A>(S: Show<A>) => Show<ReadonlyRecord<string, A>>
export declare function getShow<A>(S: Show<A>): Show<ReadonlyRecord<string, A>>
```

Added in v2.5.0

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
export declare const getUnionMonoid: <A>(S: Semigroup<A>) => Monoid<Readonly<Record<string, A>>>
```

Added in v2.11.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(S: Semigroup<A>) => Semigroup<Readonly<Record<string, A>>>
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
export declare const FoldableWithIndex: FoldableWithIndex1<'ReadonlyRecord', string>
```

Added in v2.7.0

## ~~Foldable~~

Use `getFoldable` instead.

**Signature**

```ts
export declare const Foldable: Foldable1<'ReadonlyRecord'>
```

Added in v2.7.0

## ~~TraversableWithIndex~~

Use `getTraversableWithIndex` instead.

**Signature**

```ts
export declare const TraversableWithIndex: TraversableWithIndex1<'ReadonlyRecord', string>
```

Added in v2.7.0

## ~~Traversable~~

Use `getTraversable` instead.

**Signature**

```ts
export declare const Traversable: Traversable1<'ReadonlyRecord'>
```

Added in v2.7.0

## ~~Witherable~~

Use `getWitherable` instead.

**Signature**

```ts
export declare const Witherable: Witherable1<'ReadonlyRecord'>
```

Added in v2.7.0

## ~~readonlyRecord~~

Use small, specific instances instead.

**Signature**

```ts
export declare const readonlyRecord: FunctorWithIndex1<'ReadonlyRecord', string> &
  FoldableWithIndex1<'ReadonlyRecord', string> &
  FilterableWithIndex1<'ReadonlyRecord', string> &
  TraversableWithIndex1<'ReadonlyRecord', string> &
  Witherable1<'ReadonlyRecord'>
```

Added in v2.5.0

# interop

## fromRecord

**Signature**

```ts
export declare const fromRecord: <K extends string, A>(r: Record<K, A>) => Readonly<Record<K, A>>
```

Added in v2.5.0

## toRecord

**Signature**

```ts
export declare const toRecord: <K extends string, A>(r: Readonly<Record<K, A>>) => Record<K, A>
```

Added in v2.5.0

# model

## ReadonlyRecord (type alias)

**Signature**

```ts
export type ReadonlyRecord<K extends string, T> = Readonly<Record<K, T>>
```

Added in v2.5.0

# utils

## collect

Map a `ReadonlyRecord` into an `ReadonlyArray`.

**Signature**

```ts
export declare function collect(
  O: Ord<string>
): <K extends string, A, B>(f: (k: K, a: A) => B) => (r: ReadonlyRecord<K, A>) => ReadonlyArray<B>
export declare function collect<K extends string, A, B>(
  f: (k: K, a: A) => B
): (r: ReadonlyRecord<K, A>) => ReadonlyArray<B>
```

**Example**

```ts
import { collect } from 'fp-ts/ReadonlyRecord'
import { Ord } from 'fp-ts/string'

const x: { readonly a: string; readonly b: boolean } = { a: 'c', b: false }
assert.deepStrictEqual(collect(Ord)((key, val) => ({ key: key, value: val }))(x), [
  { key: 'a', value: 'c' },
  { key: 'b', value: false },
])
```

Added in v2.5.0

## elem

**Signature**

```ts
export declare function elem<A>(
  E: Eq<A>
): {
  (a: A): (fa: ReadonlyRecord<string, A>) => boolean
  (a: A, fa: ReadonlyRecord<string, A>): boolean
}
```

Added in v2.5.0

## empty

**Signature**

```ts
export declare const empty: Readonly<Record<string, never>>
```

Added in v2.5.0

## every

**Signature**

```ts
export declare function every<A>(predicate: Predicate<A>): (r: ReadonlyRecord<string, A>) => boolean
```

Added in v2.5.0

## filterWithIndex

**Signature**

```ts
export declare function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export declare function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): <B extends A>(fb: ReadonlyRecord<K, B>) => ReadonlyRecord<string, B>
export declare function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, A>
```

Added in v2.5.0

## foldMapWithIndex

**Signature**

```ts
export declare function foldMapWithIndex(
  O: Ord<string>
): <M>(M: Monoid<M>) => <K extends string, A>(f: (k: K, a: A) => M) => (fa: ReadonlyRecord<K, A>) => M
export declare function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: ReadonlyRecord<K, A>) => M
```

Added in v2.5.0

## fromFoldable

Create a `ReadonlyRecord` from a foldable collection of key/value pairs, using the
specified `Magma` to combine values for duplicate keys.

**Signature**

```ts
export declare function fromFoldable<F extends URIS3, A>(
  M: Magma<A>,
  F: Foldable3<F>
): <R, E>(fka: Kind3<F, R, E, readonly [string, A]>) => ReadonlyRecord<string, A>
export declare function fromFoldable<F extends URIS2, A>(
  M: Magma<A>,
  F: Foldable2<F>
): <E>(fka: Kind2<F, E, readonly [string, A]>) => ReadonlyRecord<string, A>
export declare function fromFoldable<F extends URIS, A>(
  M: Magma<A>,
  F: Foldable1<F>
): (fka: Kind<F, readonly [string, A]>) => ReadonlyRecord<string, A>
export declare function fromFoldable<F, A>(
  M: Magma<A>,
  F: FoldableHKT<F>
): (fka: HKT<F, readonly [string, A]>) => ReadonlyRecord<string, A>
```

Added in v2.5.0

## fromFoldableMap

Create a `ReadonlyRecord` from a foldable collection using the specified functions to:

- map to key/value pairs
- combine values for duplicate keys.

**Signature**

```ts
export declare function fromFoldableMap<F extends URIS3, B>(
  M: Magma<B>,
  F: Foldable3<F>
): <R, E, A>(fa: Kind3<F, R, E, A>, f: (a: A) => readonly [string, B]) => ReadonlyRecord<string, B>
export declare function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <E, A>(fa: Kind2<F, E, A>, f: (a: A) => readonly [string, B]) => ReadonlyRecord<string, B>
export declare function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A>(fa: Kind<F, A>, f: (a: A) => readonly [string, B]) => ReadonlyRecord<string, B>
export declare function fromFoldableMap<F, B>(
  M: Magma<B>,
  F: FoldableHKT<F>
): <A>(fa: HKT<F, A>, f: (a: A) => readonly [string, B]) => ReadonlyRecord<string, B>
```

**Example**

```ts
import { last } from 'fp-ts/Semigroup'
import { Foldable, zip } from 'fp-ts/ReadonlyArray'
import { identity } from 'fp-ts/function'
import { ReadonlyRecord, fromFoldableMap } from 'fp-ts/ReadonlyRecord'

export const zipObject = <K extends string, A>(
  keys: ReadonlyArray<K>,
  values: ReadonlyArray<A>
): ReadonlyRecord<K, A> => fromFoldableMap(last<A>(), Foldable)(zip(keys, values), identity)

assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

interface User {
  readonly id: string
  readonly name: string
}

const users: ReadonlyArray<User> = [
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

Added in v2.5.0

## has

Test whether or not a key exists in a `ReadonlyRecord`.

Note. This function is not pipeable because is a `Refinement`.

**Signature**

```ts
export declare const has: <K extends string>(k: string, r: Readonly<Record<K, unknown>>) => k is K
```

Added in v2.10.0

## isEmpty

Test whether a `ReadonlyRecord` is empty.

**Signature**

```ts
export declare const isEmpty: <A>(r: Readonly<Record<string, A>>) => boolean
```

Added in v2.5.0

## isSubrecord

Test whether one `ReadonlyRecord` contains all of the keys and values contained in another `ReadonlyRecord`.

**Signature**

```ts
export declare function isSubrecord<A>(
  E: Eq<A>
): {
  (that: ReadonlyRecord<string, A>): (me: ReadonlyRecord<string, A>) => boolean
  (me: ReadonlyRecord<string, A>, that: ReadonlyRecord<string, A>): boolean
}
```

Added in v2.5.0

## keys

**Signature**

```ts
export declare const keys: <K extends string>(r: Readonly<Record<K, unknown>>) => readonly K[]
```

Added in v2.5.0

## lookup

Lookup the value for a key in a `ReadonlyRecord`.

**Signature**

```ts
export declare function lookup(k: string): <A>(r: ReadonlyRecord<string, A>) => Option<A>
export declare function lookup<A>(k: string, r: ReadonlyRecord<string, A>): Option<A>
```

Added in v2.5.0

## modifyAt

**Signature**

```ts
export declare const modifyAt: <A>(
  k: string,
  f: (a: A) => A
) => <K extends string>(r: Readonly<Record<K, A>>) => Option<Readonly<Record<K, A>>>
```

Added in v2.5.0

## partitionMapWithIndex

**Signature**

```ts
export declare function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>>
```

Added in v2.5.0

## partitionWithIndex

**Signature**

```ts
export declare function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export declare function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): <B extends A>(fb: ReadonlyRecord<K, B>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, B>>
export declare function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>>
```

Added in v2.5.0

## pop

Delete a key and value from a `ReadonlyRecord`, returning the value as well as the subsequent `ReadonlyRecord`.

**Signature**

```ts
export declare function pop<K extends string>(
  k: K
): <KS extends string, A>(
  r: ReadonlyRecord<KS, A>
) => Option<readonly [A, ReadonlyRecord<string extends K ? string : Exclude<KS, K>, A>]>
```

Added in v2.5.0

## reduceRightWithIndex

**Signature**

```ts
export declare function reduceRightWithIndex(
  O: Ord<string>
): <K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B) => (fa: ReadonlyRecord<K, A>) => B
export declare function reduceRightWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, a: A, b: B) => B
): (fa: ReadonlyRecord<K, A>) => B
```

Added in v2.5.0

## reduceWithIndex

**Signature**

```ts
export declare function reduceWithIndex(
  O: Ord<string>
): <K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B) => (fa: ReadonlyRecord<K, A>) => B
export declare function reduceWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, b: B, a: A) => B
): (fa: ReadonlyRecord<K, A>) => B
```

Added in v2.5.0

## sequence

**Signature**

```ts
export declare function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A>(ta: ReadonlyRecord<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, ReadonlyRecord<K, A>>
export declare function sequence<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A>(ta: ReadonlyRecord<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, ReadonlyRecord<K, A>>
export declare function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A>(ta: ReadonlyRecord<K, Kind2<F, E, A>>) => Kind2<F, E, ReadonlyRecord<K, A>>
export declare function sequence<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A>(ta: ReadonlyRecord<K, Kind2<F, E, A>>) => Kind2<F, E, ReadonlyRecord<K, A>>
export declare function sequence<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A>(ta: ReadonlyRecord<K, Kind<F, A>>) => Kind<F, ReadonlyRecord<K, A>>
export declare function sequence<F>(
  F: Applicative<F>
): <K extends string, A>(ta: ReadonlyRecord<K, HKT<F, A>>) => HKT<F, ReadonlyRecord<K, A>>
```

Added in v2.5.0

## size

Calculate the number of key/value pairs in a `ReadonlyRecord`,

**Signature**

```ts
export declare const size: <A>(r: Readonly<Record<string, A>>) => number
```

Added in v2.5.0

## some

**Signature**

```ts
export declare function some<A>(predicate: (a: A) => boolean): (r: ReadonlyRecord<string, A>) => boolean
```

Added in v2.5.0

## toReadonlyArray

Get a sorted `ReadonlyArray` of the key/value pairs contained in a `ReadonlyRecord`.

**Signature**

```ts
export declare const toReadonlyArray: <K extends string, A>(r: Readonly<Record<K, A>>) => readonly (readonly [K, A])[]
```

Added in v2.5.0

## traverse

**Signature**

```ts
export declare function traverse<F extends URIS3>(
  F: Applicative3<F>
): <R, E, A, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export declare function traverse<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <R, A, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export declare function traverse<F extends URIS2>(
  F: Applicative2<F>
): <E, A, B>(
  f: (a: A) => Kind2<F, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export declare function traverse<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A, B>(
  f: (a: A) => Kind2<F, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export declare function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Kind<F, B>) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
export declare function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>>
```

Added in v2.5.0

## traverseWithIndex

**Signature**

```ts
export declare function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export declare function traverseWithIndex<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export declare function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A, B>(
  f: (k: K, a: A) => Kind2<F, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export declare function traverseWithIndex<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A, B>(
  f: (k: K, a: A) => Kind2<F, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export declare function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(
  f: (k: K, a: A) => Kind<F, B>
) => (ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
export declare function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>>
```

Added in v2.5.0

## updateAt

**Signature**

```ts
export declare const updateAt: <A>(
  k: string,
  a: A
) => <K extends string>(r: Readonly<Record<K, A>>) => Option<Readonly<Record<K, A>>>
```

Added in v2.5.0

## ~~hasOwnProperty (function)~~

Use [`has`](#has) instead.

**Signature**

```ts
export declare function hasOwnProperty<K extends string>(k: string, r: ReadonlyRecord<K, unknown>): k is K
```

Added in v2.5.0
