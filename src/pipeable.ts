import { Alt, Alt1, Alt2, Alt2C, Alt3 } from './Alt'
import { Apply, Apply1, Apply2, Apply2C, Apply3 } from './Apply'
import { Bifunctor, Bifunctor2, Bifunctor3 } from './Bifunctor'
import { Chain, Chain1, Chain2, Chain2C, Chain3 } from './Chain'
import { Compactable, Compactable1, Compactable2, Compactable2C, Compactable3, Separated } from './Compactable'
import { Either } from './Either'
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
import { identity, Predicate, Refinement, pipeOp } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3 } from './Functor'
import {
  FunctorWithIndex,
  FunctorWithIndex1,
  FunctorWithIndex2,
  FunctorWithIndex2C,
  FunctorWithIndex3
} from './FunctorWithIndex'
import { HKT, HKT2, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Profunctor, Profunctor2, Profunctor2C, Profunctor3 } from './Profunctor'
import { Semigroupoid, Semigroupoid2, Semigroupoid2C, Semigroupoid3 } from './Semigroupoid'

/**
 * @since 2.0.0
 */
export const pipe = pipeOp

export interface PipeableFunctor<F> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}

export interface PipeableFunctor1<F extends URIS> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: Type<F, A>) => Type<F, B>
}

export interface PipeableFunctor2<F extends URIS2> {
  readonly map: <A, B>(f: (a: A) => B) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
}

export interface PipeableFunctor2C<F extends URIS2, L> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: Type2<F, L, A>) => Type2<F, L, B>
}

export interface PipeableFunctor3<F extends URIS3> {
  readonly map: <A, B>(f: (a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
}

export interface PipeableFunctorWithIndex<F, I> extends PipeableFunctor<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}

export interface PipeableFunctorWithIndex1<F extends URIS, I> extends PipeableFunctor1<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Type<F, A>) => Type<F, B>
}

export interface PipeableFunctorWithIndex2<F extends URIS2, I> extends PipeableFunctor2<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
}

export interface PipeableFunctorWithIndex2C<F extends URIS2, I, L> extends PipeableFunctor2C<F, L> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Type2<F, L, A>) => Type2<F, L, B>
}

export interface PipeableFunctorWithIndex3<F extends URIS3, I> extends PipeableFunctor3<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
}

export interface PipeableApply<F> extends PipeableFunctor<F> {
  readonly ap: <A>(fa: HKT<F, A>) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
  readonly apFirst: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, A>
  readonly apSecond: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, B>
}

export interface PipeableApply1<F extends URIS> extends PipeableFunctor1<F> {
  readonly ap: <A>(fa: Type<F, A>) => <B>(fab: Type<F, (a: A) => B>) => Type<F, B>
  readonly apFirst: <B>(fb: Type<F, B>) => <A>(fa: Type<F, A>) => Type<F, A>
  readonly apSecond: <B>(fb: Type<F, B>) => <A>(fa: Type<F, A>) => Type<F, B>
}

export interface PipeableApply2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly ap: <L, A>(fa: Type2<F, L, A>) => <B>(fab: Type2<F, L, (a: A) => B>) => Type2<F, L, B>
  readonly apFirst: <L, B>(fb: Type2<F, L, B>) => <A>(fa: Type2<F, L, A>) => Type2<F, L, A>
  readonly apSecond: <L, B>(fb: Type2<F, L, B>) => <A>(fa: Type2<F, L, A>) => Type2<F, L, B>
}

export interface PipeableApply2C<F extends URIS2, L> extends PipeableFunctor2C<F, L> {
  readonly ap: <A>(fa: Type2<F, L, A>) => <B>(fab: Type2<F, L, (a: A) => B>) => Type2<F, L, B>
  readonly apFirst: <A>(fb: Type2<F, L, A>) => <B>(fb: Type2<F, L, B>) => Type2<F, L, A>
  readonly apSecond: <A>(fb: Type2<F, L, A>) => <B>(fb: Type2<F, L, B>) => Type2<F, L, B>
}

