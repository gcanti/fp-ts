---
id: FoldableWithIndex
title: Module FoldableWithIndex
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/FoldableWithIndex.ts)

# FoldableWithIndex

**Signature** (type class)

```ts
export interface FoldableWithIndex<F, I> extends Foldable2v<F> {
  readonly reduceWithIndex: <A, B>(fa: HKT<F, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: HKT<F, A>, f: (i: I, a: A) => M) => M
  readonly foldrWithIndex: <A, B>(fa: HKT<F, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

A [Foldable](./Foldable.md) with an additional index.
A `FoldableWithIndex` instance must be compatible with its [Foldable](./Foldable.md) instance

```ts
reduce(fa, b, f) = reduceWithIndex(fa, b, (_, b, a) => f(b, a))
foldMap(M)(fa, f) = foldMapWithIndex(M)(fa, (_, a) => f(a))
foldr(fa, b, f) = foldrWithIndex(fa, b, (_, a, b) => f(a, b))
```

Added in v1.12.0

## getFoldableWithIndexComposition

**Signature** (function)

```ts
export function getFoldableWithIndexComposition<F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
): FoldableWithIndexComposition<F, FI, G, GI>  { ... }
```

Added in v1.12.0
