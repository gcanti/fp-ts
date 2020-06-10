---
title: BoundedLattice.ts
nav_order: 12
parent: Modules
---

## BoundedLattice overview

A `BoundedLattice` must satisfy the following in addition to `BoundedMeetSemilattice` and `BoundedJoinSemilattice` laws:

- Absorption law for meet: `a ∧ (a ∨ b) <-> a`
- Absorption law for join: `a ∨ (a ∧ b) <-> a`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [BoundedLattice (interface)](#boundedlattice-interface)

---

# type classes

## BoundedLattice (interface)

**Signature**

```ts
export interface BoundedLattice<A> extends BoundedJoinSemilattice<A>, BoundedMeetSemilattice<A> {}
```

Added in v2.0.0
