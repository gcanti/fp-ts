---
id: Lattice
title: Module Lattice
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Lattice.ts)

# Lattice

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Lattice.ts#L13-L13)

```ts
export interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
```

A `Lattice` must satisfy the following in addition to [JoinSemilattice](./JoinSemilattice.md) and [MeetSemilattice](./MeetSemilattice.md) laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) == a`
- Absorbtion law for join: `a ∨ (a ∧ b) == a`

Added in v1.4.0
