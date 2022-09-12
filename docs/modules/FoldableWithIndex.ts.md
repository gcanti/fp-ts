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
export declare function foldMapWithIndex<F extends HKT, I, G extends HKT, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
): FoldableWithIndex<ComposeF<F, G>, readonly [I, J]>['foldMapWithIndex']
```

Added in v3.0.0

## reduceRightWithIndex

`reduceRightWithIndex` composition.

**Signature**

```ts
export declare function reduceRightWithIndex<F extends HKT, I, G extends HKT, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
): FoldableWithIndex<ComposeF<F, G>, readonly [I, J]>['reduceRightWithIndex']
```

Added in v3.0.0

## reduceWithIndex

`reduceWithIndex` composition.

**Signature**

```ts
export declare function reduceWithIndex<F extends HKT, I, G extends HKT, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
): FoldableWithIndex<ComposeF<F, G>, readonly [I, J]>['reduceWithIndex']
```

Added in v3.0.0

# type classes

## FoldableWithIndex (interface)

**Signature**

```ts
export interface FoldableWithIndex<F extends HKT, I> extends Typeclass<F> {
  readonly reduceWithIndex: <B, A>(b: B, f: (i: I, b: B, a: A) => B) => <S, R, E>(fa: Kind<F, S, R, E, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <S, R, E>(fa: Kind<F, S, R, E, A>) => M
  readonly reduceRightWithIndex: <B, A>(b: B, f: (i: I, a: A, b: B) => B) => <S, R, E>(fa: Kind<F, S, R, E, A>) => B
}
```

Added in v3.0.0
