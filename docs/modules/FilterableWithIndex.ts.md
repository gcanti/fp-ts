---
title: FilterableWithIndex.ts
nav_order: 33
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [FilterableWithIndex (interface)](#filterablewithindex-interface)
- [FilterableWithIndex1 (interface)](#filterablewithindex1-interface)
- [FilterableWithIndex2 (interface)](#filterablewithindex2-interface)
- [FilterableWithIndex2C (interface)](#filterablewithindex2c-interface)
- [FilterableWithIndex3 (interface)](#filterablewithindex3-interface)

---

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

Added in v2.0.0

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
