---
title: ReadonlySet.ts
nav_order: 88
parent: Modules
---

## ReadonlySet overview

Added in v2.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [chain](#chain)
  - [compact](#compact)
  - [difference](#difference)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [insert](#insert)
  - [intersection](#intersection)
  - [map](#map)
  - [remove](#remove)
  - [toggle](#toggle)
  - [union](#union)
- [constructors](#constructors)
  - [fromReadonlyArray](#fromreadonlyarray)
  - [singleton](#singleton)
  - [~~fromArray~~](#fromarray)
- [destructors](#destructors)
  - [toSet](#toset)
- [instances](#instances)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getDifferenceMagma](#getdifferencemagma)
  - [getEq](#geteq)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getShow](#getshow)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
- [interop](#interop)
  - [fromSet](#fromset)
- [utils](#utils)
  - [elem](#elem)
  - [empty](#empty)
  - [every](#every)
  - [foldMap](#foldmap)
  - [isEmpty](#isempty)
  - [isSubset](#issubset)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
  - [separate](#separate)
  - [size](#size)
  - [some](#some)
  - [toReadonlyArray](#toreadonlyarray)

---

# combinators

## chain

**Signature**

```ts
export declare function chain<B>(E: Eq<B>): <A>(f: (x: A) => ReadonlySet<B>) => (set: ReadonlySet<A>) => ReadonlySet<B>
```

Added in v2.5.0

## compact

**Signature**

```ts
export declare const compact: <A>(E: Eq<A>) => (fa: ReadonlySet<Option<A>>) => ReadonlySet<A>
```

Added in v2.5.0

## difference

Form the set difference (`x` - `y`)

**Signature**

```ts
export declare function difference<A>(E: Eq<A>): {
  (that: ReadonlySet<A>): (me: ReadonlySet<A>) => ReadonlySet<A>
  (me: ReadonlySet<A>, that: ReadonlySet<A>): ReadonlySet<A>
}
```

**Example**

```ts
import { difference } from 'fp-ts/ReadonlySet'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(new Set([1, 2]), difference(N.Eq)(new Set([1, 3]))), new Set([2]))
```

Added in v2.5.0

## filter

**Signature**

```ts
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (set: ReadonlySet<A>) => ReadonlySet<B>
export declare function filter<A>(predicate: Predicate<A>): <B extends A>(set: ReadonlySet<B>) => ReadonlySet<B>
export declare function filter<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v2.5.0

## filterMap

**Signature**

```ts
export declare function filterMap<B>(E: Eq<B>): <A>(f: (a: A) => Option<B>) => (fa: ReadonlySet<A>) => ReadonlySet<B>
```

Added in v2.5.0

## insert

Insert a value into a set

**Signature**

```ts
export declare function insert<A>(E: Eq<A>): (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v2.5.0

## intersection

The set of elements which are in both the first and second set

**Signature**

```ts
export declare function intersection<A>(E: Eq<A>): {
  (that: ReadonlySet<A>): (me: ReadonlySet<A>) => ReadonlySet<A>
  (me: ReadonlySet<A>, that: ReadonlySet<A>): ReadonlySet<A>
}
```

Added in v2.5.0

## map

Projects a Set through a function

**Signature**

```ts
export declare function map<B>(E: Eq<B>): <A>(f: (x: A) => B) => (set: ReadonlySet<A>) => ReadonlySet<B>
```

Added in v2.5.0

## remove

Delete a value from a set

**Signature**

```ts
export declare const remove: <A>(E: Eq<A>) => (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v2.5.0

## toggle

Checks an element is a member of a set;
If yes, removes the value from the set
If no, inserts the value to the set

**Signature**

```ts
export declare const toggle: <A>(E: Eq<A>) => (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v2.10.0

## union

Form the union of two sets

**Signature**

```ts
export declare function union<A>(E: Eq<A>): {
  (that: ReadonlySet<A>): (me: ReadonlySet<A>) => ReadonlySet<A>
  (me: ReadonlySet<A>, that: ReadonlySet<A>): ReadonlySet<A>
}
```

Added in v2.5.0

# constructors

## fromReadonlyArray

Create a `ReadonlySet` from a `ReadonlyArray`

**Signature**

```ts
export declare const fromReadonlyArray: <A>(E: Eq<A>) => (as: readonly A[]) => ReadonlySet<A>
```

Added in v2.10.0

## singleton

Create a set with one element

**Signature**

```ts
export declare const singleton: <A>(a: A) => ReadonlySet<A>
```

Added in v2.5.0

## ~~fromArray~~

Use [`fromReadonlyArray`](#fromreadonlyarray) instead.

**Signature**

```ts
export declare const fromArray: <A>(E: Eq<A>) => (as: readonly A[]) => ReadonlySet<A>
```

Added in v2.5.0

# destructors

## toSet

**Signature**

```ts
export declare function toSet<A>(s: ReadonlySet<A>): Set<A>
```

Added in v2.5.0

# instances

## URI

**Signature**

```ts
export declare const URI: 'ReadonlySet'
```

Added in v2.11.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.11.0

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <A>(E: Eq<A>) => Magma<ReadonlySet<A>>
```

Added in v2.11.0

## getEq

**Signature**

```ts
export declare function getEq<A>(E: Eq<A>): Eq<ReadonlySet<A>>
```

Added in v2.5.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(E: Eq<A>) => Semigroup<ReadonlySet<A>>
```

Added in v2.5.0

## getShow

**Signature**

```ts
export declare function getShow<A>(S: Show<A>): Show<ReadonlySet<A>>
```

Added in v2.5.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <A>(E: Eq<A>) => Monoid<ReadonlySet<A>>
```

Added in v2.5.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(E: Eq<A>) => Semigroup<ReadonlySet<A>>
```

Added in v2.11.0

# interop

## fromSet

**Signature**

```ts
export declare const fromSet: <A>(s: Set<A>) => ReadonlySet<A>
```

Added in v2.5.0

# utils

## elem

Test if a value is a member of a set

**Signature**

```ts
export declare function elem<A>(E: Eq<A>): {
  (a: A): (set: ReadonlySet<A>) => boolean
  (a: A, set: ReadonlySet<A>): boolean
}
```

Added in v2.5.0

## empty

**Signature**

```ts
export declare const empty: ReadonlySet<never>
```

Added in v2.5.0

## every

**Signature**

```ts
export declare function every<A, B extends A>(refinement: Refinement<A, B>): Refinement<ReadonlySet<A>, ReadonlySet<B>>
export declare function every<A>(predicate: Predicate<A>): Predicate<ReadonlySet<A>>
```

Added in v2.5.0

## foldMap

**Signature**

```ts
export declare function foldMap<A, M>(O: Ord<A>, M: Monoid<M>): (f: (a: A) => M) => (fa: ReadonlySet<A>) => M
```

Added in v2.5.0

## isEmpty

Test whether a `ReadonlySet` is empty.

**Signature**

```ts
export declare const isEmpty: <A>(set: ReadonlySet<A>) => boolean
```

Added in v2.10.0

## isSubset

`true` if and only if every element in the first set is an element of the second set

**Signature**

```ts
export declare function isSubset<A>(E: Eq<A>): {
  (that: ReadonlySet<A>): (me: ReadonlySet<A>) => boolean
  (me: ReadonlySet<A>, that: ReadonlySet<A>): boolean
}
```

Added in v2.5.0

## partition

**Signature**

```ts
export declare function partition<A, B extends A>(
  refinement: Refinement<A, B>
): (set: ReadonlySet<A>) => Separated<ReadonlySet<A>, ReadonlySet<B>>
export declare function partition<A>(
  predicate: Predicate<A>
): <B extends A>(set: ReadonlySet<B>) => Separated<ReadonlySet<B>, ReadonlySet<B>>
export declare function partition<A>(
  predicate: Predicate<A>
): (set: ReadonlySet<A>) => Separated<ReadonlySet<A>, ReadonlySet<A>>
```

Added in v2.5.0

## partitionMap

**Signature**

```ts
export declare function partitionMap<B, C>(
  EB: Eq<B>,
  EC: Eq<C>
): <A>(f: (a: A) => Either<B, C>) => (set: ReadonlySet<A>) => Separated<ReadonlySet<B>, ReadonlySet<C>>
```

Added in v2.5.0

## reduce

**Signature**

```ts
export declare function reduce<A>(O: Ord<A>): <B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlySet<A>) => B
```

Added in v2.5.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A>(O: Ord<A>) => <B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlySet<A>) => B
```

Added in v2.11.0

## separate

**Signature**

```ts
export declare function separate<E, A>(
  EE: Eq<E>,
  EA: Eq<A>
): (fa: ReadonlySet<Either<E, A>>) => Separated<ReadonlySet<E>, ReadonlySet<A>>
```

Added in v2.5.0

## size

Calculate the number of elements in a `ReadonlySet`.

**Signature**

```ts
export declare const size: <A>(set: ReadonlySet<A>) => number
```

Added in v2.10.0

## some

**Signature**

```ts
export declare const some: <A>(predicate: Predicate<A>) => (set: ReadonlySet<A>) => boolean
```

Added in v2.5.0

## toReadonlyArray

Get a sorted `ReadonlyArray` of the values contained in a `ReadonlySet`.

**Signature**

```ts
export declare const toReadonlyArray: <A>(O: Ord<A>) => (set: ReadonlySet<A>) => readonly A[]
```

Added in v2.5.0
