---
title: Functor.ts
nav_order: 31
parent: Modules
---

## Functor overview

A `Functor` is a type constructor which supports a mapping operation `map`.

`map` can be used to turn functions `A -> B` into functions `F<A> -> F<B>` whose argument and return types use the type
constructor `F` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.map(identity) <-> identity`
2. Composition: `F.map(flow(ab, bc)) <-> flow(F.map(ab), F.map(bc))`

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
  readonly map: <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}
```

Added in v2.0.0

## Functor1 (interface)

**Signature**

```ts
export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}
```

Added in v2.0.0

## Functor2 (interface)

**Signature**

```ts
export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Functor2C (interface)

**Signature**

```ts
export interface Functor2C<F extends URIS2, E> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Functor3 (interface)

**Signature**

```ts
export interface Functor3<F extends URIS3> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v2.0.0

## Functor3C (interface)

**Signature**

```ts
export interface Functor3C<F extends URIS3, E> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v2.2.0

## Functor4 (interface)

**Signature**

```ts
export interface Functor4<F extends URIS4> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

Added in v2.0.0
