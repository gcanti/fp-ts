---
title: BoundedDistributiveLattice.ts
nav_order: 9
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
- [BoundedDistributiveLattice](#boundeddistributivelattice)
- [getMinMaxBoundedDistributiveLattice](#getminmaxboundeddistributivelattice)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive

# BoundedDistributiveLattice

**Signature** (interface)

```ts
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}
```

Added in v1.4.0

# getMinMaxBoundedDistributiveLattice

**Signature** (function)

```ts
export const getMinMaxBoundedDistributiveLattice = <A>(O: Ord<A>) => (
  min: A,
  max: A
): BoundedDistributiveLattice<A> => ...
```

Added in v1.4.0
