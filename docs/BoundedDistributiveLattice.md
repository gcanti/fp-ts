---
id: BoundedDistributiveLattice
title: Module BoundedDistributiveLattice
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedDistributiveLattice.ts)

# BoundedDistributiveLattice

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedDistributiveLattice.ts#L11-L11)

```ts
export interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}
```

A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive

Added in v1.4.0

## getMinMaxBoundedDistributiveLattice

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedDistributiveLattice.ts#L16-L25)

```ts
export const getMinMaxBoundedDistributiveLattice = <A>(O: Ord<A>) => (
  min: A,
  max: A
): BoundedDistributiveLattice<A> => { ... }
```

Added in v1.4.0
