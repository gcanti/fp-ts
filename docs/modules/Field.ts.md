---
title: Field.ts
nav_order: 29
parent: Modules
---

## Field overview

Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Field.purs

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [~~fieldNumber~~](#fieldnumber)
- [type classes](#type-classes)
  - [Field (interface)](#field-interface)
- [utils](#utils)
  - [gcd](#gcd)
  - [lcm](#lcm)

---

# instances

## ~~fieldNumber~~

Use [`Field`](./number.ts.html#Field) instead.

**Signature**

```ts
export declare const fieldNumber: Field<number>
```

Added in v2.0.0

# type classes

## Field (interface)

**Signature**

```ts
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (x: A, y: A) => A
  readonly mod: (x: A, y: A) => A
}
```

Added in v2.0.0

# utils

## gcd

The _greatest common divisor_ of two values

**Signature**

```ts
export declare function gcd<A>(E: Eq<A>, field: Field<A>): (x: A, y: A) => A
```

Added in v2.0.0

## lcm

The _least common multiple_ of two values

**Signature**

```ts
export declare function lcm<A>(E: Eq<A>, F: Field<A>): (x: A, y: A) => A
```

Added in v2.0.0
