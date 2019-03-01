---
title: Field.ts
nav_order: 28
---

# Overview

Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Field.purs

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Field](#field)
- [fieldNumber](#fieldnumber)
- [gcd](#gcd)
- [lcm](#lcm)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Field

**Signature** (interface)

```ts
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (x: A, y: A) => A
  readonly mod: (x: A, y: A) => A
}
```

Added in v1.0.0

# fieldNumber

**Signature** (constant)

```ts
export const fieldNumber: Field<number> = ...
```

Added in v1.0.0

# gcd

The _greatest common divisor_ of two values

**Signature** (function)

```ts
export const gcd = <A>(S: Setoid<A>, field: Field<A>): ((x: A, y: A) => A) => ...
```

Added in v1.0.0

# lcm

The _least common multiple_ of two values

**Signature** (function)

```ts
export const lcm = <A>(S: Setoid<A>, F: Field<A>): ((x: A, y: A) => A) => ...
```

Added in v1.0.0
