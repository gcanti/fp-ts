---
id: Set
title: Module Set
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts)

## chain

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L75-L86)

```ts
export const chain = <B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => Set<B>): Set<B> => { ... }
```

Added in v1.2.0

## compact

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L333-L336)

```ts
export const compact = <A>(S: Setoid<A>): ((fa: Set<Option<A>>) => Set<A>) => { ... }
```

Added in v1.12.0

## ~~difference~~ (deprecated)

Use [difference2v](#difference2v) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L223-L226)

```ts
export const difference = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## difference2v

Form the set difference (`x` - `y`)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L240-L243)

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L67-L69)

```ts
export const every = <A>(x: Set<A>, predicate: Predicate<A>): boolean => { ... }
```

Added in v1.0.0

## filter

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L103-L115)

```ts
export function filter<A>(x: Set<A>, predicate: Predicate<A>): Set<A>  { ... }
```

Added in v1.0.0

## filterMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L367-L380)

```ts
export const filterMap = <B>(S: Setoid<B>): (<A>(fa: Set<A>, f: (a: A) => Option<B>) => Set<B>) => { ... }
```

Added in v1.12.0

## fromArray

Create a set from an array

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L316-L327)

```ts
export const fromArray = <A>(S: Setoid<A>) => (as: Array<A>): Set<A> => { ... }
```

Added in v1.2.0

## getIntersectionSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L260-L264)

```ts
export const getIntersectionSemigroup = <A>(S: Setoid<A>): Semigroup<Set<A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L24-L29)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Set<A>> => { ... }
```

Added in v1.0.0

## getUnionMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L249-L254)

```ts
export const getUnionMonoid = <A>(S: Setoid<A>): Monoid<Set<A>> => { ... }
```

Added in v1.0.0

## insert

Insert a value into a set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L289-L300)

```ts
export const insert = <A>(S: Setoid<A>): ((a: A, x: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## intersection

The set of elements which are in both the first and second set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L173-L185)

```ts
export const intersection = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## map

Projects a Set through a function

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L51-L61)

```ts
export const map = <B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => B): Set<B> => { ... }
```

Added in v1.2.0

## member

Test if a value is a member of a set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L145-L147)

```ts
export const member = <A>(S: Setoid<A>) => (x: Set<A>) => (a: A): boolean => { ... }
```

Added in v1.0.0

## partition

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L123-L138)

```ts
export function partition<A>(x: Set<A>, predicate: Predicate<A>): Separated<Set<A>, Set<A>>  { ... }
```

Added in v1.2.0

## partitionMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L191-L215)

```ts
export const partitionMap = <L, R>(SL: Setoid<L>, SR: Setoid<R>) => <A>(
  x: Set<A>,
  f: (a: A) => Either<L, R>
): Separated<Set<L>, Set<R>> => { ... }
```

Added in v1.2.0

## reduce

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L270-L273)

```ts
export const reduce = <A>(O: Ord<A>): (<B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B) => { ... }
```

Added in v1.0.0

## remove

Delete a value from a set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L307-L309)

```ts
export const remove = <A>(S: Setoid<A>) => (a: A, x: Set<A>): Set<A> => { ... }
```

Added in v1.0.0

## separate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L342-L361)

```ts
export const separate = <L, R>(SL: Setoid<L>, SR: Setoid<R>) => (fa: Set<Either<L, R>>): Separated<Set<L>, Set<R>> => { ... }
```

Added in v1.12.0

## singleton

Create a set with one element

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L280-L282)

```ts
export const singleton = <A>(a: A): Set<A> => { ... }
```

Added in v1.0.0

## some

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L35-L44)

```ts
export const some = <A>(x: Set<A>, predicate: Predicate<A>): boolean => { ... }
```

Added in v1.0.0

## subset

`true` if and only if every element in the first set is an element of the second set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L93-L95)

```ts
export const subset = <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>): boolean => { ... }
```

Added in v1.0.0

## toArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L14-L18)

```ts
export const toArray = <A>(O: Ord<A>) => (x: Set<A>): Array<A> => { ... }
```

Added in v1.0.0

## union

Form the union of two sets

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L154-L166)

```ts
export const union = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0
