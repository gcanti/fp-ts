---
id: BoundedDistributiveLattice
title: BoundedDistributiveLattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedDistributiveLattice.ts)

# BoundedDistributiveLattice

**Signature** (type class)

```ts
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}
```

A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive

Added in v1.4.0

## getMinMaxBoundedDistributiveLattice

**Signature** (function)

```ts
export const getMinMaxBoundedDistributiveLattice = <A>(O: Ord<A>) => (
  min: A,
  max: A
): BoundedDistributiveLattice<A> => { ... }
```

Added in v1.4.0
