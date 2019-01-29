---
id: BoundedMeetSemilattice
title: Module BoundedMeetSemilattice
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedMeetSemilattice.ts)

# BoundedMeetSemilattice

**Signature** (type class)

```ts
export interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  readonly one: A
}
```

A `BoundedMeetSemilattice` must satisfy the following laws in addition to [MeetSemilattice](./MeetSemilattice.md) laws:

- `a ∧ 1 = a`

Added in v1.4.0
