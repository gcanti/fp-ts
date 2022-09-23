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
export declare const filter: <F extends HKT>(
  F: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, W, E>(
    self: Kind<F, S, R, W, E, C>
  ) => Kind<F, S, R, W, E, B>
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, W, E>(self: Kind<F, S, R, W, E, B>) => Kind<F, S, R, W, E, B>
}
```

Added in v3.0.0

## getFilterMapComposition

`filterMap` composition.

**Signature**

```ts
export declare const getFilterMapComposition: <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
) => <A, B>(
  f: (a: A) => Option<B>
) => <FS, FR, FW, FE, GS, GR, GW, GE>(
  self: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>
```

Added in v3.0.0

## getPartitionMapComposition

`partitionMap` composition.

**Signature**

```ts
export declare const getPartitionMapComposition: <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
) => <A, B, C>(
  f: (a: A) => Either<B, C>
) => <FS, FR, FW, FE, GS, GR, GW, GE>(
  self: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
) => readonly [Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>, Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, C>>]
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: <F extends HKT>(
  F: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S, R, W, E>(
    self: Kind<F, S, R, W, E, C>
  ) => readonly [Kind<F, S, R, W, E, C>, Kind<F, S, R, W, E, B>]
  <B extends A, A = B>(predicate: Predicate<A>): <S, R, W, E>(
    self: Kind<F, S, R, W, E, B>
  ) => readonly [Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, B>]
}
```

Added in v3.0.0

# type classes

## Filterable (interface)

**Signature**

```ts
export interface Filterable<F extends HKT> extends Typeclass<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => readonly [Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, C>]
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}
```

Added in v3.0.0
