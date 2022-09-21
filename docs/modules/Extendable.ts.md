---
title: Extendable.ts
nav_order: 26
parent: Modules
---

## Extendable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Extendable (interface)](#extendable-interface)

---

# type classes

## Extendable (interface)

**Signature**

```ts
export interface Extendable<F extends HKT> extends Functor<F> {
  readonly extend: <S, R, W, E, A, B>(
    f: (wa: Kind<F, S, R, W, E, A>) => B
  ) => (wa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}
```

Added in v3.0.0
