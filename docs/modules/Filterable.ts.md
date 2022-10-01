---
title: Filterable.ts
nav_order: 28
parent: Modules
---

## Filterable overview

`Filterable` represents data structures which can be _partitioned_/_filtered_.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Filterable (interface)](#filterable-interface)
- [utils](#utils)
  - [filter](#filter)
  - [filterMapComposition](#filtermapcomposition)
  - [partition](#partition)
  - [partitionMapComposition](#partitionmapcomposition)

---

# model

## Filterable (interface)

**Signature**

```ts
export interface Filterable<F extends TypeLambda> extends TypeClass<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>]
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

# utils

## filter

Returns a default `filter` implementation.

**Signature**

```ts
export declare const filter: <F extends TypeLambda>(
  Filterable: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => Kind<F, S, R, O, E, B>
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, O, E>(self: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

## filterMapComposition

Returns a default `filterMap` composition.

**Signature**

```ts
export declare const filterMapComposition: <F extends TypeLambda, G extends TypeLambda>(
  FunctorF: Functor<F>,
  FilterableG: Filterable<G>
) => <A, B>(
  f: (a: A) => Option<B>
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>
```

Added in v3.0.0

## partition

Returns a default `partition` implementation.

**Signature**

```ts
export declare const partition: <F extends TypeLambda>(
  Filterable: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => readonly [Kind<F, S, R, O, E, C>, Kind<F, S, R, O, E, B>]
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, B>
  ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]
}
```

Added in v3.0.0

## partitionMapComposition

Returns a default `partitionMap` composition.

**Signature**

```ts
export declare const partitionMapComposition: <F extends TypeLambda, G extends TypeLambda>(
  FunctorF: Functor<F>,
  FilterableG: Filterable<G>
) => <A, B, C>(
  f: (a: A) => Either<B, C>
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => readonly [Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, C>>]
```

Added in v3.0.0