export interface PipeableApply3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly ap: <U, L, A>(fa: Type3<F, U, L, A>) => <B>(fab: Type3<F, U, L, (a: A) => B>) => Type3<F, U, L, B>
  readonly apFirst: <U, L, B>(fb: Type3<F, U, L, B>) => <A>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
  readonly apSecond: <U, L, B>(fb: Type3<F, U, L, B>) => <A>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
}

export interface PipeableChain<F> extends PipeableApply<F> {
  readonly chain: <A, B>(f: (a: A) => HKT<F, B>) => (ma: HKT<F, A>) => HKT<F, B>
  readonly chainFirst: <A, B>(f: (a: A) => HKT<F, B>) => (ma: HKT<F, A>) => HKT<F, A>
  readonly flatten: <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
}

export interface PipeableChain1<F extends URIS> extends PipeableApply1<F> {
  readonly chain: <A, B>(f: (a: A) => Type<F, B>) => (ma: Type<F, A>) => Type<F, B>
  readonly chainFirst: <A, B>(f: (a: A) => Type<F, B>) => (ma: Type<F, A>) => Type<F, A>
  readonly flatten: <A>(mma: Type<F, Type<F, A>>) => Type<F, A>
}

export interface PipeableChain2<F extends URIS2> extends PipeableApply2<F> {
  readonly chain: <L, A, B>(f: (a: A) => Type2<F, L, B>) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly chainFirst: <L, A, B>(f: (a: A) => Type2<F, L, B>) => (ma: Type2<F, L, A>) => Type2<F, L, A>
  readonly flatten: <L, A>(mma: Type2<F, L, Type2<F, L, A>>) => Type2<F, L, A>
}

export interface PipeableChain2C<F extends URIS2, L> extends PipeableApply2C<F, L> {
  readonly chain: <A, B>(f: (a: A) => Type2<F, L, B>) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly chainFirst: <A, B>(f: (a: A) => Type2<F, L, B>) => (ma: Type2<F, L, A>) => Type2<F, L, A>
  readonly flatten: <A>(mma: Type2<F, L, Type2<F, L, A>>) => Type2<F, L, A>
}

export interface PipeableChain3<F extends URIS3> extends PipeableApply3<F> {
  readonly chain: <U, L, A, B>(f: (a: A) => Type3<F, U, L, B>) => (ma: Type3<F, U, L, A>) => Type3<F, U, L, B>
  readonly chainFirst: <U, L, A, B>(f: (a: A) => Type3<F, U, L, B>) => (ma: Type3<F, U, L, A>) => Type3<F, U, L, A>
  readonly flatten: <U, L, A>(mma: Type3<F, U, L, Type3<F, U, L, A>>) => Type3<F, U, L, A>
}

export interface PipeableExtend<F> extends PipeableFunctor<F> {
  readonly extend: <A, B>(f: (fa: HKT<F, A>) => B) => (ma: HKT<F, A>) => HKT<F, B>
  readonly duplicate: <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
}

export interface PipeableExtend1<F extends URIS> extends PipeableFunctor1<F> {
  readonly extend: <A, B>(f: (fa: Type<F, A>) => B) => (ma: Type<F, A>) => Type<F, B>
  readonly duplicate: <A>(ma: Type<F, A>) => Type<F, Type<F, A>>
}

export interface PipeableExtend2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly extend: <L, A, B>(f: (fa: Type2<F, L, A>) => B) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly duplicate: <L, A>(ma: Type2<F, L, A>) => Type2<F, L, Type2<F, L, A>>
}

export interface PipeableExtend2C<F extends URIS2, L> extends PipeableFunctor2C<F, L> {
  readonly extend: <A, B>(f: (fa: Type2<F, L, A>) => B) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly duplicate: <A>(ma: Type2<F, L, A>) => Type2<F, L, Type2<F, L, A>>
}

export interface PipeableExtend3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly extend: <U, L, A, B>(f: (fa: Type3<F, U, L, A>) => B) => (ma: Type3<F, U, L, A>) => Type3<F, U, L, B>
  readonly duplicate: <U, L, A>(ma: Type3<F, U, L, A>) => Type3<F, U, L, Type3<F, U, L, A>>
}

