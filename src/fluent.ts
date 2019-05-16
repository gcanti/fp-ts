import { Alt, Alt1, Alt2, Alt2C, Alt3 } from './Alt'
import { Apply, Apply1, Apply2, Apply2C, Apply3 } from './Apply'
import { Bifunctor, Bifunctor2, Bifunctor2C, Bifunctor3 } from './Bifunctor'
import { Chain, Chain1, Chain2, Chain2C, Chain3 } from './Chain'
import { Compactable, Compactable1, Compactable2, Compactable2C, Compactable3, Separated } from './Compactable'
import { Either } from './Either'
import { Eq } from './Eq'
import { Extend, Extend1, Extend2, Extend2C, Extend3 } from './Extend'
import { Filterable, Filterable1, Filterable2, Filterable2C, Filterable3 } from './Filterable'
import {
  FilterableWithIndex,
  FilterableWithIndex1,
  FilterableWithIndex2,
  FilterableWithIndex2C,
  FilterableWithIndex3,
  PredicateWithIndex,
  RefinementWithIndex
} from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable2C, Foldable3 } from './Foldable'
import {
  FoldableWithIndex,
  FoldableWithIndex1,
  FoldableWithIndex2,
  FoldableWithIndex2C,
  FoldableWithIndex3
} from './FoldableWithIndex'
import { identity, Predicate, Refinement } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3 } from './Functor'
import {
  FunctorWithIndex,
  FunctorWithIndex1,
  FunctorWithIndex2,
  FunctorWithIndex2C,
  FunctorWithIndex3
} from './FunctorWithIndex'
import { HKT, HKT2, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Ord } from './Ord'
import { Ordering } from './Ordering'
import { Profunctor, Profunctor2, Profunctor3 } from './Profunctor'
import { Semigroupoid, Semigroupoid2, Semigroupoid3 } from './Semigroupoid'
import { Show } from './Show'

/**
 * @since 2.0.0
 */
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

/**
 * @since 2.0.0
 */
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

/**
 * @since 2.0.0
 */
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

/**
 * @since 2.0.0
 */
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

/**
 * @since 2.0.0
 */
