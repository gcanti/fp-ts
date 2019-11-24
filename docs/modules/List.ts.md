---
title: List.ts
nav_order: 48
parent: Modules
---

# Overview

Adapted from https://github.com/purescript/purescript-lists

---

<h2 class="text-delta">Table of contents</h2>

- [Cons (interface)](#cons-interface)
- [Nil (interface)](#nil-interface)
- [List (type alias)](#list-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [list (constant)](#list-constant)
- [nil (constant)](#nil-constant)
- [alterAt (function)](#alterat-function)
- [cons (function)](#cons-function)
- [deleteAt (function)](#deleteat-function)
- [elemIndex (function)](#elemindex-function)
- [elemLastIndex (function)](#elemlastindex-function)
- [findIndex (function)](#findindex-function)
- [findLastIndex (function)](#findlastindex-function)
- [flatten (function)](#flatten-function)
- [fromArray (function)](#fromarray-function)
- [head (function)](#head-function)
- [index (function)](#index-function)
- [init (function)](#init-function)
- [insert (function)](#insert-function)
- [insertAt (function)](#insertat-function)
- [insertBy (function)](#insertby-function)
- [isCons (function)](#iscons-function)
- [isNil (function)](#isnil-function)
- [last (function)](#last-function)
- [length (function)](#length-function)
- [modifyAt (function)](#modifyat-function)
- [range (function)](#range-function)
- [reverse (function)](#reverse-function)
- [singleton (function)](#singleton-function)
- [snoc (function)](#snoc-function)
- [sort (function)](#sort-function)
- [tail (function)](#tail-function)
- [toArray (function)](#toarray-function)
- [uncons (function)](#uncons-function)
- [unsnoc (function)](#unsnoc-function)
- [updateAt (function)](#updateat-function)
- [compact (export)](#compact-export)
- [filter (export)](#filter-export)
- [filterMap (export)](#filtermap-export)
- [foldMap (export)](#foldmap-export)
- [map (export)](#map-export)
- [partition (export)](#partition-export)
- [partitionMap (export)](#partitionmap-export)
- [reduce (export)](#reduce-export)
- [reduceRight (export)](#reduceright-export)
- [separate (export)](#separate-export)

---

# Cons (interface)

**Signature**

```ts
export interface Cons<A> {
  readonly type: 'Cons'
  readonly head: A
  readonly tail: List<A>
}
```

Added in v2.1.1

# Nil (interface)

**Signature**

```ts
export interface Nil {
  readonly type: 'Nil'
}
```

Added in v2.1.1

# List (type alias)

**Signature**

```ts
export type List<A> = Nil | Cons<A>
```

Added in v2.1.1

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.1.1

# URI (constant)

**Signature**

```ts
export const URI: "List" = ...
```

Added in v2.1.1

# list (constant)

**Signature**

```ts
export const list: Functor1<URI> & Foldable1<URI> & Traversable1<URI> & Filterable1<URI> & Compactable1<URI> = ...
```

Added in v2.1.1

# nil (constant)

**Signature**

```ts
export const nil: List<never> = ...
```

Added in v2.1.1

# alterAt (function)

Updates or deletes the element at the specified index by applying a function
to the current value, returning a new list or `None` if the index is out-of-bounds.

**Signature**

```ts
export function alterAt<A>(index: number, f: (a: A) => O.Option<A>, fa: List<A>): O.Option<List<A>> { ... }
```

Added in v2.1.1

# cons (function)

**Signature**

```ts
export function cons<A>(head: A, tail: List<A>): List<A> { ... }
```

Added in v2.1.1

# deleteAt (function)

Deletes an element from a list at the specified index, returning a new
list or `None` if the index is out-of-bounds.

**Signature**

```ts
export function deleteAt<A>(index: number, fa: List<A>): O.Option<List<A>> { ... }
```

Added in v2.1.1

# elemIndex (function)

Find the index of the first element equal to the specified element.

**Signature**

```ts
export function elemIndex<A>(eq: Eq<A>, a: A, fa: List<A>): O.Option<number> { ... }
```

Added in v2.1.1

# elemLastIndex (function)

Find the index of the last element equal to the specified element.

**Signature**

```ts
export function elemLastIndex<A>(eq: Eq<A>, a: A, fa: List<A>): O.Option<number> { ... }
```

Added in v2.1.1

# findIndex (function)

Finds the first index for which a predicate holds.

**Signature**

```ts
export function findIndex<A>(predicate: Predicate<A>, fa: List<A>): O.Option<number> { ... }
```

Added in v2.1.1

# findLastIndex (function)

Finds the last index for which a predicate holds.

**Signature**

```ts
export function findLastIndex<A>(predicate: Predicate<A>, fa: List<A>): O.Option<number> { ... }
```

Added in v2.1.1

# flatten (function)

Flattens a list of lists.

**Signature**

```ts
export function flatten<A>(mma: List<List<A>>): List<A> { ... }
```

Added in v2.1.1

# fromArray (function)

Creates a list from an array

**Signature**

```ts
export function fromArray<A>(as: Array<A>): List<A> { ... }
```

Added in v2.1.1

# head (function)

Gets the first element in a list, or `None` if the list is empty.

**Signature**

```ts
export function head<A>(fa: List<A>): O.Option<A> { ... }
```

Added in v2.1.1

# index (function)

Gets the element at the specified index, or `None` if the index is out-of-bounds.

**Signature**

```ts
export function index<A>(fa: List<A>, index: number): O.Option<A> { ... }
```

Added in v2.1.1

# init (function)

Gets all but the last element of a list, or `None` if the list is empty.

**Signature**

```ts
export function init<A>(fa: List<A>): O.Option<List<A>> { ... }
```

Added in v2.1.1

# insert (function)

Insert an element into a sorted list.

**Signature**

```ts
export function insert<A>(ord: Ord<A>): (a: A) => (fa: List<A>) => List<A> { ... }
```

Added in v2.1.1

# insertAt (function)

Inserts an element into a list at the specified index, returning a new list or `None`
if the index is out-of-bounds.

**Signature**

```ts
export function insertAt<A>(index: number, a: A, fa: List<A>): O.Option<List<A>> { ... }
```

Added in v2.1.1

# insertBy (function)

Insert an element into a sorted list, using the specified function
to determine the ordering of elements.

**Signature**

```ts
export function insertBy<A>(compare: Ord<A>['compare']): (a: A) => (fa: List<A>) => List<A> { ... }
```

Added in v2.1.1

# isCons (function)

**Signature**

```ts
export function isCons<A>(a: List<A>): a is Cons<A> { ... }
```

Added in v2.1.1

# isNil (function)

**Signature**

```ts
export function isNil<A>(a: List<A>): a is Nil { ... }
```

Added in v2.1.1

# last (function)

Gets the last element in a list, or `None` if the list is empty.

**Signature**

```ts
export function last<A>(fa: List<A>): O.Option<A> { ... }
```

Added in v2.1.1

# length (function)

Gets the length of a list.

**Signature**

```ts
export function length<A>(fa: List<A>): number { ... }
```

Added in v2.1.1

# modifyAt (function)

Update the element at the specified index by applying a function
to the current value, returning a new list or `None` if the index is out-of-bounds.

**Signature**

```ts
export function modifyAt<A>(index: number, f: (a: A) => A, fa: List<A>): O.Option<List<A>> { ... }
```

Added in v2.1.1

# range (function)

Create a list containing a range of integers, including both endpoints.

**Signature**

```ts
export function range(start: number, end: number): List<number> { ... }
```

Added in v2.1.1

# reverse (function)

Reverse a list.

**Signature**

```ts
export function reverse<A>(fa: List<A>): List<A> { ... }
```

Added in v2.1.1

# singleton (function)

Creates a list with a single element.

**Signature**

```ts
export function singleton<A>(head: A): List<A> { ... }
```

Added in v2.1.1

# snoc (function)

Appends an element to the end of a list, creating a new list.

**Signature**

```ts
export function snoc<A>(fa: List<A>, a: A): List<A> { ... }
```

Added in v2.1.1

# sort (function)

Sort the elements of a list in increasing order, where elements
are compared using the specified ordering.

**Signature**

```ts
export function sort<A>(O: Ord<A>): (fa: List<A>) => List<A> { ... }
```

Added in v2.1.1

# tail (function)

Gets all but the first element of a list, or `None` if the list is empty.

**Signature**

```ts
export function tail<A>(fa: List<A>): O.Option<List<A>> { ... }
```

Added in v2.1.1

# toArray (function)

Gets an array from a list.

**Signature**

```ts
export function toArray<A>(fa: List<A>): Array<A> { ... }
```

Added in v2.1.1

# uncons (function)

Breaks a list into its first element, and the remaining elements,
or `None` if the list is empty.

**Signature**

```ts
export function uncons<A>(fa: List<A>): O.Option<{ head: A; tail: List<A> }> { ... }
```

Added in v2.1.1

# unsnoc (function)

Breaks a list into its last element, and the preceding elements,
or `None` if the list is empty.

**Signature**

```ts
export function unsnoc<A>(fa: List<A>): O.Option<{ init: List<A>; last: A }> { ... }
```

Added in v2.1.1

# updateAt (function)

Updates an element from a list at the specified index, returning a new
list or `None` if the index is out-of-bounds.

**Signature**

```ts
export function updateAt<A>(index: number, a: A, fa: List<A>): O.Option<List<A>> { ... }
```

Added in v2.1.1

# compact (export)

**Signature**

```ts
<A>(fa: List<O.Option<A>>) => List<A>
```

Added in v2.1.1

# filter (export)

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: List<A>) => List<B>; <A>(predicate: Predicate<A>): (fa: List<A>) => List<A>; }
```

Added in v2.1.1

# filterMap (export)

**Signature**

```ts
<A, B>(f: (a: A) => O.Option<B>) => (fa: List<A>) => List<B>
```

Added in v2.1.1

# foldMap (export)

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: List<A>) => M
```

Added in v2.1.1

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: List<A>) => List<B>
```

Added in v2.1.1

# partition (export)

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: List<A>) => Separated<List<A>, List<B>>; <A>(predicate: Predicate<A>): (fa: List<A>) => Separated<List<A>, List<A>>; }
```

Added in v2.1.1

# partitionMap (export)

**Signature**

```ts
<A, B, C>(f: (a: A) => E.Either<B, C>) => (fa: List<A>) => Separated<List<B>, List<C>>
```

Added in v2.1.1

# reduce (export)

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: List<A>) => B
```

Added in v2.1.1

# reduceRight (export)

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: List<A>) => B
```

Added in v2.1.1

# separate (export)

**Signature**

```ts
<A, B>(fa: List<E.Either<A, B>>) => Separated<List<A>, List<B>>
```

Added in v2.1.1
