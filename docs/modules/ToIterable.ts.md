---
title: ToIterable.ts
nav_order: 81
parent: Modules
---

## ToIterable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [folding](#folding)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [model](#model)
  - [ToIterable (interface)](#toiterable-interface)
- [utils](#utils)
  - [toIterableComposition](#toiterablecomposition)

---

# folding

## foldMap

Returns a default `foldMap` implementation.

**Signature**

```ts
export declare const foldMap: <F extends TypeLambda>(
  Foldable: ToIterable<F>
) => <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => M
```

Added in v3.0.0

## reduce

Returns a default `reduce` implementation.

**Signature**

```ts
export declare const reduce: <F extends TypeLambda>(
  Foldable: ToIterable<F>
) => <B, A>(b: B, f: (b: B, a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
```

Added in v3.0.0

## reduceRight

Returns a default `reduceRight` implementation.

**Signature**

```ts
export declare const reduceRight: <F extends TypeLambda>(
  Foldable: ToIterable<F>
) => <B, A>(b: B, f: (a: A, b: B) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
```

Added in v3.0.0

# model

## ToIterable (interface)

**Signature**

```ts
export interface ToIterable<F extends TypeLambda> extends TypeClass<F> {
  readonly toIterable: <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Iterable<A>
}
```

Added in v3.0.0

# utils

## toIterableComposition

Returns a default `toIterable` composition.

**Signature**

```ts
export declare const toIterableComposition: <F extends TypeLambda, G extends TypeLambda>(
  FoldableF: ToIterable<F>,
  FoldableG: ToIterable<G>
) => <FS, FR, FO, FE, GS, GR, GO, GE, A>(self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => Iterable<A>
```

Added in v3.0.0
