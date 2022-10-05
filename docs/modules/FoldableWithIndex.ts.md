---
title: FoldableWithIndex.ts
nav_order: 33
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
  - [foldMapWithIndexComposition](#foldmapwithindexcomposition)
  - [reduceRightWithIndexComposition](#reducerightwithindexcomposition)
  - [reduceWithIndexComposition](#reducewithindexcomposition)

---

# model

## FoldableWithIndex (interface)

**Signature**

```ts
export interface FoldableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: I, a: A) => M) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
}
```

Added in v3.0.0

# utils

## foldMapWithIndexComposition

Returns a default `foldMapWithIndex` composition.

**Signature**

```ts
export declare const foldMapWithIndexComposition: <F extends TypeLambda, I, G extends TypeLambda, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) => <M>(
  M: Monoid<M>
) => <A>(
  f: (i: readonly [I, J], a: A) => M
) => <FS, FR, FO, FE, GS, GR, GO, GE>(fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => M
```

Added in v3.0.0

## reduceRightWithIndexComposition

Returns a default `reduceRightWithIndex` composition.

**Signature**

```ts
export declare const reduceRightWithIndexComposition: <F extends TypeLambda, I, G extends TypeLambda, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) => <B, A>(
  b: B,
  f: (i: readonly [I, J], a: A, b: B) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => B
```

Added in v3.0.0

## reduceWithIndexComposition

Returns a default `reduceWithIndex` composition.

**Signature**

```ts
export declare const reduceWithIndexComposition: <F extends TypeLambda, I, G extends TypeLambda, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) => <B, A>(
  b: B,
  f: (i: readonly [I, J], b: B, a: A) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => B
```

Added in v3.0.0
