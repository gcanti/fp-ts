---
title: Group.ts
nav_order: 39
parent: Modules
---

# Overview

A `Group` is a `Monoid` with inverses. Instances must satisfy the following law in addition to the monoid laws:

- Inverse: `concat(inverse(a), a) = empty = concat(a, inverse(a))`

---

<h2 class="text-delta">Table of contents</h2>

- [Group (interface)](#group-interface)

---

# Group (interface)

**Signature**

```ts
export interface Group<A> extends Monoid<A> {
  readonly inverse: (a: A) => A
}
```

Added in v2.0.0
