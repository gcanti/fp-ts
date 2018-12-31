---
id: Group
title: Module Group
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Group.ts)

# Group

```ts
interface Group<A> extends Monoid<A> {
  readonly inverse: (a: A) => A
}
```

Added in v1.13.0 (type class)

A `Group` is a `Monoid` with inverses. Instances must satisfy the following law in addition to the monoid laws:

- Inverse: `concat(inverse(a), a) = empty = concat(a, inverse(a))`
