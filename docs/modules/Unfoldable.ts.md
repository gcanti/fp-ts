---
title: Unfoldable.ts
nav_order: 108
parent: Modules
---

## Unfoldable overview

This class identifies data structures which can be _unfolded_, generalizing `unfold` on arrays.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Unfoldable (interface)](#unfoldable-interface)

---

# model

## Unfoldable (interface)

**Signature**

```ts
export interface Unfoldable<F extends TypeLambda> extends TypeClass<F> {
  readonly unfold: <B, A, S>(b: B, f: (b: B) => Option<readonly [A, B]>) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0
