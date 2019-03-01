---
title: Array.ts
nav_order: 5
---

# Overview

Adapted from https://github.com/purescript/purescript-arrays

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [URI](#uri-1)
- [array](#array)
- [empty](#empty)
- [catOptions](#catoptions)
- [chop](#chop)
- [chunksOf](#chunksof)
- [comprehension](#comprehension)
- [cons](#cons)
- [copy](#copy)
- [deleteAt](#deleteat)
- [difference](#difference)
- [drop](#drop)
- [dropEnd](#dropend)
- [dropWhile](#dropwhile)
- [elem](#elem)
- [filter](#filter)
- [findFirst](#findfirst)
- [findIndex](#findindex)
- [findLast](#findlast)
- [findLastIndex](#findlastindex)
- [flatten](#flatten)
- [fold](#fold)
- [foldL](#foldl)
- [foldr](#foldr)
- [foldrL](#foldrl)
- [getMonoid](#getmonoid)
- [getOrd](#getord)
- [getSetoid](#getsetoid)
- [head](#head)
- [~~index~~](#index)
- [init](#init)
- [insertAt](#insertat)
- [intersection](#intersection)
- [isEmpty](#isempty)
- [isOutOfBound](#isoutofbound)
- [last](#last)
- [lefts](#lefts)
- [lookup](#lookup)
- [makeBy](#makeby)
- [mapOption](#mapoption)
- [~~member~~](#member)
- [modifyAt](#modifyat)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [range](#range)
- [~~refine~~](#refine)
- [replicate](#replicate)
- [reverse](#reverse)
- [rights](#rights)
- [rotate](#rotate)
- [scanLeft](#scanleft)
- [scanRight](#scanright)
- [snoc](#snoc)
- [sort](#sort)
- [sortBy](#sortby)
- [sortBy1](#sortby1)
- [span](#span)
- [split](#split)
- [tail](#tail)
- [take](#take)
- [takeEnd](#takeend)
- [takeWhile](#takewhile)
- [~~traverse~~](#traverse)
- [union](#union)
- [uniq](#uniq)
- [unsafeDeleteAt](#unsafedeleteat)
- [unsafeInsertAt](#unsafeinsertat)
- [unsafeUpdateAt](#unsafeupdateat)
- [unzip](#unzip)
- [updateAt](#updateat)
- [zip](#zip)
- [zipWith](#zipwith)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# array

**Signature** (constant)

```ts
export const array: Monad1<URI> &
  Foldable2v1<URI> &
  Unfoldable1<URI> &
  TraversableWithIndex1<URI, number> &
  Alternative1<URI> &
  Plus1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, number> &
  Witherable1<URI> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> = ...
```

Added in v1.0.0

# empty

An empty array

**Signature** (constant)

```ts
export const empty: Array<never> = ...
```

Added in v1.9.0

# catOptions

Filter an array of optional values, keeping only the elements which contain a value, creating a new array.

Alias of `Compactable`'s `compact`

**Signature** (function)

```ts
export const catOptions = <A>(as: Array<Option<A>>): Array<A> => ...
```

**Example**

```ts
import { catOptions } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(catOptions([some(1), none, some(3)]), [1, 3])
```

Added in v1.0.0

# chop

A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
value and the rest of the array.

**Signature** (function)

```ts
export const chop = <A, B>(as: Array<A>, f: (as: Array<A>) => [B, Array<A>]): Array<B> => ...
```

**Example**

```ts
import { Setoid, setoidNumber } from 'fp-ts/lib/Setoid'
import { chop, span } from 'fp-ts/lib/Array'

const group = <A>(S: Setoid<A>) => (as: Array<A>): Array<Array<A>> => {
  return chop(as, as => {
    const { init, rest } = span(as, a => S.equals(a, as[0]))
    return [init, rest]
  })
}
assert.deepStrictEqual(group(setoidNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
```

Added in v1.10.0

# chunksOf

Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the array. Note that `chunksOf([], n)` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that

```ts
chunksOf(xs, n).concat(chunksOf(ys, n)) == chunksOf(xs.concat(ys)), n)
```

whenever `n` evenly divides the length of `xs`.

**Signature** (function)

```ts
export const chunksOf = <A>(as: Array<A>, n: number): Array<Array<A>> => ...
```

**Example**

```ts
import { chunksOf } from 'fp-ts/lib/Array'

assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]])
```

Added in v1.10.0

# comprehension

Array comprehension

```
[ g(x, y, ...) | x ← xs, y ← ys, ..., f(x, y, ...) ]
```

**Signature** (function)

```ts
export function comprehension<A, B, C, D, R>(
  input: [Array<A>, Array<B>, Array<C>, Array<D>],
  f: (a: A, b: B, c: C, d: D) => boolean,
  g: (a: A, b: B, c: C, d: D) => R
): Array<R>
export function comprehension<A, B, C, R>(
  input: [Array<A>, Array<B>, Array<C>],
  f: (a: A, b: B, c: C) => boolean,
  g: (a: A, b: B, c: C) => R
): Array<R>
export function comprehension<A, R>(input: [Array<A>], f: (a: A) => boolean, g: (a: A) => R): Array<R>
export function comprehension<A, B, R>(
  input: [Array<A>, Array<B>],
  f: (a: A, b: B) => boolean,
  g: (a: A, b: B) => R
): Array<R>
export function comprehension<A, R>(input: [Array<A>], f: (a: A) => boolean, g: (a: A) => R): Array<R>
export function comprehension<R>(
  input: Array<Array<any>>,
  f: (...xs: Array<any>) => boolean,
  g: (...xs: Array<any>) => R
): Array<R> { ... }
```

**Example**

```ts
import { comprehension } from 'fp-ts/lib/Array'
import { tuple } from 'fp-ts/lib/function'

assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], (a, b) => (a + b.length) % 2 === 0, tuple), [
  [1, 'a'],
  [1, 'b'],
  [3, 'a'],
  [3, 'b']
])
```

Added in v1.10.0

# cons

Attaches an element to the front of an array, creating a new array

**Signature** (function)

```ts
export const cons = <A>(a: A, as: Array<A>): Array<A> => ...
```

**Example**

```ts
import { cons } from 'fp-ts/lib/Array'

assert.deepStrictEqual(cons(0, [1, 2, 3]), [0, 1, 2, 3])
```

Added in v1.0.0

# copy

**Signature** (function)

```ts
export const copy = <A>(as: Array<A>): Array<A> => ...
```

Added in v1.0.0

# deleteAt

Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature** (function)

```ts
export const deleteAt = <A>(i: number, as: Array<A>): Option<Array<A>> => ...
```

**Example**

```ts
import { deleteAt } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(deleteAt(0, [1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(deleteAt(1, []), none)
```

Added in v1.0.0

# difference

Creates an array of array values not included in the other given array using a `Setoid` for equality
comparisons. The order and references of result values are determined by the first array.

**Signature** (function)

```ts
export const difference = <A>(S: Setoid<A>): ((xs: Array<A>, ys: Array<A>) => Array<A>) => ...
```

**Example**

```ts
import { difference } from 'fp-ts/lib/Array'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.deepStrictEqual(difference(setoidNumber)([1, 2], [2, 3]), [1])
```

Added in v1.12.0

# drop

Drop a number of elements from the start of an array, creating a new array

**Signature** (function)

```ts
export const drop = <A>(n: number, as: Array<A>): Array<A> => ...
```

**Example**

```ts
import { drop } from 'fp-ts/lib/Array'

assert.deepStrictEqual(drop(2, [1, 2, 3]), [3])
```

Added in v1.0.0

# dropEnd

Drop a number of elements from the end of an array, creating a new array

**Signature** (function)

```ts
export const dropEnd = <A>(n: number, as: Array<A>): Array<A> => ...
```

**Example**

```ts
import { dropEnd } from 'fp-ts/lib/Array'

assert.deepStrictEqual(dropEnd(2, [1, 2, 3, 4, 5]), [1, 2, 3])
```

Added in v1.10.0

# dropWhile

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array

**Signature** (function)

```ts
export const dropWhile = <A>(as: Array<A>, predicate: Predicate<A>): Array<A> => ...
```

**Example**

```ts
import { dropWhile } from 'fp-ts/lib/Array'

assert.deepStrictEqual(dropWhile([1, 3, 2, 4, 5], n => n % 2 === 1), [2, 4, 5])
```

Added in v1.0.0

# elem

Test if a value is a member of an array. Takes a `Setoid<A>` as a single
argument which returns the function to use to search for a value of type `A` in
an array of type `Array<A>`.

**Signature** (function)

```ts
export const elem = <A>(S: Setoid<A>) => (a: A, as: Array<A>): boolean => ...
```

**Example**

```ts
import { elem } from 'fp-ts/lib/Array'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.strictEqual(elem(setoidNumber)(1, [1, 2, 3]), true)
assert.strictEqual(elem(setoidNumber)(4, [1, 2, 3]), false)
```

Added in v1.14.0

# filter

Filter an array, keeping the elements which satisfy a predicate function, creating a new array

**Signature** (function)

```ts
export function filter<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Array<B>
export function filter<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
export function filter<A>(as: Array<A>, predicate: Predicate<A>): Array<A> { ... }
```

Added in v1.0.0

# findFirst

Find the first element which satisfies a predicate (or a refinement) function

**Signature** (function)

```ts
export function findFirst<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Option<B>
export function findFirst<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
export function findFirst<A>(as: Array<A>, predicate: Predicate<A>): Option<A> { ... }
```

**Example**

```ts
import { findFirst } from 'fp-ts/lib/Array'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(findFirst([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 1 }))
```

Added in v1.0.0

# findIndex

Find the first index for which a predicate holds

**Signature** (function)

```ts
export const findIndex = <A>(as: Array<A>, predicate: Predicate<A>): Option<number> => ...
```

**Example**

```ts
import { findIndex } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(findIndex([1, 2, 3], x => x === 2), some(1))
assert.deepStrictEqual(findIndex([], x => x === 2), none)
```

Added in v1.0.0

# findLast

Find the last element which satisfies a predicate function

**Signature** (function)

```ts
export function findLast<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Option<B>
export function findLast<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
export function findLast<A>(as: Array<A>, predicate: Predicate<A>): Option<A> { ... }
```

**Example**

```ts
import { findLast } from 'fp-ts/lib/Array'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(findLast([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 2 }))
```

Added in v1.0.0

# findLastIndex

Returns the index of the last element of the list which matches the predicate

**Signature** (function)

```ts
export const findLastIndex = <A>(as: Array<A>, predicate: Predicate<A>): Option<number> => ...
```

**Example**

```ts
import { findLastIndex } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

interface X {
  a: number
  b: number
}
const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
assert.deepStrictEqual(findLastIndex(xs, x => x.a === 1), some(1))
assert.deepStrictEqual(findLastIndex(xs, x => x.a === 4), none)
```

Added in v1.10.0

# flatten

Removes one level of nesting

**Signature** (function)

```ts
export const flatten = <A>(ffa: Array<Array<A>>): Array<A> => ...
```

**Example**

```ts
import { flatten } from 'fp-ts/lib/Array'

assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
```

Added in v1.0.0

# fold

Break an array into its first element and remaining elements

**Signature** (function)

```ts
export const fold = <A, B>(as: Array<A>, b: B, cons: (head: A, tail: Array<A>) => B): B => ...
```

**Example**

```ts
import { fold } from 'fp-ts/lib/Array'

const len = <A>(as: Array<A>): number => fold(as, 0, (_, tail) => 1 + len(tail))
assert.strictEqual(len([1, 2, 3]), 3)
```

Added in v1.0.0

# foldL

Lazy version of `fold`

**Signature** (function)

```ts
export const foldL = <A, B>(as: Array<A>, nil: () => B, cons: (head: A, tail: Array<A>) => B): B => ...
```

Added in v1.0.0

# foldr

Break an array into its initial elements and the last element

**Signature** (function)

```ts
export const foldr = <A, B>(as: Array<A>, b: B, cons: (init: Array<A>, last: A) => B): B => ...
```

Added in v1.7.0

# foldrL

Lazy version of `foldr`

**Signature** (function)

```ts
export const foldrL = <A, B>(as: Array<A>, nil: () => B, cons: (init: Array<A>, last: A) => B): B => ...
```

Added in v1.7.0

# getMonoid

**Signature** (function)

```ts
export const getMonoid = <A = never>(): Monoid<Array<A>> => ...
```

**Example**

```ts
import { getMonoid } from 'fp-ts/lib/Array'

const M = getMonoid<number>()
assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
```

Added in v1.0.0

# getOrd

Derives an `Ord` over the Array of a given element type from the `Ord` of that type. The ordering between two such
arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
the same length, the result is equality.

**Signature** (function)

```ts
export const getOrd = <A>(O: Ord<A>): Ord<Array<A>> => ...
```

**Example**

```ts
import { getOrd } from 'fp-ts/lib/Array'
import { ordString } from 'fp-ts/lib/Ord'

const O = getOrd(ordString)
assert.strictEqual(O.compare(['b'], ['a']), 1)
assert.strictEqual(O.compare(['a'], ['a']), 0)
assert.strictEqual(O.compare(['a'], ['b']), -1)
```

Added in v1.2.0

# getSetoid

Derives a Setoid over the Array of a given element type from the Setoid of that type. The derived setoid defines two
arrays as equal if all elements of both arrays are compared equal pairwise with the given setoid `S`. In case of
arrays of different lengths, the result is non equality.

**Signature** (function)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => ...
```

**Example**

```ts
import { ordString } from 'fp-ts/lib/Ord'
import { getSetoid } from 'fp-ts/lib/Array'

const O = getSetoid(ordString)
assert.strictEqual(O.equals(['a', 'b'], ['a', 'b']), true)
assert.strictEqual(O.equals(['a'], []), false)
```

Added in v1.0.0

# head

Get the first element in an array, or `None` if the array is empty

**Signature** (function)

```ts
export const head = <A>(as: Array<A>): Option<A> => ...
```

**Example**

```ts
import { head } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(head([1, 2, 3]), some(1))
assert.deepStrictEqual(head([]), none)
```

Added in v1.0.0

# ~~index~~

Use `lookup` instead

**Signature** (function)

```ts
export const index = <A>(i: number, as: Array<A>): Option<A> => ...
```

Added in v1.0.0

# init

Get all but the last element of an array, creating a new array, or `None` if the array is empty

**Signature** (function)

```ts
export const init = <A>(as: Array<A>): Option<Array<A>> => ...
```

**Example**

```ts
import { init } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
assert.deepStrictEqual(init([]), none)
```

Added in v1.0.0

# insertAt

Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature** (function)

```ts
export const insertAt = <A>(i: number, a: A, as: Array<A>): Option<Array<A>> => ...
```

**Example**

```ts
import { insertAt } from 'fp-ts/lib/Array'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(insertAt(2, 5, [1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
```

Added in v1.0.0

# intersection

Creates an array of unique values that are included in all given arrays using a `Setoid` for equality
comparisons. The order and references of result values are determined by the first array.

**Signature** (function)

```ts
export const intersection = <A>(S: Setoid<A>): ((xs: Array<A>, ys: Array<A>) => Array<A>) => ...
```

**Example**

```ts
import { intersection } from 'fp-ts/lib/Array'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.deepStrictEqual(intersection(setoidNumber)([1, 2], [2, 3]), [2])
```

Added in v1.12.0

# isEmpty

Test whether an array is empty

**Signature** (function)

```ts
export const isEmpty = <A>(as: Array<A>): boolean => ...
```

**Example**

```ts
import { isEmpty } from 'fp-ts/lib/Array'

assert.strictEqual(isEmpty([]), true)
```

Added in v1.0.0

# isOutOfBound

Test whether an array contains a particular index

**Signature** (function)

```ts
export const isOutOfBound = <A>(i: number, as: Array<A>): boolean => ...
```

Added in v1.0.0

# last

Get the last element in an array, or `None` if the array is empty

**Signature** (function)

```ts
export const last = <A>(as: Array<A>): Option<A> => ...
```

**Example**

```ts
import { last } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(last([1, 2, 3]), some(3))
assert.deepStrictEqual(last([]), none)
```

Added in v1.0.0

# lefts

Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order

**Signature** (function)

```ts
export const lefts = <L, A>(as: Array<Either<L, A>>): Array<L> => ...
```

**Example**

```ts
import { lefts } from 'fp-ts/lib/Array'
import { left, right } from 'fp-ts/lib/Either'

assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
```

Added in v1.0.0

# lookup

This function provides a safe way to read a value at a particular index from an array

**Signature** (function)

```ts
export const lookup = <A>(i: number, as: Array<A>): Option<A> => ...
```

**Example**

```ts
import { lookup } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(lookup(1, [1, 2, 3]), some(2))
assert.deepStrictEqual(lookup(3, [1, 2, 3]), none)
```

Added in v1.14.0

# makeBy

Return a list of length `n` with element `i` initialized with `f(i)`

**Signature** (function)

```ts
export const makeBy = <A>(n: number, f: (i: number) => A): Array<A> => ...
```

**Example**

```ts
import { makeBy } from 'fp-ts/lib/Array'

const double = (n: number): number => n * 2
assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
```

Added in v1.10.0

# mapOption

Apply a function to each element in an array, keeping only the results which contain a value, creating a new array.

Alias of `Filterable`'s `filterMap`

**Signature** (function)

```ts
export const mapOption = <A, B>(as: Array<A>, f: (a: A) => Option<B>): Array<B> => ...
```

**Example**

```ts
import { mapOption } from 'fp-ts/lib/Array'
import { Option, some, none } from 'fp-ts/lib/Option'

const f = (n: number): Option<number> => (n % 2 === 0 ? none : some(n))
assert.deepStrictEqual(mapOption([1, 2, 3], f), [1, 3])
```

Added in v1.0.0

# ~~member~~

Use `elem` instead

**Signature** (function)

```ts
export const member = <A>(S: Setoid<A>): ((as: Array<A>, a: A) => boolean) => ...
```

Added in v1.3.0

# modifyAt

Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
of bounds

**Signature** (function)

```ts
export const modifyAt = <A>(as: Array<A>, i: number, f: Endomorphism<A>): Option<Array<A>> => ...
```

**Example**

```ts
import { modifyAt } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

const double = (x: number): number => x * 2
assert.deepStrictEqual(modifyAt([1, 2, 3], 1, double), some([1, 4, 3]))
assert.deepStrictEqual(modifyAt([], 1, double), none)
```

Added in v1.0.0

# partition

**Signature** (function)

```ts
export function partition<A, B extends A>(fa: Array<A>, p: Refinement<A, B>): Separated<Array<A>, Array<B>>
export function partition<A>(fa: Array<A>, p: Predicate<A>): Separated<Array<A>, Array<A>>
export function partition<A>(fa: Array<A>, p: Predicate<A>): Separated<Array<A>, Array<A>> { ... }
```

Added in v1.12.0

# partitionMap

**Signature** (function)

```ts
export const partitionMap = <A, L, R>(fa: Array<A>, f: (a: A) => Either<L, R>): Separated<Array<L>, Array<R>> => ...
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { left, right } from 'fp-ts/lib/Either'
import { identity } from 'fp-ts/lib/function'

assert.deepStrictEqual(array.partitionMap([right(1), left('foo'), right(2)], identity), {
  left: ['foo'],
  right: [1, 2]
})
```

Added in v1.0.0

# range

Create an array containing a range of integers, including both endpoints

**Signature** (function)

```ts
export const range = (start: number, end: number): Array<number> => ...
```

**Example**

```ts
import { range } from 'fp-ts/lib/Array'

assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
```

Added in v1.10.0

# ~~refine~~

Use `filter` instead

**Signature** (function)

```ts
export const refine = <A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Array<B> => ...
```

Added in v1.0.0

# replicate

Create an array containing a value repeated the specified number of times

**Signature** (function)

```ts
export const replicate = <A>(n: number, a: A): Array<A> => ...
```

**Example**

```ts
import { replicate } from 'fp-ts/lib/Array'

assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
```

Added in v1.10.0

# reverse

Reverse an array, creating a new array

**Signature** (function)

```ts
export const reverse = <A>(as: Array<A>): Array<A> => ...
```

**Example**

```ts
import { reverse } from 'fp-ts/lib/Array'

assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
```

Added in v1.0.0

# rights

Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order

**Signature** (function)

```ts
export const rights = <L, A>(as: Array<Either<L, A>>): Array<A> => ...
```

**Example**

```ts
import { rights } from 'fp-ts/lib/Array'
import { right, left } from 'fp-ts/lib/Either'

assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
```

Added in v1.0.0

# rotate

Rotate an array to the right by `n` steps

**Signature** (function)

```ts
export const rotate = <A>(n: number, xs: Array<A>): Array<A> => ...
```

**Example**

```ts
import { rotate } from 'fp-ts/lib/Array'

assert.deepStrictEqual(rotate(2, [1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
```

Added in v1.0.0

# scanLeft

Same as `reduce` but it carries over the intermediate steps

```ts
import { scanLeft } from 'fp-ts/lib/Array'

assert.deepStrictEqual(scanLeft([1, 2, 3], 10, (b, a) => b - a), [10, 9, 7, 4])
```

**Signature** (function)

```ts
export const scanLeft = <A, B>(as: Array<A>, b: B, f: ((b: B, a: A) => B)): Array<B> => ...
```

Added in v1.1.0

# scanRight

Fold an array from the right, keeping all intermediate results instead of only the final result

**Signature** (function)

```ts
export const scanRight = <A, B>(as: Array<A>, b: B, f: (a: A, b: B) => B): Array<B> => ...
```

**Example**

```ts
import { scanRight } from 'fp-ts/lib/Array'

assert.deepStrictEqual(scanRight([1, 2, 3], 10, (a, b) => b - a), [4, 5, 7, 10])
```

Added in v1.1.0

# snoc

Append an element to the end of an array, creating a new array

**Signature** (function)

```ts
export const snoc = <A>(as: Array<A>, a: A): Array<A> => ...
```

**Example**

```ts
import { snoc } from 'fp-ts/lib/Array'

assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
```

Added in v1.0.0

# sort

Sort the elements of an array in increasing order, creating a new array

**Signature** (function)

```ts
export const sort = <A>(O: Ord<A>) => (as: Array<A>): Array<A> => ...
```

**Example**

```ts
import { sort } from 'fp-ts/lib/Array'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
```

Added in v1.0.0

# sortBy

Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
etc...

**Signature** (function)

```ts
export const sortBy = <A>(ords: Array<Ord<A>>): Option<Endomorphism<Array<A>>> => ...
```

**Example**

```ts
import { sortBy } from 'fp-ts/lib/Array'
import { contramap, ordString, ordNumber } from 'fp-ts/lib/Ord'

interface Person {
  name: string
  age: number
}
const byName = contramap((p: Person) => p.name, ordString)
const byAge = contramap((p: Person) => p.age, ordNumber)

const sortByNameByAge = sortBy([byName, byAge])

if (sortByNameByAge.isSome()) {
  const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
  assert.deepStrictEqual(sortByNameByAge.value(persons), [
    { name: 'a', age: 1 },
    { name: 'b', age: 2 },
    { name: 'b', age: 3 },
    { name: 'c', age: 2 }
  ])
}
```

Added in v1.3.0

# sortBy1

Non failing version of `sortBy`

**Signature** (function)

```ts
export const sortBy1 = <A>(head: Ord<A>, tail: Array<Ord<A>>): Endomorphism<Array<A>> => ...
```

**Example**

```ts
import { sortBy1 } from 'fp-ts/lib/Array'
import { contramap, ordString, ordNumber } from 'fp-ts/lib/Ord'

interface Person {
  name: string
  age: number
}
const byName = contramap((p: Person) => p.name, ordString)
const byAge = contramap((p: Person) => p.age, ordNumber)

const sortByNameByAge = sortBy1(byName, [byAge])

const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
assert.deepStrictEqual(sortByNameByAge(persons), [
  { name: 'a', age: 1 },
  { name: 'b', age: 2 },
  { name: 'b', age: 3 },
  { name: 'c', age: 2 }
])
```

Added in v1.3.0

# span

Split an array into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

**Signature** (function)

```ts
export function span<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): { init: Array<B>; rest: Array<A> }
export function span<A>(as: Array<A>, predicate: Predicate<A>): { init: Array<A>; rest: Array<A> }
export function span<A>(as: Array<A>, predicate: Predicate<A>): { ... }
```

**Example**

```ts
import { span } from 'fp-ts/lib/Array'

assert.deepStrictEqual(span([1, 3, 2, 4, 5], n => n % 2 === 1), { init: [1, 3], rest: [2, 4, 5] })
```

Added in v1.0.0

# split

Splits an array into two pieces, the first piece has `n` elements.

**Signature** (function)

```ts
export const split = <A>(n: number, as: Array<A>): [Array<A>, Array<A>] => ...
```

**Example**

```ts
import { split } from 'fp-ts/lib/Array'

assert.deepStrictEqual(split(2, [1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
```

Added in v1.10.0

# tail

Get all but the first element of an array, creating a new array, or `None` if the array is empty

**Signature** (function)

```ts
export const tail = <A>(as: Array<A>): Option<Array<A>> => ...
```

**Example**

```ts
import { tail } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(tail([]), none)
```

Added in v1.0.0

# take

Keep only a number of elements from the start of an array, creating a new array.
`n` must be a natural number

**Signature** (function)

```ts
export const take = <A>(n: number, as: Array<A>): Array<A> => ...
```

**Example**

```ts
import { take } from 'fp-ts/lib/Array'

assert.deepStrictEqual(take(2, [1, 2, 3]), [1, 2])
```

Added in v1.0.0

# takeEnd

Keep only a number of elements from the end of an array, creating a new array.
`n` must be a natural number

**Signature** (function)

```ts
export const takeEnd = <A>(n: number, as: Array<A>): Array<A> => ...
```

**Example**

```ts
import { takeEnd } from 'fp-ts/lib/Array'

assert.deepStrictEqual(takeEnd(2, [1, 2, 3, 4, 5]), [4, 5])
```

Added in v1.10.0

# takeWhile

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array

**Signature** (function)

```ts
export function takeWhile<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Array<B>
export function takeWhile<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
export function takeWhile<A>(as: Array<A>, predicate: Predicate<A>): Array<A> { ... }
```

**Example**

```ts
import { takeWhile } from 'fp-ts/lib/Array'

assert.deepStrictEqual(takeWhile([2, 4, 3, 6], n => n % 2 === 0), [2, 4])
```

Added in v1.0.0

# ~~traverse~~

Use `array.traverse` instead

**Signature** (function)

```ts
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: Array<A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Array<B>>
export function traverse<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A, B>(ta: Array<A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Array<B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: Array<A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Array<B>>
export function traverse<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(ta: Array<A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Array<B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: Array<A>, f: (a: A) => Type<F, B>) => Type<F, Array<B>>
export function traverse<F>(F: Applicative<F>): <A, B>(ta: Array<A>, f: (a: A) => HKT<F, B>) => HKT<F, Array<B>>
export function traverse<F>(F: Applicative<F>): <A, B>(ta: Array<A>, f: (a: A) => HKT<F, B>) => HKT<F, Array<B>> { ... }
```

Added in v1.0.0

# union

Creates an array of unique values, in order, from all given arrays using a `Setoid` for equality comparisons

**Signature** (function)

```ts
export const union = <A>(S: Setoid<A>): ((xs: Array<A>, ys: Array<A>) => Array<A>) => ...
```

**Example**

```ts
import { union } from 'fp-ts/lib/Array'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.deepStrictEqual(union(setoidNumber)([1, 2], [2, 3]), [1, 2, 3])
```

Added in v1.12.0

# uniq

Remove duplicates from an array, keeping the first occurance of an element.

**Signature** (function)

```ts
export const uniq = <A>(S: Setoid<A>): ((as: Array<A>) => Array<A>) => ...
```

**Example**

```ts
import { uniq } from 'fp-ts/lib/Array'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.deepStrictEqual(uniq(setoidNumber)([1, 2, 1]), [1, 2])
```

Added in v1.3.0

# unsafeDeleteAt

**Signature** (function)

```ts
export const unsafeDeleteAt = <A>(i: number, as: Array<A>): Array<A> => ...
```

Added in v1.0.0

# unsafeInsertAt

**Signature** (function)

```ts
export const unsafeInsertAt = <A>(i: number, a: A, as: Array<A>): Array<A> => ...
```

Added in v1.0.0

# unsafeUpdateAt

**Signature** (function)

```ts
export const unsafeUpdateAt = <A>(i: number, a: A, as: Array<A>): Array<A> => ...
```

Added in v1.0.0

# unzip

The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays

**Signature** (function)

```ts
export const unzip = <A, B>(as: Array<[A, B]>): [Array<A>, Array<B>] => ...
```

**Example**

```ts
import { unzip } from 'fp-ts/lib/Array'

assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
```

Added in v1.13.0

# updateAt

Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature** (function)

```ts
export const updateAt = <A>(i: number, a: A, as: Array<A>): Option<Array<A>> => ...
```

**Example**

```ts
import { updateAt } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(updateAt(1, 1, [1, 2, 3]), some([1, 1, 3]))
assert.deepStrictEqual(updateAt(1, 1, []), none)
```

Added in v1.0.0

# zip

Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
longer array are discarded

**Signature** (function)

```ts
export const zip = <A, B>(fa: Array<A>, fb: Array<B>): Array<[A, B]> => ...
```

**Example**

```ts
import { zip } from 'fp-ts/lib/Array'

assert.deepStrictEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
```

Added in v1.0.0

# zipWith

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
input array is short, excess elements of the longer array are discarded.

**Signature** (function)

```ts
export const zipWith = <A, B, C>(fa: Array<A>, fb: Array<B>, f: (a: A, b: B) => C): Array<C> => ...
```

**Example**

```ts
import { zipWith } from 'fp-ts/lib/Array'

assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
```

Added in v1.0.0
