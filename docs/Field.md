---
id: Field
title: Module Field
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Field.ts)

# Field

```ts
interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (x: A, y: A) => A
  readonly mod: (x: A, y: A) => A
}
```

Added in v1.0.0 (type class)

## fieldNumber

```ts
Field<number>
```

Added in v1.0.0 (instance)

## gcd

```ts
<A>(S: Setoid<A>, field: Field<A>): ((x: A, y: A) => A)
```

Added in v1.0.0 (function)

The _greatest common divisor_ of two values

## lcm

```ts
<A>(S: Setoid<A>, F: Field<A>): ((x: A, y: A) => A)
```

Added in v1.0.0 (function)

The _least common multiple_ of two values
