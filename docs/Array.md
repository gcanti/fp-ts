---
id: Array
title: Module Array
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Array.ts)

## array

```ts
Monad1<URI> &
  Foldable2v1<URI> &
  Unfoldable1<URI> &
  TraversableWithIndex1<URI, number> &
  Alternative1<URI> &
  Plus1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, number> &
  Witherable1<URI> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number>
```

Added in v1.0.0 (instance)

## empty

```ts
const empty: Array<never>
```

Added in v1.9.0 (constant)

An empty array

## getSetoid

```ts
const getSetoid: <A>(S: Setoid<A>) => Setoid<Array<A>>
```

Added in v1.0.0 (constant)

Derives a Setoid over the Array of a given element type from the Setoid of that type. The derived setoid defines two
arrays as equal if all elements of both arrays are compared equal pairwise with the given setoid `S`. In case of
arrays of different lengths, the result is non equality.

## catOptions

```ts
<A>(as: Array<Option<A>>): Array<A>
```

Added in v1.0.0 (function)

Filter an array of optional values, keeping only the elements which contain a value, creating a new array.

Alias of [Compactable](./Compactable.md)'s `compact`

_Example_

```ts
import { catOptions } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(catOptions([some(1), none, some(3)]), [1, 3])
```

## chop

```ts
<A, B>(as: Array<A>, f: (as: Array<A>) => [B, Array<A>]): Array<B>
```

Added in v1.10.0 (function)

A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
value and the rest of the array.

_Example_

```ts
import { Setoid, setoidNumber } from 'fp-ts/lib/Setoid'
import { chop, span } from 'fp-ts/lib/Array'

const group = <A>(S: Setoid<A>) => (as: Array<A>): Array<Array<A>> => {
  return chop(as, as => {
    const { init, rest } = span(as, a => S.equals(a, as[0]))
    return [init, rest]
  })
}
assert.deepEqual(group(setoidNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
```

## chunksOf

```ts
<A>(as: Array<A>, n: number): Array<Array<A>>
```

Added in v1.10.0 (function)

Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the array. Note that `chunksOf([], n)` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that

```ts
chunksOf(xs, n).concat(chunksOf(ys, n)) == chunksOf(xs.concat(ys)), n)
```

whenever `n` evenly divides the length of `xs`.

_Example_

```ts
import { chunksOf } from 'fp-ts/lib/Array'

assert.deepEqual(chunksOf([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]])
```

## comprehension

```ts
comprehension<R>(
  input: Array<Array<any>>,
  f: (...xs: Array<any>) => boolean,
  g: (...xs: Array<any>) => R
): Array<R>
```

Added in v1.10.0 (function)

Array comprehension

```
[ g(x, y, ...) | x ← xs, y ← ys, ..., f(x, y, ...) ]
```

_Example_

```ts
import { comprehension } from 'fp-ts/lib/Array'
import { tuple } from 'fp-ts/lib/function'

assert.deepEqual(comprehension([[1, 2, 3], ['a', 'b']], (a, b) => (a + b.length) % 2 === 0, tuple), [
  [1, 'a'],
  [1, 'b'],
  [3, 'a'],
  [3, 'b']
])
```

## cons

```ts
<A>(a: A, as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Attaches an element to the front of an array, creating a new array

_Example_

```ts
import { cons } from 'fp-ts/lib/Array'

