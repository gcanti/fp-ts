---
id: Ring
title: Module Ring
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Ring.ts)

# Ring

```ts
interface Ring<A> extends Semiring<A> {
  readonly sub: (x: A, y: A) => A
}
```

Added in v1.0.0 (type class)

The `Ring` class is for types that support addition, multiplication, and subtraction operations.

Instances must satisfy the following law in addition to the `Semiring` laws:

- Additive inverse: `a - a = (zero - a) + a = zero`

## getFunctionRing

```ts
<A, B>(ring: Ring<B>): Ring<(a: A) => B>
```

Added in v1.0.0 (function)

## getProductRing

```ts
<A, B>(RA: Ring<A>, RB: Ring<B>): Ring<[A, B]>
```

Added in v1.0.0 (function)

## negate

```ts
<A>(ring: Ring<A>) => (a: A): A
```

Added in v1.0.0 (function)

`negate x` can be used as a shorthand for `zero - x`
