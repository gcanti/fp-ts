---
title: SemigroupK.ts
nav_order: 87
parent: Modules
---

## SemigroupK overview

`SemigroupK` has a very similar structure to `Semigroup`, the difference is that `SemigroupK` operates on type
constructors of one argument. So, for example, whereas you can find a `Semigroup` for types which are fully
specified like `number` or `ReadonlyArray<number>` or `Option<number>`, you will find `SemigroupK` for type constructors like `ReadonlyArray` and `Option`.
These types are type constructors in that you can think of them as "functions" in the type space.
You can think of the `ReadonlyArray` type as a function which takes a concrete type, like `number`, and returns a concrete type: `ReadonlyArray<number>`.
This pattern would also be referred to having `kind: * -> *`, whereas `number` would have kind `*` and `ReadonlyMap` would have `kind *,* -> *`,
and, in fact, the `K` in `SemigroupK` stands for `Kind`.

`SemigroupK` instances are required to satisfy the following laws:

1. Associativity: `fa1 |> combineK(() => fa2) |> combineK(() => fa3) <-> fa1 |> combineK(() => fa2 |> combineK(() => fa3))`
2. Distributivity: `fa1 |> combineK(() => fa2) |> map(ab) <-> fa1 |> map(ab) |> combineK(() => fa2 |> map(ab))`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [SemigroupK (interface)](#semigroupk-interface)
- [utils](#utils)
  - [combineKAll](#combinekall)

---

# type classes

## SemigroupK (interface)

**Signature**

```ts
export interface SemigroupK<F extends HKT> extends Typeclass<F> {
  readonly combineK: <S, R2, W2, E2, B>(
    second: Lazy<Kind<F, S, R2, W2, E2, B>>
  ) => <R1, W1, E1, A>(self: Kind<F, S, R1, W1, E1, A>) => Kind<F, S, R1 & R2, W1 | W2, E1 | E2, A | B>
}
```

Added in v3.0.0

# utils

## combineKAll

**Signature**

```ts
export declare const combineKAll: <F extends HKT>(
  F: SemigroupK<F>
) => <S, R, W, E, A>(
  startWith: Kind<F, S, R, W, E, A>
) => (as: readonly Kind<F, S, R, W, E, A>[]) => Kind<F, S, R, W, E, A>
```

Added in v3.0.0
