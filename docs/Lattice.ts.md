---
title: Lattice.ts
nav_order: 51
---

# Overview

A `Lattice` must satisfy the following in addition to `JoinSemilattice` and `MeetSemilattice` laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) == a`
- Absorbtion law for join: `a ∨ (a ∧ b) == a`

**Table of contents**

- [Lattice (interface)](#lattice-interface)

# Lattice (interface)

**Signature**

```ts
export interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
```

Added in v1.4.0
