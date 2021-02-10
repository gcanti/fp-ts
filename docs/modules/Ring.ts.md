---
title: Ring.ts
nav_order: 81
parent: Modules
---

## Ring overview

The `Ring` class is for types that support addition, multiplication, and subtraction operations.

Instances must satisfy the following law in addition to the `Semiring` laws:

- Additive inverse: `a - a <-> (zero - a) + a <-> zero`

Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Ring.purs

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [tuple](#tuple)
  - [~~getTupleRing~~](#gettuplering)
- [instances](#instances)
  - [~~getFunctionRing~~](#getfunctionring)
- [type classes](#type-classes)
  - [Ring (interface)](#ring-interface)
- [utils](#utils)
  - [negate](#negate)

---

# combinators

## tuple

Given a tuple of `Ring`s returns a `Ring` for the tuple

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(...rings: { [K in keyof A]: Ring<A[K]> }) => Ring<A>
```

**Example**

```ts
import { tuple } from 'fp-ts/Ring'
import * as N from 'fp-ts/number'

const R = tuple(N.Field, N.Field, N.Field)
assert.deepStrictEqual(R.add([1, 2, 3], [4, 5, 6]), [5, 7, 9])
assert.deepStrictEqual(R.mul([1, 2, 3], [4, 5, 6]), [4, 10, 18])
assert.deepStrictEqual(R.one, [1, 1, 1])
assert.deepStrictEqual(R.sub([1, 2, 3], [4, 5, 6]), [-3, -3, -3])
assert.deepStrictEqual(R.zero, [0, 0, 0])
```

Added in v2.10.0

## ~~getTupleRing~~

Use `tuple` instead.

**Signature**

```ts
export declare const getTupleRing: <T extends readonly Ring<any>[]>(
  ...rings: T
) => Ring<{ [K in keyof T]: T[K] extends Ring<infer A> ? A : never }>
```

Added in v2.0.0

# instances

## ~~getFunctionRing~~

Use `function.getRing` instead.

**Signature**

```ts
export declare const getFunctionRing: <A, B>(R: Ring<B>) => Ring<(a: A) => B>
```

Added in v2.0.0

# type classes

## Ring (interface)

**Signature**

```ts
export interface Ring<A> extends Semiring<A> {
  readonly sub: (x: A, y: A) => A
}
```

Added in v2.0.0

# utils

## negate

`negate x` can be used as a shorthand for `zero - x`

**Signature**

```ts
export declare const negate: <A>(R: Ring<A>) => (a: A) => A
```

Added in v2.0.0
