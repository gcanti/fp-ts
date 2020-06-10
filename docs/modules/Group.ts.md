---
title: Group.ts
nav_order: 37
parent: Modules
---

## Group overview

A `Group` is a `Monoid` with inverses. Instances must satisfy the following law in addition to the monoid laws:

- Inverse: `concat(inverse(a), a) <-> empty = concat(a, inverse(a))`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Group (interface)](#group-interface)

---

# type classes

## Group (interface)

**Signature**

```ts
export interface Group<A> extends Monoid<A> {
  readonly inverse: (a: A) => A
}
```

Added in v2.0.0
