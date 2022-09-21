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

- [defaults](#defaults)
  - [filterMapEDefault](#filtermapedefault)
  - [partitionMapEDefault](#partitionmapedefault)
- [type classes](#type-classes)
  - [FilterableE (interface)](#filterablee-interface)
- [utils](#utils)
  - [filterE](#filtere)

---

# defaults

## filterMapEDefault

Return a `filterMapE` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function filterMapEDefault<T extends HKT>(
  T: Traversable<T>,
  C: Compactable<T>
): FilterableE<T>['filterMapE']
```

Added in v3.0.0

## partitionMapEDefault

Return a `partitionMapE` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function partitionMapEDefault<T extends HKT>(
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
  ) => Kind<F, S, R, W, E, Separated<Kind<T, TS, TR, TW, TE, B>, Kind<T, TS, TR, TW, TE, C>>>
  readonly filterMapE: <F extends HKT>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B>(
    f: (a: A) => Kind<F, S, R, W, E, Option<B>>
  ) => <TS, TR, TW, TE>(ta: Kind<T, TS, TR, TW, TE, A>) => Kind<F, S, R, W, E, Kind<T, TS, TR, TW, TE, B>>
}
```

Added in v3.0.0

# utils

## filterE

Filter values inside a `F` context.

See `ReadonlyArray`'s `filterE` for an example of usage.

**Signature**

```ts
export declare const filterE: <F extends HKT>(
  F: FilterableE<F>
) => <G extends HKT>(
  G: Applicative<G>
) => <B extends A, GS, GR, GW, GE, A = B>(
  predicateK: (a: A) => Kind<G, GS, GR, GW, GE, boolean>
) => <FS, FR, FW, FE>(fb: Kind<F, FS, FR, FW, FE, B>) => Kind<G, GS, GR, GW, GE, Kind<F, FS, FR, FW, FE, B>>
```

Added in v3.0.0
