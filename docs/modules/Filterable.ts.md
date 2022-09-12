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
  <A, B>(refinement: Refinement<A, B>): <S, R, E>(
    fa: Kind<F, S, R, E, Kind<G, S, R, E, A>>
  ) => Kind<F, S, R, E, Kind<G, S, R, E, B>>
  <A>(predicate: Predicate<A>): <S, R, E, B>(
    fb: Kind<F, S, R, E, Kind<G, S, R, E, B>>
  ) => Kind<F, S, R, E, Kind<G, S, R, E, B>>
  <A>(predicate: Predicate<A>): <S, R, E>(
    fa: Kind<F, S, R, E, Kind<G, S, R, E, A>>
  ) => Kind<F, S, R, E, Kind<G, S, R, E, A>>
}
```

Added in v3.0.0

## filterMap

`filterMap` composition.

**Signature**

```ts
export declare function filterMap<F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
): Filterable<ComposeF<F, G>>['filterMap']
```

Added in v3.0.0

## partition

`partition` composition.

**Signature**

```ts
export declare function partition<F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
): Filterable<ComposeF<F, G>>['partition']
```

Added in v3.0.0

## partitionMap

`partitionMap` composition.

**Signature**

```ts
export declare function partitionMap<F extends HKT, G extends HKT>(
  F: Functor<F>,
  G: Filterable<G>
): Filterable<ComposeF<F, G>>['partitionMap']
```

Added in v3.0.0

# type classes

## Filterable (interface)

**Signature**

```ts
export interface Filterable<F extends HKT> extends Typeclass<F> {
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, E>(fa: Kind<F, S, R, E, A>) => Separated<Kind<F, S, R, E, B>, Kind<F, S, R, E, C>>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(
      fa: Kind<F, S, R, E, A>
    ) => Separated<Kind<F, S, R, E, A>, Kind<F, S, R, E, B>>
    <A>(predicate: Predicate<A>): <S, R, E, B extends A>(
      fb: Kind<F, S, R, E, B>
    ) => Separated<Kind<F, S, R, E, B>, Kind<F, S, R, E, B>>
    <A>(predicate: Predicate<A>): <S, R, E>(
      fa: Kind<F, S, R, E, A>
    ) => Separated<Kind<F, S, R, E, A>, Kind<F, S, R, E, A>>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, B>
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, B>
    <A>(predicate: Predicate<A>): <S, R, E, B extends A>(fb: Kind<F, S, R, E, B>) => Kind<F, S, R, E, B>
    <A>(predicate: Predicate<A>): <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, A>
  }
}
```

Added in v3.0.0
