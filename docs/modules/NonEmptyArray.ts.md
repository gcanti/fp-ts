---
title: NonEmptyArray.ts
nav_order: 61
parent: Modules
---

## NonEmptyArray overview

Data structure which represents non-empty arrays.

```ts
export type NonEmptyArray<A> = Array<A> & {
  0: A
}
```

Note that you don't need any conversion, a `NonEmptyArray` is an `Array`,
so all `Array`'s APIs can be used with a `NonEmptyArray` without further ado.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Apply](#apply)
  - [ap](#ap)
- [Extend](#extend)
  - [extend](#extend)
- [Foldable](#foldable)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [FoldableWithIndex](#foldablewithindex)
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
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [chainWithIndex](#chainwithindex)
  - [chop](#chop)
  - [chunksOf](#chunksof)
  - [concat](#concat)
  - [copy](#copy)
  - [duplicate](#duplicate)
  - [flap](#flap)
  - [flatten](#flatten)
  - [foldMap](#foldmap)
  - [foldMapWithIndex](#foldmapwithindex)
  - [group](#group)
  - [groupBy](#groupby)
  - [groupSort](#groupsort)
  - [insertAt](#insertat)
  - [intersperse](#intersperse)
  - [modifyAt](#modifyat)
  - [prependAll](#prependall)
  - [reverse](#reverse)
  - [sort](#sort)
  - [splitAt](#splitat)
  - [unzip](#unzip)
  - [updateAt](#updateat)
  - [zip](#zip)
  - [zipWith](#zipwith)
  - [~~filterWithIndex~~](#filterwithindex)
  - [~~filter~~](#filter)
  - [~~prependToAll~~](#prependtoall)
- [constructors](#constructors)
  - [fromArray](#fromarray)
  - [fromReadonlyNonEmptyArray](#fromreadonlynonemptyarray)
  - [~~cons~~](#cons)
  - [~~snoc~~](#snoc)
- [destructors](#destructors)
  - [unappend](#unappend)
  - [unprepend](#unprepend)
  - [~~uncons~~](#uncons)
  - [~~unsnoc~~](#unsnoc)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Chain](#chain)
  - [Comonad](#comonad)
  - [Foldable](#foldable-1)
  - [FoldableWithIndex](#foldablewithindex-1)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [Monad](#monad-1)
  - [Pointed](#pointed-1)
  - [Traversable](#traversable)
  - [TraversableWithIndex](#traversablewithindex)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getEq](#geteq)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [~~nonEmptyArray~~](#nonemptyarray)
- [model](#model)
  - [NonEmptyArray (interface)](#nonemptyarray-interface)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [concatAll](#concatall)
  - [extract](#extract)
  - [head](#head)
  - [init](#init)
  - [last](#last)
  - [max](#max)
  - [min](#min)
  - [sequence](#sequence)
  - [tail](#tail)
  - [traverse](#traverse)
  - [traverseWithIndex](#traversewithindex)
  - [~~fold~~](#fold)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <A>(that: Lazy<NonEmptyArray<A>>) => (fa: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.6.2

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <B>(that: Lazy<NonEmptyArray<B>>) => <A>(as: NonEmptyArray<A>) => NonEmptyArray<B | A>
```

Added in v2.9.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(as: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>
```

Added in v2.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (as: NonEmptyArray<A>) => B) => (as: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# Foldable

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0

# FoldableWithIndex

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (as: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (as: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => NonEmptyArray<A>
```

Added in v2.0.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: NonEmptyArray<B>) => <A>(first: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.5.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: NonEmptyArray<B>) => <A>(first: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.5.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => NonEmptyArray<B>) => (first: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.5.0

## chainWithIndex

**Signature**

```ts
export declare const chainWithIndex: <A, B>(
  f: (i: number, a: A) => NonEmptyArray<B>
) => (as: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.10.0

## chop

**Signature**

```ts
export declare const chop: <A, B>(f: (as: NonEmptyArray<A>) => [B, A[]]) => (as: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.10.0

## chunksOf

**Signature**

```ts
export declare const chunksOf: (n: number) => <A>(as: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
```

Added in v2.10.0

## concat

**Signature**

```ts
export declare function concat<A>(first: Array<A>, second: NonEmptyArray<A>): NonEmptyArray<A>
export declare function concat<A>(first: NonEmptyArray<A>, second: Array<A>): NonEmptyArray<A>
```

Added in v2.2.0

## copy

**Signature**

```ts
export declare const copy: <A>(as: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
```

Added in v2.5.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>
```

Added in v2.10.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A>
```

Added in v2.5.0

## foldMap

**Signature**

```ts
export declare const foldMap: <S>(S: Se.Semigroup<S>) => <A>(f: (a: A) => S) => (fa: NonEmptyArray<A>) => S
```

Added in v2.0.0

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <S>(
  S: Se.Semigroup<S>
) => <A>(f: (i: number, a: A) => S) => (fa: NonEmptyArray<A>) => S
```

Added in v2.0.0

## group

Group equal, consecutive elements of an array into non empty arrays.

**Signature**

```ts
export declare function group<B>(
  E: Eq<B>
): {
  <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  <A extends B>(as: Array<A>): Array<NonEmptyArray<A>>
}
```

**Example**

```ts
import { group } from 'fp-ts/NonEmptyArray'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(group(N.Ord)([1, 2, 1, 1]), [[1], [2], [1, 1]])
```

Added in v2.0.0

## groupBy

Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

**Signature**

```ts
export declare const groupBy: <A>(f: (a: A) => string) => (as: A[]) => Record<string, NonEmptyArray<A>>
```

**Example**

```ts
import { groupBy } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
  '1': ['a', 'b'],
  '2': ['ab'],
})
```

Added in v2.0.0

## groupSort

Sort and then group the elements of an array into non empty arrays.

**Signature**

```ts
export declare function groupSort<B>(
  O: Ord<B>
): {
  <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  <A extends B>(as: Array<A>): Array<NonEmptyArray<A>>
}
```

**Example**

```ts
import { groupSort } from 'fp-ts/NonEmptyArray'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(groupSort(N.Ord)([1, 2, 1, 1]), [[1, 1, 1], [2]])
```

Added in v2.0.0

## insertAt

**Signature**

```ts
export declare const insertAt: <A>(i: number, a: A) => (as: A[]) => O.Option<NonEmptyArray<A>>
```

Added in v2.0.0

## intersperse

Places an element in between members of an array

**Signature**

```ts
export declare const intersperse: <A>(middle: A) => (as: NonEmptyArray<A>) => NonEmptyArray<A>
```

**Example**

```ts
import { intersperse } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
```

Added in v2.9.0

## modifyAt

**Signature**

```ts
export declare const modifyAt: <A>(i: number, f: (a: A) => A) => (as: NonEmptyArray<A>) => O.Option<NonEmptyArray<A>>
```

Added in v2.0.0

## prependAll

Prepend an element to every member of an array

**Signature**

```ts
export declare const prependAll: <A>(middle: A) => (as: NonEmptyArray<A>) => NonEmptyArray<A>
```

**Example**

```ts
import { prependAll } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
```

Added in v2.10.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(as: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

## sort

**Signature**

```ts
export declare const sort: <B>(O: Ord<B>) => <A extends B>(as: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

## splitAt

Splits a `NonEmptyArray` into two pieces, the first piece has max `n` elements.

**Signature**

```ts
export declare const splitAt: (n: number) => <A>(as: NonEmptyArray<A>) => [NonEmptyArray<A>, A[]]
```

Added in v2.10.0

## unzip

**Signature**

```ts
export declare const unzip: <A, B>(abs: NonEmptyArray<[A, B]>) => [NonEmptyArray<A>, NonEmptyArray<B>]
```

Added in v2.5.1

## updateAt

**Signature**

```ts
export declare const updateAt: <A>(i: number, a: A) => (as: NonEmptyArray<A>) => O.Option<NonEmptyArray<A>>
```

Added in v2.0.0

## zip

**Signature**

```ts
export declare function zip<B>(bs: NonEmptyArray<B>): <A>(as: NonEmptyArray<A>) => NonEmptyArray<[A, B]>
export declare function zip<A, B>(as: NonEmptyArray<A>, bs: NonEmptyArray<B>): NonEmptyArray<[A, B]>
```

Added in v2.5.1

## zipWith

**Signature**

```ts
export declare const zipWith: <A, B, C>(
  as: NonEmptyArray<A>,
  bs: NonEmptyArray<B>,
  f: (a: A, b: B) => C
) => NonEmptyArray<C>
```

Added in v2.5.1

## ~~filterWithIndex~~

Use [`filterWithIndex`](./Array.ts.html#filterWithIndex) instead.

**Signature**

```ts
export declare const filterWithIndex: <A>(
  predicate: (i: number, a: A) => boolean
) => (as: NonEmptyArray<A>) => O.Option<NonEmptyArray<A>>
```

Added in v2.0.0

## ~~filter~~

Use [`filter`](./Array.ts.html#filter) instead.

**Signature**

```ts
export declare function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (as: NonEmptyArray<A>) => Option<NonEmptyArray<B>>
export declare function filter<A>(predicate: Predicate<A>): (as: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
```

Added in v2.0.0

## ~~prependToAll~~

Use [`prependAll`](#prependall) instead.

**Signature**

```ts
export declare const prependToAll: <A>(middle: A) => (as: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.9.0

# constructors

## fromArray

Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array

**Signature**

```ts
export declare const fromArray: <A>(as: A[]) => O.Option<NonEmptyArray<A>>
```

Added in v2.0.0

## fromReadonlyNonEmptyArray

**Signature**

```ts
export declare const fromReadonlyNonEmptyArray: <A>(as: RNEA.ReadonlyNonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.10.0

## ~~cons~~

Use [`prepend`](./Array.ts.html#prepend) instead.

**Signature**

```ts
export declare function cons<A>(head: A): (tail: Array<A>) => NonEmptyArray<A>
export declare function cons<A>(head: A, tail: Array<A>): NonEmptyArray<A>
```

Added in v2.0.0

## ~~snoc~~

Use [`append`](./Array.ts.html#append) instead.

**Signature**

```ts
export declare const snoc: <A>(init: A[], end: A) => NonEmptyArray<A>
```

Added in v2.0.0

# destructors

## unappend

Return the tuple of the `init` and the `last`.

**Signature**

```ts
export declare const unappend: <A>(as: NonEmptyArray<A>) => [A[], A]
```

**Example**

```ts
import { unappend } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
```

Added in v2.9.0

## unprepend

Return the tuple of the `head` and the `tail`.

**Signature**

```ts
export declare const unprepend: <A>(as: NonEmptyArray<A>) => [A, A[]]
```

**Example**

```ts
import { unprepend } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(unprepend([1, 2, 3]), [1, [2, 3]])
```

Added in v2.9.0

## ~~uncons~~

Use [`unprepend`](#unprepend) instead.

**Signature**

```ts
export declare const uncons: <A>(as: NonEmptyArray<A>) => [A, A[]]
```

Added in v2.9.0

## ~~unsnoc~~

Use [`unappend`](#unappend) instead.

**Signature**

```ts
export declare const unsnoc: <A>(as: NonEmptyArray<A>) => [A[], A]
```

Added in v2.9.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'NonEmptyArray'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'NonEmptyArray'>
```

Added in v2.7.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'NonEmptyArray'>
```

Added in v2.10.0

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'NonEmptyArray'>
```

Added in v2.10.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad1<'NonEmptyArray'>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'NonEmptyArray'>
```

Added in v2.7.0

## FoldableWithIndex

**Signature**

```ts
export declare const FoldableWithIndex: FoldableWithIndex1<'NonEmptyArray', number>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'NonEmptyArray'>
```

Added in v2.7.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'NonEmptyArray', number>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'NonEmptyArray'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'NonEmptyArray'>
```

Added in v2.10.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'NonEmptyArray'>
```

Added in v2.7.0

## TraversableWithIndex

**Signature**

```ts
export declare const TraversableWithIndex: TraversableWithIndex1<'NonEmptyArray', number>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'NonEmptyArray'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<NonEmptyArray<A>>
```

**Example**

```ts
import { getEq } from 'fp-ts/NonEmptyArray'
import * as N from 'fp-ts/number'

const E = getEq(N.Eq)
assert.strictEqual(E.equals([1, 2], [1, 2]), true)
assert.strictEqual(E.equals([1, 2], [1, 3]), false)
```

Added in v2.0.0

## getSemigroup

Builds a `Semigroup` instance for `NonEmptyArray`

**Signature**

```ts
export declare const getSemigroup: <A = never>() => Se.Semigroup<NonEmptyArray<A>>
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<NonEmptyArray<A>>
```

Added in v2.0.0

## ~~nonEmptyArray~~

Use small, specific instances instead.

**Signature**

```ts
export declare const nonEmptyArray: Monad1<'NonEmptyArray'> &
  Comonad1<'NonEmptyArray'> &
  TraversableWithIndex1<'NonEmptyArray', number> &
  FunctorWithIndex1<'NonEmptyArray', number> &
  FoldableWithIndex1<'NonEmptyArray', number> &
  Alt1<'NonEmptyArray'>
```

Added in v2.0.0

# model

## NonEmptyArray (interface)

**Signature**

```ts
export interface NonEmptyArray<A> extends Array<A> {
  // tslint:disable-next-line: readonly-keyword
  0: A
}
```

Added in v2.0.0

# utils

## Do

**Signature**

```ts
export declare const Do: NonEmptyArray<{}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: NonEmptyArray<B>
) => (fa: NonEmptyArray<A>) => NonEmptyArray<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => NonEmptyArray<B>
) => (ma: NonEmptyArray<A>) => NonEmptyArray<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<{ readonly [K in N]: A }>
```

Added in v2.8.0

## concatAll

**Signature**

```ts
export declare const concatAll: <A>(S: Se.Semigroup<A>) => (as: NonEmptyArray<A>) => A
```

Added in v2.10.0

## extract

**Signature**

```ts
export declare const extract: <A>(wa: NonEmptyArray<A>) => A
```

Added in v2.7.0

## head

**Signature**

```ts
export declare const head: <A>(nea: NonEmptyArray<A>) => A
```

Added in v2.0.0

## init

Get all but the last element of a non empty array, creating a new array.

**Signature**

```ts
export declare const init: <A>(as: NonEmptyArray<A>) => A[]
```

**Example**

```ts
import { init } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
assert.deepStrictEqual(init([1]), [])
```

Added in v2.2.0

## last

**Signature**

```ts
export declare const last: <A>(nea: NonEmptyArray<A>) => A
```

Added in v2.0.0

## max

**Signature**

```ts
export declare const max: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A
```

Added in v2.0.0

## min

**Signature**

```ts
export declare const min: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A
```

Added in v2.0.0

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'NonEmptyArray'>
```

Added in v2.6.3

## tail

**Signature**

```ts
export declare const tail: <A>(as: NonEmptyArray<A>) => A[]
```

Added in v2.0.0

## traverse

**Signature**

```ts
export declare const traverse: PipeableTraverse1<'NonEmptyArray'>
```

Added in v2.6.3

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: PipeableTraverseWithIndex1<'NonEmptyArray', number>
```

Added in v2.6.3

## ~~fold~~

Use [`concatAll`](#concatall) instead.

**Signature**

```ts
export declare const fold: <A>(S: Se.Semigroup<A>) => (fa: NonEmptyArray<A>) => A
```

Added in v2.5.0
