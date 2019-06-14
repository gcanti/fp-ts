---
title: Alt.ts
nav_order: 1
parent: Modules
---

# Overview

The `Alt` type class identifies an associative operation on a type constructor. It is similar to `Semigroup`, except
that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than concrete types like `string` or
`number`.

`Alt` instances are required to satisfy the following laws:

1. Associativity: `A.alt(A.alt(fa, ga), ha) = A.alt(fa, A.alt(ga, ha))`
2. Distributivity: `A.map(A.alt(fa, ga), ab) = A.alt(A.map(fa, ab), A.map(ga, ab))`

---

<h2 class="text-delta">Table of contents</h2>

- [Alt (interface)](#alt-interface)
- [Alt1 (interface)](#alt1-interface)
- [Alt2 (interface)](#alt2-interface)
- [Alt2C (interface)](#alt2c-interface)
- [Alt3 (interface)](#alt3-interface)
- [Alt3C (interface)](#alt3c-interface)
- [Alt4 (interface)](#alt4-interface)

---

# Alt (interface)

**Signature**

```ts
export interface Alt<F> extends Functor<F> {
  readonly alt: <A>(fx: HKT<F, A>, fy: HKT<F, A>) => HKT<F, A>
}
```

Added in v1.0.0

# Alt1 (interface)

**Signature**

```ts
export interface Alt1<F extends URIS> extends Functor1<F> {
  readonly alt: <A>(fx: Kind<F, A>, fy: Kind<F, A>) => Kind<F, A>
}
```

# Alt2 (interface)

**Signature**

```ts
export interface Alt2<F extends URIS2> extends Functor2<F> {
  readonly alt: <L, A>(fx: Kind2<F, L, A>, fy: Kind2<F, L, A>) => Kind2<F, L, A>
}
```

# Alt2C (interface)

**Signature**

```ts
export interface Alt2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly alt: <A>(fx: Kind2<F, L, A>, fy: Kind2<F, L, A>) => Kind2<F, L, A>
}
```

# Alt3 (interface)

**Signature**

```ts
export interface Alt3<F extends URIS3> extends Functor3<F> {
  readonly alt: <U, L, A>(fx: Kind3<F, U, L, A>, fy: Kind3<F, U, L, A>) => Kind3<F, U, L, A>
}
```

# Alt3C (interface)

**Signature**

```ts
export interface Alt3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  readonly alt: <A>(fx: Kind3<F, U, L, A>, fy: Kind3<F, U, L, A>) => Kind3<F, U, L, A>
}
```

# Alt4 (interface)

**Signature**

```ts
export interface Alt4<F extends URIS4> extends Functor4<F> {
  readonly alt: <X, U, L, A>(fx: Kind4<F, X, U, L, A>, fy: () => Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, A>
}
```
