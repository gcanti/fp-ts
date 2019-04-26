---
title: FilterableWithIndex.ts
nav_order: 30
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [FilterableWithIndex (interface)](#filterablewithindex-interface)
- [FilterableWithIndex1 (interface)](#filterablewithindex1-interface)
- [FilterableWithIndex2 (interface)](#filterablewithindex2-interface)
- [FilterableWithIndex2C (interface)](#filterablewithindex2c-interface)
- [FilterableWithIndex3 (interface)](#filterablewithindex3-interface)
- [FilterableWithIndex3C (interface)](#filterablewithindex3c-interface)

---

# FilterableWithIndex (interface)

**Signature**

```ts
export interface FilterableWithIndex<F, I> extends FunctorWithIndex<F, I>, Filterable<F> {
  readonly partitionMapWithIndex: <RL, RR, A>(
    fa: HKT<F, A>,
    f: (i: I, a: A) => Either<RL, RR>
  ) => Separated<HKT<F, RL>, HKT<F, RR>>
  readonly partitionWithIndex: <A>(fa: HKT<F, A>, predicate: (i: I, a: A) => boolean) => Separated<HKT<F, A>, HKT<F, A>>
  readonly filterMapWithIndex: <A, B>(fa: HKT<F, A>, f: (i: I, a: A) => Option<B>) => HKT<F, B>
  readonly filterWithIndex: <A>(fa: HKT<F, A>, predicate: (i: I, a: A) => boolean) => HKT<F, A>
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
  readonly partitionWithIndex: <A>(
    fa: Type<F, A>,
    predicate: (i: I, a: A) => boolean
  ) => Separated<Type<F, A>, Type<F, A>>
  readonly filterMapWithIndex: <A, B>(fa: Type<F, A>, f: (i: I, a: A) => Option<B>) => Type<F, B>
  readonly filterWithIndex: <A>(fa: Type<F, A>, predicate: (i: I, a: A) => boolean) => Type<F, A>
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
  readonly partitionWithIndex: <L, A>(
    fa: Type2<F, L, A>,
    predicate: (i: I, a: A) => boolean
  ) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  readonly filterMapWithIndex: <L, A, B>(fa: Type2<F, L, A>, f: (i: I, a: A) => Option<B>) => Type2<F, L, B>
  readonly filterWithIndex: <L, A>(fa: Type2<F, L, A>, predicate: (i: I, a: A) => boolean) => Type2<F, L, A>
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
  readonly partitionWithIndex: <A>(
    fa: Type2<F, L, A>,
    predicate: (i: I, a: A) => boolean
  ) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  readonly filterMapWithIndex: <A, B>(fa: Type2<F, L, A>, f: (i: I, a: A) => Option<B>) => Type2<F, L, B>
  readonly filterWithIndex: <A>(fa: Type2<F, L, A>, predicate: (i: I, a: A) => boolean) => Type2<F, L, A>
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
  readonly partitionWithIndex: <U, L, A>(
    fa: Type3<F, U, L, A>,
    predicate: (i: I, a: A) => boolean
  ) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
  readonly filterMapWithIndex: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (i: I, a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filterWithIndex: <U, L, A>(fa: Type3<F, U, L, A>, predicate: (i: I, a: A) => boolean) => Type3<F, U, L, A>
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
  readonly partitionWithIndex: <A>(
    fa: Type3<F, U, L, A>,
    predicate: (i: I, a: A) => boolean
  ) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
  readonly filterMapWithIndex: <A, B>(fa: Type3<F, U, L, A>, f: (i: I, a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filterWithIndex: <A>(fa: Type3<F, U, L, A>, predicate: (i: I, a: A) => boolean) => Type3<F, U, L, A>
}
```
