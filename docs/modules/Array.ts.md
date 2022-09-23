---
title: Array.ts
nav_order: 5
parent: Modules
---

## Array overview

The Array module provides tools for working with Typescript's Array<T> type in a functional way.

In functional jargon, this module provides a monadic interface over Typescript's Array<T>.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Apply](#apply)
  - [ap](#ap)
- [ChainRec](#chainrec)
  - [chainRecBreadthFirst](#chainrecbreadthfirst)
  - [chainRecDepthFirst](#chainrecdepthfirst)
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
- [Zero](#zero)
  - [zero](#zero)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [chainWithIndex](#chainwithindex)
  - [chop](#chop)
  - [chunksOf](#chunksof)
  - [comprehension](#comprehension)
  - [concat](#concat)
  - [concatW](#concatw)
  - [copy](#copy)
  - [difference](#difference)
  - [dropLeft](#dropleft)
  - [dropLeftWhile](#dropleftwhile)
  - [dropRight](#dropright)
  - [duplicate](#duplicate)
  - [flap](#flap)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromOptionK](#fromoptionk)
  - [intersection](#intersection)
  - [intersperse](#intersperse)
  - [lefts](#lefts)
  - [prependAll](#prependall)
  - [reverse](#reverse)
  - [rights](#rights)
  - [rotate](#rotate)
  - [scanLeft](#scanleft)
  - [scanRight](#scanright)
  - [sort](#sort)
  - [sortBy](#sortby)
  - [splitAt](#splitat)
  - [takeLeft](#takeleft)
  - [takeLeftWhile](#takeleftwhile)
  - [takeRight](#takeright)
  - [union](#union)
  - [uniq](#uniq)
  - [zip](#zip)
  - [zipWith](#zipwith)
  - [~~prependToAll~~](#prependtoall)
- [constructors](#constructors)
  - [append](#append)
  - [appendW](#appendw)
  - [fromPredicate](#frompredicate)
  - [guard](#guard)
  - [makeBy](#makeby)
  - [prepend](#prepend)
  - [prependW](#prependw)
  - [replicate](#replicate)
  - [~~cons~~](#cons)
  - [~~range~~](#range)
  - [~~snoc~~](#snoc)
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
  - [match](#match)
  - [matchLeft](#matchleft)
  - [matchLeftW](#matchleftw)
  - [matchRight](#matchright)
  - [matchRightW](#matchrightw)
  - [matchW](#matchw)
  - [spanLeft](#spanleft)
  - [tail](#tail)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Alternative](#alternative)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Chain](#chain)
  - [ChainRecBreadthFirst](#chainrecbreadthfirst)
  - [ChainRecDepthFirst](#chainrecdepthfirst)
  - [Compactable](#compactable-1)
  - [Extend](#extend-1)
  - [Filterable](#filterable-1)
  - [FilterableWithIndex](#filterablewithindex-1)
  - [Foldable](#foldable-1)
  - [FoldableWithIndex](#foldablewithindex-1)
  - [FromEither](#fromeither)
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
  - [Zero](#zero-1)
  - [getDifferenceMagma](#getdifferencemagma)
  - [getEq](#geteq)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getMonoid](#getmonoid)
  - [getOrd](#getord)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
  - [~~array~~](#array)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromOption](#fromoption)
- [refinements](#refinements)
  - [isEmpty](#isempty)
  - [isNonEmpty](#isnonempty)
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
  - [deleteAt](#deleteat)
  - [elem](#elem)
  - [every](#every)
  - [exists](#exists)
  - [filterE](#filtere)
  - [findIndex](#findindex)
  - [findLastIndex](#findlastindex)
  - [insertAt](#insertat)
  - [intercalate](#intercalate)
  - [isOutOfBound](#isoutofbound)
  - [let](#let)
  - [lookup](#lookup)
  - [modifyAt](#modifyat)
  - [size](#size)
  - [some](#some)
  - [unzip](#unzip)
  - [updateAt](#updateat)
  - [~~empty~~](#empty)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `Array` concatenates the inputs into a single array.

**Signature**

```ts
export declare const alt: <A>(that: Lazy<A[]>) => (fa: A[]) => A[]
```

**Example**

```ts
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    A.alt(() => [4, 5])
  ),
  [1, 2, 3, 4, 5]
)
```

Added in v2.0.0

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the return types will be merged.

**Signature**

```ts
export declare const altW: <B>(that: Lazy<B[]>) => <A>(fa: A[]) => (B | A)[]
```

**Example**

```ts
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    A.altW(() => ['a', 'b'])
  ),
  [1, 2, 3, 'a', 'b']
)
```

Added in v2.9.0

# Apply

## ap

Apply a function to an argument under a type constructor.

It can be used to extend the concept of [`map`](#map) to a function that
takes more than one parameter as described
read [here](https://dev.to/gcanti/getting-started-with-fp-ts-applicative-1kb3)

**Signature**

```ts
export declare const ap: <A>(fa: A[]) => <B>(fab: ((a: A) => B)[]) => B[]
```

**Example**

```ts
import { ap, map, of } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

// a curried function with 3 input parameteres
const f = (s1: string) => (n: number) => (s2: string) => s1 + n + s2

// let's use `ap` to iterate `f` over an array for each input parameter
assert.deepStrictEqual(pipe(['a', 'b'], map(f), ap([1, 2]), ap(['😀', '😫', '😎'])), [
  'a1😀',
  'a1😫',
  'a1😎',
  'a2😀',
  'a2😫',
  'a2😎',
  'b1😀',
  'b1😫',
  'b1😎',
  'b2😀',
  'b2😫',
  'b2😎',
])

// given Array implements the Applicative interface with the `of` method,
// we can write exactly the same thing in a more symmetric way
// using `of` on `f` and `ap` on each array in input
assert.deepStrictEqual(
  pipe(of(f), ap(['a', 'b']), ap([1, 2]), ap(['😀', '😫', '😎'])),
  pipe(['a', 'b'], map(f), ap([1, 2]), ap(['😀', '😫', '😎']))
)
```

Added in v2.0.0

# ChainRec

## chainRecBreadthFirst

**Signature**

```ts
export declare const chainRecBreadthFirst: <A, B>(f: (a: A) => Either<A, B>[]) => (a: A) => B[]
```

Added in v2.11.0

## chainRecDepthFirst

**Signature**

```ts
export declare const chainRecDepthFirst: <A, B>(f: (a: A) => Either<A, B>[]) => (a: A) => B[]
```

Added in v2.11.0

# Compactable

## compact

Compact an array of `Option`s discarding the `None` values and
keeping the `Some` values. It returns a new array containing the values of
the `Some` options.

**Signature**

```ts
export declare const compact: <A>(fa: Option<A>[]) => A[]
```

**Example**

```ts
import { compact } from 'fp-ts/Array'
import { option } from 'fp-ts'

assert.deepStrictEqual(compact([option.some('a'), option.none, option.some('b')]), ['a', 'b'])
```

Added in v2.0.0

## separate

Separate an array of `Either`s into `Left`s and `Right`s, creating two new arrays:
one containing all the left values and one containing all the right values.

**Signature**

```ts
export declare const separate: <A, B>(fa: Either<A, B>[]) => Separated<A[], B[]>
```

**Example**

```ts
import { separate } from 'fp-ts/Array'
import { either } from 'fp-ts'

assert.deepStrictEqual(separate([either.right('r1'), either.left('l1'), either.right('r2')]), {
  left: ['l1'],
  right: ['r1', 'r2'],
})
```

Added in v2.0.0

# Extend

## extend

Given an iterating function that takes `Array<A>` as input, `extend` returns
an array containing the results of the iterating function applied to the whole input
`Array`, then to the input `Array` without the first element, then to the input
`Array` without the first two elements, etc.

**Signature**

```ts
export declare const extend: <A, B>(f: (as: A[]) => B) => (as: A[]) => B[]
```

**Example**

```ts
import { extend } from 'fp-ts/Array'

const f = (a: string[]) => a.join(',')
assert.deepStrictEqual(extend(f)(['a', 'b', 'c']), ['a,b,c', 'b,c', 'c'])
```

Added in v2.0.0

# Filterable

## filter

Given an iterating function that is a `Predicate` or a `Refinement`,
`filter` creates a new `Array` containing the elements of the original
`Array` for which the iterating function is `true`.

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (as: A[]) => B[]
  <A>(predicate: Predicate<A>): <B extends A>(bs: B[]) => B[]
  <A>(predicate: Predicate<A>): (as: A[]) => A[]
}
```

**Example**

```ts
import { filter } from 'fp-ts/Array'
import { isString } from 'fp-ts/lib/string'

assert.deepStrictEqual(filter(isString)(['a', 1, {}, 'b', 5]), ['a', 'b'])
assert.deepStrictEqual(filter((x: number) => x > 0)([-3, 1, -2, 5]), [1, 5])
```

Added in v2.0.0

## filterMap

Maps an array with an iterating function that returns an `Option`
and it keeps only the `Some` values discarding the `None`s.

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: A[]) => B[]
```

**Example**

```ts
import { filterMap } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { option } from 'fp-ts'

const f = (s: string) => (s.length === 1 ? option.some(s.toUpperCase()) : option.none)
assert.deepStrictEqual(pipe(['a', 'no', 'neither', 'b'], filterMap(f)), ['A', 'B'])
```

Added in v2.0.0

## partition

Given an iterating function that is a `Predicate` or a `Refinement`,
`partition` creates two new `Array`s: `right` containing the elements of the original
`Array` for which the iterating function is `true`, `left` containing the elements
for which it is false.

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (as: A[]) => Separated<A[], B[]>
  <A>(predicate: Predicate<A>): <B extends A>(bs: B[]) => Separated<B[], B[]>
  <A>(predicate: Predicate<A>): (as: A[]) => Separated<A[], A[]>
}
```

**Example**

```ts
import { partition } from 'fp-ts/Array'
import { isString } from 'fp-ts/lib/string'

assert.deepStrictEqual(partition(isString)(['a', 1, {}, 'b', 5]), { left: [1, {}, 5], right: ['a', 'b'] })
assert.deepStrictEqual(partition((x: number) => x > 0)([-3, 1, -2, 5]), { left: [-3, -2], right: [1, 5] })
```

Added in v2.0.0

## partitionMap

Given an iterating function that returns an `Either`,
`partitionMap` applies the iterating function to each element and it creates two `Array`s:
`right` containing the values of `Right` results, `left` containing the values of `Left` results.

**Signature**

```ts
export declare const partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: A[]) => Separated<B[], C[]>
```

**Example**

```ts
import { partitionMap } from 'fp-ts/Array'
import { Either, left, right } from 'fp-ts/lib/Either'

const upperIfString = <B>(x: B): Either<B, string> => (typeof x === 'string' ? right(x.toUpperCase()) : left(x))
assert.deepStrictEqual(partitionMap(upperIfString)([-2, 'hello', 6, 7, 'world']), {
  left: [-2, 6, 7],
  right: ['HELLO', 'WORLD'],
})
```

Added in v2.0.0

# FilterableWithIndex

## filterMapWithIndex

Maps an array with an iterating function that takes the index and the value of
each element and returns an `Option`. It keeps only the `Some` values discarding
the `None`s.

Same as [`filterMap`](#filterMap), but with an iterating function which takes also
the index as input.

**Signature**

```ts
export declare const filterMapWithIndex: <A, B>(f: (i: number, a: A) => Option<B>) => (fa: A[]) => B[]
```

**Example**

```ts
import { filterMapWithIndex } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { option } from 'fp-ts'

const f = (i: number, s: string) => (i % 2 === 1 ? option.some(s.toUpperCase()) : option.none)
assert.deepStrictEqual(pipe(['a', 'no', 'neither', 'b'], filterMapWithIndex(f)), ['NO', 'B'])
```

Added in v2.0.0

## filterWithIndex

Same as [`filter`](#filter), but passing also the index to the iterating function.

**Signature**

```ts
export declare const filterWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (as: A[]) => B[]
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(bs: B[]) => B[]
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (as: A[]) => A[]
}
```

**Example**

```ts
import { filterWithIndex } from 'fp-ts/Array'

const f = (index: number, x: number) => x > 0 && index <= 2
assert.deepStrictEqual(filterWithIndex(f)([-3, 1, -2, 5]), [1])
```

Added in v2.0.0

## partitionMapWithIndex

Same as [`partitionMap`](#partitionMap), but passing also the index to the iterating function.

**Signature**

```ts
export declare const partitionMapWithIndex: <A, B, C>(
  f: (i: number, a: A) => Either<B, C>
) => (fa: A[]) => Separated<B[], C[]>
```

**Example**

```ts
import { partitionMapWithIndex } from 'fp-ts/Array'
import { Either, left, right } from 'fp-ts/lib/Either'

const upperIfStringBefore3 = <B>(index: number, x: B): Either<B, string> =>
  index < 3 && typeof x === 'string' ? right(x.toUpperCase()) : left(x)
assert.deepStrictEqual(partitionMapWithIndex(upperIfStringBefore3)([-2, 'hello', 6, 7, 'world']), {
  left: [-2, 6, 7, 'world'],
  right: ['HELLO'],
})
```

Added in v2.0.0

## partitionWithIndex

Same as [`partition`](#partition), but passing also the index to the iterating function.

**Signature**

```ts
export declare const partitionWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (as: A[]) => Separated<A[], B[]>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(bs: B[]) => Separated<B[], B[]>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (as: A[]) => Separated<A[], A[]>
}
```

**Example**

```ts
import { partitionWithIndex } from 'fp-ts/Array'

assert.deepStrictEqual(partitionWithIndex((index, x: number) => index < 3 && x > 0)([-2, 5, 6, 7]), {
  left: [-2, 7],
  right: [5, 6],
})
```

Added in v2.0.0

# Foldable

## foldMap

Map and fold an `Array`.
Map the `Array` passing each value to the iterating function.
Then fold the results using the provided `Monoid`.

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A[]) => M
```

**Example**

```ts
import { foldMap } from 'fp-ts/Array'

const monoid = { concat: (a: string, b: string) => a + b, empty: '' }
const f = (s: string) => s.toUpperCase()
assert.deepStrictEqual(foldMap(monoid)(f)(['a', 'b', 'c']), 'ABC')
```

Added in v2.0.0

## reduce

Reduces an `Array`.

`reduce` executes the supplied iterating function on each element of the array,
in order, passing in the element and the return value from the calculation on the preceding element.

The first time that the iterating function is called there is no "return value of the
previous calculation", the initial value is used in its place.

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: A[]) => B
```

**Example**

```ts
import { reduce } from 'fp-ts/Array'

assert.deepStrictEqual(reduce(5, (acc: number, cur: number) => acc * cur)([2, 3]), 5 * 2 * 3)
```

Added in v2.0.0

## reduceRight

Same as [`reduce`](#reduce) but applied from the end to the start.

_Note_: the iterating function in this case takes the accumulator as the last argument.

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: A[]) => B
```

**Example**

```ts
import { reduceRight } from 'fp-ts/Array'

assert.deepStrictEqual(reduceRight('', (cur: string, acc: string) => acc + cur)(['a', 'b', 'c']), 'cba')
```

Added in v2.0.0

# FoldableWithIndex

## foldMapWithIndex

Same as [`foldMap`](#foldMap) but passing also the index to the iterating function.

**Signature**

```ts
export declare const foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: number, a: A) => M) => (fa: A[]) => M
```

**Example**

```ts
import { foldMapWithIndex } from 'fp-ts/Array'

const monoid = { concat: (a: string, b: string) => a + b, empty: '' }
const f = (index: number, s: string) => `${s.toUpperCase()}(${index})`
assert.deepStrictEqual(foldMapWithIndex(monoid)(f)(['a', 'b', 'c']), 'A(0)B(1)C(2)')
```

Added in v2.0.0

## reduceRightWithIndex

Same as [`reduceRight`](#reduceRight) but passing also the index to the iterating function.

**Signature**

```ts
export declare const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: A[]) => B
```

**Example**

```ts
import { reduceRightWithIndex } from 'fp-ts/Array'

const f = (index: number, cur: unknown, acc: string) => acc + (typeof cur === 'string' ? cur.toUpperCase() + index : '')
assert.deepStrictEqual(reduceRightWithIndex('', f)([2, 'a', 'b', null]), 'B2A1')
```

Added in v2.0.0

## reduceWithIndex

Same as [`reduce`](#reduce) but passing also the index to the iterating function.

**Signature**

```ts
export declare const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: A[]) => B
```

**Example**

```ts
import { reduceWithIndex } from 'fp-ts/Array'

const f = (index: number, acc: string, cur: unknown) => acc + (typeof cur === 'string' ? cur.toUpperCase() + index : '')
assert.deepStrictEqual(reduceWithIndex('', f)([2, 'a', 'b', null]), 'A1B2')
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: Array<A>) => Array<B>`.
In practice it applies the base function to each element of the array and collects the
results in a new array.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: A[]) => B[]
```

**Example**

```ts
import { map } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

const f = (n: number) => n * 2
assert.deepStrictEqual(pipe([1, 2, 3], map(f)), [2, 4, 6])
```

Added in v2.0.0

# FunctorWithIndex

## mapWithIndex

Same as [`map`](#map), but the iterating function takes both the index and the value
of the element.

**Signature**

```ts
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: A[]) => B[]
```

**Example**

```ts
import { mapWithIndex } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

const f = (i: number, s: string) => `${s} - ${i}`
assert.deepStrictEqual(pipe(['a', 'b', 'c'], mapWithIndex(f)), ['a - 0', 'b - 1', 'c - 2'])
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to
determine the next computation.

In other words it takes a function `f` that produces an array from a single element of
the base type `A` and returns a new function which applies `f` to each element of the
input array (like [`map`](#map)) and, instead of returning an array of arrays, concatenates the
results into a single array (like [`flatten`](#flatten)).

This is the `chain` component of the array `Monad`.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => B[]) => (ma: A[]) => B[]
```

**Example**

```ts
import { chain, map, replicate } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

const f = (n: number) => replicate(n, `${n}`)
assert.deepStrictEqual(pipe([1, 2, 3], map(f)), [['1'], ['2', '2'], ['3', '3', '3']])
assert.deepStrictEqual(pipe([1, 2, 3], chain(f)), ['1', '2', '2', '3', '3', '3'])
```

Added in v2.0.0

# Pointed

## of

Given an element of the base type, `of` builds an `Array` containing just that
element of the base type (this is useful for building a `Monad`).

**Signature**

```ts
export declare const of: <A>(a: A) => A[]
```

**Example**

```ts
import { of } from 'fp-ts/Array'

assert.deepStrictEqual(of('a'), ['a'])
```

Added in v2.0.0

# Traversable

## sequence

`sequence` takes an `Array` where elements are `HKT<A>` (higher kinded type) and,
using an applicative of that `HKT`, returns an `HKT` of `Array<A>`.
E.g. it can turn an `Array<Either<Error, string>>` into an `Either<Error, Array<string>>`.

`sequence` requires an `Applicative` of the `HKT` you are targeting, e.g. to turn an
`Array<Either<E, A>>` into an `Either<E, Array<A>>`, it needs an
`Applicative` for `Either`, to to turn an `Array<Option<A>>` into an `Option<Array<A>>`,
it needs an `Applicative` for `Option`.

**Signature**

```ts
export declare const sequence: Sequence1<'Array'>
```

**Example**

```ts
import { sequence } from 'fp-ts/Array'
import { Applicative, left, right } from 'fp-ts/lib/Either'

assert.deepStrictEqual(sequence(Applicative)([right('a'), right('b')]), right(['a', 'b']))
assert.deepStrictEqual(
  sequence(Applicative)([right('a'), left(new Error('not a string'))]),
  left(new Error('not a string'))
)
```

Added in v2.6.3

## traverse

Given an iterating function that returns a `HKT` (higher kinded type), `traverse`
applies the iterating function to each element of the `Array` and then [`sequence`](#sequence)-s
the results using the provided `Applicative`.

E.g. suppose you have an `Array` and you want to format each element with a function
that returns a result or an error as `f = (a: A) => Either<Error, B>`, using `traverse`
you can apply `f` to all elements and directly obtain as a result an `Either<Error,Array<B>>`
i.e. an `Array<B>` if all the results are `B`, or an `Error` if some of the results
are `Error`s.

**Signature**

```ts
export declare const traverse: PipeableTraverse1<'Array'>
```

**Example**

```ts
import { traverse } from 'fp-ts/Array'
import { Applicative, left, right } from 'fp-ts/lib/Either'

const f = (x: unknown) => (typeof x === 'string' ? right(x.toUpperCase()) : left(new Error('not a string')))
assert.deepStrictEqual(traverse(Applicative)(f)(['a', 'b']), right(['A', 'B']))
assert.deepStrictEqual(traverse(Applicative)(f)(['a', 5]), left(new Error('not a string')))
```

Added in v2.6.3

# TraversableWithIndex

## traverseWithIndex

Same as [`traverse`](#traverse) but passing also the index to the iterating function.

**Signature**

```ts
export declare const traverseWithIndex: PipeableTraverseWithIndex1<'Array', number>
```

**Example**

```ts
import { traverseWithIndex } from 'fp-ts/Array'
import { Applicative, left, right } from 'fp-ts/lib/Either'

const f = (index: number, x: unknown) =>
  typeof x === 'string' ? right(x.toUpperCase() + index) : left(new Error('not a string'))
assert.deepStrictEqual(traverseWithIndex(Applicative)(f)(['a', 'b']), right(['A0', 'B1']))
assert.deepStrictEqual(traverseWithIndex(Applicative)(f)(['a', 5]), left(new Error('not a string')))
```

Added in v2.6.3

# Unfoldable

## unfold

`unfold` takes a function `f` which returns an `Option` of a tuple containing an outcome
value and an input for the following iteration.
`unfold` applies `f` to the initial value `b` and then recursively to the second
element of the tuple contained in the returned `option` of the previous
calculation until `f` returns `Option.none`.

**Signature**

```ts
export declare const unfold: <A, B>(b: B, f: (b: B) => Option<readonly [A, B]>) => A[]
```

**Example**

```ts
import { unfold } from 'fp-ts/Array'
import { option } from 'fp-ts'

const f = (n: number) => {
  if (n <= 0) return option.none
  const returnValue = n * 2
  const inputForNextRound = n - 1
  return option.some([returnValue, inputForNextRound] as const)
}
assert.deepStrictEqual(unfold(5, f), [10, 8, 6, 4, 2])
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

# Zero

## zero

Makes an empty `Array`, useful for building a [`Monoid`](#Monoid)

**Signature**

```ts
export declare const zero: <A>() => A[]
```

Added in v2.7.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: B[]) => <A>(first: A[]) => A[]
```

Added in v2.5.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: B[]) => <A>(first: A[]) => B[]
```

Added in v2.5.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => B[]) => (first: A[]) => A[]
```

**Example**

```ts
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    A.chainFirst(() => ['a', 'b'])
  ),
  [1, 1, 2, 2, 3, 3]
)
assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    A.chainFirst(() => [])
  ),
  []
)
```

Added in v2.0.0

## chainWithIndex

Same as [`chain`](#chain), but passing also the index to the iterating function.

**Signature**

```ts
export declare const chainWithIndex: <A, B>(f: (i: number, a: A) => B[]) => (as: A[]) => B[]
```

**Example**

```ts
import { chainWithIndex, replicate } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

const f = (index: number, x: string) => replicate(2, `${x}${index}`)
assert.deepStrictEqual(pipe(['a', 'b', 'c'], chainWithIndex(f)), ['a0', 'a0', 'b1', 'b1', 'c2', 'c2'])
```

Added in v2.7.0

## chop

A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
value and the rest of the array.

**Signature**

```ts
export declare const chop: <A, B>(f: (as: NEA.NonEmptyArray<A>) => [B, A[]]) => (as: A[]) => B[]
```

**Example**

```ts
import { Eq } from 'fp-ts/Eq'
import * as A from 'fp-ts/Array'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const group = <A>(S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
  return A.chop((as) => {
    const { init, rest } = pipe(
      as,
      A.spanLeft((a: A) => S.equals(a, as[0]))
    )
    return [init, rest]
  })
}
assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
```

Added in v2.0.0

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
export declare const chunksOf: (n: number) => <A>(as: A[]) => NEA.NonEmptyArray<A>[]
```

**Example**

```ts
import { chunksOf } from 'fp-ts/Array'

assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
```

Added in v2.0.0

## comprehension

`Array` comprehension.

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
export declare function comprehension<A, B, R>(
  input: [Array<A>, Array<B>],
  f: (a: A, b: B) => R,
  g?: (a: A, b: B) => boolean
): Array<R>
export declare function comprehension<A, R>(input: [Array<A>], f: (a: A) => R, g?: (a: A) => boolean): Array<R>
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

## concat

**Signature**

```ts
export declare const concat: <A>(second: A[]) => (first: A[]) => A[]
```

Added in v2.11.0

## concatW

**Signature**

```ts
export declare const concatW: <B>(second: B[]) => <A>(first: A[]) => (B | A)[]
```

Added in v2.11.0

## copy

This function takes an array and makes a new array containing the same elements.

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
export declare function difference<A>(E: Eq<A>): {
  (xs: Array<A>): (ys: Array<A>) => Array<A>
  (xs: Array<A>, ys: Array<A>): Array<A>
}
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

Creates a new `Array` which is a copy of the input dropping a max number of elements from the start.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const dropLeft: (n: number) => <A>(as: A[]) => A[]
```

**Example**

```ts
import { dropLeft } from 'fp-ts/Array'

assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
assert.deepStrictEqual(dropLeft(5)([1, 2, 3]), [])
assert.deepStrictEqual(dropLeft(0)([1, 2, 3]), [1, 2, 3])
assert.deepStrictEqual(dropLeft(-2)([1, 2, 3]), [1, 2, 3])
```

Added in v2.0.0

## dropLeftWhile

Creates a new `Array` which is a copy of the input dropping the longest initial subarray for
which all element satisfy the specified predicate.

**Signature**

```ts
export declare function dropLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Array<B>
export declare function dropLeftWhile<A>(predicate: Predicate<A>): <B extends A>(bs: Array<B>) => Array<B>
export declare function dropLeftWhile<A>(predicate: Predicate<A>): (as: Array<A>) => Array<A>
```

**Example**

```ts
import { dropLeftWhile } from 'fp-ts/Array'

assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
```

Added in v2.0.0

## dropRight

Creates a new `Array` which is a copy of the input dropping a max number of elements from the end.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const dropRight: (n: number) => <A>(as: A[]) => A[]
```

**Example**

```ts
import { dropRight } from 'fp-ts/Array'

assert.deepStrictEqual(dropRight(2)([1, 2, 3]), [1])
assert.deepStrictEqual(dropRight(5)([1, 2, 3]), [])
assert.deepStrictEqual(dropRight(0)([1, 2, 3]), [1, 2, 3])
assert.deepStrictEqual(dropRight(-2)([1, 2, 3]), [1, 2, 3])
```

Added in v2.0.0

## duplicate

`duplicate` returns an array containing the whole input `Array`,
then to the input `Array` dropping the first element, then to the input
`Array` dropping the first two elements, etc.
Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(wa: A[]) => A[][]
```

**Example**

```ts
import { duplicate } from 'fp-ts/Array'

assert.deepStrictEqual(duplicate(['a', 'b', 'c']), [['a', 'b', 'c'], ['b', 'c'], ['c']])
```

Added in v2.0.0

## flap

Given an input an `Array` of functions, `flap` returns an `Array` containing
the results of applying each function to the given input.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: ((a: A) => B)[]) => B[]
```

**Example**

```ts
import { flap } from 'fp-ts/Array'

const funs = [(n: number) => `Double: ${n * 2}`, (n: number) => `Triple: ${n * 3}`, (n: number) => `Square: ${n * n}`]
assert.deepStrictEqual(flap(4)(funs), ['Double: 8', 'Triple: 12', 'Square: 16'])
```

Added in v2.10.0

## flatten

Takes an array of arrays of `A` and flattens them into an array of `A`
by concatenating the elements of each array in order.

Derivable from [`chain`](#chain).

**Signature**

```ts
export declare const flatten: <A>(mma: A[][]) => A[]
```

**Example**

```ts
import { flatten } from 'fp-ts/Array'

assert.deepStrictEqual(flatten([['a'], ['b', 'c'], ['d', 'e', 'f']]), ['a', 'b', 'c', 'd', 'e', 'f'])
```

Added in v2.5.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(f: (...a: A) => Either<E, B>) => (...a: A) => B[]
```

Added in v2.11.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => B[]
```

Added in v2.11.0

## intersection

Creates an array of unique values that are included in all given arrays using a `Eq` for equality
comparisons. The order and references of result values are determined by the first array.

**Signature**

```ts
export declare function intersection<A>(E: Eq<A>): {
  (xs: Array<A>): (ys: Array<A>) => Array<A>
  (xs: Array<A>, ys: Array<A>): Array<A>
}
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

Creates a new `Array` placing an element in between members of the input `Array`.

**Signature**

```ts
export declare const intersperse: <A>(middle: A) => (as: A[]) => A[]
```

**Example**

```ts
import { intersperse } from 'fp-ts/Array'

assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
```

Added in v2.9.0

## lefts

Takes an `Array` of `Either` and produces a new `Array` containing
the values of all the `Left` elements in the same order.

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

## prependAll

Creates a new `Array`, prepending an element to every member of the input `Array`.

**Signature**

```ts
export declare const prependAll: <A>(middle: A) => (as: A[]) => A[]
```

**Example**

```ts
import { prependAll } from 'fp-ts/Array'

assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
```

Added in v2.10.0

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

Takes an `Array` of `Either` and produces a new `Array` containing
the values of all the `Right` elements in the same order.

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

Creates a new `Array` rotating the input `Array` by `n` steps.

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
export declare const scanLeft: <A, B>(b: B, f: (b: B, a: A) => B) => (as: A[]) => NEA.NonEmptyArray<B>
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
export declare const scanRight: <A, B>(b: B, f: (a: A, b: B) => B) => (as: A[]) => NEA.NonEmptyArray<B>
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
  readonly name: string
  readonly age: number
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

## splitAt

Splits an `Array` into two pieces, the first piece has max `n` elements.

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

## takeLeft

Keep only a max number of elements from the start of an `Array`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const takeLeft: (n: number) => <A>(as: A[]) => A[]
```

**Example**

```ts
import { takeLeft } from 'fp-ts/Array'

assert.deepStrictEqual(takeLeft(2)([1, 2, 3, 4, 5]), [1, 2])
assert.deepStrictEqual(takeLeft(7)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
assert.deepStrictEqual(takeLeft(0)([1, 2, 3, 4, 5]), [])
assert.deepStrictEqual(takeLeft(-1)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
```

Added in v2.0.0

## takeLeftWhile

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array

**Signature**

```ts
export declare function takeLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Array<B>
export declare function takeLeftWhile<A>(predicate: Predicate<A>): <B extends A>(bs: Array<B>) => Array<B>
export declare function takeLeftWhile<A>(predicate: Predicate<A>): (as: Array<A>) => Array<A>
```

**Example**

```ts
import { takeLeftWhile } from 'fp-ts/Array'

assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
```

Added in v2.0.0

## takeRight

Keep only a max number of elements from the end of an `Array`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const takeRight: (n: number) => <A>(as: A[]) => A[]
```

**Example**

```ts
import { takeRight } from 'fp-ts/Array'

assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
assert.deepStrictEqual(takeRight(7)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
assert.deepStrictEqual(takeRight(0)([1, 2, 3, 4, 5]), [])
assert.deepStrictEqual(takeRight(-1)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
```

Added in v2.0.0

## union

Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons

**Signature**

```ts
export declare function union<A>(E: Eq<A>): {
  (xs: Array<A>): (ys: Array<A>) => Array<A>
  (xs: Array<A>, ys: Array<A>): Array<A>
}
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

Creates a new `Array` removing duplicate elements, keeping the first occurrence of an element,
based on a `Eq<A>`.

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
export declare function zip<B>(bs: Array<B>): <A>(as: Array<A>) => Array<[A, B]>
export declare function zip<A, B>(as: Array<A>, bs: Array<B>): Array<[A, B]>
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

## ~~prependToAll~~

Use `prependAll` instead

**Signature**

```ts
export declare const prependToAll: <A>(middle: A) => (as: A[]) => A[]
```

Added in v2.9.0

# constructors

## append

Append an element to the end of a `Array`, creating a new `NonEmptyArray`.

**Signature**

```ts
export declare const append: <A>(end: A) => (init: A[]) => NEA.NonEmptyArray<A>
```

**Example**

```ts
import { append } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
```

Added in v2.10.0

## appendW

Less strict version of [`append`](#append).

**Signature**

```ts
export declare const appendW: <A, B>(end: B) => (init: A[]) => NEA.NonEmptyArray<A | B>
```

**Example**

```ts
import { appendW } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], appendW('d')), [1, 2, 3, 'd'])
```

Added in v2.11.0

## fromPredicate

Create an array with one element, if the element satisfies the predicate, otherwise
it returns an empty array.

**Signature**

```ts
export declare function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => Array<B>
export declare function fromPredicate<A>(predicate: Predicate<A>): <B extends A>(b: B) => Array<B>
export declare function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Array<A>
```

**Example**

```ts
import { fromPredicate } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { isString } from 'fp-ts/lib/string'

assert.deepStrictEqual(pipe('a', fromPredicate(isString)), ['a'])
assert.deepStrictEqual(pipe(7, fromPredicate(isString)), [])

assert.deepStrictEqual(
  pipe(
    7,
    fromPredicate((x) => x > 0)
  ),
  [7]
)
assert.deepStrictEqual(
  pipe(
    -3,
    fromPredicate((x) => x > 0)
  ),
  []
)
```

Added in v2.11.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => void[]
```

Added in v2.11.0

## makeBy

Return a `Array` of length `n` with element `i` initialized with `f(i)`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const makeBy: <A>(n: number, f: (i: number) => A) => A[]
```

**Example**

```ts
import { makeBy } from 'fp-ts/Array'

const double = (i: number): number => i * 2
assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
assert.deepStrictEqual(makeBy(-3, double), [])
assert.deepStrictEqual(makeBy(4.32164, double), [0, 2, 4, 6])
```

Added in v2.0.0

## prepend

Prepend an element to the front of a `Array`, creating a new `NonEmptyArray`.

**Signature**

```ts
export declare const prepend: <A>(head: A) => (tail: A[]) => NEA.NonEmptyArray<A>
```

**Example**

```ts
import { prepend } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([2, 3, 4], prepend(1)), [1, 2, 3, 4])
```

Added in v2.10.0

## prependW

Less strict version of [`prepend`](#prepend).

**Signature**

```ts
export declare const prependW: <A, B>(head: B) => (tail: A[]) => NEA.NonEmptyArray<A | B>
```

**Example**

```ts
import { prependW } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([2, 3, 4], prependW('a')), ['a', 2, 3, 4])
```

Added in v2.11.0

## replicate

Create a `Array` containing a value repeated the specified number of times.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const replicate: <A>(n: number, a: A) => A[]
```

**Example**

```ts
import { replicate } from 'fp-ts/Array'

assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
assert.deepStrictEqual(replicate(-3, 'a'), [])
assert.deepStrictEqual(replicate(2.985647, 'a'), ['a', 'a'])
```

Added in v2.0.0

## ~~cons~~

Use `prepend` instead.

**Signature**

```ts
export declare const cons: typeof NEA.cons
```

Added in v2.0.0

## ~~range~~

Use `NonEmptyArray` module instead.

**Signature**

```ts
export declare const range: (start: number, end: number) => NEA.NonEmptyArray<number>
```

Added in v2.0.0

## ~~snoc~~

Use `append` instead.

**Signature**

```ts
export declare const snoc: <A>(init: A[], end: A) => NEA.NonEmptyArray<A>
```

Added in v2.0.0

# destructors

## findFirst

Find the first element which satisfies a predicate (or a refinement) function.
It returns an `Option` containing the element or `None` if not found.

**Signature**

```ts
export declare function findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Option<B>
export declare function findFirst<A>(predicate: Predicate<A>): <B extends A>(bs: Array<B>) => Option<B>
export declare function findFirst<A>(predicate: Predicate<A>): (as: Array<A>) => Option<A>
```

**Example**

```ts
import { findFirst } from 'fp-ts/Array'
import { some } from 'fp-ts/Option'

type X = {
  readonly a: number
  readonly b: number
}

assert.deepStrictEqual(
  findFirst((x: X) => x.a === 1)([
    { a: 1, b: 1 },
    { a: 1, b: 2 },
  ]),
  some({ a: 1, b: 1 })
)
```

Added in v2.0.0

## findFirstMap

Given a selector function which takes an element and returns an option,
this function applies the selector to each element of the array and
returns the first `Some` result. Otherwise it returns `None`.

**Signature**

```ts
export declare const findFirstMap: <A, B>(f: (a: A) => Option<B>) => (as: A[]) => Option<B>
```

**Example**

```ts
import { findFirstMap } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

interface Person {
  readonly name: string
  readonly age: number
}

const persons: Array<Person> = [
  { name: 'John', age: 16 },
  { name: 'Mary', age: 45 },
  { name: 'Joey', age: 28 },
]

const nameOfPersonAbove18 = (p: Person) => (p.age <= 18 ? none : some(p.name))
const nameOfPersonAbove70 = (p: Person) => (p.age <= 70 ? none : some(p.name))
assert.deepStrictEqual(findFirstMap(nameOfPersonAbove18)(persons), some('Mary'))
assert.deepStrictEqual(findFirstMap(nameOfPersonAbove70)(persons), none)
```

Added in v2.0.0

## findLast

Find the last element which satisfies a predicate function.
It returns an `Option` containing the element or `None` if not found.

**Signature**

```ts
export declare function findLast<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Option<B>
export declare function findLast<A>(predicate: Predicate<A>): <B extends A>(bs: Array<B>) => Option<B>
export declare function findLast<A>(predicate: Predicate<A>): (as: Array<A>) => Option<A>
```

**Example**

```ts
import { findLast } from 'fp-ts/Array'
import { some } from 'fp-ts/Option'

type X = {
  readonly a: number
  readonly b: number
}

assert.deepStrictEqual(
  findLast((x: X) => x.a === 1)([
    { a: 1, b: 1 },
    { a: 1, b: 2 },
  ]),
  some({ a: 1, b: 2 })
)
```

Added in v2.0.0

## findLastMap

Given a selector function which takes an element and returns an option,
this function applies the selector to each element of the array starting from the
end and returns the last `Some` result. Otherwise it returns `None`.

**Signature**

```ts
export declare const findLastMap: <A, B>(f: (a: A) => Option<B>) => (as: A[]) => Option<B>
```

**Example**

```ts
import { findLastMap } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

interface Person {
  readonly name: string
  readonly age: number
}

const persons: Array<Person> = [
  { name: 'John', age: 16 },
  { name: 'Mary', age: 45 },
  { name: 'Joey', age: 28 },
]

const nameOfPersonAbove18 = (p: Person) => (p.age <= 18 ? none : some(p.name))
const nameOfPersonAbove70 = (p: Person) => (p.age <= 70 ? none : some(p.name))
assert.deepStrictEqual(findLastMap(nameOfPersonAbove18)(persons), some('Joey'))
assert.deepStrictEqual(findLastMap(nameOfPersonAbove70)(persons), none)
```

Added in v2.0.0

## foldLeft

Alias of [`matchLeft`](#matchleft).

**Signature**

```ts
export declare const foldLeft: <A, B>(onEmpty: Lazy<B>, onNonEmpty: (head: A, tail: A[]) => B) => (as: A[]) => B
```

Added in v2.0.0

## foldRight

Alias of [`matchRight`](#matchright).

**Signature**

```ts
export declare const foldRight: <A, B>(onEmpty: Lazy<B>, onNonEmpty: (init: A[], last: A) => B) => (as: A[]) => B
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

## match

Takes an array, if the array is empty it returns the result of `onEmpty`, otherwise
it passes the array to `onNonEmpty` and returns the result.

**Signature**

```ts
export declare const match: <B, A>(onEmpty: Lazy<B>, onNonEmpty: (as: NEA.NonEmptyArray<A>) => B) => (as: A[]) => B
```

**Example**

```ts
import { match } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

const matcher = match(
  () => 'No elements',
  (as) => `Found ${as.length} element(s)`
)
assert.deepStrictEqual(pipe([1, 2, 3, 4], matcher), 'Found 4 element(s)')
assert.deepStrictEqual(pipe([], matcher), 'No elements')
```

Added in v2.11.0

## matchLeft

Takes an array, if the array is empty it returns the result of `onEmpty`, otherwise
it passes the array to `onNonEmpty` broken into its first element and remaining elements.

**Signature**

```ts
export declare const matchLeft: <B, A>(onEmpty: Lazy<B>, onNonEmpty: (head: A, tail: A[]) => B) => (as: A[]) => B
```

**Example**

```ts
import { matchLeft } from 'fp-ts/Array'

const len: <A>(as: Array<A>) => number = matchLeft(
  () => 0,
  (_, tail) => 1 + len(tail)
)
assert.strictEqual(len([1, 2, 3]), 3)
```

Added in v2.10.0

## matchLeftW

Less strict version of [`matchLeft`](#matchleft). It will work when `onEmpty` and
`onNonEmpty` have different return types.

**Signature**

```ts
export declare const matchLeftW: <B, A, C>(
  onEmpty: Lazy<B>,
  onNonEmpty: (head: A, tail: A[]) => C
) => (as: A[]) => B | C
```

**Example**

```ts
import { matchLeftW } from 'fp-ts/Array'

const f = matchLeftW(
  () => 0,
  (head: string, tail: string[]) => `Found "${head}" followed by ${tail.length} elements`
)
assert.strictEqual(f(['a', 'b', 'c']), 'Found "a" followed by 2 elements')
assert.strictEqual(f([]), 0)
```

Added in v2.11.0

## matchRight

Takes an array, if the array is empty it returns the result of `onEmpty`, otherwise
it passes the array to `onNonEmpty` broken into its initial elements and the last element.

**Signature**

```ts
export declare const matchRight: <B, A>(onEmpty: Lazy<B>, onNonEmpty: (init: A[], last: A) => B) => (as: A[]) => B
```

**Example**

```ts
import { matchRight } from 'fp-ts/Array'

const len: <A>(as: Array<A>) => number = matchRight(
  () => 0,
  (head, _) => 1 + len(head)
)
assert.strictEqual(len([1, 2, 3]), 3)
```

Added in v2.10.0

## matchRightW

Less strict version of [`matchRight`](#matchright). It will work when `onEmpty` and
`onNonEmpty` have different return types.

**Signature**

```ts
export declare const matchRightW: <B, A, C>(
  onEmpty: Lazy<B>,
  onNonEmpty: (init: A[], last: A) => C
) => (as: A[]) => B | C
```

**Example**

```ts
import { matchRightW } from 'fp-ts/Array'

const f = matchRightW(
  () => 0,
  (head: string[], tail: string) => `Found ${head.length} elements folllowed by "${tail}"`
)
assert.strictEqual(f(['a', 'b', 'c']), 'Found 2 elements folllowed by "c"')
assert.strictEqual(f([]), 0)
```

Added in v2.11.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <B, A, C>(
  onEmpty: Lazy<B>,
  onNonEmpty: (as: NEA.NonEmptyArray<A>) => C
) => (as: A[]) => B | C
```

**Example**

```ts
import { matchW } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

const matcherW = matchW(
  () => 'No elements',
  (as) => as.length
)
assert.deepStrictEqual(pipe([1, 2, 3, 4], matcherW), 4)
assert.deepStrictEqual(pipe([], matcherW), 'No elements')
```

Added in v2.11.0

## spanLeft

Split an array into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

**Signature**

```ts
export declare function spanLeft<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Spanned<B, A>
export declare function spanLeft<A>(predicate: Predicate<A>): <B extends A>(bs: Array<B>) => Spanned<B, B>
export declare function spanLeft<A>(predicate: Predicate<A>): (as: Array<A>) => Spanned<A, A>
```

**Example**

```ts
import { spanLeft } from 'fp-ts/Array'

const isOdd = (n: number) => n % 2 === 1
assert.deepStrictEqual(spanLeft(isOdd)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
assert.deepStrictEqual(spanLeft(isOdd)([0, 2, 4, 5]), { init: [], rest: [0, 2, 4, 5] })
assert.deepStrictEqual(spanLeft(isOdd)([1, 3, 5]), { init: [1, 3, 5], rest: [] })
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

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'Array'>
```

Added in v2.10.0

## ChainRecBreadthFirst

**Signature**

```ts
export declare const ChainRecBreadthFirst: ChainRec1<'Array'>
```

Added in v2.11.0

## ChainRecDepthFirst

**Signature**

```ts
export declare const ChainRecDepthFirst: ChainRec1<'Array'>
```

Added in v2.11.0

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

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither1<'Array'>
```

Added in v2.11.0

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

## Zero

**Signature**

```ts
export declare const Zero: Zero1<'Array'>
```

Added in v2.11.0

## getDifferenceMagma

Get a `Magma` for `Array` where the `concat` function is the differnce between
the first and the second array, i.e. the result contains all the elements of the
first array for which their is no equal element in the second array according
to the `Eq` provided.

**Signature**

```ts
export declare const getDifferenceMagma: <A>(E: Eq<A>) => Magma<A[]>
```

**Example**

```ts
import { getDifferenceMagma } from 'fp-ts/Array'
import { Eq } from 'fp-ts/number'

const S = getDifferenceMagma<number>(Eq)
assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [1])
```

Added in v2.11.0

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

## getIntersectionSemigroup

Get a `Semigroup` based on the intersection of the elements of `Array`s.
Only elements present in the two arrays which are equal according to the
provided `Eq` are included in the result.

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(E: Eq<A>) => Semigroup<A[]>
```

**Example**

```ts
import { getIntersectionSemigroup } from 'fp-ts/Array'
import { Eq } from 'fp-ts/number'

const S = getIntersectionSemigroup<number>(Eq)
assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [2])
```

Added in v2.11.0

## getMonoid

Returns a `Monoid` for `Array<A>` based on the concatenation of `Array`s.

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

## getSemigroup

Get a `Semigroup` based on the concatenation of `Array`s.
See also [`getMonoid`](#getMonoid).

**Signature**

```ts
export declare const getSemigroup: <A = never>() => Semigroup<A[]>
```

**Example**

```ts
import { getSemigroup } from 'fp-ts/Array'

const S = getSemigroup<number>()
assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [1, 2, 2, 3])
```

Added in v2.10.0

## getShow

`getShow` makes a `Show` for an `Array<A>` from a `Show` for
an `A`.

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<A[]>
```

**Example**

```ts
import { getShow } from 'fp-ts/Array'

const numShow = { show: (n: number) => (n >= 0 ? `${n}` : `(${-n})`) }
assert.deepStrictEqual(getShow(numShow).show([-2, -1, 0, 1]), '[(2), (1), 0, 1]')
```

Added in v2.0.0

## getUnionMonoid

Get a `Monoid` based on the union of the elements of `Array`s.
Elements which equal according to the provided `Eq` are included
only once in the result.

**Signature**

```ts
export declare const getUnionMonoid: <A>(E: Eq<A>) => Monoid<A[]>
```

**Example**

```ts
import { getUnionMonoid } from 'fp-ts/Array'
import { Eq } from 'fp-ts/number'

const M = getUnionMonoid<number>(Eq)
assert.deepStrictEqual(M.concat([1, 2], [2, 3]), [1, 2, 3])
assert.deepStrictEqual(M.empty, [])
```

Added in v2.11.0

## getUnionSemigroup

Get a `Semigroup` based on the union of the elements of `Array`s.
Elements which equal according to the provided `Eq` are included
only once in the result.
See also [`getUnionMonoid`](#getUnionMonoid).

**Signature**

```ts
export declare const getUnionSemigroup: <A>(E: Eq<A>) => Semigroup<A[]>
```

**Example**

```ts
import { getUnionSemigroup } from 'fp-ts/Array'
import { Eq } from 'fp-ts/number'

const S = getUnionSemigroup<number>(Eq)
assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [1, 2, 3])
```

Added in v2.11.0

## ~~array~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `A.Functor` instead of `A.array`
(where `A` is from `import A from 'fp-ts/Array'`)

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

# natural transformations

## fromEither

Create an array from an `Either`. The resulting array will contain the content of the
`Either` if it is `Right` and it will be empty if the `Either` is `Left`.

**Signature**

```ts
export declare const fromEither: <A>(fa: Either<unknown, A>) => A[]
```

**Example**

```ts
import { fromEither } from 'fp-ts/Array'
import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(either.right('r'), fromEither), ['r'])
assert.deepStrictEqual(pipe(either.left('l'), fromEither), [])
```

Added in v2.11.0

## fromOption

Create an array from an `Option`. The resulting array will contain the content of the
`Option` if it is `Some` and it will be empty if the `Option` is `None`.

**Signature**

```ts
export declare const fromOption: <A>(fa: Option<A>) => A[]
```

**Example**

```ts
import { fromOption } from 'fp-ts/Array'
import { option } from 'fp-ts'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(option.some('a'), fromOption), ['a'])
assert.deepStrictEqual(pipe(option.none, fromOption), [])
```

Added in v2.11.0

# refinements

## isEmpty

Test whether an array is empty

**Signature**

```ts
export declare const isEmpty: <A>(as: A[]) => as is []
```

**Example**

```ts
import { isEmpty } from 'fp-ts/Array'

assert.strictEqual(isEmpty([]), true)
assert.strictEqual(isEmpty(['a']), false)
```

Added in v2.0.0

## isNonEmpty

Test whether an array is non empty narrowing down the type to `NonEmptyArray<A>`

**Signature**

```ts
export declare const isNonEmpty: <A>(as: A[]) => as is NEA.NonEmptyArray<A>
```

**Example**

```ts
import { isNonEmpty } from 'fp-ts/Array'

assert.strictEqual(isNonEmpty([]), false)
assert.strictEqual(isNonEmpty(['a']), true)
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
export declare const unsafeInsertAt: <A>(i: number, a: A, as: A[]) => NEA.NonEmptyArray<A>
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

## Spanned (interface)

Type returned by [`spanLeft`](#spanLeft) composed of an `init` array and a `rest` array.

**Signature**

```ts
export interface Spanned<I, R> {
  init: Array<I>
  rest: Array<R>
}
```

Added in v2.10.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: B[]
) => (fa: A[]) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B[]
) => (ma: A[]) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: A[]) => { readonly [K in N]: A }[]
```

Added in v2.8.0

## deleteAt

Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds.

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

Test if a value is a member of an `Array`. Takes a `Eq<A>` as a single
argument which returns the function to use to search for a value of type `A` in
an `Array<A>`.

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

## every

`every` tells if the provided predicate holds true for every element in the `Array`.

**Signature**

```ts
export declare const every: {
  <A, B extends A>(refinement: Refinement<A, B>): Refinement<A[], B[]>
  <A>(predicate: Predicate<A>): Predicate<A[]>
}
```

**Example**

```ts
import { every } from 'fp-ts/Array'

assert.equal(every((x: number) => x >= 0)([1, 2, 3]), true)
assert.equal(every((x: number) => x >= 0)([-1, 2, 3]), false)
```

Added in v2.9.0

## exists

Alias of [`some`](#some)

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => (as: A[]) => as is NEA.NonEmptyArray<A>
```

Added in v2.11.0

## filterE

Filter values inside a context.

**Signature**

```ts
export declare const filterE: FilterE1<'Array'>
```

Added in v2.11.0

## findIndex

`findIndex` returns an `Option` containing the first index for which a predicate holds.
It returns `None` if no element satisfies the predicate.
Similar to [`findFirst`](#findFirst) but returning the index instead of the element.

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

Returns the index of the last element of the list which matches the predicate.
It returns an `Option` containing the index or `None` if not found.

**Signature**

```ts
export declare const findLastIndex: <A>(predicate: Predicate<A>) => (as: A[]) => Option<number>
```

**Example**

```ts
import { findLastIndex } from 'fp-ts/Array'
import { some, none } from 'fp-ts/Option'

interface X {
  readonly a: number
  readonly b: number
}
const xs: Array<X> = [
  { a: 1, b: 0 },
  { a: 1, b: 1 },
]
assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 1)(xs), some(1))
assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 4)(xs), none)
```

Added in v2.0.0

## insertAt

Insert an element at the specified index, creating a new array,
or returning `None` if the index is out of bounds.

**Signature**

```ts
export declare const insertAt: <A>(i: number, a: A) => (as: A[]) => Option<NEA.NonEmptyArray<A>>
```

**Example**

```ts
import { insertAt } from 'fp-ts/Array'
import { some } from 'fp-ts/Option'

assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
```

Added in v2.0.0

## intercalate

Places an element in between members of an `Array`, then folds the results using the provided `Monoid`.

**Signature**

```ts
export declare const intercalate: <A>(M: Monoid<A>) => (middle: A) => (as: A[]) => A
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { intercalate } from 'fp-ts/Array'

assert.deepStrictEqual(intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
```

Added in v2.12.0

## isOutOfBound

Test whether an array contains a particular index

**Signature**

```ts
export declare const isOutOfBound: <A>(i: number, as: A[]) => boolean
```

**Example**

```ts
import { isOutOfBound } from 'fp-ts/Array'

assert.strictEqual(isOutOfBound(1, ['a', 'b', 'c']), false)
assert.strictEqual(isOutOfBound(-1, ['a', 'b', 'c']), true)
assert.strictEqual(isOutOfBound(3, ['a', 'b', 'c']), true)
```

Added in v2.0.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: A[]) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v2.13.0

## lookup

This function provides a safe way to read a value at a particular index from an array.
It returns a `none` if the index is out of bounds, and a `some` of the element if the
index is valid.

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
of bounds.

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

## size

Calculate the number of elements in a `Array`.

**Signature**

```ts
export declare const size: <A>(as: A[]) => number
```

**Example**

```ts
import { size } from 'fp-ts/Array'

assert.strictEqual(size(['a', 'b', 'c']), 3)
```

Added in v2.10.0

## some

`some` tells if the provided predicate holds true at least for one element in the `Array`.

**Signature**

```ts
export declare const some: <A>(predicate: Predicate<A>) => (as: A[]) => as is NEA.NonEmptyArray<A>
```

**Example**

```ts
import { some } from 'fp-ts/Array'

assert.equal(some((x: number) => x >= 0)([1, 2, 3]), true)
assert.equal(some((x: number) => x >= 10)([1, 2, 3]), false)
```

Added in v2.9.0

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

Change the element at the specified index, creating a new array,
or returning `None` if the index is out of bounds.

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

## ~~empty~~

Use a new `[]` instead.

**Signature**

```ts
export declare const empty: never[]
```

Added in v2.0.0
