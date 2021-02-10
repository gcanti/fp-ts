---
title: Ring.ts
nav_order: 69
parent: Modules
---

## Ring overview

The `Ring` class is for types that support addition, multiplication, and subtraction operations.

Instances must satisfy the following law in addition to the `Semiring` laws:

- Additive inverse: `a - a <-> (zero - a) + a <-> zero`

Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Ring.purs

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [tuple](#tuple)
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
import { pipe } from 'fp-ts/function'

const R = tuple(N.Field, N.Field, N.Field)
assert.deepStrictEqual(pipe([1, 2, 3], R.add([4, 5, 6])), [5, 7, 9])
assert.deepStrictEqual(pipe([1, 2, 3], R.mul([4, 5, 6])), [4, 10, 18])
assert.deepStrictEqual(R.one, [1, 1, 1])
assert.deepStrictEqual(pipe([1, 2, 3], R.sub([4, 5, 6])), [-3, -3, -3])
assert.deepStrictEqual(R.zero, [0, 0, 0])
```

Added in v3.0.0

# type classes

## Ring (interface)

**Signature**

```ts
export interface Ring<A> extends Semiring<A> {
  readonly sub: (second: A) => (first: A) => A
}
```

Added in v3.0.0

# utils

## negate

`negate x` can be used as a shorthand for `zero - x`

**Signature**

```ts
export declare const negate: <A>(ring: Ring<A>) => Endomorphism<A>
```

Added in v3.0.0
