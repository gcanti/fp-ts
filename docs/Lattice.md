---
id: Lattice
title: Lattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Lattice.ts)

# Lattice

**Signature** (type class)

```ts
export interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
```

A `Lattice` must satisfy the following in addition to `JoinSemilattice` and `MeetSemilattice` laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) == a`
- Absorbtion law for join: `a ∨ (a ∧ b) == a`

Added in v1.4.0
