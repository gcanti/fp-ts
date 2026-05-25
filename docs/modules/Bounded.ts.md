---
title: Bounded.ts
nav_order: 9
parent: Modules
---

## Bounded overview

The `Bounded` type class represents totally ordered types that have an upper and lower boundary.

Instances should satisfy the following law in addition to the `Ord` laws:

- Bounded: `bottom <= a <= top`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromOrd](#fromord)
- [model](#model)
  - [Bounded (interface)](#bounded-interface)
- [utils](#utils)
  - [clamp](#clamp)
  - [reverse](#reverse)
- [zone of death](#zone-of-death)
  - [~~boundedNumber~~](#boundednumber)

---

# constructors

## fromOrd

Builds a `Bounded` from an `Ord` and the given `top` and `bottom` values.

**Signature**

```ts
export declare const fromOrd: <A>(ord: O.Ord<A>) => (top: A, bottom: A) => Bounded<A>
```

**Example**

```ts
import * as B from 'fp-ts/Bounded'
import * as N from 'fp-ts/number'

const bounded = B.fromOrd(N.Ord)(10, 0)

assert.deepStrictEqual(bounded.top, 10)
assert.deepStrictEqual(bounded.bottom, 0)
assert.deepStrictEqual(bounded.compare(1, 2), -1)
```

Added in v2.17.0

# model

## Bounded (interface)

**Signature**

```ts
export interface Bounded<A> extends Ord<A> {
  readonly top: A
  readonly bottom: A
}
```

Added in v2.0.0

# utils

## clamp

Clamp a value between bottom and top values.

**Signature**

```ts
export declare const clamp: <A>(B: Bounded<A>) => (a: A) => A
```

Added in v2.12.0

## reverse

Reverses the Ord of a bound and swaps top and bottom values.

**Signature**

```ts
export declare const reverse: <A>(B: Bounded<A>) => Bounded<A>
```

Added in v2.12.0

# zone of death

## ~~boundedNumber~~

Use [`Bounded`](./number.ts.html#bounded) instead.

**Signature**

```ts
export declare const boundedNumber: Bounded<number>
```

Added in v2.0.0
