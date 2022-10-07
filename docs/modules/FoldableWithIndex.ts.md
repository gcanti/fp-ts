---
title: FoldableWithIndex.ts
nav_order: 35
parent: Modules
---

## FoldableWithIndex overview

A `Foldable` with an additional index.

A `FoldableWithIndex` instance must be compatible with its `Foldable` instance:

```ts
reduce(b, f) = reduceWithIndex(b, (_, b, a) => f(b, a))
foldMap(M)(f) = foldMapWithIndex(M)((_, a) => f(a))
reduceRight(b, f) = reduceRightWithIndex(b, (_, a, b) => f(a, b))
```

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [FoldableWithIndex (interface)](#foldablewithindex-interface)
- [utils](#utils)
  - [toEntriesComposition](#toentriescomposition)

---

# model

## FoldableWithIndex (interface)

**Signature**

```ts
export interface FoldableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly toEntries: <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Iterable<readonly [I, A]>
}
```

Added in v3.0.0

# utils

## toEntriesComposition

Returns a default `toIterable` composition.

**Signature**

```ts
export declare const toEntriesComposition: <F extends TypeLambda, I, G extends TypeLambda, J>(
  FoldableF: FoldableWithIndex<F, I>,
  FoldableG: FoldableWithIndex<G, J>
) => <FS, FR, FO, FE, GS, GR, GO, GE, A>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Iterable<readonly [readonly [I, J], A]>
```

Added in v3.0.0
