---
title: Profunctor.ts
nav_order: 70
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
  ) => <S, E>(pea: Kind<P, S, R, E, A>) => Kind<P, S, Q, E, B>
}
```

Added in v3.0.0
