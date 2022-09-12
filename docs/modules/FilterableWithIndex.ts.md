---
title: FilterableWithIndex.ts
nav_order: 31
parent: Modules
---

## FilterableWithIndex overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [FilterableWithIndex (interface)](#filterablewithindex-interface)
- [utils](#utils)
  - [PredicateWithIndex (type alias)](#predicatewithindex-type-alias)
  - [RefinementWithIndex (type alias)](#refinementwithindex-type-alias)

---

# type classes

## FilterableWithIndex (interface)

**Signature**

```ts
export interface FilterableWithIndex<F extends HKT, I> extends Typeclass<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Separated<Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, C>>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <S, R, W, E>(
      fa: Kind<F, S, R, W, E, A>
    ) => Separated<Kind<F, S, R, W, E, A>, Kind<F, S, R, W, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, W, E, B extends A>(
      fb: Kind<F, S, R, W, E, B>
    ) => Separated<Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, W, E>(
      fa: Kind<F, S, R, W, E, A>
    ) => Separated<Kind<F, S, R, W, E, A>, Kind<F, S, R, W, E, A>>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <S, R, W, E>(
      fa: Kind<F, S, R, W, E, A>
    ) => Kind<F, S, R, W, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, W, E, B extends A>(
      fb: Kind<F, S, R, W, E, B>
    ) => Kind<F, S, R, W, E, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, W, E>(
      fa: Kind<F, S, R, W, E, A>
    ) => Kind<F, S, R, W, E, A>
  }
}
```

Added in v3.0.0

# utils

## PredicateWithIndex (type alias)

**Signature**

```ts
export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean
```

Added in v3.0.0

## RefinementWithIndex (type alias)

**Signature**

```ts
export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B
```

Added in v3.0.0
