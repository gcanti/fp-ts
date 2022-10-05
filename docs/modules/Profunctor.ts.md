---
title: Profunctor.ts
nav_order: 70
parent: Modules
---

## Profunctor overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Profunctor (interface)](#profunctor-interface)

---

# model

## Profunctor (interface)

**Signature**

```ts
export interface Profunctor<P extends TypeLambda> extends Functor<P> {
  readonly promap: <Q, R, A, B>(
    f: (q: Q) => R,
    g: (a: A) => B
  ) => <S, O, E>(pea: Kind<P, S, R, O, E, A>) => Kind<P, S, Q, O, E, B>
}
```

Added in v3.0.0
