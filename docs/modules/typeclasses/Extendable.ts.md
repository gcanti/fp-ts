---
title: typeclasses/Extendable.ts
nav_order: 53
parent: Modules
---

## Extendable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Extendable (interface)](#extendable-interface)

---

# model

## Extendable (interface)

**Signature**

```ts
export interface Extendable<F extends TypeLambda> extends Functor<F> {
  readonly extend: <S, R, O, E, A, B>(
    f: (wa: Kind<F, S, R, O, E, A>) => B
  ) => (wa: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0
