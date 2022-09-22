---
title: Traversable.ts
nav_order: 103
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
  - [getTraverseComposition](#gettraversecomposition)
- [defaults](#defaults)
  - [sequence](#sequence)
- [type classes](#type-classes)
  - [Traversable (interface)](#traversable-interface)

---

# combinators

## getTraverseComposition

`traverse` composition.

**Signature**

```ts
export declare const getTraverseComposition: <F extends HKT, G extends HKT>(
  F: Traversable<F>,
  G: Traversable<G>
) => <H extends HKT>(
  H: Applicative<H>
) => <A, S, R, W, E, B>(
  f: (a: A) => Kind<H, S, R, W, E, B>
) => <FS, FR, FW, FE, GS, GR, GW, GE>(
  fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
) => Kind<H, S, R, W, E, Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>>
```

Added in v3.0.0

# defaults

## sequence

Return a default `sequence` implementation from `traverse`.

**Signature**

```ts
export declare const sequence: <F extends HKT>(
  F: Traversable<F>
) => <G extends HKT>(
  G: Applicative<G>
) => <FS, FR, FW, FE, S, R, W, E, A>(
  fa: Kind<F, FS, FR, FW, FE, Kind<G, S, R, W, E, A>>
) => Kind<G, S, R, W, E, Kind<F, FS, FR, FW, FE, A>>
```

Added in v3.0.0

# type classes

## Traversable (interface)

**Signature**

```ts
export interface Traversable<F extends HKT> extends Typeclass<F> {
  readonly traverse: <G extends HKT>(
    G: Applicative<G>
  ) => <A, S, R, W, E, B>(
    f: (a: A) => Kind<G, S, R, W, E, B>
  ) => <FS, FR, FW, FE>(fa: Kind<F, FS, FR, FW, FE, A>) => Kind<G, S, R, W, E, Kind<F, FS, FR, FW, FE, B>>
}
```

Added in v3.0.0