export interface PipeableBifunctor<F> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => (fa: HKT2<F, L, A>) => HKT2<F, M, B>
  readonly mapLeft: <L, A, M>(f: (l: L) => M) => (fa: HKT2<F, L, A>) => HKT2<F, M, A>
}

export interface PipeableBifunctor2<F extends URIS2> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => (fa: Type2<F, L, A>) => Type2<F, M, B>
  readonly mapLeft: <L, A, M>(f: (l: L) => M) => (fa: Type2<F, L, A>) => Type2<F, M, A>
}

export interface PipeableBifunctor3<F extends URIS3> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => <U>(fa: Type3<F, U, L, A>) => Type3<F, U, M, B>
  readonly mapLeft: <L, A, M>(f: (l: L) => M) => <U>(fa: Type3<F, U, L, A>) => Type3<F, U, M, A>
}

export interface PipeableFoldable<F> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: HKT<F, A>) => B
}

export interface PipeableFoldable1<F extends URIS> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Type<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Type<F, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Type<F, A>) => B
}

export interface PipeableFoldable2<F extends URIS2> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <L>(fa: Type2<F, L, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <L>(fa: Type2<F, L, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <L>(fa: Type2<F, L, A>) => B
}

export interface PipeableFoldable2C<F extends URIS2, L> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Type2<F, L, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Type2<F, L, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Type2<F, L, A>) => B
}

export interface PipeableFoldable3<F extends URIS3> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <U, L>(fa: Type3<F, U, L, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <U, L>(fa: Type3<F, U, L, A>) => B
}

export interface PipeableFoldableWithIndex<F, I> extends PipeableFoldable<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: HKT<F, A>) => B
}

export interface PipeableFoldableWithIndex1<F extends URIS, I> extends PipeableFoldable1<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Type<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Type<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Type<F, A>) => B
}

export interface PipeableFoldableWithIndex2<F extends URIS2, I> extends PipeableFoldable2<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <L>(fa: Type2<F, L, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <L>(fa: Type2<F, L, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <L>(fa: Type2<F, L, A>) => B
}

export interface PipeableFoldableWithIndex2C<F extends URIS2, I, L> extends PipeableFoldable2C<F, L> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Type2<F, L, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Type2<F, L, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Type2<F, L, A>) => B
}

export interface PipeableFoldableWithIndex3<F extends URIS3, I> extends PipeableFoldable3<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <U, L>(fa: Type3<F, U, L, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <U, L>(fa: Type3<F, U, L, A>) => B
}

export interface PipeableAlt<F> {
  readonly alt: <A>(that: () => HKT<F, A>) => (fa: HKT<F, A>) => HKT<F, A>
}

export interface PipeableAlt1<F extends URIS> {
  readonly alt: <A>(that: () => Type<F, A>) => (fa: Type<F, A>) => Type<F, A>
}

export interface PipeableAlt2<F extends URIS2> {
  readonly alt: <L, A>(that: () => Type2<F, L, A>) => (fa: Type2<F, L, A>) => Type2<F, L, A>
}

export interface PipeableAlt2C<F extends URIS2, L> {
  readonly alt: <A>(that: () => Type2<F, L, A>) => (fa: Type2<F, L, A>) => Type2<F, L, A>
}

export interface PipeableAlt3<F extends URIS3> {
  readonly alt: <U, L, A>(that: () => Type3<F, U, L, A>) => (fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
}

export interface PipeableCompactable<F> {
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  readonly separate: <A, B>(fa: HKT<F, Either<A, B>>) => Separated<HKT<F, A>, HKT<F, B>>
}

export interface PipeableCompactable1<F extends URIS> {
  readonly compact: <A>(fa: Type<F, Option<A>>) => Type<F, A>
  readonly separate: <A, B>(fa: Type<F, Either<A, B>>) => Separated<Type<F, A>, Type<F, B>>
}

export interface PipeableCompactable2<F extends URIS2> {
  readonly compact: <L, A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <L, A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}

export interface PipeableCompactable2C<F extends URIS2, L> {
  readonly compact: <A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}

export interface PipeableCompactable3<F extends URIS3> {
  readonly compact: <U, L, A>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly separate: <U, L, A, B>(fa: Type3<F, U, L, Either<A, B>>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
}

export interface PipeableFilterable<F> extends PipeableCompactable<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => HKT<F, B>
    <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => HKT<F, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, B>>
    <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => (fa: HKT<F, A>) => Separated<HKT<F, RL>, HKT<F, RR>>
}

export interface PipeableFilterable1<F extends URIS> extends PipeableCompactable1<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Type<F, A>) => Type<F, B>
    <A>(predicate: Predicate<A>): (fa: Type<F, A>) => Type<F, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Type<F, A>) => Type<F, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Type<F, A>) => Separated<Type<F, A>, Type<F, B>>
    <A>(predicate: Predicate<A>): (fa: Type<F, A>) => Separated<Type<F, A>, Type<F, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => (fa: Type<F, A>) => Separated<Type<F, RL>, Type<F, RR>>
}

