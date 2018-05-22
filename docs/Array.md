---
id: Array
title: Module Array
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Array.ts)

## Functions

### catOptions

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<Option<A>>): Array<A>
```

_Description_

Filter an array of optional values, keeping only the elements which contain a value, creating a new array

### cons

_function_

_since 1.0.0_

_Signature_

```ts
<A>(a: A, as: Array<A>): Array<A>
```

_Description_

Attaches an element to the front of an array, creating a new array

### copy

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>): Array<A>
```

### deleteAt

_function_

_since 1.0.0_

_Signature_

```ts
<A>(i: number, as: Array<A>): Option<Array<A>>
```

_Description_

Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

### drop

_function_

_since 1.0.0_

_Signature_

```ts
<A>(n: number, as: Array<A>): Array<A>
```

_Description_

Drop a number of elements from the start of an array, creating a new array

### dropWhile

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
```

_Description_

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array

### filter

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
```

_Description_

Filter an array, keeping the elements which satisfy a predicate function, creating a new array

### findFirst

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
```

_Description_

Find the first element which satisfies a predicate function

### findIndex

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Option<number>
```

_Description_

Find the first index for which a predicate holds

### findLast

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
```

_Description_

Find the last element which satisfies a predicate function

### flatten

_function_

_since 1.0.0_

_Signature_

```ts
<A>(ffa: Array<Array<A>>): Array<A>
```

_Example_

```ts
flatten([[1], [2], [3]]) // [1, 2, 3]
```

### fold

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(as: Array<A>, b: B, cons: (head: A, tail: Array<A>) => B): B
```

_Description_

Break an array into its first element and remaining elements

### foldL

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(as: Array<A>, nil: () => B, cons: (head: A, tail: Array<A>) => B): B
```

_Description_

Lazy version of `fold`

### getMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Monoid<Array<A>>
```

### getOrd

_function_

_since 1.2.0_

_Signature_

```ts
<A>(O: Ord<A>): Ord<Array<A>> => ({
  ...getSetoid(O),
  compare: (a: Array<A>, b: Array<A>): Ordering
```

_Description_

Derives an Order over the Array of a given element type from the Order, 'O', of that type. The ordering between two
such arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order,
in case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
the same length, the result is equality.

### getSetoid

_function_

_since 1.0.0_

_Signature_

```ts
getArraySetoid
```

_Description_

Derives a Setoid over the Array of a given element type from the Setoid of that type. The derived setoid defines two
arrays as equal if all elements of both arrays are compared equal pairwise with the given setoid 'S'. In case of
arrays of different lengths, the result is non equality.

### head

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>): Option<A>
```

_Description_

Get the first element in an array, or `None` if the array is empty

### index

_function_

_since 1.0.0_

_Signature_

```ts
<A>(i: number, as: Array<A>): Option<A>
```

_Description_

This function provides a safe way to read a value at a particular index from an array

### init

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>): Option<Array<A>>
```

_Description_

Get all but the last element of an array, creating a new array, or `None` if the array is empty

### insertAt

_function_

_since 1.0.0_

_Signature_

```ts
<A>(i: number, a: A, as: Array<A>): Option<Array<A>>
```

_Description_

Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds

### isEmpty

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>): boolean
```

_Description_

Test whether an array is empty

### isOutOfBound

_function_

_since 1.0.0_

_Signature_

```ts
<A>(i: number, as: Array<A>): boolean
```

_Description_

Test whether an array contains a particular index

### last

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>): Option<A>
```

_Description_

Get the last element in an array, or `None` if the array is empty

### lefts

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(as: Array<Either<L, A>>): Array<L>
```

_Description_

Extracts from a list of `Either` all the `Left` elements. All the `Left` elements are extracted in order

### mapOption

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(as: Array<A>, f: (a: A) => Option<B>): Array<B>
```

_Description_

Apply a function to each element in an array, keeping only the results
which contain a value, creating a new array

### member

_function_

_since 1.3.0_

_Signature_

```ts
<A>(S: Setoid<A>) => (as: Array<A>, a: A): boolean
```

_Description_

Test if a value is a member of an array

