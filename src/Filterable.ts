/**
 * @file `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 */
import {
  Compactable,
  Compactable1,
  Compactable2,
  Compactable2C,
  Compactable3,
  CompactableComposition,
  CompactableComposition11,
  CompactableComposition12,
  CompactableComposition12C,
  CompactableComposition21,
  CompactableComposition22,
  getCompactableComposition,
  Separated
} from './Compactable'
import { Either } from './Either'
import { Predicate, Refinement } from './function'
import {
  Functor,
  Functor1,
  Functor2,
  Functor2C,
  Functor3,
  FunctorComposition,
  FunctorComposition11,
  FunctorComposition12,
  FunctorComposition12C,
  FunctorComposition21,
  FunctorComposition22
} from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { getLeft, getRight, Option } from './Option'

interface Filter<F> {
  <A, B extends A>(fa: HKT<F, A>, refinement: Refinement<A, B>): HKT<F, B>
  <A>(fa: HKT<F, A>, predicate: Predicate<A>): HKT<F, A>
}

interface Partition<F> {
  <A, B extends A>(fa: HKT<F, A>, refinement: Refinement<A, B>): Separated<HKT<F, A>, HKT<F, B>>
  <A>(fa: HKT<F, A>, predicate: Predicate<A>): Separated<HKT<F, A>, HKT<F, A>>
}

/**
 * @since 2.0.0
 */
export interface Filterable<F> extends Functor<F>, Compactable<F> {
  /**
   * Partition a data structure based on an either predicate.
   */
  readonly partitionMap: <RL, RR, A>(fa: HKT<F, A>, f: (a: A) => Either<RL, RR>) => Separated<HKT<F, RL>, HKT<F, RR>>
  /**
   * Partition a data structure based on a boolean predicate.
   */
  readonly partition: Partition<F>
  /**
   * Map over a data structure and filter based on an option predicate.
   */
  readonly filterMap: <A, B>(fa: HKT<F, A>, f: (a: A) => Option<B>) => HKT<F, B>
  /**
   * Filter a data structure based on a boolean predicate.
   */
  readonly filter: Filter<F>
}

interface Filter1<F extends URIS> {
  <A, B extends A>(fa: Type<F, A>, refinement: Refinement<A, B>): Type<F, B>
  <A>(fa: Type<F, A>, predicate: Predicate<A>): Type<F, A>
}

interface Partition1<F extends URIS> {
  <A, B extends A>(fa: Type<F, A>, refinement: Refinement<A, B>): Separated<Type<F, A>, Type<F, B>>
  <A>(fa: Type<F, A>, predicate: Predicate<A>): Separated<Type<F, A>, Type<F, A>>
}

/**
 * @since 2.0.0
 */
export interface Filterable1<F extends URIS> extends Functor1<F>, Compactable1<F> {
  readonly partitionMap: <RL, RR, A>(fa: Type<F, A>, f: (a: A) => Either<RL, RR>) => Separated<Type<F, RL>, Type<F, RR>>
  readonly partition: Partition1<F>
  readonly filterMap: <A, B>(fa: Type<F, A>, f: (a: A) => Option<B>) => Type<F, B>
  readonly filter: Filter1<F>
}

interface Filter2<F extends URIS2> {
  <L, A, B extends A>(fa: Type2<F, L, A>, refinement: Refinement<A, B>): Type2<F, L, B>
  <L, A>(fa: Type2<F, L, A>, predicate: Predicate<A>): Type2<F, L, A>
}

interface Partition2<F extends URIS2> {
  <L, A, B extends A>(fa: Type2<F, L, A>, refinement: Refinement<A, B>): Separated<Type2<F, L, A>, Type2<F, L, B>>
  <L, A>(fa: Type2<F, L, A>, predicate: Predicate<A>): Separated<Type2<F, L, A>, Type2<F, L, A>>
}

/**
 * @since 2.0.0
 */
export interface Filterable2<F extends URIS2> extends Functor2<F>, Compactable2<F> {
  readonly partitionMap: <RL, RR, L, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partition: Partition2<F>
  readonly filterMap: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  readonly filter: Filter2<F>
}

interface Filter2C<F extends URIS2, L> {
  <A, B extends A>(fa: Type2<F, L, A>, refinement: Refinement<A, B>): Type2<F, L, B>
  <A>(fa: Type2<F, L, A>, predicate: Predicate<A>): Type2<F, L, A>
}

interface Partition2C<F extends URIS2, L> {
  <A, B extends A>(fa: Type2<F, L, A>, refinement: Refinement<A, B>): Separated<Type2<F, L, A>, Type2<F, L, B>>
  <A>(fa: Type2<F, L, A>, predicate: Predicate<A>): Separated<Type2<F, L, A>, Type2<F, L, A>>
}

/**
 * @since 2.0.0
 */
