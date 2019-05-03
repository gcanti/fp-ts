---
title: Field.ts
nav_order: 30
parent: Modules
---

# Overview

Adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Field.purs

---

<h2 class="text-delta">Table of contents</h2>

- [Field (interface)](#field-interface)
- [fieldNumber (constant)](#fieldnumber-constant)
- [gcd (function)](#gcd-function)
- [lcm (function)](#lcm-function)

---

# Field (interface)

**Signature**

```ts
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (x: A, y: A) => A
  readonly mod: (x: A, y: A) => A
}
```

Added in v2.0.0

# fieldNumber (constant)

**Signature**

```ts
export const fieldNumber: Field<number> = ...
```

Added in v2.0.0

# gcd (function)

The _greatest common divisor_ of two values

**Signature**

```ts
export const gcd = <A>(E: Eq<A>, field: Field<A>): ((x: A, y: A) => A) => ...
```

Added in v2.0.0

# lcm (function)

The _least common multiple_ of two values

**Signature**

```ts
export const lcm = <A>(E: Eq<A>, F: Field<A>): ((x: A, y: A) => A) => ...
```

Added in v2.0.0
