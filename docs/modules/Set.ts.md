---
title: Set.ts
nav_order: 74
parent: Modules
---

# Set overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [empty (constant)](#empty-constant)
- [chain (function)](#chain-function)
- [compact (function)](#compact-function)
- [difference (function)](#difference-function)
- [elem (function)](#elem-function)
- [every (function)](#every-function)
- [filter (function)](#filter-function)
- [filterMap (function)](#filtermap-function)
- [foldMap (function)](#foldmap-function)
- [fromArray (function)](#fromarray-function)
- [getEq (function)](#geteq-function)
- [getIntersectionSemigroup (function)](#getintersectionsemigroup-function)
- [getShow (function)](#getshow-function)
- [getUnionMonoid (function)](#getunionmonoid-function)
- [insert (function)](#insert-function)
- [intersection (function)](#intersection-function)
- [map (function)](#map-function)
- [partition (function)](#partition-function)
- [partitionMap (function)](#partitionmap-function)
- [reduce (function)](#reduce-function)
- [remove (function)](#remove-function)
- [separate (function)](#separate-function)
- [singleton (function)](#singleton-function)
- [some (function)](#some-function)
- [subset (function)](#subset-function)
- [toArray (function)](#toarray-function)
- [union (function)](#union-function)

---

# empty (constant)

**Signature**

```ts
export const empty: Set<never> = ...
```

Added in v2.0.0

# chain (function)

**Signature**

```ts
export function chain<B>(E: Eq<B>): <A>(f: (x: A) => Set<B>) => (set: Set<A>) => Set<B> { ... }
```

Added in v2.0.0

# compact (function)

**Signature**

```ts
export function compact<A>(E: Eq<A>): (fa: Set<Option<A>>) => Set<A> { ... }
```

Added in v2.0.0

# difference (function)

Form the set difference (`x` - `y`)

**Signature**

```ts
export function difference<A>(E: Eq<A>): (x: Set<A>, y: Set<A>) => Set<A> { ... }
```

**Example**

```ts
import { difference } from 'fp-ts/lib/Set'
import { eqNumber } from 'fp-ts/lib/Eq'

assert.deepStrictEqual(difference(eqNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
```

Added in v2.0.0

# elem (function)

Test if a value is a member of a set

**Signature**

```ts
export function elem<A>(E: Eq<A>): (a: A, set: Set<A>) => boolean { ... }
```

Added in v2.0.0

# every (function)

**Signature**

```ts
export function every<A>(predicate: Predicate<A>): (set: Set<A>) => boolean { ... }
```

Added in v2.0.0

# filter (function)

**Signature**

```ts
export function filter<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Set<B>
export function filter<A>(predicate: Predicate<A>): (set: Set<A>) => Set<A> { ... }
```

Added in v2.0.0

# filterMap (function)

**Signature**

```ts
export function filterMap<B>(E: Eq<B>): <A>(f: (a: A) => Option<B>) => (fa: Set<A>) => Set<B> { ... }
```

Added in v2.0.0

# foldMap (function)

**Signature**

```ts
export function foldMap<A, M>(O: Ord<A>, M: Monoid<M>): (f: (a: A) => M) => (fa: Set<A>) => M { ... }
```

Added in v2.0.0

# fromArray (function)

Create a set from an array

**Signature**

```ts
export function fromArray<A>(E: Eq<A>): (as: Array<A>) => Set<A> { ... }
```

Added in v2.0.0

# getEq (function)

**Signature**

```ts
export function getEq<A>(E: Eq<A>): Eq<Set<A>> { ... }
```

Added in v2.0.0

# getIntersectionSemigroup (function)

**Signature**

```ts
export function getIntersectionSemigroup<A>(E: Eq<A>): Semigroup<Set<A>> { ... }
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export function getShow<A>(S: Show<A>): Show<Set<A>> { ... }
```

Added in v2.0.0

# getUnionMonoid (function)

**Signature**

```ts
export function getUnionMonoid<A>(E: Eq<A>): Monoid<Set<A>> { ... }
```

Added in v2.0.0

# insert (function)

Insert a value into a set

**Signature**

```ts
export function insert<A>(E: Eq<A>): (a: A) => (set: Set<A>) => Set<A> { ... }
```

Added in v2.0.0

# intersection (function)

The set of elements which are in both the first and second set

**Signature**

```ts
export function intersection<A>(E: Eq<A>): (set: Set<A>, y: Set<A>) => Set<A> { ... }
```

Added in v2.0.0

# map (function)

Projects a Set through a function

**Signature**

```ts
export function map<B>(E: Eq<B>): <A>(f: (x: A) => B) => (set: Set<A>) => Set<B> { ... }
```

Added in v2.0.0

# partition (function)

**Signature**

```ts
export function partition<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Separated<Set<A>, Set<B>>
export function partition<A>(predicate: Predicate<A>): (set: Set<A>) => Separated<Set<A>, Set<A>> { ... }
```

Added in v2.0.0

# partitionMap (function)

**Signature**

```ts
export function partitionMap<B, C>(
  EB: Eq<B>,
  EC: Eq<C>
): <A>(f: (a: A) => Either<B, C>) => (set: Set<A>) => Separated<Set<B>, Set<C>> { ... }
```

Added in v2.0.0

# reduce (function)

**Signature**

```ts
export function reduce<A>(O: Ord<A>): <B>(b: B, f: (b: B, a: A) => B) => (fa: Set<A>) => B { ... }
```

Added in v2.0.0

# remove (function)

Delete a value from a set

**Signature**

```ts
export function remove<A>(E: Eq<A>): (a: A) => (set: Set<A>) => Set<A> { ... }
```

Added in v2.0.0

# separate (function)

**Signature**

```ts
export function separate<E, A>(EE: Eq<E>, EA: Eq<A>): (fa: Set<Either<E, A>>) => Separated<Set<E>, Set<A>> { ... }
```

Added in v2.0.0

# singleton (function)

Create a set with one element

**Signature**

```ts
export function singleton<A>(a: A): Set<A> { ... }
```

Added in v2.0.0

# some (function)

**Signature**

```ts
export function some<A>(predicate: Predicate<A>): (set: Set<A>) => boolean { ... }
```

Added in v2.0.0

# subset (function)

`true` if and only if every element in the first set is an element of the second set

**Signature**

```ts
export function subset<A>(E: Eq<A>): (x: Set<A>, y: Set<A>) => boolean { ... }
```

Added in v2.0.0

# toArray (function)

**Signature**

```ts
export function toArray<A>(O: Ord<A>): (set: Set<A>) => Array<A> { ... }
```

Added in v2.0.0

# union (function)

Form the union of two sets

**Signature**

```ts
export function union<A>(E: Eq<A>): (set: Set<A>, y: Set<A>) => Set<A> { ... }
```

Added in v2.0.0
