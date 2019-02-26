---
id: BoundedLattice
title: BoundedLattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedLattice.ts)

# BoundedLattice

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedLattice.ts#L13-L13)

```ts
export interface BoundedLattice<A> extends BoundedJoinSemilattice<A>, BoundedMeetSemilattice<A> {}
```

A `BoundedLattice` must satisfy the following in addition to [BoundedMeetSemilattice](./BoundedMeetSemilattice.md) and [BoundedJoinSemilattice](./BoundedJoinSemilattice.md) laws:

- Absorbtion law for meet: `a ∧ (a ∨ b) == a`
- Absorbtion law for join: `a ∨ (a ∧ b) == a`

Added in v1.4.0
