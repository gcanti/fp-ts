---
title: Set.ts
nav_order: 76
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [empty](#empty)
- [chain](#chain)
- [compact](#compact)
- [~~difference~~](#difference)
- [difference2v](#difference2v)
- [elem](#elem)
- [every](#every)
- [filter](#filter)
- [filterMap](#filtermap)
- [foldMap](#foldmap)
- [fromArray](#fromarray)
- [getIntersectionSemigroup](#getintersectionsemigroup)
- [getSetoid](#getsetoid)
- [getUnionMonoid](#getunionmonoid)
- [insert](#insert)
- [intersection](#intersection)
- [map](#map)
- [~~member~~](#member)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [reduce](#reduce)
- [remove](#remove)
- [separate](#separate)
- [singleton](#singleton)
- [some](#some)
- [subset](#subset)
- [toArray](#toarray)
- [union](#union)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# empty

**Signature** (constant)

```ts
export const empty: Set<never> = ...
```

Added in v1.14.0

# chain

**Signature** (function)

```ts
export const chain = <B>(S: Setoid<B>): (<A>(set: Set<A>, f: (x: A) => Set<B>) => Set<B>) => ...
```

Added in v1.2.0

# compact

**Signature** (function)

```ts
export const compact = <A>(S: Setoid<A>): ((fa: Set<Option<A>>) => Set<A>) => ...
```

Added in v1.12.0

# ~~difference~~

Use `difference2v` instead

**Signature** (function)

```ts
export const difference = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => ...
```

Added in v1.0.0

# difference2v

Form the set difference (`x` - `y`)

**Signature** (function)

```ts
export const difference2v = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => ...
```

**Example**

```ts
import { difference2v } from 'fp-ts/lib/Set'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.deepStrictEqual(difference2v(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
```

Added in v1.12.0

# elem

Test if a value is a member of a set

**Signature** (function)

```ts
export const elem = <A>(S: Setoid<A>) => (a: A, x: Set<A>): boolean => ...
```

Added in v1.14.0

# every

**Signature** (function)

```ts
export const every = <A>(x: Set<A>, predicate: Predicate<A>): boolean => ...
```

Added in v1.0.0

# filter

**Signature** (function)

```ts
export function filter<A, B extends A>(x: Set<A>, predicate: Refinement<A, B>): Set<B>
export function filter<A>(x: Set<A>, predicate: Predicate<A>): Set<A>
export function filter<A>(x: Set<A>, predicate: Predicate<A>): Set<A> { ... }
```

Added in v1.0.0

# filterMap

**Signature** (function)

```ts
export const filterMap = <B>(S: Setoid<B>): (<A>(fa: Set<A>, f: (a: A) => Option<B>) => Set<B>) => ...
```

Added in v1.12.0

# foldMap

**Signature** (function)

```ts
export const foldMap = <A, M>(O: Ord<A>, M: Monoid<M>): ((fa: Set<A>, f: (a: A) => M) => M) => ...
```

Added in v1.14.0

# fromArray

Create a set from an array

**Signature** (function)

```ts
export const fromArray = <A>(S: Setoid<A>) => (as: Array<A>): Set<A> => ...
```

Added in v1.2.0

# getIntersectionSemigroup

**Signature** (function)

```ts
export const getIntersectionSemigroup = <A>(S: Setoid<A>): Semigroup<Set<A>> => ...
```

Added in v1.0.0

# getSetoid

**Signature** (function)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Set<A>> => ...
```

Added in v1.0.0

# getUnionMonoid

**Signature** (function)

```ts
export const getUnionMonoid = <A>(S: Setoid<A>): Monoid<Set<A>> => ...
```

Added in v1.0.0

# insert

Insert a value into a set

**Signature** (function)

```ts
export const insert = <A>(S: Setoid<A>): ((a: A, x: Set<A>) => Set<A>) => ...
```

Added in v1.0.0

# intersection

The set of elements which are in both the first and second set

**Signature** (function)

```ts
export const intersection = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => ...
```

Added in v1.0.0

# map

Projects a Set through a function

**Signature** (function)

```ts
export const map = <B>(S: Setoid<B>): (<A>(set: Set<A>, f: (x: A) => B) => Set<B>) => ...
```

Added in v1.2.0

# ~~member~~

Use `elem` instead

**Signature** (function)

```ts
export const member = <A>(S: Setoid<A>): ((set: Set<A>) => (a: A) => boolean) => ...
```

Added in v1.0.0

# partition

**Signature** (function)

```ts
export function partition<A, B extends A>(x: Set<A>, predicate: Refinement<A, B>): Separated<Set<A>, Set<B>>
export function partition<A>(x: Set<A>, predicate: Predicate<A>): Separated<Set<A>, Set<A>>
export function partition<A>(x: Set<A>, predicate: Predicate<A>): Separated<Set<A>, Set<A>> { ... }
```

Added in v1.2.0

# partitionMap

**Signature** (function)

```ts
export const partitionMap = <L, R>(SL: Setoid<L>, SR: Setoid<R>) => <A>(
  x: Set<A>,
  f: (a: A) => Either<L, R>
): Separated<Set<L>, Set<R>> => ...
```

Added in v1.2.0

# reduce

**Signature** (function)

```ts
export const reduce = <A>(O: Ord<A>): (<B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B) => ...
```

Added in v1.0.0

# remove

Delete a value from a set

**Signature** (function)

```ts
export const remove = <A>(S: Setoid<A>) => (a: A, x: Set<A>): Set<A> => ...
```

Added in v1.0.0

# separate

**Signature** (function)

```ts
export const separate = <L, R>(SL: Setoid<L>, SR: Setoid<R>) => (fa: Set<Either<L, R>>): Separated<Set<L>, Set<R>> => ...
```

Added in v1.12.0

# singleton

Create a set with one element

**Signature** (function)

```ts
export const singleton = <A>(a: A): Set<A> => ...
```

Added in v1.0.0

# some

**Signature** (function)

```ts
export const some = <A>(x: Set<A>, predicate: Predicate<A>): boolean => ...
```

Added in v1.0.0

# subset

`true` if and only if every element in the first set is an element of the second set

**Signature** (function)

```ts
export const subset = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => boolean) => ...
```

Added in v1.0.0

# toArray

**Signature** (function)

```ts
export const toArray = <A>(O: Ord<A>) => (x: Set<A>): Array<A> => ...
```

Added in v1.0.0

# union

Form the union of two sets

**Signature** (function)

```ts
export const union = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => ...
```

Added in v1.0.0
