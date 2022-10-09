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
  - [foldMapWithIndex](#foldmapwithindex)
  - [reduce](#reduce)
  - [reduceKind](#reducekind)
  - [reduceRight](#reduceright)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
- [model](#model)
  - [ToIterable (interface)](#toiterable-interface)
- [utils](#utils)
  - [toIterableComposition](#toiterablecomposition)

---

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: <F extends TypeLambda>(
  ToIterable: ToIterable<F>
) => <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => M
```

Added in v3.0.0

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <F extends TypeLambda>(
  ToIterable: ToIterable<F>
) => <M>(Monoid: Monoid<M>) => <A>(f: (i: number, a: A) => M) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <F extends TypeLambda>(
  ToIterable: ToIterable<F>
) => <B, A>(b: B, f: (b: B, a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
```

Added in v3.0.0

## reduceKind

**Signature**

```ts
export declare const reduceKind: <T extends TypeLambda>(
  ToIterable: ToIterable<T>
) => <F extends TypeLambda>(
  Flattenable: Flattenable<F>
) => <S, R, O, E, B, A>(
  fb: Kind<F, S, R, O, E, B>,
  f: (b: B, a: A) => Kind<F, S, R, O, E, B>
) => <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, B>
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <F extends TypeLambda>(
  ToIterable: ToIterable<F>
) => <B, A>(b: B, f: (a: A, b: B) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
```

Added in v3.0.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <F extends TypeLambda>(
  ToIterable: ToIterable<F>
) => <B, A>(b: B, f: (i: number, a: A, b: B) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
```

Added in v3.0.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <F extends TypeLambda>(
  ToIterable: ToIterable<F>
) => <B, A>(b: B, f: (i: number, b: B, a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
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
