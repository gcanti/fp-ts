---
title: Pointed.ts
nav_order: 69
parent: Modules
---

## Pointed overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Pointed (interface)](#pointed-interface)
- [utils](#utils)
  - [idKind](#idkind)

---

# model

## Pointed (interface)

**Signature**

```ts
export interface Pointed<F extends TypeLambda> extends TypeClass<F> {
  readonly of: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0

# utils

## idKind

**Signature**

```ts
export declare const idKind: <F extends TypeLambda>(
  Pointed: Pointed<F>
) => <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
```

Added in v3.0.0
