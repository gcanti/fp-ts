---
title: FromIdentity.ts
nav_order: 36
parent: Modules
---

## FromIdentity overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [FromIdentity (interface)](#fromidentity-interface)
- [utils](#utils)
  - [idKind](#idkind)

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

## idKind

**Signature**

```ts
export declare const idKind: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
```

Added in v3.0.0
