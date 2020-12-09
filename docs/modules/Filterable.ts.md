---
title: Filterable.ts
nav_order: 26
parent: Modules
---

## Filterable overview

`Filterable` represents data structures which can be _partitioned_/_filtered_.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

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

# type classes

## Filterable (interface)

**Signature**

```ts
export interface Filterable<F> {
  readonly URI: F
  /**
   * Partition a data structure based on an either predicate.
   */
  readonly partitionMap: <A, B, C>(fa: HKT<F, A>, f: (a: A) => Either<B, C>) => Separated<HKT<F, B>, HKT<F, C>>
  /**
   * Partition a data structure based on a boolean predicate.
   */
  readonly partition: Partition<F>
  /**
   * Map over a data structure and filter based on an option predicate.
   */
  readonly filterMap: <A, B>(fa: HKT<F, A>, f: (a: A) => Option<B>) => HKT<F, B>
  /**
   * Filter a data structure based on a boolean predicate.
   */
  readonly filter: Filter<F>
}
```

Added in v2.0.0

## Filterable1 (interface)

**Signature**

```ts
export interface Filterable1<F extends URIS> {
  readonly URI: F
  readonly partitionMap: <A, B, C>(fa: Kind<F, A>, f: (a: A) => Either<B, C>) => Separated<Kind<F, B>, Kind<F, C>>
  readonly partition: Partition1<F>
  readonly filterMap: <A, B>(fa: Kind<F, A>, f: (a: A) => Option<B>) => Kind<F, B>
  readonly filter: Filter1<F>
}
```

Added in v2.0.0

## Filterable2 (interface)

**Signature**

```ts
export interface Filterable2<F extends URIS2> {
  readonly URI: F
  readonly partitionMap: <E, A, B, C>(
    fa: Kind2<F, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2<F>
  readonly filterMap: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => Option<B>) => Kind2<F, E, B>
  readonly filter: Filter2<F>
}
```

Added in v2.0.0

## Filterable2C (interface)

**Signature**

```ts
export interface Filterable2C<F extends URIS2, E> {
  readonly URI: F
  readonly partitionMap: <A, B, C>(
    fa: Kind2<F, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2C<F, E>
  readonly filterMap: <A, B>(fa: Kind2<F, E, A>, f: (a: A) => Option<B>) => Kind2<F, E, B>
  readonly filter: Filter2C<F, E>
}
```

Added in v2.0.0

## Filterable3 (interface)

**Signature**

```ts
export interface Filterable3<F extends URIS3> {
  readonly URI: F
  readonly partitionMap: <R, E, A, B, C>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3<F>
  readonly filterMap: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => Option<B>) => Kind3<F, R, E, B>
  readonly filter: Filter3<F>
}
```

Added in v2.0.0

## Filterable3C (interface)

**Signature**

```ts
export interface Filterable3C<F extends URIS3, E> {
  readonly URI: F
  readonly partitionMap: <R, A, B, C>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3C<F, E>
  readonly filterMap: <R, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => Option<B>) => Kind3<F, R, E, B>
  readonly filter: Filter3C<F, E>
}
```

Added in v2.2.0

## Filterable4 (interface)

**Signature**

```ts
export interface Filterable4<F extends URIS4> {
  readonly URI: F
  readonly partitionMap: <S, R, E, A, B, C>(
    fa: Kind4<F, S, R, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
  readonly partition: Partition4<F>
  readonly filterMap: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, f: (a: A) => Option<B>) => Kind4<F, S, R, E, B>
  readonly filter: Filter4<F>
}
```

Added in v2.0.0

# utils

## Filter (interface)

**Signature**

```ts
export interface Filter<F> {
  <A, B extends A>(fa: HKT<F, A>, refinement: Refinement<A, B>): HKT<F, B>
  <A>(fa: HKT<F, A>, predicate: Predicate<A>): HKT<F, A>
}
```

Added in v2.0.0

## Filter1 (interface)

**Signature**

```ts
export interface Filter1<F extends URIS> {
  <A, B extends A>(fa: Kind<F, A>, refinement: Refinement<A, B>): Kind<F, B>
  <A>(fa: Kind<F, A>, predicate: Predicate<A>): Kind<F, A>
}
```

Added in v2.0.0