export interface Filterable2C<F extends URIS2, L> extends Functor2C<F, L>, Compactable2C<F, L> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partition: Partition2C<F, L>
  readonly filterMap: <A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  readonly filter: Filter2C<F, L>
}

interface Filter3<F extends URIS3> {
  <U, L, A, B extends A>(fa: Type3<F, U, L, A>, refinement: Refinement<A, B>): Type3<F, U, L, B>
  <U, L, A>(fa: Type3<F, U, L, A>, predicate: Predicate<A>): Type3<F, U, L, A>
}

interface Partition3<F extends URIS3> {
  <U, L, A, B extends A>(fa: Type3<F, U, L, A>, refinement: Refinement<A, B>): Separated<
    Type3<F, U, L, A>,
    Type3<F, U, L, B>
  >
  <U, L, A>(fa: Type3<F, U, L, A>, predicate: Predicate<A>): Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
}

/**
 * @since 2.0.0
 */
export interface Filterable3<F extends URIS3> extends Functor3<F>, Compactable3<F> {
  readonly partitionMap: <RL, RR, U, L, A>(
    fa: Type3<F, U, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly partition: Partition3<F>
  readonly filterMap: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filter: Filter3<F>
}

export interface FilterableComposition<F, G> extends FunctorComposition<F, G>, CompactableComposition<F, G> {
  readonly partitionMap: <RL, RR, A>(
    fa: HKT<F, HKT<G, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<HKT<F, HKT<G, RL>>, HKT<F, HKT<G, RR>>>
  readonly partition: <A>(
    fa: HKT<F, HKT<G, A>>,
    predicate: Predicate<A>
  ) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, A>>>
  readonly filterMap: <A, B>(fa: HKT<F, HKT<G, A>>, f: (a: A) => Option<B>) => HKT<F, HKT<G, B>>
  readonly filter: <A>(fa: HKT<F, HKT<G, A>>, predicate: Predicate<A>) => HKT<F, HKT<G, A>>
}

export interface FilterableComposition11<F extends URIS, G extends URIS>
  extends FunctorComposition11<F, G>,
    CompactableComposition11<F, G> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type<F, Type<G, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type<F, Type<G, RL>>, Type<F, Type<G, RR>>>
  readonly partition: <A>(
    fa: Type<F, Type<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Type<F, Type<G, A>>, Type<F, Type<G, A>>>
  readonly filterMap: <A, B>(fa: Type<F, Type<G, A>>, f: (a: A) => Option<B>) => Type<F, Type<G, B>>
  readonly filter: <A>(fa: Type<F, Type<G, A>>, predicate: Predicate<A>) => Type<F, Type<G, A>>
}

export interface FilterableComposition12<F extends URIS, G extends URIS2>
  extends FunctorComposition12<F, G>,
    CompactableComposition12<F, G> {
  readonly partitionMap: <LG, RL, RR, A>(
    fa: Type<F, Type2<G, LG, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type<F, Type2<G, LG, RL>>, Type<F, Type2<G, LG, RR>>>
  readonly partition: <LG, A>(
    fa: Type<F, Type2<G, LG, A>>,
    predicate: Predicate<A>
  ) => Separated<Type<F, Type2<G, LG, A>>, Type<F, Type2<G, LG, A>>>
  readonly filterMap: <LG, A, B>(fa: Type<F, Type2<G, LG, A>>, f: (a: A) => Option<B>) => Type<F, Type2<G, LG, B>>
  readonly filter: <LG, A>(fa: Type<F, Type2<G, LG, A>>, predicate: Predicate<A>) => Type<F, Type2<G, LG, A>>
}

export interface FilterableComposition12C<F extends URIS, G extends URIS2, LG>
  extends FunctorComposition12C<F, G, LG>,
    CompactableComposition12C<F, G, LG> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type<F, Type2<G, LG, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type<F, Type2<G, LG, RL>>, Type<F, Type2<G, LG, RR>>>
  readonly partition: <A>(
    fa: Type<F, Type2<G, LG, A>>,
    predicate: Predicate<A>
  ) => Separated<Type<F, Type2<G, LG, A>>, Type<F, Type2<G, LG, A>>>
  readonly filterMap: <A, B>(fa: Type<F, Type2<G, LG, A>>, f: (a: A) => Option<B>) => Type<F, Type2<G, LG, B>>
  readonly filter: <A>(fa: Type<F, Type2<G, LG, A>>, predicate: Predicate<A>) => Type<F, Type2<G, LG, A>>
}

export interface FilterableComposition21<F extends URIS2, G extends URIS>
  extends FunctorComposition21<F, G>,
    CompactableComposition21<F, G> {
  readonly partitionMap: <LF, RL, RR, A>(
    fa: Type2<F, LF, Type<G, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, LF, Type<G, RL>>, Type2<F, LF, Type<G, RR>>>
  readonly partition: <LF, A>(
    fa: Type2<F, LF, Type<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Type2<F, LF, Type<G, A>>, Type2<F, LF, Type<G, A>>>
  readonly filterMap: <LF, A, B>(fa: Type2<F, LF, Type<G, A>>, f: (a: A) => Option<B>) => Type2<F, LF, Type<G, B>>
  readonly filter: <LF, A>(fa: Type2<F, LF, Type<G, A>>, predicate: Predicate<A>) => Type2<F, LF, Type<G, A>>
}

export interface FilterableComposition2C1<F extends URIS2, G extends URIS, LF>
  extends FunctorComposition21<F, G>,
    CompactableComposition21<F, G> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type2<F, LF, Type<G, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, LF, Type<G, RL>>, Type2<F, LF, Type<G, RR>>>
  readonly partition: <A>(
    fa: Type2<F, LF, Type<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Type2<F, LF, Type<G, A>>, Type2<F, LF, Type<G, A>>>
  readonly filterMap: <A, B>(fa: Type2<F, LF, Type<G, A>>, f: (a: A) => Option<B>) => Type2<F, LF, Type<G, B>>
  readonly filter: <A>(fa: Type2<F, LF, Type<G, A>>, predicate: Predicate<A>) => Type2<F, LF, Type<G, A>>
}

export interface FilterableComposition22<F extends URIS2, G extends URIS2>
  extends FunctorComposition22<F, G>,
    CompactableComposition22<F, G> {
  readonly partitionMap: <LF, LG, RL, RR, A>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, LF, Type2<G, LG, RL>>, Type2<F, LF, Type2<G, LG, RR>>>
  readonly partition: <LF, LG, A>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    predicate: Predicate<A>
  ) => Separated<Type2<F, LF, Type2<G, LG, A>>, Type2<F, LF, Type2<G, LG, A>>>
  readonly filterMap: <LF, LG, A, B>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    f: (a: A) => Option<B>
  ) => Type2<F, LF, Type2<G, LG, B>>
  readonly filter: <LF, LG, A>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    predicate: Predicate<A>
  ) => Type2<F, LF, Type2<G, LG, A>>
}

export interface FilterableComposition22C<F extends URIS2, G extends URIS2, LG>
  extends FunctorComposition22<F, G>,
    CompactableComposition22<F, G> {
  readonly partitionMap: <LF, RL, RR, A>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, LF, Type2<G, LG, RL>>, Type2<F, LF, Type2<G, LG, RR>>>
  readonly partition: <LF, A>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    predicate: Predicate<A>
  ) => Separated<Type2<F, LF, Type2<G, LG, A>>, Type2<F, LF, Type2<G, LG, A>>>
  readonly filterMap: <LF, A, B>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    f: (a: A) => Option<B>
  ) => Type2<F, LF, Type2<G, LG, B>>
  readonly filter: <LF, A>(fa: Type2<F, LF, Type2<G, LG, A>>, predicate: Predicate<A>) => Type2<F, LF, Type2<G, LG, A>>
}

