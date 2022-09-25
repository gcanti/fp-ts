---
title: Comonad.ts
nav_order: 12
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
export interface Comonad<F extends TypeLambda> extends Extendable<F> {
  readonly extract: <S, R, W, E, A>(self: Kind<F, S, R, W, E, A>) => A
}
```

Added in v3.0.0
