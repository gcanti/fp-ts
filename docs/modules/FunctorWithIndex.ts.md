---
title: FunctorWithIndex.ts
nav_order: 45
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

- [model](#model)
  - [FunctorWithIndex (interface)](#functorwithindex-interface)
- [utils](#utils)
  - [mapWithIndexComposition](#mapwithindexcomposition)

---

# model

## FunctorWithIndex (interface)

**Signature**

```ts
export interface FunctorWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly mapWithIndex: <A, B>(
    f: (i: I, a: A) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

# utils

## mapWithIndexComposition

Returns a default `mapWithIndex` composition.

**Signature**

```ts
export declare const mapWithIndexComposition: <F extends TypeLambda, I, G extends TypeLambda, J>(
  FunctorWithIndexF: FunctorWithIndex<F, I>,
  FunctorWithIndexG: FunctorWithIndex<G, J>
) => <A, B>(
  f: (i: readonly [I, J], a: A) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>
```

Added in v3.0.0
