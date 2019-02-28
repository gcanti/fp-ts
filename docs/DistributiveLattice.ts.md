---
title: DistributiveLattice.ts
nav_order: 23
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [DistributiveLattice](#distributivelattice)
- [getMinMaxDistributiveLattice](#getminmaxdistributivelattice)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# DistributiveLattice

A `DistributiveLattice` must satisfy the following laws in addition to `Lattice` laws:

- Distributivity for meet: `a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)`
- Distributivity for join: `a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)`

**Signature** (interface)

```ts
export interface DistributiveLattice<A> extends Lattice<A> {}
```

Added in v1.4.0

# getMinMaxDistributiveLattice

**Signature** (function)

```ts
export const getMinMaxDistributiveLattice = <A>(O: Ord<A>): DistributiveLattice<A> => ...
```

Added in v1.4.0
