---
id: Field
title: Field
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Field.ts)

# Field

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Field.ts#L10-L14)

```ts
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (x: A, y: A) => A
  readonly mod: (x: A, y: A) => A
}
```

Added in v1.0.0

## fieldNumber

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Field.ts#L19-L28)

```ts
export const fieldNumber: Field<number> = ...
```

Added in v1.0.0

## gcd

The _greatest common divisor_ of two values

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Field.ts#L35-L39)

```ts
export const gcd = <A>(S: Setoid<A>, field: Field<A>): ((x: A, y: A) => A) => { ... }
```

Added in v1.0.0

## lcm

The _least common multiple_ of two values

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Field.ts#L46-L50)

```ts
export const lcm = <A>(S: Setoid<A>, F: Field<A>): ((x: A, y: A) => A) => { ... }
```

Added in v1.0.0
