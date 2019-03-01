---
title: JoinSemilattice.ts
nav_order: 50
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
- [JoinSemilattice](#joinsemilattice)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

A join-semilattice (or upper semilattice) is a semilattice whose operation is called `join`, and which can be thought
of as a least upper bound.

A `JoinSemilattice` must satisfy the following laws:

- Associativity: `a ∨ (b ∨ c) = (a ∨ b) ∨ c`
- Commutativity: `a ∨ b = b ∨ a`
- Idempotency: `a ∨ a = a`

# JoinSemilattice

**Signature** (interface)

```ts
export interface JoinSemilattice<A> {
  readonly join: (x: A, y: A) => A
}
```

Added in v1.4.0
