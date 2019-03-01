---
title: Ring.ts
nav_order: 72
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
- [Ring](#ring)
- [getFunctionRing](#getfunctionring)
- [~~getProductRing~~](#getproductring)
- [getTupleRing](#gettuplering)
- [negate](#negate)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

The `Ring` class is for types that support addition, multiplication, and subtraction operations.

Instances must satisfy the following law in addition to the `Semiring` laws:

- Additive inverse: `a - a = (zero - a) + a = zero`

Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Ring.purs

# Ring

**Signature** (interface)

```ts
export interface Ring<A> extends Semiring<A> {
  readonly sub: (x: A, y: A) => A
}
```

Added in v1.0.0

# getFunctionRing

**Signature** (function)

```ts
export const getFunctionRing = <A, B>(ring: Ring<B>): Ring<(a: A) => B> => ...
```

Added in v1.0.0

# ~~getProductRing~~

Use `getTupleRing` instead

**Signature** (function)

```ts
export const getProductRing = <A, B>(RA: Ring<A>, RB: Ring<B>): Ring<[A, B]> => ...
```

Added in v1.0.0

# getTupleRing

**Signature** (function)

```ts
export const getTupleRing = <A, B>(RA: Ring<A>, RB: Ring<B>): Ring<[A, B]> => ...
```

Added in v1.14.3

# negate

`negate x` can be used as a shorthand for `zero - x`

**Signature** (function)

```ts
export const negate = <A>(ring: Ring<A>) => (a: A): A => ...
```

Added in v1.0.0
