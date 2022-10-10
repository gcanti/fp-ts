---
title: typeclasses/Category.ts
nav_order: 47
parent: Modules
---

## Category overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Category (interface)](#category-interface)

---

# model

## Category (interface)

**Signature**

```ts
export interface Category<F extends TypeLambda> extends Composable<F> {
  readonly id: <S, R>() => Kind<F, S, R, never, never, R>
}
```

Added in v3.0.0
