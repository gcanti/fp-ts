---
id: Bounded
title: Bounded
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Bounded.ts)

# Bounded

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Bounded.ts#L13-L16)

```ts
export interface Bounded<A> extends Ord<A> {
  readonly top: A
  readonly bottom: A
}
```

The `Bounded` type class represents totally ordered types that have an upper and lower boundary.

Instances should satisfy the following law in addition to the [Ord](./Ord.md) laws:

- Bounded: `bottom <= a <= top`

Added in v1.0.0

## boundedNumber

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Bounded.ts#L21-L25)

```ts
export const boundedNumber: Bounded<number> = ...
```

Added in v1.0.0
