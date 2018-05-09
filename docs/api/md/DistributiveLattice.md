MODULE [DistributiveLattice](https://github.com/gcanti/fp-ts/blob/master/src/DistributiveLattice.ts)

# DistributiveLattice

_type class_

```ts
interface DistributiveLattice<A> extends Lattice<A> {}
```

A `DistributiveLattice` must satisfy the following laws in addition to `Lattice` laws:

* Distributivity for meet: `a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)`
* Distributivity for join: `a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)`

# getMinMaxDistributiveLattice

_function_

_since 1.4.0_

```ts
<A>(O: Ord<A>): DistributiveLattice<A>
```
