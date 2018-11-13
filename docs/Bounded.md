---
id: Bounded
title: Module Bounded
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Bounded.ts)

# Bounded

```ts
interface Bounded<A> extends Ord<A> {
  readonly top: A
  readonly bottom: A
}
```

Added in v1.0.0 (type class)

The `Bounded` type class represents totally ordered types that have an upper and lower boundary.

Instances should satisfy the following law in addition to the [Ord](./Ord.md) laws:

- Bounded: `bottom <= a <= top`

## boundedNumber

```ts
Bounded<number>
```

Added in v1.0.0 (instance)
