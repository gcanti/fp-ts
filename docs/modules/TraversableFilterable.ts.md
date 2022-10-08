---
title: TraversableFilterable.ts
nav_order: 102
parent: Modules
---

## TraversableFilterable overview

`TraversableFilterable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [TraversableFilterable (interface)](#traversablefilterable-interface)
- [utils](#utils)
  - [traverseFilter](#traversefilter)
  - [traverseFilterMap](#traversefiltermap)
  - [traversePartition](#traversepartition)
  - [traversePartitionMap](#traversepartitionmap)

---

# model

## TraversableFilterable (interface)

**Signature**

```ts
export interface TraversableFilterable<T extends TypeLambda> extends TypeClass<T> {
  readonly traversePartitionMap: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B, C>(
    f: (a: A) => Kind<F, S, R, O, E, Result<B, C>>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, C>]>
  readonly traverseFilterMap: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, Option<B>>
  ) => <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}
```

Added in v3.0.0

# utils

## traverseFilter

Returns a default `traverseFilter` implementation.

**Signature**

```ts
export declare const traverseFilter: <T extends TypeLambda>(
  TraversableFilterable: TraversableFilterable<T>
) => <F extends TypeLambda>(
  Applicative: Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, S, R, O, E, boolean>
) => <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, B>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
```

Added in v3.0.0

## traverseFilterMap

Returns a default `traverseFilterMap` implementation.

**Signature**

```ts
export declare const traverseFilterMap: <T extends TypeLambda>(
  Traversable: Traversable<T>,
  Compactable: Compactable<T>
) => <F>(
  Applicative: Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, Option<B>>
) => <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
```

Added in v3.0.0

## traversePartition

Returns a default `traversePartition` implementation.

**Signature**

```ts
export declare const traversePartition: <T extends TypeLambda>(
  TraversableFilterable: TraversableFilterable<T>
) => <F extends TypeLambda>(
  Applicative: Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, S, R, O, E, boolean>
) => <TS, TR, TO, TE>(
  self: Kind<T, TS, TR, TO, TE, B>
) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, B>]>
```

Added in v3.0.0

## traversePartitionMap

Returns a default `traversePartitionMap` implementation.

**Signature**

```ts
export declare const traversePartitionMap: <T extends TypeLambda>(
  Traversable: Traversable<T>,
  Functor: Functor<T>,
  Compactable: Compactable<T>
) => <F>(
  Applicative: Applicative<F>
) => <A, S, R, O, E, B, C>(
  f: (a: A) => Kind<F, S, R, O, E, Result<B, C>>
) => <TS, TR, TO, TE>(
  self: Kind<T, TS, TR, TO, TE, A>
) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, C>]>
```

Added in v3.0.0
