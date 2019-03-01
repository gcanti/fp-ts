---
title: MeetSemilattice.ts
nav_order: 53
---

# Overview

A meet-semilattice (or lower semilattice) is a semilattice whose operation is called `meet`, and which can be thought
of as a greatest lower bound.

A `MeetSemilattice` must satisfy the following laws:

- Associativity: `a ∧ (b ∧ c) = (a ∧ b) ∧ c`
- Commutativity: `a ∧ b = b ∧ a`
- Idempotency: `a ∧ a = a`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [MeetSemilattice](#meetsemilattice)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# MeetSemilattice

**Signature** (interface)

```ts
export interface MeetSemilattice<A> {
  readonly meet: (x: A, y: A) => A
}
```

Added in v1.4.0
