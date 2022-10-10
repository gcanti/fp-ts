---
title: typeclasses/Comonad.ts
nav_order: 48
parent: Modules
---

## Comonad overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Comonad (interface)](#comonad-interface)

---

# model

## Comonad (interface)

**Signature**

```ts
export interface Comonad<F extends TypeLambda> extends Extendable<F> {
  readonly extract: <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => A
}
```

Added in v3.0.0
