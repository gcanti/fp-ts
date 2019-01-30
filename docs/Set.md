---
id: Set
title: Module Set
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts)

## chain

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L70-L81)

```ts
export const chain = <B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => Set<B>): Set<B> => { ... }
```

Added in v1.2.0

## compact

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L321-L324)

```ts
export const compact = <A>(S: Setoid<A>): ((fa: Set<Option<A>>) => Set<A>) => { ... }
```

Added in v1.12.0

## ~~difference~~ (deprecated)

Use [difference2v](#difference2v) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L215-L218)

```ts
export const difference = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## difference2v

Form the set difference (`x` - `y`)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L232-L235)

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L63-L65)

```ts
export const every = <A>(x: Set<A>, predicate: Predicate<A>): boolean => { ... }
```

Added in v1.0.0

## filter

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L97-L109)

```ts
export function filter<A>(x: Set<A>, predicate: Predicate<A>): Set<A>  { ... }
```

Added in v1.0.0

## filterMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L353-L366)

```ts
export const filterMap = <B>(S: Setoid<B>): (<A>(fa: Set<A>, f: (a: A) => Option<B>) => Set<B>) => { ... }
```

Added in v1.12.0

## fromArray

Create a set from an array

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L305-L316)

```ts
export const fromArray = <A>(S: Setoid<A>) => (as: Array<A>): Set<A> => { ... }
```

Added in v1.2.0

## getIntersectionSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L250-L254)

```ts
export const getIntersectionSemigroup = <A>(S: Setoid<A>): Semigroup<Set<A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L22-L27)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Set<A>> => { ... }
```

Added in v1.0.0

## getUnionMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L240-L245)

```ts
export const getUnionMonoid = <A>(S: Setoid<A>): Monoid<Set<A>> => { ... }
```

Added in v1.0.0

## insert

Insert a value into a set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L278-L289)

```ts
export const insert = <A>(S: Setoid<A>): ((a: A, x: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## intersection

The set of elements which are in both the first and second set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L166-L178)

```ts
export const intersection = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## map

Projects a Set through a function

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L48-L58)

```ts
export const map = <B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => B): Set<B> => { ... }
```

Added in v1.2.0

## member

Test if a value is a member of a set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L138-L140)

```ts
export const member = <A>(S: Setoid<A>) => (x: Set<A>) => (a: A): boolean => { ... }
```

Added in v1.0.0

## partition

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L116-L131)

```ts
export function partition<A>(x: Set<A>, predicate: Predicate<A>): Separated<Set<A>, Set<A>>  { ... }
```

Added in v1.2.0

## partitionMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L183-L207)

```ts
export const partitionMap = <L, R>(SL: Setoid<L>, SR: Setoid<R>) => <A>(
  x: Set<A>,
  f: (a: A) => Either<L, R>
): Separated<Set<L>, Set<R>> => { ... }
```

Added in v1.2.0

## reduce

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L259-L262)

```ts
export const reduce = <A>(O: Ord<A>): (<B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B) => { ... }
```

Added in v1.0.0

## remove

Delete a value from a set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L296-L298)

```ts
export const remove = <A>(S: Setoid<A>) => (a: A, x: Set<A>): Set<A> => { ... }
```

Added in v1.0.0

## separate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L329-L348)

```ts
export const separate = <L, R>(SL: Setoid<L>, SR: Setoid<R>) => (fa: Set<Either<L, R>>): Separated<Set<L>, Set<R>> => { ... }
```

Added in v1.12.0

## singleton

Create a set with one element

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L269-L271)

```ts
export const singleton = <A>(a: A): Set<A> => { ... }
```

Added in v1.0.0

## some

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L32-L41)

```ts
export const some = <A>(x: Set<A>, predicate: Predicate<A>): boolean => { ... }
```

Added in v1.0.0

## subset

`true` if and only if every element in the first set is an element of the second set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L88-L90)

```ts
export const subset = <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>): boolean => { ... }
```

Added in v1.0.0

## toArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L13-L17)

```ts
export const toArray = <A>(O: Ord<A>) => (x: Set<A>): Array<A> => { ... }
```

Added in v1.0.0

## union

Form the union of two sets

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L147-L159)

```ts
export const union = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0
