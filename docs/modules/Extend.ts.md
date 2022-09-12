---
title: Extend.ts
nav_order: 28
parent: Modules
---

## Extend overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Extend (interface)](#extend-interface)

---

# type classes

## Extend (interface)

**Signature**

```ts
export interface Extend<F extends HKT> extends Functor<F> {
  readonly extend: <S, R, W, E, A, B>(
    f: (wa: Kind<F, S, R, W, E, A>) => B
  ) => (wa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}
```

Added in v3.0.0
