---
id: Ord
title: Module Ord
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Ord.ts)

# Ord

```ts
interface Ord<A> extends Setoid<A> {
  readonly compare: (x: A, y: A) => Ordering
}
```

Added in v1.0.0 (type class)

The `Ord` type class represents types which support comparisons with a _total order_.

Instances should satisfy the laws of total orderings:

1. Reflexivity: `S.compare(a, a) <= 0`
2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`

## ordBoolean

```ts
Ord<boolean>
```

Added in v1.0.0 (instance)

## ordDate

```ts
Ord<Date>
```

Added in v1.4.0 (instance)

## ordNumber

```ts
Ord<number>
```

Added in v1.0.0 (instance)

## ordString

```ts
Ord<string>
```

Added in v1.0.0 (instance)

## between

```ts
<A>(O: Ord<A>): ((low: A, hi: A) => (x: A) => boolean)
```

Added in v1.0.0 (function)

Test whether a value is between a minimum and a maximum (inclusive)

## clamp

```ts
<A>(O: Ord<A>): ((low: A, hi: A) => (x: A) => A)
```

Added in v1.0.0 (function)

Clamp a value between a minimum and a maximum

## contramap

```ts
<A, B>(f: (b: B) => A, fa: Ord<A>): Ord<B>
```

Added in v1.0.0 (function)

## fromCompare

```ts
<A>(compare: (x: A, y: A) => Ordering): Ord<A>
```

Added in v1.0.0 (function)

## getDualOrd

```ts
<A>(O: Ord<A>): Ord<A>
```

Added in v1.3.0 (function)

## getProductOrd

```ts
<A, B>(OA: Ord<A>, OB: Ord<B>): Ord<[A, B]>
```

Added in v1.0.0 (function)

## getSemigroup

```ts
<A = never>(): Semigroup<Ord<A>>
```

Added in v1.0.0 (function)

## greaterThan

```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```

Added in v1.0.0 (function)

Test whether one value is _strictly greater than_ another

## greaterThanOrEq

```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```

Added in v1.0.0 (function)

Test whether one value is _non-strictly greater than_ another

## lessThan

```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```

Added in v1.0.0 (function)

Test whether one value is _strictly less than_ another

## lessThanOrEq

```ts
<A>(O: Ord<A>) => (x: A, y: A): boolean
```

Added in v1.0.0 (function)

Test whether one value is _non-strictly less than_ another

## max

```ts
<A>(O: Ord<A>) => (x: A, y: A): A
```

Added in v1.0.0 (function)

Take the maximum of two values. If they are considered equal, the first argument is chosen

## min

```ts
<A>(O: Ord<A>) => (x: A, y: A): A
```

Added in v1.0.0 (function)

Take the minimum of two values. If they are considered equal, the first argument is chosen

## unsafeCompare

```ts
(x: any, y: any): Ordering
```

Added in v1.0.0 (function)
