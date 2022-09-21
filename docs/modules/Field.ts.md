---
title: Field.ts
nav_order: 28
parent: Modules
---

## Field overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Field (interface)](#field-interface)
- [utils](#utils)
  - [gcd](#gcd)
  - [lcm](#lcm)

---

# type classes

## Field (interface)

**Signature**

```ts
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (second: A) => (first: A) => A
  readonly mod: (second: A) => (first: A) => A
}
```

Added in v3.0.0

# utils

## gcd

The _greatest common divisor_ of two values.

**Signature**

```ts
export declare const gcd: <A>(E: Eq<A>, F: Field<A>) => (second: A) => (first: A) => A
```

Added in v3.0.0

## lcm

The _least common multiple_ of two values.

**Signature**

```ts
export declare const lcm: <A>(E: Eq<A>, F: Field<A>) => (second: A) => (first: A) => A
```

Added in v3.0.0