export interface PipeableFilterable2<F extends URIS2> extends PipeableCompactable2<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
    <A>(predicate: Predicate<A>): <L>(fa: Type2<F, L, A>) => Type2<F, L, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <L>(fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
    <A>(predicate: Predicate<A>): <L>(fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => <L>(fa: Type2<F, L, A>) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
}

export interface PipeableFilterable2C<F extends URIS2, L> extends PipeableCompactable2C<F, L> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Type2<F, L, A>) => Type2<F, L, B>
    <A>(predicate: Predicate<A>): (fa: Type2<F, L, A>) => Type2<F, L, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Type2<F, L, A>) => Type2<F, L, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
    <A>(predicate: Predicate<A>): (fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => (fa: Type2<F, L, A>) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
}

export interface PipeableFilterable3<F extends URIS3> extends PipeableCompactable3<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
    <A>(predicate: Predicate<A>): <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <U, L>(
      fa: Type3<F, U, L, A>
    ) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
    <A>(predicate: Predicate<A>): <U, L>(fa: Type3<F, U, L, A>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => <U, L>(fa: Type3<F, U, L, A>) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
}

export interface PipeableFilterableWithIndex<F, I> extends PipeableFilterable<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (fa: HKT<F, A>) => HKT<F, B>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => HKT<F, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, B>>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => (fa: HKT<F, A>) => Separated<HKT<F, RL>, HKT<F, RR>>
}

export interface PipeableFilterableWithIndex1<F extends URIS, I> extends PipeableFilterable1<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (fa: Type<F, A>) => Type<F, B>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: Type<F, A>) => Type<F, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Type<F, A>) => Type<F, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (fa: Type<F, A>) => Separated<Type<F, A>, Type<F, B>>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: Type<F, A>) => Separated<Type<F, A>, Type<F, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => (fa: Type<F, A>) => Separated<Type<F, RL>, Type<F, RR>>
}

export interface PipeableFilterableWithIndex2<F extends URIS2, I> extends PipeableFilterable2<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
    <A>(predicate: PredicateWithIndex<I, A>): <L>(fa: Type2<F, L, A>) => Type2<F, L, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): <L>(
      fa: Type2<F, L, A>
    ) => Separated<Type2<F, L, A>, Type2<F, L, B>>
    <A>(predicate: PredicateWithIndex<I, A>): <L>(fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => <L>(fa: Type2<F, L, A>) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
}

export interface PipeableFilterableWithIndex2C<F extends URIS2, I, L> extends PipeableFilterable2C<F, L> {
  readonly filterWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (fa: Type2<F, L, A>) => Type2<F, L, B>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: Type2<F, L, A>) => Type2<F, L, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Type2<F, L, A>) => Type2<F, L, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (
      fa: Type2<F, L, A>
    ) => Separated<Type2<F, L, A>, Type2<F, L, B>>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => (fa: Type2<F, L, A>) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
}

export interface PipeableFilterableWithIndex3<F extends URIS3, I> extends PipeableFilterable3<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
    <A>(predicate: PredicateWithIndex<I, A>): <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
  readonly partitionWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): <U, L>(
      fa: Type3<F, U, L, A>
    ) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
    <A>(predicate: PredicateWithIndex<I, A>): <U, L>(
      fa: Type3<F, U, L, A>
    ) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => <U, L>(fa: Type3<F, U, L, A>) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
}

