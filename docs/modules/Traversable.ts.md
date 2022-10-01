---
title: Traversable.ts
nav_order: 104
parent: Modules
---

## Traversable overview

`Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
`Applicative` functor.

- `traverse` runs an action for every element in a data structure, and accumulates the results

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Traversable (interface)](#traversable-interface)
- [utils](#utils)
  - [sequence](#sequence)
  - [traverseComposition](#traversecomposition)

---

# model

## Traversable (interface)

**Signature**

```ts
export interface Traversable<F extends TypeLambda> extends TypeClass<F> {
  readonly traverse: <G extends TypeLambda>(
    G: Applicative<G>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<G, S, R, O, E, B>
  ) => <FS, FR, FO, FE>(self: Kind<F, FS, FR, FO, FE, A>) => Kind<G, S, R, O, E, Kind<F, FS, FR, FO, FE, B>>
}
```

Added in v3.0.0

# utils

## sequence

Returns a default `sequence` implementation.

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  Traversable: Traversable<F>
) => <G extends TypeLambda>(
  G: Applicative<G>
) => <FS, FR, FO, FE, S, R, O, E, A>(
  fa: Kind<F, FS, FR, FO, FE, Kind<G, S, R, O, E, A>>
) => Kind<G, S, R, O, E, Kind<F, FS, FR, FO, FE, A>>
```

Added in v3.0.0

## traverseComposition

Returns a default `traverse` composition.

**Signature**

```ts
export declare const traverseComposition: <F extends TypeLambda, G extends TypeLambda>(
  TraversableF: Traversable<F>,
  TraversableG: Traversable<G>
) => <H extends TypeLambda>(
  H: Applicative<H>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<H, S, R, O, E, B>
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<H, S, R, O, E, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>>
```

Added in v3.0.0
