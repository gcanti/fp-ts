---
title: MonoidK.ts
nav_order: 62
parent: Modules
---

## MonoidK overview

TODO: description

`MonoidK` instances should satisfy the following laws in addition to the `SemigroupK` laws:

1. Left identity: `emptyK |> combineK(() => fa) <-> fa`
2. Right identity: `fa |> combineK(() => emptyK) <-> fa`
3. Annihilation1: `emptyK |> map(f) <-> emptyK`
4. Distributivity: `fab |> combineK(() => gab) |> ap(fa) <-> fab |> ap(fa) |> combineK(() => gab |> A.ap(fa))`
5. Annihilation2: `emptyK |> ap(fa) <-> emptyK`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [guard](#guard)
- [type classes](#type-classes)
  - [MonoidK (interface)](#monoidk-interface)
- [utils](#utils)
  - [combineKAll](#combinekall)

---

# constructors

## guard

**Signature**

```ts
export declare const guard: <F extends HKT>(
  F: MonoidK<F>,
  P: Pointed<F>
) => <S, R = unknown, W = never, E = never>(b: boolean) => Kind<F, S, R, W, E, void>
```

Added in v3.0.0

# type classes

## MonoidK (interface)

**Signature**

```ts
export interface MonoidK<F extends HKT> extends SemigroupK<F> {
  readonly emptyK: <S, R = unknown, W = never, E = never, A = never>() => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0

# utils

## combineKAll

**Signature**

```ts
export declare const combineKAll: <F extends HKT>(
  F: MonoidK<F>
) => <S, R, W, E, A>(as: readonly Kind<F, S, R, W, E, A>[]) => Kind<F, S, R, W, E, A>
```

Added in v3.0.0
