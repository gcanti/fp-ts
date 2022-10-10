---
title: typeclasses/Filterable.ts
nav_order: 55
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
  - [partitionMap](#partitionmap)

---

# model

## Filterable (interface)

**Signature**

```ts
export interface Filterable<F extends TypeLambda> extends TypeClass<F> {
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

# utils

## filter

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

## partitionMap

**Signature**

```ts
export declare const partitionMap: <F extends TypeLambda>(
  Filterable: Filterable<F>
) => <A, B, C>(
  f: (a: A) => Result<B, C>
) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>]
```

Added in v3.0.0
