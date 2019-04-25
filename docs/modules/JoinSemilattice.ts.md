---
title: JoinSemilattice.ts
nav_order: 47
parent: Modules
---

# Overview

A join-semilattice (or upper semilattice) is a semilattice whose operation is called `join`, and which can be thought
of as a least upper bound.

A `JoinSemilattice` must satisfy the following laws:

- Associativity: `a ∨ (b ∨ c) = (a ∨ b) ∨ c`
- Commutativity: `a ∨ b = b ∨ a`
- Idempotency: `a ∨ a = a`

---

<h2 class="text-delta">Table of contents</h2>

- [JoinSemilattice (interface)](#joinsemilattice-interface)

---

# JoinSemilattice (interface)

**Signature**

```ts
export interface JoinSemilattice<A> {
  readonly join: (x: A, y: A) => A
}
```

Added in v2.0.0
