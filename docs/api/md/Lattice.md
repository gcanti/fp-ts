MODULE [Lattice](https://github.com/gcanti/fp-ts/blob/master/src/Lattice.ts)

# Lattice

_type class_

```ts
interface Lattice<A> extends JoinSemilattice<A>, MeetSemilattice<A> {}
```

A `Lattice` must satisfy the following in addition to `JoinSemilattice` and `MeetSemilattice` laws:

* Absorbtion law for meet: `a ∧ (a ∨ b) == a`
* Absorbtion law for join: `a ∨ (a ∧ b) == a`