/**
 * @since 2.0.0
 */
export function getFilterableComposition<F extends URIS2, G extends URIS2, LG>(
  F: Functor2<F>,
  G: Filterable2C<G, LG>
): FilterableComposition22C<F, G, LG>
export function getFilterableComposition<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Filterable2<G>
): FilterableComposition22<F, G>
export function getFilterableComposition<F extends URIS2, G extends URIS, LF>(
  F: Functor2C<F, LF>,
  G: Filterable1<G>
): FilterableComposition2C1<F, G, LF>
export function getFilterableComposition<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Filterable1<G>
): FilterableComposition21<F, G>
export function getFilterableComposition<F extends URIS, G extends URIS2, LG>(
  F: Functor1<F>,
  G: Filterable2C<G, LG>
): FilterableComposition12C<F, G, LG>
export function getFilterableComposition<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Filterable2<G>
): FilterableComposition12<F, G>
export function getFilterableComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Filterable1<G>
): FilterableComposition11<F, G>
export function getFilterableComposition<F, G>(F: Functor<F>, G: Filterable<G>): FilterableComposition<F, G>
export function getFilterableComposition<F, G>(F: Functor<F>, G: Filterable<G>): FilterableComposition<F, G> {
  const FC: FilterableComposition<F, G> = {
    ...getCompactableComposition(F, G),
    partitionMap: (fga, f) => {
      const left = FC.filterMap(fga, a => getLeft(f(a)))
      const right = FC.filterMap(fga, a => getRight(f(a)))
      return { left, right }
    },
    partition: (fga, p) => {
      const left = FC.filter(fga, a => !p(a))
      const right = FC.filter(fga, p)
      return { left, right }
    },
    filterMap: (fga, f) => F.map(fga, ga => G.filterMap(ga, f)),
    filter: (fga, f) => F.map(fga, ga => G.filter(ga, f))
  }
  return FC
}