### modifyAt

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>, i: number, f: Endomorphism<A>): Option<Array<A>>
```

_Description_

Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
of bounds

### partitionMap

_function_

_since 1.0.0_

_Signature_

```ts
<A, L, R>(fa: Array<A>, f: (a: A) => Either<L, R>): { left: Array<L>; right: Array<R> }
```

### refine

_function_

_since 1.0.0_

_Signature_

```ts
<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Array<B>
```

### reverse

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>): Array<A>
```

_Description_

Reverse an array, creating a new array

### rights

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(as: Array<Either<L, A>>): Array<A>
```

_Description_

Extracts from a list of `Either` all the `Right` elements. All the `Right` elements are extracted in order

### rotate

_function_

_since 1.0.0_

_Signature_

```ts
<A>(n: number, xs: Array<A>): Array<A>
```

_Description_

Rotate an array to the right by `n` steps

### scanLeft

_function_

_since 1.1.0_

_Signature_

```ts
<A, B>(as: Array<A>, b: B, f: ((b: B, a: A) => B)): Array<B>
```

_Description_

Same as `reduce` but it carries over the intermediate steps

```ts
scanLeft([1, 2, 3], 10, (b, a) => b - a) // [ 10, 9, 7, 4 ]
```

### scanRight

_function_

_since 1.1.0_

_Signature_

```ts
<A, B>(as: Array<A>, b: B, f: (a: A, b: B) => B): Array<B>
```

_Description_

Fold an array from the right, keeping all intermediate results instead of only the final result

```ts
scanRight([1, 2, 3], 10, (a, b) => b - a) // [ 4, 5, 7, 10 ]
```

### snoc

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>, a: A): Array<A>
```

_Description_

Append an element to the end of an array, creating a new array

### sort

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>) => (as: Array<A>): Array<A>
```

_Description_

Sort the elements of an array in increasing order, creating a new array

### sortBy

_function_

_since 1.3.0_

_Signature_

```ts
<A>(ords: Array<Ord<A>>): Option<Endomorphism<Array<A>>>
```

_Description_

Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
etc...

### sortBy1

_function_

_since 1.3.0_

_Signature_

```ts
<A>(head: Ord<A>, tail: Array<Ord<A>>): Endomorphism<Array<A>>
```

_Description_

Non failing version of `sortBy`

### span

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>, predicate: Predicate<A>): { init: Array<A>; rest: Array<A> }
```

_Description_

Split an array into two parts:

1.  the longest initial subarray for which all elements satisfy the specified predicate
2.  the remaining elements

### tail

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>): Option<Array<A>>
```

_Description_

Get all but the first element of an array, creating a new array, or `None` if the array is empty

### take

_function_

_since 1.0.0_

_Signature_

```ts
<A>(n: number, as: Array<A>): Array<A>
```

_Description_

Keep only a number of elements from the start of an array, creating a new array

### takeWhile

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
```

_Description_

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array

### traverse

_function_

_since 1.0.0_

_Signature_

```ts
traverse<F>(F: Applicative<F>): <A, B>(ta: Array<A>, f: (a: A) => HKT<F, B>) => HKT<F, Array<B>>
```

### uniq

_function_

_since 1.3.0_

_Signature_

```ts
<A>(S: Setoid<A>): ((as: Array<A>) => Array<A>)
```

_Description_

Remove duplicates from an array, keeping the first occurance of an element.

### unsafeDeleteAt

_function_

_since 1.0.0_

_Signature_

```ts
<A>(i: number, as: Array<A>): Array<A>
```

### unsafeInsertAt

_function_

_since 1.0.0_

_Signature_

```ts
<A>(i: number, a: A, as: Array<A>): Array<A>
```

### unsafeUpdateAt

_function_

_since 1.0.0_

_Signature_

```ts
<A>(i: number, a: A, as: Array<A>): Array<A>
```

### updateAt

_function_

_since 1.0.0_

_Signature_

```ts
<A>(i: number, a: A, as: Array<A>): Option<Array<A>>
```

_Description_

Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

### zip

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(fa: Array<A>, fb: Array<B>): Array<[A, B]>
```

_Description_

Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
longer array are discarded

### zipWith

_function_

_since 1.0.0_

_Signature_

```ts
<A, B, C>(fa: Array<A>, fb: Array<B>, f: (a: A, b: B) => C): Array<C>
```

_Description_

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
input array is short, excess elements of the longer array are discarded.
