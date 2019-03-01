---
title: Lattice.ts
nav_order: 51
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
- [Lattice](#lattice)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

A `Lattice` must satisfy the following in addition to `JoinSemilattice` and `MeetSemilattice` laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) == a`
- Absorbtion law for join: `a ∨ (a ∧ b) == a`

# Lattice

**Signature** (interface)

```ts
export interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
```

Added in v1.4.0
