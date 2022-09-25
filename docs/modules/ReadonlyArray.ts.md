---
title: ReadonlyArray.ts
nav_order: 79
parent: Modules
---

## ReadonlyArray overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Extendable](#extendable)
  - [extend](#extend)
- [Filterable](#filterable)
  - [filterMap](#filtermap)
  - [partitionMap](#partitionmap)
- [FilterableE](#filterablee)
  - [filterMapE](#filtermape)
  - [partitionMapE](#partitionmape)
- [FilterableWithIndex](#filterablewithindex)
  - [filterMapWithIndex](#filtermapwithindex)
  - [partitionMapWithIndex](#partitionmapwithindex)
- [Flattenable](#flattenable)
  - [flatMap](#flatmap)
- [FlattenableRec](#flattenablerec)
  - [flatMapRecBreadthFirst](#flatmaprecbreadthfirst)
  - [flatMapRecDepthFirst](#flatmaprecdepthfirst)
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
- [MonoidK](#monoidk)
  - [emptyK](#emptyk)
- [Pointed](#pointed)
  - [of](#of)
- [SemigroupK](#semigroupk)
  - [combineK](#combinek)
- [Traversable](#traversable)
  - [traverse](#traverse)
- [TraversableWithIndex](#traversablewithindex)
  - [traverseWithIndex](#traversewithindex)
- [Unfoldable](#unfoldable)
  - [unfold](#unfold)
- [combinators](#combinators)
  - [chop](#chop)
  - [concat](#concat)
  - [difference](#difference)
  - [dropLeft](#dropleft)
  - [dropLeftWhile](#dropleftwhile)
  - [dropRight](#dropright)
  - [duplicate](#duplicate)
  - [filterE](#filtere)
  - [flap](#flap)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromOptionK](#fromoptionk)
  - [intersection](#intersection)
  - [intersperse](#intersperse)
  - [lefts](#lefts)
  - [partitionE](#partitione)
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
  - [tap](#tap)
  - [union](#union)
  - [uniq](#uniq)
  - [zip](#zip)
  - [zipLeftPar](#zipleftpar)
  - [zipRightPar](#ziprightpar)
  - [zipWith](#zipwith)
- [constructors](#constructors)
  - [append](#append)
  - [comprehension](#comprehension)
  - [fromPredicate](#frompredicate)
  - [fromRefinement](#fromrefinement)
  - [guard](#guard)
  - [makeBy](#makeby)
  - [prepend](#prepend)
  - [replicate](#replicate)
- [destructors](#destructors)
  - [match](#match)
  - [matchLeft](#matchleft)
  - [matchRight](#matchright)
- [guards](#guards)
  - [isNonEmpty](#isnonempty)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Compactable](#compactable-1)
  - [Extendable](#extendable-1)
  - [Filterable](#filterable-1)
  - [FilterableE](#filterablee-1)
  - [FilterableWithIndex](#filterablewithindex-1)
  - [Flattenable](#flattenable-1)
  - [FlattenableRecBreadthFirst](#flattenablerecbreadthfirst)
  - [FlattenableRecDepthFirst](#flattenablerecdepthfirst)
  - [Foldable](#foldable-1)
  - [FoldableWithIndex](#foldablewithindex-1)
  - [FromEither](#fromeither)
  - [FromOption](#fromoption)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [Monad](#monad)
  - [MonoidK](#monoidk-1)
  - [Pointed](#pointed-1)
  - [SemigroupK](#semigroupk-1)
  - [Traversable](#traversable-1)
  - [TraversableWithIndex](#traversablewithindex-1)
  - [Unfoldable](#unfoldable-1)
  - [getDifferenceMagma](#getdifferencemagma)
  - [getEq](#geteq)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getMonoid](#getmonoid)
  - [getOrd](#getord)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
- [interop](#interop)
  - [flatMapNullableK](#flatmapnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromOption](#fromoption)
- [type lambdas](#type-lambdas)
  - [ReadonlyArrayλ (interface)](#readonlyarray%CE%BB-interface)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apT](#apt)
  - [bind](#bind)
  - [bindPar](#bindpar)
  - [bindTo](#bindto)
  - [chunksOf](#chunksof)
  - [deleteAt](#deleteat)
  - [elem](#elem)
  - [empty](#empty)
  - [every](#every)
  - [exists](#exists)
  - [filter](#filter)
  - [filterWithIndex](#filterwithindex)
  - [findFirst](#findfirst)
  - [findFirstMap](#findfirstmap)
  - [findIndex](#findindex)
  - [findLast](#findlast)
  - [findLastIndex](#findlastindex)
  - [findLastMap](#findlastmap)
  - [flatMapWithIndex](#flatmapwithindex)
  - [head](#head)
  - [init](#init)
  - [insertAt](#insertat)
  - [intercalate](#intercalate)
  - [isEmpty](#isempty)
  - [isOutOfBound](#isoutofbound)
  - [last](#last)
  - [let](#let)
  - [lookup](#lookup)
  - [modifyAt](#modifyat)
  - [partition](#partition)
  - [partitionWithIndex](#partitionwithindex)
  - [sequence](#sequence)
  - [size](#size)
  - [some](#some)
  - [spanLeft](#spanleft)
  - [tail](#tail)
  - [takeRight](#takeright)
  - [tupled](#tupled)
  - [unit](#unit)
  - [unzip](#unzip)
  - [updateAt](#updateat)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: readonly A[]) => <B>(fab: readonly ((a: A) => B)[]) => readonly B[]
```

Added in v3.0.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(foa: readonly Option<A>[]) => readonly A[]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: readonly Either<A, B>[]) => readonly [readonly A[], readonly B[]]
```

Added in v3.0.0

# Extendable

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: readonly A[]) => B) => (wa: readonly A[]) => readonly B[]
```

Added in v3.0.0

# Filterable

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: readonly A[]) => readonly B[]
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: readonly A[]) => readonly [readonly B[], readonly C[]]
```

Added in v3.0.0

# FilterableE

## filterMapE

**Signature**

```ts
export declare const filterMapE: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, W, E, B>(
  f: (a: A) => Kind<F, S, R, W, E, Option<B>>
) => (ta: readonly A[]) => Kind<F, S, R, W, E, readonly B[]>
```

Added in v3.0.0

## partitionMapE

**Signature**

```ts
export declare const partitionMapE: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, W, E, B, C>(
  f: (a: A) => Kind<F, S, R, W, E, Either<B, C>>
) => (wa: readonly A[]) => Kind<F, S, R, W, E, readonly [readonly B[], readonly C[]]>
```

Added in v3.0.0

# FilterableWithIndex

## filterMapWithIndex

**Signature**

```ts
export declare const filterMapWithIndex: <A, B>(f: (i: number, a: A) => Option<B>) => (fa: readonly A[]) => readonly B[]
```

Added in v3.0.0

## partitionMapWithIndex

**Signature**

```ts
export declare const partitionMapWithIndex: <A, B, C>(
  f: (i: number, a: A) => Either<B, C>
) => (fa: readonly A[]) => readonly [readonly B[], readonly C[]]
```

Added in v3.0.0

# Flattenable

## flatMap

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => readonly B[]) => (ma: readonly A[]) => readonly B[]
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.flatMap((n) => [`a${n}`, `b${n}`])
  ),
  ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
)
assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.flatMap(() => [])
  ),
  []
)
```

Added in v3.0.0

# FlattenableRec

## flatMapRecBreadthFirst

**Signature**

```ts
export declare const flatMapRecBreadthFirst: <A, B>(f: (a: A) => readonly Either<A, B>[]) => (a: A) => readonly B[]
```

Added in v3.0.0

## flatMapRecDepthFirst

**Signature**

```ts
export declare const flatMapRecDepthFirst: <A, B>(f: (a: A) => readonly Either<A, B>[]) => (a: A) => readonly B[]
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

# MonoidK

## emptyK

**Signature**

```ts
export declare const emptyK: <A>() => readonly A[]
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => readonly A[]
```

Added in v3.0.0

# SemigroupK

## combineK

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `ReadonlyArray` concatenates the inputs into a single array.

**Signature**

```ts
export declare const combineK: <B>(second: LazyArg<readonly B[]>) => <A>(self: readonly A[]) => readonly (B | A)[]
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.combineK(() => [4, 5])
  ),
  [1, 2, 3, 4, 5]
)
```

Added in v3.0.0

# Traversable

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, W, E, B>(f: (a: A) => Kind<F, S, R, W, E, B>) => (as: readonly A[]) => Kind<F, S, R, W, E, readonly B[]>
```

Added in v3.0.0

# TraversableWithIndex

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, W, E, B>(
  f: (i: number, a: A) => Kind<F, S, R, W, E, B>
) => (ta: readonly A[]) => Kind<F, S, R, W, E, readonly B[]>
```

Added in v3.0.0

# Unfoldable

## unfold

**Signature**

```ts
export declare const unfold: <B, A>(b: B, f: (b: B) => Option<readonly [A, B]>) => readonly A[]
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
  f: (as: readonly [A, ...A[]]) => readonly [B, readonly A[]]
) => (as: readonly A[]) => readonly B[]
```

**Example**

```ts
import { Eq } from 'fp-ts/Eq'
import * as N from 'fp-ts/number'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

const group = <A>(E: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
  return RA.chop((as) => pipe(as, RA.spanLeft(E.equals(as[0]))))
}
assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
```

Added in v3.0.0

## concat

**Signature**

```ts
export declare const concat: <B>(second: readonly B[]) => <A>(self: readonly A[]) => readonly (B | A)[]
```

Added in v3.0.0

## difference

Creates a `ReadonlyArray` of values not included in the other given `ReadonlyArray` using a `Eq` for equality
comparisons. The order and references of result values are determined by the first `ReadonlyArray`.

**Signature**

```ts
export declare const difference: <A>(E: eq.Eq<A>) => (that: readonly A[]) => (self: readonly A[]) => readonly A[]
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

Added in v3.0.0

## dropLeftWhile

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `ReadonlyArray`.

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

Added in v3.0.0

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

Added in v3.0.0

## duplicate

Derivable from `Extendable`.

**Signature**

```ts
export declare const duplicate: <A>(wa: readonly A[]) => readonly (readonly A[])[]
```

Added in v3.0.0

## filterE

Filter values inside a context.

**Signature**

```ts
export declare const filterE: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <B extends A, S, R, W, E, A = B>(
  predicate: (a: A) => Kind<F, S, R, W, E, boolean>
) => (self: readonly B[]) => Kind<F, S, R, W, E, readonly B[]>
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

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: readonly ((a: A) => B)[]) => readonly B[]
```

Added in v3.0.0

## flatten

Removes one level of nesting

Derivable from `Flattenable`.

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

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => readonly B[]
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B>(
  f: (...a: A) => Option<B>
) => (...a: A) => readonly B[]
```

Added in v3.0.0

## intersection

Creates a `ReadonlyArray` of unique values that are included in all given `ReadonlyArray`s using a `Eq` for equality
comparisons. The order and references of result values are determined by the first `ReadonlyArray`.

**Signature**

```ts
export declare const intersection: <A>(E: eq.Eq<A>) => (that: readonly A[]) => (self: readonly A[]) => readonly A[]
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
export declare const intersperse: <A>(middle: A) => (as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { intersperse } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3, 4], intersperse(9)), [1, 9, 2, 9, 3, 9, 4])
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

## partitionE

**Signature**

```ts
export declare const partitionE: <λ extends TypeLambda>(
  Applicativeλ: applicative.Applicative<λ>
) => <B extends A, S, R, O, E, A = B>(
  predicateK: (a: A) => Kind<λ, S, R, O, E, boolean>
) => (self: readonly B[]) => Kind<λ, S, R, O, E, readonly [readonly B[], readonly B[]]>
```

Added in v3.0.0

## prependAll

Prepend an element to every member of a `ReadonlyArray`

**Signature**

```ts
export declare const prependAll: <A>(middle: A) => (as: readonly A[]) => readonly A[]
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

Rotate a `ReadonlyArray` by `n` steps.

**Signature**

```ts
export declare const rotate: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { rotate } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
```

Added in v3.0.0

## scanLeft

Fold a `ReadonlyArray` from the left, keeping all intermediate results instead of only the final result.

**Signature**

```ts
export declare const scanLeft: <B, A>(b: B, f: (b: B, a: A) => B) => (as: readonly A[]) => readonly [B, ...B[]]
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
export declare const scanRight: <B, A>(b: B, f: (a: A, b: B) => B) => (as: readonly A[]) => readonly [B, ...B[]]
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
export declare const sort: <B>(O: ord.Ord<B>) => <A extends B>(as: readonly A[]) => readonly A[]
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
export declare const sortBy: <B>(ords: readonly ord.Ord<B>[]) => <A extends B>(as: readonly A[]) => readonly A[]
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

Added in v3.0.0

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

Added in v3.0.0

## takeLeftWhile

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `ReadonlyArray`.

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

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, _>(f: (a: A) => readonly _[]) => (self: readonly A[]) => readonly A[]
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.tap(() => ['a', 'b'])
  ),
  [1, 1, 2, 2, 3, 3]
)
assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.tap(() => [])
  ),
  []
)
```

Added in v3.0.0

## union

Creates a `ReadonlyArray` of unique values, in order, from all given `ReadonlyArray`s using a `Eq` for equality comparisons.

**Signature**

```ts
export declare const union: <A>(E: eq.Eq<A>) => (that: readonly A[]) => (self: readonly A[]) => readonly A[]
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
export declare const uniq: <A>(E: eq.Eq<A>) => (as: readonly A[]) => readonly A[]
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

## zipLeftPar

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const zipLeftPar: <B>(second: readonly B[]) => <A>(self: readonly A[]) => readonly A[]
```

Added in v3.0.0

## zipRightPar

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const zipRightPar: <B>(second: readonly B[]) => <A>(self: readonly A[]) => readonly B[]
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

## append

Append an element to the end of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const append: <B>(end: B) => <A>(init: readonly A[]) => readonly [B | A, ...(B | A)[]]
```

**Example**

```ts
import { append } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
```

Added in v3.0.0

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
import { tuple } from 'fp-ts/tuple'

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

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => readonly B[]
```

Added in v3.0.0

## fromRefinement

**Signature**

```ts
export declare const fromRefinement: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (c: C) => readonly B[]
```

Added in v3.0.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => ReadonlyArray<void>
```

Added in v3.0.0

## makeBy

Return a `ReadonlyArray` of length `n` with element `i` initialized with `f(i)`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const makeBy: <A>(f: (i: number) => A) => (n: number) => readonly A[]
```

**Example**

```ts
import { makeBy } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

const double = (n: number): number => n * 2
assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
```

Added in v3.0.0

## prepend

Prepend an element to the front of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.

**Signature**

```ts
export declare const prepend: <B>(head: B) => <A>(tail: readonly A[]) => readonly [B | A, ...(B | A)[]]
```

**Example**

```ts
import { prepend } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe([1, 2, 3], prepend(0)), [0, 1, 2, 3])
```

Added in v3.0.0

## replicate

Create a `ReadonlyArray` containing a value repeated the specified number of times.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const replicate: <A>(a: A) => (n: number) => readonly A[]
```

**Example**

```ts
import { replicate } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
```

Added in v3.0.0

# destructors

## match

**Signature**

```ts
export declare const match: <B, A, C = B>(
  onEmpty: LazyArg<B>,
  onNonEmpty: (as: readonly [A, ...A[]]) => C
) => (as: readonly A[]) => B | C
```

Added in v3.0.0

## matchLeft

Break a `ReadonlyArray` into its first element and remaining elements.

**Signature**

```ts
export declare const matchLeft: <B, A, C = B>(
  onEmpty: LazyArg<B>,
  onNonEmpty: (head: A, tail: readonly A[]) => C
) => (as: readonly A[]) => B | C
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

Break a `ReadonlyArray` into its initial elements and the last element.

**Signature**

```ts
export declare const matchRight: <B, A, C = B>(
  onEmpty: LazyArg<B>,
  onNonEmpty: (init: readonly A[], last: A) => C
) => (as: readonly A[]) => B | C
```

Added in v3.0.0

# guards

## isNonEmpty

Test whether a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`

**Signature**

```ts
export declare const isNonEmpty: <A>(as: readonly A[]) => as is readonly [A, ...A[]]
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ReadonlyArrayλ>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<ReadonlyArrayλ>
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: compactable.Compactable<ReadonlyArrayλ>
```

Added in v3.0.0

## Extendable

**Signature**

```ts
export declare const Extendable: extendable.Extendable<ReadonlyArrayλ>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: filterable.Filterable<ReadonlyArrayλ>
```

Added in v3.0.0

## FilterableE

**Signature**

```ts
export declare const FilterableE: filterableE.FilterableE<ReadonlyArrayλ>
```

Added in v3.0.0

## FilterableWithIndex

**Signature**

```ts
export declare const FilterableWithIndex: filterableWithIndex.FilterableWithIndex<ReadonlyArrayλ, number>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<ReadonlyArrayλ>
```

Added in v3.0.0

## FlattenableRecBreadthFirst

**Signature**

```ts
export declare const FlattenableRecBreadthFirst: flattenableRec.FlattenableRec<ReadonlyArrayλ>
```

Added in v3.0.0

## FlattenableRecDepthFirst

**Signature**

```ts
export declare const FlattenableRecDepthFirst: flattenableRec.FlattenableRec<ReadonlyArrayλ>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<ReadonlyArrayλ>
```

Added in v3.0.0

## FoldableWithIndex

**Signature**

```ts
export declare const FoldableWithIndex: foldableWithIndex.FoldableWithIndex<ReadonlyArrayλ, number>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<ReadonlyArrayλ>
```

Added in v3.0.0

## FromOption

**Signature**

```ts
export declare const FromOption: fromOption_.FromOption<ReadonlyArrayλ>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReadonlyArrayλ>
```

Added in v3.0.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: functorWithIndex.FunctorWithIndex<ReadonlyArrayλ, number>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad_<ReadonlyArrayλ>
```

Added in v3.0.0

## MonoidK

**Signature**

```ts
export declare const MonoidK: monoidK.MonoidK<ReadonlyArrayλ>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<ReadonlyArrayλ>
```

Added in v3.0.0

## SemigroupK

**Signature**

```ts
export declare const SemigroupK: semigroupK.SemigroupK<ReadonlyArrayλ>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<ReadonlyArrayλ>
```

Added in v3.0.0

## TraversableWithIndex

**Signature**

```ts
export declare const TraversableWithIndex: traversableWithIndex.TraversableWithIndex<ReadonlyArrayλ, number>
```

Added in v3.0.0

## Unfoldable

**Signature**

```ts
export declare const Unfoldable: unfoldable.Unfoldable<ReadonlyArrayλ>
```

Added in v3.0.0

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <A>(E: eq.Eq<A>) => Magma<readonly A[]>
```

Added in v3.0.0

## getEq

Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
`ReadonlyArray`s as equal if all elements of both `ReadonlyArray`s are compared equal pairwise with the given `E`. In case of `ReadonlyArray`s of
different lengths, the result is non equality.

**Signature**

```ts
export declare const getEq: <A>(E: eq.Eq<A>) => eq.Eq<readonly A[]>
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

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(E: eq.Eq<A>) => Semigroup<readonly A[]>
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
export declare const getOrd: <A>(O: ord.Ord<A>) => ord.Ord<readonly A[]>
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
export declare const getSemigroup: <A = never>() => Semigroup<readonly A[]>
```

**Example**

```ts
import { getSemigroup } from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'

const S = getSemigroup<number>()
assert.deepStrictEqual(pipe([1, 2], S.combine([3, 4])), [1, 2, 3, 4])
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<readonly A[]>
```

Added in v3.0.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <A>(E: eq.Eq<A>) => Monoid<readonly A[]>
```

Added in v3.0.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(E: eq.Eq<A>) => Semigroup<readonly A[]>
```

Added in v3.0.0

# interop

## flatMapNullableK

**Signature**

```ts
export declare const flatMapNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: readonly A[]) => readonly NonNullable<B>[]
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => readonly NonNullable<A>[]
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => readonly NonNullable<B>[]
```

Added in v3.0.0

# natural transformations

## fromEither

Transforms an `Either` to a `ReadonlyArray`.

**Signature**

```ts
export declare const fromEither: <A>(fa: Either<unknown, A>) => readonly A[]
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(fa: Option<A>) => readonly A[]
```

Added in v3.0.0

# type lambdas

## ReadonlyArrayλ (interface)

**Signature**

```ts
export interface ReadonlyArrayλ extends TypeLambda {
  readonly type: ReadonlyArray<this['Out1']>
}
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

## apT

**Signature**

```ts
export declare const apT: <B>(
  fb: readonly B[]
) => <A extends readonly unknown[]>(fas: readonly A[]) => readonly (readonly [...A, B])[]
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => readonly B[]
) => (ma: readonly A[]) => readonly { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v3.0.0

## bindPar

**Signature**

```ts
export declare const bindPar: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: readonly B[]
) => (fa: readonly A[]) => readonly { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(fa: readonly A[]) => readonly { readonly [K in N]: A }[]
```

Added in v3.0.0

## chunksOf

Splits a `ReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the `ReadonlyArray`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that

```ts
chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
```

whenever `n` evenly divides the length of `as`.

**Signature**

```ts
export declare const chunksOf: (n: number) => <A>(as: readonly A[]) => readonly (readonly [A, ...A[]])[]
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
export declare const deleteAt: (i: number) => <A>(as: readonly A[]) => Option<readonly A[]>
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
export declare const elem: <A>(E: eq.Eq<A>) => (a: A) => (as: readonly A[]) => boolean
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

Added in v3.0.0

## exists

Alias of [`some`](#some)

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => (as: readonly A[]) => as is readonly [A, ...A[]]
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: readonly C[]) => readonly B[]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: readonly B[]) => readonly B[]
}
```

Added in v3.0.0

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: {
  <C extends A, B extends A, A = C>(refinement: (i: number, a: A) => a is B): (fc: readonly C[]) => readonly B[]
  <B extends A, A = B>(predicate: (i: number, a: A) => boolean): (fb: readonly B[]) => readonly B[]
}
```

Added in v3.0.0

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
export declare const findFirstMap: <A, B>(f: (a: A) => Option<B>) => (as: readonly A[]) => Option<B>
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
export declare function findLast<A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlyArray<B>) => Option<B>
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
export declare const findLastMap: <A, B>(f: (a: A) => Option<B>) => (as: readonly A[]) => Option<B>
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

## flatMapWithIndex

**Signature**

```ts
export declare const flatMapWithIndex: <A, B>(
  f: (i: number, a: A) => readonly B[]
) => (as: readonly A[]) => readonly B[]
```

Added in v3.0.0

## head

Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

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

Added in v3.0.0

## init

Get all but the last element of a `ReadonlyArray`, creating a new `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

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

Added in v3.0.0

## insertAt

Insert an element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out of bounds.

**Signature**

```ts
export declare const insertAt: <A>(i: number, a: A) => (as: readonly A[]) => Option<readonly [A, ...A[]]>
```

**Example**

```ts
import { insertAt } from 'fp-ts/ReadonlyArray'
import { some } from 'fp-ts/Option'

assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
```

Added in v3.0.0

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

Added in v3.0.0

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

Added in v3.0.0

## isOutOfBound

Test whether a `ReadonlyArray` contains a particular index

**Signature**

```ts
export declare const isOutOfBound: <A>(i: number, as: readonly A[]) => boolean
```

Added in v3.0.0

## last

Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

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

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: readonly A[]) => readonly { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v3.0.0

## lookup

This function provides a safe way to read a value at a particular index from a `ReadonlyArray`

**Signature**

```ts
export declare const lookup: (i: number) => <A>(as: readonly A[]) => Option<A>
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
export declare const modifyAt: <A>(i: number, f: Endomorphism<A>) => (as: readonly A[]) => Option<readonly A[]>
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

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: readonly C[]
  ) => readonly [readonly C[], readonly B[]]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: readonly B[]) => readonly [readonly B[], readonly B[]]
}
```

Added in v3.0.0

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: {
  <C extends A, B extends A, A = C>(refinement: (i: number, a: A) => a is B): (
    fb: readonly C[]
  ) => readonly [readonly C[], readonly B[]]
  <B extends A, A = B>(predicate: (i: number, a: A) => boolean): (
    fb: readonly B[]
  ) => readonly [readonly B[], readonly B[]]
}
```

Added in v3.0.0

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <S, R, W, E, A>(fas: readonly Kind<F, S, R, W, E, A>[]) => Kind<F, S, R, W, E, readonly A[]>
```

Added in v3.0.0

## size

Calculate the number of elements in a `ReadonlyArray`.

**Signature**

```ts
export declare const size: <A>(as: readonly A[]) => number
```

Added in v3.0.0

## some

Check if a predicate holds true for any `ReadonlyArray` member.

**Signature**

```ts
export declare const some: <A>(predicate: Predicate<A>) => (as: readonly A[]) => as is readonly [A, ...A[]]
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
export declare function spanLeft<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyArray<A>) => readonly [init: ReadonlyArray<B>, rest: ReadonlyArray<A>]
export declare function spanLeft<A>(
  predicate: Predicate<A>
): <B extends A>(bs: ReadonlyArray<B>) => readonly [init: ReadonlyArray<B>, rest: ReadonlyArray<B>]
export declare function spanLeft<A>(
  predicate: Predicate<A>
): (as: ReadonlyArray<A>) => readonly [init: ReadonlyArray<A>, rest: ReadonlyArray<A>]
```

**Example**

```ts
import { spanLeft } from 'fp-ts/ReadonlyArray'

assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [
  [1, 3],
  [2, 4, 5],
])
```

Added in v3.0.0

## tail

Get all but the first element of a `ReadonlyArray`, creating a new `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

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

Added in v3.0.0

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

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(fa: readonly A[]) => readonly (readonly [A])[]
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: readonly void[]
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
export declare const updateAt: <A>(i: number, a: A) => (as: readonly A[]) => Option<readonly A[]>
```

**Example**

```ts
import { updateAt } from 'fp-ts/ReadonlyArray'
import { some, none } from 'fp-ts/Option'

assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
assert.deepStrictEqual(updateAt(1, 1)([]), none)
```

Added in v3.0.0
