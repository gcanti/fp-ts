---
id: BoundedDistributiveLattice
title: Module BoundedDistributiveLattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedDistributiveLattice.ts)

# BoundedDistributiveLattice

```ts
interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}
```

Added in v1.4.0 (type class)

A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive

## getMinMaxBoundedDistributiveLattice

```ts
<A>(O: Ord<A>) => (
  min: A,
  max: A
): BoundedDistributiveLattice<A>
```

Added in v1.4.0 (function)
