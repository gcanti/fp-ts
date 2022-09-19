---
title: Profunctor.ts
nav_order: 71
parent: Modules
---

## Profunctor overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Profunctor (interface)](#profunctor-interface)

---

# type classes

## Profunctor (interface)

**Signature**

```ts
export interface Profunctor<P extends HKT> extends Functor<P> {
  readonly promap: <Q, R, A, B>(
    f: (q: Q) => R,
    g: (a: A) => B
  ) => <S, W, E>(pea: Kind<P, S, R, W, E, A>) => Kind<P, S, Q, W, E, B>
}
```

Added in v3.0.0
