---
title: HKT.ts
nav_order: 9
parent: Modules
---

## HKT overview

Type defunctionalization (as describe in [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf))

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [HKD (type alias)](#hkd-type-alias)
  - [Kind (type alias)](#kind-type-alias)
  - [TypeClass (interface)](#typeclass-interface)
  - [TypeLambda (interface)](#typelambda-interface)

---

# utils

## HKD (type alias)

**Signature**

```ts
export type HKD<F extends TypeLambda, A> = Kind<F, <S>(_: S) => S, unknown, never, never, A>
```

Added in v3.0.0

## Kind (type alias)

**Signature**

```ts
export type Kind<F extends TypeLambda, InOut1, In1, Out3, Out2, Out1> = F extends {
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

## TypeClass (interface)

**Signature**

```ts
export interface TypeClass<F extends TypeLambda> {
  readonly [URI]?: F
}
```

Added in v3.0.0

## TypeLambda (interface)

**Signature**

```ts
export interface TypeLambda {
  readonly InOut1: unknown
  readonly In1: unknown
  readonly Out3: unknown
  readonly Out2: unknown
  readonly Out1: unknown
}
```

Added in v3.0.0
