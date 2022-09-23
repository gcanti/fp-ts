---
title: Functor.ts
nav_order: 42
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

- [combinators](#combinators)
  - [flap](#flap)
  - [map](#map)
- [type classes](#type-classes)
  - [Functor (interface)](#functor-interface)
  - [Functor1 (interface)](#functor1-interface)
  - [Functor2 (interface)](#functor2-interface)
  - [Functor2C (interface)](#functor2c-interface)
  - [Functor3 (interface)](#functor3-interface)
  - [Functor3C (interface)](#functor3c-interface)
  - [Functor4 (interface)](#functor4-interface)
- [utils](#utils)
  - [bindTo](#bindto)
  - [let](#let)
  - [let\_](#let_)
  - [~~FunctorComposition11~~ (interface)](#functorcomposition11-interface)
  - [~~FunctorComposition12C~~ (interface)](#functorcomposition12c-interface)
  - [~~FunctorComposition12~~ (interface)](#functorcomposition12-interface)
  - [~~FunctorComposition21~~ (interface)](#functorcomposition21-interface)
  - [~~FunctorComposition22C~~ (interface)](#functorcomposition22c-interface)
  - [~~FunctorComposition22~~ (interface)](#functorcomposition22-interface)
  - [~~FunctorComposition23C~~ (interface)](#functorcomposition23c-interface)
  - [~~FunctorComposition23~~ (interface)](#functorcomposition23-interface)
  - [~~FunctorComposition2C1~~ (interface)](#functorcomposition2c1-interface)
  - [~~FunctorCompositionHKT1~~ (interface)](#functorcompositionhkt1-interface)
  - [~~FunctorCompositionHKT2C~~ (interface)](#functorcompositionhkt2c-interface)
  - [~~FunctorCompositionHKT2~~ (interface)](#functorcompositionhkt2-interface)
  - [~~FunctorComposition~~ (interface)](#functorcomposition-interface)
  - [~~getFunctorComposition~~](#getfunctorcomposition)

---

# combinators

## flap

**Signature**

```ts
export declare function flap<F extends URIS4>(
  F: Functor4<F>
): <A>(a: A) => <S, R, E, B>(fab: Kind4<F, S, R, E, (a: A) => B>) => Kind4<F, S, R, E, B>
export declare function flap<F extends URIS3>(
  F: Functor3<F>
): <A>(a: A) => <R, E, B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
export declare function flap<F extends URIS2>(
  F: Functor2<F>
): <A>(a: A) => <E, B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
export declare function flap<F extends URIS>(F: Functor1<F>): <A>(a: A) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
export declare function flap<F>(F: Functor<F>): <A>(a: A) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
```

Added in v2.10.0

## map

`map` composition.

**Signature**

```ts
export declare function map<F extends URIS3, G extends URIS>(
  F: Functor3<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, Kind<G, A>>) => Kind3<F, R, E, Kind<G, B>>
export declare function map<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <EF, EG>(fa: Kind2<F, EF, Kind2<G, EG, A>>) => Kind2<F, EF, Kind2<G, EG, B>>
export declare function map<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, Kind<G, A>>) => Kind2<F, E, Kind<G, B>>
export declare function map<F extends URIS, G extends URIS3>(
  F: Functor1<F>,
  G: Functor3<G>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind<F, Kind3<G, R, E, A>>) => Kind<F, Kind3<G, R, E, B>>
export declare function map<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, B>>
export declare function map<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => (fa: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
export declare function map<F, G extends URIS2>(
  F: Functor<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, Kind2<G, E, A>>) => HKT<F, Kind2<G, E, B>>
export declare function map<F, G extends URIS>(
  F: Functor<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => (fa: HKT<F, Kind<G, A>>) => HKT<F, Kind<G, B>>
export declare function map<F, G>(
  F: Functor<F>,
  G: Functor<G>
): <A, B>(f: (a: A) => B) => (fa: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
```

Added in v2.10.0

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

## bindTo

**Signature**

```ts
export declare function bindTo<F extends URIS4>(
  F: Functor4<F>
): <N extends string>(name: N) => <S, R, E, A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, { readonly [K in N]: A }>
export declare function bindTo<F extends URIS3>(
  F: Functor3<F>
): <N extends string>(name: N) => <R, E, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in N]: A }>
export declare function bindTo<F extends URIS3, E>(
  F: Functor3C<F, E>
): <N extends string>(name: N) => <R, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in N]: A }>
export declare function bindTo<F extends URIS2>(
  F: Functor2<F>
): <N extends string>(name: N) => <E, A>(fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in N]: A }>
export declare function bindTo<F extends URIS2, E>(
  F: Functor2C<F, E>
): <N extends string>(name: N) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in N]: A }>
export declare function bindTo<F extends URIS>(
  F: Functor1<F>
): <N extends string>(name: N) => <A>(fa: Kind<F, A>) => Kind<F, { readonly [K in N]: A }>
export declare function bindTo<F>(
  F: Functor<F>
): <N extends string>(name: N) => <A>(fa: HKT<F, A>) => HKT<F, { readonly [K in N]: A }>
```

Added in v2.10.0

## let

**Signature**

```ts
export declare const let: typeof let_
```

Added in v2.13.0

## let\_

**Signature**

```ts
function let_<F extends URIS4>(
  F: Functor4<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, E>(
  fa: Kind4<F, S, R, E, A>
) => Kind4<F, S, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F extends URIS3>(
  F: Functor3<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F extends URIS3, E>(
  F: Functor3C<F, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F extends URIS2>(
  F: Functor2<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F extends URIS2, E>(
  F: Functor2C<F, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F extends URIS>(
  F: Functor1<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: Kind<F, A>) => Kind<F, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
function let_<F>(
  F: Functor<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: HKT<F, A>) => HKT<F, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## ~~FunctorComposition11~~ (interface)

**Signature**

```ts
export interface FunctorComposition11<F extends URIS, G extends URIS> {
  readonly map: <A, B>(fa: Kind<F, Kind<G, A>>, f: (a: A) => B) => Kind<F, Kind<G, B>>
}
```

Added in v2.0.0

## ~~FunctorComposition12C~~ (interface)

**Signature**

```ts
export interface FunctorComposition12C<F extends URIS, G extends URIS2, E> {
  readonly map: <A, B>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => B) => Kind<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## ~~FunctorComposition12~~ (interface)

**Signature**

```ts
export interface FunctorComposition12<F extends URIS, G extends URIS2> {
  readonly map: <E, A, B>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => B) => Kind<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## ~~FunctorComposition21~~ (interface)

**Signature**

```ts
export interface FunctorComposition21<F extends URIS2, G extends URIS> {
  readonly map: <E, A, B>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => B) => Kind2<F, E, Kind<G, B>>
}
```

Added in v2.0.0

## ~~FunctorComposition22C~~ (interface)

**Signature**

```ts
export interface FunctorComposition22C<F extends URIS2, G extends URIS2, E> {
  readonly map: <FE, A, B>(fa: Kind2<F, FE, Kind2<G, E, A>>, f: (a: A) => B) => Kind2<F, FE, Kind2<G, E, B>>
}
```

Added in v2.0.0

## ~~FunctorComposition22~~ (interface)

**Signature**

```ts
export interface FunctorComposition22<F extends URIS2, G extends URIS2> {
  readonly map: <FE, GE, A, B>(fa: Kind2<F, FE, Kind2<G, GE, A>>, f: (a: A) => B) => Kind2<F, FE, Kind2<G, GE, B>>
}
```

Added in v2.0.0

## ~~FunctorComposition23C~~ (interface)

**Signature**

```ts
export interface FunctorComposition23C<F extends URIS2, G extends URIS3, E> {
  readonly map: <FE, R, A, B>(fa: Kind2<F, FE, Kind3<G, R, E, A>>, f: (a: A) => B) => Kind2<F, FE, Kind3<G, R, E, B>>
}
```

Added in v2.2.0

## ~~FunctorComposition23~~ (interface)

**Signature**

```ts
export interface FunctorComposition23<F extends URIS2, G extends URIS3> {
  readonly map: <FE, R, E, A, B>(fa: Kind2<F, FE, Kind3<G, R, E, A>>, f: (a: A) => B) => Kind2<F, FE, Kind3<G, R, E, B>>
}
```

Added in v2.2.0

## ~~FunctorComposition2C1~~ (interface)

**Signature**

```ts
export interface FunctorComposition2C1<F extends URIS2, G extends URIS, E> {
  readonly map: <A, B>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => B) => Kind2<F, E, Kind<G, B>>
}
```

Added in v2.0.0

## ~~FunctorCompositionHKT1~~ (interface)

**Signature**

```ts
export interface FunctorCompositionHKT1<F, G extends URIS> {
  readonly map: <A, B>(fa: HKT<F, Kind<G, A>>, f: (a: A) => B) => HKT<F, Kind<G, B>>
}
```

Added in v2.0.0

## ~~FunctorCompositionHKT2C~~ (interface)

**Signature**

```ts
export interface FunctorCompositionHKT2C<F, G extends URIS2, E> {
  readonly map: <A, B>(fa: HKT<F, Kind2<G, E, A>>, f: (a: A) => B) => HKT<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## ~~FunctorCompositionHKT2~~ (interface)

**Signature**

```ts
export interface FunctorCompositionHKT2<F, G extends URIS2> {
  readonly map: <E, A, B>(fa: HKT<F, Kind2<G, E, A>>, f: (a: A) => B) => HKT<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## ~~FunctorComposition~~ (interface)

**Signature**

```ts
export interface FunctorComposition<F, G> {
  readonly map: <A, B>(fa: HKT<F, HKT<G, A>>, f: (a: A) => B) => HKT<F, HKT<G, B>>
}
```

Added in v2.0.0

## ~~getFunctorComposition~~

Use [`map`](#map) instead.

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
