---
title: Functor.ts
nav_order: 32
parent: Modules
---

## Functor overview

A `Functor` is a type constructor which supports a mapping operation `map`.

`map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
constructor `f` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.map(fa, a => a) <-> fa`
2. Composition: `F.map(fa, a => bc(ab(a))) <-> F.map(F.map(fa, ab), bc)`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Functor (interface)](#functor-interface)
  - [Functor1 (interface)](#functor1-interface)
  - [Functor2 (interface)](#functor2-interface)
  - [Functor2C (interface)](#functor2c-interface)
  - [Functor3 (interface)](#functor3-interface)
  - [Functor3C (interface)](#functor3c-interface)
  - [Functor4 (interface)](#functor4-interface)

---

# type classes

## Functor (interface)

**Signature**

```ts
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}
```

Added in v2.0.0

## Functor1 (interface)

**Signature**

```ts
export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(fa: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
}
```

Added in v2.0.0

## Functor2 (interface)

**Signature**

```ts
export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Functor2C (interface)

**Signature**

```ts
export interface Functor2C<F extends URIS2, E> {
  readonly URI: F
  readonly map: <A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Functor3 (interface)

**Signature**

```ts
export interface Functor3<F extends URIS3> {
  readonly URI: F
  readonly map: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => B) => Kind3<F, R, E, B>
}
```

Added in v2.0.0

## Functor3C (interface)

**Signature**

```ts
export interface Functor3C<F extends URIS3, E> {
  readonly URI: F
  readonly map: <R, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => B) => Kind3<F, R, E, B>
}
```

Added in v2.2.0

## Functor4 (interface)

**Signature**

```ts
export interface Functor4<F extends URIS4> {
  readonly URI: F
  readonly map: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, f: (a: A) => B) => Kind4<F, S, R, E, B>
}
```

Added in v2.0.0
