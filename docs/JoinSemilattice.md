---
id: JoinSemilattice
title: Module JoinSemilattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/JoinSemilattice.ts)

## Type classes

### JoinSemilattice

_type class_

_Signature_

```ts
interface JoinSemilattice<A> {
  readonly join: (x: A, y: A) => A
}
```

_Description_

A join-semilattice (or upper semilattice) is a semilattice whose operation is called "join", and which can be thought
of as a least upper bound.

A `JoinSemilattice` must satisfy the following laws:

- Associativity: `a ∨ (b ∨ c) = (a ∨ b) ∨ c`
- Commutativity: `a ∨ b = b ∨ a`
- Idempotency: `a ∨ a = a`
