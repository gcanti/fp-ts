---
title: Set.ts
nav_order: 80
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
  - [toArray](#toarray)
- [instances](#instances)
  - [getEq](#geteq)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getShow](#getshow)
  - [getUnionMonoid](#getunionmonoid)
- [utils](#utils)
  - [elem](#elem)
  - [empty](#empty)
  - [every](#every)
  - [foldMap](#foldmap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [reduce](#reduce)
  - [separate](#separate)
  - [some](#some)
  - [subset](#subset)

---

# combinators

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <B>(E: Eq<B>) => <A>(f: (x: A) => Set<B>) => (set: Set<A>) => Set<B>
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
export declare const difference: <A>(
  E: Eq<A>
) => { (that: Set<A>): (me: Set<A>) => Set<A>; (me: Set<A>, that: Set<A>): Set<A> }
```

**Example**

```ts
import { difference } from 'fp-ts/Set'
import { eqNumber } from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(new Set([1, 2]), difference(eqNumber)(new Set([1, 3]))), new Set([2]))
```

Added in v2.0.0

## filter

**Signature**

```ts
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Set<B>
export declare function filter<A>(predicate: Predicate<A>): (set: Set<A>) => Set<A>
```

Added in v2.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <B>(E: Eq<B>) => <A>(f: (a: A) => Option<B>) => (fa: Set<A>) => Set<B>
```

Added in v2.0.0

## insert

Insert a value into a set

**Signature**

```ts
export declare const insert: <A>(E: Eq<A>) => (a: A) => (set: Set<A>) => Set<A>
```

Added in v2.0.0

## intersection

The set of elements which are in both the first and second set

**Signature**

```ts
export declare const intersection: <A>(
  E: Eq<A>
) => { (that: Set<A>): (me: Set<A>) => Set<A>; (me: Set<A>, that: Set<A>): Set<A> }
```

Added in v2.0.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <B>(E: Eq<B>) => <A>(f: (x: A) => B) => (set: Set<A>) => Set<B>
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
export declare function toggle<A>(E: Eq<A>): (a: A) => (set: Set<A>) => Set<A>
```

Added in v2.5.0

## union

Form the union of two sets

**Signature**

```ts
export declare const union: <A>(
  E: Eq<A>
) => { (that: Set<A>): (me: Set<A>) => Set<A>; (me: Set<A>, that: Set<A>): Set<A> }
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

## toArray

**Signature**

```ts
export declare const toArray: <A>(O: Ord<A>) => (set: Set<A>) => A[]
```

Added in v2.0.0

# instances

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
export declare const every: <A>(predicate: Predicate<A>) => (set: Set<A>) => boolean
```

Added in v2.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: <A, M>(O: Ord<A>, M: Monoid<M>) => (f: (a: A) => M) => (fa: Set<A>) => M
```

Added in v2.0.0

## partition

**Signature**

```ts
export declare function partition<A, B extends A>(
  refinement: Refinement<A, B>
): (set: Set<A>) => Separated<Set<A>, Set<B>>
export declare function partition<A>(predicate: Predicate<A>): (set: Set<A>) => Separated<Set<A>, Set<A>>
```

Added in v2.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <B, C>(
  EB: Eq<B>,
  EC: Eq<C>
) => <A>(f: (a: A) => Either<B, C>) => (set: Set<A>) => Separated<Set<B>, Set<C>>
```

Added in v2.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A>(O: Ord<A>) => <B>(b: B, f: (b: B, a: A) => B) => (fa: Set<A>) => B
```

Added in v2.0.0

## separate

**Signature**

```ts
export declare const separate: <E, A>(EE: Eq<E>, EA: Eq<A>) => (fa: Set<Either<E, A>>) => Separated<Set<E>, Set<A>>
```

Added in v2.0.0

## some

**Signature**

```ts
export declare const some: <A>(predicate: Predicate<A>) => (set: Set<A>) => boolean
```

Added in v2.0.0

## subset

`true` if and only if every element in the first set is an element of the second set

**Signature**

```ts
export declare const subset: <A>(
  E: Eq<A>
) => { (that: Set<A>): (me: Set<A>) => boolean; (me: Set<A>, that: Set<A>): boolean }
```

Added in v2.0.0
