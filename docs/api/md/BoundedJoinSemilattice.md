MODULE [BoundedJoinSemilattice](https://github.com/gcanti/fp-ts/blob/master/src/BoundedJoinSemilattice.ts)

# BoundedJoinSemilattice

_type class_

```ts
interface BoundedJoinSemilattice<A> extends JoinSemilattice<A> {
  zero: A
}
```

A `BoundedJoinSemilattice` must satisfy the following laws in addition to `JoinSemilattice` laws:

* `a ∨ 0 == a`