export interface PipeableProfunctor<F> {
  readonly map: <L, A, B>(f: (a: A) => B) => (fa: HKT2<F, L, A>) => HKT2<F, L, B>
  readonly promap: <A, B, C, D>(f: (a: A) => B, g: (c: C) => D) => (fbc: HKT2<F, B, C>) => HKT2<F, A, D>
}

export interface PipeableProfunctor2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly promap: <A, B, C, D>(f: (a: A) => B, g: (c: C) => D) => (fbc: Type2<F, B, C>) => Type2<F, A, D>
}

export interface PipeableProfunctor2C<F extends URIS2, L> extends PipeableFunctor2C<F, L> {
  readonly promap: <A, C, D>(f: (a: A) => L, g: (c: C) => D) => (flc: Type2<F, L, C>) => Type2<F, A, D>
}

export interface PipeableProfunctor3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly promap: <U, A, B, C, D>(f: (a: A) => B, g: (c: C) => D) => (fbc: Type3<F, U, B, C>) => Type3<F, U, A, D>
}

export interface PipeableSemigroupoid<F> {
  readonly compose: <L, A>(la: HKT2<F, L, A>) => <B>(ab: HKT2<F, A, B>) => HKT2<F, L, B>
}

export interface PipeableSemigroupoid2<F extends URIS2> {
  readonly compose: <L, A>(la: Type2<F, L, A>) => <B>(ab: Type2<F, A, B>) => Type2<F, L, B>
}

export interface PipeableSemigroupoid2C<F extends URIS2, L> {
  readonly compose: <A>(la: Type2<F, L, A>) => <B>(ab: Type2<F, A, B>) => Type2<F, L, B>
}

export interface PipeableSemigroupoid3<F extends URIS3> {
  readonly compose: <U, L, A>(la: Type3<F, U, L, A>) => <B>(ab: Type3<F, U, A, B>) => Type3<F, U, L, B>
}

const isFunctor = <F>(I: any): I is Functor<F> => typeof I.map === 'function'
const isFunctorWithIndex = <F>(I: any): I is FunctorWithIndex<F, unknown> => typeof I.mapWithIndex === 'function'
const isApply = <F>(I: any): I is Apply<F> => typeof I.ap === 'function'
const isChain = <F>(I: any): I is Chain<F> => typeof I.chain === 'function'
const isBifunctor = <F>(I: any): I is Bifunctor<F> => typeof I.bimap === 'function'
const isExtend = <F>(I: any): I is Extend<F> => typeof I.extend === 'function'
const isFoldable = <F>(I: any): I is Foldable<F> => typeof I.reduce === 'function'
const isFoldableWithIndex = <F>(I: any): I is FoldableWithIndex<F, unknown> => typeof I.reduceWithIndex === 'function'
const isAlt = <F>(I: any): I is Alt<F> => typeof I.alt === 'function'
const isCompactable = <F>(I: any): I is Compactable<F> => typeof I.compact === 'function'
const isFilterable = <F>(I: any): I is Filterable<F> => typeof I.filter === 'function'
const isFilterableWithIndex = <F>(I: any): I is FilterableWithIndex<F, unknown> =>
  typeof I.filterWithIndex === 'function'
const isProfunctor = <F>(I: any): I is Profunctor<F> => typeof I.promap === 'function'
const isSemigroupoid = <F>(I: any): I is Semigroupoid<F> => typeof I.compose === 'function'

/**
 * @since 2.0.0
 */
