---
title: ReadonlyNonEmptyArray.ts
nav_order: 86
parent: Modules
---

## ReadonlyNonEmptyArray overview

Data structure which represents non-empty readonly arrays.

```ts
export type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
  readonly 0: A
}
```

Note that you don't need any conversion, a `ReadonlyNonEmptyArray` is a `ReadonlyArray`,
so all `ReadonlyArray`'s APIs can be used with a `ReadonlyNonEmptyArray` without further ado.

Added in v2.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Apply](#apply)
  - [ap](#ap)
- [Comonad](#comonad)
  - [extract](#extract)
- [Extend](#extend)
  - [extend](#extend)
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
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [chainWithIndex](#chainwithindex)
  - [chop](#chop)
  - [chunksOf](#chunksof)
  - [concat](#concat)
  - [concatW](#concatw)
  - [duplicate](#duplicate)
  - [flap](#flap)
  - [flatten](#flatten)
  - [getUnionSemigroup](#getunionsemigroup)
  - [group](#group)
  - [groupBy](#groupby)
  - [intersperse](#intersperse)
  - [modifyAt](#modifyat)
  - [prependAll](#prependall)
  - [reverse](#reverse)
  - [rotate](#rotate)
  - [sort](#sort)
  - [sortBy](#sortby)
  - [splitAt](#splitat)
  - [union](#union)
  - [uniq](#uniq)
  - [unzip](#unzip)
  - [updateAt](#updateat)
  - [updateHead](#updatehead)
  - [updateLast](#updatelast)
  - [zip](#zip)
  - [zipWith](#zipwith)
  - [~~filterWithIndex~~](#filterwithindex)
  - [~~filter~~](#filter)
  - [~~groupSort~~](#groupsort)
  - [~~insertAt~~](#insertat)
  - [~~prependToAll~~](#prependtoall)
- [constructors](#constructors)
  - [fromReadonlyArray](#fromreadonlyarray)
  - [makeBy](#makeby)
  - [range](#range)
  - [replicate](#replicate)
  - [~~cons~~](#cons)
  - [~~snoc~~](#snoc)
- [destructors](#destructors)
  - [matchLeft](#matchleft)
  - [matchRight](#matchright)
  - [unappend](#unappend)
  - [unprepend](#unprepend)
  - [~~uncons~~](#uncons)
  - [~~unsnoc~~](#unsnoc)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Chain](#chain)
  - [Comonad](#comonad-1)
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
  - [getEq](#geteq)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [~~readonlyNonEmptyArray~~](#readonlynonemptyarray)
- [interop](#interop)
  - [fromArray](#fromarray)
- [model](#model)
  - [ReadonlyNonEmptyArray (type alias)](#readonlynonemptyarray-type-alias)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [concatAll](#concatall)
  - [head](#head)
  - [init](#init)
  - [intercalate](#intercalate)
  - [last](#last)
  - [let](#let)
  - [max](#max)
  - [min](#min)
  - [modifyHead](#modifyhead)
  - [modifyLast](#modifylast)
  - [tail](#tail)
  - [~~fold~~](#fold)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `ReadonlyNonEmptyArray` concatenates the inputs into a single array.

**Signature**

```ts
export declare const alt: <A>(
  that: Lazy<ReadonlyNonEmptyArray<A>>
) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RNEA.alt(() => [4, 5])
  ),
  [1, 2, 3, 4, 5]
)
```

Added in v2.6.2

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the return types will be merged.

**Signature**

```ts
export declare const altW: <B>(
  that: Lazy<ReadonlyNonEmptyArray<B>>
) => <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B | A>
```

**Example**

```ts
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3] as RNEA.ReadonlyNonEmptyArray<number>,
    RNEA.altW(() => ['a', 'b'])
  ),
  [1, 2, 3, 'a', 'b']
)
```

Added in v2.9.0

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(
  as: ReadonlyNonEmptyArray<A>
) => <B>(fab: ReadonlyNonEmptyArray<(a: A) => B>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# Comonad

## extract

**Signature**

```ts
export declare const extract: <A>(wa: ReadonlyNonEmptyArray<A>) => A
```

Added in v2.6.3

# Extend

## extend

**Signature**

```ts
export declare const extend: <A, B>(
  f: (as: ReadonlyNonEmptyArray<A>) => B
) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# Foldable

## foldMap

**Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.

**Signature**

```ts
export declare const foldMap: <S>(S: Se.Semigroup<S>) => <A>(f: (a: A) => S) => (as: ReadonlyNonEmptyArray<A>) => S
```

Added in v2.5.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (as: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (as: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0

# FoldableWithIndex

## foldMapWithIndex

**Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.

**Signature**

```ts
export declare const foldMapWithIndex: <S>(
  S: Se.Semigroup<S>
) => <A>(f: (i: number, a: A) => S) => (as: ReadonlyNonEmptyArray<A>) => S
```

Added in v2.5.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <A, B>(
  b: B,
  f: (i: number, a: A, b: B) => B
) => (as: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <A, B>(
  b: B,
  f: (i: number, b: B, a: A) => B
) => (as: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <A, B>(
  f: (i: number, a: A) => B
) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(
  f: (a: A) => ReadonlyNonEmptyArray<B>
) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

**Example**

```ts
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RNEA.chain((n) => [`a${n}`, `b${n}`])
  ),
  ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
)
```

Added in v2.5.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

# Traversable

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'ReadonlyNonEmptyArray'>
```

Added in v2.6.3

## traverse

**Signature**

```ts
export declare const traverse: PipeableTraverse1<'ReadonlyNonEmptyArray'>
```

Added in v2.6.3

# TraversableWithIndex

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: PipeableTraverseWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v2.6.3

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(
  second: ReadonlyNonEmptyArray<B>
) => <A>(first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(
  second: ReadonlyNonEmptyArray<B>
) => <A>(first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(
  f: (a: A) => ReadonlyNonEmptyArray<B>
) => (first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.chainFirst(() => ['a', 'b'])
  ),
  [1, 1, 2, 2, 3, 3]
)
```

Added in v2.5.0

## chainWithIndex

**Signature**

```ts
export declare const chainWithIndex: <A, B>(
  f: (i: number, a: A) => ReadonlyNonEmptyArray<B>
) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.10.0

## chop

A useful recursion pattern for processing a `ReadonlyNonEmptyArray` to produce a new `ReadonlyNonEmptyArray`, often used for "chopping" up the input
`ReadonlyNonEmptyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyNonEmptyArray` and produce a
value and the tail of the `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const chop: <A, B>(
  f: (as: ReadonlyNonEmptyArray<A>) => readonly [B, readonly A[]]
) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.10.0

## chunksOf

Splits a `ReadonlyNonEmptyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const chunksOf: (
  n: number
) => <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
```

Added in v2.10.0

## concat

**Signature**

```ts
export declare function concat<A>(
  second: ReadonlyNonEmptyArray<A>
): (first: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>
export declare function concat<A>(
  second: ReadonlyArray<A>
): (first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
export declare function concat<A>(first: ReadonlyArray<A>, second: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A>
export declare function concat<A>(first: ReadonlyNonEmptyArray<A>, second: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## concatW

**Signature**

```ts
export declare function concatW<B>(
  second: ReadonlyNonEmptyArray<B>
): <A>(first: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A | B>
export declare function concatW<B>(
  second: ReadonlyArray<B>
): <A>(first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A | B>
```

Added in v2.11.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: ReadonlyNonEmptyArray<(a: A) => B>) => ReadonlyNonEmptyArray<B>
```

Added in v2.10.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(E: Eq<A>) => Se.Semigroup<ReadonlyNonEmptyArray<A>>
```

Added in v2.11.0

## group

Group equal, consecutive elements of a `ReadonlyArray` into `ReadonlyNonEmptyArray`s.

**Signature**

```ts
export declare function group<B>(E: Eq<B>): {
  <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
  <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>
}
```

**Example**

```ts
import { group } from 'fp-ts/ReadonlyNonEmptyArray'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(group(N.Eq)([1, 2, 1, 1]), [[1], [2], [1, 1]])
```

Added in v2.5.0

## groupBy

Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

**Signature**

```ts
export declare const groupBy: <A>(
  f: (a: A) => string
) => (as: readonly A[]) => Readonly<Record<string, ReadonlyNonEmptyArray<A>>>
```

**Example**

```ts
import { groupBy } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
  '1': ['a', 'b'],
  '2': ['ab'],
})
```

Added in v2.5.0

## intersperse

Places an element in between members of a `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const intersperse: <A>(middle: A) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { intersperse } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
```

Added in v2.9.0

## modifyAt

**Signature**

```ts
export declare const modifyAt: <A>(
  i: number,
  f: (a: A) => A
) => (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## prependAll

Prepend an element to every member of a `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const prependAll: <A>(middle: A) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { prependAll } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
```

Added in v2.10.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## rotate

Rotate a `ReadonlyNonEmptyArray` by `n` steps.

**Signature**

```ts
export declare const rotate: (n: number) => <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { rotate } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
```

Added in v2.11.0

## sort

**Signature**

```ts
export declare const sort: <B>(O: Ord<B>) => <A extends B>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## sortBy

Sort the elements of a `ReadonlyNonEmptyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
etc...

**Signature**

```ts
export declare const sortBy: <B>(
  ords: readonly Ord<B>[]
) => <A extends B>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
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

const sortByNameByAge = RNEA.sortBy([byName, byAge])

const persons: RNEA.ReadonlyNonEmptyArray<Person> = [
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

Added in v2.11.0

## splitAt

Splits a `ReadonlyNonEmptyArray` into two pieces, the first piece has max `n` elements.

**Signature**

```ts
export declare const splitAt: (
  n: number
) => <A>(as: ReadonlyNonEmptyArray<A>) => readonly [ReadonlyNonEmptyArray<A>, readonly A[]]
```

Added in v2.10.0

## union

**Signature**

```ts
export declare const union: <A>(
  E: Eq<A>
) => (second: ReadonlyNonEmptyArray<A>) => (first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.11.0

## uniq

Remove duplicates from a `ReadonlyNonEmptyArray`, keeping the first occurrence of an element.

**Signature**

```ts
export declare const uniq: <A>(E: Eq<A>) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { uniq } from 'fp-ts/ReadonlyNonEmptyArray'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
```

Added in v2.11.0

## unzip

**Signature**

```ts
export declare const unzip: <A, B>(
  abs: ReadonlyNonEmptyArray<readonly [A, B]>
) => readonly [ReadonlyNonEmptyArray<A>, ReadonlyNonEmptyArray<B>]
```

Added in v2.5.1

## updateAt

**Signature**

```ts
export declare const updateAt: <A>(
  i: number,
  a: A
) => (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## updateHead

Change the head, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const updateHead: <A>(a: A) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.11.0

## updateLast

Change the last element, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const updateLast: <A>(a: A) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.11.0

## zip

**Signature**

```ts
export declare function zip<B>(
  bs: ReadonlyNonEmptyArray<B>
): <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<readonly [A, B]>
export declare function zip<A, B>(
  as: ReadonlyNonEmptyArray<A>,
  bs: ReadonlyNonEmptyArray<B>
): ReadonlyNonEmptyArray<readonly [A, B]>
```

Added in v2.5.1

## zipWith

**Signature**

```ts
export declare const zipWith: <A, B, C>(
  as: ReadonlyNonEmptyArray<A>,
  bs: ReadonlyNonEmptyArray<B>,
  f: (a: A, b: B) => C
) => ReadonlyNonEmptyArray<C>
```

Added in v2.5.1

## ~~filterWithIndex~~

Use [`filterWithIndex`](./ReadonlyArray.ts.html#filterwithindex) instead.

**Signature**

```ts
export declare const filterWithIndex: <A>(
  predicate: (i: number, a: A) => boolean
) => (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## ~~filter~~

Use [`filter`](./ReadonlyArray.ts.html#filter) instead.

**Signature**

```ts
export declare function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<B>>
export declare function filter<A>(
  predicate: Predicate<A>
): <B extends A>(bs: ReadonlyNonEmptyArray<B>) => Option<ReadonlyNonEmptyArray<B>>
export declare function filter<A>(
  predicate: Predicate<A>
): (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## ~~groupSort~~

This is just `sort` followed by `group`.

**Signature**

```ts
export declare function groupSort<B>(O: Ord<B>): {
  <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
  <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>
}
```

Added in v2.5.0

## ~~insertAt~~

Use [`insertAt`](./ReadonlyArray.ts.html#insertat) instead.

**Signature**

```ts
export declare const insertAt: <A>(i: number, a: A) => (as: readonly A[]) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## ~~prependToAll~~

Use [`prependAll`](#prependall) instead.

**Signature**

```ts
export declare const prependToAll: <A>(middle: A) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.9.0

# constructors

## fromReadonlyArray

Return a `ReadonlyNonEmptyArray` from a `ReadonlyArray` returning `none` if the input is empty.

**Signature**

```ts
export declare const fromReadonlyArray: <A>(as: readonly A[]) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## makeBy

Return a `ReadonlyNonEmptyArray` of length `n` with element `i` initialized with `f(i)`.

**Note**. `n` is normalized to a natural number.

**Signature**

```ts
export declare const makeBy: <A>(f: (i: number) => A) => (n: number) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { makeBy } from 'fp-ts/ReadonlyNonEmptyArray'
import { pipe } from 'fp-ts/function'

const double = (n: number): number => n * 2
assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
```

Added in v2.11.0

## range

Create a `ReadonlyNonEmptyArray` containing a range of integers, including both endpoints.

**Signature**

```ts
export declare const range: (start: number, end: number) => ReadonlyNonEmptyArray<number>
```

**Example**

```ts
import { range } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
```

Added in v2.11.0

## replicate

Create a `ReadonlyNonEmptyArray` containing a value repeated the specified number of times.

**Note**. `n` is normalized to a natural number.

**Signature**

```ts
export declare const replicate: <A>(a: A) => (n: number) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { replicate } from 'fp-ts/ReadonlyNonEmptyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
```

Added in v2.11.0

## ~~cons~~

Use [`prepend`](./ReadonlyArray.ts.html#prepend) instead.

**Signature**

```ts
export declare function cons<A>(head: A): (tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>
export declare function cons<A>(head: A, tail: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## ~~snoc~~

Use [`append`](./ReadonlyArray.ts.html#append) instead.

**Signature**

```ts
export declare const snoc: <A>(init: readonly A[], end: A) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

# destructors

## matchLeft

Break a `ReadonlyArray` into its first element and remaining elements.

**Signature**

```ts
export declare const matchLeft: <A, B>(f: (head: A, tail: readonly A[]) => B) => (as: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.11.0

## matchRight

Break a `ReadonlyArray` into its initial elements and the last element.

**Signature**

```ts
export declare const matchRight: <A, B>(f: (init: readonly A[], last: A) => B) => (as: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.11.0

## unappend

Return the tuple of the `init` and the `last`.

**Signature**

```ts
export declare const unappend: <A>(as: ReadonlyNonEmptyArray<A>) => readonly [readonly A[], A]
```

**Example**

```ts
import { unappend } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
```

Added in v2.9.0

## unprepend

Return the tuple of the `head` and the `tail`.

**Signature**

```ts
export declare const unprepend: <A>(as: ReadonlyNonEmptyArray<A>) => readonly [A, readonly A[]]
```

**Example**

```ts
import { unprepend } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
```

Added in v2.9.0

## ~~uncons~~

Use [`unprepend`](#unprepend) instead.

**Signature**

```ts
export declare const uncons: <A>(as: ReadonlyNonEmptyArray<A>) => readonly [A, readonly A[]]
```

Added in v2.10.0

## ~~unsnoc~~

Use [`unappend`](#unappend) instead.

**Signature**

```ts
export declare const unsnoc: <A>(as: ReadonlyNonEmptyArray<A>) => readonly [readonly A[], A]
```

Added in v2.10.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'ReadonlyNonEmptyArray'>
```

Added in v2.10.0

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'ReadonlyNonEmptyArray'>
```

Added in v2.10.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## FoldableWithIndex

**Signature**

```ts
export declare const FoldableWithIndex: FoldableWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'ReadonlyNonEmptyArray'>
```

Added in v2.10.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## TraversableWithIndex

**Signature**

```ts
export declare const TraversableWithIndex: TraversableWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'ReadonlyNonEmptyArray'
```

Added in v2.5.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<ReadonlyNonEmptyArray<A>>
```

**Example**

```ts
import { getEq } from 'fp-ts/ReadonlyNonEmptyArray'
import * as N from 'fp-ts/number'

const E = getEq(N.Eq)
assert.strictEqual(E.equals([1, 2], [1, 2]), true)
assert.strictEqual(E.equals([1, 2], [1, 3]), false)
```

Added in v2.5.0

## getSemigroup

Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`

**Signature**

```ts
export declare const getSemigroup: <A = never>() => Se.Semigroup<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## ~~readonlyNonEmptyArray~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `RNEA.Functor` instead of `RNEA.readonlyNonEmptyArray`
(where `RNEA` is from `import RNEA from 'fp-ts/ReadonlyNonEmptyArray'`)

**Signature**

```ts
export declare const readonlyNonEmptyArray: Monad1<'ReadonlyNonEmptyArray'> &
  Comonad1<'ReadonlyNonEmptyArray'> &
  TraversableWithIndex1<'ReadonlyNonEmptyArray', number> &
  FunctorWithIndex1<'ReadonlyNonEmptyArray', number> &
  FoldableWithIndex1<'ReadonlyNonEmptyArray', number> &
  Alt1<'ReadonlyNonEmptyArray'>
```

Added in v2.5.0

# interop

## fromArray

**Signature**

```ts
export declare const fromArray: <A>(as: A[]) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

# model

## ReadonlyNonEmptyArray (type alias)

**Signature**

```ts
export type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
  readonly 0: A
}
```

Added in v2.5.0

# utils

## Do

**Signature**

```ts
export declare const Do: ReadonlyNonEmptyArray<{}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: ReadonlyNonEmptyArray<B>
) => (
  fa: ReadonlyNonEmptyArray<A>
) => ReadonlyNonEmptyArray<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReadonlyNonEmptyArray<B>
) => (
  ma: ReadonlyNonEmptyArray<A>
) => ReadonlyNonEmptyArray<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(
  name: N
) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<{ readonly [K in N]: A }>
```

Added in v2.8.0

## concatAll

**Signature**

```ts
export declare const concatAll: <A>(S: Se.Semigroup<A>) => (as: ReadonlyNonEmptyArray<A>) => A
```

Added in v2.10.0

## head

**Signature**

```ts
export declare const head: <A>(as: ReadonlyNonEmptyArray<A>) => A
```

Added in v2.5.0

## init

Get all but the last element of a non empty array, creating a new array.

**Signature**

```ts
export declare const init: <A>(as: ReadonlyNonEmptyArray<A>) => readonly A[]
```

**Example**

```ts
import { init } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
assert.deepStrictEqual(init([1]), [])
```

Added in v2.5.0

## intercalate

Places an element in between members of a `ReadonlyNonEmptyArray`, then folds the results using the provided `Semigroup`.

**Signature**

```ts
export declare const intercalate: <A>(S: Se.Semigroup<A>) => (middle: A) => (as: ReadonlyNonEmptyArray<A>) => A
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { intercalate } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(intercalate(S.Semigroup)('-')(['a', 'b', 'c']), 'a-b-c')
```

Added in v2.12.0

## last

**Signature**

```ts
export declare const last: <A>(as: ReadonlyNonEmptyArray<A>) => A
```

Added in v2.5.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (
  fa: ReadonlyNonEmptyArray<A>
) => ReadonlyNonEmptyArray<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## max

**Signature**

```ts
export declare const max: <A>(O: Ord<A>) => (as: ReadonlyNonEmptyArray<A>) => A
```

Added in v2.5.0

## min

**Signature**

```ts
export declare const min: <A>(O: Ord<A>) => (as: ReadonlyNonEmptyArray<A>) => A
```

Added in v2.5.0

## modifyHead

Apply a function to the head, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const modifyHead: <A>(f: Endomorphism<A>) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.11.0

## modifyLast

Apply a function to the last element, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const modifyLast: <A>(f: Endomorphism<A>) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.11.0

## tail

**Signature**

```ts
export declare const tail: <A>(as: ReadonlyNonEmptyArray<A>) => readonly A[]
```

Added in v2.5.0

## ~~fold~~

Use [`concatAll`](#concatall) instead.

**Signature**

```ts
export declare const fold: <A>(S: Se.Semigroup<A>) => (as: ReadonlyNonEmptyArray<A>) => A
```

Added in v2.5.0
