---
title: ReadonlyRecord.ts
nav_order: 82
parent: Modules
---

## ReadonlyRecord overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filterMap](#filtermap)
  - [partitionMap](#partitionmap)
- [FilterableE](#filterablee)
  - [getFilterMapE](#getfiltermape)
  - [getPartitionMapE](#getpartitionmape)
- [FilterableWithIndex](#filterablewithindex)
  - [filterMapWithIndex](#filtermapwithindex)
  - [partitionMapWithIndex](#partitionmapwithindex)
- [Foldable](#foldable)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [FunctorWithIndex](#functorwithindex)
  - [mapWithIndex](#mapwithindex)
- [HKT](#hkt)
  - [ReadonlyRecordF (interface)](#readonlyrecordf-interface)
- [combinators](#combinators)
  - [deleteAt](#deleteat)
  - [flap](#flap)
  - [insertAt](#insertat)
  - [modifyAt](#modifyat)
  - [pop](#pop)
  - [updateAt](#updateat)
  - [upsertAt](#upsertat)
- [constructors](#constructors)
  - [fromFoldable](#fromfoldable)
  - [singleton](#singleton)
- [instances](#instances)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [FilterableWithIndex](#filterablewithindex-1)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [getDifferenceMagma](#getdifferencemagma)
  - [getEq](#geteq)
  - [getFilterableE](#getfilterablee)
  - [getFoldable](#getfoldable)
  - [getFoldableWithIndex](#getfoldablewithindex)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getMonoid](#getmonoid)
  - [getShow](#getshow)
  - [getTraversable](#gettraversable)
  - [getTraversableWithIndex](#gettraversablewithindex)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
- [model](#model)
  - [ReadonlyRecord (type alias)](#readonlyrecord-type-alias)
- [utils](#utils)
  - [collect](#collect)
  - [difference](#difference)
  - [elem](#elem)
  - [empty](#empty)
  - [every](#every)
  - [filter](#filter)
  - [filterWithIndex](#filterwithindex)
  - [foldMap](#foldmap)
  - [foldMapWithIndex](#foldmapwithindex)
  - [fromEntries](#fromentries)
  - [has](#has)
  - [intersection](#intersection)
  - [isEmpty](#isempty)
  - [isSubrecord](#issubrecord)
  - [keys](#keys)
  - [lookup](#lookup)
  - [partition](#partition)
  - [partitionWithIndex](#partitionwithindex)
  - [reduce](#reduce)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
  - [refine](#refine)
  - [refineWithIndex](#refinewithindex)
  - [refinement](#refinement)
  - [refinementWithIndex](#refinementwithindex)
  - [sequence](#sequence)
  - [size](#size)
  - [some](#some)
  - [toEntries](#toentries)
  - [toReadonlyArray](#toreadonlyarray)
  - [toUnfoldable](#tounfoldable)
  - [traverse](#traverse)
  - [traverseWithIndex](#traversewithindex)
  - [union](#union)

---

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(r: Readonly<Record<string, option.Option<A>>>) => Readonly<Record<string, A>>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(
  r: Readonly<Record<string, Either<A, B>>>
) => readonly [Readonly<Record<string, A>>, Readonly<Record<string, B>>]
```

Added in v3.0.0

# Filterable

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(
  f: (a: A) => option.Option<B>
) => (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Readonly<Record<string, A>>) => readonly [Readonly<Record<string, B>>, Readonly<Record<string, C>>]
```

Added in v3.0.0

# FilterableE

## getFilterMapE

**Signature**

```ts
export declare const getFilterMapE: (
  O: Ord<string>
) => <F extends HKT>(
  F: Applicative<F>
) => <A, S, R, W, E, B>(
  f: (a: A) => Kind<F, S, R, W, E, option.Option<B>>
) => (ta: Readonly<Record<string, A>>) => Kind<F, S, R, W, E, Readonly<Record<string, B>>>
```

Added in v3.0.0

## getPartitionMapE

**Signature**

```ts
export declare const getPartitionMapE: (
  O: Ord<string>
) => <F extends HKT>(
  F: Applicative<F>
) => <A, S, R, W, E, B, C>(
  f: (a: A) => Kind<F, S, R, W, E, Either<B, C>>
) => (
  wa: Readonly<Record<string, A>>
) => Kind<F, S, R, W, E, readonly [Readonly<Record<string, B>>, Readonly<Record<string, C>>]>
```

Added in v3.0.0

# FilterableWithIndex

## filterMapWithIndex

**Signature**

```ts
export declare function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (r: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
```

Added in v3.0.0

## partitionMapWithIndex

**Signature**

```ts
export declare function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (r: ReadonlyRecord<K, A>) => readonly [ReadonlyRecord<string, B>, ReadonlyRecord<string, C>]
```

Added in v3.0.0

# Foldable

## reduceRight

**Signature**

```ts
export declare const reduceRight: (
  O: Ord<string>
) => <B, A>(b: B, f: (a: A, b: B) => B) => (r: Readonly<Record<string, A>>) => B
```

Added in v3.0.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(
  f: (a: A) => B
) => <K extends string>(r: Readonly<Record<K, A>>) => Readonly<Record<K, B>>
```

Added in v3.0.0

# FunctorWithIndex

## mapWithIndex

Map a `ReadonlyRecord` passing both the keys and values to the iterating function.

**Signature**

```ts
export declare function mapWithIndex<K extends string, A, B>(
  f: (k: K, a: A) => B
): (r: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
```

Added in v3.0.0

# HKT

## ReadonlyRecordF (interface)

**Signature**

```ts
export interface ReadonlyRecordF extends HKT {
  readonly type: ReadonlyRecord<string, this['Covariant1']>
}
```

Added in v3.0.0

# combinators

## deleteAt

Delete the element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const deleteAt: (
  k: string
) => <A>(r: Readonly<Record<string, A>>) => option.Option<Readonly<Record<string, A>>>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Readonly<Record<string, (a: A) => B>>) => Readonly<Record<string, B>>
```

Added in v3.0.0

## insertAt

Insert an element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key already exists.

**Signature**

```ts
export declare const insertAt: <A>(
  k: string,
  a: A
) => (r: Readonly<Record<string, A>>) => option.Option<Readonly<Record<string, A>>>
```

Added in v3.0.0

## modifyAt

Apply a function to the element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const modifyAt: <A>(
  k: string,
  f: Endomorphism<A>
) => (r: Readonly<Record<string, A>>) => option.Option<Readonly<Record<string, A>>>
```

Added in v3.0.0

## pop

Delete the element at the specified key, returning the value as well as the subsequent `ReadonlyRecord`,
or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const pop: (
  k: string
) => <A>(r: Readonly<Record<string, A>>) => option.Option<readonly [A, Readonly<Record<string, A>>]>
```

Added in v3.0.0

## updateAt

Change the element at the specified keys, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const updateAt: <A>(
  k: string,
  a: A
) => (r: Readonly<Record<string, A>>) => option.Option<Readonly<Record<string, A>>>
```

Added in v3.0.0

## upsertAt

Insert or replace a key/value pair in a `ReadonlyRecord`.

**Signature**

```ts
export declare const upsertAt: <A>(k: string, a: A) => (r: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

Added in v3.0.0

# constructors

## fromFoldable

Create a `ReadonlyRecord` from a `Foldable` collection of key/value pairs, using the
specified `Magma` to combine values for duplicate keys, and the specified `f` to map to key/value pairs.

**Signature**

```ts
export declare function fromFoldable<F extends HKT>(
  F: Foldable<F>
): <B>(
  M: Magma<B>
) => <A>(f: (a: A) => readonly [string, B]) => <S, R, W, E>(r: Kind<F, S, R, W, E, A>) => ReadonlyRecord<string, B>
```

Added in v3.0.0

## singleton

Create a `ReadonlyRecord` from one key/value pair.

**Signature**

```ts
export declare const singleton: <A>(k: string, a: A) => Readonly<Record<string, A>>
```

Added in v3.0.0

# instances

## Compactable

**Signature**

```ts
export declare const Compactable: compactable.Compactable<ReadonlyRecordF>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: filterable.Filterable<ReadonlyRecordF>
```

Added in v3.0.0

## FilterableWithIndex

**Signature**

```ts
export declare const FilterableWithIndex: filterableWithIndex.FilterableWithIndex<ReadonlyRecordF, string>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReadonlyRecordF>
```

Added in v3.0.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: functorWithIndex.FunctorWithIndex<ReadonlyRecordF, string>
```

Added in v3.0.0

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <A>() => Magma<Readonly<Record<string, A>>>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare function getEq<A, K extends string>(E: Eq<A>): Eq<ReadonlyRecord<K, A>>
```

Added in v3.0.0

## getFilterableE

**Signature**

```ts
export declare const getFilterableE: (O: Ord<string>) => filterableE.FilterableE<ReadonlyRecordF>
```

Added in v3.0.0

## getFoldable

**Signature**

```ts
export declare const getFoldable: (O: Ord<string>) => Foldable<ReadonlyRecordF>
```

Added in v3.0.0

## getFoldableWithIndex

**Signature**

```ts
export declare const getFoldableWithIndex: (
  O: Ord<string>
) => foldableWithIndex.FoldableWithIndex<ReadonlyRecordF, string>
```

Added in v3.0.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(S: Semigroup<A>) => Semigroup<Readonly<Record<string, A>>>
```

Added in v3.0.0

## getMonoid

Returns a `Monoid` instance for `ReadonlyRecord`s given a `Semigroup` instance for their values.

**Signature**

```ts
export declare function getMonoid<A, K extends string>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>>
```

**Example**

```ts
import * as N from 'fp-ts/number'
import { getMonoid } from 'fp-ts/ReadonlyRecord'
import { pipe } from 'fp-ts/function'

const M = getMonoid(N.SemigroupSum)
assert.deepStrictEqual(pipe({ foo: 123 }, M.combine({ foo: 456 })), { foo: 579 })
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: (O: Ord<string>) => <A>(S: Show<A>) => Show<Readonly<Record<string, A>>>
```

Added in v3.0.0

## getTraversable

**Signature**

```ts
export declare const getTraversable: (O: Ord<string>) => traversable.Traversable<ReadonlyRecordF>
```

Added in v3.0.0

## getTraversableWithIndex

**Signature**

```ts
export declare const getTraversableWithIndex: (
  O: Ord<string>
) => traversableWithIndex.TraversableWithIndex<ReadonlyRecordF, string>
```

Added in v3.0.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <A>(S: Semigroup<A>) => Monoid<Readonly<Record<string, A>>>
```

Added in v3.0.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(S: Semigroup<A>) => Semigroup<Readonly<Record<string, A>>>
```

Added in v3.0.0

# model

## ReadonlyRecord (type alias)

**Signature**

```ts
export type ReadonlyRecord<K extends string, T> = Readonly<Record<K, T>>
```

Added in v3.0.0

# utils

## collect

Map a `ReadonlyRecord` into an `ReadonlyArray`.

**Signature**

```ts
export declare const collect: (
  O: Ord<string>
) => <K extends string, A, B>(f: (k: K, a: A) => B) => (r: Readonly<Record<K, A>>) => readonly B[]
```

**Example**

```ts
import { collect } from 'fp-ts/ReadonlyRecord'
import * as S from 'fp-ts/string'

const x: { a: string; b: boolean } = { a: 'foo', b: false }
assert.deepStrictEqual(collect(S.Ord)((key, val) => ({ key: key, value: val }))(x), [
  { key: 'a', value: 'foo' },
  { key: 'b', value: false },
])
```

Added in v3.0.0

## difference

**Signature**

```ts
export declare const difference: <A>(
  second: Readonly<Record<string, A>>
) => (self: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `ReadonlyRecord`.

**Signature**

```ts
export declare const elem: <A>(E: eq.Eq<A>) => (a: A) => (r: Readonly<Record<string, A>>) => boolean
```

Added in v3.0.0

## empty

An empty `ReadonlyRecord`.

**Signature**

```ts
export declare const empty: Readonly<Record<string, never>>
```

Added in v3.0.0

## every

**Signature**

```ts
export declare function every<A, B extends A>(
  refinement: Refinement<A, B>
): Refinement<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export declare function every<A>(predicate: Predicate<A>): Predicate<ReadonlyRecord<string, A>>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: <B extends A, A = B>(
  predicate: Predicate<A>
) => (fb: Readonly<Record<string, B>>) => Readonly<Record<string, B>>
```

Added in v3.0.0

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: <B extends A, A = B>(
  predicate: (i: string, a: A) => boolean
) => (fb: Readonly<Record<string, B>>) => Readonly<Record<string, B>>
```

Added in v3.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: (
  O: Ord<string>
) => <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (r: Readonly<Record<string, A>>) => M
```

Added in v3.0.0

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: (
  O: Ord<string>
) => <M>(M: Monoid<M>) => <K extends string, A>(f: (k: K, a: A) => M) => (r: Readonly<Record<K, A>>) => M
```

Added in v3.0.0

## fromEntries

Converts a `ReadonlyArray` of `[key, value]` tuples into a `ReadonlyRecord`.

**Signature**

```ts
export declare const fromEntries: <A>(fa: readonly (readonly [string, A])[]) => Readonly<Record<string, A>>
```

**Example**

```ts
import { fromEntries } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(
  fromEntries([
    ['a', 1],
    ['b', 2],
    ['a', 3],
  ]),
  { b: 2, a: 3 }
)
```

Added in v3.0.0

## has

Test whether or not a key exists in a `ReadonlyRecord`.

Note. This function is not pipeable because is a custom type guard.

**Signature**

```ts
export declare const has: <K extends string>(k: string, r: Readonly<Record<K, unknown>>) => k is K
```

Added in v3.0.0

## intersection

**Signature**

```ts
export declare const intersection: <A>(
  M: Magma<A>
) => (second: Readonly<Record<string, A>>) => (self: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

Added in v3.0.0

## isEmpty

Test whether a `ReadonlyRecord` is empty.

**Signature**

```ts
export declare const isEmpty: <A>(r: Readonly<Record<string, A>>) => r is Readonly<Record<string, never>>
```

Added in v3.0.0

## isSubrecord

Test whether one `ReadonlyRecord` contains all of the keys and values contained in another `ReadonlyRecord`.

**Signature**

```ts
export declare const isSubrecord: <A>(
  E: eq.Eq<A>
) => (second: Readonly<Record<string, A>>) => (self: Readonly<Record<string, A>>) => boolean
```

Added in v3.0.0

## keys

**Signature**

```ts
export declare const keys: (O: Ord<string>) => <K extends string>(r: Readonly<Record<K, unknown>>) => readonly K[]
```

Added in v3.0.0

## lookup

Lookup the value for a key in a `ReadonlyRecord`.

**Signature**

```ts
export declare const lookup: (k: string) => <A>(r: Readonly<Record<string, A>>) => option.Option<A>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: <B extends A, A = B>(
  predicate: Predicate<A>
) => (fb: Readonly<Record<string, B>>) => readonly [Readonly<Record<string, B>>, Readonly<Record<string, B>>]
```

Added in v3.0.0

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: <B extends A, A = B>(
  predicate: (i: string, a: A) => boolean
) => (fb: Readonly<Record<string, B>>) => readonly [Readonly<Record<string, B>>, Readonly<Record<string, B>>]
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: (
  O: Ord<string>
) => <B, A>(b: B, f: (b: B, a: A) => B) => (r: Readonly<Record<string, A>>) => B
```

Added in v3.0.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: (
  O: Ord<string>
) => <B, K extends string, A>(b: B, f: (k: K, a: A, b: B) => B) => (r: Readonly<Record<K, A>>) => B
```

Added in v3.0.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: (
  O: Ord<string>
) => <B, K extends string, A>(b: B, f: (k: K, b: B, a: A) => B) => (r: Readonly<Record<K, A>>) => B
```

Added in v3.0.0

## refine

**Signature**

```ts
export declare const refine: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (fc: Readonly<Record<string, C>>) => Readonly<Record<string, B>>
```

Added in v3.0.0

## refineWithIndex

**Signature**

```ts
export declare const refineWithIndex: <C extends A, B extends A, A = C>(
  refinement: (i: string, a: A) => a is B
) => (fc: Readonly<Record<string, C>>) => Readonly<Record<string, B>>
```

Added in v3.0.0

## refinement

**Signature**

```ts
export declare const refinement: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (fc: Readonly<Record<string, C>>) => readonly [Readonly<Record<string, C>>, Readonly<Record<string, B>>]
```

Added in v3.0.0

## refinementWithIndex

**Signature**

```ts
export declare const refinementWithIndex: <C extends A, B extends A, A = C>(
  refinement: (i: string, a: A) => a is B
) => (fb: Readonly<Record<string, C>>) => readonly [Readonly<Record<string, C>>, Readonly<Record<string, B>>]
```

Added in v3.0.0

## sequence

**Signature**

```ts
export declare const sequence: (
  O: Ord<string>
) => <F extends HKT>(
  F: Applicative<F>
) => <K extends string, S, R, W, E, A>(
  ta: Readonly<Record<K, Kind<F, S, R, W, E, A>>>
) => Kind<F, S, R, W, E, Readonly<Record<K, A>>>
```

Added in v3.0.0

## size

Calculate the number of key/value pairs in a `ReadonlyRecord`.

**Signature**

```ts
export declare const size: <A>(r: Readonly<Record<string, A>>) => number
```

Added in v3.0.0

## some

**Signature**

```ts
export declare const some: <A>(predicate: (a: A) => boolean) => (r: Readonly<Record<string, A>>) => boolean
```

Added in v3.0.0

## toEntries

Converts a `ReadonlyRecord` into a `ReadonlyArray` of `[key, value]` tuples.

**Signature**

```ts
export declare const toEntries: <K extends string, A>(r: Readonly<Record<K, A>>) => readonly (readonly [K, A])[]
```

**Example**

```ts
import { toEntries } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(toEntries({ a: 1, b: 2 }), [
  ['a', 1],
  ['b', 2],
])
```

Added in v3.0.0

## toReadonlyArray

Get a sorted `ReadonlyArray` of the key/value pairs contained in a `ReadonlyRecord`.

**Signature**

```ts
export declare const toReadonlyArray: (
  O: Ord<string>
) => <K extends string, A>(r: Readonly<Record<K, A>>) => readonly (readonly [K, A])[]
```

Added in v3.0.0

## toUnfoldable

Unfolds a `ReadonlyRecord` into a data structure of key/value pairs.

**Signature**

```ts
export declare function toUnfoldable(
  O: Ord<string>
): <F extends HKT>(
  U: Unfoldable<F>
) => <K extends string, A, S, R, W, E>(r: ReadonlyRecord<K, A>) => Kind<F, S, R, W, E, readonly [K, A]>
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare function traverse(
  O: Ord<string>
): <F extends HKT>(
  F: Applicative<F>
) => <A, S, R, W, E, B>(
  f: (a: A) => Kind<F, S, R, W, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind<F, S, R, W, E, ReadonlyRecord<K, B>>
```

Added in v3.0.0

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: (
  O: Ord<string>
) => <F extends HKT>(
  F: Applicative<F>
) => <K extends string, A, S, R, W, E, B>(
  f: (k: K, a: A) => Kind<F, S, R, W, E, B>
) => (r: Readonly<Record<K, A>>) => Kind<F, S, R, W, E, Readonly<Record<K, B>>>
```

Added in v3.0.0

## union

**Signature**

```ts
export declare const union: <A>(
  M: Magma<A>
) => (second: Readonly<Record<string, A>>) => (self: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

Added in v3.0.0
