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
  - [Filterable1 (interface)](#filterable1-interface)
  - [Filterable2 (interface)](#filterable2-interface)
  - [Filterable2C (interface)](#filterable2c-interface)
  - [Filterable3 (interface)](#filterable3-interface)
  - [Filterable3C (interface)](#filterable3c-interface)
  - [Filterable4 (interface)](#filterable4-interface)
- [utils](#utils)
  - [Filter (interface)](#filter-interface)
  - [Filter1 (interface)](#filter1-interface)
  - [Filter2 (interface)](#filter2-interface)
  - [Filter2C (interface)](#filter2c-interface)
  - [Filter3 (interface)](#filter3-interface)
  - [Filter3C (interface)](#filter3c-interface)
  - [Filter4 (interface)](#filter4-interface)
  - [Partition (interface)](#partition-interface)
  - [Partition1 (interface)](#partition1-interface)
  - [Partition2 (interface)](#partition2-interface)
  - [Partition2C (interface)](#partition2c-interface)
  - [Partition3 (interface)](#partition3-interface)
  - [Partition3C (interface)](#partition3c-interface)
  - [Partition4 (interface)](#partition4-interface)

---

# combinators

## filter

`filter` composition.

**Signature**

```ts
export declare function filter<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  G: Filterable2C<G, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(fga: Kind2<F, R, Kind2<G, E, A>>) => Kind2<F, R, Kind2<G, E, B>>
  <A>(predicate: Predicate<A>): <R, B extends A>(fgb: Kind2<F, R, Kind2<G, E, B>>) => Kind2<F, R, Kind2<G, E, B>>
  <A>(predicate: Predicate<A>): <R>(fga: Kind2<F, R, Kind2<G, E, A>>) => Kind2<F, R, Kind2<G, E, A>>
}
export declare function filter<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Filterable2C<G, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (fga: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, B>>
  <A>(predicate: Predicate<A>): <B extends A>(fgb: Kind<F, Kind2<G, E, B>>) => Kind<F, Kind2<G, E, B>>
  <A>(predicate: Predicate<A>): (fga: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, A>>
}
export declare function filter<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Filterable1<G>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (fga: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
  <A>(predicate: Predicate<A>): <B extends A>(fgb: Kind<F, Kind<G, B>>) => Kind<F, Kind<G, B>>
  <A>(predicate: Predicate<A>): (fga: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, A>>
}
export declare function filter<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
  <A>(predicate: Predicate<A>): <B extends A>(fgb: HKT<F, HKT<G, B>>) => HKT<F, HKT<G, B>>
  <A>(predicate: Predicate<A>): (fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, A>>
}
```

Added in v3.0.0

## filterMap

`filterMap` composition.

**Signature**

```ts
export declare function filterMap<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  G: Filterable2C<G, E>
): <A, B>(f: (a: A) => Option<B>) => <FE>(fga: Kind2<F, FE, Kind2<G, E, A>>) => Kind2<F, FE, Kind2<G, E, B>>
export declare function filterMap<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Filterable2C<G, E>
): <A, B>(f: (a: A) => Option<B>) => (fga: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, B>>
export declare function filterMap<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Filterable1<G>
): <A, B>(f: (a: A) => Option<B>) => (fga: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
export declare function filterMap<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): <A, B>(f: (a: A) => Option<B>) => (fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
```

Added in v3.0.0

## partition

`partition` composition.

**Signature**

```ts
export declare function partition<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  G: Filterable2C<G, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(
    fga: Kind2<F, R, Kind2<G, E, A>>
  ) => Separated<Kind2<F, R, Kind2<G, E, A>>, Kind2<F, R, Kind2<G, E, B>>>
  <A>(predicate: Predicate<A>): <R, B extends A>(
    fgb: Kind2<F, R, Kind2<G, E, B>>
  ) => Separated<Kind2<F, R, Kind2<G, E, B>>, Kind2<F, R, Kind2<G, E, B>>>
  <A>(predicate: Predicate<A>): <R>(
    fga: Kind2<F, R, Kind2<G, E, A>>
  ) => Separated<Kind2<F, R, Kind2<G, E, A>>, Kind2<F, R, Kind2<G, E, A>>>
}
export declare function partition<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Filterable2C<G, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fga: Kind<F, Kind2<G, E, A>>
  ) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, B>>>
  <A>(predicate: Predicate<A>): <B extends A>(
    fgb: Kind<F, Kind2<G, E, B>>
  ) => Separated<Kind<F, Kind2<G, E, B>>, Kind<F, Kind2<G, E, B>>>
  <A>(predicate: Predicate<A>): (
    fga: Kind<F, Kind2<G, E, A>>
  ) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, A>>>
}
export declare function partition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Filterable1<G>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fga: Kind<F, Kind<G, A>>
  ) => Separated<Kind<F, Kind<G, A>>, Kind<F, Kind<G, B>>>
  <A>(predicate: Predicate<A>): <B extends A>(
    fgb: Kind<F, Kind<G, B>>
  ) => Separated<Kind<F, Kind<G, B>>, Kind<F, Kind<G, B>>>
  <A>(predicate: Predicate<A>): (fga: Kind<F, Kind<G, A>>) => Separated<Kind<F, Kind<G, A>>, Kind<F, Kind<G, A>>>
}
export declare function partition<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fga: HKT<F, HKT<G, A>>
  ) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, B>>>
  <A>(predicate: Predicate<A>): <B extends A>(fgb: HKT<F, HKT<G, B>>) => Separated<HKT<F, HKT<G, B>>, HKT<F, HKT<G, B>>>
  <A>(predicate: Predicate<A>): (fga: HKT<F, HKT<G, A>>) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, A>>>
}
```

Added in v3.0.0

## partitionMap

`partitionMap` composition.

**Signature**

```ts
export declare function partitionMap<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  G: Filterable2C<G, E>
): <A, B, C>(
  f: (a: A) => Either<B, C>
) => <FE>(fa: Kind2<F, FE, Kind2<G, E, A>>) => Separated<Kind2<F, FE, Kind2<G, E, B>>, Kind2<F, FE, Kind2<G, E, C>>>
export declare function partitionMap<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Filterable2C<G, E>
): <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Kind<F, Kind2<G, E, A>>) => Separated<Kind<F, Kind2<G, E, B>>, Kind<F, Kind2<G, E, C>>>
export declare function partitionMap<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Filterable1<G>
): <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Kind<F, Kind<G, A>>) => Separated<Kind<F, Kind<G, B>>, Kind<F, Kind<G, C>>>
export declare function partitionMap<F, G>(
  F: Functor<F>,
  G: Filterable<G>
): <A, B, C>(f: (a: A) => Either<B, C>) => (fa: HKT<F, HKT<G, A>>) => Separated<HKT<F, HKT<G, B>>, HKT<F, HKT<G, C>>>
```

Added in v3.0.0

# type classes

## Filterable (interface)

**Signature**

```ts
export interface Filterable<F> {
  readonly URI?: F
  readonly partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: HKT<F, A>) => Separated<HKT<F, B>, HKT<F, C>>
  readonly partition: Partition<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly filter: Filter<F>
}
```

Added in v3.0.0

## Filterable1 (interface)

**Signature**

```ts
export interface Filterable1<F extends URIS> {
  readonly URI?: F
  readonly partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: Kind<F, A>) => Separated<Kind<F, B>, Kind<F, C>>
  readonly partition: Partition1<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind<F, A>) => Kind<F, B>
  readonly filter: Filter1<F>
}
```

Added in v3.0.0

## Filterable2 (interface)

**Signature**

```ts
export interface Filterable2<F extends URIS2> {
  readonly URI?: F
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filter: Filter2<F>
}
```

Added in v3.0.0

## Filterable2C (interface)

**Signature**

```ts
export interface Filterable2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2C<F, E>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filter: Filter2C<F, E>
}
```

Added in v3.0.0

## Filterable3 (interface)

**Signature**

```ts
export interface Filterable3<F extends URIS3> {
  readonly URI?: F
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly filter: Filter3<F>
}
```

Added in v3.0.0

## Filterable3C (interface)

**Signature**

```ts
export interface Filterable3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3C<F, E>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly filter: Filter3C<F, E>
}
```

Added in v3.0.0

## Filterable4 (interface)

**Signature**

```ts
export interface Filterable4<F extends URIS4> {
  readonly URI?: F
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
  readonly partition: Partition4<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  readonly filter: Filter4<F>
}
```

Added in v3.0.0

# utils

## Filter (interface)

**Signature**

```ts
export interface Filter<F> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => HKT<F, B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: HKT<F, B>) => HKT<F, B>
  <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => HKT<F, A>
}
```

Added in v3.0.0

## Filter1 (interface)

**Signature**

```ts
export interface Filter1<F extends URIS> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Kind<F, B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Kind<F, B>) => Kind<F, B>
  <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Kind<F, A>
}
```

Added in v3.0.0

## Filter2 (interface)

**Signature**

```ts
export interface Filter2<F extends URIS2> {
  <A, B extends A>(refinement: Refinement<A, B>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>): <E, B extends A>(fb: Kind2<F, E, B>) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
}
```

Added in v3.0.0

## Filter2C (interface)

**Signature**

```ts
export interface Filter2C<F extends URIS2, E> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Kind2<F, E, B>) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>): (fa: Kind2<F, E, A>) => Kind2<F, E, A>
}
```

Added in v3.0.0

## Filter3 (interface)

**Signature**

```ts
export interface Filter3<F extends URIS3> {
  <A, B extends A>(refinement: Refinement<A, B>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>): <R, E, B extends A>(fb: Kind3<F, R, E, B>) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}
```

Added in v3.0.0

## Filter3C (interface)

**Signature**

```ts
export interface Filter3C<F extends URIS3, E> {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>): <R, B extends A>(fb: Kind3<F, R, E, B>) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}
```

Added in v3.0.0

## Filter4 (interface)

**Signature**

```ts
export interface Filter4<F extends URIS4> {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  <A>(predicate: Predicate<A>): <S, R, E, B extends A>(fb: Kind4<F, S, R, E, B>) => Kind4<F, S, R, E, B>
  <A>(predicate: Predicate<A>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
}
```

Added in v3.0.0

## Partition (interface)

**Signature**

```ts
export interface Partition<F> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: HKT<F, B>) => Separated<HKT<F, B>, HKT<F, B>>
  <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
}
```

Added in v3.0.0

## Partition1 (interface)

**Signature**

```ts
export interface Partition1<F extends URIS> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Kind<F, B>) => Separated<Kind<F, B>, Kind<F, B>>
  <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, A>>
}
```

Added in v3.0.0

## Partition2 (interface)

**Signature**

```ts
export interface Partition2<F extends URIS2> {
  <A, B extends A>(refinement: Refinement<A, B>): <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicate: Predicate<A>): <E, B extends A>(fb: Kind2<F, E, B>) => Separated<Kind2<F, E, B>, Kind2<F, E, B>>
  <A>(predicate: Predicate<A>): <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}
```

Added in v3.0.0

## Partition2C (interface)

**Signature**

```ts
export interface Partition2C<F extends URIS2, E> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Kind2<F, E, B>) => Separated<Kind2<F, E, B>, Kind2<F, E, B>>
  <A>(predicate: Predicate<A>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}
```

Added in v3.0.0

## Partition3 (interface)

**Signature**

```ts
export interface Partition3<F extends URIS3> {
  <A, B extends A>(refinement: Refinement<A, B>): <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <A>(predicate: Predicate<A>): <R, E, B extends A>(
    fb: Kind3<F, R, E, B>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, B>>
  <A>(predicate: Predicate<A>): <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}
```

Added in v3.0.0

## Partition3C (interface)

**Signature**

```ts
export interface Partition3C<F extends URIS3, E> {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <A>(predicate: Predicate<A>): <R, B extends A>(
    fb: Kind3<F, R, E, B>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, B>>
  <A>(predicate: Predicate<A>): <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}
```

Added in v3.0.0

## Partition4 (interface)

**Signature**

```ts
export interface Partition4<F extends URIS4> {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
  <A>(predicate: Predicate<A>): <S, R, E, B extends A>(
    fb: Kind4<F, S, R, E, B>
  ) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, B>>
  <A>(predicate: Predicate<A>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
}
```

Added in v3.0.0