export function pipeable<F extends URIS3, I>(
  I: { URI: F } & I
): (I extends Chain3<F>
  ? PipeableChain3<F>
  : I extends Apply3<F>
  ? PipeableApply3<F>
  : I extends Functor3<F>
  ? PipeableFunctor3<F>
  : {}) &
  (I extends FunctorWithIndex3<F, infer Ix> ? PipeableFunctorWithIndex3<F, Ix> : {}) &
  (I extends Bifunctor3<F> ? PipeableBifunctor3<F> : {}) &
  (I extends Extend3<F> ? PipeableExtend3<F> : {}) &
  (I extends FoldableWithIndex3<F, infer Ix>
    ? PipeableFoldableWithIndex3<F, Ix>
    : I extends Foldable3<F>
    ? PipeableFoldable3<F>
    : {}) &
  (I extends Alt3<F> ? PipeableAlt3<F> : {}) &
  (I extends FilterableWithIndex3<F, infer Ix>
    ? PipeableFilterableWithIndex3<F, Ix>
    : I extends Filterable3<F>
    ? PipeableFilterable3<F>
    : I extends Compactable3<F>
    ? PipeableCompactable3<F>
    : {}) &
  (I extends Profunctor3<F> ? PipeableProfunctor3<F> : {}) &
  (I extends Semigroupoid3<F> ? PipeableSemigroupoid3<F> : {})
export function pipeable<F extends URIS2, I, L>(
  I: { URI: F; _L: L } & I
): (I extends Chain2C<F, L>
  ? PipeableChain2C<F, L>
  : I extends Apply2C<F, L>
  ? PipeableApply2C<F, L>
  : I extends Functor2C<F, L>
  ? PipeableFunctor2C<F, L>
  : {}) &
  (I extends FunctorWithIndex2C<F, infer Ix, L> ? PipeableFunctorWithIndex2C<F, Ix, L> : {}) &
  (I extends Extend2C<F, L> ? PipeableExtend2C<F, L> : {}) &
  (I extends FoldableWithIndex2C<F, infer Ix, L>
    ? PipeableFoldableWithIndex2C<F, Ix, L>
    : I extends Foldable2C<F, L>
    ? PipeableFoldable2C<F, L>
    : {}) &
  (I extends Alt2C<F, L> ? PipeableAlt2C<F, L> : {}) &
  (I extends FilterableWithIndex2C<F, infer Ix, L>
    ? PipeableFilterableWithIndex2C<F, Ix, L>
    : I extends Filterable2C<F, L>
    ? PipeableFilterable2C<F, L>
    : I extends Compactable2C<F, L>
    ? PipeableCompactable2C<F, L>
    : {}) &
  (I extends Profunctor2C<F, L> ? PipeableProfunctor2C<F, L> : {}) &
  (I extends Semigroupoid2C<F, L> ? PipeableSemigroupoid2C<F, L> : {})
export function pipeable<F extends URIS2, I>(
  I: { URI: F } & I
): (I extends Chain2<F>
  ? PipeableChain2<F>
  : I extends Apply2<F>
  ? PipeableApply2<F>
  : I extends Functor2<F>
  ? PipeableFunctor2<F>
  : {}) &
  (I extends FunctorWithIndex2<F, infer Ix> ? PipeableFunctorWithIndex2<F, Ix> : {}) &
  (I extends Bifunctor2<F> ? PipeableBifunctor2<F> : {}) &
  (I extends Extend2<F> ? PipeableExtend2<F> : {}) &
  (I extends FoldableWithIndex2<F, infer Ix>
    ? PipeableFoldableWithIndex2<F, Ix>
    : I extends Foldable2<F>
    ? PipeableFoldable2<F>
    : {}) &
  (I extends Alt2<F> ? PipeableAlt2<F> : {}) &
  (I extends FilterableWithIndex2<F, infer Ix>
    ? PipeableFilterableWithIndex2<F, Ix>
    : I extends Filterable2<F>
    ? PipeableFilterable2<F>
    : I extends Compactable2<F>
    ? PipeableCompactable2<F>
    : {}) &
  (I extends Profunctor2<F> ? PipeableProfunctor2<F> : {}) &
  (I extends Semigroupoid2<F> ? PipeableSemigroupoid2<F> : {})
