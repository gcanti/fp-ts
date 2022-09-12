---
title: Witherable.ts
nav_order: 111
parent: Modules
---

## Witherable overview

`Witherable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [defaults](#defaults)
  - [wiltDefault](#wiltdefault)
  - [witherDefault](#witherdefault)
- [type classes](#type-classes)
  - [Witherable (interface)](#witherable-interface)
- [utils](#utils)
  - [filterE](#filtere)

---

# defaults

## wiltDefault

Return a `wilt` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function wiltDefault<T extends HKT>(T: Traversable<T>, C: Compactable<T>): Witherable<T>['wilt']
```

Added in v3.0.0

## witherDefault

Return a `wither` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function witherDefault<T extends HKT>(T: Traversable<T>, C: Compactable<T>): Witherable<T>['wither']
```

Added in v3.0.0

# type classes

## Witherable (interface)

**Signature**

```ts
export interface Witherable<T extends HKT> extends Typeclass<T> {
  readonly wilt: <F extends HKT>(
    F: Applicative<F>
  ) => <A, S, R, E, B, C>(
    f: (a: A) => Kind<F, S, R, E, Either<B, C>>
  ) => <TS, TR, TE>(
    wa: Kind<T, TS, TR, TE, A>
  ) => Kind<F, S, R, E, Separated<Kind<T, TS, TR, TE, B>, Kind<T, TS, TR, TE, C>>>
  readonly wither: <F extends HKT>(
    F: Applicative<F>
  ) => <A, S, R, E, B>(
    f: (a: A) => Kind<F, S, R, E, Option<B>>
  ) => <TS, TR, TE>(ta: Kind<T, TS, TR, TE, A>) => Kind<F, S, R, E, Kind<T, TS, TR, TE, B>>
}
```

Added in v3.0.0

# utils

## filterE

Filter values inside a `F` context.

See `ReadonlyArray`'s `filterE` for an example of usage.

**Signature**

```ts
export declare function filterE<T extends HKT>(
  T: Witherable<T>
): <F extends HKT>(
  F: Applicative<F>
) => <A, S, R, E>(
  predicate: (a: A) => Kind<F, S, R, E, boolean>
) => <TS, TR, TE>(ga: Kind<T, TS, TR, TE, A>) => Kind<F, S, R, E, Kind<T, TS, TR, TE, A>>
```

Added in v3.0.0
