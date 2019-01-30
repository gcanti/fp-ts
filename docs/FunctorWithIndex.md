---
id: FunctorWithIndex
title: Module FunctorWithIndex
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/FunctorWithIndex.ts)

# FunctorWithIndex

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/FunctorWithIndex.ts#L36-L38)

```ts
export interface FunctorWithIndex<F, I> extends Functor<F> {
  readonly mapWithIndex: <A, B>(fa: HKT<F, A>, f: (i: I, a: A) => B) => HKT<F, B>
}
```

A `FunctorWithIndex` is a type constructor which supports a mapping operation `mapWithIndex`.

`mapWithIndex` can be used to turn functions `i -> a -> b` into functions `f a -> f b` whose argument and return types use the type
constructor `f` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.mapWithIndex(fa, (_i, a) => a) = fa`
2. Composition: `F.mapWithIndex(fa, (_i, a) => bc(ab(a))) = F.mapWithIndex(F.mapWithIndex(fa, ab), bc)`

Added in v1.12.0

## getFunctorWithIndexComposition

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/FunctorWithIndex.ts#L156-L164)

```ts
export function getFunctorWithIndexComposition<F, FI, G, GI>(
  F: FunctorWithIndex<F, FI>,
  G: FunctorWithIndex<G, GI>
): FunctorWithIndexComposition<F, FI, G, GI>  { ... }
```

Added in v1.12.0
