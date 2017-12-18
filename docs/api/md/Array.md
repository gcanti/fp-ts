MODULE [Array](https://github.com/gcanti/fp-ts/blob/master/src/Array.ts)

# alt

_function_

```ts
<A>(x: Array<A>, y: Array<A>): Array<A>
```

# ap

_function_

```ts
<A, B>(fab: Array<(a: A) => B>, fa: Array<A>): Array<B>
```

# catOptions

_function_

```ts
<A>(as: Array<Option<A>>): Array<A>
```

Filter an array of optional values, keeping only the elements which contain a value, creating a new array

# chain

_function_

```ts
<A, B>(f: (a: A) => Array<B>, fa: Array<A>): Array<B>
```

# concat

_function_

```ts
<A>(x: Array<A>) => (y: Array<A>): Array<A>
```

# copy

_function_

```ts
<A>(as: Array<A>): Array<A>
```

# deleteAt

_function_

```ts
(i: number) => <A>(as: Array<A>): Option<Array<A>>
```

Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

# drop

_function_

```ts
(n: number) => <A>(as: Array<A>): Array<A>
```

Drop a number of elements from the start of an array, creating a new array

# dropWhile

_function_

```ts
<A>(predicate: Predicate<A>) => (as: Array<A>): Array<A>
```

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array

# empty

_function_

```ts
(): Array<any>
```

# extend

_function_

```ts
<A, B>(f: (fa: Array<A>) => B, fa: Array<A>): Array<B>
```

# filter

_function_

```ts
<A>(predicate: Predicate<A>) => (as: Array<A>): Array<A>
```

Filter an array, keeping the elements which satisfy a predicate function, creating a new array

# findFirst

_function_

```ts
<A>(predicate: Predicate<A>) => (as: Array<A>): Option<A>
```

Find the first element which satisfies a predicate function

# findIndex

_function_

```ts
<A>(predicate: Predicate<A>) => (as: Array<A>): Option<number>
```

Find the first index for which a predicate holds

# findLast

_function_

```ts
<A>(predicate: Predicate<A>) => (as: Array<A>): Option<A>
```

Find the last element which satisfies a predicate function

# flatten

_function_

```ts
<A>(ffa: Array<Array<A>>): Array<A>
```

Example

```ts
flatten([[1], [2], [3]]) // [1, 2, 3]
```

# fold

_function_

```ts
<A, B>(nil: Lazy<B>, cons: (head: A, tail: Array<A>) => B, as: Array<A>): B
```

Break an array into its first element and remaining elements

Example

```ts
const length = <A>(xs: Array<A>): number => fold(() => 0, (head, tail) => 1 + length(tail), xs)
```

# getMonoid

_function_

```ts
<A>(): Monoid<Array<A>>
```

# getSemigroup

_function_

```ts
<A>(): Semigroup<Array<A>>
```

# head

_function_

```ts
<A>(as: Array<A>): Option<A>
```

Get the first element in an array, or `None` if the array is empty

# index

_function_

```ts
(i: number) => <A>(as: Array<A>): Option<A>
```

This function provides a safe way to read a value at a particular index from an array

# init

_function_

```ts
<A>(as: Array<A>): Option<Array<A>>
```

Get all but the last element of an array, creating a new array, or `None` if the array is empty

# insertAt

_function_

```ts
(i: number) => <A>(a: A) => (as: Array<A>): Option<Array<A>>
```

Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds

# isEmpty

_function_

```ts
<A>(as: Array<A>): boolean
```

Test whether an array is empty

# isOutOfBound

_function_

```ts
(i: number) => <A>(as: Array<A>): boolean
```

Test whether an array contains a particular index

# last

_function_

```ts
<A>(as: Array<A>): Option<A>
```

Get the last element in an array, or `None` if the array is empty

# lefts

_function_

```ts
<L, A>(as: Array<Either<L, A>>): Array<L>
```

Extracts from a list of `Either` all the `Left` elements. All the `Left` elements are extracted in order

# length

_function_

```ts
<A>(as: Array<A>): number
```

Get the number of elements in an array

# map

_function_

```ts
<A, B>(f: (a: A) => B, fa: Array<A>): Array<B>
```

# mapOption

_function_

```ts
<A, B>(f: (a: A) => Option<B>) => (as: Array<A>): Array<B>
```

Apply a function to each element in an array, keeping only the results which contain a value, creating a new array

# modifyAt

_function_

```ts
(i: number) => <A>(f: Endomorphism<A>) => (as: Array<A>): Option<Array<A>>
```

Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out of
bounds

# of

_function_

```ts
<A>(a: A): Array<A>
```

# partitionMap

_function_

```ts
<A, L, R>(f: (a: A) => Either<L, R>, fa: Array<A>): { left: Array<L>; right: Array<R> }
```

# reduce

_function_

```ts
<A, B>(f: (b: B, a: A) => B, b: B, fa: Array<A>): B
```

# refine

_function_

```ts
<A>(as: Array<A>) => <B extends A>(refinement: Refinement<A, B>): Array<B>
```

# reverse

_function_

```ts
<A>(as: Array<A>): Array<A>
```

Reverse an array, creating a new array

# rights

_function_

```ts
<L, A>(as: Array<Either<L, A>>): Array<A>
```

Extracts from a list of `Either` all the `Right` elements. All the `Right` elements are extracted in order

# rotate

_function_

```ts
(n: number) => <A>(xs: Array<A>): Array<A>
```

Rotate an array to the right by `n` steps

# slice

_function_

```ts
(start: number, end: number) => <A>(as: Array<A>): Array<A>
```

Extract a subarray by a start and end index

# snoc

_function_

```ts
<A>(as: Array<A>) => (a: A): Array<A>
```

Append an element to the end of an array, creating a new array

# sort

_function_

```ts
<A>(ord: Ord<A>): ((as: Array<A>) => Array<A>)
```

Sort the elements of an array in increasing order, creating a new array

# span

_function_

```ts
<A>(predicate: Predicate<A>) => (as: Array<A>): { init: Array<A>; rest: Array<A> }
```

Split an array into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

# tail

_function_

```ts
<A>(as: Array<A>): Option<Array<A>>
```

Get all but the first element of an array, creating a new array, or `None` if the array is empty

# take

_function_

```ts
(n: number) => <A>(as: Array<A>): Array<A>
```

Keep only a number of elements from the start of an array, creating a new array

# takeWhile

_function_

```ts
<A>(predicate: Predicate<A>) => (as: Array<A>): Array<A>
```

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array

# traverse

_function_

```ts
traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Array<A>) => HKT<F, Array<B>>
```

# unfoldr

_function_

```ts
<A, B>(f: (b: B) => Option<[A, B]>, b: B): Array<A>
```

# unsafeDeleteAt

_function_

```ts
(i: number) => <A>(as: Array<A>): Array<A>
```

# unsafeInsertAt

_function_

```ts
(i: number) => <A>(a: A) => (as: Array<A>): Array<A>
```

# unsafeUpdateAt

_function_

```ts
(i: number) => <A>(a: A) => (as: Array<A>): Array<A>
```

# updateAt

_function_

```ts
(i: number) => <A>(a: A) => (as: Array<A>): Option<Array<A>>
```

Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds

# zero

_function_ Alias of

```ts
empty
```

# zip

_function_

```ts
<A>(fa: Array<A>) => <B>(fb: Array<B>): Array<[A, B]>
```

Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the longer
array are discarded

# zipWith

_function_

```ts
<A, B, C>(f: (a: A, b: B) => C) => (fa: Array<A>) => (fb: Array<B>): Array<C>
```

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
input array is short, excess elements of the longer array are discarded.
