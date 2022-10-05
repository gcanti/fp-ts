---
title: BoundedDistributiveLattice.ts
nav_order: 8
parent: Modules
---

## BoundedDistributiveLattice overview

A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [BoundedDistributiveLattice (interface)](#boundeddistributivelattice-interface)
- [utils](#utils)
  - [getMinMaxBoundedDistributiveLattice](#getminmaxboundeddistributivelattice)

---

# model

## BoundedDistributiveLattice (interface)

**Signature**

```ts
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}
```

Added in v3.0.0

# utils

## getMinMaxBoundedDistributiveLattice

**Signature**

```ts
export declare const getMinMaxBoundedDistributiveLattice: <A>(
  O: Ord<A>
) => (min: A, max: A) => BoundedDistributiveLattice<A>
```

Added in v3.0.0
