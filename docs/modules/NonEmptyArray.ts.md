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
- [URI (constant)](#uri-constant)
- [cons (constant)](#cons-constant)
- [copy (constant)](#copy-constant)
- [getEq (constant)](#geteq-constant)
- [getShow (constant)](#getshow-constant)
- [nonEmptyArray (constant)](#nonemptyarray-constant)
- [of (constant)](#of-constant)
- [reverse (constant)](#reverse-constant)
- [snoc (constant)](#snoc-constant)
- [concat (function)](#concat-function)
- [filter (function)](#filter-function)
- [filterWithIndex (function)](#filterwithindex-function)
- [fromArray (function)](#fromarray-function)
- [getSemigroup (function)](#getsemigroup-function)
- [group (function)](#group-function)
- [groupBy (function)](#groupby-function)
- [groupSort (function)](#groupsort-function)
- [head (function)](#head-function)
- [init (function)](#init-function)
- [insertAt (function)](#insertat-function)
- [last (function)](#last-function)
- [max (function)](#max-function)
- [min (function)](#min-function)
- [modifyAt (function)](#modifyat-function)
- [sort (function)](#sort-function)
- [tail (function)](#tail-function)
- [updateAt (function)](#updateat-function)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [duplicate (export)](#duplicate-export)
- [extend (export)](#extend-export)
- [flatten (export)](#flatten-export)
- [foldMap (export)](#foldmap-export)
- [foldMapWithIndex (export)](#foldmapwithindex-export)
- [map (export)](#map-export)
- [mapWithIndex (export)](#mapwithindex-export)
- [reduce (export)](#reduce-export)
- [reduceRight (export)](#reduceright-export)
- [reduceRightWithIndex (export)](#reducerightwithindex-export)
- [reduceWithIndex (export)](#reducewithindex-export)

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

# URI (constant)

**Signature**

```ts
export const URI: "NonEmptyArray" = ...
```

Added in v2.0.0

# cons (constant)

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

# copy (constant)

**Signature**

```ts
export const copy: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A> = ...
```

Added in v2.0.0

# getEq (constant)

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

# getShow (constant)

**Signature**

```ts
export const getShow: <A>(S: Show<A>) => Show<NonEmptyArray<A>> = ...
```

Added in v2.0.0

# nonEmptyArray (constant)

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

# of (constant)

**Signature**

```ts
export const of: <A>(a: A) => NonEmptyArray<A> = ...
```

Added in v2.0.0

# reverse (constant)

**Signature**

```ts
export const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A> = ...
```

Added in v2.0.0

# snoc (constant)

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

# concat (function)

**Signature**

```ts
export function concat<A>(fx: Array<A>, fy: NonEmptyArray<A>): NonEmptyArray<A>
export function concat<A>(fx: NonEmptyArray<A>, fy: Array<A>): NonEmptyArray<A> { ... }
```

Added in v2.2.0

# filter (function)

**Signature**

```ts
export function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# filterWithIndex (function)

**Signature**

```ts
export function filterWithIndex<A>(
  predicate: (i: number, a: A) => boolean
): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# fromArray (function)

Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array

**Signature**

```ts
export function fromArray<A>(as: Array<A>): Option<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# getSemigroup (function)

Builds a `Semigroup` instance for `NonEmptyArray`

**Signature**

```ts
export function getSemigroup<A = never>(): Semigroup<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# group (function)

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

# groupBy (function)

Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

**Signature**

```ts
export function groupBy<A>(f: (a: A) => string): (as: Array<A>) => Record<string, NonEmptyArray<A>> { ... }
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

# groupSort (function)

Sort and then group the elements of an array into non empty arrays.

**Signature**

```ts
export function groupSort<A>(O: Ord<A>): (as: Array<A>) => Array<NonEmptyArray<A>> { ... }
```

**Example**

```ts
import { cons, groupSort } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
```

Added in v2.0.0

# head (function)

**Signature**

```ts
export function head<A>(nea: NonEmptyArray<A>): A { ... }
```

Added in v2.0.0

# init (function)

Get all but the last element of a non empty array, creating a new array.

**Signature**

```ts
export function init<A>(nea: NonEmptyArray<A>): Array<A> { ... }
```

**Example**

```ts
import { init } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
assert.deepStrictEqual(init([1]), [])
```

Added in v2.2.0

# insertAt (function)

**Signature**

```ts
export function insertAt<A>(i: number, a: A): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# last (function)

**Signature**

```ts
export function last<A>(nea: NonEmptyArray<A>): A { ... }
```

Added in v2.0.0

# max (function)

**Signature**

```ts
export function max<A>(ord: Ord<A>): (nea: NonEmptyArray<A>) => A { ... }
```

Added in v2.0.0

# min (function)

**Signature**

```ts
export function min<A>(ord: Ord<A>): (nea: NonEmptyArray<A>) => A { ... }
```

Added in v2.0.0

# modifyAt (function)

**Signature**

```ts
export function modifyAt<A>(i: number, f: (a: A) => A): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# sort (function)

**Signature**

```ts
export function sort<A>(O: Ord<A>): (nea: NonEmptyArray<A>) => NonEmptyArray<A> { ... }
```

Added in v2.0.0

# tail (function)

**Signature**

```ts
export function tail<A>(nea: NonEmptyArray<A>): Array<A> { ... }
```

Added in v2.0.0

# updateAt (function)

**Signature**

```ts
export function updateAt<A>(i: number, a: A): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# ap (export)

**Signature**

```ts
<A>(fa: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>
```

Added in v2.0.0

# apFirst (export)

**Signature**

```ts
<B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

# apSecond (export)

**Signature**

```ts
<B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# chain (export)

**Signature**

```ts
<A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# chainFirst (export)

**Signature**

```ts
<A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<A>
```

Added in v2.0.0

# duplicate (export)

**Signature**

```ts
<A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
```

Added in v2.0.0

# extend (export)

**Signature**

```ts
<A, B>(f: (fa: NonEmptyArray<A>) => B) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# flatten (export)

**Signature**

```ts
<A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A>
```

Added in v2.0.0

# foldMap (export)

**Signature**

```ts
;<S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: NonEmptyArray<A>) => S
```

Added in v2.0.0

# foldMapWithIndex (export)

**Signature**

```ts
;<S>(S: Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (fa: NonEmptyArray<A>) => S
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# mapWithIndex (export)

**Signature**

```ts
<A, B>(f: (i: number, a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>
```

Added in v2.0.0

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0

# reduceRightWithIndex (export)

**Signature**

```ts
;<A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0

# reduceWithIndex (export)

**Signature**

```ts
;<A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B
```

Added in v2.0.0
