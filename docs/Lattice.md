---
id: Lattice
title: Module Lattice
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Lattice.ts)

# Lattice

```ts
interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
```

Added in v1.4.0 (type class)

A `Lattice` must satisfy the following in addition to `JoinSemilattice` and `MeetSemilattice` laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) == a`
- Absorbtion law for join: `a ∨ (a ∧ b) == a`
