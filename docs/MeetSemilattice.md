---
id: MeetSemilattice
title: Module MeetSemilattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/MeetSemilattice.ts)

# MeetSemilattice

```ts
interface MeetSemilattice<A> {
  readonly meet: (x: A, y: A) => A
}
```

Added in v1.4.0 (type class)

A meet-semilattice (or lower semilattice) is a semilattice whose operation is called "meet", and which can be thought
of as a greatest lower bound.

A `MeetSemilattice` must satisfy the following laws:

- Associativity: `a ∧ (b ∧ c) = (a ∧ b) ∧ c`
- Commutativity: `a ∧ b = b ∧ a`
- Idempotency: `a ∧ a = a`
