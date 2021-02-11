---
title: ReadonlyRecord.ts
nav_order: 69
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
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [FilterableWithIndex](#filterablewithindex)
  - [filterMapWithIndex](#filtermapwithindex)
  - [filterWithIndex](#filterwithindex)
  - [partitionMapWithIndex](#partitionmapwithindex)
  - [partitionWithIndex](#partitionwithindex)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [FoldableWithIndex](#foldablewithindex)
  - [foldMapWithIndex](#foldmapwithindex)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
- [Functor](#functor)
  - [map](#map)
- [FunctorWithIndex](#functorwithindex)
  - [mapWithIndex](#mapwithindex)
- [Traversable](#traversable)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [TraversableWithIndex](#traversablewithindex)
  - [traverseWithIndex](#traversewithindex)
- [Witherable](#witherable)
  - [wilt](#wilt)
  - [wither](#wither)
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
  - [Foldable](#foldable-1)
  - [FoldableWithIndex](#foldablewithindex-1)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [Traversable](#traversable-1)
  - [TraversableWithIndex](#traversablewithindex-1)
  - [URI (type alias)](#uri-type-alias)
  - [Witherable](#witherable-1)
  - [getEq](#geteq)
  - [getMonoid](#getmonoid)
  - [getShow](#getshow)
- [model](#model)
  - [ReadonlyRecord (type alias)](#readonlyrecord-type-alias)
- [utils](#utils)
  - [collect](#collect)
  - [elem](#elem)
  - [empty](#empty)
  - [every](#every)
  - [has](#has)
  - [isEmpty](#isempty)
  - [isSubrecord](#issubrecord)
  - [keys](#keys)
  - [lookup](#lookup)
  - [size](#size)
  - [some](#some)
  - [toReadonlyArray](#toreadonlyarray)
  - [toUnfoldable](#tounfoldable)

---

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(foa: Readonly<Record<string, O.Option<A>>>) => Readonly<Record<string, A>>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(
  fe: Readonly<Record<string, Either<A, B>>>
) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>>
```

Added in v3.0.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: Filter1<'ReadonlyRecord'>
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(
  f: (a: A) => O.Option<B>
) => (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: Partition1<'ReadonlyRecord'>
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Readonly<Record<string, A>>) => Separated<Readonly<Record<string, B>>, Readonly<Record<string, C>>>
```

Added in v3.0.0

# FilterableWithIndex

## filterMapWithIndex

**Signature**

```ts
export declare function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
```

Added in v3.0.0

## filterWithIndex

**Signature**

```ts
export declare function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export declare function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, A>
```

Added in v3.0.0

## partitionMapWithIndex

**Signature**

```ts
export declare function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>>
```

Added in v3.0.0

## partitionWithIndex

**Signature**

```ts
export declare function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export declare function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>>
```

Added in v3.0.0

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Readonly<Record<string, A>>) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: Readonly<Record<string, A>>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: Readonly<Record<string, A>>) => B
```

Added in v3.0.0

# FoldableWithIndex

## foldMapWithIndex

**Signature**

```ts
export declare function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: ReadonlyRecord<K, A>) => M
```

Added in v3.0.0

## reduceRightWithIndex

**Signature**

```ts
export declare function reduceRightWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, a: A, b: B) => B
): (fa: ReadonlyRecord<K, A>) => B
```

Added in v3.0.0

## reduceWithIndex

**Signature**

```ts
export declare function reduceWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, b: B, a: A) => B
): (fa: ReadonlyRecord<K, A>) => B
```

Added in v3.0.0

# Functor

## map

Map a `ReadonlyRecord` passing the values to the iterating function.

**Signature**

```ts
export declare function map<A, B>(f: (a: A) => B): <K extends string>(fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
```

Added in v3.0.0

# FunctorWithIndex

## mapWithIndex

Map a `ReadonlyRecord` passing both the keys and values to the iterating function.

**Signature**

```ts
export declare function mapWithIndex<K extends string, A, B>(
  f: (k: K, a: A) => B
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
```

Added in v3.0.0

# Traversable

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

Added in v3.0.0

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

Added in v3.0.0

# TraversableWithIndex

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

Added in v3.0.0

# Witherable

## wilt

**Signature**

```ts
export declare const wilt: Wilt1<'ReadonlyRecord'>
```

Added in v3.0.0

## wither

**Signature**

```ts
export declare const wither: Wither1<'ReadonlyRecord'>
```

Added in v3.0.0

# combinators

## deleteAt

Delete the element at the specified key, creating a new `ReadonlyRecord`.

**Signature**

```ts
export declare function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(r: ReadonlyRecord<KS, A>) => ReadonlyRecord<string extends K ? string : Exclude<KS, K>, A>
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
export declare function insertAt<K extends string, A>(
  k: K,
  a: A
): <KS extends string>(r: ReadonlyRecord<KS, A>) => Option<ReadonlyRecord<KS | K, A>>
```

Added in v3.0.0

## modifyAt

Apply a function to the element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const modifyAt: <A>(
  k: string,
  f: Endomorphism<A>
) => <K extends string>(r: Readonly<Record<K, A>>) => O.Option<Readonly<Record<K, A>>>
```

Added in v3.0.0

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

Added in v3.0.0

## updateAt

Change the element at the specified keys, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const updateAt: <A>(
  k: string,
  a: A
) => <K extends string>(r: Readonly<Record<K, A>>) => O.Option<Readonly<Record<K, A>>>
```

Added in v3.0.0

## upsertAt

Insert or replace a key/value pair in a `ReadonlyRecord`.

**Signature**

```ts
export declare function upsertAt<K extends string, A>(
  k: K,
  a: A
): <KS extends string>(r: ReadonlyRecord<KS, A>) => ReadonlyRecord<KS | K, A>
```

Added in v3.0.0

# constructors

## fromFoldable

Create a `ReadonlyRecord` from a `Foldable` collection of key/value pairs, using the
specified `Magma` to combine values for duplicate keys, and the specified `f` to map to key/value pairs.

**Signature**

```ts
export declare function fromFoldable<F extends URIS4>(
  F: Foldable4<F>
): <B>(
  M: Magma<B>
) => <A>(f: (a: A) => readonly [string, B]) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => ReadonlyRecord<string, B>
export declare function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <B>(
  M: Magma<B>
) => <A>(f: (a: A) => readonly [string, B]) => <R, E>(fa: Kind3<F, R, E, A>) => ReadonlyRecord<string, B>
export declare function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) => <E>(fa: Kind2<F, E, A>) => ReadonlyRecord<string, B>
export declare function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) => (fa: Kind<F, A>) => ReadonlyRecord<string, B>
export declare function fromFoldable<F>(
  F: Foldable_<F>
): <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) => (fa: HKT<F, A>) => ReadonlyRecord<string, B>
```

Added in v3.0.0

## singleton

Create a `ReadonlyRecord` from one key/value pair.

**Signature**

```ts
export declare const singleton: <K extends string, A>(k: K, a: A) => Readonly<Record<K, A>>
```

Added in v3.0.0

# instances

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'ReadonlyRecord'>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'ReadonlyRecord'>
```

Added in v3.0.0

## FilterableWithIndex

**Signature**

```ts
export declare const FilterableWithIndex: FilterableWithIndex1<'ReadonlyRecord', string>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'ReadonlyRecord'>
```

Added in v3.0.0

## FoldableWithIndex

**Signature**

```ts
export declare const FoldableWithIndex: FoldableWithIndex1<'ReadonlyRecord', string>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'ReadonlyRecord'>
```

Added in v3.0.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'ReadonlyRecord', string>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'ReadonlyRecord'>
```

Added in v3.0.0

## TraversableWithIndex

**Signature**

```ts
export declare const TraversableWithIndex: TraversableWithIndex1<'ReadonlyRecord', string>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'ReadonlyRecord'
```

Added in v3.0.0

## Witherable

**Signature**

```ts
export declare const Witherable: Witherable1<'ReadonlyRecord'>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare function getEq<K extends string, A>(E: Eq<A>): Eq<ReadonlyRecord<K, A>>
```

Added in v3.0.0

## getMonoid

Returns a `Monoid` instance for `ReadonlyRecord`s given a `Semigroup` instance for their values.

**Signature**

```ts
export declare function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>>
```

**Example**

```ts
import * as N from 'fp-ts/number'
import { getMonoid } from 'fp-ts/ReadonlyRecord'
import { pipe } from 'fp-ts/function'

const M = getMonoid(N.SemigroupSum)
assert.deepStrictEqual(pipe({ foo: 123 }, M.concat({ foo: 456 })), { foo: 579 })
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<Readonly<Record<string, A>>>
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
export declare const collect: <K extends string, A, B>(
  f: (k: K, a: A) => B
) => (r: Readonly<Record<K, A>>) => readonly B[]
```

**Example**

```ts
import { collect } from 'fp-ts/ReadonlyRecord'

const x: { a: string; b: boolean } = { a: 'foo', b: false }
assert.deepStrictEqual(collect((key, val) => ({ key: key, value: val }))(x), [
  { key: 'a', value: 'foo' },
  { key: 'b', value: false },
])
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `ReadonlyRecord`.

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => (a: A) => (fa: Readonly<Record<string, A>>) => boolean
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
export declare const every: <A>(predicate: Predicate<A>) => (r: Readonly<Record<string, A>>) => boolean
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

## isEmpty

Test whether a `ReadonlyRecord` is empty.

**Signature**

```ts
export declare const isEmpty: (r: Readonly<Record<string, unknown>>) => boolean
```

Added in v3.0.0

## isSubrecord

Test whether one `ReadonlyRecord` contains all of the keys and values contained in another `ReadonlyRecord`.

**Signature**

```ts
export declare const isSubrecord: <A>(
  E: Eq<A>
) => (second: Readonly<Record<string, A>>) => (first: Readonly<Record<string, A>>) => boolean
```

Added in v3.0.0

## keys

**Signature**

```ts
export declare const keys: <K extends string>(r: Readonly<Record<K, unknown>>) => readonly K[]
```

Added in v3.0.0

## lookup

Lookup the value for a key in a `ReadonlyRecord`.

**Signature**

```ts
export declare const lookup: (k: string) => <A>(r: Readonly<Record<string, A>>) => O.Option<A>
```

Added in v3.0.0

## size

Calculate the number of key/value pairs in a `ReadonlyRecord`.

**Signature**

```ts
export declare const size: (r: Readonly<Record<string, unknown>>) => number
```

Added in v3.0.0

## some

**Signature**

```ts
export declare const some: <A>(predicate: (a: A) => boolean) => (r: Readonly<Record<string, A>>) => boolean
```

Added in v3.0.0

## toReadonlyArray

**Signature**

```ts
export declare const toReadonlyArray: <K extends string, A>(r: Readonly<Record<K, A>>) => readonly (readonly [K, A])[]
```

Added in v3.0.0

## toUnfoldable

Unfolds a `ReadonlyRecord` into a data structure of key/value pairs.

**Signature**

```ts
export declare function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => Kind<F, readonly [K, A]>
export declare function toUnfoldable<F>(
  U: Unfoldable<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => HKT<F, readonly [K, A]>
```

Added in v3.0.0
