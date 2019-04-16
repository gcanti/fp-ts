---
title: Ring.ts
nav_order: 74
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

Given a tuple of `Ring`s returns a `Ring` for the tuple

**Signature**

```ts
export const getTupleRing = <T extends Array<Ring<any>>>(
  ...rings: T
): Ring<{ [K in keyof T]: T[K] extends Ring<infer A> ? A : never }> => ...
```

**Example**

```ts
import { getTupleRing } from 'fp-ts/lib/Ring'
import { fieldNumber } from 'fp-ts/lib/Field'

const R = getTupleRing(fieldNumber, fieldNumber, fieldNumber)
assert.deepStrictEqual(R.add([1, 2, 3], [4, 5, 6]), [5, 7, 9])
assert.deepStrictEqual(R.mul([1, 2, 3], [4, 5, 6]), [4, 10, 18])
assert.deepStrictEqual(R.one, [1, 1, 1])
assert.deepStrictEqual(R.sub([1, 2, 3], [4, 5, 6]), [-3, -3, -3])
assert.deepStrictEqual(R.zero, [0, 0, 0])
```

Added in v1.14.3

# negate (function)

`negate x` can be used as a shorthand for `zero - x`

**Signature**

```ts
export const negate = <A>(ring: Ring<A>) => (a: A): A => ...
```

Added in v1.0.0
