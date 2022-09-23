---
title: Unfoldable.ts
nav_order: 107
parent: Modules
---

## Unfoldable overview

This class identifies data structures which can be _unfolded_, generalizing `unfold` on arrays.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Unfoldable (interface)](#unfoldable-interface)

---

# type classes

## Unfoldable (interface)

**Signature**

```ts
export interface Unfoldable<F extends HKT> extends Typeclass<F> {
  readonly unfold: <B, A, S>(b: B, f: (b: B) => Option<readonly [A, B]>) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0
