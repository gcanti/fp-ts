---
title: FunctorWithIndex.ts
nav_order: 35
parent: Modules
---

## FunctorWithIndex overview

A `FunctorWithIndex` is a type constructor which supports a mapping operation `mapWithIndex`.

`mapWithIndex` can be used to turn functions `i -> a -> b` into functions `f a -> f b` whose argument and return types use the type
constructor `f` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.mapWithIndex((_i, a) => a) <-> fa`
2. Composition: `F.mapWithIndex((_i, a) => bc(ab(a))) <-> flow(F.mapWithIndex((_i, a) => ab(a)), F.mapWithIndex((_i, b) => bc(b)))`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [mapWithIndex](#mapwithindex)
- [type classes](#type-classes)
  - [FunctorWithIndex (interface)](#functorwithindex-interface)
  - [FunctorWithIndex1 (interface)](#functorwithindex1-interface)
  - [FunctorWithIndex2 (interface)](#functorwithindex2-interface)
  - [FunctorWithIndex2C (interface)](#functorwithindex2c-interface)
  - [FunctorWithIndex3 (interface)](#functorwithindex3-interface)
  - [FunctorWithIndex3C (interface)](#functorwithindex3c-interface)
  - [FunctorWithIndex4 (interface)](#functorwithindex4-interface)

---

# combinators

## mapWithIndex

`mapWithIndex` composition.

**Signature**

```ts
export declare function mapWithIndex<F extends URIS, I, G extends URIS, J>(
  F: FunctorWithIndex1<F, I>,
  G: FunctorWithIndex1<G, J>
): <A, B>(f: (ij: readonly [I, J], a: A) => B) => (fa: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
export declare function mapWithIndex<F, I, G, J>(
  F: FunctorWithIndex<F, I>,
  G: FunctorWithIndex<G, J>
): <A, B>(f: (ij: readonly [I, J], a: A) => B) => (fa: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
```

Added in v3.0.0

# type classes

## FunctorWithIndex (interface)

**Signature**

```ts
export interface FunctorWithIndex<F, I> extends Functor<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}
```

Added in v3.0.0

## FunctorWithIndex1 (interface)

**Signature**

```ts
export interface FunctorWithIndex1<F extends URIS, I> extends Functor1<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}
```

Added in v3.0.0

## FunctorWithIndex2 (interface)

**Signature**

```ts
export interface FunctorWithIndex2<F extends URIS2, I> extends Functor2<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v3.0.0

## FunctorWithIndex2C (interface)

**Signature**

```ts
export interface FunctorWithIndex2C<F extends URIS2, I, E> extends Functor2C<F, E> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v3.0.0

## FunctorWithIndex3 (interface)

**Signature**

```ts
export interface FunctorWithIndex3<F extends URIS3, I> extends Functor3<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v3.0.0

## FunctorWithIndex3C (interface)

**Signature**

```ts
export interface FunctorWithIndex3C<F extends URIS3, I, E> extends Functor3C<F, E> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v3.0.0

## FunctorWithIndex4 (interface)

**Signature**

```ts
export interface FunctorWithIndex4<F extends URIS4, I> extends Functor4<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

Added in v3.0.0
