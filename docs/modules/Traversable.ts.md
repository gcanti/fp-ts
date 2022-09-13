---
title: Traversable.ts
nav_order: 105
parent: Modules
---

## Traversable overview

`Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
`Applicative` functor.

- `traverse` runs an action for every element in a data structure, and accumulates the results

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [traverse](#traverse)
- [type classes](#type-classes)
  - [Traversable (interface)](#traversable-interface)

---

# combinators

## traverse

`traverse` composition.

**Signature**

```ts
export declare const traverse: <T extends HKT, G extends HKT>(
  T: Traversable<T>,
  G: Traversable<G>
) => <F extends HKT>(
  F: Applicative<F>
) => <A, FS, FR, FW, FE, B>(
  f: (a: A) => Kind<F, FS, FR, FW, FE, B>
) => <TS, TR, TW, TE, GS, GR, GW, GE>(
  tga: Kind<T, TS, TR, TW, TE, Kind<G, GS, GR, GW, GE, A>>
) => Kind<F, FS, FR, FW, FE, Kind<T, TS, TR, TW, TE, Kind<G, GS, GR, GW, GE, B>>>
```

Added in v3.0.0

# type classes

## Traversable (interface)

**Signature**

```ts
export interface Traversable<T extends HKT> extends Functor<T> {
  readonly traverse: <F extends HKT>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B>(
    f: (a: A) => Kind<F, S, R, W, E, B>
  ) => <TS, TR, TW, TE>(ta: Kind<T, TS, TR, TW, TE, A>) => Kind<F, S, R, W, E, Kind<T, TS, TR, TW, TE, B>>
}
```

Added in v3.0.0
