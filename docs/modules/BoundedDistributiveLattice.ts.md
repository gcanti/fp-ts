---
title: BoundedDistributiveLattice.ts
nav_order: 9
parent: Modules
---

# Overview

A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive

---

<h2 class="text-delta">Table of contents</h2>

- [BoundedDistributiveLattice (interface)](#boundeddistributivelattice-interface)
- [getMinMaxBoundedDistributiveLattice (function)](#getminmaxboundeddistributivelattice-function)

---

# BoundedDistributiveLattice (interface)

**Signature**

```ts
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}
```

Added in v2.0.0

# getMinMaxBoundedDistributiveLattice (function)

**Signature**

```ts
export function getMinMaxBoundedDistributiveLattice<A>(O: Ord<A>): (min: A, max: A) => BoundedDistributiveLattice<A> { ... }
```

Added in v2.0.0
