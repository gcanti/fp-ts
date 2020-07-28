---
title: ReadonlySet.ts
nav_order: 73
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
  - [union](#union)
- [constructors](#constructors)
  - [fromArray](#fromarray)
  - [fromSet](#fromset)
  - [singleton](#singleton)
- [destructors](#destructors)
  - [toReadonlyArray](#toreadonlyarray)
  - [toSet](#toset)
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
  - [isSubset](#issubset)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [reduce](#reduce)
  - [separate](#separate)
  - [some](#some)

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
export declare function compact<A>(E: Eq<A>): (fa: ReadonlySet<Option<A>>) => ReadonlySet<A>
```

Added in v2.5.0

## difference

Form the set difference (`x` - `y`)

**Signature**

```ts
export declare function difference<A>(
  E: Eq<A>
): {
  (that: ReadonlySet<A>): (me: ReadonlySet<A>) => ReadonlySet<A>
  (me: ReadonlySet<A>, that: ReadonlySet<A>): ReadonlySet<A>
}
```

**Example**

```ts
import { difference } from 'fp-ts/ReadonlySet'
import { eqNumber } from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(new Set([1, 2]), difference(eqNumber)(new Set([1, 3]))), new Set([2]))
```

Added in v2.5.0

## filter

**Signature**

```ts
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (set: ReadonlySet<A>) => ReadonlySet<B>
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
export declare function intersection<A>(
  E: Eq<A>
): {
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
export declare function remove<A>(E: Eq<A>): (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>
```

Added in v2.5.0

## union

Form the union of two sets

**Signature**

```ts
export declare function union<A>(
  E: Eq<A>
): {
  (that: ReadonlySet<A>): (me: ReadonlySet<A>) => ReadonlySet<A>
  (me: ReadonlySet<A>, that: ReadonlySet<A>): ReadonlySet<A>
}
```

Added in v2.5.0

# constructors

## fromArray

Create a set from an array

**Signature**

```ts
export declare function fromArray<A>(E: Eq<A>): (as: ReadonlyArray<A>) => ReadonlySet<A>
```

Added in v2.5.0

## fromSet

**Signature**

```ts
export declare function fromSet<A>(s: Set<A>): ReadonlySet<A>
```

Added in v2.5.0

## singleton

Create a set with one element

**Signature**

```ts
export declare function singleton<A>(a: A): ReadonlySet<A>
```

Added in v2.5.0

# destructors

## toReadonlyArray

**Signature**

```ts
export declare function toReadonlyArray<A>(O: Ord<A>): (set: ReadonlySet<A>) => ReadonlyArray<A>
```

Added in v2.5.0

## toSet

**Signature**

```ts
export declare function toSet<A>(s: ReadonlySet<A>): Set<A>
```

Added in v2.5.0

# instances

## getEq

**Signature**

```ts
export declare function getEq<A>(E: Eq<A>): Eq<ReadonlySet<A>>
```

Added in v2.5.0

## getIntersectionSemigroup

**Signature**

```ts
export declare function getIntersectionSemigroup<A>(E: Eq<A>): Semigroup<ReadonlySet<A>>
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
export declare function getUnionMonoid<A>(E: Eq<A>): Monoid<ReadonlySet<A>>
```

Added in v2.5.0

# utils

## elem

Test if a value is a member of a set

**Signature**

```ts
export declare function elem<A>(
  E: Eq<A>
): {
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
export declare function every<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => boolean
```

Added in v2.5.0

## foldMap

**Signature**

```ts
export declare function foldMap<A, M>(O: Ord<A>, M: Monoid<M>): (f: (a: A) => M) => (fa: ReadonlySet<A>) => M
```

Added in v2.5.0

## isSubset

`true` if and only if every element in the first set is an element of the second set

**Signature**

```ts
export declare function isSubset<A>(
  E: Eq<A>
): {
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

## separate

**Signature**

```ts
export declare function separate<E, A>(
  EE: Eq<E>,
  EA: Eq<A>
): (fa: ReadonlySet<Either<E, A>>) => Separated<ReadonlySet<E>, ReadonlySet<A>>
```

Added in v2.5.0

## some

**Signature**

```ts
export declare function some<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => boolean
```

Added in v2.5.0
