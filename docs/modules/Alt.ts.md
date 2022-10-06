---
title: Alt.ts
nav_order: 1
parent: Modules
---

## Alt overview

`Alt` has a very similar structure to `Semigroup`, the difference is that `Alt` operates on type
constructors of one argument. So, for example, whereas you can find a `Semigroup` for types which are fully
specified like `number` or `ReadonlyArray<number>` or `Option<number>`, you will find `Alt` for type constructors like `ReadonlyArray` and `Option`.
These types are type constructors in that you can think of them as "functions" in the type space.
You can think of the `ReadonlyArray` type as a function which takes a concrete type, like `number`, and returns a concrete type: `ReadonlyArray<number>`.
This pattern would also be referred to having `kind: * -> *`, whereas `number` would have kind `*` and `ReadonlyMap` would have `kind *,* -> *`,
and, in fact, the `K` in `Alt` stands for `Kind`.

`Alt` instances are required to satisfy the following laws:

1. Associativity: `fa1 |> orElse(fa2) |> orElse(fa3) <-> fa1 |> orElse(fa2 |> orElse(fa3))`
2. Distributivity: `fa1 |> orElse(fa2) |> map(ab) <-> fa1 |> map(ab) |> orElse(fa2 |> map(ab))`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Alt (interface)](#alt-interface)
- [utils](#utils)
  - [orElseAll](#orelseall)

---

# model

## Alt (interface)

**Signature**

```ts
export interface Alt<F extends TypeLambda> extends TypeClass<F> {
  readonly orElse: <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>
}
```

Added in v3.0.0

# utils

## orElseAll

**Signature**

```ts
export declare const orElseAll: <F extends TypeLambda>(
  F: Alt<F>
) => <S, R, O, E, A>(
  startWith: Kind<F, S, R, O, E, A>
) => (as: readonly Kind<F, S, R, O, E, A>[]) => Kind<F, S, R, O, E, A>
```

Added in v3.0.0
