---
title: BoundedMeetSemilattice.ts
nav_order: 12
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
- [BoundedMeetSemilattice](#boundedmeetsemilattice)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

A `BoundedMeetSemilattice` must satisfy the following laws in addition to `MeetSemilattice` laws:

- `a ∧ 1 = a`

# BoundedMeetSemilattice

**Signature** (interface)

```ts
export interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  readonly one: A
}
```

Added in v1.4.0
