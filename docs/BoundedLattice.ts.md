---
title: BoundedLattice.ts
nav_order: 11
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [BoundedLattice](#boundedlattice)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# BoundedLattice

A `BoundedLattice` must satisfy the following in addition to `BoundedMeetSemilattice` and `BoundedJoinSemilattice` laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) == a`
- Absorbtion law for join: `a ∨ (a ∧ b) == a`

**Signature** (interface)

```ts
export interface BoundedLattice<A> extends BoundedJoinSemilattice<A>, BoundedMeetSemilattice<A> {}
```

Added in v1.4.0
