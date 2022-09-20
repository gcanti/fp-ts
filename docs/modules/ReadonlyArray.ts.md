---
title: ReadonlyArray.ts
nav_order: 84
parent: Modules
---

## ReadonlyArray overview

Added in v2.5.0

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
  - [unzip](#unzip)
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
  - [foldLeft](#foldleft)
  - [foldRight](#foldright)
  - [match](#match)
  - [matchLeft](#matchleft)
  - [matchLeftW](#matchleftw)
  - [matchRight](#matchright)
  - [matchRightW](#matchrightw)
  - [matchW](#matchw)
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
  - [~~readonlyArray~~](#readonlyarray)
- [interop](#interop)
  - [fromArray](#fromarray)
  - [toArray](#toarray)
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
  - [empty](#empty)
  - [every](#every)
  - [exists](#exists)
  - [filterE](#filtere)
  - [findFirst](#findfirst)
  - [findFirstMap](#findfirstmap)
  - [findIndex](#findindex)
  - [findLast](#findlast)
  - [findLastIndex](#findlastindex)
  - [findLastMap](#findlastmap)
  - [head](#head)
  - [init](#init)
  - [insertAt](#insertat)
  - [intercalate](#intercalate)
  - [isOutOfBound](#isoutofbound)
  - [last](#last)
  - [let](#let)
  - [lookup](#lookup)
  - [modifyAt](#modifyat)
  - [size](#size)
  - [some](#some)
  - [spanLeft](#spanleft)
  - [tail](#tail)
  - [updateAt](#updateat)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `ReadonlyArray` concatenates the inputs into a single array.

**Signature**

```ts
export declare const alt: <A>(that: Lazy<readonly A[]>) => (fa: readonly A[]) => readonly A[]
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.alt(() => [4, 5])
  ),
  [1, 2, 3, 4, 5]
)
```

Added in v2.5.0

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the return types will be merged.

**Signature**

```ts
export declare const altW: <B>(that: Lazy<readonly B[]>) => <A>(fa: readonly A[]) => readonly (B | A)[]
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.altW(() => ['a', 'b'])
  ),
  [1, 2, 3, 'a', 'b']
)
```

Added in v2.9.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: readonly A[]) => <B>(fab: readonly ((a: A) => B)[]) => readonly B[]
```

Added in v2.5.0

# ChainRec

## chainRecBreadthFirst

**Signature**

```ts
export declare const chainRecBreadthFirst: <A, B>(f: (a: A) => readonly Either<A, B>[]) => (a: A) => readonly B[]
```

Added in v2.11.0

## chainRecDepthFirst

**Signature**

```ts
export declare const chainRecDepthFirst: <A, B>(f: (a: A) => readonly Either<A, B>[]) => (a: A) => readonly B[]
```

Added in v2.11.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(fa: readonly Option<A>[]) => readonly A[]
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
  <A, B extends A>(refinement: Refinement<A, B>): (as: readonly A[]) => readonly B[]
  <A>(predicate: Predicate<A>): <B extends A>(bs: readonly B[]) => readonly B[]
  <A>(predicate: Predicate<A>): (as: readonly A[]) => readonly A[]
}
```

Added in v2.5.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: readonly A[]) => readonly B[]
```

Added in v2.5.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (as: readonly A[]) => Separated<readonly A[], readonly B[]>
  <A>(predicate: Predicate<A>): <B extends A>(bs: readonly B[]) => Separated<readonly B[], readonly B[]>
  <A>(predicate: Predicate<A>): (as: readonly A[]) => Separated<readonly A[], readonly A[]>
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
export declare const filterMapWithIndex: <A, B>(f: (i: number, a: A) => Option<B>) => (fa: readonly A[]) => readonly B[]
```

Added in v2.5.0

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (as: readonly A[]) => readonly B[]
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(bs: readonly B[]) => readonly B[]
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (as: readonly A[]) => readonly A[]
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
    as: readonly A[]
  ) => Separated<readonly A[], readonly B[]>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(
    bs: readonly B[]
  ) => Separated<readonly B[], readonly B[]>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (as: readonly A[]) => Separated<readonly A[], readonly A[]>
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

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.chain((n) => [`a${n}`, `b${n}`])
  ),
  ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
)
assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.chain(() => [])
  ),
  []
)
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
export declare const unfold: <A, B>(b: B, f: (b: B) => Option<readonly [A, B]>) => readonly A[]
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

# Zero

## zero

**Signature**

```ts
export declare const zero: <A>() => readonly A[]
```

Added in v2.7.0

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

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => readonly B[]) => (first: readonly A[]) => readonly A[]
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
assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.chainFirst(() => [])
  ),
  []
)
```

Added in v2.5.0

## chainWithIndex

**Signature**

```ts
export declare const chainWithIndex: <A, B>(f: (i: number, a: A) => readonly B[]) => (as: readonly A[]) => readonly B[]
```

Added in v2.7.0

## chop

A useful recursion pattern for processing a `ReadonlyArray` to produce a new `ReadonlyArray`, often used for "chopping" up the input
`ReadonlyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyArray` and produce a
value and the tail of the `ReadonlyArray`.

**Signature**

```ts
export declare const chop: <A, B>(
  f: (as: RNEA.ReadonlyNonEmptyArray<A>) => readonly [B, readonly A[]]
) => (as: readonly A[]) => readonly B[]
```

**Example**

```ts
import { Eq } from 'fp-ts/Eq'
import * as RA from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
  return RA.chop((as) => {
    const { init, rest } = pipe(
      as,
      RA.spanLeft((a: A) => S.equals(a, as[0]))
    )
    return [init, rest]
  })
}
assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
```

Added in v2.5.0

## chunksOf

Splits a `ReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the `ReadonlyArray`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that:

```ts
chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
```

whenever `n` evenly divides the length of `as`.

**Signature**

```ts
export declare const chunksOf: (n: number) => <A>(as: readonly A[]) => readonly RNEA.ReadonlyNonEmptyArray<A>[]
```

**Example**

```ts
import { chunksOf } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
```

Added in v2.5.0

## comprehension

`ReadonlyArray` comprehension.

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
export declare function comprehension<A, B, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>],
  f: (a: A, b: B) => R,
  g?: (a: A, b: B) => boolean
): ReadonlyArray<R>
export declare function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => R,
  g?: (a: A) => boolean
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

## concat

**Signature**

```ts
export declare const concat: <A>(second: readonly A[]) => (first: readonly A[]) => readonly A[]
```

Added in v2.11.0

## concatW

**Signature**

```ts
export declare const concatW: <B>(second: readonly B[]) => <A>(first: readonly A[]) => readonly (B | A)[]
```

Added in v2.11.0

## difference

Creates an array of array values not included in the other given array using a `Eq` for equality
comparisons. The order and references of result values are determined by the first array.

**Signature**

```ts
export declare function difference<A>(E: Eq<A>): {
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

Drop a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const dropLeft: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

const input: ReadonlyArray<number> = [1, 2, 3]
assert.deepStrictEqual(pipe(input, RA.dropLeft(2)), [3])
assert.strictEqual(pipe(input, RA.dropLeft(0)), input)
assert.strictEqual(pipe(input, RA.dropLeft(-1)), input)
```

Added in v2.5.0

## dropLeftWhile

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array

**Signature**

```ts
export declare function dropLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyArray<A>) => ReadonlyArray<B>
export declare function dropLeftWhile<A>(
  predicate: Predicate<A>
): <B extends A>(bs: ReadonlyArray<B>) => ReadonlyArray<B>
export declare function dropLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { dropLeftWhile } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
```

Added in v2.5.0

## dropRight

Drop a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const dropRight: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

const input: ReadonlyArray<number> = [1, 2, 3]
assert.deepStrictEqual(pipe(input, RA.dropRight(2)), [1])
assert.strictEqual(pipe(input, RA.dropRight(0)), input)
assert.strictEqual(pipe(input, RA.dropRight(-1)), input)
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

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: readonly (readonly A[])[]) => readonly A[]
```

Added in v2.5.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => readonly B[]
```

Added in v2.11.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B>(
  f: (...a: A) => Option<B>
) => (...a: A) => readonly B[]
```

Added in v2.11.0

## intersection

Creates an array of unique values that are included in all given arrays using a `Eq` for equality
comparisons. The order and references of result values are determined by the first array.

**Signature**

```ts
export declare function intersection<A>(E: Eq<A>): {
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
export declare const intersperse: <A>(middle: A) => (as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { intersperse } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
```

Added in v2.9.0

## lefts

Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order

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

Added in v2.5.0

## prependAll

Prepend an element to every member of an array

**Signature**

```ts
export declare const prependAll: <A>(middle: A) => (as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { prependAll } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
```

Added in v2.10.0

## reverse

Reverse an array, creating a new array

**Signature**

```ts
export declare const reverse: <A>(as: readonly A[]) => readonly A[]
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
export declare const rights: <E, A>(as: readonly Either<E, A>[]) => readonly A[]
```

**Example**

```ts
import { rights } from 'fp-ts/ReadonlyArray'
import { right, left } from 'fp-ts/Either'

assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
```

Added in v2.5.0

## rotate

Rotate a `ReadonlyArray` by `n` steps.

**Signature**

```ts
export declare const rotate: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { rotate } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
```

Added in v2.5.0

## scanLeft

Same as `reduce` but it carries over the intermediate steps.

**Signature**

```ts
export declare const scanLeft: <A, B>(b: B, f: (b: B, a: A) => B) => (as: readonly A[]) => RNEA.ReadonlyNonEmptyArray<B>
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
export declare const scanRight: <A, B>(
  b: B,
  f: (a: A, b: B) => B
) => (as: readonly A[]) => RNEA.ReadonlyNonEmptyArray<B>
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

Added in v2.5.0

## splitAt

Splits a `ReadonlyArray` into two pieces, the first piece has max `n` elements.

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

Added in v2.5.0

## takeLeft

Keep only a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const takeLeft: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

const input: ReadonlyArray<number> = [1, 2, 3]
assert.deepStrictEqual(pipe(input, RA.takeLeft(2)), [1, 2])

// out of bounds
assert.strictEqual(pipe(input, RA.takeLeft(4)), input)
assert.strictEqual(pipe(input, RA.takeLeft(-1)), input)
```

Added in v2.5.0

## takeLeftWhile

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array

**Signature**

```ts
export declare function takeLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyArray<A>) => ReadonlyArray<B>
export declare function takeLeftWhile<A>(
  predicate: Predicate<A>
): <B extends A>(bs: ReadonlyArray<B>) => ReadonlyArray<B>
export declare function takeLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { takeLeftWhile } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
```

Added in v2.5.0

## takeRight

Keep only a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const takeRight: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

const input: ReadonlyArray<number> = [1, 2, 3]
assert.deepStrictEqual(pipe(input, RA.takeRight(2)), [2, 3])

// out of bounds
assert.strictEqual(pipe(input, RA.takeRight(4)), input)
assert.strictEqual(pipe(input, RA.takeRight(-1)), input)
```

Added in v2.5.0

## union

Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons

**Signature**

```ts
export declare function union<A>(E: Eq<A>): {
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
export declare const uniq: <A>(E: Eq<A>) => (as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { uniq } from 'fp-ts/ReadonlyArray'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
```

Added in v2.5.0

## unzip

The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays

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
export declare const zipWith: <A, B, C>(fa: readonly A[], fb: readonly B[], f: (a: A, b: B) => C) => readonly C[]
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

## ~~prependToAll~~

Use [`prependAll`](#prependall) instead.

**Signature**

```ts
export declare const prependToAll: <A>(middle: A) => (as: readonly A[]) => readonly A[]
```

Added in v2.9.0

# constructors

## append

Append an element to the end of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const append: <A>(end: A) => (init: readonly A[]) => RNEA.ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { append } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
```

Added in v2.10.0

## appendW

Less strict version of [`append`](#append).

**Signature**

```ts
export declare const appendW: <B>(end: B) => <A>(init: readonly A[]) => RNEA.ReadonlyNonEmptyArray<B | A>
```

Added in v2.11.0

## fromPredicate

**Signature**

```ts
export declare function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => ReadonlyArray<B>
export declare function fromPredicate<A>(predicate: Predicate<A>): <B extends A>(b: B) => ReadonlyArray<B>
export declare function fromPredicate<A>(predicate: Predicate<A>): (a: A) => ReadonlyArray<A>
```

Added in v2.11.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => readonly void[]
```

Added in v2.11.0

## makeBy

Return a `ReadonlyArray` of length `n` with element `i` initialized with `f(i)`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const makeBy: <A>(n: number, f: (i: number) => A) => readonly A[]
```

**Example**

```ts
import { makeBy } from 'fp-ts/ReadonlyArray'

const double = (n: number): number => n * 2
assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
```

Added in v2.5.0

## prepend

Prepend an element to the front of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const prepend: <A>(head: A) => (tail: readonly A[]) => RNEA.ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { prepend } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([2, 3, 4], prepend(1)), [1, 2, 3, 4])
```

Added in v2.10.0

## prependW

Less strict version of [`prepend`](#prepend).

**Signature**

```ts
export declare const prependW: <B>(head: B) => <A>(tail: readonly A[]) => RNEA.ReadonlyNonEmptyArray<B | A>
```

Added in v2.11.0

## replicate

Create a `ReadonlyArray` containing a value repeated the specified number of times.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const replicate: <A>(n: number, a: A) => readonly A[]
```

**Example**

```ts
import { replicate } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
```

Added in v2.5.0

## ~~cons~~

Use [`prepend`](#prepend) instead.

**Signature**

```ts
export declare const cons: typeof RNEA.cons
```

Added in v2.5.0

## ~~range~~

Use `ReadonlyNonEmptyArray` module instead.

**Signature**

```ts
export declare const range: (start: number, end: number) => RNEA.ReadonlyNonEmptyArray<number>
```

Added in v2.5.0

## ~~snoc~~

Use [`append`](#append) instead.

**Signature**

```ts
export declare const snoc: <A>(init: readonly A[], end: A) => RNEA.ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

# destructors

## foldLeft

Alias of [`matchLeft`](#matchleft).

**Signature**

```ts
export declare const foldLeft: <A, B>(
  onEmpty: Lazy<B>,
  onNonEmpty: (head: A, tail: readonly A[]) => B
) => (as: readonly A[]) => B
```

Added in v2.5.0

## foldRight

Alias of [`matchRight`](#matchright).

**Signature**

```ts
export declare const foldRight: <A, B>(
  onEmpty: Lazy<B>,
  onNonEmpty: (init: readonly A[], last: A) => B
) => (as: readonly A[]) => B
```

Added in v2.5.0

## match

**Signature**

```ts
export declare const match: <B, A>(
  onEmpty: Lazy<B>,
  onNonEmpty: (as: RNEA.ReadonlyNonEmptyArray<A>) => B
) => (as: readonly A[]) => B
```

Added in v2.11.0

## matchLeft

Break a `ReadonlyArray` into its first element and remaining elements.

**Signature**

```ts
export declare const matchLeft: <B, A>(
  onEmpty: Lazy<B>,
  onNonEmpty: (head: A, tail: readonly A[]) => B
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

Added in v2.10.0

## matchLeftW

Less strict version of [`matchLeft`](#matchleft).

**Signature**

```ts
export declare const matchLeftW: <B, A, C>(
  onEmpty: Lazy<B>,
  onNonEmpty: (head: A, tail: readonly A[]) => C
) => (as: readonly A[]) => B | C
```

Added in v2.11.0

## matchRight

Break a `ReadonlyArray` into its initial elements and the last element.

**Signature**

```ts
export declare const matchRight: <B, A>(
  onEmpty: Lazy<B>,
  onNonEmpty: (init: readonly A[], last: A) => B
) => (as: readonly A[]) => B
```

Added in v2.10.0

## matchRightW

Less strict version of [`matchRight`](#matchright).

**Signature**

```ts
export declare const matchRightW: <B, A, C>(
  onEmpty: Lazy<B>,
  onNonEmpty: (init: readonly A[], last: A) => C
) => (as: readonly A[]) => B | C
```

Added in v2.11.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <B, A, C>(
  onEmpty: Lazy<B>,
  onNonEmpty: (as: RNEA.ReadonlyNonEmptyArray<A>) => C
) => (as: readonly A[]) => B | C
```

Added in v2.11.0

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

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'ReadonlyArray'>
```

Added in v2.10.0

## ChainRecBreadthFirst

**Signature**

```ts
export declare const ChainRecBreadthFirst: ChainRec1<'ReadonlyArray'>
```

Added in v2.11.0

## ChainRecDepthFirst

**Signature**

```ts
export declare const ChainRecDepthFirst: ChainRec1<'ReadonlyArray'>
```

Added in v2.11.0

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

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither1<'ReadonlyArray'>
```

Added in v2.11.0

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

## Zero

**Signature**

```ts
export declare const Zero: Zero1<'ReadonlyArray'>
```

Added in v2.11.0

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <A>(E: Eq<A>) => Magma<readonly A[]>
```

Added in v2.11.0

## getEq

Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
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
assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
assert.strictEqual(E.equals(['a'], []), false)
```

Added in v2.5.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(E: Eq<A>) => Semigroup<readonly A[]>
```

Added in v2.11.0

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
export declare const getOrd: <A>(O: Ord<A>) => Ord<readonly A[]>
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
export declare const getShow: <A>(S: Show<A>) => Show<readonly A[]>
```

Added in v2.5.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <A>(E: Eq<A>) => Monoid<readonly A[]>
```

Added in v2.11.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(E: Eq<A>) => Semigroup<readonly A[]>
```

Added in v2.11.0

## ~~readonlyArray~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `RA.Functor` instead of `RA.readonlyArray`
(where `RA` is from `import RA from 'fp-ts/ReadonlyArray'`)

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

# interop

## fromArray

**Signature**

```ts
export declare const fromArray: <A>(as: A[]) => readonly A[]
```

Added in v2.5.0

## toArray

**Signature**

```ts
export declare const toArray: <A>(as: readonly A[]) => A[]
```

Added in v2.5.0

# natural transformations

## fromEither

Transforms an `Either` to a `ReadonlyArray`.

**Signature**

```ts
export declare const fromEither: <A>(fa: Either<unknown, A>) => readonly A[]
```

Added in v2.11.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(fa: Option<A>) => readonly A[]
```

Added in v2.11.0

# refinements

## isEmpty

Test whether a `ReadonlyArray` is empty.

**Signature**

```ts
export declare const isEmpty: <A>(as: readonly A[]) => as is readonly []
```

**Example**

```ts
import { isEmpty } from 'fp-ts/ReadonlyArray'

assert.strictEqual(isEmpty([]), true)
```

Added in v2.5.0

## isNonEmpty

Test whether a `ReadonlyArray` is non empty.

**Signature**

```ts
export declare const isNonEmpty: <A>(as: readonly A[]) => as is RNEA.ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

# unsafe

## unsafeDeleteAt

**Signature**

```ts
export declare const unsafeDeleteAt: <A>(i: number, as: readonly A[]) => readonly A[]
```

Added in v2.5.0

## unsafeInsertAt

**Signature**

```ts
export declare const unsafeInsertAt: <A>(i: number, a: A, as: readonly A[]) => RNEA.ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## unsafeUpdateAt

**Signature**

```ts
export declare const unsafeUpdateAt: <A>(i: number, a: A, as: readonly A[]) => readonly A[]
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
) => (fa: readonly A[]) => readonly { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => readonly B[]
) => (ma: readonly A[]) => readonly { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: readonly A[]) => readonly { readonly [K in N]: A }[]
```

Added in v2.8.0

## deleteAt

Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature**

```ts
export declare const deleteAt: (i: number) => <A>(as: readonly A[]) => Option<readonly A[]>
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
export declare function elem<A>(E: Eq<A>): {
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
export declare function every<A, B extends A>(
  refinement: Refinement<A, B>
): Refinement<ReadonlyArray<A>, ReadonlyArray<B>>
export declare function every<A>(predicate: Predicate<A>): Predicate<ReadonlyArray<A>>
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

## exists

Alias of [`some`](#some)

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => (as: readonly A[]) => as is RNEA.ReadonlyNonEmptyArray<A>
```

Added in v2.11.0

## filterE

Filter values inside a context.

**Signature**

```ts
export declare const filterE: FilterE1<'ReadonlyArray'>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as T from 'fp-ts/Task'

const filterE = RA.filterE(T.ApplicativePar)
async function test() {
  assert.deepStrictEqual(
    await pipe(
      [-1, 2, 3],
      filterE((n) => T.of(n > 0))
    )(),
    [2, 3]
  )
}
test()
```

Added in v2.11.0

## findFirst

Find the first element which satisfies a predicate (or a refinement) function

**Signature**

```ts
export declare function findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Option<B>
export declare function findFirst<A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlyArray<B>) => Option<B>
export declare function findFirst<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
```

**Example**

```ts
import { findFirst } from 'fp-ts/ReadonlyArray'
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

Added in v2.5.0

## findFirstMap

Find the first element returned by an option based selector function

**Signature**

```ts
export declare const findFirstMap: <A, B>(f: (a: A) => Option<B>) => (as: readonly A[]) => Option<B>
```

**Example**

```ts
import { findFirstMap } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

interface Person {
  readonly name: string
  readonly age?: number
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
export declare const findIndex: <A>(predicate: Predicate<A>) => (as: readonly A[]) => Option<number>
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
export declare function findLast<A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlyArray<B>) => Option<B>
export declare function findLast<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
```

**Example**

```ts
import { findLast } from 'fp-ts/ReadonlyArray'
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

Added in v2.5.0

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
  readonly a: number
  readonly b: number
}
const xs: ReadonlyArray<X> = [
  { a: 1, b: 0 },
  { a: 1, b: 1 },
]
assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 1)(xs), some(1))
assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 4)(xs), none)
```

Added in v2.5.0

## findLastMap

Find the last element returned by an option based selector function

**Signature**

```ts
export declare const findLastMap: <A, B>(f: (a: A) => Option<B>) => (as: readonly A[]) => Option<B>
```

**Example**

```ts
import { findLastMap } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

interface Person {
  readonly name: string
  readonly age?: number
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
export declare const head: <A>(as: readonly A[]) => Option<A>
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
export declare const init: <A>(as: readonly A[]) => Option<readonly A[]>
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
export declare const insertAt: <A>(i: number, a: A) => (as: readonly A[]) => Option<RNEA.ReadonlyNonEmptyArray<A>>
```

**Example**

```ts
import { insertAt } from 'fp-ts/ReadonlyArray'
import { some } from 'fp-ts/Option'

assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
```

Added in v2.5.0

## intercalate

Places an element in between members of a `ReadonlyArray`, then folds the results using the provided `Monoid`.

**Signature**

```ts
export declare const intercalate: <A>(M: Monoid<A>) => (middle: A) => (as: readonly A[]) => A
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { intercalate } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
```

Added in v2.12.0

## isOutOfBound

Test whether an array contains a particular index

**Signature**

```ts
export declare const isOutOfBound: <A>(i: number, as: readonly A[]) => boolean
```

Added in v2.5.0

## last

Get the last element in an array, or `None` if the array is empty

**Signature**

```ts
export declare const last: <A>(as: readonly A[]) => Option<A>
```

**Example**

```ts
import { last } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(last([1, 2, 3]), some(3))
assert.deepStrictEqual(last([]), none)
```

Added in v2.5.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: readonly A[]) => readonly { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v2.13.0

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
export declare const modifyAt: <A>(i: number, f: (a: A) => A) => (as: readonly A[]) => Option<readonly A[]>
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

## size

Calculate the number of elements in a `ReadonlyArray`.

**Signature**

```ts
export declare const size: <A>(as: readonly A[]) => number
```

Added in v2.10.0

## some

Check if a predicate holds true for any array member.

**Signature**

```ts
export declare const some: <A>(predicate: Predicate<A>) => (as: readonly A[]) => as is RNEA.ReadonlyNonEmptyArray<A>
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
export declare function spanLeft<A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlyArray<B>) => Spanned<B, B>
export declare function spanLeft<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Spanned<A, A>
```

**Example**

```ts
import { spanLeft } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
```

Added in v2.5.0

## tail

Get all but the first element of an array, creating a new array, or `None` if the array is empty

**Signature**

```ts
export declare const tail: <A>(as: readonly A[]) => Option<readonly A[]>
```

**Example**

```ts
import { tail } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(tail([]), none)
```

Added in v2.5.0

## updateAt

Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

**Signature**

```ts
export declare const updateAt: <A>(i: number, a: A) => (as: readonly A[]) => Option<readonly A[]>
```

**Example**

```ts
import { updateAt } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
assert.deepStrictEqual(updateAt(1, 1)([]), none)
```

Added in v2.5.0
