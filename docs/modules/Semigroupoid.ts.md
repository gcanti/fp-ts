---
title: Semigroupoid.ts
nav_order: 87
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
  readonly compose: <S, B, W, E, C>(
    bc: Kind<F, S, B, W, E, C>
  ) => <A>(ab: Kind<F, S, A, W, E, B>) => Kind<F, S, A, W, E, C>
}
```

Added in v3.0.0
