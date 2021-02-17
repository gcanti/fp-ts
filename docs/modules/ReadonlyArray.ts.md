---
title: ReadonlyArray.ts
nav_order: 66
parent: Modules
---

## ReadonlyArray overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Alternative](#alternative)
  - [zero](#zero)
- [Apply](#apply)
  - [ap](#ap)
- [Chain](#chain)
  - [chain](#chain)
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
  - [chop](#chop)
  - [difference](#difference)
  - [dropLeft](#dropleft)
  - [dropLeftWhile](#dropleftwhile)
  - [dropRight](#dropright)
  - [flap](#flap)
  - [intersection](#intersection)
  - [intersperse](#intersperse)
  - [prependAll](#prependall)
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
  - [makeBy](#makeby)
  - [range](#range)
  - [replicate](#replicate)
  - [snoc](#snoc)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [duplicate](#duplicate)
  - [flatten](#flatten)
- [destructors](#destructors)
  - [matchLeft](#matchleft)
  - [matchRight](#matchright)
- [guards](#guards)
  - [isNonEmpty](#isnonempty)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Alternative](#alternative-1)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Chain](#chain-1)
  - [Compactable](#compactable-1)
  - [Extend](#extend-1)
  - [Filterable](#filterable-1)
  - [FilterableWithIndex](#filterablewithindex-1)
  - [Foldable](#foldable-1)
  - [FoldableWithIndex](#foldablewithindex-1)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [Traversable](#traversable-1)
  - [TraversableWithIndex](#traversablewithindex-1)
  - [URI (type alias)](#uri-type-alias)
  - [Unfoldable](#unfoldable-1)
  - [Witherable](#witherable-1)
  - [getEq](#geteq)
  - [getMonoid](#getmonoid)
  - [getOrd](#getord)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [Spanned (interface)](#spanned-interface)
  - [apS](#aps)
  - [apT](#apt)
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
  - [tupled](#tupled)
  - [unzip](#unzip)
  - [updateAt](#updateat)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <A>(second: Lazy<readonly A[]>) => (first: readonly A[]) => readonly A[]
```

Added in v3.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <B>(second: Lazy<readonly B[]>) => <A>(first: readonly A[]) => readonly (B | A)[]
```

Added in v3.0.0

# Alternative

## zero

**Signature**

```ts
export declare const zero: <A>() => readonly A[]
```

Added in v3.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: readonly A[]) => <B>(fab: readonly ((a: A) => B)[]) => readonly B[]
```

Added in v3.0.0

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => readonly B[]) => (ma: readonly A[]) => readonly B[]
```

Added in v3.0.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(foa: readonly O.Option<A>[]) => readonly A[]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: readonly Either<A, B>[]) => Separated<readonly A[], readonly B[]>
```

Added in v3.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: readonly A[]) => B) => (wa: readonly A[]) => readonly B[]
```

Added in v3.0.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: Filter1<'ReadonlyArray'>
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: readonly A[]) => readonly B[]
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: Partition1<'ReadonlyArray'>
```

Added in v3.0.00

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: readonly A[]) => Separated<readonly B[], readonly C[]>
```

Added in v3.0.0

# FilterableWithIndex

## filterMapWithIndex

**Signature**

```ts
export declare const filterMapWithIndex: <A, B>(
  f: (i: number, a: A) => O.Option<B>
) => (fa: readonly A[]) => readonly B[]
```

Added in v3.0.0

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: FilterWithIndex1<'ReadonlyArray', number>
```

Added in v3.0.0

## partitionMapWithIndex

**Signature**

```ts
export declare const partitionMapWithIndex: <A, B, C>(
  f: (i: number, a: A) => Either<B, C>
) => (fa: readonly A[]) => Separated<readonly B[], readonly C[]>
```

Added in v3.0.0

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: PartitionWithIndex1<'ReadonlyArray', number>
```

Added in v3.0.0

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: readonly A[]) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: readonly A[]) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: readonly A[]) => B
```

Added in v3.0.0

# FoldableWithIndex

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: number, a: A) => M) => (fa: readonly A[]) => M
```

Added in v3.0.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <B, A>(b: B, f: (i: number, a: A, b: B) => B) => (fa: readonly A[]) => B
```

Added in v3.0.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <B, A>(b: B, f: (i: number, b: B, a: A) => B) => (fa: readonly A[]) => B
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: readonly A[]) => readonly B[]
```

Added in v3.0.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: readonly A[]) => readonly B[]
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => readonly A[]
```

Added in v3.0.0

# Traversable

## sequence

**for optimized and stack safe version check the data types `sequenceArray` function**

**Signature**

```ts
export declare const sequence: Sequence1<'ReadonlyArray'>
```

Added in v3.0.0

## traverse

**for optimized and stack safe version check the data types `traverseArray` function**

**Signature**

```ts
export declare const traverse: Traverse1<'ReadonlyArray'>
```

Added in v3.0.0

# TraversableWithIndex

## traverseWithIndex

**for optimized and stack safe version check the data types `traverseReadonlyArrayWithIndex` function**

**Signature**

```ts
export declare const traverseWithIndex: TraverseWithIndex1<'ReadonlyArray', number>
```

Added in v3.0.0

# Unfoldable

## unfold

**Signature**

```ts
export declare const unfold: <B, A>(b: B, f: (b: B) => O.Option<readonly [A, B]>) => readonly A[]
```

Added in v3.0.0

# Witherable

## wilt

**Signature**

```ts
export declare const wilt: Wilt1<'ReadonlyArray'>
```

Added in v3.0.0

## wither

**Signature**

```ts
export declare const wither: Wither1<'ReadonlyArray'>
```

Added in v3.0.0

# combinators

## chop

A useful recursion pattern for processing a `ReadonlyArray` to produce a new `ReadonlyArray`, often used for "chopping" up the input
`ReadonlyArray`. Typically chop is called with some function that will consume an initial prefix of the `ReadonlyArray` and produce a
value and the rest of the `ReadonlyArray`.

**Signature**

```ts
export declare const chop: <A, B>(
  f: (as: ReadonlyNonEmptyArray<A>) => readonly [B, readonly A[]]
) => (as: readonly A[]) => readonly B[]
```

**Example**

```ts
import { Eq } from 'fp-ts/Eq'
import * as N from 'fp-ts/number'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

const group = <A>(E: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
  return RA.chop((as) => {
    const { init, rest } = pipe(as, RA.spanLeft(E.equals(as[0])))
    return [init, rest]
  })
}
assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
```

Added in v3.0.0

## difference

Creates a `ReadonlyArray` of values not included in the other given `ReadonlyArray` using a `Eq` for equality
comparisons. The order and references of result values are determined by the first `ReadonlyArray`.

**Signature**

```ts
export declare const difference: <A>(E: Eq<A>) => (ys: readonly A[]) => (xs: readonly A[]) => readonly A[]
```

**Example**

```ts
import { difference } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2], difference(N.Eq)([2, 3])), [1])
```

Added in v3.0.0

## dropLeft

Drop a number of elements from the start of a `ReadonlyArray`, creating a new `ReadonlyArray`.

**Signature**

```ts
export declare const dropLeft: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { dropLeft } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
```

Added in v3.0.0

## dropLeftWhile

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `ReadonlyArray`.

**Signature**

```ts
export declare const dropLeftWhile: <A>(predicate: Predicate<A>) => (as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { dropLeftWhile } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
```

Added in v3.0.0

## dropRight

Drop a number of elements from the end of a `ReadonlyArray`, creating a new `ReadonlyArray`.

**Signature**

```ts
export declare const dropRight: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { dropRight } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: readonly ((a: A) => B)[]) => readonly B[]
```

Added in v3.0.0

## intersection

Creates a `ReadonlyArray` of unique values that are included in all given `ReadonlyArray`s using a `Eq` for equality
comparisons. The order and references of result values are determined by the first `ReadonlyArray`.

**Signature**

```ts
export declare const intersection: <A>(E: Eq<A>) => (ys: readonly A[]) => (xs: readonly A[]) => readonly A[]
```

**Example**

```ts
import { intersection } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2], intersection(N.Eq)([2, 3])), [2])
```

Added in v3.0.0

## intersperse

Places an element in between members of a `ReadonlyArray`

**Signature**

```ts
export declare const intersperse: <A>(a: A) => (as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { intersperse } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3, 4], intersperse(9)), [1, 9, 2, 9, 3, 9, 4])
```

Added in v3.0.0

## prependAll

Prepend an element to every member of a `ReadonlyArray`

**Signature**

```ts
export declare const prependAll: <A>(a: A) => (as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { prependAll } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3, 4], prependAll(9)), [9, 1, 9, 2, 9, 3, 9, 4])
```

Added in v3.0.0

## reverse

Reverse a `ReadonlyArray`, creating a new `ReadonlyArray`.

**Signature**

```ts
export declare const reverse: <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { reverse } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
```

Added in v3.0.0

## rights

Extracts from a `ReadonlyArray` of `Either`s all the `Right` elements.

**Signature**

```ts
export declare const rights: <E, A>(as: readonly Either<E, A>[]) => readonly A[]
```

**Example**

```ts
import { rights } from 'fp-ts/ReadonlyArray'
import { right, left } from 'fp-ts/Either'

assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
```

Added in v3.0.0

## rotate

Rotate a `ReadonlyArray` to the right by `n` steps

**Signature**

```ts
export declare const rotate: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { rotate } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
```

Added in v3.0.0

## scanLeft

Fold a `ReadonlyArray` from the left, keeping all intermediate results instead of only the final result.

**Signature**

```ts
export declare const scanLeft: <B, A>(b: B, f: (b: B, a: A) => B) => (as: readonly A[]) => ReadonlyNonEmptyArray<B>
```

**Example**

```ts
import { scanLeft } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
```

Added in v3.0.0

## scanRight

Fold a `ReadonlyArray` from the right, keeping all intermediate results instead of only the final result.

**Signature**

```ts
export declare const scanRight: <B, A>(b: B, f: (a: A, b: B) => B) => (as: readonly A[]) => ReadonlyNonEmptyArray<B>
```

**Example**

```ts
import { scanRight } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
```

Added in v3.0.0

## sort

Sort the elements of a `ReadonlyArray` in increasing order, creating a new `ReadonlyArray`.

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

Added in v3.0.0

## sortBy

Sort the elements of a `ReadonlyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
etc...

**Signature**

```ts
export declare const sortBy: <B>(ords: readonly Ord<B>[]) => <A extends B>(as: readonly A[]) => readonly A[]
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

Added in v3.0.0

## takeLeft

Keep only a number of elements from the start of a `ReadonlyArray`, creating a new `ReadonlyArray`..
`n` must be a natural number

**Signature**

```ts
export declare const takeLeft: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { takeLeft } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
```

Added in v3.0.0

## takeLeftWhile

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `ReadonlyArray`.

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

Added in v3.0.0

## union

Creates a `ReadonlyArray` of unique values, in order, from all given `ReadonlyArray`s using a `Eq` for equality comparisons.

**Signature**

```ts
export declare const union: <A>(E: Eq<A>) => (ys: readonly A[]) => (xs: readonly A[]) => readonly A[]
```

**Example**

```ts
import { union } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2], union(N.Eq)([2, 3])), [1, 2, 3])
```

Added in v3.0.0

## uniq

Remove duplicates from a `ReadonlyArray`, keeping the first occurrence of an element.

**Signature**

```ts
export declare const uniq: <A>(E: Eq<A>) => (as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { uniq } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
```

Added in v3.0.0

## zip

Takes two `ReadonlyArray`s and returns a `ReadonlyArray` of corresponding pairs. If one input `ReadonlyArray` is short, excess elements of the
longer `ReadonlyArray` are discarded.

**Signature**

```ts
export declare const zip: <B>(bs: readonly B[]) => <A>(as: readonly A[]) => readonly (readonly [A, B])[]
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

Added in v3.0.0

## zipWith

Apply a function to pairs of elements at the same index in two `ReadonlyArray`s, collecting the results in a new `ReadonlyArray`. If one
input `ReadonlyArray` is short, excess elements of the longer `ReadonlyArray` are discarded.

**Signature**

```ts
export declare const zipWith: <B, A, C>(fb: readonly B[], f: (a: A, b: B) => C) => (fa: readonly A[]) => readonly C[]
```

**Example**

```ts
import { zipWith } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    zipWith(['a', 'b', 'c', 'd'], (n, s) => s + n)
  ),
  ['a1', 'b2', 'c3']
)
```

Added in v3.0.0

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

Added in v3.0.0

## cons

Attaches an element to the front of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const cons: <A>(head: A) => (tail: readonly A[]) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { cons } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], cons(0)), [0, 1, 2, 3])
```

Added in v3.0.0

## makeBy

Return a list of length `n` with element `i` initialized with `f(i)`

**Signature**

```ts
export declare const makeBy: <A>(n: number, f: (n: number) => A) => readonly A[]
```

**Example**

```ts
import { makeBy } from 'fp-ts/ReadonlyArray'

const double = (n: number): number => n * 2
assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
```

Added in v3.0.0

## range

Create a `ReadonlyArray` containing a range of integers, including both endpoints

**Signature**

```ts
export declare const range: (start: number, end: number) => ReadonlyArray<number>
```

**Example**

```ts
import { range } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
```

Added in v3.0.0

## replicate

Create a `ReadonlyArray` containing a value repeated the specified number of times

**Signature**

```ts
export declare const replicate: <A>(n: number, a: A) => readonly A[]
```

**Example**

```ts
import { replicate } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
```

Added in v3.0.0

## snoc

Append an element to the end of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const snoc: <A>(end: A) => (init: readonly A[]) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { snoc } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], snoc(4)), [1, 2, 3, 4])
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: readonly B[]) => <A>(first: readonly A[]) => readonly A[]
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: readonly B[]) => <A>(first: readonly A[]) => readonly B[]
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => readonly B[]) => (first: readonly A[]) => readonly A[]
```

Added in v3.0.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(wa: readonly A[]) => readonly (readonly A[])[]
```

Added in v3.0.0

## flatten

Removes one level of nesting

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: readonly (readonly A[])[]) => readonly A[]
```

**Example**

```ts
import { flatten } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(flatten([[1], [2, 3], [4]]), [1, 2, 3, 4])
```

Added in v3.0.0

# destructors

## matchLeft

Break a `ReadonlyArray` into its first element and remaining elements

**Signature**

```ts
export declare const matchLeft: <B, A>(
  onEmpty: Lazy<B>,
  onCons: (head: A, tail: readonly A[]) => B
) => (as: readonly A[]) => B
```

**Example**

```ts
import { matchLeft } from 'fp-ts/ReadonlyArray'

const len: <A>(as: ReadonlyArray<A>) => number = matchLeft(
  () => 0,
  (_, tail) => 1 + len(tail)
)
assert.strictEqual(len([1, 2, 3]), 3)
```

Added in v3.0.0

## matchRight

Break a `ReadonlyArray` into its initial elements and the last element

**Signature**

```ts
export declare const matchRight: <B, A>(
  onEmpty: Lazy<B>,
  onCons: (init: readonly A[], last: A) => B
) => (as: readonly A[]) => B
```

Added in v3.0.0

# guards

## isNonEmpty

Test whether a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`

**Signature**

```ts
export declare const isNonEmpty: <A>(as: readonly A[]) => as is ReadonlyNonEmptyArray<A>
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'ReadonlyArray'>
```

Added in v3.0.0

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative1<'ReadonlyArray'>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'ReadonlyArray'>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'ReadonlyArray'>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'ReadonlyArray'>
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'ReadonlyArray'>
```

Added in v3.0.0

## Extend

**Signature**

```ts
export declare const Extend: Extend1<'ReadonlyArray'>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'ReadonlyArray'>
```

Added in v3.0.0

## FilterableWithIndex

**Signature**

```ts
export declare const FilterableWithIndex: FilterableWithIndex1<'ReadonlyArray', number>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'ReadonlyArray'>
```

Added in v3.0.0

## FoldableWithIndex

**Signature**

```ts
export declare const FoldableWithIndex: FoldableWithIndex1<'ReadonlyArray', number>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'ReadonlyArray'>
```

Added in v3.0.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'ReadonlyArray', number>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'ReadonlyArray'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'ReadonlyArray'>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'ReadonlyArray'>
```

Added in v3.0.0

## TraversableWithIndex

**Signature**

```ts
export declare const TraversableWithIndex: TraversableWithIndex1<'ReadonlyArray', number>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'ReadonlyArray'
```

Added in v3.0.0

## Unfoldable

**Signature**

```ts
export declare const Unfoldable: Unfoldable1<'ReadonlyArray'>
```

Added in v3.0.0

## Witherable

**Signature**

```ts
export declare const Witherable: Witherable1<'ReadonlyArray'>
```

Added in v3.0.0

## getEq

Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
`ReadonlyArray`s as equal if all elements of both `ReadonlyArray`s are compared equal pairwise with the given `E`. In case of `ReadonlyArray`s of
different lengths, the result is non equality.

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<readonly A[]>
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { getEq } from 'fp-ts/ReadonlyArray'

const E = getEq(S.Eq)
assert.strictEqual(E.equals(['a', 'b'])(['a', 'b']), true)
assert.strictEqual(E.equals(['a'])([]), false)
```

Added in v3.0.0

## getMonoid

Returns a `Monoid` for `ReadonlyArray<A>`.

**Signature**

```ts
export declare const getMonoid: <A = never>() => Monoid<readonly A[]>
```

Added in v3.0.0

## getOrd

Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
`ReadonlyArray`s is equal to: the first non equal comparison of each `ReadonlyArray`s elements taken pairwise in increasing order, in
case of equality over all the pairwise elements; the longest `ReadonlyArray` is considered the greatest, if both `ReadonlyArray`s have
the same length, the result is equality.

**Signature**

```ts
export declare const getOrd: <A>(O: Ord<A>) => Ord<readonly A[]>
```

**Example**

```ts
import { getOrd } from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

const O = getOrd(S.Ord)
assert.strictEqual(pipe(['b'], O.compare(['a'])), 1)
assert.strictEqual(pipe(['a'], O.compare(['a'])), 0)
assert.strictEqual(pipe(['a'], O.compare(['b'])), -1)
```

Added in v3.0.0

## getSemigroup

Returns a `Semigroup` for `ReadonlyArray<A>`.

**Signature**

```ts
export declare const getSemigroup: <A = never>() => Monoid<readonly A[]>
```

**Example**

```ts
import { getSemigroup } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

const S = getSemigroup<number>()
assert.deepStrictEqual(pipe([1, 2], S.concat([3, 4])), [1, 2, 3, 4])
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<readonly A[]>
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: readonly (readonly [])[]
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: readonly {}[]
```

Added in v3.0.0

## Spanned (interface)

**Signature**

```ts
export interface Spanned<I, R> {
  readonly init: ReadonlyArray<I>
  readonly rest: ReadonlyArray<R>
}
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: readonly B[]
) => (fa: readonly A[]) => readonly { [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <B>(fb: readonly B[]) => <A>(fas: readonly A[]) => readonly (readonly [...A, B])[]
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => readonly B[]
) => (ma: readonly A[]) => readonly { [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: readonly A[]) => readonly { [K in N]: A }[]
```

Added in v3.0.0

## chainWithIndex

**Signature**

```ts
export declare const chainWithIndex: <A, B>(f: (i: number, a: A) => readonly B[]) => (ma: readonly A[]) => readonly B[]
```

Added in v3.0.0

## chunksOf

Splits a `ReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the `ReadonlyArray`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that

```ts
chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
```

whenever `n` evenly divides the length of `xs`.

**Signature**

```ts
export declare const chunksOf: (n: number) => <A>(as: readonly A[]) => readonly (readonly A[])[]
```

**Example**

```ts
import { chunksOf } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
```

Added in v3.0.0

## deleteAt

Delete the element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out of bounds.

**Signature**

```ts
export declare const deleteAt: (i: number) => <A>(as: readonly A[]) => O.Option<readonly A[]>
```

**Example**

```ts
import { deleteAt } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(deleteAt(1)([]), none)
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `ReadonlyArray`.

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => (a: A) => (as: readonly A[]) => boolean
```

**Example**

```ts
import { elem } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(2)), true)
assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(0)), false)
```

Added in v3.0.0

## empty

An empty `ReadonlyArray`.

**Signature**

```ts
export declare const empty: readonly never[]
```

Added in v3.0.0

## every

Check if a predicate holds true for every `ReadonlyArray` member.

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

Added in v3.0.0

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

Added in v3.0.0

## findFirstMap

Find the first element returned by an option based selector function

**Signature**

```ts
export declare const findFirstMap: <A, B>(f: (a: A) => O.Option<B>) => (as: readonly A[]) => O.Option<B>
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

Added in v3.0.0

## findIndex

Find the first index for which a predicate holds

**Signature**

```ts
export declare const findIndex: <A>(predicate: Predicate<A>) => (as: readonly A[]) => Option<number>
```

**Example**

```ts
import { findIndex } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
```

Added in v3.0.0

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

Added in v3.0.0

## findLastIndex

Returns the index of the last element of the list which matches the predicate

**Signature**

```ts
export declare const findLastIndex: <A>(predicate: Predicate<A>) => (as: readonly A[]) => Option<number>
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

Added in v3.0.0

## findLastMap

Find the last element returned by an option based selector function

**Signature**

```ts
export declare const findLastMap: <A, B>(f: (a: A) => O.Option<B>) => (as: readonly A[]) => O.Option<B>
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

Added in v3.0.0

## head

Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

**Signature**

```ts
export declare const head: <A>(as: readonly A[]) => O.Option<A>
```

**Example**

```ts
import { head } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(head([1, 2, 3]), some(1))
assert.deepStrictEqual(head([]), none)
```

Added in v3.0.0

## init

Get all but the last element of a `ReadonlyArray`, creating a new `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

**Signature**

```ts
export declare const init: <A>(as: readonly A[]) => O.Option<readonly A[]>
```

**Example**

```ts
import { init } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
assert.deepStrictEqual(init([]), none)
```

Added in v3.0.0

## insertAt

Insert an element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out of bounds.

**Signature**

```ts
export declare const insertAt: <A>(i: number, a: A) => (as: readonly A[]) => O.Option<readonly A[]>
```

**Example**

```ts
import { insertAt } from 'fp-ts/ReadonlyArray'
import { some } from 'fp-ts/Option'

assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
```

Added in v3.0.0

## isEmpty

Test whether a `ReadonlyArray` is empty

**Signature**

```ts
export declare const isEmpty: <A>(as: readonly A[]) => boolean
```

**Example**

```ts
import { isEmpty } from 'fp-ts/ReadonlyArray'

assert.strictEqual(isEmpty([]), true)
```

Added in v3.0.0

## isOutOfBound

Test whether a `ReadonlyArray` contains a particular index

**Signature**

```ts
export declare const isOutOfBound: <A>(i: number) => (as: readonly A[]) => boolean
```

Added in v3.0.0

## last

Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

**Signature**

```ts
export declare const last: <A>(as: readonly A[]) => O.Option<A>
```

**Example**

```ts
import { last } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(last([1, 2, 3]), some(3))
assert.deepStrictEqual(last([]), none)
```

Added in v3.0.0

## lefts

Extracts from a `ReadonlyArray` of `Either` all the `Left` elements. All the `Left` elements are extracted in order

**Signature**

```ts
export declare const lefts: <E, A>(as: readonly Either<E, A>[]) => readonly E[]
```

**Example**

```ts
import { lefts } from 'fp-ts/ReadonlyArray'
import { left, right } from 'fp-ts/Either'

assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
```

Added in v3.0.0

## lookup

This function provides a safe way to read a value at a particular index from a `ReadonlyArray`

**Signature**

```ts
export declare const lookup: (i: number) => <A>(as: readonly A[]) => O.Option<A>
```

**Example**

```ts
import { lookup } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
```

Added in v3.0.0

## modifyAt

Apply a function to the element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out
of bounds.

**Signature**

```ts
export declare const modifyAt: <A>(i: number, f: Endomorphism<A>) => (as: readonly A[]) => O.Option<readonly A[]>
```

**Example**

```ts
import { modifyAt } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

const double = (x: number): number => x * 2
assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
assert.deepStrictEqual(modifyAt(1, double)([]), none)
```

Added in v3.0.0

## some

Check if a predicate holds true for any `ReadonlyArray` member.

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

Added in v3.0.0

## spanLeft

Split a `ReadonlyArray` into two parts:

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

Added in v3.0.0

## splitAt

Splits a `ReadonlyArray` into two pieces, the first piece has `n` elements.

**Signature**

```ts
export declare const splitAt: (n: number) => <A>(as: readonly A[]) => readonly [readonly A[], readonly A[]]
```

**Example**

```ts
import { splitAt } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [
  [1, 2],
  [3, 4, 5],
])
```

Added in v3.0.0

## tail

Get all but the first element of a `ReadonlyArray`, creating a new `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

**Signature**

```ts
export declare const tail: <A>(as: readonly A[]) => O.Option<readonly A[]>
```

**Example**

```ts
import { tail } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(tail([]), none)
```

Added in v3.0.0

## takeRight

Keep only a number of elements from the end of a `ReadonlyArray`, creating a new `ReadonlyArray`..
`n` must be a natural number

**Signature**

```ts
export declare const takeRight: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { takeRight } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(fa: readonly A[]) => readonly (readonly [A])[]
```

Added in v3.0.0

## unzip

This function is the inverse of `zip`. Takes a `ReadonlyArray` of pairs and return two corresponding `ReadonlyArray`s.

**Signature**

```ts
export declare const unzip: <A, B>(as: readonly (readonly [A, B])[]) => readonly [readonly A[], readonly B[]]
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

Added in v3.0.0

## updateAt

Change the element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out of bounds.

**Signature**

```ts
export declare const updateAt: <A>(i: number, a: A) => (as: readonly A[]) => O.Option<readonly A[]>
```

**Example**

```ts
import { updateAt } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
assert.deepStrictEqual(updateAt(1, 1)([]), none)
```

Added in v3.0.0