## Filter2 (interface)

**Signature**

```ts
export interface Filter2<F extends URIS2> {
  <E, A, B extends A>(fa: Kind2<F, E, A>, refinement: Refinement<A, B>): Kind2<F, E, B>
  <E, A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Kind2<F, E, A>
}
```

Added in v2.0.0

## Filter2C (interface)

**Signature**

```ts
export interface Filter2C<F extends URIS2, E> {
  <A, B extends A>(fa: Kind2<F, E, A>, refinement: Refinement<A, B>): Kind2<F, E, B>
  <A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Kind2<F, E, A>
}
```

Added in v2.0.0

## Filter3 (interface)

**Signature**

```ts
export interface Filter3<F extends URIS3> {
  <R, E, A, B extends A>(fa: Kind3<F, R, E, A>, refinement: Refinement<A, B>): Kind3<F, R, E, B>
  <R, E, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Kind3<F, R, E, A>
}
```

Added in v2.0.0

## Filter3C (interface)

**Signature**

```ts
export interface Filter3C<F extends URIS3, E> {
  <R, A, B extends A>(fa: Kind3<F, R, E, A>, refinement: Refinement<A, B>): Kind3<F, R, E, B>
  <R, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Kind3<F, R, E, A>
}
```

Added in v2.2.0

## Filter4 (interface)

**Signature**

```ts
export interface Filter4<F extends URIS4> {
  <S, R, E, A, B extends A>(fa: Kind4<F, S, R, E, A>, refinement: Refinement<A, B>): Kind4<F, S, R, E, B>
  <S, R, E, A>(fa: Kind4<F, S, R, E, A>, predicate: Predicate<A>): Kind4<F, S, R, E, A>
}
```

Added in v2.0.0

## Partition (interface)

**Signature**

```ts
export interface Partition<F> {
  <A, B extends A>(fa: HKT<F, A>, refinement: Refinement<A, B>): Separated<HKT<F, A>, HKT<F, B>>
  <A>(fa: HKT<F, A>, predicate: Predicate<A>): Separated<HKT<F, A>, HKT<F, A>>
}
```

Added in v2.0.0

## Partition1 (interface)

**Signature**

```ts
export interface Partition1<F extends URIS> {
  <A, B extends A>(fa: Kind<F, A>, refinement: Refinement<A, B>): Separated<Kind<F, A>, Kind<F, B>>
  <A>(fa: Kind<F, A>, predicate: Predicate<A>): Separated<Kind<F, A>, Kind<F, A>>
}
```

Added in v2.0.0

## Partition2 (interface)

**Signature**

```ts
export interface Partition2<F extends URIS2> {
  <E, A, B extends A>(fa: Kind2<F, E, A>, refinement: Refinement<A, B>): Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <E, A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}
```

Added in v2.0.0

## Partition2C (interface)

**Signature**

```ts
export interface Partition2C<F extends URIS2, E> {
  <A, B extends A>(fa: Kind2<F, E, A>, refinement: Refinement<A, B>): Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}
```

Added in v2.0.0

## Partition3 (interface)

**Signature**

```ts
export interface Partition3<F extends URIS3> {
  <R, E, A, B extends A>(fa: Kind3<F, R, E, A>, refinement: Refinement<A, B>): Separated<
    Kind3<F, R, E, A>,
    Kind3<F, R, E, B>
  >
  <R, E, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}
```

Added in v2.0.0

## Partition3C (interface)

**Signature**

```ts
export interface Partition3C<F extends URIS3, E> {
  <R, A, B extends A>(fa: Kind3<F, R, E, A>, refinement: Refinement<A, B>): Separated<
    Kind3<F, R, E, A>,
    Kind3<F, R, E, B>
  >
  <R, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}
```

Added in v2.2.0

## Partition4 (interface)

**Signature**

```ts
export interface Partition4<F extends URIS4> {
  <S, R, E, A, B extends A>(fa: Kind4<F, S, R, E, A>, refinement: Refinement<A, B>): Separated<
    Kind4<F, S, R, E, A>,
    Kind4<F, S, R, E, B>
  >
  <S, R, E, A>(fa: Kind4<F, S, R, E, A>, predicate: Predicate<A>): Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
}
```

Added in v2.0.0
