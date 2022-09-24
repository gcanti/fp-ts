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
export declare const flap: <F extends HKT>(
  F: Functor<F>
) => <A>(a: A) => <S, R, W, E, B>(self: Kind<F, S, R, W, E, (a: A) => B>) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

## getMapComposition

`map` composition.

**Signature**

```ts
export declare const getMapComposition: <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Functor<G>
) => <A, B>(
  f: (a: A) => B
) => <FS, FR, FW, FE, GS, GR, GW, GE>(
  fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>
```

Added in v3.0.0

# type classes

## Functor (interface)

**Signature**

```ts
export interface Functor<F extends HKT> extends Typeclass<F> {
  readonly map: <A, B>(f: (a: A) => B) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}
```

Added in v3.0.0

# utils

## bindTo

**Signature**

```ts
export declare const bindTo: <F extends HKT>(
  F: Functor<F>
) => <N extends string>(
  name: N
) => <S, R, W, E, A>(self: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <F extends HKT>(
  F: Functor<F>
) => <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, W, E>(
  self: Kind<F, S, R, W, E, A>
) => Kind<F, S, R, W, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <F extends HKT>(
  F: Functor<F>
) => <S, R, W, E, A>(self: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, readonly [A]>
```

Added in v3.0.0
