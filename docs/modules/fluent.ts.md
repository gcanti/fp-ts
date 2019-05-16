---
title: fluent.ts
nav_order: 33
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Fluent (interface)](#fluent-interface)
- [Fluent1 (interface)](#fluent1-interface)
- [Fluent2 (interface)](#fluent2-interface)
- [Fluent3 (interface)](#fluent3-interface)
- [fluent (function)](#fluent-function)

---

# Fluent (interface)

**Signature**

```ts
export interface Fluent<A, F, I> {
  readonly I: I
  readonly value: HKT<F, A>
  readonly pipe: <B>(f: (fa: HKT<F, A>) => HKT<F, B>) => Fluent<F, I, B>
  readonly apply: <R>(f: (fa: HKT<F, A>) => R) => R
  readonly show: (this: { I: Show<HKT<F, A>> }) => string
  readonly equals: (this: { I: Eq<HKT<F, A>> }, that: HKT<F, A>) => boolean
  readonly compare: (this: { I: Ord<HKT<F, A>> }, that: HKT<F, A>) => Ordering
  readonly concat: (this: { I: Magma<HKT<F, A>> }, that: HKT<F, A>) => HKT<F, A>
  readonly map: <B>(this: { I: Functor<F> }, f: (a: A) => B) => Fluent<F, I, B>
  readonly mapWithIndex: <Ix, B>(this: { I: FunctorWithIndex<F, Ix> }, f: (i: Ix, a: A) => B) => Fluent<F, I, B>
  readonly ap: <B>(this: { I: Apply<F> }, fab: HKT<F, (a: A) => B>) => Fluent<F, I, B>
  readonly apFirst: <B>(this: { I: Apply<F> }, that: HKT<F, B>) => Fluent<A, F, I>
  readonly apSecond: <B>(this: { I: Apply<F> }, that: HKT<F, B>) => Fluent<F, I, B>
  readonly chain: <B>(this: { I: Chain<F> }, f: (a: A) => HKT<F, B>) => Fluent<F, I, B>
  readonly flatten: <A>(this: { I: Chain<F>; value: HKT<F, HKT<F, A>> }) => Fluent<A, F, I>
  readonly extend: <B>(this: { I: Extend<F> }, f: (fa: HKT<F, A>) => B) => Fluent<F, I, B>
  readonly duplicate: (this: { I: Extend<F> }) => Fluent<F, I, HKT<F, A>>
  readonly reduce: <B>(this: { I: Foldable<F> }, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(this: { I: Foldable<F> }, M: Monoid<M>) => (f: (a: A) => M) => M
  readonly reduceRight: <B>(this: { I: Foldable<F> }, b: B, f: (a: A, b: B) => B) => B
  readonly reduceWithIndex: <Ix, B>(this: { I: FoldableWithIndex<F, Ix> }, b: B, f: (i: Ix, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <Ix, M>(
    this: { I: FoldableWithIndex<F, Ix> },
    M: Monoid<M>
  ) => (f: (i: Ix, a: A) => M) => M
  readonly reduceRightWithIndex: <Ix, B>(this: { I: FoldableWithIndex<F, Ix> }, b: B, f: (i: Ix, a: A, b: B) => B) => B
  readonly alt: (this: { I: Alt<F> }, that: () => HKT<F, A>) => Fluent<A, F, I>
  readonly compact: <A>(this: { I: Compactable<F>; value: HKT<F, Option<A>> }) => Fluent<A, F, I>
  readonly separate: <A, B>(this: { I: Compactable<F>; value: HKT<F, Either<A, B>> }) => Separated<HKT<F, A>, HKT<F, B>>
  readonly filter: {
    <B extends A>(this: { I: Filterable<F> }, refinement: Refinement<A, B>): Fluent<F, I, B>
    (this: { I: Filterable<F> }, predicate: Predicate<A>): Fluent<A, F, I>
  }
  readonly filterMap: <B>(this: { I: Filterable<F> }, f: (a: A) => Option<B>) => Fluent<F, I, B>
  readonly partition: {
    <B extends A>(this: { I: Filterable<F> }, refinement: Refinement<A, B>): Separated<HKT<F, A>, HKT<F, B>>
    (this: { I: Filterable<F> }, predicate: Predicate<A>): Separated<HKT<F, A>, HKT<F, A>>
  }
  readonly partitionMap: <RL, RR>(
    this: { I: Filterable<F> },
    f: (a: A) => Either<RL, RR>
  ) => Separated<HKT<F, RL>, HKT<F, RR>>
  readonly filterWithIndex: {
    <Ix, B extends A>(this: { I: FilterableWithIndex<F, Ix> }, refinement: RefinementWithIndex<Ix, A, B>): Fluent<
      F,
      I,
      B
    >
    <Ix>(this: { I: FilterableWithIndex<F, Ix> }, predicate: PredicateWithIndex<Ix, A>): Fluent<A, F, I>
  }
  readonly filterMapWithIndex: {
    <Ix, B>(this: { I: FilterableWithIndex<F, Ix> }, f: (i: Ix, a: A) => Option<B>): Fluent<F, I, B>
    <Ix, B extends A>(this: { I: FilterableWithIndex<F, Ix> }, predicate: RefinementWithIndex<Ix, A, B>): Separated<
      HKT<F, A>,
      HKT<F, B>
    >
  }
  readonly partitionWithIndex: <Ix>(
    this: { I: FilterableWithIndex<F, Ix> },
    predicate: PredicateWithIndex<Ix, A>
  ) => Separated<HKT<F, A>, HKT<F, A>>
  readonly partitionMapWithIndex: <Ix, RL, RR>(
    this: { I: FilterableWithIndex<F, Ix> },
    f: (i: Ix, a: A) => Either<RL, RR>
  ) => Separated<HKT<F, RL>, HKT<F, RR>>
}
```

Added in v2.0.0

# Fluent1 (interface)

**Signature**

```ts
export interface Fluent1<A, F extends URIS, I> {
  readonly I: I
  readonly value: Type<F, A>
  readonly pipe: <B>(f: (fa: Type<F, A>) => Type<F, B>) => Fluent1<B, F, I>
  readonly apply: <R>(f: (fa: Type<F, A>) => R) => R
  readonly show: (this: { I: Show<Type<F, A>> }) => string
  readonly equals: (this: { I: Eq<Type<F, A>> }, that: Type<F, A>) => boolean
  readonly compare: (this: { I: Ord<Type<F, A>> }, that: Type<F, A>) => Ordering
  readonly concat: (this: { I: Magma<Type<F, A>> }, that: Type<F, A>) => Type<F, A>
  readonly map: <B>(this: { I: Functor1<F> }, f: (a: A) => B) => Fluent1<B, F, I>
  readonly mapWithIndex: <Ix, B>(this: { I: FunctorWithIndex1<F, Ix> }, f: (i: Ix, a: A) => B) => Fluent1<B, F, I>
  readonly ap: <B>(this: { I: Apply1<F> }, fab: Type<F, (a: A) => B>) => Fluent1<B, F, I>
  readonly apFirst: <B>(this: { I: Apply1<F> }, that: Type<F, B>) => Fluent1<A, F, I>
  readonly apSecond: <B>(this: { I: Apply1<F> }, that: Type<F, B>) => Fluent1<B, F, I>
  readonly chain: <B>(this: { I: Chain1<F> }, f: (a: A) => Type<F, B>) => Fluent1<B, F, I>
  readonly flatten: <A>(this: { I: Chain1<F>; value: Type<F, Type<F, A>> }) => Fluent1<A, F, I>
  readonly extend: <B>(this: { I: Extend1<F> }, f: (fa: Type<F, A>) => B) => Fluent1<B, F, I>
  readonly duplicate: (this: { I: Extend1<F> }) => Fluent1<Type<F, A>, F, I>
  readonly reduce: <B>(this: { I: Foldable1<F> }, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(this: { I: Foldable1<F> }, M: Monoid<M>) => (f: (a: A) => M) => M
  readonly reduceRight: <B>(this: { I: Foldable1<F> }, b: B, f: (a: A, b: B) => B) => B
  readonly reduceWithIndex: <Ix, B>(this: { I: FoldableWithIndex1<F, Ix> }, b: B, f: (i: Ix, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <Ix, M>(
    this: { I: FoldableWithIndex1<F, Ix> },
    M: Monoid<M>
  ) => (f: (i: Ix, a: A) => M) => M
  readonly reduceRightWithIndex: <Ix, B>(this: { I: FoldableWithIndex1<F, Ix> }, b: B, f: (i: Ix, a: A, b: B) => B) => B
  readonly alt: (this: { I: Alt1<F> }, that: () => Type<F, A>) => Fluent1<A, F, I>
  readonly compact: <A>(this: { I: Compactable1<F>; value: Type<F, Option<A>> }) => Fluent1<A, F, I>
  readonly separate: <A, B>(this: {
    I: Compactable1<F>
    value: Type<F, Either<A, B>>
  }) => Separated<Type<F, A>, Type<F, B>>
  readonly filter: {
    <B extends A>(this: { I: Filterable1<F> }, refinement: Refinement<A, B>): Fluent1<B, F, I>
    (this: { I: Filterable1<F> }, predicate: Predicate<A>): Fluent1<A, F, I>
  }
  readonly filterMap: <B>(this: { I: Filterable1<F> }, f: (a: A) => Option<B>) => Fluent1<B, F, I>
  readonly partition: {
    <B extends A>(this: { I: Filterable1<F> }, refinement: Refinement<A, B>): Separated<Type<F, A>, Type<F, B>>
    (this: { I: Filterable1<F> }, predicate: Predicate<A>): Separated<Type<F, A>, Type<F, A>>
  }
  readonly partitionMap: <RL, RR>(
    this: { I: Filterable1<F> },
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type<F, RL>, Type<F, RR>>
  readonly filterWithIndex: {
    <Ix, B extends A>(this: { I: FilterableWithIndex1<F, Ix> }, refinement: RefinementWithIndex<Ix, A, B>): Fluent1<
      B,
      F,
      I
    >
    <Ix>(this: { I: FilterableWithIndex1<F, Ix> }, predicate: PredicateWithIndex<Ix, A>): Fluent1<A, F, I>
  }
  readonly filterMapWithIndex: {
    <Ix, B>(this: { I: FilterableWithIndex1<F, Ix> }, f: (i: Ix, a: A) => Option<B>): Fluent1<B, F, I>
    <Ix, B extends A>(this: { I: FilterableWithIndex1<F, Ix> }, predicate: RefinementWithIndex<Ix, A, B>): Separated<
      Type<F, A>,
      Type<F, B>
    >
  }
  readonly partitionWithIndex: <Ix>(
    this: { I: FilterableWithIndex1<F, Ix> },
    predicate: PredicateWithIndex<Ix, A>
  ) => Separated<Type<F, A>, Type<F, A>>
  readonly partitionMapWithIndex: <Ix, RL, RR>(
    this: { I: FilterableWithIndex1<F, Ix> },
    f: (i: Ix, a: A) => Either<RL, RR>
  ) => Separated<Type<F, RL>, Type<F, RR>>
}
```

Added in v2.0.0

# Fluent2 (interface)

**Signature**

```ts
export interface Fluent2<L, A, F extends URIS2, I> {
  readonly I: I
  readonly value: Type2<F, L, A>
  readonly pipe: <M, B>(f: (fa: Type2<F, L, A>) => Type2<F, M, B>) => Fluent2<M, B, F, I>
  readonly apply: <R>(f: (fa: Type2<F, L, A>) => R) => R
  readonly show: (this: { I: Show<Type2<F, L, A>> }) => string
  readonly equals: (this: { I: Eq<Type2<F, L, A>> }, that: Type2<F, L, A>) => boolean
  readonly compare: (this: { I: Ord<Type2<F, L, A>> }, that: Type2<F, L, A>) => Ordering
  readonly concat: (this: { I: Magma<Type2<F, L, A>> }, that: Type2<F, L, A>) => Type2<F, L, A>
  readonly map: <B>(this: { I: Functor2<F> | Functor2C<F, L> }, f: (a: A) => B) => Fluent2<L, B, F, I>
  readonly mapWithIndex: <Ix, B>(
    this: { I: FunctorWithIndex2<F, Ix> | FunctorWithIndex2C<F, Ix, L> },
    f: (i: Ix, a: A) => B
  ) => Fluent2<L, B, F, I>
  readonly bimap: <M, B>(
    this: { I: Bifunctor2<F> | Bifunctor2C<F, L> },
    f: (l: L) => M,
    g: (a: A) => B
  ) => Fluent2<M, B, F, I>
  readonly mapLeft: <M>(this: { I: Bifunctor2<F> | Bifunctor2C<F, L> }, f: (l: L) => M) => Fluent2<M, A, F, I>
  readonly ap: <B>(this: { I: Apply2<F> | Apply2C<F, L> }, fab: Type2<F, L, (a: A) => B>) => Fluent2<L, B, F, I>
  readonly apFirst: <B>(this: { I: Apply2<F> | Apply2C<F, L> }, that: Type2<F, L, B>) => Fluent2<L, A, F, I>
  readonly apSecond: <B>(this: { I: Apply2<F> | Apply2C<F, L> }, that: Type2<F, L, B>) => Fluent2<L, B, F, I>
  readonly chain: <B>(this: { I: Chain2<F> | Chain2C<F, L> }, f: (a: A) => Type2<F, L, B>) => Fluent2<L, B, F, I>
  readonly flatten: <A>(this: {
    I: Chain2<F> | Chain2C<F, L>
    value: Type2<F, L, Type2<F, L, A>>
  }) => Fluent2<L, A, F, I>
  readonly extend: <B>(this: { I: Extend2<F> | Extend2C<F, L> }, f: (fa: Type2<F, L, A>) => B) => Fluent2<L, B, F, I>
  readonly duplicate: (this: { I: Extend2<F> | Extend2C<F, L> }) => Fluent2<L, Type2<F, L, A>, F, I>
  readonly reduce: <B>(this: { I: Foldable2<F> | Foldable2C<F, L> }, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(this: { I: Foldable2<F> | Foldable2C<F, L> }, M: Monoid<M>) => (f: (a: A) => M) => M
  readonly reduceRight: <B>(this: { I: Foldable2<F> | Foldable2C<F, L> }, b: B, f: (a: A, b: B) => B) => B
  readonly reduceWithIndex: <Ix, B>(
    this: { I: FoldableWithIndex2<F, Ix> | FoldableWithIndex2C<F, Ix, L> },
    b: B,
    f: (i: Ix, b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <Ix, M>(
    this: { I: FoldableWithIndex2<F, Ix> | FoldableWithIndex2C<F, Ix, L> },
    M: Monoid<M>
  ) => (i: Ix, f: (a: A) => M) => M
  readonly reduceRightWithIndex: <Ix, B>(
    this: { I: FoldableWithIndex2<F, Ix> | FoldableWithIndex2C<F, Ix, L> },
    b: B,
    f: (i: Ix, a: A, b: B) => B
  ) => B
  readonly alt: (this: { I: Alt2<F> | Alt2C<F, L> }, that: () => Type2<F, L, A>) => Fluent2<L, A, F, I>
  readonly compact: <A>(this: { I: Compactable2<F> | Compactable2C<F, L>; value: Option<A> }) => Fluent2<L, A, F, I>
  readonly separate: <A, B>(this: {
    I: Compactable2<F> | Compactable2C<F, L>
    value: Either<A, B>
  }) => Separated<Type2<F, L, A>, Type2<F, L, B>>
  readonly filter: {
    <B extends A>(this: { I: Filterable2<F> | Filterable2C<F, L> }, refinement: Refinement<A, B>): Fluent2<L, B, F, I>
    (this: { I: Filterable2<F> | Filterable2C<F, L> }, predicate: Predicate<A>): Fluent2<L, A, F, I>
  }
  readonly filterMap: <B>(
    this: { I: Filterable2<F> | Filterable2C<F, L> },
    f: (a: A) => Option<B>
  ) => Fluent2<L, B, F, I>
  readonly partition: {
    <B extends A>(this: { I: Filterable2<F> | Filterable2C<F, L> }, refinement: Refinement<A, B>): Separated<
      Type2<F, L, A>,
      Type2<F, L, B>
    >
    (this: { I: Filterable2<F> | Filterable2C<F, L> }, predicate: Predicate<A>): Separated<
      Type2<F, L, A>,
      Type2<F, L, A>
    >
  }
  readonly partitionMap: <RL, RR>(
    this: { I: Filterable2<F> | Filterable2C<F, L> },
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly filterWithIndex: {
    <Ix, B extends A>(
      this: { I: FilterableWithIndex2<F, Ix> | FilterableWithIndex2C<F, Ix, L> },
      refinement: RefinementWithIndex<Ix, A, B>
    ): Fluent2<L, B, F, I>
    <Ix>(
      this: { I: FilterableWithIndex2<F, Ix> | FilterableWithIndex2C<F, Ix, L> },
      predicate: PredicateWithIndex<Ix, A>
    ): Fluent2<L, A, F, I>
  }
  readonly filterMapWithIndex: <Ix, B>(
    this: { I: FilterableWithIndex2<F, Ix> | FilterableWithIndex2C<F, Ix, L> },
    f: (i: Ix, a: A) => Option<B>
  ) => Fluent2<L, B, F, I>
  readonly partitionWithIndex: {
    <Ix, B extends A>(
      this: { I: FilterableWithIndex2<F, Ix> | FilterableWithIndex2C<F, Ix, L> },
      refinement: RefinementWithIndex<Ix, A, B>
    ): Separated<Type2<F, L, A>, Type2<F, L, A>>
    <Ix>(
      this: { I: FilterableWithIndex2<F, Ix> | FilterableWithIndex2C<F, Ix, L> },
      predicate: PredicateWithIndex<Ix, A>
    ): Separated<Type2<F, L, A>, Type2<F, L, A>>
  }
  readonly partitionMapWithIndex: <Ix, RL, RR>(
    this: { I: FilterableWithIndex2<F, Ix> | FilterableWithIndex2C<F, Ix, L> },
    f: (i: Ix, a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly promap: <H, B>(this: { I: Profunctor2<F> }, f: (h: H) => L, g: (a: A) => B) => Fluent2<H, B, F, I>
  readonly compose: <B>(this: { I: Semigroupoid2<F> }, that: Type2<F, A, B>) => Fluent2<L, B, F, I>
}
```

Added in v2.0.0

# Fluent3 (interface)

**Signature**

```ts
export interface Fluent3<U, L, A, F extends URIS3, I> {
  readonly I: I
  readonly value: Type3<F, U, L, A>
  readonly show: (this: { I: Show<Type3<F, U, L, A>> }) => string
  readonly equals: (this: { I: Eq<Type3<F, U, L, A>> }, that: Type3<F, U, L, A>) => boolean
  readonly compare: (this: { I: Ord<Type3<F, U, L, A>> }, that: Type3<F, U, L, A>) => Ordering
  readonly concat: (this: { I: Magma<Type3<F, U, L, A>> }, that: Type3<F, U, L, A>) => Type3<F, U, L, A>
  readonly map: <B>(this: { I: Functor3<F> }, f: (a: A) => B) => Fluent3<U, L, B, F, I>
  readonly mapWithIndex: <Ix, B>(this: { I: FunctorWithIndex3<F, Ix> }, f: (i: Ix, a: A) => B) => Fluent3<U, L, B, F, I>
  readonly bimap: <M, B>(this: { I: Bifunctor3<F> }, f: (l: L) => M, g: (a: A) => B) => Fluent3<U, M, B, F, I>
  readonly mapLeft: <M>(this: { I: Bifunctor3<F> }, f: (l: L) => M) => Fluent3<U, M, A, F, I>
  readonly ap: <B>(this: { I: Apply3<F> }, fab: Type3<F, U, L, (a: A) => B>) => Fluent3<U, L, B, F, I>
  readonly apFirst: <B>(this: { I: Apply3<F> }, that: Type3<F, U, L, B>) => Fluent3<U, L, A, F, I>
  readonly apSecond: <B>(this: { I: Apply3<F> }, that: Type3<F, U, L, B>) => Fluent3<U, L, B, F, I>
  readonly chain: <B>(this: { I: Chain3<F> }, f: (a: A) => Type3<F, U, L, B>) => Fluent3<U, L, B, F, I>
  readonly flatten: <A>(this: { I: Chain3<F>; value: Type3<F, U, L, Type3<F, U, L, A>> }) => Fluent3<U, L, A, F, I>
  readonly extend: <B>(this: { I: Extend3<F> }, f: (fa: Type3<F, U, L, A>) => B) => Fluent3<U, L, B, F, I>
  readonly duplicate: (this: { I: Extend3<F> }) => Fluent3<U, L, Type3<F, U, L, A>, F, I>
  readonly reduce: <B>(this: { I: Foldable3<F> }, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(this: { I: Foldable3<F> }, M: Monoid<M>) => (f: (a: A) => M) => M
  readonly reduceRight: <B>(this: { I: Foldable3<F> }, b: B, f: (a: A, b: B) => B) => B
  readonly reduceWithIndex: <Ix, B>(this: { I: FoldableWithIndex3<F, Ix> }, b: B, f: (i: Ix, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <Ix, M>(
    this: { I: FoldableWithIndex3<F, Ix> },
    M: Monoid<M>
  ) => (i: Ix, f: (a: A) => M) => M
  readonly reduceRightWithIndex: <Ix, B>(this: { I: FoldableWithIndex3<F, Ix> }, b: B, f: (i: Ix, a: A, b: B) => B) => B
  readonly alt: (this: { I: Alt3<F> }, that: () => Type3<F, U, L, A>) => Fluent3<U, L, A, F, I>
  readonly compact: <A>(this: { I: Compactable3<F>; value: Option<A> }) => Fluent3<U, L, A, F, I>
  readonly separate: <A, B>(this: {
    I: Compactable3<F>
    value: Either<A, B>
  }) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
  readonly filter: {
    <B extends A>(this: { I: Filterable3<F> }, refinement: Refinement<A, B>): Fluent3<U, L, B, F, I>
    (this: { I: Filterable3<F> }, predicate: Predicate<A>): Fluent3<U, L, A, F, I>
  }
  readonly filterMap: <B>(this: { I: Filterable3<F> }, f: (a: A) => Option<B>) => Fluent3<U, L, B, F, I>
  readonly partition: {
    <B extends A>(this: { I: Filterable3<F> }, refinement: Refinement<A, B>): Separated<
      Type3<F, U, L, A>,
      Type3<F, U, L, B>
    >
    (this: { I: Filterable3<F> }, predicate: Predicate<A>): Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
  }
  readonly partitionMap: <RL, RR>(
    this: { I: Filterable3<F> },
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly filterWithIndex: {
    <Ix, B extends A>(this: { I: FilterableWithIndex3<F, Ix> }, refinement: RefinementWithIndex<Ix, A, B>): Fluent3<
      U,
      L,
      B,
      F,
      I
    >
    <Ix>(this: { I: FilterableWithIndex3<F, Ix> }, predicate: PredicateWithIndex<Ix, A>): Fluent3<U, L, A, F, I>
  }
  readonly filterMapWithIndex: <Ix, B>(
    this: { I: FilterableWithIndex3<F, Ix> },
    f: (i: Ix, a: A) => Option<B>
  ) => Fluent3<U, L, B, F, I>
  readonly partitionWithIndex: {
    <Ix, B extends A>(this: { I: FilterableWithIndex3<F, Ix> }, refinement: RefinementWithIndex<Ix, A, B>): Separated<
      Type3<F, U, L, A>,
      Type3<F, U, L, A>
    >
    <Ix>(this: { I: FilterableWithIndex3<F, Ix> }, predicate: PredicateWithIndex<Ix, A>): Separated<
      Type3<F, U, L, A>,
      Type3<F, U, L, A>
    >
  }
  readonly partitionMapWithIndex: <Ix, RL, RR>(
    this: { I: FilterableWithIndex3<F, Ix> },
    f: (i: Ix, a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly promap: <H, B>(this: { I: Profunctor3<F> }, f: (h: H) => L, g: (a: A) => B) => Fluent3<U, H, B, F, I>
  readonly compose: <B>(this: { I: Semigroupoid3<F> }, that: Type3<F, U, A, B>) => Fluent3<U, L, B, F, I>
}
```

Added in v2.0.0

# fluent (function)

**Signature**

```ts
export function fluent<F extends URIS2, I, L>(I: { URI: F; _L: L } & I): <A>(fa: Type2<F, L, A>) => Fluent2<L, A, F, I>
export function fluent<F extends URIS2, I>(I: { URI: F } & I): <L, A>(fa: Type2<F, L, A>) => Fluent2<L, A, F, I>
export function fluent<F extends URIS, I>(I: { URI: F } & I): <A>(fa: Type<F, A>) => Fluent1<A, F, I>
export function fluent<F, I>(I: { URI: F } & I): <A>(fa: HKT<F, A>) => Fluent<A, F, I> { ... }
```

Added in v2.0.0
