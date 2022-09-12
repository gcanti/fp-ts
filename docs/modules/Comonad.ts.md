---
title: Comonad.ts
nav_order: 17
parent: Modules
---

## Comonad overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Comonad (interface)](#comonad-interface)

---

# type classes

## Comonad (interface)

**Signature**

```ts
export interface Comonad<W extends HKT> extends Extend<W> {
  readonly extract: <S, R, E, A>(wa: Kind<W, S, R, E, A>) => A
}
```

Added in v3.0.0
