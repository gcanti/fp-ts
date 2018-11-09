---
id: Set
title: Module Set
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts)

## chain

```ts
<B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => Set<B>): Set<B>
```

Added in v1.2.0 (function)

## difference

```ts
<A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>)
```

Added in v1.0.0 (function)

Form the set difference (`y` - `x`)

## every

```ts
<A>(x: Set<A>, predicate: Predicate<A>): boolean
```

Added in v1.0.0 (function)

## filter

```ts
<A>(x: Set<A>, predicate: Predicate<A>): Set<A>
```

Added in v1.0.0 (function)

## fromArray

```ts
<A>(S: Setoid<A>) => (as: Array<A>): Set<A>
```

Added in v1.2.0 (function)

Create a set from an array

## getIntersectionSemigroup

```ts
<A>(S: Setoid<A>): Semigroup<Set<A>>
```

Added in v1.0.0 (function)

## getSetoid

```ts
<A>(S: Setoid<A>): Setoid<Set<A>>
```

Added in v1.0.0 (function)

## getUnionMonoid

```ts
<A>(S: Setoid<A>): Monoid<Set<A>>
```

Added in v1.0.0 (function)

## insert

```ts
<A>(S: Setoid<A>): ((a: A, x: Set<A>) => Set<A>)
```

Added in v1.0.0 (function)

Insert a value into a set

## intersection

```ts
<A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>)
```

Added in v1.0.0 (function)

The set of elements which are in both the first and second set

## map

```ts
<B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => B): Set<B>
```

Added in v1.2.0 (function)

Projects a Set through a function

## member

```ts
<A>(S: Setoid<A>) => (x: Set<A>) => (a: A): boolean
```

Added in v1.0.0 (function)

Test if a value is a member of a set

## partition

```ts
<A>(x: Set<A>, predicate: Predicate<A>): Separated<Set<A>, Set<A>>
```

Added in v1.2.0 (function)

## partitionMap

```ts
<L, R>(SL: Setoid<L>, SR: Setoid<R>) => <A>(
  x: Set<A>,
  f: (a: A) => Either<L, R>
): Separated<Set<L>, Set<R>>
```

Added in v1.2.0 (function)

## reduce

```ts
<A>(O: Ord<A>): (<B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B)
```

Added in v1.0.0 (function)

## remove

```ts
<A>(S: Setoid<A>) => (a: A, x: Set<A>): Set<A>
```

Added in v1.0.0 (function)

Delete a value from a set

## singleton

```ts
<A>(a: A): Set<A>
```

Added in v1.0.0 (function)

Create a set with one element

## some

```ts
<A>(x: Set<A>, predicate: Predicate<A>): boolean
```

Added in v1.0.0 (function)

## subset

```ts
<A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>): boolean
```

Added in v1.0.0 (function)

`true` if and only if every element in the first set is an element of the second set

## toArray

```ts
<A>(O: Ord<A>) => (x: Set<A>): Array<A>
```

Added in v1.0.0 (function)

## union

```ts
<A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>)
```

Added in v1.0.0 (function)

Form the union of two sets
