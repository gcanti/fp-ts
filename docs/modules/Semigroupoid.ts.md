---
title: Semigroupoid.ts
nav_order: 88
parent: Modules
---

## Semigroupoid overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Semigroupoid (interface)](#semigroupoid-interface)

---

# type classes

## Semigroupoid (interface)

**Signature**

```ts
export interface Semigroupoid<F extends HKT> extends Typeclass<F> {
  readonly compose: <S, B, W2, E2, C>(
    bc: Kind<F, S, B, W2, E2, C>
  ) => <A, W1, E1>(ab: Kind<F, S, A, W1, E1, B>) => Kind<F, S, A, W1 | W2, E1 | E2, C>
}
```

Added in v3.0.0
