---
title: BoundedMeetSemilattice.ts
nav_order: 12
parent: Modules
---

# Overview

A `BoundedMeetSemilattice` must satisfy the following laws in addition to `MeetSemilattice` laws:

- `a ∧ 1 = a`

---

<h2 class="text-delta">Table of contents</h2>

- [BoundedMeetSemilattice (interface)](#boundedmeetsemilattice-interface)

---

# BoundedMeetSemilattice (interface)

**Signature**

```ts
export interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  readonly one: A
}
```

Added in v1.4.0
