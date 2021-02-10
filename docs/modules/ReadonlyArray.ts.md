---
title: ReadonlyArray.ts
nav_order: 74
parent: Modules
---

## ReadonlyArray overview

Added in v2.5.0

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
  - [difference](#difference)
  - [dropLeft](#dropleft)
  - [dropLeftWhile](#dropleftwhile)
  - [dropRight](#dropright)
  - [duplicate](#duplicate)
  - [flap](#flap)
  - [flatten](#flatten)
  - [intersection](#intersection)
  - [intersperse](#intersperse)
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
  - [union](#union)
  - [uniq](#uniq)
  - [zip](#zip)
  - [zipWith](#zipwith)
- [constructors](#constructors)
  - [comprehension](#comprehension)
  - [cons](#cons)
  - [fromArray](#fromarray)
  - [makeBy](#makeby)
  - [range](#range)
  - [replicate](#replicate)
  - [snoc](#snoc)
- [destructors](#destructors)
  - [foldLeft](#foldleft)
  - [foldRight](#foldright)
  - [toArray](#toarray)
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
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [~~readonlyArray~~](#readonlyarray)
- [unsafe](#unsafe)
  - [unsafeDeleteAt](#unsafedeleteat)
  - [unsafeInsertAt](#unsafeinsertat)
  - [unsafeUpdateAt](#unsafeupdateat)
- [utils](#utils)
  - [Do](#do)
  - [Spanned (interface)](#spanned-interface)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [chainWithIndex](#chainwithindex)
  - [chunksOf](#chunksof)
  - [deleteAt](#deleteat)
  - [elem](#elem)
  - [empty](#empty)
  - [every](#every)
  - [findFirst](#findfirst)
  - [findFirstMap](#findfirstmap)
  - [findIndex](#findindex)
  - [findLast](#findlast)
  - [findLastIndex](#findlastindex)
  - [findLastMap](#findlastmap)
  - [head](#head)
  - [init](#init)
  - [insertAt](#insertat)
  - [isEmpty](#isempty)
  - [isOutOfBound](#isoutofbound)
  - [last](#last)
  - [lefts](#lefts)
  - [lookup](#lookup)
  - [modifyAt](#modifyat)
  - [some](#some)
  - [spanLeft](#spanleft)
  - [splitAt](#splitat)
  - [tail](#tail)
  - [takeRight](#takeright)
  - [unzip](#unzip)
  - [updateAt](#updateat)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <A>(that: Lazy<readonly A[]>) => (fa: readonly A[]) => readonly A[]
```

Added in v2.5.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <B>(that: Lazy<readonly B[]>) => <A>(fa: readonly A[]) => readonly (B | A)[]
```

Added in v2.9.0

# Alternative

## zero

**Signature**

```ts
export declare const zero: <A>() => readonly A[]
```

Added in v2.7.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: readonly A[]) => <B>(fab: readonly ((a: A) => B)[]) => readonly B[]
```

Added in v2.5.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(fa: readonly O.Option<A>[]) => readonly A[]
```

Added in v2.5.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fa: readonly Either<A, B>[]) => Separated<readonly A[], readonly B[]>
```

Added in v2.5.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (fa: readonly A[]) => B) => (wa: readonly A[]) => readonly B[]
```

Added in v2.5.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: readonly A[]) => readonly B[]
  <A>(predicate: Predicate<A>): (fa: readonly A[]) => readonly A[]
}
```

Added in v2.5.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: readonly A[]) => readonly B[]
```

Added in v2.5.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: readonly A[]) => Separated<readonly A[], readonly B[]>
  <A>(predicate: Predicate<A>): (fa: readonly A[]) => Separated<readonly A[], readonly A[]>
}
```

Added in v2.5.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: readonly A[]) => Separated<readonly B[], readonly C[]>
```

Added in v2.5.0

# FilterableWithIndex

## filterMapWithIndex

**Signature**

```ts
export declare const filterMapWithIndex: <A, B>(
  f: (i: number, a: A) => O.Option<B>
) => (fa: readonly A[]) => readonly B[]
```

Added in v2.5.0

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: readonly A[]) => readonly B[]
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: readonly A[]) => readonly A[]
}
```

Added in v2.5.0

## partitionMapWithIndex

**Signature**

```ts
export declare const partitionMapWithIndex: <A, B, C>(
  f: (i: number, a: A) => Either<B, C>
) => (fa: readonly A[]) => Separated<readonly B[], readonly C[]>
```

Added in v2.5.0

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (
    fa: readonly A[]
  ) => Separated<readonly A[], readonly B[]>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: readonly A[]) => Separated<readonly A[], readonly A[]>
}
```

Added in v2.5.0

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: readonly A[]) => M
```

Added in v2.5.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: readonly A[]) => B
```

Added in v2.5.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: readonly A[]) => B
```

Added in v2.5.0

# FoldableWithIndex

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: number, a: A) => M) => (fa: readonly A[]) => M
```

Added in v2.5.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: readonly A[]) => B
```

Added in v2.5.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: readonly A[]) => B
```

Added in v2.5.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: readonly A[]) => readonly B[]
```

Added in v2.5.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: readonly A[]) => readonly B[]
```

Added in v2.5.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => readonly B[]) => (ma: readonly A[]) => readonly B[]
```

Added in v2.5.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => readonly A[]
```

Added in v2.5.0

# Traversable

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'ReadonlyArray'>
```

Added in v2.6.3

## traverse

**Signature**

```ts
export declare const traverse: PipeableTraverse1<'ReadonlyArray'>
```

Added in v2.6.3

# TraversableWithIndex

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: PipeableTraverseWithIndex1<'ReadonlyArray', number>
```

Added in v2.6.3

# Unfoldable

## unfold

**Signature**

```ts
export declare const unfold: <A, B>(b: B, f: (b: B) => O.Option<readonly [A, B]>) => readonly A[]
```

Added in v2.6.6

# Witherable

## wilt

**Signature**

```ts
export declare const wilt: PipeableWilt1<'ReadonlyArray'>
```

Added in v2.6.5

## wither

**Signature**

```ts
export declare const wither: PipeableWither1<'ReadonlyArray'>
```

Added in v2.6.5

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: readonly B[]) => <A>(first: readonly A[]) => readonly A[]
```

Added in v2.5.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: readonly B[]) => <A>(first: readonly A[]) => readonly B[]
```

Added in v2.5.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => readonly B[]) => (first: readonly A[]) => readonly A[]
```

Added in v2.5.0

## chop

A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
value and the rest of the array.

**Signature**

```ts
export declare const chop: <A, B>(
  f: (as: ReadonlyNonEmptyArray<A>) => readonly [B, readonly A[]]
) => (as: readonly A[]) => readonly B[]
```

**Example**

```ts
import { Eq } from 'fp-ts/Eq'
import { chop, spanLeft } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'

const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
  return chop((as) => {
    const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
    return [init, rest]
  })
}
assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
```

Added in v2.5.0

## difference

Creates an array of array values not included in the other given array using a `Eq` for equality
comparisons. The order and references of result values are determined by the first array.

**Signature**

```ts
export declare function difference<A>(
  E: Eq<A>
): {
  (xs: ReadonlyArray<A>): (ys: ReadonlyArray<A>) => ReadonlyArray<A>
  (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>): ReadonlyArray<A>
}
```

**Example**

```ts
import { difference } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2], difference(N.Eq)([2, 3])), [1])
```

Added in v2.5.0

## dropLeft

Drop a number of elements from the start of an array, creating a new array

**Signature**

```ts
export declare function dropLeft(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { dropLeft } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
```

Added in v2.5.0

## dropLeftWhile

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array

**Signature**

```ts
export declare function dropLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { dropLeftWhile } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
```

Added in v2.5.0

## dropRight

Drop a number of elements from the end of an array, creating a new array

**Signature**

```ts
export declare function dropRight(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { dropRight } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
```

Added in v2.5.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(wa: readonly A[]) => readonly (readonly A[])[]
```

Added in v2.5.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: readonly ((a: A) => B)[]) => readonly B[]
```

Added in v2.10.0

## flatten

Removes one level of nesting

Derivable from `Monad`.

**Signature**

```ts
export declare function flatten<A>(mma: ReadonlyArray<ReadonlyArray<A>>): ReadonlyArray<A>
```

**Example**

```ts
import { flatten } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
```

Added in v2.5.0

## intersection

Creates an array of unique values that are included in all given arrays using a `Eq` for equality
comparisons. The order and references of result values are determined by the first array.

**Signature**

```ts
export declare function intersection<A>(
  E: Eq<A>
): {
  (xs: ReadonlyArray<A>): (ys: ReadonlyArray<A>) => ReadonlyArray<A>
  (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>): ReadonlyArray<A>
}
```

**Example**

```ts
import { intersection } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2], intersection(N.Eq)([2, 3])), [2])
```

Added in v2.5.0

## intersperse

Places an element in between members of an array

**Signature**

```ts
export declare function intersperse<A>(e: A): (as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { intersperse } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
```

Added in v2.9.0

## prependToAll

Prepend an element to every member of an array

**Signature**

```ts
export declare const prependToAll: <A>(e: A) => (xs: readonly A[]) => readonly A[]
```

**Example**

```ts
import { prependToAll } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(prependToAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
```

Added in v2.9.0

## reverse

Reverse an array, creating a new array

**Signature**

```ts
export declare function reverse<A>(as: ReadonlyArray<A>): ReadonlyArray<A>
```

**Example**

```ts
import { reverse } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
```

Added in v2.5.0

## rights

Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order

**Signature**

```ts
export declare function rights<E, A>(as: ReadonlyArray<Either<E, A>>): ReadonlyArray<A>
```

**Example**

```ts
import { rights } from 'fp-ts/ReadonlyArray'
import { right, left } from 'fp-ts/Either'

assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
```

Added in v2.5.0

## rotate

Rotate an array to the right by `n` steps

**Signature**

```ts
export declare function rotate(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { rotate } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
```

Added in v2.5.0

## scanLeft

Same as `reduce` but it carries over the intermediate steps

**Signature**

```ts
export declare function scanLeft<A, B>(b: B, f: (b: B, a: A) => B): (as: ReadonlyArray<A>) => ReadonlyNonEmptyArray<B>
```

**Example**

```ts
import { scanLeft } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
```

Added in v2.5.0

## scanRight

Fold an array from the right, keeping all intermediate results instead of only the final result

**Signature**

```ts
export declare function scanRight<A, B>(b: B, f: (a: A, b: B) => B): (as: ReadonlyArray<A>) => ReadonlyNonEmptyArray<B>
```

**Example**

```ts
import { scanRight } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
```

Added in v2.5.0

## sort

Sort the elements of an array in increasing order, creating a new array

**Signature**

```ts
export declare const sort: <B>(O: Ord<B>) => <A extends B>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { sort } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
```

Added in v2.5.0

## sortBy

Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
etc...

**Signature**

```ts
export declare function sortBy<B>(ords: ReadonlyArray<Ord<B>>): <A extends B>(as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { sortBy } from 'fp-ts/ReadonlyArray'
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

Added in v2.5.0

## takeLeft

Keep only a number of elements from the start of an array, creating a new array.
`n` must be a natural number

**Signature**

```ts
export declare function takeLeft(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { takeLeft } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
```

Added in v2.5.0

## takeLeftWhile

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array

**Signature**

```ts
export declare function takeLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyArray<A>) => ReadonlyArray<B>
export declare function takeLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { takeLeftWhile } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
```

Added in v2.5.0

## union

Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons

**Signature**

```ts
export declare function union<A>(
  E: Eq<A>
): {
  (xs: ReadonlyArray<A>): (ys: ReadonlyArray<A>) => ReadonlyArray<A>
  (xs: ReadonlyArray<A>, ys: ReadonlyArray<A>): ReadonlyArray<A>
}
```

**Example**

```ts
import { union } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2], union(N.Eq)([2, 3])), [1, 2, 3])
```

Added in v2.5.0

## uniq

Remove duplicates from an array, keeping the first occurrence of an element.

**Signature**

```ts
export declare function uniq<A>(E: Eq<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { uniq } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
```

Added in v2.5.0

## zip

Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
longer array are discarded

**Signature**

```ts
export declare function zip<B>(bs: ReadonlyArray<B>): <A>(as: ReadonlyArray<A>) => ReadonlyArray<readonly [A, B]>
export declare function zip<A, B>(as: ReadonlyArray<A>, bs: ReadonlyArray<B>): ReadonlyArray<readonly [A, B]>
```

**Example**

```ts
import { zip } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], zip(['a', 'b', 'c', 'd'])), [
  [1, 'a'],
  [2, 'b'],
  [3, 'c'],
])
```

Added in v2.5.0

## zipWith

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
input array is short, excess elements of the longer array are discarded.

**Signature**

```ts
export declare function zipWith<A, B, C>(
  fa: ReadonlyArray<A>,
  fb: ReadonlyArray<B>,
  f: (a: A, b: B) => C
): ReadonlyArray<C>
```

**Example**

```ts
import { zipWith } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(
  zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n),
  ['a1', 'b2', 'c3']
)
```

Added in v2.5.0

# constructors

## comprehension

Array comprehension

```
[ f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) ]
```

**Signature**

```ts
export declare function comprehension<A, B, C, D, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>, ReadonlyArray<C>, ReadonlyArray<D>],
  f: (a: A, b: B, c: C, d: D) => R,
  g?: (a: A, b: B, c: C, d: D) => boolean
): ReadonlyArray<R>
export declare function comprehension<A, B, C, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>, ReadonlyArray<C>],
  f: (a: A, b: B, c: C) => R,
  g?: (a: A, b: B, c: C) => boolean
): ReadonlyArray<R>
export declare function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => R,
  g?: (a: A) => boolean
): ReadonlyArray<R>
export declare function comprehension<A, B, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>],
  f: (a: A, b: B) => R,
  g?: (a: A, b: B) => boolean
): ReadonlyArray<R>
export declare function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => boolean,
  g?: (a: A) => R
): ReadonlyArray<R>
```

**Example**

```ts
import { comprehension } from 'fp-ts/ReadonlyArray'
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

Added in v2.5.0

## cons

Attaches an element to the front of an array, creating a new non empty array

**Signature**

```ts
export declare function cons<A>(head: A): (tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>
export declare function cons<A>(head: A, tail: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { cons } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], cons(0)), [0, 1, 2, 3])
```

Added in v2.5.0

## fromArray

**Signature**

```ts
export declare function fromArray<A>(as: Array<A>): ReadonlyArray<A>
```

Added in v2.5.0

## makeBy

Return a list of length `n` with element `i` initialized with `f(i)`

**Signature**

```ts
export declare function makeBy<A>(n: number, f: (i: number) => A): ReadonlyArray<A>
```

**Example**

```ts
import { makeBy } from 'fp-ts/ReadonlyArray'

const double = (n: number): number => n * 2
assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
```

Added in v2.5.0

## range

Create an array containing a range of integers, including both endpoints

**Signature**

```ts
export declare function range(start: number, end: number): ReadonlyArray<number>
```

**Example**

```ts
import { range } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
```

Added in v2.5.0

## replicate

Create an array containing a value repeated the specified number of times

**Signature**

```ts
export declare function replicate<A>(n: number, a: A): ReadonlyArray<A>
```

**Example**

```ts
import { replicate } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
```

Added in v2.5.0

## snoc

Append an element to the end of an array, creating a new non empty array

**Signature**

```ts
export declare function snoc<A>(init: ReadonlyArray<A>, end: A): ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { snoc } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
```

Added in v2.5.0

# destructors

## foldLeft

Break an array into its first element and remaining elements

**Signature**

```ts
export declare function foldLeft<A, B>(
  onEmpty: Lazy<B>,
  onCons: (head: A, tail: ReadonlyArray<A>) => B
): (as: ReadonlyArray<A>) => B
```

**Example**

```ts
import { foldLeft } from 'fp-ts/ReadonlyArray'

const len: <A>(as: ReadonlyArray<A>) => number = foldLeft(
  () => 0,
  (_, tail) => 1 + len(tail)
)
assert.strictEqual(len([1, 2, 3]), 3)
```

Added in v2.5.0

## foldRight

Break an array into its initial elements and the last element

**Signature**

```ts
export declare function foldRight<A, B>(
  onEmpty: Lazy<B>,
  onCons: (init: ReadonlyArray<A>, last: A) => B
): (as: ReadonlyArray<A>) => B
```

Added in v2.5.0

## toArray

**Signature**

```ts
export declare function toArray<A>(ras: ReadonlyArray<A>): Array<A>
```

Added in v2.5.0

# guards

## isNonEmpty

Test whether an array is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`

**Signature**

```ts
export declare function isNonEmpty<A>(as: ReadonlyArray<A>): as is ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'ReadonlyArray'>
```

Added in v2.7.0

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative1<'ReadonlyArray'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'ReadonlyArray'>
```

Added in v2.7.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'ReadonlyArray'>
```

Added in v2.10.0

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'ReadonlyArray'>
```

Added in v2.7.0

## Extend

**Signature**

```ts
export declare const Extend: Extend1<'ReadonlyArray'>
```

Added in v2.7.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'ReadonlyArray'>
```

Added in v2.7.0

## FilterableWithIndex

**Signature**

```ts
export declare const FilterableWithIndex: FilterableWithIndex1<'ReadonlyArray', number>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'ReadonlyArray'>
```

Added in v2.7.0

## FoldableWithIndex

**Signature**

```ts
export declare const FoldableWithIndex: FoldableWithIndex1<'ReadonlyArray', number>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'ReadonlyArray'>
```

Added in v2.7.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'ReadonlyArray', number>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'ReadonlyArray'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'ReadonlyArray'>
```

Added in v2.10.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'ReadonlyArray'>
```

Added in v2.7.0

## TraversableWithIndex

**Signature**

```ts
export declare const TraversableWithIndex: TraversableWithIndex1<'ReadonlyArray', number>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'ReadonlyArray'
```

Added in v2.5.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

## Unfoldable

**Signature**

```ts
export declare const Unfoldable: Unfoldable1<'ReadonlyArray'>
```

Added in v2.7.0

## Witherable

**Signature**

```ts
export declare const Witherable: Witherable1<'ReadonlyArray'>
```

Added in v2.7.0

## getEq

Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
different lengths, the result is non equality.

**Signature**

```ts
export declare function getEq<A>(E: Eq<A>): Eq<ReadonlyArray<A>>
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { getEq } from 'fp-ts/ReadonlyArray'

const E = getEq(S.Eq)
assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
assert.strictEqual(E.equals(['a'], []), false)
```

Added in v2.5.0

## getMonoid

Returns a `Monoid` for `ReadonlyArray<A>`.

**Signature**

```ts
export declare const getMonoid: <A = never>() => Monoid<readonly A[]>
```

**Example**

```ts
import { getMonoid } from 'fp-ts/ReadonlyArray'

const M = getMonoid<number>()
assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
```

Added in v2.5.0

## getOrd

Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
the same length, the result is equality.

**Signature**

```ts
export declare function getOrd<A>(O: Ord<A>): Ord<ReadonlyArray<A>>
```

**Example**

```ts
import { getOrd } from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/string'

const O = getOrd(S.Ord)
assert.strictEqual(O.compare(['b'], ['a']), 1)
assert.strictEqual(O.compare(['a'], ['a']), 0)
assert.strictEqual(O.compare(['a'], ['b']), -1)
```

Added in v2.5.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <A = never>() => Semigroup<readonly A[]>
```

Added in v2.5.0

## getShow

**Signature**

```ts
export declare function getShow<A>(S: Show<A>): Show<ReadonlyArray<A>>
```

Added in v2.5.0

## ~~readonlyArray~~

Use small, specific instances instead.

**Signature**

```ts
export declare const readonlyArray: FunctorWithIndex1<'ReadonlyArray', number> &
  Monad1<'ReadonlyArray'> &
  Unfoldable1<'ReadonlyArray'> &
  Alternative1<'ReadonlyArray'> &
  Extend1<'ReadonlyArray'> &
  FilterableWithIndex1<'ReadonlyArray', number> &
  FoldableWithIndex1<'ReadonlyArray', number> &
  TraversableWithIndex1<'ReadonlyArray', number> &
  Witherable1<'ReadonlyArray'>
```

Added in v2.5.0

# unsafe

## unsafeDeleteAt

**Signature**

```ts
export declare function unsafeDeleteAt<A>(i: number, as: ReadonlyArray<A>): ReadonlyArray<A>
```

Added in v2.5.0

## unsafeInsertAt

**Signature**

```ts
export declare function unsafeInsertAt<A>(i: number, a: A, as: ReadonlyArray<A>): ReadonlyArray<A>
```

Added in v2.5.0

## unsafeUpdateAt

**Signature**

```ts
export declare function unsafeUpdateAt<A>(i: number, a: A, as: ReadonlyArray<A>): ReadonlyArray<A>
```

Added in v2.5.0

# utils

## Do

**Signature**

```ts
export declare const Do: readonly {}[]
```

Added in v2.9.0

## Spanned (interface)

**Signature**

```ts
export interface Spanned<I, R> {
  readonly init: ReadonlyArray<I>
  readonly rest: ReadonlyArray<R>
}
```

Added in v2.5.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: readonly B[]
) => (fa: readonly A[]) => readonly { [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => readonly B[]
) => (ma: readonly A[]) => readonly { [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: readonly A[]) => readonly { [K in N]: A }[]
```

Added in v2.8.0

## chainWithIndex

**Signature**

```ts
export declare const chainWithIndex: <A, B>(f: (i: number, a: A) => readonly B[]) => (ma: readonly A[]) => readonly B[]
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
export declare function chunksOf(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>
```

**Example**

```ts
import { chunksOf } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
```

Added in v2.5.0

## deleteAt

Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature**

```ts
export declare function deleteAt(i: number): <A>(as: ReadonlyArray<A>) => Option<ReadonlyArray<A>>
```

**Example**

```ts
import { deleteAt } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(deleteAt(1)([]), none)
```

Added in v2.5.0

## elem

Test if a value is a member of an array. Takes a `Eq<A>` as a single
argument which returns the function to use to search for a value of type `A` in
an array of type `ReadonlyArray<A>`.

**Signature**

```ts
export declare function elem<A>(
  E: Eq<A>
): {
  (a: A): (as: ReadonlyArray<A>) => boolean
  (a: A, as: ReadonlyArray<A>): boolean
}
```

**Example**

```ts
import { elem } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(2)), true)
assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(0)), false)
```

Added in v2.5.0

## empty

An empty array

**Signature**

```ts
export declare const empty: readonly never[]
```

Added in v2.5.0

## every

Check if a predicate holds true for every array member.

**Signature**

```ts
export declare const every: <A>(predicate: Predicate<A>) => (as: readonly A[]) => boolean
```

**Example**

```ts
import { every } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(pipe([1, 2, 3], every(isPositive)), true)
assert.deepStrictEqual(pipe([1, 2, -3], every(isPositive)), false)
```

Added in v2.9.0

## findFirst

Find the first element which satisfies a predicate (or a refinement) function

**Signature**

```ts
export declare function findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Option<B>
export declare function findFirst<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
```

**Example**

```ts
import { findFirst } from 'fp-ts/ReadonlyArray'
import { some } from 'fp-ts/Option'

assert.deepStrictEqual(
  findFirst((x: { a: number; b: number }) => x.a === 1)([
    { a: 1, b: 1 },
    { a: 1, b: 2 },
  ]),
  some({ a: 1, b: 1 })
)
```

Added in v2.5.0

## findFirstMap

Find the first element returned by an option based selector function

**Signature**

```ts
export declare function findFirstMap<A, B>(f: (a: A) => Option<B>): (as: ReadonlyArray<A>) => Option<B>
```

**Example**

```ts
import { findFirstMap } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

interface Person {
  name: string
  age?: number
}

const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]

// returns the name of the first person that has an age
assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
```

Added in v2.5.0

## findIndex

Find the first index for which a predicate holds

**Signature**

```ts
export declare function findIndex<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<number>
```

**Example**

```ts
import { findIndex } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
```

Added in v2.5.0

## findLast

Find the last element which satisfies a predicate function

**Signature**

```ts
export declare function findLast<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Option<B>
export declare function findLast<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
```

**Example**

```ts
import { findLast } from 'fp-ts/ReadonlyArray'
import { some } from 'fp-ts/Option'

assert.deepStrictEqual(
  findLast((x: { a: number; b: number }) => x.a === 1)([
    { a: 1, b: 1 },
    { a: 1, b: 2 },
  ]),
  some({ a: 1, b: 2 })
)
```

Added in v2.5.0

## findLastIndex

Returns the index of the last element of the list which matches the predicate

**Signature**

```ts
export declare function findLastIndex<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<number>
```

**Example**

```ts
import { findLastIndex } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

interface X {
  a: number
  b: number
}
const xs: ReadonlyArray<X> = [
  { a: 1, b: 0 },
  { a: 1, b: 1 },
]
assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
```

Added in v2.5.0

## findLastMap

Find the last element returned by an option based selector function

**Signature**

```ts
export declare function findLastMap<A, B>(f: (a: A) => Option<B>): (as: ReadonlyArray<A>) => Option<B>
```

**Example**

```ts
import { findLastMap } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

interface Person {
  name: string
  age?: number
}

const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]

// returns the name of the last person that has an age
assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
```

Added in v2.5.0

## head

Get the first element in an array, or `None` if the array is empty

**Signature**

```ts
export declare function head<A>(as: ReadonlyArray<A>): Option<A>
```

**Example**

```ts
import { head } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(head([1, 2, 3]), some(1))
assert.deepStrictEqual(head([]), none)
```

Added in v2.5.0

## init

Get all but the last element of an array, creating a new array, or `None` if the array is empty

**Signature**

```ts
export declare function init<A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>>
```

**Example**

```ts
import { init } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
assert.deepStrictEqual(init([]), none)
```

Added in v2.5.0

## insertAt

Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature**

```ts
export declare function insertAt<A>(i: number, a: A): (as: ReadonlyArray<A>) => Option<ReadonlyArray<A>>
```

**Example**

```ts
import { insertAt } from 'fp-ts/ReadonlyArray'
import { some } from 'fp-ts/Option'

assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
```

Added in v2.5.0

## isEmpty

Test whether an array is empty

**Signature**

```ts
export declare function isEmpty<A>(as: ReadonlyArray<A>): boolean
```

**Example**

```ts
import { isEmpty } from 'fp-ts/ReadonlyArray'

assert.strictEqual(isEmpty([]), true)
```

Added in v2.5.0

## isOutOfBound

Test whether an array contains a particular index

**Signature**

```ts
export declare function isOutOfBound<A>(i: number, as: ReadonlyArray<A>): boolean
```

Added in v2.5.0

## last

Get the last element in an array, or `None` if the array is empty

**Signature**

```ts
export declare function last<A>(as: ReadonlyArray<A>): Option<A>
```

**Example**

```ts
import { last } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(last([1, 2, 3]), some(3))
assert.deepStrictEqual(last([]), none)
```

Added in v2.5.0

## lefts

Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order

**Signature**

```ts
export declare function lefts<E, A>(as: ReadonlyArray<Either<E, A>>): ReadonlyArray<E>
```

**Example**

```ts
import { lefts } from 'fp-ts/ReadonlyArray'
import { left, right } from 'fp-ts/Either'

assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
```

Added in v2.5.0

## lookup

This function provides a safe way to read a value at a particular index from an array

**Signature**

```ts
export declare function lookup(i: number): <A>(as: ReadonlyArray<A>) => Option<A>
export declare function lookup<A>(i: number, as: ReadonlyArray<A>): Option<A>
```

**Example**

```ts
import { lookup } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
```

Added in v2.5.0

## modifyAt

Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
of bounds

**Signature**

```ts
export declare function modifyAt<A>(i: number, f: (a: A) => A): (as: ReadonlyArray<A>) => Option<ReadonlyArray<A>>
```

**Example**

```ts
import { modifyAt } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

const double = (x: number): number => x * 2
assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
assert.deepStrictEqual(modifyAt(1, double)([]), none)
```

Added in v2.5.0

## some

Check if a predicate holds true for any array member.

**Signature**

```ts
export declare const some: <A>(predicate: Predicate<A>) => (as: readonly A[]) => boolean
```

**Example**

```ts
import { some } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(pipe([-1, -2, 3], some(isPositive)), true)
assert.deepStrictEqual(pipe([-1, -2, -3], some(isPositive)), false)
```

Added in v2.9.0

## spanLeft

Split an array into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

**Signature**

```ts
export declare function spanLeft<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Spanned<B, A>
export declare function spanLeft<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Spanned<A, A>
```

**Example**

```ts
import { spanLeft } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
```

Added in v2.5.0

## splitAt

Splits an array into two pieces, the first piece has `n` elements.

**Signature**

```ts
export declare function splitAt(n: number): <A>(as: ReadonlyArray<A>) => readonly [ReadonlyArray<A>, ReadonlyArray<A>]
```

**Example**

```ts
import { splitAt } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [
  [1, 2],
  [3, 4, 5],
])
```

Added in v2.5.0

## tail

Get all but the first element of an array, creating a new array, or `None` if the array is empty

**Signature**

```ts
export declare function tail<A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>>
```

**Example**

```ts
import { tail } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(tail([]), none)
```

Added in v2.5.0

## takeRight

Keep only a number of elements from the end of an array, creating a new array.
`n` must be a natural number

**Signature**

```ts
export declare function takeRight(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { takeRight } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
```

Added in v2.5.0

## unzip

The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays

**Signature**

```ts
export declare function unzip<A, B>(as: ReadonlyArray<readonly [A, B]>): readonly [ReadonlyArray<A>, ReadonlyArray<B>]
```

**Example**

```ts
import { unzip } from 'fp-ts/ReadonlyArray'

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

Added in v2.5.0

## updateAt

Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature**

```ts
export declare function updateAt<A>(i: number, a: A): (as: ReadonlyArray<A>) => Option<ReadonlyArray<A>>
```

**Example**

```ts
import { updateAt } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
assert.deepStrictEqual(updateAt(1, 1)([]), none)
```

Added in v2.5.0
