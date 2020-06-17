---
title: NonEmptyArray.ts
nav_order: 56
parent: Modules
---

## NonEmptyArray overview

Data structure which represents non-empty arrays

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Extend](#extend)
  - [duplicate](#duplicate)
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
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [combinators](#combinators)
  - [copy](#copy)
  - [filter](#filter)
  - [group](#group)
  - [groupSort](#groupsort)
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
- [instances](#instances)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getEq](#geteq)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [nonEmptyArray](#nonemptyarray)
- [model](#model)
  - [NonEmptyArray (interface)](#nonemptyarray-interface)
- [utils](#utils)
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

# Applicative

## of

**Signature**

```ts
export declare const of: <A>(a: A) => NonEmptyArray<A>
```

Added in v2.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# Extend

## duplicate

**Signature**

```ts
export declare const duplicate: <A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
```

Added in v2.0.0

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

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A>
```

Added in v2.0.0

# combinators

## copy

**Signature**

```ts
export declare function copy<A>(nea: NonEmptyArray<A>): NonEmptyArray<A>
```

Added in v2.0.0

## filter

**Signature**

```ts
export declare function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export declare function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
```

Added in v2.0.0

## group

Group equal, consecutive elements of an array into non empty arrays.

**Signature**

```ts
export declare function group<A>(
  E: Eq<A>
): {
  (as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  (as: Array<A>): Array<NonEmptyArray<A>>
}
```

**Example**

```ts
import { cons, group } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [cons(1, []), cons(2, []), cons(1, [1])])
```

Added in v2.0.0

## groupSort

Sort and then group the elements of an array into non empty arrays.

**Signature**

```ts
export declare const groupSort: <A>(O: Ord<A>) => (as: A[]) => NonEmptyArray<A>[]
```

**Example**

```ts
import { cons, groupSort } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
```

Added in v2.0.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

## sort

**Signature**

```ts
export declare const sort: <A>(O: Ord<A>) => (nea: NonEmptyArray<A>) => NonEmptyArray<A>
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
import { cons } from 'fp-ts/lib/NonEmptyArray'

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
import { cons, groupBy } from 'fp-ts/lib/NonEmptyArray'

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
import { snoc } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
```

Added in v2.0.0

# instances

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
import { getEq, cons } from 'fp-ts/lib/NonEmptyArray'
import { eqNumber } from 'fp-ts/lib/Eq'

const E = getEq(eqNumber)
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

## nonEmptyArray

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
import { init } from 'fp-ts/lib/NonEmptyArray'

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
