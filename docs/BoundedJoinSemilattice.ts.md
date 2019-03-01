---
title: BoundedJoinSemilattice.ts
nav_order: 10
---

# Overview

A `BoundedJoinSemilattice` must satisfy the following laws in addition to `JoinSemilattice` laws:

- `a ∨ 0 == a`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [BoundedJoinSemilattice](#boundedjoinsemilattice)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# BoundedJoinSemilattice

**Signature** (interface)

```ts
export interface BoundedJoinSemilattice<A> extends JoinSemilattice<A> {
  readonly zero: A
}
```

Added in v1.4.0
