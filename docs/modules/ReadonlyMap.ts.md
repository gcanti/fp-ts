---
title: ReadonlyMap.ts
nav_order: 82
parent: Modules
---

## ReadonlyMap overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [FilterableWithIndex](#filterablewithindex)
  - [filterMapWithIndex](#filtermapwithindex)
  - [partitionMapWithIndex](#partitionmapwithindex)
- [FunctorWithIndex](#functorwithindex)
  - [mapWithIndex](#mapwithindex)
- [constructors](#constructors)
  - [fromIterable](#fromiterable)
  - [singleton](#singleton)
- [conversions](#conversions)
  - [collect](#collect)
  - [keys](#keys)
  - [values](#values)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterWithIndex](#filterwithindex)
  - [partition](#partition)
  - [partitionWithIndex](#partitionwithindex)
  - [separate](#separate)
  - [traverseFilterMap](#traversefiltermap)
  - [traversePartitionMap](#traversepartitionmap)
- [instances](#instances)
  - [Compactable](#compactable)
  - [Filterable](#filterable)
  - [Functor](#functor)
  - [getEq](#geteq)
  - [getFilterableWithIndex](#getfilterablewithindex)
  - [getFoldable](#getfoldable)
  - [getFoldableWithIndex](#getfoldablewithindex)
  - [getFunctorWithIndex](#getfunctorwithindex)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getMonoid](#getmonoid)
  - [getShow](#getshow)
  - [getTraversable](#gettraversable)
  - [getTraversableFilterable](#gettraversablefilterable)
  - [getTraversableWithIndex](#gettraversablewithindex)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [type lambdas](#type-lambdas)
  - [ReadonlyMapTypeLambda (interface)](#readonlymaptypelambda-interface)
  - [ReadonlyMapTypeLambdaFix (interface)](#readonlymaptypelambdafix-interface)
- [utils](#utils)
  - [deleteAt](#deleteat)
  - [difference](#difference)
  - [elem](#elem)
  - [empty](#empty)
  - [filterMap](#filtermap)
  - [foldMapWithIndex](#foldmapwithindex)
  - [getDifferenceMagma](#getdifferencemagma)
  - [insertAt](#insertat)
  - [intersection](#intersection)
  - [isEmpty](#isempty)
  - [isSubmap](#issubmap)
  - [lookup](#lookup)
  - [lookupWithKey](#lookupwithkey)
  - [member](#member)
  - [modifyAt](#modifyat)
  - [partitionMap](#partitionmap)
  - [pop](#pop)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
  - [size](#size)
  - [toReadonlyArray](#toreadonlyarray)
  - [toUnfoldable](#tounfoldable)
  - [traverseWithIndex](#traversewithindex)
  - [union](#union)
  - [updateAt](#updateat)
  - [upsertAt](#upsertat)

---

# FilterableWithIndex

## filterMapWithIndex

**Signature**

```ts
export declare const filterMapWithIndex: <K, A, B>(
  f: (k: K, a: A) => option.Option<B>
) => (fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## partitionMapWithIndex

**Signature**

```ts
export declare const partitionMapWithIndex: <K, A, B, C>(
  f: (k: K, a: A) => Result<B, C>
) => (fa: ReadonlyMap<K, A>) => readonly [ReadonlyMap<K, B>, ReadonlyMap<K, C>]
```

Added in v3.0.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <K, A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v3.0.0

# constructors

## fromIterable

Create a `ReadonlyMap` from a `Iterable` collection of key/value pairs, using the
specified `Magma` to combine values for duplicate keys, and the specified `f` to map to key/value pairs.

**Signature**

```ts
export declare const fromIterable: <K, B>(
  E: eq.Eq<K>,
  M: Magma<B>
) => <A>(f: (a: A) => readonly [K, B]) => (self: Iterable<A>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## singleton

Create a `ReadonlyMap` from one key/value pair.

**Signature**

```ts
export declare const singleton: <K, A>(k: K, a: A) => ReadonlyMap<K, A>
```

Added in v3.0.0

# conversions

## collect

**Signature**

```ts
export declare const collect: <K>(O: Ord<K>) => <A, B>(f: (k: K, a: A) => B) => (m: ReadonlyMap<K, A>) => readonly B[]
```

Added in v3.0.0

## keys

Get a sorted `ReadonlyArray` of the keys contained in a `ReadonlyMap`.

**Signature**

```ts
export declare const keys: <K>(O: Ord<K>) => <A>(m: ReadonlyMap<K, A>) => readonly K[]
```

Added in v3.0.0

## values

Get a sorted `ReadonlyArray` of the values contained in a `ReadonlyMap`.

**Signature**

```ts
export declare const values: <A>(O: Ord<A>) => <K>(m: ReadonlyMap<K, A>) => readonly A[]
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <K, A>(m: ReadonlyMap<K, option.Option<A>>) => ReadonlyMap<K, A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <K>(fc: ReadonlyMap<K, C>) => ReadonlyMap<K, B>
  <B extends A, A = B>(predicate: Predicate<A>): <K>(fb: ReadonlyMap<K, B>) => ReadonlyMap<K, B>
}
```

Added in v3.0.0

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: {
  <K, C extends A, B extends A, A = C>(refinement: (i: K, a: A) => a is B): (fc: ReadonlyMap<K, C>) => ReadonlyMap<K, B>
  <K, B extends A, A = B>(predicate: (i: K, a: A) => boolean): (fb: ReadonlyMap<K, B>) => ReadonlyMap<K, B>
}
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <K>(
    fc: ReadonlyMap<K, C>
  ) => readonly [ReadonlyMap<K, C>, ReadonlyMap<K, B>]
  <B extends A, A = B>(predicate: Predicate<A>): <K>(
    fb: ReadonlyMap<K, B>
  ) => readonly [ReadonlyMap<K, B>, ReadonlyMap<K, B>]
}
```

Added in v3.0.0

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: {
  <K, C extends A, B extends A, A = C>(refinement: (i: K, a: A) => a is B): (
    fb: ReadonlyMap<K, C>
  ) => readonly [ReadonlyMap<K, C>, ReadonlyMap<K, B>]
  <K, B extends A, A = B>(predicate: (i: K, a: A) => boolean): (
    fb: ReadonlyMap<K, B>
  ) => readonly [ReadonlyMap<K, B>, ReadonlyMap<K, B>]
}
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <K, A, B>(
  fa: ReadonlyMap<K, Result<A, B>>
) => readonly [ReadonlyMap<K, A>, ReadonlyMap<K, B>]
```

Added in v3.0.0

## traverseFilterMap

**Signature**

```ts
export declare const traverseFilterMap: <K>(
  O: Ord<K>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, option.Option<B>>
) => (ta: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, ReadonlyMap<K, B>>
```

Added in v3.0.0

## traversePartitionMap

**Signature**

```ts
export declare const traversePartitionMap: <K>(
  O: Ord<K>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B, C>(
  f: (a: A) => Kind<F, S, R, O, E, Result<B, C>>
) => (wa: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, readonly [ReadonlyMap<K, B>, ReadonlyMap<K, C>]>
```

Added in v3.0.0

# instances

## Compactable

**Signature**

```ts
export declare const Compactable: compactable.Compactable<ReadonlyMapTypeLambda>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: filterable.Filterable<ReadonlyMapTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReadonlyMapTypeLambda>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <K, A>(EqK: eq.Eq<K>, EqA: eq.Eq<A>) => eq.Eq<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getFilterableWithIndex

**Signature**

```ts
export declare const getFilterableWithIndex: <K>() => filterableWithIndex.FilterableWithIndex<
  ReadonlyMapTypeLambdaFix<K>,
  K
>
```

Added in v3.0.0

## getFoldable

**Signature**

```ts
export declare const getFoldable: <K>(O: Ord<K>) => foldable.Foldable<ReadonlyMapTypeLambdaFix<K>>
```

Added in v3.0.0

## getFoldableWithIndex

**Signature**

```ts
export declare const getFoldableWithIndex: <K>(O: Ord<K>) => FoldableWithIndex<ReadonlyMapTypeLambdaFix<K>, K>
```

Added in v3.0.0

## getFunctorWithIndex

**Signature**

```ts
export declare const getFunctorWithIndex: <K>() => FunctorWithIndex<ReadonlyMapTypeLambdaFix<K>, K>
```

Added in v3.0.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <K, A>(E: eq.Eq<K>, S: Semigroup<A>) => Semigroup<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getMonoid

Get a `Monoid` instance for `ReadonlyMap` given a `Semigroup` instance for its values.

**Signature**

```ts
export declare const getMonoid: <K, A>(Eq: eq.Eq<K>, Semigroup: Semigroup<A>) => Monoid<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <K, A>(SemigroupK: Show<K>, SemigroupA: Show<A>) => Show<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getTraversable

**Signature**

```ts
export declare const getTraversable: <K>(O: Ord<K>) => Traversable<ReadonlyMapTypeLambdaFix<K>>
```

Added in v3.0.0

## getTraversableFilterable

**Signature**

```ts
export declare const getTraversableFilterable: <K>(
  O: Ord<K>
) => traversableFilterable.TraversableFilterable<ReadonlyMapTypeLambdaFix<K>>
```

Added in v3.0.0

## getTraversableWithIndex

**Signature**

```ts
export declare const getTraversableWithIndex: <K>(O: Ord<K>) => TraversableWithIndex<ReadonlyMapTypeLambdaFix<K>, K>
```

Added in v3.0.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <K, A>(E: eq.Eq<K>, S: Semigroup<A>) => Monoid<ReadonlyMap<K, A>>
```

Added in v3.0.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <K, A>(E: eq.Eq<K>, S: Semigroup<A>) => Semigroup<ReadonlyMap<K, A>>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <K, B>(fab: ReadonlyMap<K, (a: A) => B>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v3.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <K>(
  O: Ord<K>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <S, R, O, E, A>(ta: ReadonlyMap<K, Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, ReadonlyMap<K, A>>
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: <K>(
  O: Ord<K>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, B>
) => (ta: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, ReadonlyMap<K, B>>
```

Added in v3.0.0

# type lambdas

## ReadonlyMapTypeLambda (interface)

**Signature**

```ts
export interface ReadonlyMapTypeLambda extends TypeLambda {
  readonly type: ReadonlyMap<this['InOut1'], this['Out1']>
}
```

Added in v3.0.0

## ReadonlyMapTypeLambdaFix (interface)

**Signature**

```ts
export interface ReadonlyMapTypeLambdaFix<K> extends TypeLambda {
  readonly type: ReadonlyMap<K, this['Out1']>
}
```

Added in v3.0.0

# utils

## deleteAt

Delete the element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const deleteAt: <K>(
  E: eq.Eq<K>
) => (k: K) => <A>(m: ReadonlyMap<K, A>) => option.Option<ReadonlyMap<K, A>>
```

Added in v3.0.0

## difference

**Signature**

```ts
export declare const difference: <K>(
  E: eq.Eq<K>
) => <A>(_second: ReadonlyMap<K, A>) => (self: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `ReadonlyMap`.

**Signature**

```ts
export declare const elem: <A>(E: eq.Eq<A>) => (a: A) => <K>(m: ReadonlyMap<K, A>) => boolean
```

Added in v3.0.0

## empty

**Signature**

```ts
export declare const empty: <K>() => ReadonlyMap<K, never>
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => option.Option<B>) => <K>(fa: ReadonlyMap<K, A>) => ReadonlyMap<K, B>
```

Added in v3.0.0

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <K>(
  O: Ord<K>
) => <M>(M: Monoid<M>) => <A>(f: (i: K, a: A) => M) => (fa: ReadonlyMap<K, A>) => M
```

Added in v3.0.0

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <K>(E: eq.Eq<K>) => <A>() => Magma<ReadonlyMap<K, A>>
```

Added in v3.0.0

## insertAt

Insert an element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key already exists.

**Signature**

```ts
export declare const insertAt: <K>(
  E: eq.Eq<K>
) => <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => option.Option<ReadonlyMap<K, A>>
```

Added in v3.0.0

## intersection

**Signature**

```ts
export declare const intersection: <K, A>(
  E: eq.Eq<K>,
  M: Magma<A>
) => (that: ReadonlyMap<K, A>) => (self: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

Added in v3.0.0

## isEmpty

Test whether or not a `ReadonlyMap` is empty.

**Signature**

```ts
export declare const isEmpty: <K, A>(d: ReadonlyMap<K, A>) => boolean
```

Added in v3.0.0

## isSubmap

Test whether or not one `ReadonlyMap` contains all of the keys and values contained in another `ReadonlyMap`.

**Signature**

```ts
export declare const isSubmap: <K, A>(
  EK: eq.Eq<K>,
  SA: eq.Eq<A>
) => (that: ReadonlyMap<K, A>) => (self: ReadonlyMap<K, A>) => boolean
```

Added in v3.0.0

## lookup

Lookup the value for a key in a `ReadonlyMap`.

**Signature**

```ts
export declare const lookup: <K>(E: eq.Eq<K>) => (k: K) => <A>(m: ReadonlyMap<K, A>) => option.Option<A>
```

Added in v3.0.0

## lookupWithKey

Lookup the value for a key in a `ReadonlyMap`.
If the result is a `Some`, the existing key is also returned.

**Signature**

```ts
export declare const lookupWithKey: <K>(
  E: eq.Eq<K>
) => (k: K) => <A>(m: ReadonlyMap<K, A>) => option.Option<readonly [K, A]>
```

Added in v3.0.0

## member

Test whether or not a key exists in a `ReadonlyMap`.

**Signature**

```ts
export declare const member: <K>(E: eq.Eq<K>) => (k: K) => <A>(m: ReadonlyMap<K, A>) => boolean
```

Added in v3.0.0

## modifyAt

Apply a function to the element at the specified key, creating a new `ReadonlyMap`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const modifyAt: <K>(
  E: eq.Eq<K>
) => <A>(k: K, f: Endomorphism<A>) => (m: ReadonlyMap<K, A>) => option.Option<ReadonlyMap<K, A>>
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => <K>(fa: ReadonlyMap<K, A>) => readonly [ReadonlyMap<K, B>, ReadonlyMap<K, C>]
```

Added in v3.0.0

## pop

Delete a key and value from a `ReadonlyMap`, returning the value as well as the subsequent `ReadonlyMap`,
or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const pop: <K>(
  E: eq.Eq<K>
) => (k: K) => <A>(m: ReadonlyMap<K, A>) => option.Option<readonly [A, ReadonlyMap<K, A>]>
```

Added in v3.0.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <K>(
  O: Ord<K>
) => <B, A>(b: B, f: (i: K, a: A, b: B) => B) => (fa: ReadonlyMap<K, A>) => B
```

Added in v3.0.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <K>(
  O: Ord<K>
) => <B, A>(b: B, f: (i: K, b: B, a: A) => B) => (fa: ReadonlyMap<K, A>) => B
```

Added in v3.0.0

## size

Calculate the number of key/value pairs in a `ReadonlyMap`.

**Signature**

```ts
export declare const size: <K, A>(d: ReadonlyMap<K, A>) => number
```

Added in v3.0.0

## toReadonlyArray

Get a sorted `ReadonlyArray` of the key/value pairs contained in a `ReadonlyMap`.

**Signature**

```ts
export declare const toReadonlyArray: <K>(O: Ord<K>) => <A>(m: ReadonlyMap<K, A>) => readonly (readonly [K, A])[]
```

Added in v3.0.0

## toUnfoldable

Unfolds a `ReadonlyMap` into a data structure of key/value pairs.

**Signature**

```ts
export declare function toUnfoldable<F extends TypeLambda>(
  U: Unfoldable<F>
): <K>(o: Ord<K>) => <A, S, R, O, E>(d: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, readonly [K, A]>
```

Added in v3.0.0

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: <K>(
  O: Ord<K>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (i: K, a: A) => Kind<F, S, R, O, E, B>
) => (ta: ReadonlyMap<K, A>) => Kind<F, S, R, O, E, ReadonlyMap<K, B>>
```

Added in v3.0.0

## union

**Signature**

```ts
export declare const union: <K, A>(
  E: eq.Eq<K>,
  M: Magma<A>
) => (that: ReadonlyMap<K, A>) => (self: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

Added in v3.0.0

## updateAt

Change the element at the specified keys, creating a new `ReadonlyMap`, or returning `None` if the key doesn't exist.

**Signature**

```ts
export declare const updateAt: <K>(
  E: eq.Eq<K>
) => <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => option.Option<ReadonlyMap<K, A>>
```

Added in v3.0.0

## upsertAt

Insert or replace a key/value pair in a `ReadonlyMap`.

**Signature**

```ts
export declare const upsertAt: <K>(E: eq.Eq<K>) => <A>(k: K, a: A) => (m: ReadonlyMap<K, A>) => ReadonlyMap<K, A>
```

Added in v3.0.0
