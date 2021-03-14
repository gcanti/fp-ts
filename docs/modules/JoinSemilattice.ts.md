---
title: JoinSemilattice.ts
nav_order: 52
parent: Modules
---

## JoinSemilattice overview

A join-semilattice (or upper semilattice) is a semilattice whose operation is called `join`, and which can be thought
of as a least upper bound.

A `JoinSemilattice` must satisfy the following laws:

- Associativity: `a ∨ (b ∨ c) <-> (a ∨ b) ∨ c`
- Commutativity: `a ∨ b <-> b ∨ a`
- Idempotency: `a ∨ a <-> a`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [JoinSemilattice (interface)](#joinsemilattice-interface)

---

# type classes

## JoinSemilattice (interface)

**Signature**

```ts
export interface JoinSemilattice<A> {
  readonly join: (second: A) => (first: A) => A
}
```

Added in v3.0.0
