---
title: Plus.ts
nav_order: 65
parent: Modules
---

# Overview

The `Plus` type class extends the `alt` type class with a value that should be the left and right identity for `alt`.

It is similar to `Monoid`, except that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than
concrete types like `string` or `number`.

`Plus` instances should satisfy the following laws:

1. Left identity: `A.alt(zero, fa) == fa`
2. Right identity: `A.alt(fa, zero) == fa`
3. Annihilation: `A.map(zero, fa) == zero`

---

<h2 class="text-delta">Table of contents</h2>

- [Plus (interface)](#plus-interface)
- [Plus1 (interface)](#plus1-interface)
- [Plus2 (interface)](#plus2-interface)
- [Plus2C (interface)](#plus2c-interface)
- [Plus3 (interface)](#plus3-interface)
- [Plus3C (interface)](#plus3c-interface)

---

# Plus (interface)

**Signature**

```ts
export interface Plus<F> extends Alt<F> {
  readonly zero: <A>() => HKT<F, A>
}
```

Added in v2.0.0

# Plus1 (interface)

**Signature**

```ts
export interface Plus1<F extends URIS> extends Alt1<F> {
  readonly zero: <A>() => Type<F, A>
}
```

# Plus2 (interface)

**Signature**

```ts
export interface Plus2<F extends URIS2> extends Alt2<F> {
  readonly zero: <L, A>() => Type2<F, L, A>
}
```

# Plus2C (interface)

**Signature**

```ts
export interface Plus2C<F extends URIS2, L> extends Alt2C<F, L> {
  readonly zero: <A>() => Type2<F, L, A>
}
```

# Plus3 (interface)

**Signature**

```ts
export interface Plus3<F extends URIS3> extends Alt3<F> {
  readonly zero: <U, L, A>() => Type3<F, U, L, A>
}
```

# Plus3C (interface)

**Signature**

```ts
export interface Plus3C<F extends URIS3, U, L> extends Alt3C<F, U, L> {
  readonly zero: <A>() => Type3<F, U, L, A>
}
```
