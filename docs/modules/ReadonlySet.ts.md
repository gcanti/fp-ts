---
title: ReadonlySet.ts
nav_order: 83
parent: Modules
---

## ReadonlySet overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Flattenable](#flattenable)
  - [flatMap](#flatmap)
- [constructors](#constructors)
  - [fromReadonlyArray](#fromreadonlyarray)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [toIterable](#toiterable)
- [filtering](#filtering)
  - [compact](#compact)
  - [separate](#separate)
- [instances](#instances)
  - [getDifferenceMagma](#getdifferencemagma)
  - [getEq](#geteq)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getShow](#getshow)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
- [mapping](#mapping)
  - [map](#map)
- [utils](#utils)
  - [difference](#difference)
  - [elem](#elem)
  - [empty](#empty)
  - [every](#every)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [insert](#insert)
  - [intersection](#intersection)
  - [isEmpty](#isempty)
  - [isSubset](#issubset)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [remove](#remove)
  - [size](#size)
  - [some](#some)
  - [toggle](#toggle)
  - [union](#union)

---

# Flattenable

## flatMap

**Signature**

```ts
export declare const flatMap: <B>(E: Eq<B>) => <A>(f: (x: A) => ReadonlySet<B>) => (s: ReadonlySet<A>) => ReadonlySet<B>
```

Added in v3.0.0

# constructors

## fromReadonlyArray

Create a `ReadonlySet` from a `ReadonlyArray`.

**Signature**

```ts
export declare const fromReadonlyArray: <A>(E: Eq<A>) => (as: readonly A[]) => ReadonlySet<A>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => ReadonlySet<A>
```

Added in v3.0.0

# conversions

## toIterable

**Signature**

```ts
export declare const toIterable: <A>(O: Ord<A>) => (self: ReadonlySet<A>) => Iterable<A>
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <A>(E: Eq<A>) => (fa: ReadonlySet<Option<A>>) => ReadonlySet<A>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <E, A>(
  EE: Eq<E>,
  EA: Eq<A>
) => (fa: ReadonlySet<Result<E, A>>) => readonly [ReadonlySet<E>, ReadonlySet<A>]
```

Added in v3.0.0

# instances

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <A>(E: Eq<A>) => Magma<ReadonlySet<A>>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<ReadonlySet<A>>
```

Added in v3.0.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(E: Eq<A>) => Semigroup<ReadonlySet<A>>
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<ReadonlySet<A>>
```

Added in v3.0.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <A>(E: Eq<A>) => Monoid<ReadonlySet<A>>
```

Added in v3.0.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(E: Eq<A>) => Semigroup<ReadonlySet<A>>
```

Added in v3.0.0

# mapping

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <B>(E: Eq<B>) => <A>(f: (x: A) => B) => (s: ReadonlySet<A>) => ReadonlySet<B>
```

Added in v3.0.0

# utils

## difference

Return the set difference (`x` - `y`).

**Signature**

```ts
export declare const difference: <A>(E: Eq<A>) => (that: ReadonlySet<A>) => (self: ReadonlySet<A>) => ReadonlySet<A>
```

**Example**

```ts
import { difference } from 'fp-ts/ReadonlySet'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(new Set([1, 2]), difference(N.Eq)(new Set([1, 3]))), new Set([2]))
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `ReadonlySet`.

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => (a: A) => (s: ReadonlySet<A>) => boolean
```

Added in v3.0.0

## empty

An empty `ReadonlySet`.

**Signature**

```ts
export declare const empty: ReadonlySet<never>
```

Added in v3.0.0

## every

**Signature**

```ts
export declare function every<A, B extends A>(r: Refinement<A, B>): Refinement<ReadonlySet<A>, ReadonlySet<B>>
export declare function every<A>(p: Predicate<A>): Predicate<ReadonlySet<A>>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (s: ReadonlySet<A>) => ReadonlySet<B>
export declare function filter<A>(predicate: Predicate<A>): <B extends A>(s: ReadonlySet<B>) => ReadonlySet<B>
export declare function filter<A>(predicate: Predicate<A>): (s: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <B>(E: Eq<B>) => <A>(f: (a: A) => Option<B>) => (fa: ReadonlySet<A>) => ReadonlySet<B>
```

Added in v3.0.0

## insert

Insert a value into a `ReadonlySet`.

**Signature**

```ts
export declare const insert: <A>(E: Eq<A>) => (a: A) => (s: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v3.0.0

## intersection

The `ReadonlySet` of elements which are in both the first and second `ReadonlySet`.

**Signature**

```ts
export declare const intersection: <A>(E: Eq<A>) => (that: ReadonlySet<A>) => (self: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v3.0.0

## isEmpty

Test whether a `ReadonlySet` is empty.

**Signature**

```ts
export declare const isEmpty: <A>(set: ReadonlySet<A>) => boolean
```

Added in v3.0.0

## isSubset

Return `true` if and only if every element in the first `ReadonlySet` is an element of the second `ReadonlySet`.

**Signature**

```ts
export declare const isSubset: <A>(E: Eq<A>) => (that: ReadonlySet<A>) => (self: ReadonlySet<A>) => boolean
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare function partition<A, B extends A>(
  refinement: Refinement<A, B>
): (s: ReadonlySet<A>) => readonly [ReadonlySet<A>, ReadonlySet<B>]
export declare function partition<A>(
  predicate: Predicate<A>
): <B extends A>(s: ReadonlySet<B>) => readonly [ReadonlySet<B>, ReadonlySet<B>]
export declare function partition<A>(
  predicate: Predicate<A>
): (s: ReadonlySet<A>) => readonly [ReadonlySet<A>, ReadonlySet<A>]
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <B, C>(
  EB: Eq<B>,
  EC: Eq<C>
) => <A>(f: (a: A) => Result<B, C>) => (s: ReadonlySet<A>) => readonly [ReadonlySet<B>, ReadonlySet<C>]
```

Added in v3.0.0

## remove

Delete a value from a `ReadonlySet`.

**Signature**

```ts
export declare const remove: <A>(E: Eq<A>) => (a: A) => (s: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v3.0.0

## size

Calculate the number of elements in a `ReadonlySet`.

**Signature**

```ts
export declare const size: <A>(set: ReadonlySet<A>) => number
```

Added in v3.0.0

## some

**Signature**

```ts
export declare const some: <A>(predicate: Predicate<A>) => (s: ReadonlySet<A>) => boolean
```

Added in v3.0.0

## toggle

Checks an element is a member of a set;
If yes, removes the value from the set
If no, inserts the value to the set

**Signature**

```ts
export declare const toggle: <A>(E: Eq<A>) => (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v3.0.0

## union

Return the union of two `ReadonlySet`s.

**Signature**

```ts
export declare const union: <A>(E: Eq<A>) => (that: ReadonlySet<A>) => (self: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v3.0.0