assert.deepEqual(cons(0, [1, 2, 3]), [0, 1, 2, 3])
```

## copy

```ts
<A>(as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

## deleteAt

```ts
<A>(i: number, as: Array<A>): Option<Array<A>>
```

Added in v1.0.0 (function)

Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

_Example_

```ts
import { deleteAt } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(deleteAt(0, [1, 2, 3]), some([2, 3]))
assert.deepEqual(deleteAt(1, []), none)
```

## difference

```ts
<A>(S: Setoid<A>): ((xs: Array<A>, ys: Array<A>) => Array<A>)
```

Added in v1.12.0 (function)

Creates an array of array values not included in the other given array using a [Setoid](./Setoid.md) for equality
comparisons. The order and references of result values are determined by the first array.

_Example_

```ts
import { difference } from 'fp-ts/lib/Array'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.deepEqual(difference(setoidNumber)([1, 2], [2, 3]), [1])
```

## drop

```ts
<A>(n: number, as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Drop a number of elements from the start of an array, creating a new array

_Example_

```ts
import { drop } from 'fp-ts/lib/Array'

assert.deepEqual(drop(2, [1, 2, 3]), [3])
```

## dropEnd

```ts
<A>(n: number, as: Array<A>): Array<A>
```

Added in v1.10.0 (function)

Drop a number of elements from the end of an array, creating a new array

_Example_

```ts
import { dropEnd } from 'fp-ts/lib/Array'

assert.deepEqual(dropEnd(2, [1, 2, 3, 4, 5]), [1, 2, 3])
```

## dropWhile

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
```

Added in v1.0.0 (function)

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array

_Example_

```ts
import { dropWhile } from 'fp-ts/lib/Array'

assert.deepEqual(dropWhile([1, 3, 2, 4, 5], n => n % 2 === 1), [2, 4, 5])
```

## filter

```ts
filter<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
```

Added in v1.0.0 (function)

Filter an array, keeping the elements which satisfy a predicate function, creating a new array

## findFirst

```ts
findFirst<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
```

Added in v1.0.0 (function)

Find the first element which satisfies a predicate (or a refinement) function

_Example_

```ts
import { findFirst } from 'fp-ts/lib/Array'
import { some } from 'fp-ts/lib/Option'

assert.deepEqual(findFirst([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 1 }))
```

## findIndex

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Option<number>
```

Added in v1.0.0 (function)

Find the first index for which a predicate holds

_Example_

```ts
import { findIndex } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(findIndex([1, 2, 3], x => x === 2), some(1))
assert.deepEqual(findIndex([], x => x === 2), none)
```

## findLast

```ts
findLast<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
```

Added in v1.0.0 (function)

Find the last element which satisfies a predicate function

_Example_

```ts
import { findLast } from 'fp-ts/lib/Array'
import { some } from 'fp-ts/lib/Option'

assert.deepEqual(findLast([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 2 }))
```

## findLastIndex

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Option<number>
```

Added in v1.10.0 (function)

Returns the index of the last element of the list which matches the predicate

_Example_

```ts
import { findLastIndex } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

interface X {
  a: number
  b: number
}
const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
assert.deepEqual(findLastIndex(xs, x => x.a === 1), some(1))
assert.deepEqual(findLastIndex(xs, x => x.a === 4), none)
```

## flatten

```ts
<A>(ffa: Array<Array<A>>): Array<A>
```

Added in v1.0.0 (function)

Removes one level of nesting

_Example_

```ts
import { flatten } from 'fp-ts/lib/Array'

assert.deepEqual(flatten([[1], [2], [3]]), [1, 2, 3])
```

## fold

```ts
<A, B>(as: Array<A>, b: B, cons: (head: A, tail: Array<A>) => B): B
```

Added in v1.0.0 (function)

Break an array into its first element and remaining elements

_Example_

```ts
import { fold } from 'fp-ts/lib/Array'

const len = <A>(as: Array<A>): number => fold(as, 0, (_, tail) => 1 + len(tail))
assert.strictEqual(len([1, 2, 3]), 3)
```

## foldL

```ts
<A, B>(as: Array<A>, nil: () => B, cons: (head: A, tail: Array<A>) => B): B
```

Added in v1.0.0 (function)

Lazy version of [fold](#fold)

## foldr

```ts
<A, B>(as: Array<A>, b: B, cons: (init: Array<A>, last: A) => B): B
```

Added in v1.7.0 (function)

Break an array into its initial elements and the last element

## foldrL

```ts
<A, B>(as: Array<A>, nil: () => B, cons: (init: Array<A>, last: A) => B): B
```

Added in v1.7.0 (function)

Lazy version of [foldr](#foldr)

## getMonoid

```ts
<A = never>(): Monoid<Array<A>>
```

Added in v1.0.0 (function)

_Example_

```ts
import { getMonoid } from 'fp-ts/lib/Array'

const M = getMonoid<number>()
assert.deepEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
```

## getOrd

```ts
<A>(O: Ord<A>): Ord<Array<A>>
```

Added in v1.2.0 (function)

Derives an `Ord` over the Array of a given element type from the `Ord` of that type. The ordering between two such
arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
the same length, the result is equality.

_Example_

```ts
import { getOrd } from 'fp-ts/lib/Array'
import { ordString } from 'fp-ts/lib/Ord'

const O = getOrd(ordString)
assert.strictEqual(O.compare(['b'], ['a']), 1)
assert.strictEqual(O.compare(['a'], ['a']), 0)
assert.strictEqual(O.compare(['a'], ['b']), -1)
```

## head

```ts
<A>(as: Array<A>): Option<A>
```

Added in v1.0.0 (function)

Get the first element in an array, or `None` if the array is empty

_Example_

```ts
import { head } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(head([1, 2, 3]), some(1))
assert.deepEqual(head([]), none)
```

## index

```ts
<A>(i: number, as: Array<A>): Option<A>
```

Added in v1.0.0 (function)

This function provides a safe way to read a value at a particular index from an array

_Example_

```ts
import { index } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(index(1, [1, 2, 3]), some(2))
assert.deepEqual(index(3, [1, 2, 3]), none)
```

## init

```ts
<A>(as: Array<A>): Option<Array<A>>
```

Added in v1.0.0 (function)

Get all but the last element of an array, creating a new array, or `None` if the array is empty

_Example_

```ts
import { init } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(init([1, 2, 3]), some([1, 2]))
assert.deepEqual(init([]), none)
```

## insertAt

```ts
<A>(i: number, a: A, as: Array<A>): Option<Array<A>>
```

Added in v1.0.0 (function)

Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds

_Example_

```ts
import { insertAt } from 'fp-ts/lib/Array'
import { some } from 'fp-ts/lib/Option'

assert.deepEqual(insertAt(2, 5, [1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
```

## intersection

```ts
<A>(S: Setoid<A>): ((xs: Array<A>, ys: Array<A>) => Array<A>)
```

Added in v1.12.0 (function)

Creates an array of unique values that are included in all given arrays using a [Setoid](./Setoid.md) for equality
comparisons. The order and references of result values are determined by the first array.

_Example_

```ts
import { intersection } from 'fp-ts/lib/Array'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.deepEqual(intersection(setoidNumber)([1, 2], [2, 3]), [2])
```

## isEmpty

```ts
<A>(as: Array<A>): boolean
```

Added in v1.0.0 (function)

Test whether an array is empty

_Example_

```ts
import { isEmpty } from 'fp-ts/lib/Array'

assert.strictEqual(isEmpty([]), true)
```

## isOutOfBound

```ts
<A>(i: number, as: Array<A>): boolean
```

Added in v1.0.0 (function)

Test whether an array contains a particular index

## last

```ts
<A>(as: Array<A>): Option<A>
```

Added in v1.0.0 (function)

Get the last element in an array, or `None` if the array is empty

_Example_

```ts
import { last } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(last([1, 2, 3]), some(3))
assert.deepEqual(last([]), none)
```

## lefts

```ts
<L, A>(as: Array<Either<L, A>>): Array<L>
```

Added in v1.0.0 (function)

Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order

_Example_

```ts
import { lefts } from 'fp-ts/lib/Array'
import { left, right } from 'fp-ts/lib/Either'

assert.deepEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
```

## makeBy

```ts
<A>(n: number, f: (i: number) => A): Array<A>
```

Added in v1.10.0 (function)

Return a list of length `n` with element `i` initialized with `f(i)`

_Example_

```ts
import { makeBy } from 'fp-ts/lib/Array'

const double = (n: number): number => n * 2
assert.deepEqual(makeBy(5, double), [0, 2, 4, 6, 8])
```

## mapOption

```ts
<A, B>(as: Array<A>, f: (a: A) => Option<B>): Array<B>
```

Added in v1.0.0 (function)

Apply a function to each element in an array, keeping only the results which contain a value, creating a new array.

Alias of [Filterable](./Filterable.md)'s `filterMap`

_Example_

```ts
import { mapOption } from 'fp-ts/lib/Array'
import { Option, some, none } from 'fp-ts/lib/Option'

const f = (n: number): Option<number> => (n % 2 === 0 ? none : some(n))
assert.deepEqual(mapOption([1, 2, 3], f), [1, 3])
```

## member

```ts
<A>(S: Setoid<A>) => (as: Array<A>, a: A): boolean
```

Added in v1.3.0 (function)

Test if a value is a member of an array. Takes a `Setoid<A>` as a single
argument which returns the function to use to search for a value of type `A` in
an array of type `Array<A>`.

_Example_

```ts
import { member } from 'fp-ts/lib/Array'
import { setoidString, setoidNumber } from 'fp-ts/lib/Setoid'

assert.strictEqual(member(setoidString)(['thing one', 'thing two', 'cat in the hat'], 'thing two'), true)
assert.strictEqual(member(setoidNumber)([1, 2, 3], 1), true)
assert.strictEqual(member(setoidNumber)([1, 2, 3], 4), false)
```

## modifyAt

```ts
<A>(as: Array<A>, i: number, f: Endomorphism<A>): Option<Array<A>>
```

Added in v1.0.0 (function)

Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
of bounds

_Example_

```ts
import { modifyAt } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

const double = (x: number): number => x * 2
assert.deepEqual(modifyAt([1, 2, 3], 1, double), some([1, 4, 3]))
assert.deepEqual(modifyAt([], 1, double), none)
```

## partition

```ts
partition<A>(fa: Array<A>, p: Predicate<A>): Separated<Array<A>, Array<A>>
```

Added in v1.12.0 (function)

## partitionMap

```ts
<A, L, R>(fa: Array<A>, f: (a: A) => Either<L, R>): Separated<Array<L>, Array<R>>
```

Added in v1.0.0 (function)

_Example_

```ts
import { array } from 'fp-ts/lib/Array'
import { left, right } from 'fp-ts/lib/Either'
import { identity } from 'fp-ts/lib/function'

assert.deepEqual(array.partitionMap([right(1), left('foo'), right(2)], identity), { left: ['foo'], right: [1, 2] })
```

## range

```ts
(start: number, end: number): Array<number>
```

Added in v1.10.0 (function)

Create an array containing a range of integers, including both endpoints

_Example_

```ts
import { range } from 'fp-ts/lib/Array'

assert.deepEqual(range(1, 5), [1, 2, 3, 4, 5])
```

## ~~refine~~ (deprecated)

```ts
<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Array<B>
```

Added in v1.0.0 (function)

Use [filter](#filter) instead

## replicate

```ts
<A>(n: number, a: A): Array<A>
```

Added in v1.10.0 (function)

Create an array containing a value repeated the specified number of times

_Example_

```ts
import { replicate } from 'fp-ts/lib/Array'

assert.deepEqual(replicate(3, 'a'), ['a', 'a', 'a'])
```

## reverse

```ts
<A>(as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Reverse an array, creating a new array

_Example_

```ts
import { reverse } from 'fp-ts/lib/Array'

assert.deepEqual(reverse([1, 2, 3]), [3, 2, 1])
```

## rights

```ts
<L, A>(as: Array<Either<L, A>>): Array<A>
```

Added in v1.0.0 (function)

Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order

_Example_

```ts
import { rights } from 'fp-ts/lib/Array'
import { right, left } from 'fp-ts/lib/Either'

assert.deepEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
```

## rotate

```ts
<A>(n: number, xs: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Rotate an array to the right by `n` steps

_Example_

```ts
import { rotate } from 'fp-ts/lib/Array'

assert.deepEqual(rotate(2, [1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
```

## scanLeft

```ts
<A, B>(as: Array<A>, b: B, f: ((b: B, a: A) => B)): Array<B>
```

Added in v1.1.0 (function)

Same as `reduce` but it carries over the intermediate steps

```ts
import { scanLeft } from 'fp-ts/lib/Array'

scanLeft([1, 2, 3], 10, (b, a) => b - a) // [ 10, 9, 7, 4 ]
```

## scanRight

```ts
<A, B>(as: Array<A>, b: B, f: (a: A, b: B) => B): Array<B>
```

Added in v1.1.0 (function)

Fold an array from the right, keeping all intermediate results instead of only the final result

_Example_

```ts
import { scanRight } from 'fp-ts/lib/Array'

assert.deepEqual(scanRight([1, 2, 3], 10, (a, b) => b - a), [4, 5, 7, 10])
```

## snoc

```ts
<A>(as: Array<A>, a: A): Array<A>
```

Added in v1.0.0 (function)

Append an element to the end of an array, creating a new array

_Example_

```ts
import { snoc } from 'fp-ts/lib/Array'

assert.deepEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
```

## sort

```ts
<A>(O: Ord<A>) => (as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Sort the elements of an array in increasing order, creating a new array

_Example_

```ts
import { sort } from 'fp-ts/lib/Array'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
```

## sortBy

```ts
<A>(ords: Array<Ord<A>>): Option<Endomorphism<Array<A>>>
```

Added in v1.3.0 (function)

Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
etc...

_Example_

```ts
import { sortBy } from 'fp-ts/lib/Array'
import { contramap, ordString, ordNumber } from 'fp-ts/lib/Ord'

interface Person {
  name: string
  age: number
}
const byName = contramap((p: Person) => p.name, ordString)
const byAge = contramap((p: Person) => p.age, ordNumber)

const sortByNameByAge = sortBy([byName, byAge])

if (sortByNameByAge.isSome()) {
  const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
  assert.deepEqual(sortByNameByAge.value(persons), [
    { name: 'a', age: 1 },
    { name: 'b', age: 2 },
    { name: 'b', age: 3 },
    { name: 'c', age: 2 }
  ])
}
```

## sortBy1

```ts
<A>(head: Ord<A>, tail: Array<Ord<A>>): Endomorphism<Array<A>>
```

Added in v1.3.0 (function)

Non failing version of [sortBy](#sortby)

_Example_

```ts
import { sortBy1 } from 'fp-ts/lib/Array'
import { contramap, ordString, ordNumber } from 'fp-ts/lib/Ord'

interface Person {
  name: string
  age: number
}
const byName = contramap((p: Person) => p.name, ordString)
const byAge = contramap((p: Person) => p.age, ordNumber)

const sortByNameByAge = sortBy1(byName, [byAge])

const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
assert.deepEqual(sortByNameByAge(persons), [
  { name: 'a', age: 1 },
  { name: 'b', age: 2 },
  { name: 'b', age: 3 },
  { name: 'c', age: 2 }
])
```

## span

```ts
span<A>(as: Array<A>, predicate: Predicate<A>):
```

Added in v1.0.0 (function)

Split an array into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

_Example_

```ts
import { span } from 'fp-ts/lib/Array'

assert.deepEqual(span([1, 3, 2, 4, 5], n => n % 2 === 1), { init: [1, 3], rest: [2, 4, 5] })
```

## split

```ts
<A>(n: number, as: Array<A>): [Array<A>, Array<A>]
```

Added in v1.10.0 (function)

Splits an array into two pieces, the first piece has `n` elements.

_Example_

```ts
import { split } from 'fp-ts/lib/Array'

assert.deepEqual(split(2, [1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
```

## tail

```ts
<A>(as: Array<A>): Option<Array<A>>
```

Added in v1.0.0 (function)

Get all but the first element of an array, creating a new array, or `None` if the array is empty

_Example_

```ts
import { tail } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(tail([1, 2, 3]), some([2, 3]))
assert.deepEqual(tail([]), none)
```

## take

```ts
<A>(n: number, as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Keep only a number of elements from the start of an array, creating a new array.
`n` must be a natural number

_Example_

```ts
import { take } from 'fp-ts/lib/Array'

assert.deepEqual(take(2, [1, 2, 3]), [1, 2])
```

## takeEnd

```ts
<A>(n: number, as: Array<A>): Array<A>
```

Added in v1.10.0 (function)

Keep only a number of elements from the end of an array, creating a new array.
`n` must be a natural number

_Example_

```ts
import { takeEnd } from 'fp-ts/lib/Array'

assert.deepEqual(takeEnd(2, [1, 2, 3, 4, 5]), [4, 5])
```

## takeWhile

```ts
takeWhile<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
```

Added in v1.0.0 (function)

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array

_Example_

```ts
import { takeWhile } from 'fp-ts/lib/Array'

assert.deepEqual(takeWhile([2, 4, 3, 6], n => n % 2 === 0), [2, 4])
```

## ~~traverse~~ (deprecated)

```ts
traverse<F>(F: Applicative<F>): <A, B>(ta: Array<A>, f: (a: A) => HKT<F, B>) => HKT<F, Array<B>>
```

Added in v1.0.0 (function)

Use [array](#array)`.traverse` instead

## union

```ts
<A>(S: Setoid<A>): ((xs: Array<A>, ys: Array<A>) => Array<A>)
```

Added in v1.12.0 (function)

Creates an array of unique values, in order, from all given arrays using a [Setoid](./Setoid.md) for equality comparisons

_Example_

```ts
import { union } from 'fp-ts/lib/Array'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.deepEqual(union(setoidNumber)([1, 2], [2, 3]), [1, 2, 3])
```

## uniq

```ts
<A>(S: Setoid<A>): ((as: Array<A>) => Array<A>)
```

Added in v1.3.0 (function)

Remove duplicates from an array, keeping the first occurance of an element.

_Example_

```ts
import { uniq } from 'fp-ts/lib/Array'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.deepEqual(uniq(setoidNumber)([1, 2, 1]), [1, 2])
```

## unsafeDeleteAt

```ts
<A>(i: number, as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

## unsafeInsertAt

```ts
<A>(i: number, a: A, as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

## unsafeUpdateAt

```ts
<A>(i: number, a: A, as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

## unzip

```ts
<A, B>(as: Array<[A, B]>): [Array<A>, Array<B>]
```

Added in v1.13.0 (function)

The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays

_Example_

```ts
import { unzip } from 'fp-ts/lib/Array'

assert.deepEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
```

## updateAt

```ts
<A>(i: number, a: A, as: Array<A>): Option<Array<A>>
```

Added in v1.0.0 (function)

Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

_Example_

```ts
import { updateAt } from 'fp-ts/lib/Array'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(updateAt(1, 1, [1, 2, 3]), some([1, 1, 3]))
assert.deepEqual(updateAt(1, 1, []), none)
```

## zip

```ts
<A, B>(fa: Array<A>, fb: Array<B>): Array<[A, B]>
```

Added in v1.0.0 (function)

Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
longer array are discarded

_Example_

```ts
import { zip } from 'fp-ts/lib/Array'

assert.deepEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
```

## zipWith

```ts
<A, B, C>(fa: Array<A>, fb: Array<B>, f: (a: A, b: B) => C): Array<C>
```

Added in v1.0.0 (function)

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
input array is short, excess elements of the longer array are discarded.

_Example_

```ts
import { zipWith } from 'fp-ts/lib/Array'

assert.deepEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
```
