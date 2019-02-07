---
id: Set
title: Module Set
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts)

## chain

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L68-L79)

```ts
export const chain = <B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => Set<B>): Set<B> => { ... }
```

Added in v1.2.0

## compact

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L319-L322)

```ts
export const compact = <A>(S: Setoid<A>): ((fa: Set<Option<A>>) => Set<A>) => { ... }
```

Added in v1.12.0

## ~~difference~~ (deprecated)

Use [difference2v](#difference2v) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L213-L216)

```ts
export const difference = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## difference2v

Form the set difference (`x` - `y`)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L230-L233)

```ts
export const difference2v = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

**Example**

```ts
import { difference2v } from 'fp-ts/lib/Set'
import { setoidNumber } from 'fp-ts/lib/Setoid'

assert.deepStrictEqual(difference2v(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
```

Added in v1.12.0

## every

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L61-L63)

```ts
export const every = <A>(x: Set<A>, predicate: Predicate<A>): boolean => { ... }
```

Added in v1.0.0

## filter

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L95-L107)

```ts
export function filter<A>(x: Set<A>, predicate: Predicate<A>): Set<A>  { ... }
```

Added in v1.0.0

## filterMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L351-L364)

```ts
export const filterMap = <B>(S: Setoid<B>): (<A>(fa: Set<A>, f: (a: A) => Option<B>) => Set<B>) => { ... }
```

Added in v1.12.0

## fromArray

Create a set from an array

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L303-L314)

```ts
export const fromArray = <A>(S: Setoid<A>) => (as: Array<A>): Set<A> => { ... }
```

Added in v1.2.0

## getIntersectionSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L248-L252)

```ts
export const getIntersectionSemigroup = <A>(S: Setoid<A>): Semigroup<Set<A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L22-L25)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Set<A>> => { ... }
```

Added in v1.0.0

## getUnionMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L238-L243)

```ts
export const getUnionMonoid = <A>(S: Setoid<A>): Monoid<Set<A>> => { ... }
```

Added in v1.0.0

## insert

Insert a value into a set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L276-L287)

```ts
export const insert = <A>(S: Setoid<A>): ((a: A, x: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## intersection

The set of elements which are in both the first and second set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L164-L176)

```ts
export const intersection = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0

## map

Projects a Set through a function

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L46-L56)

```ts
export const map = <B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => B): Set<B> => { ... }
```

Added in v1.2.0

## member

Test if a value is a member of a set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L136-L138)

```ts
export const member = <A>(S: Setoid<A>) => (x: Set<A>) => (a: A): boolean => { ... }
```

Added in v1.0.0

## partition

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L114-L129)

```ts
export function partition<A>(x: Set<A>, predicate: Predicate<A>): Separated<Set<A>, Set<A>>  { ... }
```

Added in v1.2.0

## partitionMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L181-L205)

```ts
export const partitionMap = <L, R>(SL: Setoid<L>, SR: Setoid<R>) => <A>(
  x: Set<A>,
  f: (a: A) => Either<L, R>
): Separated<Set<L>, Set<R>> => { ... }
```

Added in v1.2.0

## reduce

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L257-L260)

```ts
export const reduce = <A>(O: Ord<A>): (<B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B) => { ... }
```

Added in v1.0.0

## remove

Delete a value from a set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L294-L296)

```ts
export const remove = <A>(S: Setoid<A>) => (a: A, x: Set<A>): Set<A> => { ... }
```

Added in v1.0.0

## separate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L327-L346)

```ts
export const separate = <L, R>(SL: Setoid<L>, SR: Setoid<R>) => (fa: Set<Either<L, R>>): Separated<Set<L>, Set<R>> => { ... }
```

Added in v1.12.0

## singleton

Create a set with one element

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L267-L269)

```ts
export const singleton = <A>(a: A): Set<A> => { ... }
```

Added in v1.0.0

## some

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L30-L39)

```ts
export const some = <A>(x: Set<A>, predicate: Predicate<A>): boolean => { ... }
```

Added in v1.0.0

## subset

`true` if and only if every element in the first set is an element of the second set

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L86-L88)

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts#L145-L157)

```ts
export const union = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => { ... }
```

Added in v1.0.0
