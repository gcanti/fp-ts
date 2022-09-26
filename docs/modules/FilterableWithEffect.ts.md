---
title: FilterableWithEffect.ts
nav_order: 27
parent: Modules
---

## FilterableWithEffect overview

`FilterableWithEffect` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [filterWithEffect](#filterwitheffect)
  - [partitionWithEffect](#partitionwitheffect)
- [defaults](#defaults)
  - [getDefaultFilterMapWithEffect](#getdefaultfiltermapwitheffect)
  - [getDefaultPartitionMapWithEffect](#getdefaultpartitionmapwitheffect)
- [type classes](#type-classes)
  - [FilterableWithEffect (interface)](#filterablewitheffect-interface)

---

# combinators

## filterWithEffect

Filter values inside a `F` context.

**Signature**

```ts
export declare const filterWithEffect: <G extends TypeLambda>(
  FilterableWithEffectG: FilterableWithEffect<G>
) => <F extends TypeLambda>(
  ApplicativeF: Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicateK: (a: A) => Kind<F, S, R, O, E, boolean>
) => <GS, GR, GW, GE>(self: Kind<G, GS, GR, GW, GE, B>) => Kind<F, S, R, O, E, Kind<G, GS, GR, GW, GE, B>>
```

Added in v3.0.0

## partitionWithEffect

Partition values inside a `F` context.

**Signature**

```ts
export declare const partitionWithEffect: <G extends TypeLambda>(
  FilterableWithEffectG: FilterableWithEffect<G>
) => <F extends TypeLambda>(
  ApplicativeF: Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicateK: (a: A) => Kind<F, S, R, O, E, boolean>
) => <GS, GR, GW, GE>(
  self: Kind<G, GS, GR, GW, GE, B>
) => Kind<F, S, R, O, E, readonly [Kind<G, GS, GR, GW, GE, B>, Kind<G, GS, GR, GW, GE, B>]>
```

Added in v3.0.0

# defaults

## getDefaultFilterMapWithEffect

Return a `filterMapWithEffect` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function getDefaultFilterMapWithEffect<T extends TypeLambda>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableWithEffect<T>['filterMapWithEffect']
```

Added in v3.0.0

## getDefaultPartitionMapWithEffect

Return a `partitionMapWithEffect` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function getDefaultPartitionMapWithEffect<T extends TypeLambda>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableWithEffect<T>['partitionMapWithEffect']
```

Added in v3.0.0

# type classes

## FilterableWithEffect (interface)

**Signature**

```ts
export interface FilterableWithEffect<T extends TypeLambda> extends TypeClass<T> {
  readonly partitionMapWithEffect: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B, C>(
    f: (a: A) => Kind<F, S, R, W, E, Either<B, C>>
  ) => <TS, TR, TW, TE>(
    wa: Kind<T, TS, TR, TW, TE, A>
  ) => Kind<F, S, R, W, E, readonly [Kind<T, TS, TR, TW, TE, B>, Kind<T, TS, TR, TW, TE, C>]>
  readonly filterMapWithEffect: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B>(
    f: (a: A) => Kind<F, S, R, W, E, Option<B>>
  ) => <TS, TR, TW, TE>(ta: Kind<T, TS, TR, TW, TE, A>) => Kind<F, S, R, W, E, Kind<T, TS, TR, TW, TE, B>>
}
```

Added in v3.0.0
