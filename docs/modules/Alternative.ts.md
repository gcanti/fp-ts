---
title: Alternative.ts
nav_order: 1
parent: Modules
---

## Alternative overview

The `Alternative` type class extends the `SemigroupK` type class with a value that should be the left and right identity for `alt`.

It is similar to `Monoid`, except that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than
concrete types like `string` or `number`.

`Alternative` instances should satisfy the following laws in addition to the `SemigroupK` laws:

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
  - [Alternative (interface)](#alternative-interface)
- [utils](#utils)
  - [altAll](#altall)

---

# constructors

## guard

**Signature**

```ts
export declare const guard: <F extends HKT>(
  F: Alternative<F>,
  P: Pointed<F>
) => <S, R = unknown, W = never, E = never>(b: boolean) => Kind<F, S, R, W, E, void>
```

Added in v3.0.0

# type classes

## Alternative (interface)

**Signature**

```ts
export interface Alternative<F extends HKT> extends SemigroupK<F> {
  readonly zero: <S, R = unknown, W = never, E = never, A = never>() => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0

# utils

## altAll

**Signature**

```ts
export declare const altAll: <F extends HKT>(
  F: Alternative<F>
) => <S, R, W, E, A>(as: readonly Kind<F, S, R, W, E, A>[]) => Kind<F, S, R, W, E, A>
```

Added in v3.0.0
