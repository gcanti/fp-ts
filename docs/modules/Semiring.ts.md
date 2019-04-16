---
title: Semiring.ts
nav_order: 77
parent: Modules
---

# Overview

The `Semiring` class is for types that support an addition and multiplication operation.

Instances must satisfy the following laws:

- Commutative monoid under addition:
  - Associativity: `(a + b) + c = a + (b + c)`
  - Identity: `zero + a = a + zero = a`
  - Commutative: `a + b = b + a`
- Monoid under multiplication:
  - Associativity: `(a * b) * c = a * (b * c)`
  - Identity: `one * a = a * one = a`
- Multiplication distributes over addition:
  - Left distributivity: `a * (b + c) = (a * b) + (a * c)`
  - Right distributivity: `(a + b) * c = (a * c) + (b * c)`
- Annihilation: `zero * a = a * zero = zero`

**Note:** The `number` type is not fully law abiding members of this class hierarchy due to the potential
for arithmetic overflows, and the presence of `NaN` and `Infinity` values. The behaviour is
unspecified in these cases.

---

<h2 class="text-delta">Table of contents</h2>

- [Semiring (interface)](#semiring-interface)
- [getFunctionSemiring (function)](#getfunctionsemiring-function)

---

# Semiring (interface)

**Signature**

```ts
export interface Semiring<A> {
  readonly add: (x: A, y: A) => A
  readonly zero: A
  readonly mul: (x: A, y: A) => A
  readonly one: A
}
```

Added in v1.0.0

# getFunctionSemiring (function)

**Signature**

```ts
export const getFunctionSemiring = <A, B>(S: Semiring<B>): Semiring<(a: A) => B> => ...
```

Added in v1.0.0
