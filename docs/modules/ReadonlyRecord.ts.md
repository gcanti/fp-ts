---
title: ReadonlyRecord.ts
nav_order: 87
parent: Modules
---

## ReadonlyRecord overview

The `ReadonlyRecord.ts` module enables dealing in a functional way with
Typescript's `Readonly<Record<K, T>>` type. That is similar to the
`Record.ts` module, but for a record with all properties
declared as `readonly`.

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
  - [fromEntries](#fromentries)
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
  - [toEntries](#toentries)
  - [toReadonlyArray](#toreadonlyarray)
  - [traverse](#traverse)
  - [traverseWithIndex](#traversewithindex)
  - [updateAt](#updateat)
  - [~~hasOwnProperty (function)~~](#hasownproperty-function)

---

# Compactable

## compact

Compact a `ReadonlyRecord` of `Option`s discarding the `None` values and
keeping the `Some` values.

**Signature**

```ts
export declare const compact: <A>(r: Readonly<Record<string, Option<A>>>) => Readonly<Record<string, A>>
```

**Example**

```ts
import { compact } from 'fp-ts/ReadonlyRecord'
import { option } from 'fp-ts'

assert.deepStrictEqual(compact({ a: option.some('foo'), b: option.none, c: option.some('bar') }), {
  a: 'foo',
  c: 'bar',
})
```

Added in v2.5.0

## separate

Separate a `ReadonlyRecord` of `Either`s into `Left`s and `Right`s.

**Signature**

```ts
export declare const separate: <A, B>(
  r: Readonly<Record<string, Either<A, B>>>
) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>>
```

**Example**

```ts
import { separate } from 'fp-ts/ReadonlyRecord'
import { either } from 'fp-ts'

assert.deepStrictEqual(separate({ a: either.right('foo'), b: either.left('bar'), c: either.right('baz') }), {
  right: {
    a: 'foo',
    c: 'baz',
  },
  left: {
    b: 'bar',
  },
})
```

Added in v2.5.0

# Filterable

## filter

Given a `Predicate`, it produces a new `ReadonlyRecord` keeping only the entries with a
value that satisfies the provided predicate.

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Readonly<Record<string, B>>) => Readonly<Record<string, B>>
  <A>(predicate: Predicate<A>): (fa: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
}
```

**Example**

```ts
import { filter } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(filter((s: string) => s.length < 4)({ a: 'foo', b: 'bar', c: 'verylong' }), {
  a: 'foo',
  b: 'bar',
})
```

Added in v2.5.0

## filterMap

Maps a `ReadonlyRecord` with an iterating function that returns an `Option`
and it keeps only the `Some` values discarding the `None`s.

**Signature**

```ts
export declare const filterMap: <A, B>(
  f: (a: A) => Option<B>
) => (fa: Readonly<Record<string, A>>) => Readonly<Record<string, B>>
```

**Example**

```ts
import { filterMap } from 'fp-ts/ReadonlyRecord'
import { option } from 'fp-ts'

const f = (s: string) => (s.length < 4 ? option.some(`${s} is short`) : option.none)
assert.deepStrictEqual(filterMap(f)({ a: 'foo', b: 'bar', c: 'verylong' }), {
  a: 'foo is short',
  b: 'bar is short',
})
```

Added in v2.5.0

## partition

Partition a `ReadonlyRecord` into two parts according to a `Predicate`.

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

**Example**

```ts
import { partition } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(partition((s: string) => s.length < 4)({ a: 'foo', b: 'bar', c: 'verylong' }), {
  left: {
    c: 'verylong',
  },
  right: {
    a: 'foo',
    b: 'bar',
  },
})
```

Added in v2.5.0

## partitionMap

Maps a `ReadonlyRecord` with a function returning an `Either` and
partitions the resulting `ReadonlyRecord` into `Left`s and `Right`s.

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Readonly<Record<string, A>>) => Separated<Readonly<Record<string, B>>, Readonly<Record<string, C>>>
```

**Example**

```ts
import { partitionMap } from 'fp-ts/ReadonlyRecord'
import { either } from 'fp-ts'

const f = (s: string) => (s.length < 4 ? either.right(`${s} is short`) : either.left(`${s} is not short`))
assert.deepStrictEqual(partitionMap(f)({ a: 'foo', b: 'bar', c: 'verylong' }), {
  left: {
    c: 'verylong is not short',
  },
  right: {
    a: 'foo is short',
    b: 'bar is short',
  },
})
```

Added in v2.5.0

# Foldable

## foldMap

Map and fold a `ReadonlyRecord`.
Map the `ReadonlyRecord` passing each value to the iterating function.
Then fold the results using the provided `Monoid`.

**Signature**

```ts
export declare function foldMap(
  O: Ord<string>
): <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: ReadonlyRecord<string, A>) => M
export declare function foldMap<M>(M: Monoid<M>): <A>(f: (a: A) => M) => (fa: ReadonlyRecord<string, A>) => M
```

**Example**

```ts
import { foldMap } from 'fp-ts/ReadonlyRecord'
import { Ord } from 'fp-ts/string'
import { Monoid } from 'fp-ts/Monoid'

const m: Monoid<string> = { empty: '', concat: (x: string, y: string) => (x ? `${x} -> ${y}` : `${y}`) }
const f = (a: number) => `-${a}-`
const x = { c: 3, a: 1, b: 2 }
assert.deepStrictEqual(foldMap(Ord)(m)(f)(x), '-1- -> -2- -> -3-')
```

Added in v2.5.0

## reduce

Reduces a `ReadonlyRecord` passing each value to the iterating function.
Entries are processed in order, sorted by key according to
the given `Ord`.

**Signature**

```ts
export declare function reduce(
  O: Ord<string>
): <A, B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyRecord<string, A>) => B
export declare function reduce<A, B>(b: B, f: (b: B, a: A) => B): (fa: ReadonlyRecord<string, A>) => B
```

**Example**

```ts
import { reduce } from 'fp-ts/ReadonlyRecord'
import { Ord } from 'fp-ts/string'

const x = { c: 3, a: 'foo', b: false }
assert.deepStrictEqual(reduce(Ord)([] as string[], (b, a) => [...b, `-${a}-`])(x), ['-foo-', '-false-', '-3-'])
```

Added in v2.5.0

## reduceRight

Same as `reduce` but entries are processed _from the right_,
i.e. in reverse order, from the last to the first entry, according to
the given `Ord`.

**Signature**

```ts
export declare function reduceRight(
  O: Ord<string>
): <A, B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyRecord<string, A>) => B
export declare function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): (fa: ReadonlyRecord<string, A>) => B
```

**Example**

```ts
import { reduceRight } from 'fp-ts/ReadonlyRecord'
import { Ord } from 'fp-ts/string'

const x = { c: 3, a: 'foo', b: false }
assert.deepStrictEqual(reduceRight(Ord)([] as string[], (a, b) => [...b, `-${a}-`])(x), ['-3-', '-false-', '-foo-'])
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

**Example**

```ts
import { deleteAt } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(deleteAt('a')({ a: 1, b: 2 }), { b: 2 })
assert.deepStrictEqual(deleteAt('c')({ a: 1, b: 2 }), { a: 1, b: 2 })
```

Added in v2.5.0

## difference

Difference between two `ReadonlyRecord`s.
Takes two `ReadonlyRecord`s and produces a `ReadonlyRecord` composed by the
entries of the two inputs, removing the entries with the same
key in both inputs.

**Signature**

```ts
export declare const difference: <A>(
  second: Readonly<Record<string, A>>
) => (first: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

**Example**

```ts
import { difference } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(difference({ a: 1 })({ a: 1, b: 2 }), { b: 2 })
assert.deepStrictEqual(difference({ a: 3 })({ a: 1, b: 2 }), { b: 2 })
assert.deepStrictEqual(difference({ a: 3, c: 3 })({ a: 1, b: 2 }), { b: 2, c: 3 })
```

Added in v2.11.0

## filterMapWithIndex

Maps a `ReadonlyRecord` with an iterating function that takes key and value and
returns an `Option`, keeping only the `Some` values and discarding `None`s.

**Signature**

```ts
export declare function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
```

**Example**

```ts
import { filterMapWithIndex } from 'fp-ts/ReadonlyRecord'
import { option } from 'fp-ts'

const f = (key: string, a: number) => (a >= 0 ? option.some(`${key}${a}`) : option.none)
assert.deepStrictEqual(filterMapWithIndex(f)({ a: -1, b: 2, c: 3 }), {
  b: 'b2',
  c: 'c3',
})
```

Added in v2.5.0

## flap

Derivable from `Functor`.
Takes a value and a `ReadonlyRecord` of functions and returns a
`ReadonlyRecord` by applying each function to the input value.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Readonly<Record<string, (a: A) => B>>) => Readonly<Record<string, B>>
```

**Example**

```ts
import { flap } from 'fp-ts/ReadonlyRecord'

const fab = { x: (n: number) => `${n} times 2`, y: (n: number) => `${n * 2}` }
assert.deepStrictEqual(flap(3)(fab), {
  x: '3 times 2',
  y: '6',
})
```

Added in v2.10.0

## intersection

Intersection of two `ReadonlyRecord`s.
Takes two `ReadonlyRecord`s and produces a `ReadonlyRecord` combining only the
entries of the two inputswith the same key.
It uses the `concat` function of the provided `Magma` to
combine the elements.

**Signature**

```ts
export declare const intersection: <A>(
  M: Magma<A>
) => (second: Readonly<Record<string, A>>) => (first: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

**Example**

```ts
import { intersection } from 'fp-ts/ReadonlyRecord'
import { Magma } from 'fp-ts/Magma'

const m1: Magma<number> = { concat: (x: number, y: number) => x + y }
assert.deepStrictEqual(intersection(m1)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 4 })
const m2: Magma<number> = { concat: (x: number) => x }
assert.deepStrictEqual(intersection(m2)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 1 })
```

Added in v2.11.0

## map

Map a `ReadonlyRecord` passing the values to the iterating function.

**Signature**

```ts
export declare function map<A, B>(f: (a: A) => B): <K extends string>(fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
```

**Example**

```ts
import { map } from 'fp-ts/ReadonlyRecord'

const f = (n: number) => `-${n}-`
assert.deepStrictEqual(map(f)({ a: 3, b: 5 }), { a: '-3-', b: '-5-' })
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

**Example**

```ts
import { mapWithIndex } from 'fp-ts/ReadonlyRecord'

const f = (k: string, n: number) => `${k.toUpperCase()}-${n}`
assert.deepStrictEqual(mapWithIndex(f)({ a: 3, b: 5 }), { a: 'A-3', b: 'B-5' })
```

Added in v2.5.0

## union

Union of two `ReadonlyRecord`s.
Takes two `ReadonlyRecord`s and produces a `ReadonlyRecord` combining all the
entries of the two inputs.
It uses the `concat` function of the provided `Magma` to
combine the elements with the same key.

**Signature**

```ts
export declare const union: <A>(
  M: Magma<A>
) => (second: Readonly<Record<string, A>>) => (first: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

**Example**

```ts
import { union } from 'fp-ts/ReadonlyRecord'
import { Magma } from 'fp-ts/Magma'

const m1: Magma<number> = { concat: (x: number, y: number) => x + y }
assert.deepStrictEqual(union(m1)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 4, b: 2, c: 3 })
const m2: Magma<number> = { concat: (x: number) => x }
assert.deepStrictEqual(union(m2)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 1, b: 2, c: 3 })
```

Added in v2.11.0

## upsertAt

Insert or replace a key/value pair in a `ReadonlyRecord`.

**Signature**

```ts
export declare const upsertAt: <A>(k: string, a: A) => (r: Readonly<Record<string, A>>) => Readonly<Record<string, A>>
```

**Example**

```ts
import { upsertAt } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(upsertAt('a', 5)({ a: 1, b: 2 }), { a: 5, b: 2 })
assert.deepStrictEqual(upsertAt('c', 5)({ a: 1, b: 2 }), { a: 1, b: 2, c: 5 })
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

**Example**

```ts
import { singleton } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(singleton('a', 1), { a: 1 })
```

Added in v2.5.0

# destructors

## toUnfoldable

Unfolds a `ReadonlyRecord` into a list of key/value pairs.

Given an `Unfoldable` class type `U` such as `array` or `readonlyArray`,
it uses the `unfold` function to create an instance of `U`,
providing an iterating function that iterates over each
key/value pair in the record sorted alphabetically by key.

**Signature**

```ts
export declare function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => Kind<F, readonly [K, A]>
export declare function toUnfoldable<F>(
  U: Unfoldable<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => HKT<F, readonly [K, A]>
```

**Example**

```ts
import { array, readonlyArray } from 'fp-ts'
import { toUnfoldable } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(toUnfoldable(array)({ b: 2, a: 1 }), [
  ['a', 1],
  ['b', 2],
])
assert.deepStrictEqual(toUnfoldable(readonlyArray)({ b: 2, a: 1 }), [
  ['a', 1],
  ['b', 2],
])
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

Produces a `Magma` with a `concat` function that combines
two `ReadonlyRecord`s by making the `difference`.

**Signature**

```ts
export declare const getDifferenceMagma: <A>() => Magma<Readonly<Record<string, A>>>
```

**Example**

```ts
import { getDifferenceMagma, difference, ReadonlyRecord } from 'fp-ts/ReadonlyRecord'
import { Magma } from 'fp-ts/Magma'

const r1 = { a: 3, c: 3 }
const r2 = { a: 1, b: 2 }
const m: Magma<ReadonlyRecord<string, number>> = getDifferenceMagma<number>()
assert.deepStrictEqual(m.concat(r1, r2), difference(r2)(r1))
assert.deepStrictEqual(m.concat(r1, r2), { c: 3, b: 2 })
```

Added in v2.11.0

## getEq

Given an `Eq` for the base type, it produces an `Eq`
for a `ReadonlyRecord` of that base type.

**Signature**

```ts
export declare function getEq<K extends string, A>(E: Eq<A>): Eq<ReadonlyRecord<K, A>>
```

**Example**

```ts
import { getEq, ReadonlyRecord } from 'fp-ts/ReadonlyRecord'
import { string } from 'fp-ts'
import { Eq } from 'fp-ts/Eq'

const eq: Eq<ReadonlyRecord<string, string>> = getEq(string.Eq)
assert.deepStrictEqual(eq.equals({ a: 'foo' }, { b: 'bar' }), false)
assert.deepStrictEqual(eq.equals({ a: 'foo' }, { a: 'foo' }), true)
```

Added in v2.5.0

## getFoldable

Produces a `Foldable` instance for a `ReadonlyRecord`, using the
provided `Ord` to sort the `ReadonlyRecord`'s entries by key.

**Signature**

```ts
export declare const getFoldable: (O: Ord<string>) => Foldable1<URI>
```

Added in v2.11.0

## getFoldableWithIndex

Produces a `FoldableWithIndex1` instance for a `ReadonlyRecord`, using the
provided `Ord` to sort the `ReadonlyRecord`'s entries by key.

**Signature**

```ts
export declare const getFoldableWithIndex: (O: Ord<string>) => FoldableWithIndex1<URI, string>
```

Added in v2.11.0

## getIntersectionSemigroup

Given a `Semigroup` in the base type, it produces a `Semigroup`
in the `ReadonlyRecord` of the base type.
The resulting `Semigroup` concatenates two `ReadonlyRecord`s by
`intersection`.

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(S: Se.Semigroup<A>) => Se.Semigroup<Readonly<Record<string, A>>>
```

**Example**

```ts
import { getIntersectionSemigroup, ReadonlyRecord } from 'fp-ts/ReadonlyRecord'
import { Semigroup } from 'fp-ts/Semigroup'

const sNumber: Semigroup<number> = { concat: (x, y) => x - y }
const sReadonlyRecord: Semigroup<ReadonlyRecord<string, number>> = getIntersectionSemigroup(sNumber)
assert.deepStrictEqual(sReadonlyRecord.concat({ a: 1, b: 2 }, { b: 3, c: 4 }), { b: -1 })
```

Added in v2.11.0

## getMonoid

Returns a `Monoid` instance for `ReadonlyRecord`s, given a `Semigroup`
instance for the base type.
The `Monoid` makes the union of two `ReadonlyRecord`s comining the
overlapping entries with the provided `Semigroup`.

**Signature**

```ts
export declare function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>>
```

**Example**

```ts
import { SemigroupSum } from 'fp-ts/number'
import { getMonoid } from 'fp-ts/ReadonlyRecord'

const M = getMonoid(SemigroupSum)
assert.deepStrictEqual(M.concat({ foo: 123, bar: 234 }, { foo: 456, baz: 567 }), { foo: 579, bar: 234, baz: 567 })
```

Added in v2.5.0

## getShow

Produces a `Show` for a `ReadonlyRecord`, given a `Show` for the base type
(a `Show` produces a human-readable representation of an instance).
`ReadonlyRecord` entries are sorted by key with the provided `Ord`.

**Signature**

```ts
export declare function getShow(O: Ord<string>): <A>(S: Show<A>) => Show<ReadonlyRecord<string, A>>
export declare function getShow<A>(S: Show<A>): Show<ReadonlyRecord<string, A>>
```

**Example**

```ts
import { getShow, ReadonlyRecord } from 'fp-ts/ReadonlyRecord'
import { Show } from 'fp-ts/Show'
import { Ord } from 'fp-ts/string'

const sNumber: Show<number> = { show: (n: number) => `${n}` }
const sRecord: Show<ReadonlyRecord<string, number>> = getShow(Ord)(sNumber)
assert.deepStrictEqual(sRecord.show({ b: 2, a: 1 }), '{ "a": 1, "b": 2 }')
```

Added in v2.5.0

## getTraversable

Produces a `Traversable` instance for a `ReadonlyRecord`, using the
provided `Ord` to sort the `ReadonlyRecord`'s entries by key.

**Signature**

```ts
export declare const getTraversable: (O: Ord<string>) => Traversable1<URI>
```

Added in v2.11.0

## getTraversableWithIndex

Produces a `TraversableWithIndex` instance for a `ReadonlyRecord`, using the
provided `Ord` to sort the `ReadonlyRecord`'s entries by key.

**Signature**

```ts
export declare const getTraversableWithIndex: (O: Ord<string>) => TraversableWithIndex1<URI, string>
```

Added in v2.11.0

## getUnionMonoid

Same as `getMonoid`.
Returns a `Monoid` instance for `ReadonlyRecord`s given a `Semigroup`
instance for the base type.
The `Monoid` makes the union of two `ReadonlyRecord`s combining the
entries that have the same key with the provided `Semigroup`.

**Signature**

```ts
export declare const getUnionMonoid: <A>(S: Se.Semigroup<A>) => Monoid<Readonly<Record<string, A>>>
```

**Example**

```ts
import { SemigroupSum } from 'fp-ts/number'
import { getUnionMonoid } from 'fp-ts/ReadonlyRecord'

const M = getUnionMonoid(SemigroupSum)
assert.deepStrictEqual(M.concat({ foo: 123, bar: 234 }, { foo: 456, baz: 567 }), { foo: 579, bar: 234, baz: 567 })
```

Added in v2.11.0

## getUnionSemigroup

Given a `Semigroup` in the base type, it produces a `Semigroup`
in the `ReadonlyRecord` of the base type.
The resulting `Semigroup` concatenates two `ReadonlyRecord`s by
`union`.

**Signature**

```ts
export declare const getUnionSemigroup: <A>(S: Se.Semigroup<A>) => Se.Semigroup<Readonly<Record<string, A>>>
```

**Example**

```ts
import { getUnionSemigroup, ReadonlyRecord } from 'fp-ts/ReadonlyRecord'
import { Semigroup } from 'fp-ts/Semigroup'

const sNumber: Semigroup<number> = { concat: (x, y) => x - y }
const sReadonlyRecord: Semigroup<ReadonlyRecord<string, number>> = getUnionSemigroup(sNumber)
assert.deepStrictEqual(sReadonlyRecord.concat({ a: 1, b: 2 }, { b: 3, c: 4 }), { a: 1, b: -1, c: 4 })
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

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `RR.Functor` instead of `RR.readonlyRecord`
(where `RR` is from `import RR from 'fp-ts/ReadonlyRecord'`)

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

Builds a `ReadonlyRecord` by copying a `Record`.

**Signature**

```ts
export declare const fromRecord: <K extends string, A>(r: Record<K, A>) => Readonly<Record<K, A>>
```

**Example**

```ts
import { ReadonlyRecord, fromRecord } from 'fp-ts/ReadonlyRecord'

const x: Record<string, number> = { a: 1, b: 2 }
const y: ReadonlyRecord<string, number> = fromRecord(x)
assert.deepStrictEqual(x, y)
// `y.a = 5` gives compiler error
```

Added in v2.5.0

## toRecord

Builds a mutable `Record` from a `ReadonlyRecord`.

**Signature**

```ts
export declare const toRecord: <K extends string, A>(r: Readonly<Record<K, A>>) => Record<K, A>
```

**Example**

```ts
import { ReadonlyRecord, toRecord } from 'fp-ts/ReadonlyRecord'

const x: ReadonlyRecord<string, number> = { a: 1, b: 2 }
const y: Record<string, number> = toRecord(x)
assert.deepStrictEqual(x, y)
y.a = 5 // it's ok, y is mutable
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

const f = <A>(k: string, a: A) => `${k.toUpperCase()}-${a}`
const x = { c: 3, a: 'foo', b: false }
assert.deepStrictEqual(collect(Ord)(f)(x), ['A-foo', 'B-false', 'C-3'])
```

Added in v2.5.0

## elem

Given an `Eq` checks if a `ReadonlyRecord` contains an entry with
value equal to a provided value.

**Signature**

```ts
export declare function elem<A>(E: Eq<A>): {
  (a: A): (fa: ReadonlyRecord<string, A>) => boolean
  (a: A, fa: ReadonlyRecord<string, A>): boolean
}
```

**Example**

```ts
import { elem } from 'fp-ts/ReadonlyRecord'
import { number } from 'fp-ts'

assert.deepStrictEqual(elem(number.Eq)(123, { foo: 123, bar: 234 }), true)
assert.deepStrictEqual(elem(number.Eq)(-7, { foo: 123, bar: 234 }), false)
```

Added in v2.5.0

## empty

**Signature**

```ts
export declare const empty: Readonly<Record<string, never>>
```

Added in v2.5.0

## every

Test if every value in a `ReadonlyRecord` satisfies the predicate.

**Signature**

```ts
export declare function every<A, B extends A>(
  refinement: Refinement<A, B>
): Refinement<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export declare function every<A>(predicate: Predicate<A>): Predicate<ReadonlyRecord<string, A>>
```

**Example**

```ts
import { every } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(every((n: number) => n >= 0)({ a: 1, b: 2 }), true)
assert.deepStrictEqual(every((n: number) => n >= 0)({ a: 1, b: -1 }), false)
```

Added in v2.5.0

## filterWithIndex

Produce a new `ReadonlyRecord` keeping only the entries that satisfy
a predicate taking key and value as input.

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

**Example**

```ts
import { filterWithIndex } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(filterWithIndex((s: string, v: number) => s.length <= 1 && v > 0)({ a: 1, b: -2, ccc: 3 }), {
  a: 1,
})
```

Added in v2.5.0

## foldMapWithIndex

Map and fold a `ReadonlyRecord`.
Map the `ReadonlyRecord` passing each key/value pair to the iterating function.
Then fold the results using the provided `Monoid`.

**Signature**

```ts
export declare function foldMapWithIndex(
  O: Ord<string>
): <M>(M: Monoid<M>) => <K extends string, A>(f: (k: K, a: A) => M) => (fa: ReadonlyRecord<K, A>) => M
export declare function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: ReadonlyRecord<K, A>) => M
```

**Example**

```ts
import { foldMapWithIndex } from 'fp-ts/ReadonlyRecord'
import { Ord } from 'fp-ts/string'
import { Monoid } from 'fp-ts/Monoid'

const m: Monoid<string> = { empty: '', concat: (x: string, y: string) => (x ? `${x} -> ${y}` : `${y}`) }
const f = (k: string, a: number) => `${k}-${a}`
const x = { c: 3, a: 1, b: 2 }
assert.deepStrictEqual(foldMapWithIndex(Ord)(m)(f)(x), 'a-1 -> b-2 -> c-3')
```

Added in v2.5.0

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

Added in v2.12.0

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

**Example**

```ts
import { has } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(has('a', { a: 1, b: 2 }), true)
assert.deepStrictEqual(has('c', { a: 1, b: 2 }), false)
```

Added in v2.10.0

## isEmpty

Test whether a `ReadonlyRecord` is empty.

**Signature**

```ts
export declare const isEmpty: <A>(r: Readonly<Record<string, A>>) => boolean
```

**Example**

```ts
import { isEmpty } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(isEmpty({}), true)
assert.deepStrictEqual(isEmpty({ a: 3 }), false)
```

Added in v2.5.0

## isSubrecord

Test whether one `ReadonlyRecord` contains all of the keys and values
contained in another `ReadonlyRecord`.

**Signature**

```ts
export declare function isSubrecord<A>(E: Eq<A>): {
  (that: ReadonlyRecord<string, A>): (me: ReadonlyRecord<string, A>) => boolean
  (me: ReadonlyRecord<string, A>, that: ReadonlyRecord<string, A>): boolean
}
```

**Example**

```ts
import { isSubrecord } from 'fp-ts/ReadonlyRecord'
import { string } from 'fp-ts'

assert.deepStrictEqual(isSubrecord(string.Eq)({ a: 'foo', b: 'bar', c: 'baz' })({ a: 'foo', b: 'bar', c: 'baz' }), true)
assert.deepStrictEqual(isSubrecord(string.Eq)({ a: 'foo', b: 'bar', c: 'baz' })({ a: 'foo', c: 'baz' }), true)
assert.deepStrictEqual(
  isSubrecord(string.Eq)({ a: 'foo', b: 'bar', c: 'baz' })({ a: 'foo', b: 'not-bar', c: 'baz' }),
  false
)
assert.deepStrictEqual(isSubrecord(string.Eq)({ a: 'foo', b: 'bar' })({ a: 'foo', b: 'bar', c: 'baz' }), false)
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

**Example**

```ts
import { lookup } from 'fp-ts/ReadonlyRecord'
import { option } from 'fp-ts'

assert.deepStrictEqual(lookup('b')({ a: 'foo', b: 'bar' }), option.some('bar'))
assert.deepStrictEqual(lookup('c')({ a: 'foo', b: 'bar' }), option.none)
```

Added in v2.5.0

## modifyAt

Applies a mapping function to one specific key/value pair in a `ReadonlyRecord`.

**Signature**

```ts
export declare const modifyAt: <A>(
  k: string,
  f: (a: A) => A
) => <K extends string>(r: Readonly<Record<K, A>>) => Option<Readonly<Record<K, A>>>
```

**Example**

```ts
import { modifyAt } from 'fp-ts/ReadonlyRecord'
import { option } from 'fp-ts'

assert.deepStrictEqual(modifyAt('a', (x: number) => x * 3)({ a: 1, b: 2 }), option.some({ a: 3, b: 2 }))
assert.deepStrictEqual(modifyAt('c', (x: number) => x * 3)({ a: 1, b: 2 }), option.none)
```

Added in v2.5.0

## partitionMapWithIndex

Maps a `ReadonlyRecord` with a function returning an `Either` and
partitions the resulting `ReadonlyRecord` into `Left`s and `Right`s.

**Signature**

```ts
export declare function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>>
```

**Example**

```ts
import { partitionMapWithIndex } from 'fp-ts/ReadonlyRecord'
import { either } from 'fp-ts'

const f = (key: string, a: number) =>
  a >= 0 ? either.right(`${key} is >= 0 (${a})`) : either.left(`${key} is < 0 (${a})`)
assert.deepStrictEqual(partitionMapWithIndex(f)({ a: -1, b: 2, c: 123 }), {
  left: {
    a: 'a is < 0 (-1)',
  },
  right: {
    b: 'b is >= 0 (2)',
    c: 'c is >= 0 (123)',
  },
})
```

Added in v2.5.0

## partitionWithIndex

Partition a `ReadonlyRecord` into two parts according to a predicate
that takes a key and a value.

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

**Example**

```ts
import { partitionWithIndex } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(
  partitionWithIndex((key: string, a: number) => key.length <= 1 && a > 0)({ a: -1, b: 2, ccc: 7 }),
  {
    left: {
      a: -1,
      ccc: 7,
    },
    right: {
      b: 2,
    },
  }
)
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

**Example**

```ts
import { pop } from 'fp-ts/ReadonlyRecord'
import { option } from 'fp-ts'

assert.deepStrictEqual(pop('a')({ a: 1, b: 2, c: 3 }), option.some([1, { b: 2, c: 3 }]))
assert.deepStrictEqual(pop('x')({ a: 1, b: 2, c: 3 }), option.none)
```

Added in v2.5.0

## reduceRightWithIndex

Same as `reduceWithIndex`, but reduce starting from the right
(i.e. in reverse order, from the last to the first entry according to
the given `Ord`).

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

**Example**

```ts
import { reduceRightWithIndex } from 'fp-ts/ReadonlyRecord'
import { Ord } from 'fp-ts/string'

const x = { c: 3, a: 'foo', b: false }
assert.deepStrictEqual(reduceRightWithIndex(Ord)([] as string[], (k, a, b) => [...b, `${k}-${a}`])(x), [
  'c-3',
  'b-false',
  'a-foo',
])
```

Added in v2.5.0

## reduceWithIndex

Reduces a `ReadonlyRecord` passing each key/value pair to the iterating function.
Entries are processed in the order, sorted by key according to
the given `Ord`.

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

**Example**

```ts
import { reduceWithIndex } from 'fp-ts/ReadonlyRecord'
import { Ord } from 'fp-ts/string'

const x = { c: 3, a: 'foo', b: false }
assert.deepStrictEqual(reduceWithIndex(Ord)([] as string[], (k, b, a) => [...b, `${k}-${a}`])(x), [
  'a-foo',
  'b-false',
  'c-3',
])
```

Added in v2.5.0

## sequence

`ReadonlyRecord` sequencing,
i.e., take a `ReadonlyRecord` in which elements are monads
and return a monad of a `ReadonlyRecord` of the base types.
The following example for instance shows sequencing
a `ReadonlyRecord<string, Option<number>>`
into an `Option<ReadonlyRecord<string, number>>`.

`sequence` in `ReadonlyRecord` is equivalent to `sequenceS` in `Apply.ts`.

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

**Example**

```ts
import { sequence } from 'fp-ts/ReadonlyRecord'
import { option } from 'fp-ts'
import { sequenceS } from 'fp-ts/Apply'

assert.deepStrictEqual(
  sequence(option.Applicative)({ a: option.some(1), b: option.some(2) }),
  option.some({ a: 1, b: 2 })
)
assert.deepStrictEqual(sequence(option.Applicative)({ a: option.some(1), b: option.none }), option.none)
assert.deepStrictEqual(
  sequence(option.Applicative)({ a: option.some(1), b: option.some(2) }),
  sequenceS(option.Applicative)({ a: option.some(1), b: option.some(2) })
)
```

Added in v2.5.0

## size

Calculate the number of key/value pairs in a `ReadonlyRecord`,

**Signature**

```ts
export declare const size: <A>(r: Readonly<Record<string, A>>) => number
```

**Example**

```ts
import { size } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(size({ a: true, b: 2, c: 'three' }), 3)
```

Added in v2.5.0

## some

Test if at least one value in a `ReadonlyRecord` satisfies the predicate.

**Signature**

```ts
export declare function some<A>(predicate: (a: A) => boolean): (r: ReadonlyRecord<string, A>) => boolean
```

**Example**

```ts
import { some } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(some((n: number) => n >= 0)({ a: 1, b: -2 }), true)
assert.deepStrictEqual(some((n: number) => n >= 0)({ a: -1, b: -2 }), false)
```

Added in v2.5.0

## toEntries

Alias of [`toReadonlyArray`](#toreadonlyarray).

**Signature**

```ts
export declare const toEntries: <K extends string, A>(r: Readonly<Record<K, A>>) => readonly (readonly [K, A])[]
```

**Example**

```ts
import { toEntries } from 'fp-ts/ReadonlyRecord'

assert.deepStrictEqual(toEntries({ b: 2, a: 1 }), [
  ['a', 1],
  ['b', 2],
])
```

Added in v2.12.0

## toReadonlyArray

Get a sorted `ReadonlyArray` of the key/value pairs contained in a `ReadonlyRecord`.

**Signature**

```ts
export declare const toReadonlyArray: <K extends string, A>(r: Readonly<Record<K, A>>) => readonly (readonly [K, A])[]
```

**Example**

```ts
import { toReadonlyArray } from 'fp-ts/ReadonlyRecord'

const x = { c: 3, a: 'foo', b: false }
assert.deepStrictEqual(toReadonlyArray(x), [
  ['a', 'foo'],
  ['b', false],
  ['c', 3],
])
```

Added in v2.5.0

## traverse

**Signature**

```ts
export declare function traverse<F extends URIS4>(
  F: Applicative4<F>
): <S, R, E, A, B>(
  f: (a: A) => Kind4<F, S, R, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind4<F, S, R, E, ReadonlyRecord<K, B>>
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
export declare function traverseWithIndex<F extends URIS4>(
  F: Applicative4<F>
): <K extends string, S, R, E, A, B>(
  f: (k: K, a: A) => Kind4<F, S, R, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind4<F, S, R, E, ReadonlyRecord<K, B>>
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

Replace a key/value pair in a `ReadonlyRecord`.

**Signature**

```ts
export declare const updateAt: <A>(
  k: string,
  a: A
) => <K extends string>(r: Readonly<Record<K, A>>) => Option<Readonly<Record<K, A>>>
```

**Example**

```ts
import { updateAt } from 'fp-ts/ReadonlyRecord'
import { option } from 'fp-ts'

assert.deepStrictEqual(updateAt('a', 3)({ a: 1, b: 2 }), option.some({ a: 3, b: 2 }))
assert.deepStrictEqual(updateAt('c', 3)({ a: 1, b: 2 }), option.none)
```

Added in v2.5.0

## ~~hasOwnProperty (function)~~

Use [`has`](#has) instead.

**Signature**

```ts
export declare function hasOwnProperty<K extends string>(k: string, r: ReadonlyRecord<K, unknown>): k is K
```

Added in v2.5.0
