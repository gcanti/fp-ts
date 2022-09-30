---
title: FilterableKind.ts
nav_order: 27
parent: Modules
---

## FilterableKind overview

`FilterableKind` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [defaults](#defaults)
  - [getDefaultFilterMapKind](#getdefaultfiltermapkind)
  - [getDefaultPartitionMapKind](#getdefaultpartitionmapkind)
- [derivations](#derivations)
  - [getFilterKindDerivation](#getfilterkindderivation)
  - [getPartitionKindDerivation](#getpartitionkindderivation)
- [model](#model)
  - [FilterableKind (interface)](#filterablekind-interface)

---

# defaults

## getDefaultFilterMapKind

Return a `filterMapKind` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function getDefaultFilterMapKind<T extends TypeLambda>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableKind<T>['filterMapKind']
```

Added in v3.0.0

## getDefaultPartitionMapKind

Return a `partitionMapKind` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function getDefaultPartitionMapKind<T extends TypeLambda>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableKind<T>['partitionMapKind']
```

Added in v3.0.0

# derivations

## getFilterKindDerivation

Filter values inside a `F` context.

**Signature**

```ts
export declare const getFilterKindDerivation: <G extends TypeLambda>(
  FilterableKindG: FilterableKind<G>
) => <F extends TypeLambda>(
  Applicative: Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, S, R, O, E, boolean>
) => <GS, GR, GO, GE>(self: Kind<G, GS, GR, GO, GE, B>) => Kind<F, S, R, O, E, Kind<G, GS, GR, GO, GE, B>>
```

Added in v3.0.0

## getPartitionKindDerivation

Partition values inside a `F` context.

**Signature**

```ts
export declare const getPartitionKindDerivation: <G extends TypeLambda>(
  FilterableKindG: FilterableKind<G>
) => <F extends TypeLambda>(
  Applicative: Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, S, R, O, E, boolean>
) => <GS, GR, GO, GE>(
  self: Kind<G, GS, GR, GO, GE, B>
) => Kind<F, S, R, O, E, readonly [Kind<G, GS, GR, GO, GE, B>, Kind<G, GS, GR, GO, GE, B>]>
```

Added in v3.0.0

# model

## FilterableKind (interface)

**Signature**

```ts
export interface FilterableKind<T extends TypeLambda> extends TypeClass<T> {
  readonly partitionMapKind: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, O, E, B, C>(
    f: (a: A) => Kind<F, S, R, O, E, Either<B, C>>
  ) => <TS, TR, TO, TE>(
    wa: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, readonly [Kind<T, TS, TR, TO, TE, B>, Kind<T, TS, TR, TO, TE, C>]>
  readonly filterMapKind: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, Option<B>>
  ) => <TS, TR, TO, TE>(ta: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}
```

Added in v3.0.0