class Wrapper<A, F, I> {
  constructor(readonly I: I, readonly value: HKT<F, A>) {}
  pipe<B>(f: (fa: HKT<F, A>) => HKT<F, B>): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(this.I, f(this.value))
  }
  apply<R>(f: (fa: HKT<F, A>) => R): R {
    return f(this.value)
  }
  show<I extends Show<HKT<F, A>>>(this: Wrapper<A, F, I>): string {
    return this.I.show(this.value)
  }
  equals<I extends Eq<HKT<F, A>>>(this: Wrapper<A, F, I>, that: HKT<F, A>): boolean {
    return this.I.equals(this.value, that)
  }
  compare<I extends Ord<HKT<F, A>>>(this: Wrapper<A, F, I>, that: HKT<F, A>): Ordering {
    return this.I.compare(this.value, that)
  }
  concat<I extends Magma<HKT<F, A>>>(this: Wrapper<A, F, I>, that: HKT<F, A>): HKT<F, A> {
    return this.I.concat(this.value, that)
  }
  map<I extends Functor<F>, B>(this: Wrapper<A, F, I>, f: (a: A) => B): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(this.I, this.I.map(this.value, f))
  }
  mapWithIndex<Ix, I extends FunctorWithIndex<F, Ix>, B>(
    this: Wrapper<A, F, I>,
    f: (i: Ix, a: A) => B
  ): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(this.I, this.I.mapWithIndex(this.value, f))
  }
  ap<I extends Apply<F>, B>(this: Wrapper<A, F, I>, fab: HKT<F, (a: A) => B>): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(this.I, this.I.ap(fab, this.value))
  }
  apFirst<I extends Apply<F>, B>(this: Wrapper<A, F, I>, that: HKT<F, B>): Wrapper<A, F, I> {
    return new Wrapper<A, F, I>(this.I, this.I.ap(this.I.map(this.value, a => () => a), that))
  }
  apSecond<I extends Apply<F>, B>(this: Wrapper<A, F, I>, that: HKT<F, B>): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(this.I, this.I.ap(this.I.map(this.value, () => (b: B) => b), that))
  }
  chain<I extends Chain<F>, B>(this: Wrapper<A, F, I>, f: (a: A) => HKT<F, B>): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(this.I, this.I.chain(this.value, f))
  }
  flatten<I extends Chain<F>, A>(this: Wrapper<HKT<F, A>, F, I>): Wrapper<A, F, I> {
    return new Wrapper<A, F, I>(this.I, this.I.chain(this.value, identity))
  }
  extend<I extends Extend<F>, B>(this: Wrapper<A, F, I>, f: (fa: HKT<F, A>) => B): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(this.I, this.I.extend(this.value, f))
  }
  duplicate<I extends Extend<F>>(this: Wrapper<A, F, I>): Wrapper<HKT<F, A>, F, I> {
    return new Wrapper<HKT<F, A>, F, I>(this.I, this.I.extend(this.value, identity))
  }
  reduce<I extends Foldable<F>, B>(this: Wrapper<A, F, I>, b: B, f: (b: B, a: A) => B): B {
    return this.I.reduce(this.value, b, f)
  }
  foldMap<I extends Foldable<F>, M>(this: Wrapper<A, F, I>, M: Monoid<M>): (f: (a: A) => M) => M {
    const foldMapM = this.I.foldMap(M)
    return f => foldMapM(this.value, f)
  }
  reduceRight<I extends Foldable<F>, B>(this: Wrapper<A, F, I>, b: B, f: (a: A, b: B) => B): B {
    return this.I.reduceRight(this.value, b, f)
  }
  reduceWithIndex<Ix, I extends FoldableWithIndex<F, Ix>, B>(
    this: Wrapper<A, F, I>,
    b: B,
    f: (i: Ix, b: B, a: A) => B
  ): B {
    return this.I.reduceWithIndex(this.value, b, f)
  }
  foldMapWithIndex<Ix, I extends FoldableWithIndex<F, Ix>, M>(
    this: Wrapper<A, F, I>,
    M: Monoid<M>
  ): (f: (i: Ix, a: A) => M) => M {
    const foldMapWithIndexM = this.I.foldMapWithIndex(M)
    return f => foldMapWithIndexM(this.value, f)
  }
  reduceRightWithIndex<Ix, I extends FoldableWithIndex<F, Ix>, B>(
    this: Wrapper<A, F, I>,
    b: B,
    f: (i: Ix, a: A, b: B) => B
  ): B {
    return this.I.reduceRightWithIndex(this.value, b, f)
  }
  alt<I extends Alt<F>>(this: Wrapper<A, F, I>, that: () => HKT<F, A>): Wrapper<A, F, I> {
    return new Wrapper<A, F, I>(this.I, this.I.alt(this.value, that))
  }
  compact<I extends Compactable<F>, A>(this: Wrapper<Option<A>, F, I>): Wrapper<A, F, I> {
    return new Wrapper<A, F, I>(this.I, this.I.compact(this.value))
  }
  separate<I extends Compactable<F>, A, B>(this: Wrapper<Either<A, B>, F, I>): Separated<HKT<F, A>, HKT<F, B>> {
    return this.I.separate(this.value)
  }
  filter<I extends Filterable<F>>(this: Wrapper<A, F, I>, predicate: Predicate<A>): Wrapper<A, F, I> {
    return new Wrapper<A, F, I>(this.I, this.I.filter(this.value, predicate))
  }
  filterMap<I extends Filterable<F>, B>(this: Wrapper<A, F, I>, f: (a: A) => Option<B>): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(this.I, this.I.filterMap(this.value, f))
  }
  partition<I extends Filterable<F>>(this: Wrapper<A, F, I>, predicate: Predicate<A>): Separated<HKT<F, A>, HKT<F, A>> {
    return this.I.partition(this.value, predicate)
  }
  partitionMap<I extends Filterable<F>, RL, RR>(
    this: Wrapper<A, F, I>,
    f: (a: A) => Either<RL, RR>
  ): Separated<HKT<F, RL>, HKT<F, RR>> {
    return this.I.partitionMap(this.value, f)
  }
  filterWithIndex<Ix, I extends FilterableWithIndex<F, Ix>>(
    this: Wrapper<A, F, I>,
    p: (i: Ix, a: A) => boolean
  ): Wrapper<A, F, I> {
    return new Wrapper<A, F, I>(this.I, this.I.filterWithIndex(this.value, p))
  }
  filterMapWithIndex<Ix, I extends FilterableWithIndex<F, Ix>, B>(
    this: Wrapper<A, F, I>,
    f: (i: Ix, a: A) => Option<B>
  ): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(this.I, this.I.filterMapWithIndex(this.value, f))
  }
  partitionWithIndex<Ix, I extends FilterableWithIndex<F, Ix>>(
    this: Wrapper<A, F, I>,
    p: (i: Ix, a: A) => boolean
  ): Separated<HKT<F, A>, HKT<F, A>> {
    return this.I.partitionWithIndex(this.value, p)
  }
  partitionMapWithIndex<Ix, I extends FilterableWithIndex<F, Ix>, RL, RR>(
    this: Wrapper<A, F, I>,
    f: (i: Ix, a: A) => Either<RL, RR>
  ): Separated<HKT<F, RL>, HKT<F, RR>> {
    return this.I.partitionMapWithIndex(this.value, f)
  }
  bimap<I extends Bifunctor<F>, L, M, B>(
    this: { I: I; value: HKT2<F, L, A> },
    f: (l: L) => M,
    g: (a: A) => B
  ): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(this.I, this.I.bimap(this.value, f, g))
  }
  mapLeft<I extends Bifunctor<F>, L, M>(this: { I: I; value: HKT2<F, L, A> }, f: (l: L) => M): Wrapper<A, F, I> {
    return new Wrapper<A, F, I>(this.I, this.I.mapLeft(this.value, f))
  }
  promap<I extends Profunctor<F>, H, L, B>(
    this: { I: I; value: HKT2<F, L, A> },
    f: (h: H) => L,
    g: (a: A) => B
  ): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(this.I, this.I.promap(this.value, f, g))
  }
  compose<I extends Semigroupoid<F>, L, B>(
    this: { I: I; value: HKT2<F, L, A> },
    that: HKT2<F, A, B>
  ): Wrapper<B, F, I> {
    return new Wrapper<B, F, I>(
      this.I,
      this.I.compose(
        that,
        this.value
      )
    )
  }
}

/**
 * @since 2.0.0
 */
export function fluent<F extends URIS2, I, L>(I: { URI: F; _L: L } & I): <A>(fa: Type2<F, L, A>) => Fluent2<L, A, F, I>
export function fluent<F extends URIS2, I>(I: { URI: F } & I): <L, A>(fa: Type2<F, L, A>) => Fluent2<L, A, F, I>
export function fluent<F extends URIS, I>(I: { URI: F } & I): <A>(fa: Type<F, A>) => Fluent1<A, F, I>
export function fluent<F, I>(I: { URI: F } & I): <A>(fa: HKT<F, A>) => Fluent<A, F, I>
export function fluent<F, I>(I: { URI: F } & I): <A>(fa: HKT<F, A>) => any {
  return fa => new Wrapper(I, fa)
}
