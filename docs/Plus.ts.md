---
title: Plus.ts
nav_order: 65
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Plus](#plus)
- [Plus1](#plus1)
- [Plus2](#plus2)
- [Plus2C](#plus2c)
- [Plus3](#plus3)
- [Plus3C](#plus3c)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Plus

The `Plus` type class extends the `alt` type class with a value that should be the left and right identity for `alt`.

It is similar to `Monoid`, except that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than
concrete types like `string` or `number`.

`Plus` instances should satisfy the following laws:

1. Left identity: `A.alt(zero, fa) == fa`
2. Right identity: `A.alt(fa, zero) == fa`
3. Annihilation: `A.map(zero, fa) == zero`

**Signature** (interface)

```ts
export interface Plus<F> extends Alt<F> {
  readonly zero: <A>() => HKT<F, A>
}
```

Added in v1.0.0

# Plus1

**Signature** (interface)

```ts
export interface Plus1<F extends URIS> extends Alt1<F> {
  readonly zero: <A>() => Type<F, A>
}
```

# Plus2

**Signature** (interface)

```ts
export interface Plus2<F extends URIS2> extends Alt2<F> {
  readonly zero: <L, A>() => Type2<F, L, A>
}
```

# Plus2C

**Signature** (interface)

```ts
export interface Plus2C<F extends URIS2, L> extends Alt2C<F, L> {
  readonly zero: <A>() => Type2<F, L, A>
}
```

# Plus3

**Signature** (interface)

```ts
export interface Plus3<F extends URIS3> extends Alt3<F> {
  readonly zero: <U, L, A>() => Type3<F, U, L, A>
}
```

# Plus3C

**Signature** (interface)

```ts
export interface Plus3C<F extends URIS3, U, L> extends Alt3C<F, U, L> {
  readonly zero: <A>() => Type3<F, U, L, A>
}
```
