---
title: BoundedJoinSemilattice.ts
nav_order: 10
parent: Modules
---

# Overview

A `BoundedJoinSemilattice` must satisfy the following laws in addition to `JoinSemilattice` laws:

- `a ∨ 0 == a`

---

<h2 class="text-delta">Table of contents</h2>

- [BoundedJoinSemilattice (interface)](#boundedjoinsemilattice-interface)

---

# BoundedJoinSemilattice (interface)

**Signature**

```ts
export interface BoundedJoinSemilattice<A> extends JoinSemilattice<A> {
  readonly zero: A
}
```

Added in v1.4.0
