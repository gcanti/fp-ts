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

- [combinators](#combinators)
  - [filter](#filter)
  - [getFilterMapComposition](#getfiltermapcomposition)
  - [getPartitionMapComposition](#getpartitionmapcomposition)
  - [partition](#partition)
- [type classes](#type-classes)
  - [Filterable (interface)](#filterable-interface)

---

# combinators

## filter

**Signature**

```ts
export declare const filter: <F extends TypeLambda>(
  F: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, O, E>(
    self: Kind<F, S, R, O, E, C>
  ) => Kind<F, S, R, O, E, B>
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, O, E>(self: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

## getFilterMapComposition

`filterMap` composition.

**Signature**

```ts
export declare const getFilterMapComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Functor<F>,
  G: Filterable<G>
) => <A, B>(
  f: (a: A) => Option<B>
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>
```

Added in v3.0.0

## getPartitionMapComposition

`partitionMap` composition.

**Signature**

```ts
export declare const getPartitionMapComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Functor<F>,
  G: Filterable<G>
) => <A, B, C>(
  f: (a: A) => Either<B, C>
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => readonly [Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, C>>]
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: <F extends TypeLambda>(
  F: Filterable<F>
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

# type classes

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
