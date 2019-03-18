---
title: Ring.ts
nav_order: 73
parent: Modules
---

# Overview

The `Ring` class is for types that support addition, multiplication, and subtraction operations.

Instances must satisfy the following law in addition to the `Semiring` laws:

- Additive inverse: `a - a = (zero - a) + a = zero`

Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Ring.purs

---

<h2 class="text-delta">Table of contents</h2>

- [Ring (interface)](#ring-interface)
- [getFunctionRing (function)](#getfunctionring-function)
- [~~getProductRing~~ (function)](#getproductring-function)
- [getTupleRing (function)](#gettuplering-function)
- [negate (function)](#negate-function)

---

# Ring (interface)

**Signature**

```ts
export interface Ring<A> extends Semiring<A> {
  readonly sub: (x: A, y: A) => A
}
```

Added in v1.0.0

# getFunctionRing (function)

**Signature**

```ts
export const getFunctionRing = <A, B>(ring: Ring<B>): Ring<(a: A) => B> => ...
```

Added in v1.0.0

# ~~getProductRing~~ (function)

Use `getTupleRing` instead

**Signature**

```ts
export const getProductRing = <A, B>(RA: Ring<A>, RB: Ring<B>): Ring<[A, B]> => ...
```

Added in v1.0.0

# getTupleRing (function)

**Signature**

```ts
export const getTupleRing = <A, B>(RA: Ring<A>, RB: Ring<B>): Ring<[A, B]> => ...
```

Added in v1.14.3

# negate (function)

`negate x` can be used as a shorthand for `zero - x`

**Signature**

```ts
export const negate = <A>(ring: Ring<A>) => (a: A): A => ...
```

Added in v1.0.0
