---
title: FunctionK.ts
nav_order: 43
parent: Modules
---

## FunctionK overview

A type for natural transformations.

A natural transformation is a mapping between type constructors of kind `* -> *` where the mapping
operation has no ability to manipulate the inner values.

The definition of a natural transformation in category theory states that `F` and `G` should be functors,
but the `Functor` constraint is not enforced here; that the types are of kind `* -> *` is enough for our purposes.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [FunctionK (interface)](#functionk-interface)

---

# utils

## FunctionK (interface)

**Signature**

```ts
export interface FunctionK<F extends HKT, G extends HKT> {
  <S, R, W, E, A>(fa: Kind<F, S, R, W, E, A>): Kind<G, S, R, W, E, A>
}
```

Added in v3.0.0
