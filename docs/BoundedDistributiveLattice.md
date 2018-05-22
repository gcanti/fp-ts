---
id: BoundedDistributiveLattice
title: Module BoundedDistributiveLattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedDistributiveLattice.ts)

## Type classes

### BoundedDistributiveLattice

_type class_

_Signature_

```ts
interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}
```

_Description_

A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive

## Functions

### getMinMaxBoundedDistributiveLattice

_function_

_since 1.4.0_

_Signature_

```ts
<A>(O: Ord<A>) => (
  min: A,
  max: A
): BoundedDistributiveLattice<A>
```
