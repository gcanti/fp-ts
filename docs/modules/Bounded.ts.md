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

- [instances](#instances)
  - [~~boundedNumber~~](#boundednumber)
- [type classes](#type-classes)
  - [Bounded (interface)](#bounded-interface)
- [utils](#utils)
  - [clamp](#clamp)
  - [reverse](#reverse)

---

# instances

## ~~boundedNumber~~

Use [`Bounded`](./number.ts.html#bounded) instead.

**Signature**

```ts
export declare const boundedNumber: Bounded<number>
```

Added in v2.0.0

# type classes

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
