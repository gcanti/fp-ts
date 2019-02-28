---
id: Field
title: Field
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Field.ts)

# Field

**Signature** (type class)

```ts
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (x: A, y: A) => A
  readonly mod: (x: A, y: A) => A
}
```

Added in v1.0.0

## fieldNumber

**Signature** (constant)

```ts
export const fieldNumber: Field<number> = ...
```

Added in v1.0.0

## gcd

The _greatest common divisor_ of two values

**Signature** (function)

```ts
export const gcd = <A>(S: Setoid<A>, field: Field<A>): ((x: A, y: A) => A) => { ... }
```

Added in v1.0.0

## lcm

The _least common multiple_ of two values

**Signature** (function)

```ts
export const lcm = <A>(S: Setoid<A>, F: Field<A>): ((x: A, y: A) => A) => { ... }
```

Added in v1.0.0
