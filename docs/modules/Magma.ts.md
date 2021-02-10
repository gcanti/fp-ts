---
title: Magma.ts
nav_order: 47
parent: Modules
---

## Magma overview

A `Magma` is a pair `(A, concat)` in which `A` is a non-empty set and `concat` is a binary operation on `A`

See [Semigroup](https://gcanti.github.io/fp-ts/modules/Semigroup.ts.html) for some instances.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Magma (interface)](#magma-interface)

---

# type classes

## Magma (interface)

**Signature**

```ts
export interface Magma<A> {
  readonly concat: (second: A) => (first: A) => A
}
```

Added in v3.0.0
