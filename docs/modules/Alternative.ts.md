---
title: Alternative.ts
nav_order: 2
parent: Modules
---

## Alternative overview

The `Alternative` type class extends the `Alt` type class with a value that should be the left and right identity for `alt`.

It is similar to `Monoid`, except that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than
concrete types like `string` or `number`.

`Alternative` instances should satisfy the following laws in addition to the `Alt` laws:

1. Left identity: `zero |> alt(() => fa) <-> fa`
2. Right identity: `fa |> alt(() => zero) <-> fa`
3. Annihilation1: `zero |> map(f) <-> zero`
4. Distributivity: `fab |> alt(() => gab) |> ap(fa) <-> fab |> ap(fa) |> alt(() => gab |> A.ap(fa))`
5. Annihilation2: `zero |> ap(fa) <-> zero`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Alternative (interface)](#alternative-interface)
  - [Alternative1 (interface)](#alternative1-interface)
  - [Alternative2 (interface)](#alternative2-interface)
  - [Alternative2C (interface)](#alternative2c-interface)
  - [Alternative3 (interface)](#alternative3-interface)

---

# type classes

## Alternative (interface)

**Signature**

```ts
export interface Alternative<F> extends Alt<F> {
  readonly zero: <A>() => HKT<F, A>
}
```

Added in v3.0.0

## Alternative1 (interface)

**Signature**

```ts
export interface Alternative1<F extends URIS> extends Alt1<F> {
  readonly zero: <A>() => Kind<F, A>
}
```

Added in v3.0.0

## Alternative2 (interface)

**Signature**

```ts
export interface Alternative2<F extends URIS2> extends Alt2<F> {
  readonly zero: <E, A>() => Kind2<F, E, A>
}
```

Added in v3.0.0

## Alternative2C (interface)

**Signature**

```ts
export interface Alternative2C<F extends URIS2, E> extends Alt2C<F, E> {
  readonly zero: <A>() => Kind2<F, E, A>
}
```

Added in v3.0.0

## Alternative3 (interface)

**Signature**

```ts
export interface Alternative3<F extends URIS3> extends Alt3<F> {
  readonly zero: <R, E, A>() => Kind3<F, R, E, A>
}
```

Added in v3.0.0
