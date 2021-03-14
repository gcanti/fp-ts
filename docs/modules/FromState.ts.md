---
title: FromState.ts
nav_order: 37
parent: Modules
---

## FromState overview

Lift a computation from the `State` monad.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [FromState (interface)](#fromstate-interface)

---

# type classes

## FromState (interface)

**Signature**

```ts
export interface FromState<F> {
  readonly fromState: <S, A>(fa: State<S, A>) => HKT2<F, S, A>
}
```

Added in v3.0.0
