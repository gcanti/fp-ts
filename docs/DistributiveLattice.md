---
id: DistributiveLattice
title: DistributiveLattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/DistributiveLattice.ts)

# DistributiveLattice

**Signature** (type class)

```ts
export interface DistributiveLattice<A> extends Lattice<A> {}
```

A `DistributiveLattice` must satisfy the following laws in addition to [Lattice](./Lattice.md) laws:

- Distributivity for meet: `a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)`
- Distributivity for join: `a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)`

Added in v1.4.0

## getMinMaxDistributiveLattice

**Signature** (function)

```ts
export const getMinMaxDistributiveLattice = <A>(O: Ord<A>): DistributiveLattice<A> => { ... }
```

Added in v1.4.0
