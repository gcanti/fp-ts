---
id: BoundedJoinSemilattice
title: Module BoundedJoinSemilattice
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedJoinSemilattice.ts)

# BoundedJoinSemilattice

```ts
interface BoundedJoinSemilattice<A> extends JoinSemilattice<A> {
  readonly zero: A
}
```

Added in v1.4.0 (type class)

A `BoundedJoinSemilattice` must satisfy the following laws in addition to [JoinSemilattice](./JoinSemilattice.md) laws:

- `a ∨ 0 == a`
