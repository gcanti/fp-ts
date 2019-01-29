---
id: Group
title: Module Group
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Group.ts)

# Group

**Signature** (type class)

```ts
export interface Group<A> extends Monoid<A> {
  readonly inverse: (a: A) => A
}
```

A `Group` is a `Monoid` with inverses. Instances must satisfy the following law in addition to the monoid laws:

- Inverse: `concat(inverse(a), a) = empty = concat(a, inverse(a))`

Added in v1.13.0
