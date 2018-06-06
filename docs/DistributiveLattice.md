---
id: DistributiveLattice
title: Module DistributiveLattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/DistributiveLattice.ts)

## Type classes

### DistributiveLattice

_type class_

_Signature_

```ts
interface DistributiveLattice<A> extends Lattice<A> {}
```

_Description_

A `DistributiveLattice` must satisfy the following laws in addition to `Lattice` laws:

- Distributivity for meet: `a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)`
- Distributivity for join: `a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)`

## Functions

### getMinMaxDistributiveLattice

_function_

_since 1.4.0_

_Signature_

```ts
<A>(O: Ord<A>): DistributiveLattice<A>
```
