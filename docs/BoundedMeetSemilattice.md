---
id: BoundedMeetSemilattice
title: Module BoundedMeetSemilattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedMeetSemilattice.ts)

## Type classes

### BoundedMeetSemilattice

_type class_

_since 1.4.0_

_Signature_

```ts
interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  readonly one: A
}
```

_Description_

A `BoundedMeetSemilattice` must satisfy the following laws in addition to `MeetSemilattice` laws:

- `a ∧ 1 = a`
