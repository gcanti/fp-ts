---
title: Filterable.ts
nav_order: 30
parent: Modules
---

## Filterable overview

`Filterable` represents data structures which can be _partitioned_/_filtered_.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [type classes](#type-classes)
  - [Filterable (interface)](#filterable-interface)

---

# combinators

## filter

`filter` composition.

**Signature**

```ts
export declare const filter: <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
) => {
  <A, B extends A>(refinement: Refinement<A, B>): <FS, FR, FW, FE, GS, GR, GW, GE>(
    fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
  ) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>
  <A>(predicate: Predicate<A>): <FS, FR, FW, FE, GS, GR, GW, GE, B extends A>(
    fgb: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>
  ) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>
  <A>(predicate: Predicate<A>): <FS, FR, FW, FE, GS, GR, GW, GE>(
    fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
  ) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
}
```

Added in v3.0.0

## filterMap

`filterMap` composition.

**Signature**

```ts
export declare const filterMap: <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
) => <A, B>(
  f: (a: A) => Option<B>
) => <FS, FR, FW, FE, GS, GR, GW, GE>(
  fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>
```

Added in v3.0.0

## partition

`partition` composition.

**Signature**

```ts
export declare const partition: <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
) => {
  <A, B extends A>(refinement: Refinement<A, B>): <FS, FR, FW, FE, GS, GR, GW, GE>(
    fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
  ) => Separated<
    Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>,
    Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>
  >
  <A>(predicate: Predicate<A>): <FS, FR, FW, FE, GS, GR, GW, GE, B extends A>(
    fgb: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>
  ) => Separated<
    Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>,
    Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>
  >
  <A>(predicate: Predicate<A>): <FS, FR, FW, FE, GS, GR, GW, GE>(
    fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
  ) => Separated<
    Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>,
    Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
  >
}
```

Added in v3.0.0

## partitionMap

`partitionMap` composition.

**Signature**

```ts
export declare const partitionMap: <F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
) => <A, B, C>(
  f: (a: A) => Either<B, C>
) => <FS, FR, FW, FE, GS, GR, GW, GE>(
  fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
) => Separated<Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>, Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, C>>>
```

Added in v3.0.0

# type classes

## Filterable (interface)

**Signature**

```ts
export interface Filterable<F extends HKT> extends Typeclass<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Separated<Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, C>>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <S, R, W, E>(
      fa: Kind<F, S, R, W, E, A>
    ) => Separated<Kind<F, S, R, W, E, A>, Kind<F, S, R, W, E, B>>
    <A>(predicate: Predicate<A>): <S, R, W, E, B extends A>(
      fb: Kind<F, S, R, W, E, B>
    ) => Separated<Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, B>>
    <A>(predicate: Predicate<A>): <S, R, W, E>(
      fa: Kind<F, S, R, W, E, A>
    ) => Separated<Kind<F, S, R, W, E, A>, Kind<F, S, R, W, E, A>>
  }
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
    <A>(predicate: Predicate<A>): <S, R, W, E, B extends A>(fb: Kind<F, S, R, W, E, B>) => Kind<F, S, R, W, E, B>
    <A>(predicate: Predicate<A>): <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, A>
  }
}
```

Added in v3.0.0
