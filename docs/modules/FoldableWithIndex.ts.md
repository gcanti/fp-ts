---
title: FoldableWithIndex.ts
nav_order: 26
parent: Modules
---

## FoldableWithIndex overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [folding](#folding)
  - [foldMapWithIndex](#foldmapwithindex)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
- [model](#model)
  - [FoldableWithIndex (interface)](#foldablewithindex-interface)
- [utils](#utils)
  - [toEntriesComposition](#toentriescomposition)

---

# folding

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <F extends TypeLambda, I>(
  FoldableWithIndex: FoldableWithIndex<F, I>
) => <M>(Monoid: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => M
```

Added in v3.0.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <F extends TypeLambda, I>(
  FoldableWithIndex: FoldableWithIndex<F, I>
) => <B, A>(b: B, f: (i: I, a: A, b: B) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
```

Added in v3.0.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <F extends TypeLambda, I>(
  FoldableWithIndex: FoldableWithIndex<F, I>
) => <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
```

Added in v3.0.0

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