export function pipeable<F extends URIS, I>(
  I: { URI: F } & I
): (I extends Chain1<F>
  ? PipeableChain1<F>
  : I extends Apply1<F>
  ? PipeableApply1<F>
  : I extends Functor1<F>
  ? PipeableFunctor1<F>
  : {}) &
  (I extends FunctorWithIndex1<F, infer Ix> ? PipeableFunctorWithIndex1<F, Ix> : {}) &
  (I extends Extend1<F> ? PipeableExtend1<F> : {}) &
  (I extends FoldableWithIndex1<F, infer Ix>
    ? PipeableFoldableWithIndex1<F, Ix>
    : I extends Foldable1<F>
    ? PipeableFoldable1<F>
    : {}) &
  (I extends Alt1<F> ? PipeableAlt1<F> : {}) &
  (I extends FilterableWithIndex1<F, infer Ix>
    ? PipeableFilterableWithIndex1<F, Ix>
    : I extends Filterable1<F>
    ? PipeableFilterable1<F>
    : I extends Compactable1<F>
    ? PipeableCompactable1<F>
    : {})
export function pipeable<F, I>(
  I: { URI: F } & I
): (I extends Chain<F>
  ? PipeableChain<F>
  : I extends Apply<F>
  ? PipeableApply<F>
  : I extends Functor<F>
  ? PipeableFunctor<F>
  : {}) &
  (I extends FunctorWithIndex<F, infer Ix> ? PipeableFunctorWithIndex<F, Ix> : {}) &
  (I extends Bifunctor<F> ? PipeableBifunctor<F> : {}) &
  (I extends Extend<F> ? PipeableExtend<F> : {}) &
  (I extends FoldableWithIndex<F, infer Ix>
    ? PipeableFoldableWithIndex<F, Ix>
    : I extends Foldable<F>
    ? PipeableFoldable<F>
    : {}) &
  (I extends Alt<F> ? PipeableAlt<F> : {}) &
  (I extends FilterableWithIndex<F, infer Ix>
    ? PipeableFilterableWithIndex<F, Ix>
    : I extends Filterable<F>
    ? PipeableFilterable<F>
    : I extends Compactable<F>
    ? PipeableCompactable<F>
    : {}) &
  (I extends Profunctor<F> ? PipeableProfunctor<F> : {}) &
  (I extends Semigroupoid<F> ? PipeableSemigroupoid<F> : {})
