---
id: Lattice
title: Module Lattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Lattice.ts)

## Type classes

### Lattice

_type class_

_since 1.4.0_

_Signature_

```ts
interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
```

_Description_

A `Lattice` must satisfy the following in addition to `JoinSemilattice` and `MeetSemilattice` laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) == a`
- Absorbtion law for join: `a ∨ (a ∧ b) == a`
