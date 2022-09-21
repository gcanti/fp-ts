---
title: MonoidK.ts
nav_order: 63
parent: Modules
---

## MonoidK overview

TODO: description

`MonoidK` instances should satisfy the following laws in addition to the `SemigroupK` laws:

1. Left identity: `zero |> alt(() => fa) <-> fa`
2. Right identity: `fa |> alt(() => zero) <-> fa`
3. Annihilation1: `zero |> map(f) <-> zero`
4. Distributivity: `fab |> alt(() => gab) |> ap(fa) <-> fab |> ap(fa) |> alt(() => gab |> A.ap(fa))`
5. Annihilation2: `zero |> ap(fa) <-> zero`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [guard](#guard)
- [type classes](#type-classes)
  - [MonoidK (interface)](#monoidk-interface)
- [utils](#utils)
  - [altAll](#altall)

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
  readonly zero: <S, R = unknown, W = never, E = never, A = never>() => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0

# utils

## altAll

**Signature**

```ts
export declare const altAll: <F extends HKT>(
  F: MonoidK<F>
) => <S, R, W, E, A>(as: readonly Kind<F, S, R, W, E, A>[]) => Kind<F, S, R, W, E, A>
```

Added in v3.0.0
