---
title: Pointed.ts
nav_order: 68
parent: Modules
---

## Pointed overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Pointed (interface)](#pointed-interface)

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
