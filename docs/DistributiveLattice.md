---
id: DistributiveLattice
title: Module DistributiveLattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/DistributiveLattice.ts)

# DistributiveLattice

```ts
interface DistributiveLattice<A> extends Lattice<A> {}
```

Added in v1.4.0 (type class)

A `DistributiveLattice` must satisfy the following laws in addition to `Lattice` laws:

- Distributivity for meet: `a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)`
- Distributivity for join: `a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)`

## getMinMaxDistributiveLattice

```ts
<A>(O: Ord<A>): DistributiveLattice<A>
```

Added in v1.4.0 (function)
