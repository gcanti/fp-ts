---
title: Pointed.ts
nav_order: 68
parent: Modules
---

## Pointed overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Pointed (interface)](#pointed-interface)

---

# type classes

## Pointed (interface)

**Signature**

```ts
export interface Pointed<F extends HKT> extends Typeclass<F> {
  readonly of: <A, S, R = unknown, W = never, E = never>(a: A) => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0
