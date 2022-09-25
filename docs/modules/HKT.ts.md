---
title: HKT.ts
nav_order: 47
parent: Modules
---

## HKT overview

Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [HKT (interface)](#hkt-interface)
  - [Kind (type alias)](#kind-type-alias)
  - [Typeclass (interface)](#typeclass-interface)

---

# utils

## HKT (interface)

**Signature**

```ts
export interface HKT {
  readonly InOut1: unknown
  readonly In1: unknown
  readonly Out3: unknown
  readonly Out2: unknown
  readonly Out1: unknown
  readonly type: unknown
}
```

Added in v3.0.0

## Kind (type alias)

**Signature**

```ts
export type Kind<F extends HKT, InOut1, In1, Out3, Out2, Out1> = F extends {
  readonly type: unknown
}
  ? (F & {
      readonly InOut1: InOut1
      readonly In1: In1
      readonly Out3: Out3
      readonly Out2: Out2
      readonly Out1: Out1
    })['type']
  : {
      readonly F: F
      readonly InOut1: (_: InOut1) => InOut1
      readonly In1: (_: In1) => void
      readonly Out3: () => Out3
      readonly Out2: () => Out2
      readonly Out1: () => Out1
    }
```

Added in v3.0.0

## Typeclass (interface)

**Signature**

```ts
export interface Typeclass<F extends HKT> {
  readonly [URI]?: F
}
```

Added in v3.0.0
