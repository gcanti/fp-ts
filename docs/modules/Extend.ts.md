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
export interface Extend<W extends HKT> extends Functor<W> {
  readonly extend: <S, R, E, A, B>(
    f: (wa: Kind<W, S, R, E, A>) => B
  ) => (wa: Kind<W, S, R, E, A>) => Kind<W, S, R, E, B>
}
```

Added in v3.0.0
