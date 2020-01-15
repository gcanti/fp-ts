---
title: Array.ts
nav_order: 5
parent: Modules
---

# Array overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [array](#array)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [chop](#chop)
- [chunksOf](#chunksof)
- [compact](#compact)
- [comprehension](#comprehension)
- [cons](#cons)
- [copy](#copy)
- [deleteAt](#deleteat)
- [difference](#difference)
- [dropLeft](#dropleft)
- [dropLeftWhile](#dropleftwhile)
- [dropRight](#dropright)
- [duplicate](#duplicate)
- [elem](#elem)
- [empty](#empty)
- [extend](#extend)
- [filter](#filter)
- [filterMap](#filtermap)
- [filterMapWithIndex](#filtermapwithindex)
- [filterWithIndex](#filterwithindex)
- [findFirst](#findfirst)
- [findFirstMap](#findfirstmap)
- [findIndex](#findindex)
- [findLast](#findlast)
- [findLastIndex](#findlastindex)
- [findLastMap](#findlastmap)
- [flatten](#flatten)
- [foldLeft](#foldleft)
- [foldMap](#foldmap)
- [foldMapWithIndex](#foldmapwithindex)
- [foldRight](#foldright)
- [getEq](#geteq)
- [getMonoid](#getmonoid)
- [getOrd](#getord)
- [getShow](#getshow)
- [head](#head)
- [init](#init)
- [insertAt](#insertat)
- [intersection](#intersection)
- [isEmpty](#isempty)
- [isNonEmpty](#isnonempty)
- [isOutOfBound](#isoutofbound)
- [last](#last)
- [lefts](#lefts)
- [lookup](#lookup)
- [makeBy](#makeby)
- [map](#map)
- [mapWithIndex](#mapwithindex)
- [modifyAt](#modifyat)
- [of](#of)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [partitionMapWithIndex](#partitionmapwithindex)
- [partitionWithIndex](#partitionwithindex)
- [range](#range)
- [reduce](#reduce)
- [reduceRight](#reduceright)
- [reduceRightWithIndex](#reducerightwithindex)
- [reduceWithIndex](#reducewithindex)
- [replicate](#replicate)
- [reverse](#reverse)
- [rights](#rights)
- [rotate](#rotate)
- [scanLeft](#scanleft)
- [scanRight](#scanright)
- [separate](#separate)
- [snoc](#snoc)
- [sort](#sort)
- [sortBy](#sortby)
- [spanLeft](#spanleft)
- [splitAt](#splitat)
- [tail](#tail)
- [takeLeft](#takeleft)
- [takeLeftWhile](#takeleftwhile)
- [takeRight](#takeright)
- [union](#union)
- [uniq](#uniq)
- [unsafeDeleteAt](#unsafedeleteat)
- [unsafeInsertAt](#unsafeinsertat)
- [unsafeUpdateAt](#unsafeupdateat)
- [unzip](#unzip)
- [updateAt](#updateat)
- [zip](#zip)
- [zipWith](#zipwith)

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
export const URI: "Array" = ...
```

Added in v2.0.0

# alt

**Signature**

```ts
<A>(that: () => A[]) => (fa: A[]) => A[]
```

Added in v2.0.0

# ap

**Signature**

```ts
<A>(fa: A[]) => <B>(fab: ((a: A) => B)[]) => B[]
```

Added in v2.0.0

# apFirst

**Signature**

```ts
<B>(fb: B[]) => <A>(fa: A[]) => A[]
```

Added in v2.0.0

# apSecond

**Signature**

```ts
<B>(fb: B[]) => <A>(fa: A[]) => B[]
```

Added in v2.0.0

# array

**Signature**

```ts
export const array: Monad1<URI> &
  Foldable1<URI> &
  Unfoldable1<URI> &
  TraversableWithIndex1<URI, number> &
  Alternative1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, number> &
  Witherable1<URI> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> = ...
```

Added in v2.0.0

# chain

**Signature**

```ts
<A, B>(f: (a: A) => B[]) => (ma: A[]) => B[]
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
<A, B>(f: (a: A) => B[]) => (ma: A[]) => A[]
```

Added in v2.0.0

# chop

A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
value and the rest of the array.

**Signature**

```ts
export const chop: <A, B>(f: (as: NonEmptyArray<A>) => [B, Array<A>]) => (as: Array<A>) => Array<B> = ...
```

**Example**

```ts
import { Eq, eqNumber } from 'fp-ts/lib/Eq'
import { chop, spanLeft } from 'fp-ts/lib/Array'

const group = <A>(S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
  return chop(as => {
    const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
    return [init, rest]
  })
}
assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
```

Added in v2.0.0

# chunksOf

Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that

```ts
chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
```

whenever `n` evenly divides the length of `xs`.

**Signature**

```ts
export const chunksOf: (n: number) => <A>(as: Array<A>) => Array<Array<A>> = ...
```

**Example**

```ts
import { chunksOf } from 'fp-ts/lib/Array'

assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
```

Added in v2.0.0

# compact

**Signature**

```ts
<A>(fa: Option<A>[]) => A[]
```

Added in v2.0.0

# comprehension

Array comprehension

```
[ f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) ]
```

**Signature**

```ts
export function comprehension<A, B, C, D, R>(
  input: [Array<A>, Array<B>, Array<C>, Array<D>],
  f: (a: A, b: B, c: C, d: D) => R,
  g?: (a: A, b: B, c: C, d: D) => boolean
): Array<R>
export function comprehension<A, B, C, R>(
  input: [Array<A>, Array<B>, Array<C>],
  f: (a: A, b: B, c: C) => R,
  g?: (a: A, b: B, c: C) => boolean
): Array<R>
export function comprehension<A, R>(input: [Array<A>], f: (a: A) => R, g?: (a: A) => boolean): Array<R>
export function comprehension<A, B, R>(
  input: [Array<A>, Array<B>],
  f: (a: A, b: B) => R,
  g?: (a: A, b: B) => boolean
): Array<R>
export function comprehension<A, R>(input: [Array<A>], f: (a: A) => boolean, g?: (a: A) => R): Array<R> { ... }
```

**Example**

```ts
import { comprehension } from 'fp-ts/lib/Array'
import { tuple } from 'fp-ts/lib/function'

assert.deepStrictEqual(
  comprehension(
    [
      [1, 2, 3],
      ['a', 'b']
    ],
    tuple,
    (a, b) => (a + b.length) % 2 === 0
  ),
  [
    [1, 'a'],
    [1, 'b'],
    [3, 'a'],
    [3, 'b']
  ]
)
```

Added in v2.0.0

# cons

Attaches an element to the front of an array, creating a new non empty array

**Signature**

```ts
export const cons: <A>(head: A, tail: Array<A>) => NonEmptyArray<A> = ...
```

**Example**

```ts
import { cons } from 'fp-ts/lib/Array'

assert.deepStrictEqual(cons(0, [1, 2, 3]), [0, 1, 2, 3])
```

Added in v2.0.0

# copy

**Signature**

```ts
export const copy: <A>(as: Array<A>) => Array<A> = ...
```

Added in v2.0.0

# deleteAt

Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature**

```ts
export const deleteAt: (i: number) => <A>(as: Array<A>) => Option<Array<A>> = ...
```

**Example**

```ts
import { deleteAt } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(deleteAt(1)([]), none)
```

Added in v2.0.0

# difference

Creates an array of array values not included in the other given array using a `Eq` for equality
comparisons. The order and references of result values are determined by the first array.

**Signature**

```ts
export const difference: <A>(E: Eq<A>) => (xs: Array<A>, ys: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { difference } from 'fp-ts/lib/Array'
import { eqNumber } from 'fp-ts/lib/Eq'

assert.deepStrictEqual(difference(eqNumber)([1, 2], [2, 3]), [1])
```

Added in v2.0.0

# dropLeft

Drop a number of elements from the start of an array, creating a new array

**Signature**

```ts
export const dropLeft: (n: number) => <A>(as: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { dropLeft } from 'fp-ts/lib/Array'

assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
```

Added in v2.0.0

# dropLeftWhile

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array

**Signature**

```ts
export const dropLeftWhile: <A>(predicate: Predicate<A>) => (as: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { dropLeftWhile } from 'fp-ts/lib/Array'

assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
```

Added in v2.0.0

# dropRight

Drop a number of elements from the end of an array, creating a new array

**Signature**

```ts
export const dropRight: (n: number) => <A>(as: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { dropRight } from 'fp-ts/lib/Array'

assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
```

Added in v2.0.0

# duplicate

**Signature**

```ts
<A>(ma: A[]) => A[][]
```

Added in v2.0.0

# elem

Test if a value is a member of an array. Takes a `Eq<A>` as a single
argument which returns the function to use to search for a value of type `A` in
an array of type `Array<A>`.

**Signature**

```ts
export const elem: <A>(E: Eq<A>) => (a: A, as: Array<A>) => boolean = ...
```

**Example**

```ts
import { elem } from 'fp-ts/lib/Array'
import { eqNumber } from 'fp-ts/lib/Eq'

assert.strictEqual(elem(eqNumber)(1, [1, 2, 3]), true)
assert.strictEqual(elem(eqNumber)(4, [1, 2, 3]), false)
```

Added in v2.0.0

# empty

An empty array

**Signature**

```ts
export const empty: Array<never> = ...
```

Added in v2.0.0

# extend

**Signature**

```ts
<A, B>(f: (fa: A[]) => B) => (ma: A[]) => B[]
```

Added in v2.0.0

# filter

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: A[]) => B[]; <A>(predicate: Predicate<A>): (fa: A[]) => A[]; }
```

Added in v2.0.0

# filterMap

**Signature**

```ts
<A, B>(f: (a: A) => Option<B>) => (fa: A[]) => B[]
```

Added in v2.0.0

# filterMapWithIndex

**Signature**

```ts
<A, B>(f: (i: number, a: A) => Option<B>) => (fa: A[]) => B[]
```

Added in v2.0.0

# filterWithIndex

**Signature**

```ts
{ <A, B>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: A[]) => B[]; <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: A[]) => A[]; }
```

Added in v2.0.0

# findFirst

Find the first element which satisfies a predicate (or a refinement) function

**Signature**

```ts
export function findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Option<B>
export function findFirst<A>(predicate: Predicate<A>): (as: Array<A>) => Option<A> { ... }
```

**Example**

```ts
import { findFirst } from 'fp-ts/lib/Array'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(
  findFirst((x: { a: number; b: number }) => x.a === 1)([
    { a: 1, b: 1 },
    { a: 1, b: 2 }
  ]),
  some({ a: 1, b: 1 })
)
```

Added in v2.0.0

# findFirstMap

Find the first element returned by an option based selector function

**Signature**

```ts
export const findFirstMap: <A, B>(f: (a: A) => Option<B>) => (as: Array<A>) => Option<B> = ...
```

**Example**

```ts
import { findFirstMap } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

interface Person {
  name: string
  age?: number
}

const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]

// returns the name of the first person that has an age
assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
```

Added in v2.0.0

# findIndex

Find the first index for which a predicate holds

**Signature**

```ts
export const findIndex: <A>(predicate: Predicate<A>) => (as: Array<A>) => Option<number> = ...
```

**Example**

```ts
import { findIndex } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
```

Added in v2.0.0

# findLast

Find the last element which satisfies a predicate function

**Signature**

```ts
export function findLast<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Option<B>
export function findLast<A>(predicate: Predicate<A>): (as: Array<A>) => Option<A> { ... }
```

**Example**

```ts
import { findLast } from 'fp-ts/lib/Array'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(
  findLast((x: { a: number; b: number }) => x.a === 1)([
    { a: 1, b: 1 },
    { a: 1, b: 2 }
  ]),
  some({ a: 1, b: 2 })
)
```

Added in v2.0.0

# findLastIndex

Returns the index of the last element of the list which matches the predicate

**Signature**

```ts
export const findLastIndex: <A>(predicate: Predicate<A>) => (as: Array<A>) => Option<number> = ...
```

**Example**

```ts
import { findLastIndex } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

interface X {
  a: number
  b: number
}
const xs: Array<X> = [
  { a: 1, b: 0 },
  { a: 1, b: 1 }
]
assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
```

Added in v2.0.0

# findLastMap

Find the last element returned by an option based selector function

**Signature**

```ts
export const findLastMap: <A, B>(f: (a: A) => Option<B>) => (as: Array<A>) => Option<B> = ...
```

**Example**

```ts
import { findLastMap } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

interface Person {
  name: string
  age?: number
}

const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]

// returns the name of the last person that has an age
assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
```

Added in v2.0.0

# flatten

Removes one level of nesting

**Signature**

```ts
export const flatten: <A>(mma: Array<Array<A>>) => Array<A> = ...
```

**Example**

```ts
import { flatten } from 'fp-ts/lib/Array'

assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
```

Added in v2.0.0

# foldLeft

Break an array into its first element and remaining elements

**Signature**

```ts
export const foldLeft: <A, B>(
  onNil: () => B,
  onCons: (head: A, tail: Array<A>) => B
) => (as: Array<A>) => B = ...
```

**Example**

```ts
import { foldLeft } from 'fp-ts/lib/Array'

const len: <A>(as: Array<A>) => number = foldLeft(
  () => 0,
  (_, tail) => 1 + len(tail)
)
assert.strictEqual(len([1, 2, 3]), 3)
```

Added in v2.0.0

# foldMap

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A[]) => M
```

Added in v2.0.0

# foldMapWithIndex

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (i: number, a: A) => M) => (fa: A[]) => M
```

Added in v2.0.0

# foldRight

Break an array into its initial elements and the last element

**Signature**

```ts
export const foldRight: <A, B>(
  onNil: () => B,
  onCons: (init: Array<A>, last: A) => B
) => (as: Array<A>) => B = ...
```

Added in v2.0.0

# getEq

Derives an `Eq` over the `Array` of a given element type from the `Eq` of that type. The derived `Eq` defines two
arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
different lengths, the result is non equality.

**Signature**

```ts
export const getEq: <A>(E: Eq<A>) => Eq<Array<A>> = ...
```

**Example**

```ts
import { eqString } from 'fp-ts/lib/Eq'
import { getEq } from 'fp-ts/lib/Array'

const E = getEq(eqString)
assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
assert.strictEqual(E.equals(['a'], []), false)
```

Added in v2.0.0

# getMonoid

Returns a `Monoid` for `Array<A>`

**Signature**

```ts
export const getMonoid: <A = never>() => Monoid<Array<A>> = ...
```

**Example**

```ts
import { getMonoid } from 'fp-ts/lib/Array'

const M = getMonoid<number>()
assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
```

Added in v2.0.0

# getOrd

Derives an `Ord` over the `Array` of a given element type from the `Ord` of that type. The ordering between two such
arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
the same length, the result is equality.

**Signature**

```ts
export const getOrd: <A>(O: Ord<A>) => Ord<Array<A>> = ...
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

Added in v2.0.0

# getShow

**Signature**

```ts
export const getShow: <A>(S: Show<A>) => Show<Array<A>> = ...
```

Added in v2.0.0

# head

Get the first element in an array, or `None` if the array is empty

**Signature**

```ts
export const head: <A>(as: Array<A>) => Option<A> = ...
```

**Example**

```ts
import { head } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(head([1, 2, 3]), some(1))
assert.deepStrictEqual(head([]), none)
```

Added in v2.0.0

# init

Get all but the last element of an array, creating a new array, or `None` if the array is empty

**Signature**

```ts
export const init: <A>(as: Array<A>) => Option<Array<A>> = ...
```

**Example**

```ts
import { init } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
assert.deepStrictEqual(init([]), none)
```

Added in v2.0.0

# insertAt

Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature**

```ts
export const insertAt: <A>(i: number, a: A) => (as: Array<A>) => Option<Array<A>> = ...
```

**Example**

```ts
import { insertAt } from 'fp-ts/lib/Array'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
```

Added in v2.0.0

# intersection

Creates an array of unique values that are included in all given arrays using a `Eq` for equality
comparisons. The order and references of result values are determined by the first array.

**Signature**

```ts
export const intersection: <A>(E: Eq<A>) => (xs: Array<A>, ys: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { intersection } from 'fp-ts/lib/Array'
import { eqNumber } from 'fp-ts/lib/Eq'

assert.deepStrictEqual(intersection(eqNumber)([1, 2], [2, 3]), [2])
```

Added in v2.0.0

# isEmpty

Test whether an array is empty

**Signature**

```ts
export const isEmpty: <A>(as: Array<A>) => boolean = ...
```

**Example**

```ts
import { isEmpty } from 'fp-ts/lib/Array'

assert.strictEqual(isEmpty([]), true)
```

Added in v2.0.0

# isNonEmpty

Test whether an array is non empty narrowing down the type to `NonEmptyArray<A>`

**Signature**

```ts
export const isNonEmpty: <A>(as: Array<A>) => as is NonEmptyArray<A> = ...
```

Added in v2.0.0

# isOutOfBound

Test whether an array contains a particular index

**Signature**

```ts
export const isOutOfBound: <A>(i: number, as: Array<A>) => boolean = ...
```

Added in v2.0.0

# last

Get the last element in an array, or `None` if the array is empty

**Signature**

```ts
export const last: <A>(as: Array<A>) => Option<A> = ...
```

**Example**

```ts
import { last } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(last([1, 2, 3]), some(3))
assert.deepStrictEqual(last([]), none)
```

Added in v2.0.0

# lefts

Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order

**Signature**

```ts
export const lefts: <E, A>(as: Array<Either<E, A>>) => Array<E> = ...
```

**Example**

```ts
import { lefts } from 'fp-ts/lib/Array'
import { left, right } from 'fp-ts/lib/Either'

assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
```

Added in v2.0.0

# lookup

This function provides a safe way to read a value at a particular index from an array

**Signature**

```ts
export const lookup: <A>(i: number, as: Array<A>) => Option<A> = ...
```

**Example**

```ts
import { lookup } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(lookup(1, [1, 2, 3]), some(2))
assert.deepStrictEqual(lookup(3, [1, 2, 3]), none)
```

Added in v2.0.0

# makeBy

Return a list of length `n` with element `i` initialized with `f(i)`

**Signature**

```ts
export const makeBy: <A>(n: number, f: (i: number) => A) => Array<A> = ...
```

**Example**

```ts
import { makeBy } from 'fp-ts/lib/Array'

const double = (n: number): number => n * 2
assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: A[]) => B[]
```

Added in v2.0.0

# mapWithIndex

**Signature**

```ts
<A, B>(f: (i: number, a: A) => B) => (fa: A[]) => B[]
```

Added in v2.0.0

# modifyAt

Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
of bounds

**Signature**

```ts
export const modifyAt: <A>(i: number, f: (a: A) => A) => (as: Array<A>) => Option<Array<A>> = ...
```

**Example**

```ts
import { modifyAt } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

const double = (x: number): number => x * 2
assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
assert.deepStrictEqual(modifyAt(1, double)([]), none)
```

Added in v2.0.0

# of

**Signature**

```ts
export const of: <A>(a: A) => Array<A> = ...
```

Added in v2.0.0

# partition

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: A[]) => Separated<A[], B[]>; <A>(predicate: Predicate<A>): (fa: A[]) => Separated<A[], A[]>; }
```

Added in v2.0.0

# partitionMap

**Signature**

```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: A[]) => Separated<B[], C[]>
```

Added in v2.0.0

# partitionMapWithIndex

**Signature**

```ts
<A, B, C>(f: (i: number, a: A) => Either<B, C>) => (fa: A[]) => Separated<B[], C[]>
```

Added in v2.0.0

# partitionWithIndex

**Signature**

```ts
{ <A, B>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: A[]) => Separated<A[], B[]>; <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: A[]) => Separated<A[], A[]>; }
```

Added in v2.0.0

# range

Create an array containing a range of integers, including both endpoints

**Signature**

```ts
export const range: (start: number, end: number) => Array<number> = ...
```

**Example**

```ts
import { range } from 'fp-ts/lib/Array'

assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
```

Added in v2.0.0

# reduce

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: A[]) => B
```

Added in v2.0.0

# reduceRight

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: A[]) => B
```

Added in v2.0.0

# reduceRightWithIndex

**Signature**

```ts
;<A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: A[]) => B
```

Added in v2.0.0

# reduceWithIndex

**Signature**

```ts
;<A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: A[]) => B
```

Added in v2.0.0

# replicate

Create an array containing a value repeated the specified number of times

**Signature**

```ts
export const replicate: <A>(n: number, a: A) => Array<A> = ...
```

**Example**

```ts
import { replicate } from 'fp-ts/lib/Array'

assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
```

Added in v2.0.0

# reverse

Reverse an array, creating a new array

**Signature**

```ts
export const reverse: <A>(as: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { reverse } from 'fp-ts/lib/Array'

assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
```

Added in v2.0.0

# rights

Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order

**Signature**

```ts
export const rights: <E, A>(as: Array<Either<E, A>>) => Array<A> = ...
```

**Example**

```ts
import { rights } from 'fp-ts/lib/Array'
import { right, left } from 'fp-ts/lib/Either'

assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
```

Added in v2.0.0

# rotate

Rotate an array to the right by `n` steps

**Signature**

```ts
export const rotate: (n: number) => <A>(as: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { rotate } from 'fp-ts/lib/Array'

assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
```

Added in v2.0.0

# scanLeft

Same as `reduce` but it carries over the intermediate steps

```ts
import { scanLeft } from 'fp-ts/lib/Array'

assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
```

**Signature**

```ts
export const scanLeft: <A, B>(b: B, f: (b: B, a: A) => B) => (as: Array<A>) => Array<B> = ...
```

Added in v2.0.0

# scanRight

Fold an array from the right, keeping all intermediate results instead of only the final result

**Signature**

```ts
export const scanRight: <A, B>(b: B, f: (a: A, b: B) => B) => (as: Array<A>) => Array<B> = ...
```

**Example**

```ts
import { scanRight } from 'fp-ts/lib/Array'

assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
```

Added in v2.0.0

# separate

**Signature**

```ts
<A, B>(fa: Either<A, B>[]) => Separated<A[], B[]>
```

Added in v2.0.0

# snoc

Append an element to the end of an array, creating a new non empty array

**Signature**

```ts
export const snoc: <A>(init: Array<A>, end: A) => NonEmptyArray<A> = ...
```

**Example**

```ts
import { snoc } from 'fp-ts/lib/Array'

assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
```

Added in v2.0.0

# sort

Sort the elements of an array in increasing order, creating a new array

**Signature**

```ts
export const sort: <A>(O: Ord<A>) => (as: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { sort } from 'fp-ts/lib/Array'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
```

Added in v2.0.0

# sortBy

Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
etc...

**Signature**

```ts
export const sortBy: <A>(ords: Array<Ord<A>>) => (as: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { sortBy } from 'fp-ts/lib/Array'
import { ord, ordString, ordNumber } from 'fp-ts/lib/Ord'

interface Person {
  name: string
  age: number
}
const byName = ord.contramap(ordString, (p: Person) => p.name)
const byAge = ord.contramap(ordNumber, (p: Person) => p.age)

const sortByNameByAge = sortBy([byName, byAge])

const persons = [
  { name: 'a', age: 1 },
  { name: 'b', age: 3 },
  { name: 'c', age: 2 },
  { name: 'b', age: 2 }
]
assert.deepStrictEqual(sortByNameByAge(persons), [
  { name: 'a', age: 1 },
  { name: 'b', age: 2 },
  { name: 'b', age: 3 },
  { name: 'c', age: 2 }
])
```

Added in v2.0.0

# spanLeft

Split an array into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

**Signature**

```ts
export function spanLeft<A, B extends A>(
  refinement: Refinement<A, B>
): (as: Array<A>) => { init: Array<B>; rest: Array<A> }
export function spanLeft<A>(predicate: Predicate<A>): (as: Array<A>) => { init: Array<A>; rest: Array<A> } { ... }
```

**Example**

```ts
import { spanLeft } from 'fp-ts/lib/Array'

assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
```

Added in v2.0.0

# splitAt

Splits an array into two pieces, the first piece has `n` elements.

**Signature**

```ts
export const splitAt: (n: number) => <A>(as: Array<A>) => [Array<A>, Array<A>] = ...
```

**Example**

```ts
import { splitAt } from 'fp-ts/lib/Array'

assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [
  [1, 2],
  [3, 4, 5]
])
```

Added in v2.0.0

# tail

Get all but the first element of an array, creating a new array, or `None` if the array is empty

**Signature**

```ts
export const tail: <A>(as: Array<A>) => Option<Array<A>> = ...
```

**Example**

```ts
import { tail } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(tail([]), none)
```

Added in v2.0.0

# takeLeft

Keep only a number of elements from the start of an array, creating a new array.
`n` must be a natural number

**Signature**

```ts
export const takeLeft: (n: number) => <A>(as: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { takeLeft } from 'fp-ts/lib/Array'

assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
```

Added in v2.0.0

# takeLeftWhile

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array

**Signature**

```ts
export function takeLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Array<B>
export function takeLeftWhile<A>(predicate: Predicate<A>): (as: Array<A>) => Array<A> { ... }
```

**Example**

```ts
import { takeLeftWhile } from 'fp-ts/lib/Array'

assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
```

Added in v2.0.0

# takeRight

Keep only a number of elements from the end of an array, creating a new array.
`n` must be a natural number

**Signature**

```ts
export const takeRight: (n: number) => <A>(as: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { takeRight } from 'fp-ts/lib/Array'

assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
```

Added in v2.0.0

# union

Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons

**Signature**

```ts
export const union: <A>(E: Eq<A>) => (xs: Array<A>, ys: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { union } from 'fp-ts/lib/Array'
import { eqNumber } from 'fp-ts/lib/Eq'

assert.deepStrictEqual(union(eqNumber)([1, 2], [2, 3]), [1, 2, 3])
```

Added in v2.0.0

# uniq

Remove duplicates from an array, keeping the first occurrence of an element.

**Signature**

```ts
export const uniq: <A>(E: Eq<A>) => (as: Array<A>) => Array<A> = ...
```

**Example**

```ts
import { uniq } from 'fp-ts/lib/Array'
import { eqNumber } from 'fp-ts/lib/Eq'

assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
```

Added in v2.0.0

# unsafeDeleteAt

**Signature**

```ts
export const unsafeDeleteAt: <A>(i: number, as: Array<A>) => Array<A> = ...
```

Added in v2.0.0

# unsafeInsertAt

**Signature**

```ts
export const unsafeInsertAt: <A>(i: number, a: A, as: Array<A>) => Array<A> = ...
```

Added in v2.0.0

# unsafeUpdateAt

**Signature**

```ts
export const unsafeUpdateAt: <A>(i: number, a: A, as: Array<A>) => Array<A> = ...
```

Added in v2.0.0

# unzip

The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays

**Signature**

```ts
export const unzip: <A, B>(as: Array<[A, B]>) => [Array<A>, Array<B>] = ...
```

**Example**

```ts
import { unzip } from 'fp-ts/lib/Array'

assert.deepStrictEqual(
  unzip([
    [1, 'a'],
    [2, 'b'],
    [3, 'c']
  ]),
  [
    [1, 2, 3],
    ['a', 'b', 'c']
  ]
)
```

Added in v2.0.0

# updateAt

Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature**

```ts
export const updateAt: <A>(i: number, a: A) => (as: Array<A>) => Option<Array<A>> = ...
```

**Example**

```ts
import { updateAt } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
assert.deepStrictEqual(updateAt(1, 1)([]), none)
```

Added in v2.0.0

# zip

Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
longer array are discarded

**Signature**

```ts
export const zip: <A, B>(fa: Array<A>, fb: Array<B>) => Array<[A, B]> = ...
```

**Example**

```ts
import { zip } from 'fp-ts/lib/Array'

assert.deepStrictEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [
  [1, 'a'],
  [2, 'b'],
  [3, 'c']
])
```

Added in v2.0.0

# zipWith

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
input array is short, excess elements of the longer array are discarded.

**Signature**

```ts
export const zipWith: <A, B, C>(fa: Array<A>, fb: Array<B>, f: (a: A, b: B) => C) => Array<C> = ...
```

**Example**

```ts
import { zipWith } from 'fp-ts/lib/Array'

assert.deepStrictEqual(
  zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n),
  ['a1', 'b2', 'c3']
)
```

Added in v2.0.0
