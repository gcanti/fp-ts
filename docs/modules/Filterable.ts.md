---
title: Filterable.ts
nav_order: 26
parent: Modules
---

## Filterable overview

`Filterable` represents data structures which can be _partitioned_/_filtered_.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [compositions](#compositions)
  - [getFilterMapComposition](#getfiltermapcomposition)
  - [getPartitionMapComposition](#getpartitionmapcomposition)
- [derivations](#derivations)
  - [getFilterDerivation](#getfilterderivation)
  - [getPartitionDerivation](#getpartitionderivation)
- [model](#model)
  - [Filterable (interface)](#filterable-interface)

---

# compositions

## getFilterMapComposition

**Signature**

```ts
export declare const getFilterMapComposition: <F extends TypeLambda, G extends TypeLambda>(
  FunctorF: Functor<F>,
  FilterableG: Filterable<G>
) => <A, B>(
  f: (a: A) => Option<B>
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>
```

Added in v3.0.0

## getPartitionMapComposition

**Signature**

```ts
export declare const getPartitionMapComposition: <F extends TypeLambda, G extends TypeLambda>(
  FunctorF: Functor<F>,
  FilterableG: Filterable<G>
) => <A, B, C>(
  f: (a: A) => Either<B, C>
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => readonly [Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, C>>]
```

Added in v3.0.0

# derivations

## getFilterDerivation

**Signature**

```ts
export declare const getFilterDerivation: <F extends TypeLambda>(
  Filterable: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => Kind<F, S, R, O, E, B>
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, O, E>(self: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

## getPartitionDerivation

**Signature**

```ts
export declare const getPartitionDerivation: <F extends TypeLambda>(
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
