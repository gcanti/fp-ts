---
title: Functor.ts
nav_order: 35
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
- [utils](#utils)
  - [FunctorComposition (interface)](#functorcomposition-interface)
  - [FunctorComposition11 (interface)](#functorcomposition11-interface)
  - [FunctorComposition12 (interface)](#functorcomposition12-interface)
  - [FunctorComposition12C (interface)](#functorcomposition12c-interface)
  - [FunctorComposition21 (interface)](#functorcomposition21-interface)
  - [FunctorComposition22 (interface)](#functorcomposition22-interface)
  - [FunctorComposition22C (interface)](#functorcomposition22c-interface)
  - [FunctorComposition23 (interface)](#functorcomposition23-interface)
  - [FunctorComposition23C (interface)](#functorcomposition23c-interface)
  - [FunctorComposition2C1 (interface)](#functorcomposition2c1-interface)
  - [FunctorCompositionHKT1 (interface)](#functorcompositionhkt1-interface)
  - [FunctorCompositionHKT2 (interface)](#functorcompositionhkt2-interface)
  - [FunctorCompositionHKT2C (interface)](#functorcompositionhkt2c-interface)
  - [getFunctorComposition](#getfunctorcomposition)

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
  readonly _E: E
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
  readonly _E: E
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

# utils

## FunctorComposition (interface)

**Signature**

```ts
export interface FunctorComposition<F, G> {
  readonly map: <A, B>(fa: HKT<F, HKT<G, A>>, f: (a: A) => B) => HKT<F, HKT<G, B>>
}
```

Added in v2.0.0

## FunctorComposition11 (interface)

**Signature**

```ts
export interface FunctorComposition11<F extends URIS, G extends URIS> {
  readonly map: <A, B>(fa: Kind<F, Kind<G, A>>, f: (a: A) => B) => Kind<F, Kind<G, B>>
}
```

Added in v2.0.0

## FunctorComposition12 (interface)

**Signature**

```ts
export interface FunctorComposition12<F extends URIS, G extends URIS2> {
  readonly map: <E, A, B>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => B) => Kind<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## FunctorComposition12C (interface)

**Signature**

```ts
export interface FunctorComposition12C<F extends URIS, G extends URIS2, E> {
  readonly map: <A, B>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => B) => Kind<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## FunctorComposition21 (interface)

**Signature**

```ts
export interface FunctorComposition21<F extends URIS2, G extends URIS> {
  readonly map: <E, A, B>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => B) => Kind2<F, E, Kind<G, B>>
}
```

Added in v2.0.0

## FunctorComposition22 (interface)

**Signature**

```ts
export interface FunctorComposition22<F extends URIS2, G extends URIS2> {
  readonly map: <FE, GE, A, B>(fa: Kind2<F, FE, Kind2<G, GE, A>>, f: (a: A) => B) => Kind2<F, FE, Kind2<G, GE, B>>
}
```

Added in v2.0.0

## FunctorComposition22C (interface)

**Signature**

```ts
export interface FunctorComposition22C<F extends URIS2, G extends URIS2, E> {
  readonly map: <FE, A, B>(fa: Kind2<F, FE, Kind2<G, E, A>>, f: (a: A) => B) => Kind2<F, FE, Kind2<G, E, B>>
}
```

Added in v2.0.0

## FunctorComposition23 (interface)

**Signature**

```ts
export interface FunctorComposition23<F extends URIS2, G extends URIS3> {
  readonly map: <FE, R, E, A, B>(fa: Kind2<F, FE, Kind3<G, R, E, A>>, f: (a: A) => B) => Kind2<F, FE, Kind3<G, R, E, B>>
}
```

Added in v2.2.0

## FunctorComposition23C (interface)

**Signature**

```ts
export interface FunctorComposition23C<F extends URIS2, G extends URIS3, E> {
  readonly map: <FE, R, A, B>(fa: Kind2<F, FE, Kind3<G, R, E, A>>, f: (a: A) => B) => Kind2<F, FE, Kind3<G, R, E, B>>
}
```

Added in v2.2.0

## FunctorComposition2C1 (interface)

**Signature**

```ts
export interface FunctorComposition2C1<F extends URIS2, G extends URIS, E> {
  readonly map: <A, B>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => B) => Kind2<F, E, Kind<G, B>>
}
```

Added in v2.0.0

## FunctorCompositionHKT1 (interface)

**Signature**

```ts
export interface FunctorCompositionHKT1<F, G extends URIS> {
  readonly map: <A, B>(fa: HKT<F, Kind<G, A>>, f: (a: A) => B) => HKT<F, Kind<G, B>>
}
```

Added in v2.0.0

## FunctorCompositionHKT2 (interface)

**Signature**

```ts
export interface FunctorCompositionHKT2<F, G extends URIS2> {
  readonly map: <E, A, B>(fa: HKT<F, Kind2<G, E, A>>, f: (a: A) => B) => HKT<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## FunctorCompositionHKT2C (interface)

**Signature**

```ts
export interface FunctorCompositionHKT2C<F, G extends URIS2, E> {
  readonly map: <A, B>(fa: HKT<F, Kind2<G, E, A>>, f: (a: A) => B) => HKT<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## getFunctorComposition

**Signature**

```ts
export declare function getFunctorComposition<F extends URIS2, G extends URIS3, E>(
  F: Functor2<F>,
  G: Functor3C<G, E>
): FunctorComposition23C<F, G, E>
export declare function getFunctorComposition<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  G: Functor2C<G, E>
): FunctorComposition22C<F, G, E>
export declare function getFunctorComposition<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Functor2<G>
): FunctorComposition22<F, G>
export declare function getFunctorComposition<F extends URIS2, G extends URIS, E>(
  F: Functor2C<F, E>,
  G: Functor1<G>
): FunctorComposition2C1<F, G, E>
export declare function getFunctorComposition<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Functor1<G>
): FunctorComposition21<F, G>
export declare function getFunctorComposition<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Functor2C<G, E>
): FunctorComposition12C<F, G, E>
export declare function getFunctorComposition<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Functor2<G>
): FunctorComposition12<F, G>
export declare function getFunctorComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Functor1<G>
): FunctorComposition11<F, G>
export declare function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G>
```

Added in v2.0.0
