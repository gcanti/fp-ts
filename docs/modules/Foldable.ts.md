---
title: Foldable.ts
nav_order: 34
parent: Modules
---

## Foldable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [folding](#folding)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [model](#model)
  - [Foldable (interface)](#foldable-interface)
- [utils](#utils)
  - [toIterableComposition](#toiterablecomposition)

---

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: <F extends TypeLambda>(
  Foldable: Foldable<F>
) => <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <F extends TypeLambda>(
  Foldable: Foldable<F>
) => <B, A>(b: B, f: (b: B, a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <F extends TypeLambda>(
  Foldable: Foldable<F>
) => <B, A>(b: B, f: (a: A, b: B) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
```

Added in v3.0.0

# model

## Foldable (interface)

**Signature**

```ts
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
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
  FoldableF: Foldable<F>,
  FoldableG: Foldable<G>
) => <FS, FR, FO, FE, GS, GR, GO, GE, A>(self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => Iterable<A>
```

Added in v3.0.0
