---
title: BoundedMeetSemilattice.ts
nav_order: 13
parent: Modules
---

## BoundedMeetSemilattice overview

A `BoundedMeetSemilattice` must satisfy the following laws in addition to `MeetSemilattice` laws:

- `a ∧ 1 <-> a`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [BoundedMeetSemilattice (interface)](#boundedmeetsemilattice-interface)

---

# model

## BoundedMeetSemilattice (interface)

**Signature**

```ts
export interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  readonly one: A
}
```

Added in v2.0.0
