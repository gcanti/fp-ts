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

- [combinators](#combinators)
  - [foldMapWithIndex](#foldmapwithindex)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
- [type classes](#type-classes)
  - [FoldableWithIndex (interface)](#foldablewithindex-interface)

---

# combinators

## foldMapWithIndex

`foldMapWithIndex` composition.

**Signature**

```ts
export declare const foldMapWithIndex: <F extends HKT, I, G extends HKT, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) => <M>(
  M: Monoid<M>
) => <A>(
  f: (i: readonly [I, J], a: A) => M
) => <FS, FR, FW, FE, GS, GR, GW, GE>(fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>) => M
```

Added in v3.0.0

## reduceRightWithIndex

`reduceRightWithIndex` composition.

**Signature**

```ts
export declare const reduceRightWithIndex: <F extends HKT, I, G extends HKT, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) => <B, A>(
  b: B,
  f: (i: readonly [I, J], a: A, b: B) => B
) => <FS, FR, FW, FE, GS, GR, GW, GE>(fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>) => B
```

Added in v3.0.0

## reduceWithIndex

`reduceWithIndex` composition.

**Signature**

```ts
export declare const reduceWithIndex: <F extends HKT, I, G extends HKT, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) => <B, A>(
  b: B,
  f: (i: readonly [I, J], b: B, a: A) => B
) => <FS, FR, FW, FE, GS, GR, GW, GE>(fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>) => B
```

Added in v3.0.0

# type classes

## FoldableWithIndex (interface)

**Signature**

```ts
export interface FoldableWithIndex<F extends HKT, I> extends Typeclass<F> {
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(f: (i: I, a: A) => M) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(
    b: B,
    f: (i: I, a: A, b: B) => B
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => B
}
```

Added in v3.0.0
