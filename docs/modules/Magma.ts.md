---
title: Magma.ts
nav_order: 50
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Magma (interface)](#magma-interface)

---

# Magma (interface)

A `Magma` is a pair `(A, concat)` in which `A` is a non-empty set and `concat` is a binary operation on `A`

**Signature**

```ts
export interface Magma<A> {
  readonly concat: (x: A, y: A) => A
}
```

Added in v2.0.0
