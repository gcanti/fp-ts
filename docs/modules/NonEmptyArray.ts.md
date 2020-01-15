---
title: NonEmptyArray.ts
nav_order: 56
parent: Modules
---

# NonEmptyArray overview

Data structure which represents non-empty arrays

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [NonEmptyArray (interface)](#nonemptyarray-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [concat](#concat)
- [cons](#cons)
- [copy](#copy)
- [duplicate](#duplicate)
- [extend](#extend)
- [filter](#filter)
- [filterWithIndex](#filterwithindex)
- [flatten](#flatten)
- [fold](#fold)
- [foldMap](#foldmap)
- [foldMapWithIndex](#foldmapwithindex)
- [fromArray](#fromarray)
- [getEq](#geteq)
- [getSemigroup](#getsemigroup)
- [getShow](#getshow)
- [group](#group)
- [groupBy](#groupby)
- [groupSort](#groupsort)
- [head](#head)
- [init](#init)
- [insertAt](#insertat)
- [last](#last)
- [map](#map)
- [mapWithIndex](#mapwithindex)
- [max](#max)
- [min](#min)
- [modifyAt](#modifyat)
- [nonEmptyArray](#nonemptyarray)
- [of](#of)
- [reduce](#reduce)
- [reduceRight](#reduceright)
- [reduceRightWithIndex](#reducerightwithindex)
- [reduceWithIndex](#reducewithindex)
- [reverse](#reverse)
- [snoc](#snoc)
- [sort](#sort)
- [tail](#tail)
- [updateAt](#updateat)

---

# NonEmptyArray (interface)

**Signature**

```ts
export interface NonEmptyArray<A> extends Array<A> {
  0: A
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export const URI: "NonEmptyArray" = ...
```

Added in v2.0.0

# ap

**Signature**

```ts
<A>(fa: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
<B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
<B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# chain

**Signature**

```ts
<A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
<A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

# concat

**Signature**

```ts
export function concat<A>(fx: Array<A>, fy: NonEmptyArray<A>): NonEmptyArray<A>
export function concat<A>(fx: NonEmptyArray<A>, fy: Array<A>): NonEmptyArray<A> { ... }
```

Added in v2.2.0

# cons

Append an element to the front of an array, creating a new non empty array

**Signature**

```ts
export const cons: <A>(head: A, tail: Array<A>) => NonEmptyArray<A> = ...
```

**Example**

```ts
import { cons } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
```

Added in v2.0.0

# copy

**Signature**

```ts
export function copy<A>(nea: NonEmptyArray<A>): NonEmptyArray<A> { ... }
```

Added in v2.0.0

# duplicate

**Signature**

```ts
<A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
```

Added in v2.0.0

# extend

**Signature**

```ts
<A, B>(f: (fa: NonEmptyArray<A>) => B) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# filter

**Signature**

```ts
export function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# filterWithIndex

**Signature**

```ts
export const filterWithIndex: <A>(
  predicate: (i: number, a: A) => boolean
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = ...
```

Added in v2.0.0

# flatten

**Signature**

```ts
<A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A>
```

Added in v2.0.0

# fold

**Signature**

```ts
export const fold: <A>(S: Semigroup<A>) => (fa: NonEmptyArray<A>) => A = ...
```

Added in v2.5.0

# foldMap

**Signature**

```ts
;<S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: RNEA.ReadonlyNonEmptyArray<A>) => S
```

Added in v2.0.0

# foldMapWithIndex

**Signature**

```ts
;<S>(S: Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (fa: RNEA.ReadonlyNonEmptyArray<A>) => S
```

Added in v2.0.0

# fromArray

Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array

**Signature**

```ts
export const fromArray: <A>(as: Array<A>) => Option<NonEmptyArray<A>> = ...
```

Added in v2.0.0

# getEq

**Signature**

```ts
export const getEq: <A>(E: Eq<A>) => Eq<NonEmptyArray<A>> = ...
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

# getSemigroup

Builds a `Semigroup` instance for `NonEmptyArray`

**Signature**

```ts
export const getSemigroup: <A = never>() => Semigroup<NonEmptyArray<A>> = ...
```

Added in v2.0.0

# getShow

**Signature**

```ts
export const getShow: <A>(S: Show<A>) => Show<NonEmptyArray<A>> = ...
```

Added in v2.0.0

# group

Group equal, consecutive elements of an array into non empty arrays.

**Signature**

```ts
export function group<A>(
  E: Eq<A>
): {
  (as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  (as: Array<A>): Array<NonEmptyArray<A>>
} { ... }
```

**Example**

```ts
import { cons, group } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [cons(1, []), cons(2, []), cons(1, [1])])
```

Added in v2.0.0

# groupBy

Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

**Signature**

```ts
export const groupBy: <A>(
  f: (a: A) => string
) => (as: Array<A>) => Record<string, NonEmptyArray<A>> = ...
```

**Example**

```ts
import { cons, groupBy } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
  '3': cons('foo', ['bar']),
  '6': cons('foobar', [])
})
```

Added in v2.0.0

# groupSort

Sort and then group the elements of an array into non empty arrays.

**Signature**

```ts
export const groupSort: <A>(O: Ord<A>) => (as: Array<A>) => Array<NonEmptyArray<A>> = ...
```

**Example**

```ts
import { cons, groupSort } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
```

Added in v2.0.0

# head

**Signature**

```ts
export const head: <A>(nea: NonEmptyArray<A>) => A = ...
```

Added in v2.0.0

# init

Get all but the last element of a non empty array, creating a new array.

**Signature**

```ts
export const init: <A>(nea: NonEmptyArray<A>) => Array<A> = ...
```

**Example**

```ts
import { init } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
assert.deepStrictEqual(init([1]), [])
```

Added in v2.2.0

# insertAt

**Signature**

```ts
export const insertAt: <A>(
  i: number,
  a: A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = ...
```

Added in v2.0.0

# last

**Signature**

```ts
export const last: <A>(nea: NonEmptyArray<A>) => A = ...
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# mapWithIndex

**Signature**

```ts
<A, B>(f: (i: number, a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# max

**Signature**

```ts
export const max: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A = ...
```

Added in v2.0.0

# min

**Signature**

```ts
export const min: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A = ...
```

Added in v2.0.0

# modifyAt

**Signature**

```ts
export const modifyAt: <A>(
  i: number,
  f: (a: A) => A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = ...
```

Added in v2.0.0

# nonEmptyArray

**Signature**

```ts
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  Alt1<URI> = ...
```

Added in v2.0.0

# of

**Signature**

```ts
export const of: <A>(a: A) => NonEmptyArray<A> = ...
```

Added in v2.0.0

# reduce

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0

# reduceRight

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0

# reduceRightWithIndex

**Signature**

```ts
;<A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0

# reduceWithIndex

**Signature**

```ts
;<A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0

# reverse

**Signature**

```ts
export const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A> = ...
```

Added in v2.0.0

# snoc

Append an element to the end of an array, creating a new non empty array

**Signature**

```ts
export const snoc: <A>(init: Array<A>, end: A) => NonEmptyArray<A> = ...
```

**Example**

```ts
import { snoc } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
```

Added in v2.0.0

# sort

**Signature**

```ts
export const sort: <A>(O: Ord<A>) => (nea: NonEmptyArray<A>) => NonEmptyArray<A> = ...
```

Added in v2.0.0

# tail

**Signature**

```ts
export const tail: <A>(nea: NonEmptyArray<A>) => Array<A> = ...
```

Added in v2.0.0

# updateAt

**Signature**

```ts
export const updateAt: <A>(
  i: number,
  a: A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = ...
```

Added in v2.0.0
