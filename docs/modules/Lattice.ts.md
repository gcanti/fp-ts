---
title: Lattice.ts
nav_order: 57
parent: Modules
---

## Lattice overview

A `Lattice` must satisfy the following in addition to `JoinSemilattice` and `MeetSemilattice` laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) <-> a`
- Absorbtion law for join: `a ∨ (a ∧ b) <-> a`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Lattice (interface)](#lattice-interface)

---

# type classes

## Lattice (interface)

**Signature**

```ts
export interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
```

Added in v2.0.0
