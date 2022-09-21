---
title: HKT.ts
nav_order: 48
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
  readonly Invariant1: unknown
  readonly Contravariant1: unknown
  readonly Covariant3: unknown
  readonly Covariant2: unknown
  readonly Covariant1: unknown
  readonly type: unknown
}
```

Added in v3.0.0

## Kind (type alias)

**Signature**

```ts
export type Kind<F extends HKT, S, R, W, E, A> = F extends {
  readonly type: unknown
}
  ? (F & {
      readonly Invariant1: S
      readonly Contravariant1: R
      readonly Covariant3: W
      readonly Covariant2: E
      readonly Covariant1: A
    })['type']
  : {
      readonly F: F
      readonly Invariant1: (_: S) => S
      readonly Contravariant1: (_: R) => void
      readonly Covariant3: () => W
      readonly Covariant2: () => E
      readonly Covariant1: () => A
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
