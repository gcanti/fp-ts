---
id: Ring
title: Ring
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Ring.ts)

# Ring

**Signature** (type class)

```ts
export interface Ring<A> extends Semiring<A> {
  readonly sub: (x: A, y: A) => A
}
```

The `Ring` class is for types that support addition, multiplication, and subtraction operations.

Instances must satisfy the following law in addition to the [Semiring](./Semiring.md) laws:

- Additive inverse: `a - a = (zero - a) + a = zero`

Added in v1.0.0

## getFunctionRing

**Signature** (function)

```ts
export const getFunctionRing = <A, B>(ring: Ring<B>): Ring<(a: A) => B> => { ... }
```

Added in v1.0.0

## ~~getProductRing~~

Use [getTupleRing](#gettuplering) instead

**Signature** (function)

```ts
export const getProductRing = <A, B>(RA: Ring<A>, RB: Ring<B>): Ring<[A, B]> => { ... }
```

Added in v1.0.0

## getTupleRing

**Signature** (function)

```ts
export const getTupleRing = <A, B>(RA: Ring<A>, RB: Ring<B>): Ring<[A, B]> => { ... }
```

Added in v1.14.3

## negate

`negate x` can be used as a shorthand for `zero - x`

**Signature** (function)

```ts
export const negate = <A>(ring: Ring<A>) => (a: A): A => { ... }
```

Added in v1.0.0
