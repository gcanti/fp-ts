---
title: ReadonlySet.ts
nav_order: 83
parent: Modules
---

## ReadonlySet overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [Flattenable](#flattenable)
  - [flatMap](#flatmap)
- [Functor](#functor)
  - [map](#map)
- [combinators](#combinators)
  - [difference](#difference)
  - [insert](#insert)
  - [intersection](#intersection)
  - [remove](#remove)
  - [toggle](#toggle)
  - [union](#union)
- [constructors](#constructors)
  - [fromReadonlyArray](#fromreadonlyarray)
  - [singleton](#singleton)
- [instances](#instances)
  - [URI (type alias)](#uri-type-alias)
  - [getDifferenceMagma](#getdifferencemagma)
  - [getEq](#geteq)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getShow](#getshow)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
- [utils](#utils)
  - [elem](#elem)
  - [empty](#empty)
  - [every](#every)
  - [foldMap](#foldmap)
  - [isEmpty](#isempty)
  - [isSubset](#issubset)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
  - [size](#size)
  - [some](#some)
  - [toReadonlyArray](#toreadonlyarray)

---

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(E: eq.Eq<A>) => (fa: ReadonlySet<Option<A>>) => ReadonlySet<A>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <E, A>(
  EE: eq.Eq<E>,
  EA: eq.Eq<A>
) => (fa: ReadonlySet<Either<E, A>>) => readonly [ReadonlySet<E>, ReadonlySet<A>]
```

Added in v3.0.0

# Filterable

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
export declare const filterMap: <B>(
  E: eq.Eq<B>
) => <A>(f: (a: A) => Option<B>) => (fa: ReadonlySet<A>) => ReadonlySet<B>
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
  EB: eq.Eq<B>,
  EC: eq.Eq<C>
) => <A>(f: (a: A) => Either<B, C>) => (s: ReadonlySet<A>) => readonly [ReadonlySet<B>, ReadonlySet<C>]
```

Added in v3.0.0

# Flattenable

## flatMap

**Signature**

```ts
export declare const flatMap: <B>(
  E: eq.Eq<B>
) => <A>(f: (x: A) => ReadonlySet<B>) => (s: ReadonlySet<A>) => ReadonlySet<B>
```

Added in v3.0.0

# Functor

## map

**Signature**

```ts
export declare const map: <B>(E: eq.Eq<B>) => <A>(f: (x: A) => B) => (s: ReadonlySet<A>) => ReadonlySet<B>
```

Added in v3.0.0

# combinators

## difference

Return the set difference (`x` - `y`).

**Signature**

```ts
export declare const difference: <A>(E: eq.Eq<A>) => (that: ReadonlySet<A>) => (self: ReadonlySet<A>) => ReadonlySet<A>
```

**Example**

```ts
import { difference } from 'fp-ts/ReadonlySet'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(new Set([1, 2]), difference(N.Eq)(new Set([1, 3]))), new Set([2]))
```

Added in v3.0.0

## insert

Insert a value into a `ReadonlySet`.

**Signature**

```ts
export declare const insert: <A>(E: eq.Eq<A>) => (a: A) => (s: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v3.0.0

## intersection

The `ReadonlySet` of elements which are in both the first and second `ReadonlySet`.

**Signature**

```ts
export declare const intersection: <A>(
  E: eq.Eq<A>
) => (that: ReadonlySet<A>) => (self: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v3.0.0

## remove

Delete a value from a `ReadonlySet`.

**Signature**

```ts
export declare const remove: <A>(E: eq.Eq<A>) => (a: A) => (s: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v3.0.0

## toggle

Checks an element is a member of a set;
If yes, removes the value from the set
If no, inserts the value to the set

**Signature**

```ts
export declare const toggle: <A>(E: eq.Eq<A>) => (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v3.0.0

## union

Return the union of two `ReadonlySet`s.

**Signature**

```ts
export declare const union: <A>(E: eq.Eq<A>) => (that: ReadonlySet<A>) => (self: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v3.0.0

# constructors

## fromReadonlyArray

Create a `ReadonlySet` from a `ReadonlyArray`.

**Signature**

```ts
export declare const fromReadonlyArray: <A>(E: eq.Eq<A>) => (as: readonly A[]) => ReadonlySet<A>
```

Added in v3.0.0

## singleton

Create a `ReadonlySet` from one element.

**Signature**

```ts
export declare const singleton: <A>(a: A) => ReadonlySet<A>
```

Added in v3.0.0

# instances

## URI (type alias)

**Signature**

```ts
export type URI = 'ReadonlySet'
```

Added in v3.0.0

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <A>(E: eq.Eq<A>) => Magma<ReadonlySet<A>>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: eq.Eq<A>) => eq.Eq<ReadonlySet<A>>
```

Added in v3.0.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(E: eq.Eq<A>) => Semigroup<ReadonlySet<A>>
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
export declare const getUnionMonoid: <A>(E: eq.Eq<A>) => Monoid<ReadonlySet<A>>
```

Added in v3.0.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(E: eq.Eq<A>) => Semigroup<ReadonlySet<A>>
```

Added in v3.0.0

# utils

## elem

Tests whether a value is a member of a `ReadonlySet`.

**Signature**

```ts
export declare const elem: <A>(E: eq.Eq<A>) => (a: A) => (s: ReadonlySet<A>) => boolean
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

## foldMap

**Signature**

```ts
export declare const foldMap: <A>(O: Ord<A>) => <M>(M: Monoid<M>) => (f: (a: A) => M) => (fa: ReadonlySet<A>) => M
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
export declare const isSubset: <A>(E: eq.Eq<A>) => (second: ReadonlySet<A>) => (self: ReadonlySet<A>) => boolean
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A>(O: Ord<A>) => <B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlySet<A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A>(O: Ord<A>) => <B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlySet<A>) => B
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
export declare const some: <A>(predicate: predicate.Predicate<A>) => (s: ReadonlySet<A>) => boolean
```

Added in v3.0.0

## toReadonlyArray

Get a sorted `ReadonlyArray` of the values contained in a `ReadonlySet`.

**Signature**

```ts
export declare const toReadonlyArray: <A>(O: Ord<A>) => (s: ReadonlySet<A>) => readonly A[]
```

Added in v3.0.0
