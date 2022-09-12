---
title: Category.ts
nav_order: 13
parent: Modules
---

## Category overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Category (interface)](#category-interface)

---

# type classes

## Category (interface)

**Signature**

```ts
export interface Category<F extends HKT> extends Semigroupoid<F> {
  readonly id: <S, R, E>() => Kind<F, S, R, E, R>
}
```

Added in v3.0.0
