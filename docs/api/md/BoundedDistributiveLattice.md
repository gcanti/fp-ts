MODULE [BoundedDistributiveLattice](https://github.com/gcanti/fp-ts/blob/master/src/BoundedDistributiveLattice.ts)

# BoundedDistributiveLattice

_type class_

```ts
interface BoundedDistributiveLattice<A> extends BoundedLattice<A>, DistributiveLattice<A> {}
```

A `BoundedDistributiveLattice` is a lattice that is both bounded and distributive

# getMinMaxBoundedDistributiveLattice

_function_

_since 1.4.0_

```ts
<A>(O: Ord<A>) => (
  min: A,
  max: A
): BoundedDistributiveLattice<A>
```
