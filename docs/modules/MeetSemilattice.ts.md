---
title: MeetSemilattice.ts
nav_order: 52
parent: Modules
---

# Overview

A meet-semilattice (or lower semilattice) is a semilattice whose operation is called `meet`, and which can be thought
of as a greatest lower bound.

A `MeetSemilattice` must satisfy the following laws:

- Associativity: `a ∧ (b ∧ c) = (a ∧ b) ∧ c`
- Commutativity: `a ∧ b = b ∧ a`
- Idempotency: `a ∧ a = a`

---

<h2 class="text-delta">Table of contents</h2>

- [MeetSemilattice (interface)](#meetsemilattice-interface)

---

# MeetSemilattice (interface)

**Signature**

```ts
export interface MeetSemilattice<A> {
  readonly meet: (x: A, y: A) => A
}
```

Added in v2.0.0
