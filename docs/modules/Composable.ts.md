---
title: Composable.ts
nav_order: 16
parent: Modules
---

## Composable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Composable (interface)](#composable-interface)

---

# type classes

## Composable (interface)

**Signature**

```ts
export interface Composable<F extends HKT> extends Typeclass<F> {
  readonly compose: <S, B, W2, E2, C>(
    bc: Kind<F, S, B, W2, E2, C>
  ) => <A, W1, E1>(ab: Kind<F, S, A, W1, E1, B>) => Kind<F, S, A, W1 | W2, E1 | E2, C>
}
```

Added in v3.0.0
