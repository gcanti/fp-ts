MODULE [BoundedMeetSemilattice](https://github.com/gcanti/fp-ts/blob/master/src/BoundedMeetSemilattice.ts)

# BoundedMeetSemilattice

_type class_

```ts
interface BoundedMeetSemilattice<A> extends MeetSemilattice<A> {
  one: A
}
```

A `BoundedMeetSemilattice` must satisfy the following laws in addition to `MeetSemilattice` laws:

* `a ∧ 1 = a`
