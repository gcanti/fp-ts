---
title: Alt.ts
nav_order: 1
parent: Modules
---

## Alt overview

The `Alt` type class identifies an associative operation on a type constructor. It is similar to `Semigroup`, except
that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than concrete types like `string` or
`number`.

`Alt` instances are required to satisfy the following laws:

1. Associativity: `fa1 |> alt(() => fa2) |> alt(() => fa3) <-> fa1 |> alt(() => fa2 |> alt(() => fa3))`
2. Distributivity: `fa1 |> alt(() => fa2) |> map(ab) <-> fa1 |> map(ab) |> alt(() => fa2 |> map(ab))`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Alt (interface)](#alt-interface)
- [utils](#utils)
  - [altAll](#altall)

---

# type classes

## Alt (interface)

**Signature**

```ts
export interface Alt<F extends HKT> extends Functor<F> {
  readonly alt: <S, R, W, E, A>(
    second: Lazy<Kind<F, S, R, W, E, A>>
  ) => (first: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0

# utils

## altAll

**Signature**

```ts
export declare const altAll: <F extends HKT>(
  F: Alt<F>
) => <S, R, W, E, A>(
  startWith: Kind<F, S, R, W, E, A>
) => (as: readonly Kind<F, S, R, W, E, A>[]) => Kind<F, S, R, W, E, A>
```

Added in v3.0.0
