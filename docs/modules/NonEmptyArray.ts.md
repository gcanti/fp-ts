---
title: NonEmptyArray.ts
nav_order: 60
parent: Modules
---

# Overview

Data structure which represents non-empty arrays

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [NonEmptyArray (class)](#nonemptyarray-class)
  - [toArray (method)](#toarray-method)
  - [toArrayMap (method)](#toarraymap-method)
  - [concatArray (method)](#concatarray-method)
  - [map (method)](#map-method)
  - [mapWithIndex (method)](#mapwithindex-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
  - [concat (method)](#concat-method)
  - [reduce (method)](#reduce-method)
  - [reduceWithIndex (method)](#reducewithindex-method)
  - [foldr (method)](#foldr-method)
  - [foldrWithIndex (method)](#foldrwithindex-method)
  - [extend (method)](#extend-method)
  - [extract (method)](#extract-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
  - [min (method)](#min-method)
  - [max (method)](#max-method)
  - [last (method)](#last-method)
  - [sort (method)](#sort-method)
  - [reverse (method)](#reverse-method)
  - [length (method)](#length-method)
  - [lookup (method)](#lookup-method)
  - [~~index~~ (method)](#index-method)
  - [findFirst (method)](#findfirst-method)
  - [findLast (method)](#findlast-method)
  - [findIndex (method)](#findindex-method)
  - [findLastIndex (method)](#findlastindex-method)
  - [insertAt (method)](#insertat-method)
  - [updateAt (method)](#updateat-method)
  - [filter (method)](#filter-method)
  - [filterWithIndex (method)](#filterwithindex-method)
  - [some (method)](#some-method)
  - [every (method)](#every-method)
- [URI (constant)](#uri-constant)
- [nonEmptyArray (constant)](#nonemptyarray-constant)
- [fromArray (function)](#fromarray-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getSetoid (function)](#getsetoid-function)
- [group (function)](#group-function)
- [groupBy (function)](#groupby-function)
- [groupSort (function)](#groupsort-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# NonEmptyArray (class)

**Signature**

```ts
export class NonEmptyArray<A> {
  constructor(readonly head: A, readonly tail: Array<A>) { ... }
  ...
}
```

Added in v1.0.0

## toArray (method)

Converts this `NonEmptyArray` to a plain `Array`

**Signature**

```ts
toArray(): Array<A> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).toArray(), [1, 2, 3])
```

## toArrayMap (method)

Converts this `NonEmptyArray` to a plain `Array` using the given map function

**Signature**

```ts
toArrayMap<B>(f: (a: A) => B): Array<B> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(new NonEmptyArray('a', ['bb', 'ccc']).toArrayMap(s => s.length), [1, 2, 3])
```

Added in v1.14.0

## concatArray (method)

Concatenates this `NonEmptyArray` and passed `Array`

**Signature**

```ts
concatArray(as: Array<A>): NonEmptyArray<A> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(new NonEmptyArray<number>(1, []).concatArray([2]), new NonEmptyArray(1, [2]))
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): NonEmptyArray<B> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const double = (n: number): number => n * 2
assert.deepStrictEqual(new NonEmptyArray(1, [2]).map(double), new NonEmptyArray(2, [4]))
```

## mapWithIndex (method)

**Signature**

```ts
mapWithIndex<B>(f: (i: number, a: A) => B): NonEmptyArray<B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const double = (n: number): number => n * 2
assert.deepStrictEqual(x.ap(new NonEmptyArray(double, [double])).toArray(), [2, 4, 2, 4])
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const double = (n: number) => n * 2
assert.deepStrictEqual(new NonEmptyArray(double, [double]).ap_(x).toArray(), [2, 4, 2, 4])
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const f = (a: number) => new NonEmptyArray(a, [4])
assert.deepStrictEqual(x.chain(f).toArray(), [1, 4, 2, 4])
```

## concat (method)

**Signature**

```ts
concat(y: NonEmptyArray<A>): NonEmptyArray<A> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const y = new NonEmptyArray(3, [4])
assert.deepStrictEqual(x.concat(y).toArray(), [1, 2, 3, 4])
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray('a', ['b'])
assert.strictEqual(x.reduce('', (b, a) => b + a), 'ab')
```

## reduceWithIndex (method)

**Signature**

```ts
reduceWithIndex<B>(b: B, f: (i: number, b: B, a: A) => B): B { ... }
```

Added in v1.12.0

## foldr (method)

**Signature**

```ts
foldr<B>(b: B, f: (a: A, b: B) => B): B { ... }
```

Added in v1.12.0

## foldrWithIndex (method)

**Signature**

```ts
foldrWithIndex<B>(b: B, f: (i: number, a: A, b: B) => B): B { ... }
```

Added in v1.12.0

## extend (method)

**Signature**

```ts
extend<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { fold, monoidSum } from 'fp-ts/lib/Monoid'

const sum = (as: NonEmptyArray<number>) => fold(monoidSum)(as.toArray())
assert.deepStrictEqual(new NonEmptyArray(1, [2, 3, 4]).extend(sum), new NonEmptyArray(10, [9, 7, 4]))
```

## extract (method)

**Signature**

```ts
extract(): A { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).extract(), 1)
```

## inspect (method)

Same as `toString`

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

Return stringified representation of this `NonEmptyArray`

**Signature**

```ts
toString(): string { ... }
```

## min (method)

Gets minimum of this `NonEmptyArray` using specified `Ord` instance

**Signature**

```ts
min(ord: Ord<A>): A { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).min(ordNumber), 1)
```

Added in v1.3.0

## max (method)

Gets maximum of this `NonEmptyArray` using specified `Ord` instance

**Signature**

```ts
max(ord: Ord<A>): A { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).max(ordNumber), 3)
```

Added in v1.3.0

## last (method)

Gets last element of this `NonEmptyArray`

**Signature**

```ts
last(): A { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).last(), 3)
assert.strictEqual(new NonEmptyArray(1, []).last(), 1)
```

Added in v1.6.0

## sort (method)

Sorts this `NonEmptyArray` using specified `Ord` instance

**Signature**

```ts
sort(ord: Ord<A>): NonEmptyArray<A> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(new NonEmptyArray(3, [2, 1]).sort(ordNumber), new NonEmptyArray(1, [2, 3]))
```

Added in v1.6.0

## reverse (method)

Reverts this `NonEmptyArray`

**Signature**

```ts
reverse(): NonEmptyArray<A> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).reverse(), new NonEmptyArray(3, [2, 1]))
```

Added in v1.6.0

## length (method)

**Signature**

```ts
length(): number { ... }
```

Added in v1.10.0

## lookup (method)

This function provides a safe way to read a value at a particular index from an NonEmptyArray

**Signature**

```ts
lookup(i: number): Option<A> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).lookup(1), some(2))
assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).lookup(3), none)
```

Added in v1.14.0

## ~~index~~ (method)

Use `lookup` instead

**Signature**

```ts
index(i: number): Option<A> { ... }
```

Added in v1.11.0

## findFirst (method)

Find the first element which satisfies a predicate (or a refinement) function

**Signature**

```ts
findFirst<B extends A>(refinement: Refinement<A, B>): Option<B>
findFirst(predicate: Predicate<A>): Option<A> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(
  new NonEmptyArray({ a: 1, b: 1 }, [{ a: 1, b: 2 }]).findFirst(x => x.a === 1),
  some({ a: 1, b: 1 })
)
```

Added in v1.11.0

## findLast (method)

Find the last element which satisfies a predicate function

**Signature**

```ts
findLast<B extends A>(predicate: Refinement<A, B>): Option<B>
findLast(predicate: Predicate<A>): Option<A> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(
  new NonEmptyArray({ a: 1, b: 1 }, [{ a: 1, b: 2 }]).findLast(x => x.a === 1),
  some({ a: 1, b: 2 })
)
```

Added in v1.11.0

## findIndex (method)

Find the first index for which a predicate holds

**Signature**

```ts
findIndex(predicate: Predicate<A>): Option<number> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).findIndex(x => x === 2), some(1))
assert.deepStrictEqual(new NonEmptyArray<number>(1, []).findIndex(x => x === 2), none)
```

Added in v1.11.0

## findLastIndex (method)

Returns the index of the last element of the list which matches the predicate

**Signature**

```ts
findLastIndex(predicate: Predicate<A>): Option<number> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

interface X {
  a: number
  b: number
}
const xs: NonEmptyArray<X> = new NonEmptyArray({ a: 1, b: 0 }, [{ a: 1, b: 1 }])
assert.deepStrictEqual(xs.findLastIndex(x => x.a === 1), some(1))
assert.deepStrictEqual(xs.findLastIndex(x => x.a === 4), none)
```

Added in v1.11.0

## insertAt (method)

Insert an element at the specified index, creating a new NonEmptyArray, or returning `None` if the index is out of bounds

**Signature**

```ts
insertAt(i: number, a: A): Option<NonEmptyArray<A>> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3, 4]).insertAt(2, 5), some(new NonEmptyArray(1, [2, 5, 3, 4])))
```

Added in v1.11.0

## updateAt (method)

Change the element at the specified index, creating a new NonEmptyArray, or returning `None` if the index is out of bounds

**Signature**

```ts
updateAt(i: number, a: A): Option<NonEmptyArray<A>> { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).updateAt(1, 1), some(new NonEmptyArray(1, [1, 3])))
assert.deepStrictEqual(new NonEmptyArray(1, []).updateAt(1, 1), none)
```

Added in v1.11.0

## filter (method)

Filter an NonEmptyArray, keeping the elements which satisfy a predicate function, creating a new NonEmptyArray or returning `None` in case the resulting NonEmptyArray would have no remaining elements.

**Signature**

```ts
filter<B extends A>(predicate: Refinement<A, B>): Option<NonEmptyArray<B>>
filter(predicate: Predicate<A>): Option<NonEmptyArray<A>> { ... }
```

Added in v1.11.0

## filterWithIndex (method)

**Signature**

```ts
filterWithIndex(predicate: (i: number, a: A) => boolean): Option<NonEmptyArray<A>> { ... }
```

Added in v1.12.0

## some (method)

**Signature**

```ts
some(predicate: Predicate<A>): boolean { ... }
```

Added in v1.14.0

## every (method)

**Signature**

```ts
every(predicate: Predicate<A>): boolean { ... }
```

Added in v1.14.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# nonEmptyArray (constant)

**Signature**

```ts
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> = ...
```

Added in v1.0.0

# fromArray (function)

Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array

**Signature**

```ts
export const fromArray = <A>(as: Array<A>): Option<NonEmptyArray<A>> => ...
```

Added in v1.0.0

# getSemigroup (function)

Builds a `Semigroup` instance for `NonEmptyArray`

**Signature**

```ts
export const getSemigroup = <A = never>(): Semigroup<NonEmptyArray<A>> => ...
```

Added in v1.0.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<NonEmptyArray<A>> => ...
```

**Example**

```ts
import { NonEmptyArray, getSetoid } from 'fp-ts/lib/NonEmptyArray'
import { setoidNumber } from 'fp-ts/lib/Setoid'

const S = getSetoid(setoidNumber)
assert.strictEqual(S.equals(new NonEmptyArray(1, []), new NonEmptyArray(1, [])), true)
assert.strictEqual(S.equals(new NonEmptyArray(1, []), new NonEmptyArray(1, [2])), false)
```

Added in v1.14.0

# group (function)

Group equal, consecutive elements of an array into non empty arrays.

**Signature**

```ts
export const group = <A>(S: Setoid<A>) => (as: Array<A>): Array<NonEmptyArray<A>> => ...
```

**Example**

```ts
import { NonEmptyArray, group } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
  new NonEmptyArray(1, []),
  new NonEmptyArray(2, []),
  new NonEmptyArray(1, [1])
])
```

Added in v1.7.0

# groupBy (function)

Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

**Signature**

```ts
export const groupBy = <A>(as: Array<A>, f: (a: A) => string): { [key: string]: NonEmptyArray<A> } => ...
```

**Example**

```ts
import { NonEmptyArray, groupBy } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
  '3': new NonEmptyArray('foo', ['bar']),
  '6': new NonEmptyArray('foobar', [])
})
```

Added in v1.10.0

# groupSort (function)

Sort and then group the elements of an array into non empty arrays.

**Signature**

```ts
export const groupSort = <A>(O: Ord<A>): ((as: Array<A>) => Array<NonEmptyArray<A>>) => ...
```

**Example**

```ts
import { NonEmptyArray, groupSort } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [new NonEmptyArray(1, [1, 1]), new NonEmptyArray(2, [])])
```

Added in v1.7.0
