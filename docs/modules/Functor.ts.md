---
title: Functor.ts
nav_order: 43
parent: Modules
---

## Functor overview

A `Functor` is a type constructor which supports a mapping operation `map`.

`map` can be used to turn functions `A -> B` into functions `F<A> -> F<B>` whose argument and return types use the type
constructor `F` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `map(identity) <-> identity`
2. Composition: `map(flow(ab, bc)) <-> flow(map(ab), map(bc))`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [flap](#flap)
  - [getMapComposition](#getmapcomposition)
- [type classes](#type-classes)
  - [Functor (interface)](#functor-interface)
- [utils](#utils)
  - [bindTo](#bindto)
  - [let](#let)
  - [tupled](#tupled)

---

# combinators

## flap

**Signature**

```ts
export declare const flap: <λ extends HKT>(
  Functorλ: Functor<λ>
) => <A>(a: A) => <S, R, O, E, B>(self: Kind<λ, S, R, O, E, (a: A) => B>) => Kind<λ, S, R, O, E, B>
```

Added in v3.0.0

## getMapComposition

`map` composition.

**Signature**

```ts
export declare const getMapComposition: <λ extends HKT, μ extends HKT>(
  Functorλ: Functor<λ>,
  Functorμ: Functor<μ>
) => <A, B>(
  f: (a: A) => B
) => <λS, λR, λO, λE, μS, μR, μO, μE>(
  self: Kind<λ, λS, λR, λO, λE, Kind<μ, μS, μR, μO, μE, A>>
) => Kind<λ, λS, λR, λO, λE, Kind<μ, μS, μR, μO, μE, B>>
```

Added in v3.0.0

# type classes

## Functor (interface)

**Signature**

```ts
export interface Functor<λ extends HKT> extends Typeclass<λ> {
  readonly map: <A, B>(f: (a: A) => B) => <S, R, O, E>(self: Kind<λ, S, R, O, E, A>) => Kind<λ, S, R, O, E, B>
}
```

Added in v3.0.0

# utils

## bindTo

**Signature**

```ts
export declare const bindTo: <λ extends HKT>(
  Functorλ: Functor<λ>
) => <N extends string>(
  name: N
) => <S, R, O, E, A>(self: Kind<λ, S, R, O, E, A>) => Kind<λ, S, R, O, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <λ extends HKT>(
  Functorλ: Functor<λ>
) => <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, O, E>(
  self: Kind<λ, S, R, O, E, A>
) => Kind<λ, S, R, O, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <λ extends HKT>(
  Functorλ: Functor<λ>
) => <S, R, O, E, A>(self: Kind<λ, S, R, O, E, A>) => Kind<λ, S, R, O, E, readonly [A]>
```

Added in v3.0.0
