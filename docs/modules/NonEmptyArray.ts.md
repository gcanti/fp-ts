---
title: NonEmptyArray.ts
nav_order: 58
parent: Modules
---

# Overview

Data structure which represents non-empty arrays

---

<h2 class="text-delta">Table of contents</h2>

- [NonEmptyArray (interface)](#nonemptyarray-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [cons (constant)](#cons-constant)
- [copy (constant)](#copy-constant)
- [getEq (constant)](#geteq-constant)
- [nonEmptyArray (constant)](#nonemptyarray-constant)
- [reverse (constant)](#reverse-constant)
- [snoc (constant)](#snoc-constant)
- [filter (function)](#filter-function)
- [filterWithIndex (function)](#filterwithindex-function)
- [findFirst (function)](#findfirst-function)
- [findIndex (function)](#findindex-function)
- [findLast (function)](#findlast-function)
- [findLastIndex (function)](#findlastindex-function)
- [fromArray (function)](#fromarray-function)
- [fromNonEmptyArray (function)](#fromnonemptyarray-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getShow (function)](#getshow-function)
- [group (function)](#group-function)
- [groupBy (function)](#groupby-function)
- [groupSort (function)](#groupsort-function)
- [head (function)](#head-function)
- [insertAt (function)](#insertat-function)
- [last (function)](#last-function)
- [max (function)](#max-function)
- [min (function)](#min-function)
- [modifyAt (function)](#modifyat-function)
- [sort (function)](#sort-function)
- [tail (function)](#tail-function)
- [updateAt (function)](#updateat-function)

---

# NonEmptyArray (interface)

**Signature**

```ts
export interface NonEmptyArray<A> extends Array<A> {
  0: A
  map<B>(f: (a: A, index: number, nea: NonEmptyArray<A>) => B): NonEmptyArray<B>
  concat(as: Array<A>): NonEmptyArray<A>
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
export const URI = ...
```

Added in v2.0.0

# cons (constant)

Append an element to the front of an array, creating a new non empty array

**Signature**

```ts
export const cons: <A>(a: A, as: Array<A>) => NonEmptyArray<A> = ...
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
import { fromNonEmptyArray, getEq, cons } from 'fp-ts/lib/NonEmptyArray'
import { eqNumber } from 'fp-ts/lib/Eq'

const E = getEq(eqNumber)
assert.strictEqual(E.equals(cons(1, [2]), fromNonEmptyArray([1, 2])), true)
assert.strictEqual(E.equals(cons(1, [2]), fromNonEmptyArray([1, 3])), false)
```

Added in v2.0.0

# nonEmptyArray (constant)

**Signature**

```ts
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> = ...
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
export const snoc: <A>(as: Array<A>, a: A) => NonEmptyArray<A> = ...
```

**Example**

```ts
import { snoc } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
```

Added in v2.0.0

# filter (function)

**Signature**

```ts
export function filter<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<NonEmptyArray<A>>
export function filter<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# filterWithIndex (function)

**Signature**

```ts
export function filterWithIndex<A>(
  nea: NonEmptyArray<A>,
  predicate: (i: number, a: A) => boolean
): Option<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# findFirst (function)

**Signature**

```ts
export function findFirst<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<B>
export function findFirst<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A> { ... }
```

Added in v2.0.0

# findIndex (function)

**Signature**

```ts
export function findIndex<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<number> { ... }
```

Added in v2.0.0

# findLast (function)

**Signature**

```ts
export function findLast<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<B>
export function findLast<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A> { ... }
```

Added in v2.0.0

# findLastIndex (function)

**Signature**

```ts
export function findLastIndex<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<number> { ... }
```

Added in v2.0.0

# fromArray (function)

Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array

**Signature**

```ts
export function fromArray<A>(as: Array<A>): Option<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# fromNonEmptyArray (function)

Builds a `NonEmptyArray` from a provably (compile time) non empty `Array`.

**Signature**

```ts
export function fromNonEmptyArray<A>(as: Array<A> & { 0: A }): NonEmptyArray<A> { ... }
```

Added in v2.0.0

# getSemigroup (function)

Builds a `Semigroup` instance for `NonEmptyArray`

**Signature**

```ts
export function getSemigroup<A = never>(): Semigroup<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export function getShow<A>(S: Show<A>): Show<NonEmptyArray<A>> { ... }
```

Added in v2.0.0

# group (function)

Group equal, consecutive elements of an array into non empty arrays.

**Signature**

```ts
export function group<A>(E: Eq<A>): (as: Array<A>) => Array<NonEmptyArray<A>> { ... }
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
export function groupBy<A>(as: Array<A>, f: (a: A) => string): { [key: string]: NonEmptyArray<A> } { ... }
```

**Example**

```ts
import { cons, groupBy } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
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

# insertAt (function)

**Signature**

```ts
export function insertAt<A>(i: number, a: A, nea: NonEmptyArray<A>): Option<NonEmptyArray<A>> { ... }
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
export function modifyAt<A>(i: number, nea: NonEmptyArray<A>, f: (a: A) => A): Option<NonEmptyArray<A>> { ... }
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
export function updateAt<A>(i: number, a: A, nea: NonEmptyArray<A>): Option<NonEmptyArray<A>> { ... }
```

Added in v2.0.0
