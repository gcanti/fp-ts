MODULE [Array](https://github.com/gcanti/fp-ts/blob/master/src/Array.ts)
# catOptions
*function*
```ts
<A>(as: Array<Option<A>>): Array<A>
```
Filter an array of optional values, keeping only the elements which contain
a value, creating a new array

# copy
*function*
```ts
<A>(as: Array<A>): Array<A>
```

# deleteAt
*function*
```ts
<A>(i: number, as: Array<A>): Option<Array<A>>
```
Delete the element at the specified index, creating a new array, or
returning `None` if the index is out of bounds

# drop
*function*
```ts
<A>(n: number, as: Array<A>): Array<A>
```
Drop a number of elements from the start of an array, creating a new array

# dropWhile
*function*
```ts
<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
```
Remove the longest initial subarray for which all element satisfy the
specified predicate, creating a new array

# filter
*function*
```ts
<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
```
Filter an array, keeping the elements which satisfy a predicate function, creating a new array

# findFirst
*function*
```ts
<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
```
Find the first element which satisfies a predicate function

# findIndex
*function*
```ts
<A>(as: Array<A>, predicate: Predicate<A>): Option<number>
```
Find the first index for which a predicate holds

# findLast
*function*
```ts
<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
```
Find the last element which satisfies a predicate function

# flatten
*function*
```ts
<A>(ffa: Array<Array<A>>): Array<A>
```
Example

```ts
flatten([[1], [2], [3]]) // [1, 2, 3]
```

# fold
*function*
```ts
<A, B>(as: Array<A>, b: B, cons: (head: A, tail: Array<A>) => B): B
```
Break an array into its first element and remaining elements

# foldL
*function*
```ts
<A, B>(as: Array<A>, nil: () => B, cons: (head: A, tail: Array<A>) => B): B
```
Lazy version of `fold`

# getMonoid
*function*
```ts
<A = never>(): Monoid<Array<A>>
```

# head
*function*
```ts
<A>(as: Array<A>): Option<A>
```
Get the first element in an array, or `None` if the array is empty

# index
*function*
```ts
<A>(i: number, as: Array<A>): Option<A>
```
This function provides a safe way to read a value at a particular index from an array

# init
*function*
```ts
<A>(as: Array<A>): Option<Array<A>>
```
Get all but the last element of an array, creating a new array, or `None` if the array is empty

# insertAt
*function*
```ts
<A>(i: number, a: A, as: Array<A>): Option<Array<A>>
```
Insert an element at the specified index, creating a new array, or
returning `None` if the index is out of bounds

# isEmpty
*function*
```ts
<A>(as: Array<A>): boolean
```
Test whether an array is empty

# isOutOfBound
*function*
```ts
<A>(i: number, as: Array<A>): boolean
```
Test whether an array contains a particular index

# last
*function*
```ts
<A>(as: Array<A>): Option<A>
```
Get the last element in an array, or `None` if the array is empty

# lefts
*function*
```ts
<L, A>(as: Array<Either<L, A>>): Array<L>
```
Extracts from a list of `Either` all the `Left` elements. All the `Left` elements are extracted in order

# mapOption
*function*
```ts
<A, B>(as: Array<A>, f: (a: A) => Option<B>): Array<B>
```
Apply a function to each element in an array, keeping only the results
which contain a value, creating a new array

# modifyAt
*function*
```ts
<A>(as: Array<A>, i: number, f: Endomorphism<A>): Option<Array<A>>
```
Apply a function to the element at the specified index, creating a new
array, or returning `None` if the index is out of bounds

# partitionMap
*function*
```ts
<A, L, R>(fa: Array<A>, f: (a: A) => Either<L, R>): { left: Array<L>; right: Array<R> }
```

# refine
*function*
```ts
<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Array<B>
```

# reverse
*function*
```ts
<A>(as: Array<A>): Array<A>
```
Reverse an array, creating a new array

# rights
*function*
```ts
<L, A>(as: Array<Either<L, A>>): Array<A>
```
Extracts from a list of `Either` all the `Right` elements. All the `Right` elements are extracted in order

# rotate
*function*
```ts
<A>(n: number, xs: Array<A>): Array<A>
```
Rotate an array to the right by `n` steps

# snoc
*function*
```ts
<A>(as: Array<A>, a: A): Array<A>
```
Append an element to the end of an array, creating a new array

# sort
*function*
```ts
<A>(ord: Ord<A>): ((as: Array<A>) => Array<A>)
```
Sort the elements of an array in increasing order, creating a new array

# span
*function*
```ts
<A>(as: Array<A>, predicate: Predicate<A>): { init: Array<A>; rest: Array<A> }
```
Split an array into two parts:
1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

# tail
*function*
```ts
<A>(as: Array<A>): Option<Array<A>>
```
Get all but the first element of an array, creating a new array, or `None` if the array is empty

# take
*function*
```ts
<A>(n: number, as: Array<A>): Array<A>
```
Keep only a number of elements from the start of an array, creating a new array

# takeWhile
*function*
```ts
<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
```
Calculate the longest initial subarray for which all element satisfy the
specified predicate, creating a new array

# unsafeDeleteAt
*function*
```ts
<A>(i: number, as: Array<A>): Array<A>
```

# unsafeInsertAt
*function*
```ts
<A>(i: number, a: A, as: Array<A>): Array<A>
```

# unsafeUpdateAt
*function*
```ts
<A>(i: number, a: A, as: Array<A>): Array<A>
```

# updateAt
*function*
```ts
<A>(i: number, a: A, as: Array<A>): Option<Array<A>>
```
Change the element at the specified index, creating a new array, or
returning `None` if the index is out of bounds

# zip
*function*
```ts
<A, B>(fa: Array<A>, fb: Array<B>): Array<[A, B]>
```
Takes two arrays and returns an array of corresponding pairs.
If one input array is short, excess elements of the longer array are discarded

# zipWith
*function*
```ts
<A, B, C>(fa: Array<A>, fb: Array<B>, f: (a: A, b: B) => C): Array<C>
```
Apply a function to pairs of elements at the same index in two arrays,
collecting the results in a new array.
If one input array is short, excess elements of the longer array are discarded.