---
title: Bounded.ts
nav_order: 8
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
- [Bounded](#bounded)
- [boundedNumber](#boundednumber)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

The `Bounded` type class represents totally ordered types that have an upper and lower boundary.

Instances should satisfy the following law in addition to the `Ord` laws:

- Bounded: `bottom <= a <= top`

# Bounded

**Signature** (interface)

```ts
export interface Bounded<A> extends Ord<A> {
  readonly top: A
  readonly bottom: A
}
```

Added in v1.0.0

# boundedNumber

**Signature** (constant)

```ts
export const boundedNumber: Bounded<number> = ...
```

Added in v1.0.0
