---
title: Group.ts
nav_order: 39
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Group](#group)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Group

A `Group` is a `Monoid` with inverses. Instances must satisfy the following law in addition to the monoid laws:

- Inverse: `concat(inverse(a), a) = empty = concat(a, inverse(a))`

**Signature** (interface)

```ts
export interface Group<A> extends Monoid<A> {
  readonly inverse: (a: A) => A
}
```

Added in v1.13.0
