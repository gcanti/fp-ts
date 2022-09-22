---
title: FilterableWithIndex.ts
nav_order: 28
parent: Modules
---

## FilterableWithIndex overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [filterWithIndex](#filterwithindex)
  - [partitionWithIndex](#partitionwithindex)
  - [refineWithIndex](#refinewithindex)
  - [refinementWithIndex](#refinementwithindex)
- [type classes](#type-classes)
  - [FilterableWithIndex (interface)](#filterablewithindex-interface)

---

# combinators

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: <F extends HKT, I>(
  F: FilterableWithIndex<F, I>
) => <B extends A, A = B>(
  predicate: (i: I, a: A) => boolean
) => <S, R, W, E>(fb: Kind<F, S, R, W, E, B>) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: <F extends HKT, I>(
  F: FilterableWithIndex<F, I>
) => <B extends A, A = B>(
  predicate: (i: I, a: A) => boolean
) => <S, R, W, E>(fb: Kind<F, S, R, W, E, B>) => readonly [Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, B>]
```

Added in v3.0.0

## refineWithIndex

**Signature**

```ts
export declare const refineWithIndex: <F extends HKT, I>(
  F: FilterableWithIndex<F, I>
) => <C extends A, B extends A, A = C>(
  refinement: (i: I, a: A) => a is B
) => <S, R, W, E>(fc: Kind<F, S, R, W, E, C>) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

## refinementWithIndex

**Signature**

```ts
export declare const refinementWithIndex: <F extends HKT, I>(
  F: FilterableWithIndex<F, I>
) => <C extends A, B extends A, A = C>(
  refinement: (i: I, a: A) => a is B
) => <S, R, W, E>(fb: Kind<F, S, R, W, E, C>) => readonly [Kind<F, S, R, W, E, C>, Kind<F, S, R, W, E, B>]
```

Added in v3.0.0

# type classes

## FilterableWithIndex (interface)

**Signature**

```ts
export interface FilterableWithIndex<F extends HKT, I> extends Typeclass<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => readonly [Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, C>]
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}
```

Added in v3.0.0
