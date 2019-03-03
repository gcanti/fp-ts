---
title: BoundedDistributiveLattice.ts
nav_order: 9
---

# Overview

A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive

**Table of contents**

- [BoundedDistributiveLattice (interface)](#boundeddistributivelattice-interface)
- [getMinMaxBoundedDistributiveLattice (function)](#getminmaxboundeddistributivelattice-function)

# BoundedDistributiveLattice (interface)

**Signature**

```ts
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}
```

Added in v1.4.0

# getMinMaxBoundedDistributiveLattice (function)

**Signature**

```ts
export const getMinMaxBoundedDistributiveLattice = <A>(O: Ord<A>) => (
  min: A,
  max: A
): BoundedDistributiveLattice<A> => ...
```

Added in v1.4.0
