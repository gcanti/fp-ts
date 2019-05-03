---
title: Set.ts
nav_order: 75
parent: Modules
---

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
export const chain = <B>(E: Eq<B>): (<A>(set: Set<A>, f: (x: A) => Set<B>) => Set<B>) => ...
```

Added in v2.0.0

# compact (function)

**Signature**

```ts
export const compact = <A>(E: Eq<A>): ((fa: Set<Option<A>>) => Set<A>) => ...
```

Added in v2.0.0

# difference (function)

Form the set difference (`x` - `y`)

**Signature**

```ts
export const difference = <A>(E: Eq<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => ...
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
export const elem = <A>(E: Eq<A>) => (a: A, x: Set<A>): boolean => ...
```

Added in v2.0.0

# every (function)

**Signature**

```ts
export const every = <A>(x: Set<A>, predicate: Predicate<A>): boolean => ...
```

Added in v2.0.0

# filter (function)

**Signature**

```ts
export function filter<A, B extends A>(x: Set<A>, predicate: Refinement<A, B>): Set<B>
export function filter<A>(x: Set<A>, predicate: Predicate<A>): Set<A> { ... }
```

Added in v2.0.0

# filterMap (function)

**Signature**

```ts
export const filterMap = <B>(E: Eq<B>): (<A>(fa: Set<A>, f: (a: A) => Option<B>) => Set<B>) => ...
```

Added in v2.0.0

# foldMap (function)

**Signature**

```ts
export const foldMap = <A, M>(O: Ord<A>, M: Monoid<M>): ((fa: Set<A>, f: (a: A) => M) => M) => ...
```

Added in v2.0.0

# fromArray (function)

Create a set from an array

**Signature**

```ts
export const fromArray = <A>(E: Eq<A>) => (as: Array<A>): Set<A> => ...
```

Added in v2.0.0

# getEq (function)

**Signature**

```ts
export const getEq = <A>(E: Eq<A>): Eq<Set<A>> => ...
```

Added in v2.0.0

# getIntersectionSemigroup (function)

**Signature**

```ts
export const getIntersectionSemigroup = <A>(E: Eq<A>): Semigroup<Set<A>> => ...
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export const getShow = <A>(SA: Show<A>): Show<Set<A>> => ...
```

Added in v2.0.0

# getUnionMonoid (function)

**Signature**

```ts
export const getUnionMonoid = <A>(E: Eq<A>): Monoid<Set<A>> => ...
```

Added in v2.0.0

# insert (function)

Insert a value into a set

**Signature**

```ts
export const insert = <A>(E: Eq<A>): ((a: A, x: Set<A>) => Set<A>) => ...
```

Added in v2.0.0

# intersection (function)

The set of elements which are in both the first and second set

**Signature**

```ts
export const intersection = <A>(E: Eq<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => ...
```

Added in v2.0.0

# map (function)

Projects a Set through a function

**Signature**

```ts
export const map = <B>(E: Eq<B>): (<A>(set: Set<A>, f: (x: A) => B) => Set<B>) => ...
```

Added in v2.0.0

# partition (function)

**Signature**

```ts
export function partition<A, B extends A>(x: Set<A>, predicate: Refinement<A, B>): Separated<Set<A>, Set<B>>
export function partition<A>(x: Set<A>, predicate: Predicate<A>): Separated<Set<A>, Set<A>> { ... }
```

Added in v2.0.0

# partitionMap (function)

**Signature**

```ts
export const partitionMap = <L, R>(SL: Eq<L>, SR: Eq<R>) => <A>(
  x: Set<A>,
  f: (a: A) => Either<L, R>
): Separated<Set<L>, Set<R>> => ...
```

Added in v2.0.0

# reduce (function)

**Signature**

```ts
export const reduce = <A>(O: Ord<A>): (<B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B) => ...
```

Added in v2.0.0

# remove (function)

Delete a value from a set

**Signature**

```ts
export const remove = <A>(E: Eq<A>) => (a: A, x: Set<A>): Set<A> => ...
```

Added in v2.0.0

# separate (function)

**Signature**

```ts
export const separate = <L, R>(SL: Eq<L>, SR: Eq<R>) => (fa: Set<Either<L, R>>): Separated<Set<L>, Set<R>> => ...
```

Added in v2.0.0

# singleton (function)

Create a set with one element

**Signature**

```ts
export const singleton = <A>(a: A): Set<A> => ...
```

Added in v2.0.0

# some (function)

**Signature**

```ts
export const some = <A>(x: Set<A>, predicate: Predicate<A>): boolean => ...
```

Added in v2.0.0

# subset (function)

`true` if and only if every element in the first set is an element of the second set

**Signature**

```ts
export const subset = <A>(E: Eq<A>): ((x: Set<A>, y: Set<A>) => boolean) => ...
```

Added in v2.0.0

# toArray (function)

**Signature**

```ts
export const toArray = <A>(O: Ord<A>) => (x: Set<A>): Array<A> => ...
```

Added in v2.0.0

# union (function)

Form the union of two sets

**Signature**

```ts
export const union = <A>(E: Eq<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => ...
```

Added in v2.0.0
