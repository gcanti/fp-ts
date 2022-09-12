---
title: FunctorWithIndex.ts
nav_order: 43
parent: Modules
---

## FunctorWithIndex overview

A `FunctorWithIndex` is a type constructor which supports a mapping operation `mapWithIndex`.

`mapWithIndex` can be used to turn functions `i -> a -> b` into functions `f a -> f b` whose argument and return types use the type
constructor `f` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.mapWithIndex((_i, a) => a) <-> fa`
2. Composition: `F.mapWithIndex((_i, a) => bc(ab(a))) <-> flow(F.mapWithIndex((_i, a) => ab(a)), F.mapWithIndex((_i, b) => bc(b)))`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [mapWithIndex](#mapwithindex)
- [type classes](#type-classes)
  - [FunctorWithIndex (interface)](#functorwithindex-interface)

---

# combinators

## mapWithIndex

`mapWithIndex` composition.

**Signature**

```ts
export declare function mapWithIndex<F extends HKT, I, G extends HKT, J>(
  F: FunctorWithIndex<F, I>,
  G: FunctorWithIndex<G, J>
): FunctorWithIndex<ComposeF<F, G>, [I, J]>['mapWithIndex']
```

Added in v3.0.0

# type classes

## FunctorWithIndex (interface)

**Signature**

```ts
export interface FunctorWithIndex<F extends HKT, I> extends Typeclass<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, B>
}
```

Added in v3.0.0
