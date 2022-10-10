---
title: typeclasses/KleisliCategory.ts
nav_order: 67
parent: Modules
---

## KleisliCategory overview

Kleisli category.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [KleisliCategory (interface)](#kleislicategory-interface)

---

# model

## KleisliCategory (interface)

**Signature**

```ts
export interface KleisliCategory<F extends TypeLambda> extends KleisliComposable<F> {
  readonly idKleisli: <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0
