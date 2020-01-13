---
title: ReadonlyNonEmptyArray.ts
nav_order: 70
parent: Modules
---

# ReadonlyNonEmptyArray overview

Data structure which represents non-empty arrays

Added in v2.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [ReadonlyNonEmptyArray (interface)](#readonlynonemptyarray-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [cons (constant)](#cons-constant)
- [getEq (constant)](#geteq-constant)
- [getShow (constant)](#getshow-constant)
- [of (constant)](#of-constant)
- [readonlyNonEmptyArray (constant)](#readonlynonemptyarray-constant)
- [reverse (constant)](#reverse-constant)
- [snoc (constant)](#snoc-constant)
- [concat (function)](#concat-function)
- [filter (function)](#filter-function)
- [filterWithIndex (function)](#filterwithindex-function)
- [fromReadonlyArray (function)](#fromreadonlyarray-function)
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

# ReadonlyNonEmptyArray (interface)

**Signature**

```ts
export interface ReadonlyNonEmptyArray<A> extends ReadonlyArray<A> {
  readonly 0: A
}
```

Added in v2.5.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

# URI (constant)

**Signature**

```ts
export const URI: "ReadonlyNonEmptyArray" = ...
```

Added in v2.5.0

# cons (constant)

Append an element to the front of an array, creating a new non empty array

**Signature**

```ts
export const cons: <A>(head: A, tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A> = ...
```

**Example**

```ts
import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'

assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
```

Added in v2.5.0

# getEq (constant)

**Signature**

```ts
export const getEq: <A>(E: Eq<A>) => Eq<ReadonlyNonEmptyArray<A>> = ...
```

**Example**

```ts
import { getEq, cons } from 'fp-ts/lib/ReadonlyNonEmptyArray'
import { eqNumber } from 'fp-ts/lib/Eq'

const E = getEq(eqNumber)
assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
```

Added in v2.5.0

# getShow (constant)

**Signature**

```ts
export const getShow: <A>(S: Show<A>) => Show<ReadonlyNonEmptyArray<A>> = ...
```

Added in v2.5.0

# of (constant)

**Signature**

```ts
export const of: <A>(a: A) => ReadonlyNonEmptyArray<A> = ...
```

Added in v2.5.0

# readonlyNonEmptyArray (constant)

**Signature**

```ts
export const readonlyNonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  Alt1<URI> = ...
```

Added in v2.5.0

# reverse (constant)

**Signature**

```ts
export const reverse: <A>(nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> = ...
```

Added in v2.5.0

# snoc (constant)

Append an element to the end of an array, creating a new non empty array

**Signature**

```ts
export const snoc: <A>(init: ReadonlyArray<A>, end: A) => ReadonlyNonEmptyArray<A> = ...
```

**Example**

```ts
import { snoc } from 'fp-ts/lib/ReadonlyNonEmptyArray'

assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
```

Added in v2.5.0

# concat (function)

**Signature**

```ts
export function concat<A>(fx: ReadonlyArray<A>, fy: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A>
export function concat<A>(fx: ReadonlyNonEmptyArray<A>, fy: ReadonlyArray<A>): ReadonlyNonEmptyArray<A> { ... }
```

Added in v2.5.0

# filter (function)

**Signature**

```ts
export function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> { ... }
```

Added in v2.5.0

# filterWithIndex (function)

**Signature**

```ts
export function filterWithIndex<A>(
  predicate: (i: number, a: A) => boolean
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> { ... }
```

Added in v2.5.0

# fromReadonlyArray (function)

Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array

**Signature**

```ts
export function fromReadonlyArray<A>(as: ReadonlyArray<A>): Option<ReadonlyNonEmptyArray<A>> { ... }
```

Added in v2.5.0

# getSemigroup (function)

Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`

**Signature**

```ts
export function getSemigroup<A = never>(): Semigroup<ReadonlyNonEmptyArray<A>> { ... }
```

Added in v2.5.0

# group (function)

Group equal, consecutive elements of an array into non empty arrays.

**Signature**

```ts
export function group<A>(
  E: Eq<A>
): {
  (as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
  (as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>
} { ... }
```

**Example**

```ts
import { cons, group } from 'fp-ts/lib/ReadonlyNonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [cons(1, []), cons(2, []), cons(1, [1])])
```

Added in v2.5.0

# groupBy (function)

Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

**Signature**

```ts
export function groupBy<A>(
  f: (a: A) => string
): (as: ReadonlyArray<A>) => Readonly<Record<string, ReadonlyNonEmptyArray<A>>> { ... }
```

**Example**

```ts
import { cons, groupBy } from 'fp-ts/lib/ReadonlyNonEmptyArray'

assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
  '3': cons('foo', ['bar']),
  '6': cons('foobar', [])
})
```

Added in v2.5.0

# groupSort (function)

Sort and then group the elements of an array into non empty arrays.

**Signature**

```ts
export function groupSort<A>(O: Ord<A>): (as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyNonEmptyArray<A>> { ... }
```

**Example**

```ts
import { cons, groupSort } from 'fp-ts/lib/ReadonlyNonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
```

Added in v2.5.0

# head (function)

**Signature**

```ts
export function head<A>(nea: ReadonlyNonEmptyArray<A>): A { ... }
```

Added in v2.5.0

# init (function)

Get all but the last element of a non empty array, creating a new array.

**Signature**

```ts
export function init<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A> { ... }
```

**Example**

```ts
import { init } from 'fp-ts/lib/ReadonlyNonEmptyArray'

assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
assert.deepStrictEqual(init([1]), [])
```

Added in v2.5.0

# insertAt (function)

**Signature**

```ts
export function insertAt<A>(i: number, a: A): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> { ... }
```

Added in v2.5.0

# last (function)

**Signature**

```ts
export function last<A>(nea: ReadonlyNonEmptyArray<A>): A { ... }
```

Added in v2.5.0

# max (function)

**Signature**

```ts
export function max<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A { ... }
```

Added in v2.5.0

# min (function)

**Signature**

```ts
export function min<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A { ... }
```

Added in v2.5.0

# modifyAt (function)

**Signature**

```ts
export function modifyAt<A>(
  i: number,
  f: (a: A) => A
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> { ... }
```

Added in v2.5.0

# sort (function)

**Signature**

```ts
export function sort<A>(O: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> { ... }
```

Added in v2.5.0

# tail (function)

**Signature**

```ts
export function tail<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A> { ... }
```

Added in v2.5.0

# updateAt (function)

**Signature**

```ts
export function updateAt<A>(i: number, a: A): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> { ... }
```

Added in v2.5.0

# ap (export)

**Signature**

```ts
<A>(fa: ReadonlyNonEmptyArray<A>) => <B>(fab: ReadonlyNonEmptyArray<(a: A) => B>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# apFirst (export)

**Signature**

```ts
<B>(fb: ReadonlyNonEmptyArray<B>) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

# apSecond (export)

**Signature**

```ts
<B>(fb: ReadonlyNonEmptyArray<B>) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# chain (export)

**Signature**

```ts
<A, B>(f: (a: A) => ReadonlyNonEmptyArray<B>) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# chainFirst (export)

**Signature**

```ts
<A, B>(f: (a: A) => ReadonlyNonEmptyArray<B>) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

# duplicate (export)

**Signature**

```ts
<A>(ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

# extend (export)

**Signature**

```ts
<A, B>(f: (fa: ReadonlyNonEmptyArray<A>) => B) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# flatten (export)

**Signature**

```ts
<A>(mma: ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

# foldMap (export)

**Signature**

```ts
;<S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S
```

Added in v2.5.0

# foldMapWithIndex (export)

**Signature**

```ts
;<S>(S: Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S
```

Added in v2.5.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# mapWithIndex (export)

**Signature**

```ts
<A, B>(f: (i: number, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0

# reduceRightWithIndex (export)

**Signature**

```ts
;<A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0

# reduceWithIndex (export)

**Signature**

```ts
;<A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0
