---
title: BoundedDistributiveLattice.ts
nav_order: 10
parent: Modules
---

# BoundedDistributiveLattice overview

A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [BoundedDistributiveLattice (interface)](#boundeddistributivelattice-interface)
- [getMinMaxBoundedDistributiveLattice](#getminmaxboundeddistributivelattice)

---

# BoundedDistributiveLattice (interface)

**Signature**

```ts
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}
```

Added in v2.0.0

# getMinMaxBoundedDistributiveLattice

**Signature**

```ts
export declare function getMinMaxBoundedDistributiveLattice<A>(
  O: Ord<A>
): (min: A, max: A) => BoundedDistributiveLattice<A>
```

Added in v2.0.0
