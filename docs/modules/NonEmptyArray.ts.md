---
title: NonEmptyArray.ts
nav_order: 59
parent: Modules
---

## NonEmptyArray overview

Data structure which represents non-empty arrays

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
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [copy](#copy)
  - [duplicate](#duplicate)
  - [filter](#filter)
  - [flap](#flap)
  - [flatten](#flatten)
  - [group](#group)
  - [groupSort](#groupsort)
  - [intersperse](#intersperse)
  - [prependToAll](#prependtoall)
  - [reverse](#reverse)
  - [sort](#sort)
  - [zip](#zip)
  - [zipWith](#zipwith)
- [constructors](#constructors)
  - [concat](#concat)
  - [cons](#cons)
  - [fromArray](#fromarray)
  - [groupBy](#groupby)
  - [snoc](#snoc)
- [destructors](#destructors)
  - [uncons](#uncons)
  - [unsnoc](#unsnoc)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
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
  - [extract](#extract)
  - [filterWithIndex](#filterwithindex)
  - [fold](#fold)
  - [head](#head)
  - [init](#init)
  - [insertAt](#insertat)
  - [last](#last)
  - [max](#max)
  - [min](#min)
  - [modifyAt](#modifyat)
  - [sequence](#sequence)
  - [tail](#tail)
  - [traverse](#traverse)
  - [traverseWithIndex](#traversewithindex)
  - [unzip](#unzip)
  - [updateAt](#updateat)

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
export declare const altW: <B>(that: Lazy<NonEmptyArray<B>>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B | A>
```

Added in v2.9.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>
```

Added in v2.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (fa: NonEmptyArray<A>) => B) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: NonEmptyArray<A>) => S
```

Added in v2.0.0

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

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <S>(
  S: Semigroup<S>
) => <A>(f: (i: number, a: A) => S) => (fa: NonEmptyArray<A>) => S
```

Added in v2.0.0

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
export declare const map: <A, B>(f: (a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
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
export declare const apFirst: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

## copy

**Signature**

```ts
export declare function copy<A>(nea: NonEmptyArray<A>): NonEmptyArray<A>
```

Added in v2.0.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
```

Added in v2.0.0

## filter

**Signature**

```ts
export declare function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<B>>
export declare function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
```

Added in v2.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>
```

Added in v2.10.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A>
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
import { cons, group } from 'fp-ts/NonEmptyArray'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(group(N.Ord)([1, 2, 1, 1]), [cons(1, []), cons(2, []), cons(1, [1])])
```

Added in v2.0.0

## groupSort

Sort and then group the elements of an array into non empty arrays.

**Signature**

```ts
export declare const groupSort: <B>(
  O: Ord<B>
) => {
  <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  <A extends B>(as: A[]): NonEmptyArray<A>[]
}
```

**Example**

```ts
import { cons, groupSort } from 'fp-ts/NonEmptyArray'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(groupSort(N.Ord)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
```

Added in v2.0.0

## intersperse

Places an element in between members of an array

**Signature**

```ts
export declare const intersperse: <A>(e: A) => (as: NonEmptyArray<A>) => NonEmptyArray<A>
```

**Example**

```ts
import { cons, intersperse } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(intersperse(9)(cons(1, [2, 3, 4])), cons(1, [9, 2, 9, 3, 9, 4]))
```

Added in v2.9.0

## prependToAll

Prepend an element to every member of an array

**Signature**

```ts
export declare const prependToAll: <A>(e: A) => (xs: NonEmptyArray<A>) => NonEmptyArray<A>
```

**Example**

```ts
import { cons, prependToAll } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(prependToAll(9)(cons(1, [2, 3, 4])), cons(9, [1, 9, 2, 9, 3, 9, 4]))
```

Added in v2.9.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

## sort

**Signature**

```ts
export declare const sort: <B>(O: Ord<B>) => <A extends B>(nea: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

## zip

**Signature**

```ts
export declare const zip: {
  <B>(bs: NonEmptyArray<B>): <A>(as: NonEmptyArray<A>) => NonEmptyArray<[A, B]>
  <A, B>(as: NonEmptyArray<A>, bs: NonEmptyArray<B>): NonEmptyArray<[A, B]>
}
```

Added in v2.5.1

## zipWith

**Signature**

```ts
export declare const zipWith: <A, B, C>(
  fa: NonEmptyArray<A>,
  fb: NonEmptyArray<B>,
  f: (a: A, b: B) => C
) => NonEmptyArray<C>
```

Added in v2.5.1

# constructors

## concat

**Signature**

```ts
export declare function concat<A>(fx: Array<A>, fy: NonEmptyArray<A>): NonEmptyArray<A>
export declare function concat<A>(fx: NonEmptyArray<A>, fy: Array<A>): NonEmptyArray<A>
```

Added in v2.2.0

## cons

Append an element to the front of an array, creating a new non empty array

**Signature**

```ts
export declare const cons: <A>(head: A, tail: A[]) => NonEmptyArray<A>
```

**Example**

```ts
import { cons } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
```

Added in v2.0.0

## fromArray

Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array

**Signature**

```ts
export declare const fromArray: <A>(as: A[]) => Option<NonEmptyArray<A>>
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
import { cons, groupBy } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
  '3': cons('foo', ['bar']),
  '6': cons('foobar', []),
})
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
import { snoc } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
```

Added in v2.0.0

# destructors

## uncons

Produces a couple of the first element of the array, and a new array of the remaining elements, if any

**Signature**

```ts
export declare const uncons: <A>(nea: NonEmptyArray<A>) => readonly [A, A[]]
```

**Example**

```ts
import { cons, uncons } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(uncons(cons(1, [2, 3, 4])), [1, [2, 3, 4]])
```

Added in v2.9.0

## unsnoc

Produces a couple of a copy of the array without its last element, and that last element

**Signature**

```ts
export declare const unsnoc: <A>(nea: NonEmptyArray<A>) => readonly [A[], A]
```

**Example**

```ts
import { snoc, unsnoc } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(unsnoc(snoc([1, 2, 3], 4)), [[1, 2, 3], 4])
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
import { getEq, cons } from 'fp-ts/NonEmptyArray'
import * as N from 'fp-ts/number'

const E = getEq(N.Eq)
assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
```

Added in v2.0.0

## getSemigroup

Builds a `Semigroup` instance for `NonEmptyArray`

**Signature**

```ts
export declare const getSemigroup: <A = never>() => Semigroup<NonEmptyArray<A>>
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
export declare const apS: <A, N extends string, B>(
  name: Exclude<N, keyof A>,
  fb: NonEmptyArray<B>
) => (fa: NonEmptyArray<A>) => NonEmptyArray<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => NonEmptyArray<B>
) => (fa: NonEmptyArray<A>) => NonEmptyArray<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<{ [K in N]: A }>
```

Added in v2.8.0

## extract

**Signature**

```ts
export declare const extract: <A>(wa: NonEmptyArray<A>) => A
```

Added in v2.7.0

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: <A>(
  predicate: (i: number, a: A) => boolean
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
```

Added in v2.0.0

## fold

**Signature**

```ts
export declare const fold: <A>(S: Semigroup<A>) => (fa: NonEmptyArray<A>) => A
```

Added in v2.5.0

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
export declare const init: <A>(nea: NonEmptyArray<A>) => A[]
```

**Example**

```ts
import { init } from 'fp-ts/NonEmptyArray'

assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
assert.deepStrictEqual(init([1]), [])
```

Added in v2.2.0

## insertAt

**Signature**

```ts
export declare const insertAt: <A>(i: number, a: A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
```

Added in v2.0.0

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

## modifyAt

**Signature**

```ts
export declare const modifyAt: <A>(i: number, f: (a: A) => A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
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
export declare const tail: <A>(nea: NonEmptyArray<A>) => A[]
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

## unzip

**Signature**

```ts
export declare const unzip: <A, B>(as: NonEmptyArray<[A, B]>) => [NonEmptyArray<A>, NonEmptyArray<B>]
```

Added in v2.5.1

## updateAt

**Signature**

```ts
export declare const updateAt: <A>(i: number, a: A) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
```

Added in v2.0.0
