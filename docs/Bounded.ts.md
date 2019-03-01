---
title: Bounded.ts
nav_order: 8
---

# Overview

The `Bounded` type class represents totally ordered types that have an upper and lower boundary.

Instances should satisfy the following law in addition to the `Ord` laws:

- Bounded: `bottom <= a <= top`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [Bounded](#bounded)
- [boundedNumber](#boundednumber)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
