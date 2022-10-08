---
title: FromIdentity.ts
nav_order: 37
parent: Modules
---

## FromIdentity overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [FromIdentity (interface)](#fromidentity-interface)
- [utils](#utils)
  - [idKleisli](#idkleisli)

---

# model

## FromIdentity (interface)

**Signature**

```ts
export interface FromIdentity<F extends TypeLambda> extends TypeClass<F> {
  readonly of: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0

# utils

## idKleisli

**Signature**

```ts
export declare const idKleisli: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
```

Added in v3.0.0
