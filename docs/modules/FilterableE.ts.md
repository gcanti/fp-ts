---
title: FilterableE.ts
nav_order: 27
parent: Modules
---

## FilterableE overview

`FilterableE` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [filterE](#filtere)
  - [partitionE](#partitione)
- [defaults](#defaults)
  - [getDefaultFilterMapE](#getdefaultfiltermape)
  - [getDefaultPartitionMapE](#getdefaultpartitionmape)
- [type classes](#type-classes)
  - [FilterableE (interface)](#filterablee-interface)

---

# combinators

## filterE

Filter values inside a `F` context.

**Signature**

```ts
export declare const filterE: <μ extends HKT>(
  FilterableEμ: FilterableE<μ>
) => <λ extends HKT>(
  Applicativeλ: Applicative<λ>
) => <B extends A, S, R, O, E, A = B>(
  predicateK: (a: A) => Kind<λ, S, R, O, E, boolean>
) => <μS, μR, μW, μE>(self: Kind<μ, μS, μR, μW, μE, B>) => Kind<λ, S, R, O, E, Kind<μ, μS, μR, μW, μE, B>>
```

Added in v3.0.0

## partitionE

Partition values inside a `F` context.

**Signature**

```ts
export declare const partitionE: <μ extends HKT>(
  FilterableEμ: FilterableE<μ>
) => <λ extends HKT>(
  Applicativeλ: Applicative<λ>
) => <B extends A, S, R, O, E, A = B>(
  predicateK: (a: A) => Kind<λ, S, R, O, E, boolean>
) => <μS, μR, μW, μE>(
  self: Kind<μ, μS, μR, μW, μE, B>
) => Kind<λ, S, R, O, E, readonly [Kind<μ, μS, μR, μW, μE, B>, Kind<μ, μS, μR, μW, μE, B>]>
```

Added in v3.0.0

# defaults

## getDefaultFilterMapE

Return a `filterMapE` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function getDefaultFilterMapE<T extends HKT>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableE<T>['filterMapE']
```

Added in v3.0.0

## getDefaultPartitionMapE

Return a `partitionMapE` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function getDefaultPartitionMapE<T extends HKT>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableE<T>['partitionMapE']
```

Added in v3.0.0

# type classes

## FilterableE (interface)

**Signature**

```ts
export interface FilterableE<T extends HKT> extends Typeclass<T> {
  readonly partitionMapE: <F extends HKT>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B, C>(
    f: (a: A) => Kind<F, S, R, W, E, Either<B, C>>
  ) => <TS, TR, TW, TE>(
    wa: Kind<T, TS, TR, TW, TE, A>
  ) => Kind<F, S, R, W, E, readonly [Kind<T, TS, TR, TW, TE, B>, Kind<T, TS, TR, TW, TE, C>]>
  readonly filterMapE: <F extends HKT>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B>(
    f: (a: A) => Kind<F, S, R, W, E, Option<B>>
  ) => <TS, TR, TW, TE>(ta: Kind<T, TS, TR, TW, TE, A>) => Kind<F, S, R, W, E, Kind<T, TS, TR, TW, TE, B>>
}
```

Added in v3.0.0
