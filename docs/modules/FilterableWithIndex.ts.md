---
title: FilterableWithIndex.ts
nav_order: 31
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [FilterWithIndex4 (interface)](#filterwithindex4-interface)
- [FilterableWithIndex (interface)](#filterablewithindex-interface)
- [FilterableWithIndex1 (interface)](#filterablewithindex1-interface)
- [FilterableWithIndex2 (interface)](#filterablewithindex2-interface)
- [FilterableWithIndex2C (interface)](#filterablewithindex2c-interface)
- [FilterableWithIndex3 (interface)](#filterablewithindex3-interface)
- [FilterableWithIndex3C (interface)](#filterablewithindex3c-interface)
- [FilterableWithIndex4 (interface)](#filterablewithindex4-interface)
- [PartitionWithIndex4 (interface)](#partitionwithindex4-interface)
- [PredicateWithIndex (type alias)](#predicatewithindex-type-alias)
- [RefinementWithIndex (type alias)](#refinementwithindex-type-alias)

---

# FilterWithIndex4 (interface)

**Signature**

```ts
export interface FilterWithIndex4<F extends URIS4, I> {
  <X, U, L, A, B extends A>(fa: Type4<F, X, U, L, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): Type4<
    F,
    X,
    U,
    L,
    B
  >
  <X, U, L, A>(fa: Type4<F, X, U, L, A>, predicateWithIndex: PredicateWithIndex<I, A>): Type4<F, X, U, L, A>
}
```

# FilterableWithIndex (interface)

**Signature**

```ts
export interface FilterableWithIndex<F, I> extends FunctorWithIndex<F, I>, Filterable<F> {
  readonly partitionMapWithIndex: <RL, RR, A>(
    fa: HKT<F, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<HKT<F, RL>, HKT<F, RR>>
  readonly partitionWithIndex: PartitionWithIndex<F, I>
  readonly filterMapWithIndex: <A, B>(fa: HKT<F, A>, f: (i: I, a: A) => Option<B>) => HKT<F, B>
  readonly filterWithIndex: FilterWithIndex<F, I>
}
```

Added in v1.12.0

# FilterableWithIndex1 (interface)

**Signature**

```ts
export interface FilterableWithIndex1<F extends URIS, I> extends FunctorWithIndex1<F, I>, Filterable1<F> {
  readonly partitionMapWithIndex: <RL, RR, A>(
    fa: Type<F, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<Type<F, RL>, Type<F, RR>>
  readonly partitionWithIndex: PartitionWithIndex1<F, I>
  readonly filterMapWithIndex: <A, B>(fa: Type<F, A>, f: (i: I, a: A) => Option<B>) => Type<F, B>
  readonly filterWithIndex: FilterWithIndex1<F, I>
}
```

# FilterableWithIndex2 (interface)

**Signature**

```ts
export interface FilterableWithIndex2<F extends URIS2, I> extends FunctorWithIndex2<F, I>, Filterable2<F> {
  readonly partitionMapWithIndex: <RL, RR, L, A>(
    fa: Type2<F, L, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partitionWithIndex: PartitionWithIndex2<F, I>
  readonly filterMapWithIndex: <L, A, B>(fa: Type2<F, L, A>, f: (i: I, a: A) => Option<B>) => Type2<F, L, B>
  readonly filterWithIndex: FilterWithIndex2<F, I>
}
```

# FilterableWithIndex2C (interface)

**Signature**

```ts
export interface FilterableWithIndex2C<F extends URIS2, I, L> extends FunctorWithIndex2C<F, I, L>, Filterable2C<F, L> {
  readonly partitionMapWithIndex: <RL, RR, A>(
    fa: Type2<F, L, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partitionWithIndex: PartitionWithIndex2C<F, I, L>
  readonly filterMapWithIndex: <A, B>(fa: Type2<F, L, A>, f: (i: I, a: A) => Option<B>) => Type2<F, L, B>
  readonly filterWithIndex: FilterWithIndex2C<F, I, L>
}
```

# FilterableWithIndex3 (interface)

**Signature**

```ts
export interface FilterableWithIndex3<F extends URIS3, I> extends FunctorWithIndex3<F, I>, Filterable3<F> {
  readonly partitionMapWithIndex: <RL, RR, U, L, A>(
    fa: Type3<F, U, L, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly partitionWithIndex: PartitionWithIndex3<F, I>
  readonly filterMapWithIndex: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (i: I, a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filterWithIndex: FilterWithIndex3<F, I>
}
```

# FilterableWithIndex3C (interface)

**Signature**

```ts
export interface FilterableWithIndex3C<F extends URIS3, I, U, L>
  extends FunctorWithIndex3C<F, I, U, L>,
    Filterable3C<F, U, L> {
  readonly partitionMapWithIndex: <RL, RR, A>(
    fa: Type3<F, U, L, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly partitionWithIndex: PartitionWithIndex3C<F, I, U, L>
  readonly filterMapWithIndex: <A, B>(fa: Type3<F, U, L, A>, f: (i: I, a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filterWithIndex: FilterWithIndex3C<F, I, U, L>
}
```

# FilterableWithIndex4 (interface)

**Signature**

```ts
export interface FilterableWithIndex4<F extends URIS4, I> extends FunctorWithIndex4<F, I>, Filterable4<F> {
  readonly partitionMapWithIndex: <RL, RR, X, U, L, A>(
    fa: Type4<F, X, U, L, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<Type4<F, X, U, L, RL>, Type4<F, X, U, L, RR>>
  readonly partitionWithIndex: PartitionWithIndex4<F, I>
  readonly filterMapWithIndex: <X, U, L, A, B>(
    fa: Type4<F, X, U, L, A>,
    f: (i: I, a: A) => Option<B>
  ) => Type4<F, X, U, L, B>
  readonly filterWithIndex: FilterWithIndex4<F, I>
}
```

# PartitionWithIndex4 (interface)

**Signature**

```ts
export interface PartitionWithIndex4<F extends URIS4, I> {
  <X, U, L, A, B extends A>(fa: Type4<F, X, U, L, A>, refinementWithIndex: RefinementWithIndex<I, A, B>): Separated<
    Type4<F, X, U, L, A>,
    Type4<F, X, U, L, B>
  >
  <X, U, L, A>(fa: Type4<F, X, U, L, A>, predicateWithIndex: PredicateWithIndex<I, A>): Separated<
    Type4<F, X, U, L, A>,
    Type4<F, X, U, L, A>
  >
}
```

# PredicateWithIndex (type alias)

**Signature**

```ts
export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean
```

# RefinementWithIndex (type alias)

**Signature**

```ts
export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B
```
