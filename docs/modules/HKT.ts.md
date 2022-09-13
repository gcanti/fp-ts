---
title: HKT.ts
nav_order: 46
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
  /** invariant */
  readonly S?: unknown
  /** contravariant */
  readonly R?: unknown
  /** covariant */
  readonly W?: unknown
  /** covariant */
  readonly E?: unknown
  /** covariant */
  readonly A?: unknown
  readonly type?: unknown
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
      readonly S: S
      readonly R: R
      readonly W: W
      readonly E: E
      readonly A: A
    })['type']
  : {
      readonly _F: F
      readonly _S: (_: S) => S
      readonly _R: (_: R) => void
      readonly _W: () => W
      readonly _E: () => E
      readonly _A: () => A
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
