MODULE [Array](https://github.com/gcanti/fp-ts/blob/master/src/Array.ts)
# URI
```ts
type URI = 'Array'
```
# Array

```ts
Array<A>
```
## Instances

### Alternative
```ts
getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>>
```
### Extend
```ts
getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>>
```
### Filterable
```ts
getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>>
```
### Foldable
```ts
getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>>
```
### Monad
```ts
getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>>
```
### Plus
```ts
getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>>
```
### Traversable
```ts
getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>>
```
### Unfoldable
```ts
getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>>
```
### Witherable
```ts
getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>>
```
# catOptions
```ts
<A>(as: Array<Option<A>>): Array<A>
```
Filter an array of optional values, keeping only the elements which contain a value, creating a new array
# cons
```ts
<A>(a: A) => (as: Array<A>): Array<A>
```
Attaches an element to the front of an array, creating a new array
# copy
```ts
<A>(as: Array<A>): Array<A>
```
# deleteAt
```ts
(i: number) => <A>(as: Array<A>): Option<Array<A>>
```
Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
# drop
```ts
(n: number) => <A>(as: Array<A>): Array<A>
```
Drop a number of elements from the start of an array, creating a new array
# dropWhile
```ts
<A>(predicate: Predicate<A>) => (as: Array<A>): Array<A>
```
Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
# filter
```ts
<A>(predicate: Predicate<A>) => (as: Array<A>): Array<A>
```
Filter an array, keeping the elements which satisfy a predicate function, creating a new array
# findIndex
```ts
<A>(predicate: Predicate<A>) => (as: Array<A>): Option<number>
```
Find the first index for which a predicate holds
# fold
```ts
<A, B>(nil: Lazy<B>, cons: (head: A, tail: Array<A>) => B, as: Array<A>): B
```
Break an array into its first element and remaining elements
# head
```ts
<A>(as: Array<A>): Option<A>
```
Get the first element in an array, or `None` if the array is empty
# index
```ts
(i: number) => <A>(as: Array<A>): Option<A>
```
This function provides a safe way to read a value at a particular index from an array
# init
```ts
<A>(as: Array<A>): Option<Array<A>>
```
Get all but the last element of an array, creating a new array, or `None` if the array is empty
# insertAt
```ts
(i: number) => <A>(a: A) => (as: Array<A>): Option<Array<A>>
```
Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
# isEmpty
```ts
<A>(as: Array<A>): boolean
```
Test whether an array is empty
# isOutOfBound
```ts
(i: number) => <A>(as: Array<A>): boolean
```
Test whether an array contains a particular index
# last
```ts
<A>(as: Array<A>): Option<A>
```
Get the last element in an array, or `None` if the array is empty
# length
```ts
<A>(as: Array<A>): number
```
Get the number of elements in an array
# mapOption
```ts
<A, B>(f: (a: A) => Option<B>) => (as: Array<A>): Array<B>
```
Apply a function to each element in an array, keeping only the results which contain a value, creating a new array
# modifyAt
```ts
(i: number) => <A>(f: Endomorphism<A>) => (as: Array<A>): Option<Array<A>>
```
Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
# refine
```ts
<A>(as: Array<A>) => <B extends A>(refinement: Refinement<A, B>): Array<B>
```
# reverse
```ts
<A>(as: Array<A>): Array<A>
```
Reverse an array, creating a new array
# slice
```ts
(start: number, end: number) => <A>(as: Array<A>): Array<A>
```
Extract a subarray by a start and end index
# snoc
```ts
<A>(as: Array<A>) => (a: A): Array<A>
```
Append an element to the end of an array, creating a new array
# sort
```ts
<A>(ord: Ord<A>) => (as: Array<A>): Array<A>
```
Sort the elements of an array in increasing order, creating a new array
# tail
```ts
<A>(as: Array<A>): Option<Array<A>>
```
Get all but the first element of an array, creating a new array, or `None` if the array is empty
# take
```ts
(n: number) => <A>(as: Array<A>): Array<A>
```
Keep only a number of elements from the start of an array, creating a new array
# takeWhile
```ts
<A>(predicate: Predicate<A>) => (as: Array<A>): Array<A>
```
Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array
# unsafeDeleteAt
```ts
(i: number) => <A>(as: Array<A>): Array<A>
```
# unsafeInsertAt
```ts
(i: number) => <A>(a: A) => (as: Array<A>): Array<A>
```
# unsafeUpdateAt
```ts
(i: number) => <A>(a: A) => (as: Array<A>): Array<A>
```
# updateAt
```ts
(i: number) => <A>(a: A) => (as: Array<A>): Option<Array<A>>
```
Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
# zip
```ts
<A>(fa: Array<A>) => <B>(fb: Array<B>): Array<[A, B]>
```
Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the longer array are discarded
# zipWith
```ts
<A, B, C>(f: (a: A, b: B) => C) => (fa: Array<A>) => (fb: Array<B>): Array<C>
```
Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one input array is short, excess elements of the longer array are discarded