---
title: Lattice.ts
nav_order: 50
parent: Modules
---

# Overview

A `Lattice` must satisfy the following in addition to `JoinSemilattice` and `MeetSemilattice` laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) == a`
- Absorbtion law for join: `a ∨ (a ∧ b) == a`

---

<h2 class="text-delta">Table of contents</h2>

- [Lattice (interface)](#lattice-interface)

---

# Lattice (interface)

**Signature**

```ts
export interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
```

Added in v1.4.0
