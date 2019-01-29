---
id: Set
title: Module Set
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts)

## chain

**Signature** (function)

```ts
export const chain = <B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => Set<B>): Set<B> => { ... }
```

Added in v1.2.0

## compact

**Signature** (function)

```ts
export const compact = <A>(S: Setoid<A>): ((fa: Set<Option<A>>) => Set<A>) => { ... }
```

Added in v1.12.0

## ~~difference~~ (deprecated)

Use [difference2v](#difference2v) instead

**Signature** (function)

```ts
export const difference = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## difference2v

Form the set difference (`x` - `y`)

**Signature** (function)

```ts
export const difference2v = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

**Example**

```ts
import { difference2v } from 'fp-ts/lib/Set'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.deepEqual(difference2v(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
```

Added in v1.12.0

## every

**Signature** (function)

```ts
export const every = <A>(x: Set<A>, predicate: Predicate<A>): boolean => { ... }
```

Added in v1.0.0

## filter

**Signature** (function)

```ts
export function filter<A>(x: Set<A>, predicate: Predicate<A>): Set<A>  { ... }
```

Added in v1.0.0

## filterMap

**Signature** (function)

```ts
export const filterMap = <B>(S: Setoid<B>): (<A>(fa: Set<A>, f: (a: A) => Option<B>) => Set<B>) => { ... }
```

Added in v1.12.0

## fromArray

Create a set from an array

**Signature** (function)

```ts
export const fromArray = <A>(S: Setoid<A>) => (as: Array<A>): Set<A> => { ... }
```

Added in v1.2.0

## getIntersectionSemigroup

**Signature** (function)

```ts
export const getIntersectionSemigroup = <A>(S: Setoid<A>): Semigroup<Set<A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Set<A>> => { ... }
```

Added in v1.0.0

## getUnionMonoid

**Signature** (function)

```ts
export const getUnionMonoid = <A>(S: Setoid<A>): Monoid<Set<A>> => { ... }
```

Added in v1.0.0

## insert

Insert a value into a set

**Signature** (function)

```ts
export const insert = <A>(S: Setoid<A>): ((a: A, x: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## intersection

The set of elements which are in both the first and second set

**Signature** (function)

```ts
export const intersection = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## map

Projects a Set through a function

**Signature** (function)

```ts
export const map = <B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => B): Set<B> => { ... }
```

Added in v1.2.0

## member

Test if a value is a member of a set

**Signature** (function)

```ts
export const member = <A>(S: Setoid<A>) => (x: Set<A>) => (a: A): boolean => { ... }
```

Added in v1.0.0

## partition

**Signature** (function)

```ts
export function partition<A>(x: Set<A>, predicate: Predicate<A>): Separated<Set<A>, Set<A>>  { ... }
```

Added in v1.2.0

## partitionMap

**Signature** (function)

```ts
export const partitionMap = <L, R>(SL: Setoid<L>, SR: Setoid<R>) => <A>(
  x: Set<A>,
  f: (a: A) => Either<L, R>
): Separated<Set<L>, Set<R>> => { ... }
```

Added in v1.2.0

## reduce

**Signature** (function)

```ts
export const reduce = <A>(O: Ord<A>): (<B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B) => { ... }
```

Added in v1.0.0

## remove

Delete a value from a set

**Signature** (function)

```ts
export const remove = <A>(S: Setoid<A>) => (a: A, x: Set<A>): Set<A> => { ... }
```

Added in v1.0.0

## separate

**Signature** (function)

```ts
export const separate = <L, R>(SL: Setoid<L>, SR: Setoid<R>) => (fa: Set<Either<L, R>>): Separated<Set<L>, Set<R>> => { ... }
```

Added in v1.12.0

## singleton

Create a set with one element

**Signature** (function)

```ts
export const singleton = <A>(a: A): Set<A> => { ... }
```

Added in v1.0.0

## some

**Signature** (function)

```ts
export const some = <A>(x: Set<A>, predicate: Predicate<A>): boolean => { ... }
```

Added in v1.0.0

## subset

`true` if and only if every element in the first set is an element of the second set

**Signature** (function)

```ts
export const subset = <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>): boolean => { ... }
```

Added in v1.0.0

## toArray

**Signature** (function)

```ts
export const toArray = <A>(O: Ord<A>) => (x: Set<A>): Array<A> => { ... }
```

Added in v1.0.0

## union

Form the union of two sets

**Signature** (function)

```ts
export const union = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0
