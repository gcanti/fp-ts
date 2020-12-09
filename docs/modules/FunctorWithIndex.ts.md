---
title: FunctorWithIndex.ts
nav_order: 32
parent: Modules
---

## FunctorWithIndex overview

A `FunctorWithIndex` is a type constructor which supports a mapping operation `mapWithIndex`.

`mapWithIndex` can be used to turn functions `i -> a -> b` into functions `f a -> f b` whose argument and return types use the type
constructor `f` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.mapWithIndex(fa, (_i, a) => a) <-> fa`
2. Composition: `F.mapWithIndex(fa, (_i, a) => bc(ab(a))) <-> F.mapWithIndex(F.mapWithIndex(fa, ab), bc)`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [FunctorWithIndex (interface)](#functorwithindex-interface)
  - [FunctorWithIndex1 (interface)](#functorwithindex1-interface)
  - [FunctorWithIndex2 (interface)](#functorwithindex2-interface)
  - [FunctorWithIndex2C (interface)](#functorwithindex2c-interface)
  - [FunctorWithIndex3 (interface)](#functorwithindex3-interface)
  - [FunctorWithIndex3C (interface)](#functorwithindex3c-interface)
  - [FunctorWithIndex4 (interface)](#functorwithindex4-interface)

---

# type classes

## FunctorWithIndex (interface)

**Signature**

```ts
export interface FunctorWithIndex<F, I> extends Functor<F> {
  readonly mapWithIndex: <A, B>(fa: HKT<F, A>, f: (i: I, a: A) => B) => HKT<F, B>
}
```

Added in v2.0.0

## FunctorWithIndex1 (interface)

**Signature**

```ts
export interface FunctorWithIndex1<F extends URIS, I> extends Functor1<F> {
  readonly mapWithIndex: <A, B>(fa: Kind<F, A>, f: (i: I, a: A) => B) => Kind<F, B>
}
```

Added in v2.0.0

## FunctorWithIndex2 (interface)

**Signature**

```ts
export interface FunctorWithIndex2<F extends URIS2, I> extends Functor2<F> {
  readonly mapWithIndex: <E, A, B>(fa: Kind2<F, E, A>, f: (i: I, a: A) => B) => Kind2<F, E, B>
}
```

Added in v2.0.0

## FunctorWithIndex2C (interface)

**Signature**

```ts
export interface FunctorWithIndex2C<F extends URIS2, I, E> extends Functor2C<F, E> {
  readonly mapWithIndex: <A, B>(fa: Kind2<F, E, A>, f: (i: I, a: A) => B) => Kind2<F, E, B>
}
```

Added in v2.0.0

## FunctorWithIndex3 (interface)

**Signature**

```ts
export interface FunctorWithIndex3<F extends URIS3, I> extends Functor3<F> {
  readonly mapWithIndex: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (i: I, a: A) => B) => Kind3<F, R, E, B>
}
```

Added in v2.0.0

## FunctorWithIndex3C (interface)

**Signature**

```ts
export interface FunctorWithIndex3C<F extends URIS3, I, E> extends Functor3C<F, E> {
  readonly mapWithIndex: <R, A, B>(fa: Kind3<F, R, E, A>, f: (i: I, a: A) => B) => Kind3<F, R, E, B>
}
```

Added in v2.2.0

## FunctorWithIndex4 (interface)

**Signature**

```ts
export interface FunctorWithIndex4<F extends URIS4, I> extends Functor4<F> {
  readonly mapWithIndex: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, f: (i: I, a: A) => B) => Kind4<F, S, R, E, B>
}
```

Added in v2.0.0
