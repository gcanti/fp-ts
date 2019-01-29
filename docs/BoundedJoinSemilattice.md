---
id: BoundedJoinSemilattice
title: Module BoundedJoinSemilattice
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedJoinSemilattice.ts)

# BoundedJoinSemilattice

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedJoinSemilattice.ts#L11-L13)

```ts
export interface BoundedJoinSemilattice<A> extends JoinSemilattice<A> {
  readonly zero: A
}
```

A `BoundedJoinSemilattice` must satisfy the following laws in addition to [JoinSemilattice](./JoinSemilattice.md) laws:

- `a ∨ 0 == a`

Added in v1.4.0
