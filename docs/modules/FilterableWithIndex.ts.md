---
title: FilterableWithIndex.ts
nav_order: 32
parent: Modules
---

## FilterableWithIndex overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [FilterableWithIndex (interface)](#filterablewithindex-interface)
- [utils](#utils)
  - [filterWithIndex](#filterwithindex)
  - [partitionWithIndex](#partitionwithindex)

---

# model

## FilterableWithIndex (interface)

**Signature**

```ts
export interface FilterableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Result<B, C>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>]
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

# utils

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: <F extends TypeLambda, I>(
  F: FilterableWithIndex<F, I>
) => {
  <C extends A, B extends A, A = C>(refinement: (i: I, a: A) => a is B): <S, R, O, E>(
    fc: Kind<F, S, R, O, E, C>
  ) => Kind<F, S, R, O, E, B>
  <B extends A, A = B>(predicate: (i: I, a: A) => boolean): <S, R, O, E>(
    fb: Kind<F, S, R, O, E, B>
  ) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: <F extends TypeLambda, I>(
  F: FilterableWithIndex<F, I>
) => {
  <C extends A, B extends A, A = C>(refinement: (i: I, a: A) => a is B): <S, R, O, E>(
    fb: Kind<F, S, R, O, E, C>
  ) => readonly [Kind<F, S, R, O, E, C>, Kind<F, S, R, O, E, B>]
  <B extends A, A = B>(predicate: (i: I, a: A) => boolean): <S, R, O, E>(
    fb: Kind<F, S, R, O, E, B>
  ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]
}
```

Added in v3.0.0
