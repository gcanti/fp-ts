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
export declare function traverse<F extends HKT, G extends HKT>(
  T: Traversable<F>,
  G: Traversable<G>
): Traversable<ComposeF<F, G>>['traverse']
```

Added in v3.0.0

# type classes

## Traversable (interface)

**Signature**

```ts
export interface Traversable<T extends HKT> extends Functor<T> {
  readonly traverse: <F extends HKT>(
    F: Applicative<F>
  ) => <A, S, R, E, B, TS, TR, TE>(
    f: (a: A) => Kind<F, S, R, E, B>
  ) => (ta: Kind<T, TS, TR, TE, A>) => Kind<F, S, R, E, Kind<T, TS, TR, TE, B>>
}
```

Added in v3.0.0
