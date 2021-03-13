---
title: ReadonlyNonEmptyArray.ts
nav_order: 71
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

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Apply](#apply)
  - [ap](#ap)
- [Chain](#chain)
  - [chain](#chain)
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
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [chainWithIndex](#chainwithindex)
  - [chop](#chop)
  - [chunksOf](#chunksof)
  - [comprehension](#comprehension)
  - [duplicate](#duplicate)
  - [flap](#flap)
  - [flatten](#flatten)
  - [group](#group)
  - [groupBy](#groupby)
  - [intersperse](#intersperse)
  - [modifyHead](#modifyhead)
  - [modifyLast](#modifylast)
  - [prependAll](#prependall)
  - [reverse](#reverse)
  - [rotate](#rotate)
  - [sort](#sort)
  - [sortBy](#sortby)
  - [splitAt](#splitat)
  - [union](#union)
  - [uniq](#uniq)
  - [updateHead](#updatehead)
  - [updateLast](#updatelast)
  - [zip](#zip)
  - [zipWith](#zipwith)
- [constructors](#constructors)
  - [fromReadonlyArray](#fromreadonlyarray)
  - [makeBy](#makeby)
  - [range](#range)
  - [replicate](#replicate)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
- [destructors](#destructors)
  - [matchLeft](#matchleft)
  - [matchRight](#matchright)
  - [unappend](#unappend)
  - [unprepend](#unprepend)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Chain](#chain-1)
  - [Comonad](#comonad)
  - [Foldable](#foldable-1)
  - [FoldableWithIndex](#foldablewithindex-1)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [Traversable](#traversable)
  - [TraversableWithIndex](#traversablewithindex)
  - [URI (type alias)](#uri-type-alias)
  - [getEq](#geteq)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
- [model](#model)
  - [ReadonlyNonEmptyArray (type alias)](#readonlynonemptyarray-type-alias)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [concatAll](#concatall)
  - [extract](#extract)
  - [head](#head)
  - [init](#init)
  - [last](#last)
  - [max](#max)
  - [min](#min)
  - [modifyAt](#modifyat)
  - [sequence](#sequence)
  - [tail](#tail)
  - [traverse](#traverse)
  - [traverseWithIndex](#traversewithindex)
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
export declare const alt: <A>(
  second: Lazy<ReadonlyNonEmptyArray<A>>
) => (first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v3.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <B>(
  second: Lazy<ReadonlyNonEmptyArray<B>>
) => <A>(first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B | A>
```

Added in v3.0.0

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(
  fa: ReadonlyNonEmptyArray<A>
) => <B>(fab: ReadonlyNonEmptyArray<(a: A) => B>) => ReadonlyNonEmptyArray<B>
```

Added in v3.0.0

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(
  f: (a: A) => ReadonlyNonEmptyArray<B>
) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v3.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <A, B>(
  f: (wa: ReadonlyNonEmptyArray<A>) => B
) => (wa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v3.0.0

# Foldable

## foldMap

**Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.

**Signature**

```ts
export declare const foldMap: <S>(S: Se.Semigroup<S>) => <A>(f: (a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v3.0.0

# FoldableWithIndex

## foldMapWithIndex

**Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.

**Signature**

```ts
export declare const foldMapWithIndex: <S>(
  S: Se.Semigroup<S>
) => <A>(f: (i: number, a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S
```

Added in v3.0.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <B, A>(
  b: B,
  f: (i: number, a: A, b: B) => B
) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v3.0.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <B, A>(
  b: B,
  f: (i: number, b: B, a: A) => B
) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v3.0.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <A, B>(
  f: (i: number, a: A) => B
) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => ReadonlyNonEmptyArray<A>
```

Added in v3.0.0

# combinators

## chainWithIndex

**Signature**

```ts
export declare const chainWithIndex: <A, B>(
  f: (i: number, a: A) => ReadonlyNonEmptyArray<B>
) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v3.0.0

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

Added in v3.0.0

## chunksOf

Splits a `ReadonlyNonEmptyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const chunksOf: (
  n: number
) => <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
```

Added in v3.0.0

## comprehension

`ReadonlyNonEmptyArray` comprehension.

```
[ f(x, y, ...) | x ← xs, y ← ys, ... ]
```

**Signature**

```ts
export declare function comprehension<A, B, C, D, R>(
  input: readonly [
    ReadonlyNonEmptyArray<A>,
    ReadonlyNonEmptyArray<B>,
    ReadonlyNonEmptyArray<C>,
    ReadonlyNonEmptyArray<D>
  ],
  f: (a: A, b: B, c: C, d: D) => R
): ReadonlyNonEmptyArray<R>
export declare function comprehension<A, B, C, R>(
  input: readonly [ReadonlyNonEmptyArray<A>, ReadonlyNonEmptyArray<B>, ReadonlyNonEmptyArray<C>],
  f: (a: A, b: B, c: C) => R
): ReadonlyNonEmptyArray<R>
export declare function comprehension<A, B, C, R>(
  input: readonly [ReadonlyNonEmptyArray<A>, ReadonlyNonEmptyArray<B>],
  f: (a: A, b: B) => R
): ReadonlyNonEmptyArray<R>
export declare function comprehension<A, R>(
  input: readonly [ReadonlyNonEmptyArray<A>],
  f: (a: A) => R
): ReadonlyNonEmptyArray<R>
```

**Example**

```ts
import { comprehension } from 'fp-ts/ReadonlyNonEmptyArray'
import { tuple } from 'fp-ts/function'

assert.deepStrictEqual(
  comprehension(
    [
      [1, 2, 3],
      ['a', 'b'],
    ],
    tuple
  ),
  [
    [1, 'a'],
    [1, 'b'],
    [2, 'a'],
    [2, 'b'],
    [3, 'a'],
    [3, 'b'],
  ]
)
```

Added in v3.0.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: ReadonlyNonEmptyArray<(a: A) => B>) => ReadonlyNonEmptyArray<B>
```

Added in v3.0.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) => ReadonlyNonEmptyArray<A>
```

Added in v3.0.0

## group

Group equal, consecutive elements of an array into non empty arrays.

**Signature**

```ts
export declare const group: <B>(
  E: Eq<B>
) => <A extends B>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
```

**Example**

```ts
import { group } from 'fp-ts/ReadonlyNonEmptyArray'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(group(N.Eq)([1, 2, 1, 1]), [[1], [2], [1, 1]])
```

Added in v3.0.0

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

assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
  '3': ['foo', 'bar'],
  '6': ['foobar'],
})
```

Added in v3.0.0

## intersperse

Places an element in between members of an array

**Signature**

```ts
export declare const intersperse: <A>(middle: A) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3, 4], intersperse(9)), [1, 9, 2, 9, 3, 9, 4])
```

Added in v3.0.0

## modifyHead

Apply a function to the head, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const modifyHead: <A>(f: Endomorphism<A>) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v3.0.0

## modifyLast

Apply a function to the last element, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const modifyLast: <A>(f: Endomorphism<A>) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v3.0.0

## prependAll

Prepend an element to every member of an array

**Signature**

```ts
export declare const prependAll: <A>(middle: A) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { prependAll } from 'fp-ts/ReadonlyNonEmptyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3, 4], prependAll(9)), [9, 1, 9, 2, 9, 3, 9, 4])
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v3.0.0

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

Added in v3.0.0

## sort

Sort the elements of a `ReadonlyNonEmptyArray` in increasing order, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const sort: <B>(O: Ord<B>) => <A extends B>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v3.0.0

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

Added in v3.0.0

## splitAt

Splits a `ReadonlyNonEmptyArray` into two pieces, the first piece has `n` elements.
If `n` is out of bounds or `n = 0`, the input is returned.

**Signature**

```ts
export declare const splitAt: (
  n: number
) => <A>(as: ReadonlyNonEmptyArray<A>) => readonly [ReadonlyNonEmptyArray<A>, readonly A[]]
```

Added in v3.0.0

## union

Creates a `ReadonlyArray` of unique values, in order, from all given `ReadonlyArray`s using a `Eq` for equality comparisons.

**Signature**

```ts
export declare const union: <A>(
  E: Eq<A>
) => (second: ReadonlyNonEmptyArray<A>) => (first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
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

Added in v3.0.0

## updateHead

Change the head, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const updateHead: <A>(a: A) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v3.0.0

## updateLast

Change the last element, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const updateLast: <A>(a: A) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v3.0.0

## zip

**Signature**

```ts
export declare const zip: <B>(
  bs: ReadonlyNonEmptyArray<B>
) => <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<readonly [A, B]>
```

Added in v3.0.0

## zipWith

**Signature**

```ts
export declare const zipWith: <B, A, C>(
  bs: ReadonlyNonEmptyArray<B>,
  f: (a: A, b: B) => C
) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<C>
```

Added in v3.0.0

# constructors

## fromReadonlyArray

Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array.

**Signature**

```ts
export declare const fromReadonlyArray: <A>(as: readonly A[]) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v3.0.0

## makeBy

Return a `ReadonlyNonEmptyArray` of length `n` with element `i` initialized with `f(i)`.

**Note**. `n` is normalized to a natural number.

**Signature**

```ts
export declare const makeBy: <A>(n: number, f: (i: number) => A) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { makeBy } from 'fp-ts/ReadonlyNonEmptyArray'

const double = (n: number): number => n * 2
assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
```

Added in v3.0.0

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

Added in v3.0.0

## replicate

Create a `ReadonlyNonEmptyArray` containing a value repeated the specified number of times.

**Note**. `n` is normalized to a natural number.

**Signature**

```ts
export declare const replicate: <A>(n: number, a: A) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { replicate } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(
  second: ReadonlyNonEmptyArray<B>
) => <A>(first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(
  second: ReadonlyNonEmptyArray<B>
) => <A>(first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v3.0.0

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

Added in v3.0.0

# destructors

## matchLeft

**Signature**

```ts
export declare const matchLeft: <A, B>(f: (head: A, tail: readonly A[]) => B) => (as: ReadonlyNonEmptyArray<A>) => B
```

Added in v3.0.0

## matchRight

**Signature**

```ts
export declare const matchRight: <A, B>(f: (init: readonly A[], last: A) => B) => (as: ReadonlyNonEmptyArray<A>) => B
```

Added in v3.0.0

## unappend

Produces a couple of a copy of the array without its last element, and that last element.

**Signature**

```ts
export declare const unappend: <A>(as: ReadonlyNonEmptyArray<A>) => readonly [readonly A[], A]
```

**Example**

```ts
import { unappend } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
```

Added in v3.0.0

## unprepend

Produces a couple of the first element of the array, and a new array of the remaining elements, if any.

**Signature**

```ts
export declare const unprepend: <A>(as: ReadonlyNonEmptyArray<A>) => readonly [A, readonly A[]]
```

**Example**

```ts
import { unprepend } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## FoldableWithIndex

**Signature**

```ts
export declare const FoldableWithIndex: FoldableWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## TraversableWithIndex

**Signature**

```ts
export declare const TraversableWithIndex: TraversableWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'ReadonlyNonEmptyArray'
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<ReadonlyNonEmptyArray<A>>
```

Added in v3.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <A = never>() => Se.Semigroup<ReadonlyNonEmptyArray<A>>
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<ReadonlyNonEmptyArray<A>>
```

Added in v3.0.0

# model

## ReadonlyNonEmptyArray (type alias)

**Signature**

```ts
export type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
  readonly 0: A
}
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReadonlyNonEmptyArray<readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: ReadonlyNonEmptyArray<{}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: ReadonlyNonEmptyArray<B>
) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <B>(
  fb: ReadonlyNonEmptyArray<B>
) => <A>(fas: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReadonlyNonEmptyArray<B>
) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<{ [K in N]: A }>
```

Added in v3.0.0

## concatAll

**Signature**

```ts
export declare const concatAll: <A>(S: Se.Semigroup<A>) => (fa: ReadonlyNonEmptyArray<A>) => A
```

Added in v3.0.0

## extract

**Signature**

```ts
export declare const extract: <A>(wa: ReadonlyNonEmptyArray<A>) => A
```

Added in v3.0.0

## head

**Signature**

```ts
export declare const head: <A>(as: ReadonlyNonEmptyArray<A>) => A
```

Added in v3.0.0

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

Added in v3.0.0

## last

**Signature**

```ts
export declare const last: <A>(as: ReadonlyNonEmptyArray<A>) => A
```

Added in v3.0.0

## max

**Signature**

```ts
export declare const max: <A>(O: Ord<A>) => (as: ReadonlyNonEmptyArray<A>) => A
```

Added in v3.0.0

## min

**Signature**

```ts
export declare const min: <A>(O: Ord<A>) => (as: ReadonlyNonEmptyArray<A>) => A
```

Added in v3.0.0

## modifyAt

Apply a function to the element at the specified index, creating a new `ReadonlyNonEmptyArray`, or returning `None` if the index is out
of bounds.

**Signature**

```ts
export declare const modifyAt: <A>(
  i: number,
  f: (a: A) => A
) => (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v3.0.0

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## tail

**Signature**

```ts
export declare const tail: <A>(as: ReadonlyNonEmptyArray<A>) => readonly A[]
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: Traverse1<'ReadonlyNonEmptyArray'>
```

Added in v3.0.0

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: TraverseWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<readonly [A]>
```

Added in v3.0.0

## unzip

**Signature**

```ts
export declare const unzip: <A, B>(
  abs: ReadonlyNonEmptyArray<readonly [A, B]>
) => readonly [ReadonlyNonEmptyArray<A>, ReadonlyNonEmptyArray<B>]
```

Added in v3.0.0

## updateAt

Change the element at the specified index, creating a new `ReadonlyNonEmptyArray`, or returning `None` if the index is out of bounds.

**Signature**

```ts
export declare const updateAt: <A>(
  i: number,
  a: A
) => (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v3.0.0
