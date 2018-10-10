---
id: Array
title: Module Array
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Array.ts)

## empty

```ts
Array<never>
```

Added in v1.9.0 (constant)

An empty array

## getSetoid

```ts
<A>(S: Setoid<A>) => Setoid<Array<A>>
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

## cons

```ts
<A>(a: A, as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Attaches an element to the front of an array, creating a new array

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

## drop

```ts
<A>(n: number, as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Drop a number of elements from the start of an array, creating a new array

## dropWhile

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
```

Added in v1.0.0 (function)

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array

## filter

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
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
assert.deepEqual(findFirst([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 1 }))
```

## findIndex

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Option<number>
```

Added in v1.0.0 (function)

Find the first index for which a predicate holds

## findLast

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
```

Added in v1.0.0 (function)

Find the last element which satisfies a predicate function

## flatten

```ts
<A>(ffa: Array<Array<A>>): Array<A>
```

Added in v1.0.0 (function)

_Example_

```ts
flatten([[1], [2], [3]]) // [1, 2, 3]
```

## fold

```ts
<A, B>(as: Array<A>, b: B, cons: (head: A, tail: Array<A>) => B): B
```

Added in v1.0.0 (function)

Break an array into its first element and remaining elements

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

## getOrd

```ts
<A>(O: Ord<A>): Ord<Array<A>> => ({
  ...getSetoid(O),
  compare: (a: Array<A>, b: Array<A>): Ordering
```

Added in v1.2.0 (function)

Derives an `Ord` over the Array of a given element type from the `Ord` of that type. The ordering between two such
arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
the same length, the result is equality.

## head

```ts
<A>(as: Array<A>): Option<A>
```

Added in v1.0.0 (function)

Get the first element in an array, or `None` if the array is empty

## index

```ts
<A>(i: number, as: Array<A>): Option<A>
```

Added in v1.0.0 (function)

This function provides a safe way to read a value at a particular index from an array

## init

```ts
<A>(as: Array<A>): Option<Array<A>>
```

Added in v1.0.0 (function)

Get all but the last element of an array, creating a new array, or `None` if the array is empty

## insertAt

```ts
<A>(i: number, a: A, as: Array<A>): Option<Array<A>>
```

Added in v1.0.0 (function)

Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds

## isEmpty

```ts
<A>(as: Array<A>): boolean
```

Added in v1.0.0 (function)

Test whether an array is empty

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

## lefts

```ts
<L, A>(as: Array<Either<L, A>>): Array<L>
```

Added in v1.0.0 (function)

Extracts from a list of `Either` all the `Left` elements. All the `Left` elements are extracted in order

## mapOption

```ts
<A, B>(as: Array<A>, f: (a: A) => Option<B>): Array<B>
```

Added in v1.0.0 (function)

Apply a function to each element in an array, keeping only the results which contain a value, creating a new array.

Alias of [Filterable](./Filterable.md)'s `filterMap`

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
import { setoidString } from 'fp-ts/lib/Setoid'

member(setoidString)(['thing one', 'thing two', 'cat in the hat'], 'thing two') // true
```

## modifyAt

```ts
<A>(as: Array<A>, i: number, f: Endomorphism<A>): Option<Array<A>>
```

Added in v1.0.0 (function)

Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
of bounds

## partitionMap

```ts
<A, L, R>(fa: Array<A>, f: (a: A) => Either<L, R>): Separated<Array<L>, Array<R>>
```

Added in v1.0.0 (function)

## refine

```ts
<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Array<B>
```

Added in v1.0.0 (function)

## reverse

```ts
<A>(as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Reverse an array, creating a new array

## rights

```ts
<L, A>(as: Array<Either<L, A>>): Array<A>
```

Added in v1.0.0 (function)

Extracts from a list of `Either` all the `Right` elements. All the `Right` elements are extracted in order

## rotate

```ts
<A>(n: number, xs: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Rotate an array to the right by `n` steps

## scanLeft

```ts
<A, B>(as: Array<A>, b: B, f: ((b: B, a: A) => B)): Array<B>
```

Added in v1.1.0 (function)

Same as `reduce` but it carries over the intermediate steps

```ts
scanLeft([1, 2, 3], 10, (b, a) => b - a) // [ 10, 9, 7, 4 ]
```

## scanRight

```ts
<A, B>(as: Array<A>, b: B, f: (a: A, b: B) => B): Array<B>
```

Added in v1.1.0 (function)

Fold an array from the right, keeping all intermediate results instead of only the final result

```ts
scanRight([1, 2, 3], 10, (a, b) => b - a) // [ 4, 5, 7, 10 ]
```

## snoc

```ts
<A>(as: Array<A>, a: A): Array<A>
```

Added in v1.0.0 (function)

Append an element to the end of an array, creating a new array

## sort

```ts
<A>(O: Ord<A>) => (as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Sort the elements of an array in increasing order, creating a new array

## sortBy

```ts
<A>(ords: Array<Ord<A>>): Option<Endomorphism<Array<A>>>
```

Added in v1.3.0 (function)

Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
etc...

## sortBy1

```ts
<A>(head: Ord<A>, tail: Array<Ord<A>>): Endomorphism<Array<A>>
```

Added in v1.3.0 (function)

Non failing version of [sortBy](#sortby)

## span

```ts
<A>(as: Array<A>, predicate: Predicate<A>): { init: Array<A>; rest: Array<A> }
```

Added in v1.0.0 (function)

Split an array into two parts:

1.  the longest initial subarray for which all elements satisfy the specified predicate
2.  the remaining elements

## tail

```ts
<A>(as: Array<A>): Option<Array<A>>
```

Added in v1.0.0 (function)

Get all but the first element of an array, creating a new array, or `None` if the array is empty

## take

```ts
<A>(n: number, as: Array<A>): Array<A>
```

Added in v1.0.0 (function)

Keep only a number of elements from the start of an array, creating a new array

## takeWhile

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
```

Added in v1.0.0 (function)

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array

## traverse

```ts
traverse<F>(F: Applicative<F>): <A, B>(ta: Array<A>, f: (a: A) => HKT<F, B>) => HKT<F, Array<B>>
```

Added in v1.0.0 (function)

## uniq

```ts
<A>(S: Setoid<A>): ((as: Array<A>) => Array<A>)
```

Added in v1.3.0 (function)

Remove duplicates from an array, keeping the first occurance of an element.

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

## updateAt

```ts
<A>(i: number, a: A, as: Array<A>): Option<Array<A>>
```

Added in v1.0.0 (function)

Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

## zip

```ts
<A, B>(fa: Array<A>, fb: Array<B>): Array<[A, B]>
```

Added in v1.0.0 (function)

Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
longer array are discarded

## zipWith

```ts
<A, B, C>(fa: Array<A>, fb: Array<B>, f: (a: A, b: B) => C): Array<C>
```

Added in v1.0.0 (function)

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
input array is short, excess elements of the longer array are discarded.
