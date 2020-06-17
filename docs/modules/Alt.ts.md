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

1. Associativity: `A.alt(A.alt(fa, ga), ha) <-> A.alt(fa, A.alt(ga, ha))`
2. Distributivity: `A.map(A.alt(fa, ga), ab) <-> A.alt(A.map(fa, ab), A.map(ga, ab))`

Added in v2.0.0

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

---

# type classes

## Alt (interface)

**Signature**

```ts
export interface Alt<F> extends Functor<F> {
  readonly alt: <A>(fa: HKT<F, A>, that: Lazy<HKT<F, A>>) => HKT<F, A>
}
```

Added in v2.0.0

## Alt1 (interface)

**Signature**

```ts
export interface Alt1<F extends URIS> extends Functor1<F> {
  readonly alt: <A>(fa: Kind<F, A>, that: Lazy<Kind<F, A>>) => Kind<F, A>
}
```

Added in v2.0.0

## Alt2 (interface)

**Signature**

```ts
export interface Alt2<F extends URIS2> extends Functor2<F> {
  readonly alt: <E, A>(fa: Kind2<F, E, A>, that: Lazy<Kind2<F, E, A>>) => Kind2<F, E, A>
}
```

Added in v2.0.0

## Alt2C (interface)

**Signature**

```ts
export interface Alt2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly alt: <A>(fa: Kind2<F, E, A>, that: Lazy<Kind2<F, E, A>>) => Kind2<F, E, A>
}
```

Added in v2.0.0

## Alt3 (interface)

**Signature**

```ts
export interface Alt3<F extends URIS3> extends Functor3<F> {
  readonly alt: <R, E, A>(fa: Kind3<F, R, E, A>, that: Lazy<Kind3<F, R, E, A>>) => Kind3<F, R, E, A>
}
```

Added in v2.0.0

## Alt3C (interface)

**Signature**

```ts
export interface Alt3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly alt: <R, A>(fa: Kind3<F, R, E, A>, that: Lazy<Kind3<F, R, E, A>>) => Kind3<F, R, E, A>
}
```

Added in v2.2.0

## Alt4 (interface)

**Signature**

```ts
export interface Alt4<F extends URIS4> extends Functor4<F> {
  readonly alt: <S, R, E, A>(fa: Kind4<F, S, R, E, A>, that: Lazy<Kind4<F, S, R, E, A>>) => Kind4<F, S, R, E, A>
}
```

Added in v2.0.0
