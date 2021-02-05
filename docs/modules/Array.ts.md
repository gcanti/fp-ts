---
title: Array.ts
nav_order: 5
parent: Modules
---

## Array overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Alternative](#alternative)
  - [zero](#zero)
- [Apply](#apply)
  - [ap](#ap)
- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Extend](#extend)
  - [extend](#extend)
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
- [Monad](#monad)
  - [chain](#chain)
- [Pointed](#pointed)
  - [of](#of)
- [Traversable](#traversable)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [TraversableWithIndex](#traversablewithindex)
  - [traverseWithIndex](#traversewithindex)
- [Unfoldable](#unfoldable)
  - [unfold](#unfold)
- [Witherable](#witherable)
  - [wilt](#wilt)
  - [wither](#wither)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [chop](#chop)
  - [copy](#copy)
  - [difference](#difference)
  - [dropLeft](#dropleft)
  - [dropLeftWhile](#dropleftwhile)
  - [dropRight](#dropright)
  - [duplicate](#duplicate)
  - [flap](#flap)
  - [flatten](#flatten)
  - [intersection](#intersection)
  - [intersperse](#intersperse)
  - [lefts](#lefts)
  - [prependToAll](#prependtoall)
  - [reverse](#reverse)
  - [rights](#rights)
  - [rotate](#rotate)
  - [scanLeft](#scanleft)
  - [scanRight](#scanright)
  - [sort](#sort)
  - [sortBy](#sortby)
  - [takeLeft](#takeleft)
  - [takeLeftWhile](#takeleftwhile)
  - [takeRight](#takeright)
  - [union](#union)
  - [uniq](#uniq)
  - [zip](#zip)
  - [zipWith](#zipwith)
- [constructors](#constructors)
  - [comprehension](#comprehension)
  - [cons](#cons)
  - [makeBy](#makeby)
  - [range](#range)
  - [replicate](#replicate)
  - [snoc](#snoc)
- [destructors](#destructors)
  - [findFirst](#findfirst)
  - [findFirstMap](#findfirstmap)
  - [findLast](#findlast)
  - [findLastMap](#findlastmap)
  - [foldLeft](#foldleft)
  - [foldRight](#foldright)
  - [head](#head)
  - [init](#init)
  - [last](#last)
  - [spanLeft](#spanleft)
  - [tail](#tail)
- [guards](#guards)
  - [isNonEmpty](#isnonempty)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Alternative](#alternative-1)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Compactable](#compactable-1)
  - [Extend](#extend-1)
  - [Filterable](#filterable-1)
  - [FilterableWithIndex](#filterablewithindex-1)
  - [Foldable](#foldable-1)
  - [FoldableWithIndex](#foldablewithindex-1)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [Monad](#monad-1)
  - [Pointed](#pointed-1)
  - [Traversable](#traversable-1)
  - [TraversableWithIndex](#traversablewithindex-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [Unfoldable](#unfoldable-1)
  - [Witherable](#witherable-1)
  - [getEq](#geteq)
  - [getMonoid](#getmonoid)
  - [getOrd](#getord)
  - [getShow](#getshow)
  - [~~array~~](#array)
- [unsafe](#unsafe)
  - [unsafeDeleteAt](#unsafedeleteat)
  - [unsafeInsertAt](#unsafeinsertat)
  - [unsafeUpdateAt](#unsafeupdateat)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [chainWithIndex](#chainwithindex)
  - [chunksOf](#chunksof)
  - [deleteAt](#deleteat)
  - [elem](#elem)
  - [empty](#empty)
  - [every](#every)
  - [findIndex](#findindex)
  - [findLastIndex](#findlastindex)
  - [insertAt](#insertat)
  - [isEmpty](#isempty)
  - [isOutOfBound](#isoutofbound)
  - [lookup](#lookup)
  - [modifyAt](#modifyat)
  - [some](#some)
  - [splitAt](#splitat)
  - [unzip](#unzip)
  - [updateAt](#updateat)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <A>(that: Lazy<A[]>) => (fa: A[]) => A[]
```

Added in v2.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <B>(that: Lazy<B[]>) => <A>(fa: A[]) => (B | A)[]
```

Added in v2.9.0

# Alternative

## zero

**Signature**

```ts
export declare const zero: <A>() => A[]
```

Added in v2.7.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: A[]) => <B>(fab: ((a: A) => B)[]) => B[]
```

Added in v2.0.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(fa: Option<A>[]) => A[]
```

Added in v2.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fa: Either<A, B>[]) => Separated<A[], B[]>
```

Added in v2.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (fa: A[]) => B) => (wa: A[]) => B[]
```

Added in v2.0.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: A[]) => B[]
  <A>(predicate: Predicate<A>): (fa: A[]) => A[]
}
```

Added in v2.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: A[]) => B[]
```

Added in v2.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: A[]) => Separated<A[], B[]>
  <A>(predicate: Predicate<A>): (fa: A[]) => Separated<A[], A[]>
}
```

Added in v2.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: A[]) => Separated<B[], C[]>
```

Added in v2.0.0

# FilterableWithIndex

## filterMapWithIndex

**Signature**

```ts
export declare const filterMapWithIndex: <A, B>(f: (i: number, a: A) => Option<B>) => (fa: A[]) => B[]
```

Added in v2.0.0

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: A[]) => B[]
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: A[]) => A[]
}
```

Added in v2.0.0

## partitionMapWithIndex

**Signature**

```ts
export declare const partitionMapWithIndex: <A, B, C>(
  f: (i: number, a: A) => Either<B, C>
) => (fa: A[]) => Separated<B[], C[]>
```

Added in v2.0.0

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: A[]) => Separated<A[], B[]>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: A[]) => Separated<A[], A[]>
}
```

Added in v2.0.0

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A[]) => M
```

Added in v2.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: A[]) => B
```

Added in v2.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: A[]) => B
```

Added in v2.0.0

# FoldableWithIndex

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: number, a: A) => M) => (fa: A[]) => M
```

Added in v2.0.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: A[]) => B
```

Added in v2.0.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: A[]) => B
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: A[]) => B[]
```

Added in v2.0.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: A[]) => B[]
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => B[]) => (ma: A[]) => B[]
```

Added in v2.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => A[]
```

Added in v2.0.0

# Traversable

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'Array'>
```

Added in v2.6.3

## traverse

**Signature**

```ts
export declare const traverse: PipeableTraverse1<'Array'>
```

Added in v2.6.3

# TraversableWithIndex

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: PipeableTraverseWithIndex1<'Array', number>
```

Added in v2.6.3

# Unfoldable

## unfold

**Signature**

```ts
export declare const unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => A[]
```

Added in v2.6.6

# Witherable

## wilt

**Signature**

```ts
export declare const wilt: PipeableWilt1<'Array'>
```

Added in v2.6.5

## wither

**Signature**

```ts
export declare const wither: PipeableWither1<'Array'>
```

Added in v2.6.5

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(fb: B[]) => <A>(fa: A[]) => A[]
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(fb: B[]) => <A>(fa: A[]) => B[]
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => B[]) => (ma: A[]) => A[]
```

Added in v2.0.0

## chop

A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
value and the rest of the array.

**Signature**

```ts
export declare const chop: <A, B>(f: (as: NonEmptyArray<A>) => [B, A[]]) => (as: A[]) => B[]
```

**Example**

```ts
import { Eq } from 'fp-ts/Eq'
import { chop, spanLeft } from 'fp-ts/Array'
import * as N from 'fp-ts/number'

const group = <A>(S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
  return chop((as) => {
    const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
    return [init, rest]
  })
}
assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
```

Added in v2.0.0

## copy

**Signature**

```ts
export declare const copy: <A>(as: A[]) => A[]
```

Added in v2.0.0

## difference

Creates an array of array values not included in the other given array using a `Eq` for equality
comparisons. The order and references of result values are determined by the first array.

**Signature**

```ts
export declare const difference: <A>(E: Eq<A>) => { (xs: A[]): (ys: A[]) => A[]; (xs: A[], ys: A[]): A[] }
```

**Example**

```ts
import { difference } from 'fp-ts/Array'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2], difference(N.Eq)([2, 3])), [1])
```

Added in v2.0.0

## dropLeft

Drop a number of elements from the start of an array, creating a new array

**Signature**

```ts
export declare const dropLeft: (n: number) => <A>(as: A[]) => A[]
```

**Example**

```ts
import { dropLeft } from 'fp-ts/Array'

assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
```

Added in v2.0.0

## dropLeftWhile

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array

**Signature**

```ts
export declare const dropLeftWhile: <A>(predicate: Predicate<A>) => (as: A[]) => A[]
```

**Example**

```ts
import { dropLeftWhile } from 'fp-ts/Array'

assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
```

Added in v2.0.0

## dropRight

Drop a number of elements from the end of an array, creating a new array

**Signature**

```ts
export declare const dropRight: (n: number) => <A>(as: A[]) => A[]
```

**Example**

```ts
import { dropRight } from 'fp-ts/Array'

assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
```

Added in v2.0.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(wa: A[]) => A[][]
```

Added in v2.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: ((a: A) => B)[]) => B[]
```

Added in v2.10.0

## flatten

Removes one level of nesting.

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <A>(mma: A[][]) => A[]
```

**Example**

```ts
import { flatten } from 'fp-ts/Array'

assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
```

Added in v2.0.0

## intersection

Creates an array of unique values that are included in all given arrays using a `Eq` for equality
comparisons. The order and references of result values are determined by the first array.

**Signature**

```ts
export declare const intersection: <A>(E: Eq<A>) => { (xs: A[]): (ys: A[]) => A[]; (xs: A[], ys: A[]): A[] }
```

**Example**

```ts
import { intersection } from 'fp-ts/Array'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2], intersection(N.Eq)([2, 3])), [2])
```

Added in v2.0.0

## intersperse

Places an element in between members of an array

**Signature**

```ts
export declare const intersperse: <A>(e: A) => (as: A[]) => A[]
```

**Example**

```ts
import { intersperse } from 'fp-ts/Array'

assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
```

Added in v2.9.0

## lefts

Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order

**Signature**

```ts
export declare const lefts: <E, A>(as: Either<E, A>[]) => E[]
```

**Example**

```ts
import { lefts } from 'fp-ts/Array'
import { left, right } from 'fp-ts/Either'

assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
```

Added in v2.0.0

## prependToAll

Prepend an element to every member of an array

**Signature**

```ts
export declare const prependToAll: <A>(e: A) => (xs: A[]) => A[]
```

**Example**

```ts
import { prependToAll } from 'fp-ts/Array'

assert.deepStrictEqual(prependToAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
```

Added in v2.9.0

## reverse

Reverse an array, creating a new array

**Signature**

```ts
export declare const reverse: <A>(as: A[]) => A[]
```

**Example**

```ts
import { reverse } from 'fp-ts/Array'

assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
```

Added in v2.0.0

## rights

Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order

**Signature**

```ts
export declare const rights: <E, A>(as: Either<E, A>[]) => A[]
```

**Example**

```ts
import { rights } from 'fp-ts/Array'
import { right, left } from 'fp-ts/Either'

assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
```

Added in v2.0.0

## rotate

Rotate an array to the right by `n` steps

**Signature**

```ts
export declare const rotate: (n: number) => <A>(as: A[]) => A[]
```

**Example**

```ts
import { rotate } from 'fp-ts/Array'

assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
```

Added in v2.0.0

## scanLeft

Same as `reduce` but it carries over the intermediate steps

**Signature**

```ts
export declare const scanLeft: <A, B>(b: B, f: (b: B, a: A) => B) => (as: A[]) => NonEmptyArray<B>
```

**Example**

```ts
import { scanLeft } from 'fp-ts/Array'

assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
```

Added in v2.0.0

## scanRight

Fold an array from the right, keeping all intermediate results instead of only the final result

**Signature**

```ts
export declare const scanRight: <A, B>(b: B, f: (a: A, b: B) => B) => (as: A[]) => NonEmptyArray<B>
```

**Example**

```ts
import { scanRight } from 'fp-ts/Array'

assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
```

Added in v2.0.0

## sort

Sort the elements of an array in increasing order, creating a new array

**Signature**

```ts
export declare const sort: <B>(O: Ord<B>) => <A extends B>(as: A[]) => A[]
```

**Example**

```ts
import { sort } from 'fp-ts/Array'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
```

Added in v2.0.0

## sortBy

Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
etc...

**Signature**

```ts
export declare const sortBy: <B>(ords: Ord<B>[]) => <A extends B>(as: A[]) => A[]
```

**Example**

```ts
import { sortBy } from 'fp-ts/Array'
import { contramap } from 'fp-ts/Ord'
import * as S from 'fp-ts/string'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

interface Person {
  name: string
  age: number
}
const byName = pipe(
  S.Ord,
  contramap((p: Person) => p.name)
)
const byAge = pipe(
  N.Ord,
  contramap((p: Person) => p.age)
)

const sortByNameByAge = sortBy([byName, byAge])

const persons = [
  { name: 'a', age: 1 },
  { name: 'b', age: 3 },
  { name: 'c', age: 2 },
  { name: 'b', age: 2 },
]
assert.deepStrictEqual(sortByNameByAge(persons), [
  { name: 'a', age: 1 },
  { name: 'b', age: 2 },
  { name: 'b', age: 3 },
  { name: 'c', age: 2 },
])
```

Added in v2.0.0

## takeLeft

Keep only a number of elements from the start of an array, creating a new array.
`n` must be a natural number

**Signature**

```ts
export declare const takeLeft: (n: number) => <A>(as: A[]) => A[]
```

**Example**

```ts
import { takeLeft } from 'fp-ts/Array'

assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
```

Added in v2.0.0

## takeLeftWhile

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array

**Signature**

```ts
export declare function takeLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Array<B>
export declare function takeLeftWhile<A>(predicate: Predicate<A>): (as: Array<A>) => Array<A>
```

**Example**

```ts
import { takeLeftWhile } from 'fp-ts/Array'

assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
```

Added in v2.0.0

## takeRight

Keep only a number of elements from the end of an array, creating a new array.
`n` must be a natural number

**Signature**

```ts
export declare const takeRight: (n: number) => <A>(as: A[]) => A[]
```

**Example**

```ts
import { takeRight } from 'fp-ts/Array'

assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
```

Added in v2.0.0

## union

Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons

**Signature**

```ts
export declare const union: <A>(E: Eq<A>) => { (xs: A[]): (ys: A[]) => A[]; (xs: A[], ys: A[]): A[] }
```

**Example**

```ts
import { union } from 'fp-ts/Array'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2], union(N.Eq)([2, 3])), [1, 2, 3])
```

Added in v2.0.0

## uniq

Remove duplicates from an array, keeping the first occurrence of an element.

**Signature**

```ts
export declare const uniq: <A>(E: Eq<A>) => (as: A[]) => A[]
```

**Example**

```ts
import { uniq } from 'fp-ts/Array'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
```

Added in v2.0.0

## zip

Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
longer array are discarded

**Signature**

```ts
export declare const zip: { <B>(bs: B[]): <A>(as: A[]) => [A, B][]; <A, B>(as: A[], bs: B[]): [A, B][] }
```

**Example**

```ts
import { zip } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], zip(['a', 'b', 'c', 'd'])), [
  [1, 'a'],
  [2, 'b'],
  [3, 'c'],
])
```

Added in v2.0.0

## zipWith

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
input array is short, excess elements of the longer array are discarded.

**Signature**

```ts
export declare const zipWith: <A, B, C>(fa: A[], fb: B[], f: (a: A, b: B) => C) => C[]
```

**Example**

```ts
import { zipWith } from 'fp-ts/Array'

assert.deepStrictEqual(
  zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n),
  ['a1', 'b2', 'c3']
)
```

Added in v2.0.0

# constructors

## comprehension

Array comprehension

```
[ f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) ]
```

**Signature**

```ts
export declare function comprehension<A, B, C, D, R>(
  input: [Array<A>, Array<B>, Array<C>, Array<D>],
  f: (a: A, b: B, c: C, d: D) => R,
  g?: (a: A, b: B, c: C, d: D) => boolean
): Array<R>
export declare function comprehension<A, B, C, R>(
  input: [Array<A>, Array<B>, Array<C>],
  f: (a: A, b: B, c: C) => R,
  g?: (a: A, b: B, c: C) => boolean
): Array<R>
export declare function comprehension<A, R>(input: [Array<A>], f: (a: A) => R, g?: (a: A) => boolean): Array<R>
export declare function comprehension<A, B, R>(
  input: [Array<A>, Array<B>],
  f: (a: A, b: B) => R,
  g?: (a: A, b: B) => boolean
): Array<R>
export declare function comprehension<A, R>(input: [Array<A>], f: (a: A) => boolean, g?: (a: A) => R): Array<R>
```

**Example**

```ts
import { comprehension } from 'fp-ts/Array'
import { tuple } from 'fp-ts/function'

assert.deepStrictEqual(
  comprehension(
    [
      [1, 2, 3],
      ['a', 'b'],
    ],
    tuple,
    (a, b) => (a + b.length) % 2 === 0
  ),
  [
    [1, 'a'],
    [1, 'b'],
    [3, 'a'],
    [3, 'b'],
  ]
)
```

Added in v2.0.0

## cons

Attaches an element to the front of an array, creating a new non empty array

**Signature**

```ts
export declare const cons: { <A>(head: A): (tail: A[]) => NonEmptyArray<A>; <A>(head: A, tail: A[]): NonEmptyArray<A> }
```

**Example**

```ts
import { cons } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], cons(0)), [0, 1, 2, 3])
```

Added in v2.0.0

## makeBy

Return a list of length `n` with element `i` initialized with `f(i)`

**Signature**

```ts
export declare const makeBy: <A>(n: number, f: (i: number) => A) => A[]
```

**Example**

```ts
import { makeBy } from 'fp-ts/Array'

const double = (n: number): number => n * 2
assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
```

Added in v2.0.0

## range

Create an array containing a range of integers, including both endpoints

**Signature**

```ts
export declare const range: (start: number, end: number) => number[]
```

**Example**

```ts
import { range } from 'fp-ts/Array'

assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
```

Added in v2.0.0

## replicate

Create an array containing a value repeated the specified number of times

**Signature**

```ts
export declare const replicate: <A>(n: number, a: A) => A[]
```

**Example**

```ts
import { replicate } from 'fp-ts/Array'

assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
```

Added in v2.0.0

## snoc

Append an element to the end of an array, creating a new non empty array

**Signature**

```ts
export declare const snoc: <A>(init: A[], end: A) => NonEmptyArray<A>
```

**Example**

```ts
import { snoc } from 'fp-ts/Array'

assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
```

Added in v2.0.0

# destructors

## findFirst

Find the first element which satisfies a predicate (or a refinement) function

**Signature**

```ts
export declare function findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Option<B>
export declare function findFirst<A>(predicate: Predicate<A>): (as: Array<A>) => Option<A>
```

**Example**

```ts
import { findFirst } from 'fp-ts/Array'
import { some } from 'fp-ts/Option'

assert.deepStrictEqual(
  findFirst((x: { a: number; b: number }) => x.a === 1)([
    { a: 1, b: 1 },
    { a: 1, b: 2 },
  ]),
  some({ a: 1, b: 1 })
)
```

Added in v2.0.0

## findFirstMap

Find the first element returned by an option based selector function

**Signature**

```ts
export declare const findFirstMap: <A, B>(f: (a: A) => Option<B>) => (as: A[]) => Option<B>
```

**Example**

```ts
import { findFirstMap } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

interface Person {
  name: string
  age?: number
}

const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]

// returns the name of the first person that has an age
assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
```

Added in v2.0.0

## findLast

Find the last element which satisfies a predicate function

**Signature**

```ts
export declare function findLast<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Option<B>
export declare function findLast<A>(predicate: Predicate<A>): (as: Array<A>) => Option<A>
```

**Example**

```ts
import { findLast } from 'fp-ts/Array'
import { some } from 'fp-ts/Option'

assert.deepStrictEqual(
  findLast((x: { a: number; b: number }) => x.a === 1)([
    { a: 1, b: 1 },
    { a: 1, b: 2 },
  ]),
  some({ a: 1, b: 2 })
)
```

Added in v2.0.0

## findLastMap

Find the last element returned by an option based selector function

**Signature**

```ts
export declare const findLastMap: <A, B>(f: (a: A) => Option<B>) => (as: A[]) => Option<B>
```

**Example**

```ts
import { findLastMap } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

interface Person {
  name: string
  age?: number
}

const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]

// returns the name of the last person that has an age
assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
```

Added in v2.0.0

## foldLeft

Break an array into its first element and remaining elements

**Signature**

```ts
export declare const foldLeft: <A, B>(onEmpty: Lazy<B>, onCons: (head: A, tail: A[]) => B) => (as: A[]) => B
```

**Example**

```ts
import { foldLeft } from 'fp-ts/Array'

const len: <A>(as: Array<A>) => number = foldLeft(
  () => 0,
  (_, tail) => 1 + len(tail)
)
assert.strictEqual(len([1, 2, 3]), 3)
```

Added in v2.0.0

## foldRight

Break an array into its initial elements and the last element

**Signature**

```ts
export declare const foldRight: <A, B>(onEmpty: Lazy<B>, onCons: (init: A[], last: A) => B) => (as: A[]) => B
```

Added in v2.0.0

## head

Get the first element in an array, or `None` if the array is empty

**Signature**

```ts
export declare const head: <A>(as: A[]) => Option<A>
```

**Example**

```ts
import { head } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(head([1, 2, 3]), some(1))
assert.deepStrictEqual(head([]), none)
```

Added in v2.0.0

## init

Get all but the last element of an array, creating a new array, or `None` if the array is empty

**Signature**

```ts
export declare const init: <A>(as: A[]) => Option<A[]>
```

**Example**

```ts
import { init } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
assert.deepStrictEqual(init([]), none)
```

Added in v2.0.0

## last

Get the last element in an array, or `None` if the array is empty

**Signature**

```ts
export declare const last: <A>(as: A[]) => Option<A>
```

**Example**

```ts
import { last } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(last([1, 2, 3]), some(3))
assert.deepStrictEqual(last([]), none)
```

Added in v2.0.0

## spanLeft

Split an array into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

**Signature**

```ts
export declare function spanLeft<A, B extends A>(
  refinement: Refinement<A, B>
): (as: Array<A>) => { init: Array<B>; rest: Array<A> }
export declare function spanLeft<A>(predicate: Predicate<A>): (as: Array<A>) => { init: Array<A>; rest: Array<A> }
```

**Example**

```ts
import { spanLeft } from 'fp-ts/Array'

assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
```

Added in v2.0.0

## tail

Get all but the first element of an array, creating a new array, or `None` if the array is empty

**Signature**

```ts
export declare const tail: <A>(as: A[]) => Option<A[]>
```

**Example**

```ts
import { tail } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(tail([]), none)
```

Added in v2.0.0

# guards

## isNonEmpty

Test whether an array is non empty narrowing down the type to `NonEmptyArray<A>`

**Signature**

```ts
export declare const isNonEmpty: <A>(as: A[]) => as is NonEmptyArray<A>
```

Added in v2.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'Array'>
```

Added in v2.7.0

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative1<'Array'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'Array'>
```

Added in v2.7.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'Array'>
```

Added in v2.10.0

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'Array'>
```

Added in v2.7.0

## Extend

**Signature**

```ts
export declare const Extend: Extend1<'Array'>
```

Added in v2.7.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'Array'>
```

Added in v2.7.0

## FilterableWithIndex

**Signature**

```ts
export declare const FilterableWithIndex: FilterableWithIndex1<'Array', number>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'Array'>
```

Added in v2.7.0

## FoldableWithIndex

**Signature**

```ts
export declare const FoldableWithIndex: FoldableWithIndex1<'Array', number>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'Array'>
```

Added in v2.7.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'Array', number>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'Array'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'Array'>
```

Added in v2.10.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'Array'>
```

Added in v2.7.0

## TraversableWithIndex

**Signature**

```ts
export declare const TraversableWithIndex: TraversableWithIndex1<'Array', number>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Array'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## Unfoldable

**Signature**

```ts
export declare const Unfoldable: Unfoldable1<'Array'>
```

Added in v2.7.0

## Witherable

**Signature**

```ts
export declare const Witherable: Witherable1<'Array'>
```

Added in v2.7.0

## getEq

Derives an `Eq` over the `Array` of a given element type from the `Eq` of that type. The derived `Eq` defines two
arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
different lengths, the result is non equality.

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<A[]>
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { getEq } from 'fp-ts/Array'

const E = getEq(S.Eq)
assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
assert.strictEqual(E.equals(['a'], []), false)
```

Added in v2.0.0

## getMonoid

Returns a `Monoid` for `Array<A>`

**Signature**

```ts
export declare const getMonoid: <A = never>() => Monoid<A[]>
```

**Example**

```ts
import { getMonoid } from 'fp-ts/Array'

const M = getMonoid<number>()
assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
```

Added in v2.0.0

## getOrd

Derives an `Ord` over the `Array` of a given element type from the `Ord` of that type. The ordering between two such
arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
the same length, the result is equality.

**Signature**

```ts
export declare const getOrd: <A>(O: Ord<A>) => Ord<A[]>
```

**Example**

```ts
import { getOrd } from 'fp-ts/Array'
import * as S from 'fp-ts/string'

const O = getOrd(S.Ord)
assert.strictEqual(O.compare(['b'], ['a']), 1)
assert.strictEqual(O.compare(['a'], ['a']), 0)
assert.strictEqual(O.compare(['a'], ['b']), -1)
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<A[]>
```

Added in v2.0.0

## ~~array~~

Use small, specific instances instead.

**Signature**

```ts
export declare const array: FunctorWithIndex1<'Array', number> &
  Monad1<'Array'> &
  Unfoldable1<'Array'> &
  Alternative1<'Array'> &
  Extend1<'Array'> &
  FilterableWithIndex1<'Array', number> &
  FoldableWithIndex1<'Array', number> &
  TraversableWithIndex1<'Array', number> &
  Witherable1<'Array'>
```

Added in v2.0.0

# unsafe

## unsafeDeleteAt

**Signature**

```ts
export declare const unsafeDeleteAt: <A>(i: number, as: A[]) => A[]
```

Added in v2.0.0

## unsafeInsertAt

**Signature**

```ts
export declare const unsafeInsertAt: <A>(i: number, a: A, as: A[]) => A[]
```

Added in v2.0.0

## unsafeUpdateAt

**Signature**

```ts
export declare const unsafeUpdateAt: <A>(i: number, a: A, as: A[]) => A[]
```

Added in v2.0.0

# utils

## Do

**Signature**

```ts
export declare const Do: {}[]
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <A, N extends string, B>(
  name: Exclude<N, keyof A>,
  fb: B[]
) => (fa: A[]) => { [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B[]
) => (fa: A[]) => { [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(fa: A[]) => { [K in N]: A }[]
```

Added in v2.8.0

## chainWithIndex

**Signature**

```ts
export declare const chainWithIndex: <A, B>(f: (index: number, a: A) => B[]) => (ma: A[]) => B[]
```

Added in v2.7.0

## chunksOf

Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that

```ts
chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
```

whenever `n` evenly divides the length of `xs`.

**Signature**

```ts
export declare const chunksOf: (n: number) => <A>(as: A[]) => A[][]
```

**Example**

```ts
import { chunksOf } from 'fp-ts/Array'

assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
```

Added in v2.0.0

## deleteAt

Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature**

```ts
export declare const deleteAt: (i: number) => <A>(as: A[]) => Option<A[]>
```

**Example**

```ts
import { deleteAt } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(deleteAt(1)([]), none)
```

Added in v2.0.0

## elem

Test if a value is a member of an array. Takes a `Eq<A>` as a single
argument which returns the function to use to search for a value of type `A` in
an array of type `Array<A>`.

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => { (a: A): (as: A[]) => boolean; (a: A, as: A[]): boolean }
```

**Example**

```ts
import { elem } from 'fp-ts/Array'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(2)), true)
assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(0)), false)
```

Added in v2.0.0

## empty

An empty array

**Signature**

```ts
export declare const empty: never[]
```

Added in v2.0.0

## every

**Signature**

```ts
export declare const every: <A>(predicate: Predicate<A>) => (as: A[]) => boolean
```

Added in v2.9.0

## findIndex

Find the first index for which a predicate holds

**Signature**

```ts
export declare const findIndex: <A>(predicate: Predicate<A>) => (as: A[]) => Option<number>
```

**Example**

```ts
import { findIndex } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
```

Added in v2.0.0

## findLastIndex

Returns the index of the last element of the list which matches the predicate

**Signature**

```ts
export declare const findLastIndex: <A>(predicate: Predicate<A>) => (as: A[]) => Option<number>
```

**Example**

```ts
import { findLastIndex } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

interface X {
  a: number
  b: number
}
const xs: Array<X> = [
  { a: 1, b: 0 },
  { a: 1, b: 1 },
]
assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
```

Added in v2.0.0

## insertAt

Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature**

```ts
export declare const insertAt: <A>(i: number, a: A) => (as: A[]) => Option<A[]>
```

**Example**

```ts
import { insertAt } from 'fp-ts/Array'
import { some } from 'fp-ts/Option'

assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
```

Added in v2.0.0

## isEmpty

Test whether an array is empty

**Signature**

```ts
export declare const isEmpty: <A>(as: A[]) => boolean
```

**Example**

```ts
import { isEmpty } from 'fp-ts/Array'

assert.strictEqual(isEmpty([]), true)
```

Added in v2.0.0

## isOutOfBound

Test whether an array contains a particular index

**Signature**

```ts
export declare const isOutOfBound: <A>(i: number, as: A[]) => boolean
```

Added in v2.0.0

## lookup

This function provides a safe way to read a value at a particular index from an array

**Signature**

```ts
export declare const lookup: { (i: number): <A>(as: A[]) => Option<A>; <A>(i: number, as: A[]): Option<A> }
```

**Example**

```ts
import { lookup } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
```

Added in v2.0.0

## modifyAt

Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
of bounds

**Signature**

```ts
export declare const modifyAt: <A>(i: number, f: (a: A) => A) => (as: A[]) => Option<A[]>
```

**Example**

```ts
import { modifyAt } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

const double = (x: number): number => x * 2
assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
assert.deepStrictEqual(modifyAt(1, double)([]), none)
```

Added in v2.0.0

## some

**Signature**

```ts
export declare const some: <A>(predicate: Predicate<A>) => (as: A[]) => boolean
```

Added in v2.9.0

## splitAt

Splits an array into two pieces, the first piece has `n` elements.

**Signature**

```ts
export declare const splitAt: (n: number) => <A>(as: A[]) => [A[], A[]]
```

**Example**

```ts
import { splitAt } from 'fp-ts/Array'

assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [
  [1, 2],
  [3, 4, 5],
])
```

Added in v2.0.0

## unzip

The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays

**Signature**

```ts
export declare const unzip: <A, B>(as: [A, B][]) => [A[], B[]]
```

**Example**

```ts
import { unzip } from 'fp-ts/Array'

assert.deepStrictEqual(
  unzip([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
  ]),
  [
    [1, 2, 3],
    ['a', 'b', 'c'],
  ]
)
```

Added in v2.0.0

## updateAt

Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature**

```ts
export declare const updateAt: <A>(i: number, a: A) => (as: A[]) => Option<A[]>
```

**Example**

```ts
import { updateAt } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
assert.deepStrictEqual(updateAt(1, 1)([]), none)
```

Added in v2.0.0
