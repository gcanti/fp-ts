---
title: MonoidKind.ts
nav_order: 62
parent: Modules
---

## MonoidKind overview

TODO: description

`MonoidK` instances should satisfy the following laws in addition to the `SemigroupKind` laws:

1. Left identity: `emptyKind |> orElse(fa) <-> fa`
2. Right identity: `fa |> orElse(emptyKind) <-> fa`
3. Annihilation1: `emptyKind |> map(f) <-> emptyKind`
4. Distributivity: `fab |> orElse(gab) |> ap(fa) <-> fab |> ap(fa) |> orElse(gab |> A.ap(fa))`
5. Annihilation2: `emptyKind |> ap(fa) <-> emptyKind`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [guard](#guard)
- [model](#model)
  - [MonoidKind (interface)](#monoidkind-interface)
- [utils](#utils)
  - [orElseAll](#orelseall)

---

# constructors

## guard

**Signature**

```ts
export declare const guard: <F extends TypeLambda>(
  F: MonoidKind<F>,
  P: FromIdentity<F>
) => <S>(b: boolean) => Kind<F, S, unknown, never, never, void>
```

Added in v3.0.0

# model

## MonoidKind (interface)

**Signature**

```ts
export interface MonoidKind<F extends TypeLambda> extends SemigroupKind<F> {
  readonly emptyKind: <S>() => Kind<F, S, unknown, never, never, never>
}
```

Added in v3.0.0

# utils

## orElseAll

**Signature**

```ts
export declare const orElseAll: <F extends TypeLambda>(
  F: MonoidKind<F>
) => <S, R, O, E, A>(as: readonly Kind<F, S, R, O, E, A>[]) => Kind<F, S, R, O, E, A>
```

Added in v3.0.0
