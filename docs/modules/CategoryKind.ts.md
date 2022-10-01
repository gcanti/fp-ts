---
title: CategoryKind.ts
nav_order: 12
parent: Modules
---

## CategoryKind overview

Kleisli category.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [CategoryKind (interface)](#categorykind-interface)

---

# model

## CategoryKind (interface)

**Signature**

```ts
export interface CategoryKind<F extends TypeLambda> extends ComposableKind<F> {
  readonly idKind: <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0
