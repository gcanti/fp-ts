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
  - [Alt1 (interface)](#alt1-interface)
  - [Alt2 (interface)](#alt2-interface)
  - [Alt2C (interface)](#alt2c-interface)
  - [Alt3 (interface)](#alt3-interface)
  - [Alt3C (interface)](#alt3c-interface)
  - [Alt4 (interface)](#alt4-interface)
- [utils](#utils)
  - [altAll](#altall)

---

# type classes

## Alt (interface)

**Signature**

```ts
export interface Alt<F> extends Functor<F> {
  readonly alt: <A>(second: Lazy<HKT<F, A>>) => (first: HKT<F, A>) => HKT<F, A>
}
```

Added in v3.0.0

## Alt1 (interface)

**Signature**

```ts
export interface Alt1<F extends URIS> extends Functor1<F> {
  readonly alt: <A>(second: Lazy<Kind<F, A>>) => (first: Kind<F, A>) => Kind<F, A>
}
```

Added in v3.0.0

## Alt2 (interface)

**Signature**

```ts
export interface Alt2<F extends URIS2> extends Functor2<F> {
  readonly alt: <E, A>(second: Lazy<Kind2<F, E, A>>) => (first: Kind2<F, E, A>) => Kind2<F, E, A>
}
```

Added in v3.0.0

## Alt2C (interface)

**Signature**

```ts
export interface Alt2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly alt: <A>(second: Lazy<Kind2<F, E, A>>) => (first: Kind2<F, E, A>) => Kind2<F, E, A>
}
```

Added in v3.0.0

## Alt3 (interface)

**Signature**

```ts
export interface Alt3<F extends URIS3> extends Functor3<F> {
  readonly alt: <R, E, A>(second: Lazy<Kind3<F, R, E, A>>) => (first: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}
```

Added in v3.0.0

## Alt3C (interface)

**Signature**

```ts
export interface Alt3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly alt: <R, A>(second: Lazy<Kind3<F, R, E, A>>) => (first: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}
```

Added in v3.0.0

## Alt4 (interface)

**Signature**

```ts
export interface Alt4<F extends URIS4> extends Functor4<F> {
  readonly alt: <S, R, E, A>(
    second: Lazy<Kind4<F, S, R, E, A>>
  ) => (first: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
}
```

Added in v3.0.0

# utils

## altAll

**Signature**

```ts
export declare function altAll<F extends URIS4>(
  F: Alt4<F>
): <S, R, E, A>(startWith: Kind4<F, S, R, E, A>) => (as: ReadonlyArray<Kind4<F, S, R, E, A>>) => Kind4<F, S, R, E, A>
export declare function altAll<F extends URIS3>(
  F: Alt3<F>
): <R, E, A>(startWith: Kind3<F, R, E, A>) => (as: ReadonlyArray<Kind3<F, R, E, A>>) => Kind3<F, R, E, A>
export declare function altAll<F extends URIS3, E>(
  F: Alt3C<F, E>
): <R, A>(startWith: Kind3<F, R, E, A>) => (as: ReadonlyArray<Kind3<F, R, E, A>>) => Kind3<F, R, E, A>
export declare function altAll<F extends URIS2>(
  F: Alt2<F>
): <E, A>(startWith: Kind2<F, E, A>) => (as: ReadonlyArray<Kind2<F, E, A>>) => Kind2<F, E, A>
export declare function altAll<F extends URIS2, E>(
  F: Alt2C<F, E>
): <A>(startWith: Kind2<F, E, A>) => (as: ReadonlyArray<Kind2<F, E, A>>) => Kind2<F, E, A>
export declare function altAll<F extends URIS>(
  F: Alt1<F>
): <A>(startWith: Kind<F, A>) => (as: ReadonlyArray<Kind<F, A>>) => Kind<F, A>
export declare function altAll<F>(F: Alt<F>): <A>(startWith: HKT<F, A>) => (as: ReadonlyArray<HKT<F, A>>) => HKT<F, A>
```

Added in v3.0.0
