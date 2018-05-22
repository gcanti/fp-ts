---
id: BoundedJoinSemilattice
title: Module BoundedJoinSemilattice
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BoundedJoinSemilattice.ts)

## Type classes

### BoundedJoinSemilattice

_type class_

_Signature_

```ts
interface BoundedJoinSemilattice<A> extends JoinSemilattice<A> {
  zero: A
}
```

_Description_

A `BoundedJoinSemilattice` must satisfy the following laws in addition to `JoinSemilattice` laws:

* `a ∨ 0 == a`
