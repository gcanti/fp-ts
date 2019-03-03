---
title: BoundedLattice.ts
nav_order: 11
---

# Overview

A `BoundedLattice` must satisfy the following in addition to `BoundedMeetSemilattice` and `BoundedJoinSemilattice` laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) == a`
- Absorbtion law for join: `a ∨ (a ∧ b) == a`

**Table of contents**

- [BoundedLattice (interface)](#boundedlattice-interface)

# BoundedLattice (interface)

**Signature**

```ts
export interface BoundedLattice<A> extends BoundedJoinSemilattice<A>, BoundedMeetSemilattice<A> {}
```

Added in v1.4.0
