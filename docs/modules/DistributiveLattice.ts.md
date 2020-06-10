---
title: DistributiveLattice.ts
nav_order: 24
parent: Modules
---

## DistributiveLattice overview

A `DistributiveLattice` must satisfy the following laws in addition to `Lattice` laws:

- Distributivity for meet: `a ∨ (b ∧ c) <-> (a ∨ b) ∧ (a ∨ c)`
- Distributivity for join: `a ∧ (b ∨ c) <-> (a ∧ b) ∨ (a ∧ c)`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [getMinMaxDistributiveLattice](#getminmaxdistributivelattice)
- [type classes](#type-classes)
  - [DistributiveLattice (interface)](#distributivelattice-interface)

---

# instances

## getMinMaxDistributiveLattice

**Signature**

```ts
export declare function getMinMaxDistributiveLattice<A>(O: Ord<A>): DistributiveLattice<A>
```

Added in v2.0.0

# type classes

## DistributiveLattice (interface)

**Signature**

```ts
export interface DistributiveLattice<A> extends Lattice<A> {}
```

Added in v2.0.0
