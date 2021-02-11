---
title: Alternative.ts
nav_order: 2
parent: Modules
---

## Alternative overview

The `Alternative` type class extends the `Alt` type class with a value that should be the left and right identity for `alt`.

It is similar to `Monoid`, except that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than
concrete types like `string` or `number`.

`Alternative` instances should satisfy the following laws:

1. Left identity: `A.alt(zero, fa) <-> fa`
2. Right identity: `A.alt(fa, zero) <-> fa`
3. Annihilation: `A.map(zero, f) <-> zero`
4. Distributivity: `A.ap(A.alt(fab, gab), fa) <-> A.alt(A.ap(fab, fa), A.ap(gab, fa))`
5. Annihilation: `A.ap(zero, fa) <-> zero`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Alternative (interface)](#alternative-interface)
  - [Alternative1 (interface)](#alternative1-interface)
  - [Alternative2 (interface)](#alternative2-interface)
  - [Alternative2C (interface)](#alternative2c-interface)
  - [Alternative3 (interface)](#alternative3-interface)
  - [Alternative3C (interface)](#alternative3c-interface)
  - [Alternative4 (interface)](#alternative4-interface)

---

# type classes

## Alternative (interface)

**Signature**

```ts
export interface Alternative<F> extends Applicative<F>, Alt<F> {
  readonly zero: <A>() => HKT<F, A>
}
```

Added in v2.0.0

## Alternative1 (interface)

**Signature**

```ts
export interface Alternative1<F extends URIS> extends Applicative1<F>, Alt1<F> {
  readonly zero: <A>() => Kind<F, A>
}
```

Added in v2.0.0

## Alternative2 (interface)

**Signature**

```ts
export interface Alternative2<F extends URIS2> extends Applicative2<F>, Alt2<F> {
  readonly zero: <E, A>() => Kind2<F, E, A>
}
```

Added in v2.0.0

## Alternative2C (interface)

**Signature**

```ts
export interface Alternative2C<F extends URIS2, E> extends Applicative2C<F, E>, Alt2C<F, E> {
  readonly zero: <A>() => Kind2<F, E, A>
}
```

Added in v2.0.0

## Alternative3 (interface)

**Signature**

```ts
export interface Alternative3<F extends URIS3> extends Applicative3<F>, Alt3<F> {
  readonly zero: <R, E, A>() => Kind3<F, R, E, A>
}
```

Added in v2.0.0

## Alternative3C (interface)

**Signature**

```ts
export interface Alternative3C<F extends URIS3, E> extends Applicative3C<F, E>, Alt3C<F, E> {
  readonly zero: <R, A>() => Kind3<F, R, E, A>
}
```

Added in v2.10.0

## Alternative4 (interface)

**Signature**

```ts
export interface Alternative4<F extends URIS4> extends Applicative4<F>, Alt4<F> {
  readonly zero: <S, R, E, A>() => Kind4<F, S, R, E, A>
}
```

Added in v2.10.0
