---
id: Ring
title: Module Ring
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Ring.ts)

## Type classes

### Ring

_type class_

_Signature_

```ts
interface Ring<A> extends Semiring<A> {
  readonly sub: (x: A, y: A) => A
}
```

_Description_

The `Ring` class is for types that support addition, multiplication, and subtraction operations.

Instances must satisfy the following law in addition to the `Semiring` laws:

* Additive inverse: `a - a = (zero - a) + a = zero`

## Functions

### getFunctionRing

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(ring: Ring<B>): Ring<(a: A) => B>
```

### getProductRing

_function_

_since 1.0.0_

_Signature_

```ts
<A, B>(RA: Ring<A>, RB: Ring<B>): Ring<[A, B]>
```

### negate

_function_

_since 1.0.0_

_Signature_

```ts
<A>(ring: Ring<A>) => (a: A): A
```

_Description_

`negate x` can be used as a shorthand for `zero - x`
