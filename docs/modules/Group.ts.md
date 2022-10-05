---
title: Group.ts
nav_order: 48
parent: Modules
---

## Group overview

A `Group` is a `Monoid` with inverses. Instances must satisfy the following law in addition to the monoid laws:

- Inverse: `combine(inverse(a), a) <-> empty = combine(a, inverse(a))`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Group (interface)](#group-interface)

---

# model

## Group (interface)

**Signature**

```ts
export interface Group<A> extends Monoid<A> {
  readonly inverse: Endomorphism<A>
}
```

Added in v3.0.0
