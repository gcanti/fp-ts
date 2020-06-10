---
title: BoundedJoinSemilattice.ts
nav_order: 11
parent: Modules
---

## BoundedJoinSemilattice overview

A `BoundedJoinSemilattice` must satisfy the following laws in addition to `JoinSemilattice` laws:

- `a ∨ 0 <-> a`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [BoundedJoinSemilattice (interface)](#boundedjoinsemilattice-interface)

---

# type classes

## BoundedJoinSemilattice (interface)

**Signature**

```ts
export interface BoundedJoinSemilattice<A> extends JoinSemilattice<A> {
  readonly zero: A
}
```

Added in v2.0.0
