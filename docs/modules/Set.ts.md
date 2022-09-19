---
title: Set.ts
nav_order: 97
parent: Modules
---

## Set overview

Added in v2.0.0

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
  - [fromArray](#fromarray)
  - [singleton](#singleton)
- [instances](#instances)
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
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
  - [separate](#separate)
  - [size](#size)
  - [some](#some)
  - [toArray](#toarray)
  - [~~subset~~](#subset)

---

# combinators

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare function chain<B>(E: Eq<B>): <A>(f: (x: A) => Set<B>) => (set: Set<A>) => Set<B>
```

Added in v2.0.0

## compact

**Signature**

```ts
export declare const compact: <A>(E: Eq<A>) => (fa: Set<Option<A>>) => Set<A>
```

Added in v2.0.0

## difference

Form the set difference (`x` - `y`)

**Signature**

```ts
export declare function difference<A>(E: Eq<A>): {
  (that: Set<A>): (me: Set<A>) => Set<A>
  (me: Set<A>, that: Set<A>): Set<A>
}
```

**Example**

```ts
import { difference } from 'fp-ts/Set'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(new Set([1, 2]), difference(N.Eq)(new Set([1, 3]))), new Set([2]))
```

Added in v2.0.0

## filter

**Signature**

```ts
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Set<B>
export declare function filter<A>(predicate: Predicate<A>): <B extends A>(set: Set<B>) => Set<B>
export declare function filter<A>(predicate: Predicate<A>): (set: Set<A>) => Set<A>
```

Added in v2.0.0

## filterMap

**Signature**

```ts
export declare function filterMap<B>(E: Eq<B>): <A>(f: (a: A) => Option<B>) => (fa: Set<A>) => Set<B>
```

Added in v2.0.0

## insert

Insert a value into a set

**Signature**

```ts
export declare function insert<A>(E: Eq<A>): (a: A) => (set: Set<A>) => Set<A>
```

Added in v2.0.0

## intersection

The set of elements which are in both the first and second set

**Signature**

```ts
export declare function intersection<A>(E: Eq<A>): {
  (that: Set<A>): (me: Set<A>) => Set<A>
  (me: Set<A>, that: Set<A>): Set<A>
}
```

Added in v2.0.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare function map<B>(E: Eq<B>): <A>(f: (x: A) => B) => (set: Set<A>) => Set<B>
```

Added in v2.0.0

## remove

Delete a value from a set

**Signature**

```ts
export declare const remove: <A>(E: Eq<A>) => (a: A) => (set: Set<A>) => Set<A>
```

Added in v2.0.0

## toggle

Checks an element is a member of a set;
If yes, removes the value from the set
If no, inserts the value to the set

**Signature**

```ts
export declare const toggle: <A>(E: Eq<A>) => (a: A) => (set: Set<A>) => Set<A>
```

Added in v2.5.0

## union

Form the union of two sets

**Signature**

```ts
export declare function union<A>(E: Eq<A>): {
  (that: Set<A>): (me: Set<A>) => Set<A>
  (me: Set<A>, that: Set<A>): Set<A>
}
```

Added in v2.0.0

# constructors

## fromArray

Create a set from an array

**Signature**

```ts
export declare const fromArray: <A>(E: Eq<A>) => (as: A[]) => Set<A>
```

Added in v2.0.0

## singleton

Create a set with one element

**Signature**

```ts
export declare const singleton: <A>(a: A) => Set<A>
```

Added in v2.0.0

# instances

## getDifferenceMagma

**Signature**

```ts
export declare const getDifferenceMagma: <A>(E: Eq<A>) => Magma<Set<A>>
```

Added in v2.11.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<Set<A>>
```

Added in v2.0.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(E: Eq<A>) => Semigroup<Set<A>>
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<Set<A>>
```

Added in v2.0.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <A>(E: Eq<A>) => Monoid<Set<A>>
```

Added in v2.0.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(E: Eq<A>) => Semigroup<Set<A>>
```

Added in v2.11.0

# utils

## elem

Test if a value is a member of a set

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => { (a: A): (set: Set<A>) => boolean; (a: A, set: Set<A>): boolean }
```

Added in v2.0.0

## empty

**Signature**

```ts
export declare const empty: Set<never>
```

Added in v2.0.0

## every

**Signature**

```ts
export declare const every: {
  <A, B extends A>(refinement: Refinement<A, B>): Refinement<Set<A>, Set<B>>
  <A>(predicate: Predicate<A>): Predicate<Set<A>>
}
```

Added in v2.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: <A, M>(O: Ord<A>, M: Monoid<M>) => (f: (a: A) => M) => (fa: Set<A>) => M
```

Added in v2.0.0

## isEmpty

Test whether a `Set` is empty.

**Signature**

```ts
export declare const isEmpty: <A>(set: Set<A>) => boolean
```

Added in v2.10.0

## isSubset

**Signature**

```ts
export declare const isSubset: <A>(E: Eq<A>) => (that: Set<A>) => (me: Set<A>) => boolean
```

Added in v2.10.0

## partition

**Signature**

```ts
export declare function partition<A, B extends A>(
  refinement: Refinement<A, B>
): (set: Set<A>) => Separated<Set<A>, Set<B>>
export declare function partition<A>(predicate: Predicate<A>): <B extends A>(set: Set<B>) => Separated<Set<B>, Set<B>>
export declare function partition<A>(predicate: Predicate<A>): (set: Set<A>) => Separated<Set<A>, Set<A>>
```

Added in v2.0.0

## partitionMap

**Signature**

```ts
export declare function partitionMap<B, C>(
  EB: Eq<B>,
  EC: Eq<C>
): <A>(f: (a: A) => Either<B, C>) => (set: Set<A>) => Separated<Set<B>, Set<C>>
```

Added in v2.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A>(O: Ord<A>) => <B>(b: B, f: (b: B, a: A) => B) => (fa: Set<A>) => B
```

Added in v2.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A>(O: Ord<A>) => <B>(b: B, f: (a: A, b: B) => B) => (fa: Set<A>) => B
```

Added in v2.11.0

## separate

**Signature**

```ts
export declare function separate<E, A>(EE: Eq<E>, EA: Eq<A>): (fa: Set<Either<E, A>>) => Separated<Set<E>, Set<A>>
```

Added in v2.0.0

## size

Calculate the number of elements in a `Set`.

**Signature**

```ts
export declare const size: <A>(set: Set<A>) => number
```

Added in v2.10.0

## some

**Signature**

```ts
export declare const some: <A>(predicate: Predicate<A>) => (set: Set<A>) => boolean
```

Added in v2.0.0

## toArray

Get a sorted `Array` of the values contained in a `Set`.

**Signature**

```ts
export declare const toArray: <A>(O: Ord<A>) => (set: Set<A>) => A[]
```

Added in v2.0.0

## ~~subset~~

Use [`isSubset`](#issubset) instead.

**Signature**

```ts
export declare const subset: <A>(E: Eq<A>) => {
  (that: Set<A>): (me: Set<A>) => boolean
  (me: Set<A>, that: Set<A>): boolean
}
```

Added in v2.0.0
