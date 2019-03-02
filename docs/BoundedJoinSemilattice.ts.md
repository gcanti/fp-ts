---
title: BoundedJoinSemilattice.ts
nav_order: 10
---

# Overview

A `BoundedJoinSemilattice` must satisfy the following laws in addition to `JoinSemilattice` laws:

- `a ∨ 0 == a`

**Table of contents**

- [BoundedJoinSemilattice (interface)](#boundedjoinsemilattice-interface)# BoundedJoinSemilattice (interface)

**Signature**

```ts
export interface BoundedJoinSemilattice<A> extends JoinSemilattice<A> {
  readonly zero: A
}
```

Added in v1.4.0
