---
id: BoundedMeetSemilattice
title: Module BoundedMeetSemilattice
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedMeetSemilattice.ts)

# BoundedMeetSemilattice

```ts
interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  readonly one: A
}
```

Added in v1.4.0 (type class)

A `BoundedMeetSemilattice` must satisfy the following laws in addition to [MeetSemilattice](./MeetSemilattice.md) laws:

- `a ∧ 1 = a`