export function pipeable<F, I>(I: { URI: F } & I): any {
  const r: any = {}
  if (isFunctor<F>(I)) {
    const map: PipeableFunctor<F>['map'] = f => fa => I.map(fa, f)
    r.map = map
  }
  if (isFunctorWithIndex<F>(I)) {
    const mapWithIndex: PipeableFunctorWithIndex<F, unknown>['mapWithIndex'] = f => fa => I.mapWithIndex(fa, f)
    r.mapWithIndex = mapWithIndex
  }
  if (isApply<F>(I)) {
    const ap: PipeableApply<F>['ap'] = fa => fab => I.ap(fab, fa)
    const apFirst: PipeableApply<F>['apFirst'] = fb => fa => I.ap(I.map(fa, a => () => a), fb)
    r.ap = ap
    r.apFirst = apFirst
    r.apSecond = <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>): HKT<F, B> => I.ap(I.map(fa, () => (b: B) => b), fb)
  }
  if (isChain<F>(I)) {
    const chain: PipeableChain<F>['chain'] = f => ma => I.chain(ma, f)
    const chainFirst: PipeableChain<F>['chainFirst'] = f => ma => I.chain(ma, a => I.map(f(a), () => a))
    const flatten: PipeableChain<F>['flatten'] = mma => I.chain(mma, identity)
    r.chain = chain
    r.chainFirst = chainFirst
    r.flatten = flatten
  }
  if (isBifunctor<F>(I)) {
    const bimap: PipeableBifunctor<F>['bimap'] = (f, g) => fa => I.bimap(fa, f, g)
    const mapLeft: PipeableBifunctor<F>['mapLeft'] = f => fa => I.mapLeft(fa, f)
    r.bimap = bimap
    r.mapLeft = mapLeft
  }
  if (isExtend<F>(I)) {
    const extend: PipeableExtend<F>['extend'] = f => wa => I.extend(wa, f)
    const duplicate: PipeableExtend<F>['duplicate'] = wa => I.extend(wa, identity)
    r.extend = extend
    r.duplicate = duplicate
  }
  if (isFoldable<F>(I)) {
    const reduce: PipeableFoldable<F>['reduce'] = (b, f) => fa => I.reduce(fa, b, f)
    const foldMap: PipeableFoldable<F>['foldMap'] = M => {
      const foldMapM = I.foldMap(M)
      return f => fa => foldMapM(fa, f)
    }
    const reduceRight: PipeableFoldable<F>['reduceRight'] = (b, f) => fa => I.reduceRight(fa, b, f)
    r.reduce = reduce
    r.foldMap = foldMap
    r.reduceRight = reduceRight
  }
  if (isFoldableWithIndex<F>(I)) {
    const reduceWithIndex: PipeableFoldableWithIndex<F, unknown>['reduceWithIndex'] = (b, f) => fa =>
      I.reduceWithIndex(fa, b, f)
    const foldMapWithIndex: PipeableFoldableWithIndex<F, unknown>['foldMapWithIndex'] = M => {
      const foldMapM = I.foldMapWithIndex(M)
      return f => fa => foldMapM(fa, f)
    }
    const reduceRightWithIndex: PipeableFoldableWithIndex<F, unknown>['reduceRightWithIndex'] = (b, f) => fa =>
      I.reduceRightWithIndex(fa, b, f)
    r.reduceWithIndex = reduceWithIndex
    r.foldMapWithIndex = foldMapWithIndex
    r.reduceRightWithIndex = reduceRightWithIndex
  }
  if (isAlt<F>(I)) {
    const alt: PipeableAlt<F>['alt'] = that => fa => I.alt(fa, that)
    r.alt = alt
  }
  if (isCompactable<F>(I)) {
    const compact: PipeableCompactable<F>['compact'] = fa => I.compact(fa)
    const separate: PipeableCompactable<F>['separate'] = fa => I.separate(fa)
    r.compact = compact
    r.separate = separate
  }
  if (isFilterable<F>(I)) {
    const filter: PipeableFilterable<F>['filter'] = <A>(predicate: Predicate<A>) => (fa: HKT<F, A>) =>
      I.filter(fa, predicate)
    const filterMap: PipeableFilterable<F>['filterMap'] = f => fa => I.filterMap(fa, f)
    const partition: PipeableFilterable<F>['partition'] = <A>(predicate: Predicate<A>) => (fa: HKT<F, A>) =>
      I.partition(fa, predicate)
    const partitionMap: PipeableFilterable<F>['partitionMap'] = f => fa => I.partitionMap(fa, f)
    r.filter = filter
    r.filterMap = filterMap
    r.partition = partition
    r.partitionMap = partitionMap
  }
  if (isFilterableWithIndex<F>(I)) {
    const filterWithIndex: PipeableFilterableWithIndex<F, unknown>['filterWithIndex'] = <A>(
      predicate: PredicateWithIndex<unknown, A>
    ) => (fa: HKT<F, A>) => I.filterWithIndex(fa, predicate)
    const filterMapWithIndex: PipeableFilterableWithIndex<F, unknown>['filterMapWithIndex'] = f => fa =>
      I.filterMapWithIndex(fa, f)
    const partitionWithIndex: PipeableFilterableWithIndex<F, unknown>['partitionWithIndex'] = <A>(
      predicate: PredicateWithIndex<unknown, A>
    ) => (fa: HKT<F, A>) => I.partitionWithIndex(fa, predicate)
    const partitionMapWithIndex: PipeableFilterableWithIndex<F, unknown>['partitionMapWithIndex'] = f => fa =>
      I.partitionMapWithIndex(fa, f)
    r.filterWithIndex = filterWithIndex
    r.filterMapWithIndex = filterMapWithIndex
    r.partitionWithIndex = partitionWithIndex
    r.partitionMapWithIndex = partitionMapWithIndex
  }
  if (isProfunctor<F>(I)) {
    const promap: PipeableProfunctor<F>['promap'] = (f, g) => fa => I.promap(fa, f, g)
    r.promap = promap
  }
  if (isSemigroupoid<F>(I)) {
    const compose: PipeableSemigroupoid<F>['compose'] = that => fa =>
      I.compose(
        fa,
        that
      )
    r.compose = compose
  }
  return r
}
