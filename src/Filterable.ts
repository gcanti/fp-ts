/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 *
 * @since 2.0.0
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
  Separated,
  Compactable4,
  Compactable3C,
  CompactableComposition23
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
  FunctorComposition22,
  Functor4,
  Functor3C,
  FunctorComposition23
} from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3, URIS4, Kind4 } from './HKT'
import { getLeft, getRight, Option } from './Option'

/**
 * @since 2.0.0
 */
export interface Filter<F> {
  <A, B extends A>(fa: HKT<F, A>, refinement: Refinement<A, B>): HKT<F, B>
  <A>(fa: HKT<F, A>, predicate: Predicate<A>): HKT<F, A>
}

/**
 * @since 2.0.0
 */
export interface Partition<F> {
  <A, B extends A>(fa: HKT<F, A>, refinement: Refinement<A, B>): Separated<HKT<F, A>, HKT<F, B>>
  <A>(fa: HKT<F, A>, predicate: Predicate<A>): Separated<HKT<F, A>, HKT<F, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable<F> extends Functor<F>, Compactable<F> {
  /**
   * Partition a data structure based on an either predicate.
   */
  readonly partitionMap: <A, B, C>(fa: HKT<F, A>, f: (a: A) => Either<B, C>) => Separated<HKT<F, B>, HKT<F, C>>
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

/**
 * @since 2.0.0
 */
export interface Filter1<F extends URIS> {
  <A, B extends A>(fa: Kind<F, A>, refinement: Refinement<A, B>): Kind<F, B>
  <A>(fa: Kind<F, A>, predicate: Predicate<A>): Kind<F, A>
}

/**
 * @since 2.0.0
 */
export interface Partition1<F extends URIS> {
  <A, B extends A>(fa: Kind<F, A>, refinement: Refinement<A, B>): Separated<Kind<F, A>, Kind<F, B>>
  <A>(fa: Kind<F, A>, predicate: Predicate<A>): Separated<Kind<F, A>, Kind<F, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable1<F extends URIS> extends Functor1<F>, Compactable1<F> {
  readonly partitionMap: <A, B, C>(fa: Kind<F, A>, f: (a: A) => Either<B, C>) => Separated<Kind<F, B>, Kind<F, C>>
  readonly partition: Partition1<F>
  readonly filterMap: <A, B>(fa: Kind<F, A>, f: (a: A) => Option<B>) => Kind<F, B>
  readonly filter: Filter1<F>
}

/**
 * @since 2.0.0
 */
export interface Filter2<F extends URIS2> {
  <E, A, B extends A>(fa: Kind2<F, E, A>, refinement: Refinement<A, B>): Kind2<F, E, B>
  <E, A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface Partition2<F extends URIS2> {
  <E, A, B extends A>(fa: Kind2<F, E, A>, refinement: Refinement<A, B>): Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <E, A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable2<F extends URIS2> extends Functor2<F>, Compactable2<F> {
  readonly partitionMap: <E, A, B, C>(
    fa: Kind2<F, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2<F>
  readonly filterMap: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => Option<B>) => Kind2<F, E, B>
  readonly filter: Filter2<F>
}

/**
 * @since 2.0.0
 */
export interface Filter2C<F extends URIS2, E> {
  <A, B extends A>(fa: Kind2<F, E, A>, refinement: Refinement<A, B>): Kind2<F, E, B>
  <A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface Partition2C<F extends URIS2, E> {
  <A, B extends A>(fa: Kind2<F, E, A>, refinement: Refinement<A, B>): Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(fa: Kind2<F, E, A>, predicate: Predicate<A>): Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable2C<F extends URIS2, E> extends Functor2C<F, E>, Compactable2C<F, E> {
  readonly partitionMap: <A, B, C>(
    fa: Kind2<F, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2C<F, E>
  readonly filterMap: <A, B>(fa: Kind2<F, E, A>, f: (a: A) => Option<B>) => Kind2<F, E, B>
  readonly filter: Filter2C<F, E>
}

/**
 * @since 2.0.0
 */
export interface Filter3<F extends URIS3> {
  <R, E, A, B extends A>(fa: Kind3<F, R, E, A>, refinement: Refinement<A, B>): Kind3<F, R, E, B>
  <R, E, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Kind3<F, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface Partition3<F extends URIS3> {
  <R, E, A, B extends A>(fa: Kind3<F, R, E, A>, refinement: Refinement<A, B>): Separated<
    Kind3<F, R, E, A>,
    Kind3<F, R, E, B>
  >
  <R, E, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable3<F extends URIS3> extends Functor3<F>, Compactable3<F> {
  readonly partitionMap: <R, E, A, B, C>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3<F>
  readonly filterMap: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => Option<B>) => Kind3<F, R, E, B>
  readonly filter: Filter3<F>
}

/**
 * @since 2.2.0
 */
export interface Filter3C<F extends URIS3, E> {
  <R, A, B extends A>(fa: Kind3<F, R, E, A>, refinement: Refinement<A, B>): Kind3<F, R, E, B>
  <R, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Kind3<F, R, E, A>
}

/**
 * @since 2.2.0
 */
export interface Partition3C<F extends URIS3, E> {
  <R, A, B extends A>(fa: Kind3<F, R, E, A>, refinement: Refinement<A, B>): Separated<
    Kind3<F, R, E, A>,
    Kind3<F, R, E, B>
  >
  <R, A>(fa: Kind3<F, R, E, A>, predicate: Predicate<A>): Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Filterable3C<F extends URIS3, E> extends Functor3C<F, E>, Compactable3C<F, E> {
  readonly partitionMap: <R, A, B, C>(
    fa: Kind3<F, R, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3C<F, E>
  readonly filterMap: <R, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => Option<B>) => Kind3<F, R, E, B>
  readonly filter: Filter3C<F, E>
}

/**
 * @since 2.0.0
 */
export interface Filter4<F extends URIS4> {
  <S, R, E, A, B extends A>(fa: Kind4<F, S, R, E, A>, refinement: Refinement<A, B>): Kind4<F, S, R, E, B>
  <S, R, E, A>(fa: Kind4<F, S, R, E, A>, predicate: Predicate<A>): Kind4<F, S, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface Partition4<F extends URIS4> {
  <S, R, E, A, B extends A>(fa: Kind4<F, S, R, E, A>, refinement: Refinement<A, B>): Separated<
    Kind4<F, S, R, E, A>,
    Kind4<F, S, R, E, B>
  >
  <S, R, E, A>(fa: Kind4<F, S, R, E, A>, predicate: Predicate<A>): Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable4<F extends URIS4> extends Functor4<F>, Compactable4<F> {
  readonly partitionMap: <S, R, E, A, B, C>(
    fa: Kind4<F, S, R, E, A>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
  readonly partition: Partition4<F>
  readonly filterMap: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, f: (a: A) => Option<B>) => Kind4<F, S, R, E, B>
  readonly filter: Filter4<F>
}

/**
 * @since 2.0.0
 */
export interface FilterableComposition<F, G> extends FunctorComposition<F, G>, CompactableComposition<F, G> {
  readonly partitionMap: <A, B, C>(
    fa: HKT<F, HKT<G, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<HKT<F, HKT<G, B>>, HKT<F, HKT<G, C>>>
  readonly partition: <A>(
    fa: HKT<F, HKT<G, A>>,
    predicate: Predicate<A>
  ) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, A>>>
  readonly filterMap: <A, B>(fa: HKT<F, HKT<G, A>>, f: (a: A) => Option<B>) => HKT<F, HKT<G, B>>
  readonly filter: <A>(fa: HKT<F, HKT<G, A>>, predicate: Predicate<A>) => HKT<F, HKT<G, A>>
}

/**
 * @since 2.0.0
 */
export interface FilterableComposition11<F extends URIS, G extends URIS>
  extends FunctorComposition11<F, G>,
    CompactableComposition11<F, G> {
  readonly partitionMap: <A, B, C>(
    fa: Kind<F, Kind<G, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind<F, Kind<G, B>>, Kind<F, Kind<G, C>>>
  readonly partition: <A>(
    fa: Kind<F, Kind<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind<F, Kind<G, A>>, Kind<F, Kind<G, A>>>
  readonly filterMap: <A, B>(fa: Kind<F, Kind<G, A>>, f: (a: A) => Option<B>) => Kind<F, Kind<G, B>>
  readonly filter: <A>(fa: Kind<F, Kind<G, A>>, predicate: Predicate<A>) => Kind<F, Kind<G, A>>
}

/**
 * @since 2.0.0
 */
export interface FilterableComposition12<F extends URIS, G extends URIS2>
  extends FunctorComposition12<F, G>,
    CompactableComposition12<F, G> {
  readonly partitionMap: <E, A, B, C>(
    fa: Kind<F, Kind2<G, E, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind<F, Kind2<G, E, B>>, Kind<F, Kind2<G, E, C>>>
  readonly partition: <E, A>(
    fa: Kind<F, Kind2<G, E, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, A>>>
  readonly filterMap: <E, A, B>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => Option<B>) => Kind<F, Kind2<G, E, B>>
  readonly filter: <E, A>(fa: Kind<F, Kind2<G, E, A>>, predicate: Predicate<A>) => Kind<F, Kind2<G, E, A>>
}

/**
 * @since 2.0.0
 */
export interface FilterableComposition12C<F extends URIS, G extends URIS2, E>
  extends FunctorComposition12C<F, G, E>,
    CompactableComposition12C<F, G, E> {
  readonly partitionMap: <A, B, C>(
    fa: Kind<F, Kind2<G, E, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind<F, Kind2<G, E, B>>, Kind<F, Kind2<G, E, C>>>
  readonly partition: <A>(
    fa: Kind<F, Kind2<G, E, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, A>>>
  readonly filterMap: <A, B>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => Option<B>) => Kind<F, Kind2<G, E, B>>
  readonly filter: <A>(fa: Kind<F, Kind2<G, E, A>>, predicate: Predicate<A>) => Kind<F, Kind2<G, E, A>>
}

/**
 * @since 2.0.0
 */
export interface FilterableComposition21<F extends URIS2, G extends URIS>
  extends FunctorComposition21<F, G>,
    CompactableComposition21<F, G> {
  readonly partitionMap: <E, A, B, C>(
    fa: Kind2<F, E, Kind<G, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, Kind<G, B>>, Kind2<F, E, Kind<G, C>>>
  readonly partition: <E, A>(
    fa: Kind2<F, E, Kind<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind2<F, E, Kind<G, A>>, Kind2<F, E, Kind<G, A>>>
  readonly filterMap: <E, A, B>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => Option<B>) => Kind2<F, E, Kind<G, B>>
  readonly filter: <E, A>(fa: Kind2<F, E, Kind<G, A>>, predicate: Predicate<A>) => Kind2<F, E, Kind<G, A>>
}

/**
 * @since 2.0.0
 */
export interface FilterableComposition2C1<F extends URIS2, G extends URIS, E>
  extends FunctorComposition21<F, G>,
    CompactableComposition21<F, G> {
  readonly partitionMap: <A, B, C>(
    fa: Kind2<F, E, Kind<G, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, E, Kind<G, B>>, Kind2<F, E, Kind<G, C>>>
  readonly partition: <A>(
    fa: Kind2<F, E, Kind<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind2<F, E, Kind<G, A>>, Kind2<F, E, Kind<G, A>>>
  readonly filterMap: <A, B>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => Option<B>) => Kind2<F, E, Kind<G, B>>
  readonly filter: <A>(fa: Kind2<F, E, Kind<G, A>>, predicate: Predicate<A>) => Kind2<F, E, Kind<G, A>>
}

/**
 * @since 2.0.0
 */
export interface FilterableComposition22<F extends URIS2, G extends URIS2>
  extends FunctorComposition22<F, G>,
    CompactableComposition22<F, G> {
  readonly partitionMap: <FE, GE, A, B, C>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, FE, Kind2<G, GE, B>>, Kind2<F, FE, Kind2<G, GE, C>>>
  readonly partition: <FE, GE, A>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind2<F, FE, Kind2<G, GE, A>>, Kind2<F, FE, Kind2<G, GE, A>>>
  readonly filterMap: <FE, GE, A, B>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>,
    f: (a: A) => Option<B>
  ) => Kind2<F, FE, Kind2<G, GE, B>>
  readonly filter: <FE, GE, A>(
    fa: Kind2<F, FE, Kind2<G, GE, A>>,
    predicate: Predicate<A>
  ) => Kind2<F, FE, Kind2<G, GE, A>>
}

/**
 * @since 2.0.0
 */
export interface FilterableComposition22C<F extends URIS2, G extends URIS2, E>
  extends FunctorComposition22<F, G>,
    CompactableComposition22<F, G> {
  readonly partitionMap: <FE, A, B, C>(
    fa: Kind2<F, FE, Kind2<G, E, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, FE, Kind2<G, E, B>>, Kind2<F, FE, Kind2<G, E, C>>>
  readonly partition: <FE, A>(
    fa: Kind2<F, FE, Kind2<G, E, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind2<F, FE, Kind2<G, E, A>>, Kind2<F, FE, Kind2<G, E, A>>>
  readonly filterMap: <FE, A, B>(
    fa: Kind2<F, FE, Kind2<G, E, A>>,
    f: (a: A) => Option<B>
  ) => Kind2<F, FE, Kind2<G, E, B>>
  readonly filter: <FE, A>(fa: Kind2<F, FE, Kind2<G, E, A>>, predicate: Predicate<A>) => Kind2<F, FE, Kind2<G, E, A>>
}

/**
 * @since 2.2.0
 */
export interface FilterableComposition23C<F extends URIS2, G extends URIS3, E>
  extends FunctorComposition23<F, G>,
    CompactableComposition23<F, G> {
  readonly partitionMap: <R, FE, A, B, C>(
    fa: Kind2<F, FE, Kind3<G, R, E, A>>,
    f: (a: A) => Either<B, C>
  ) => Separated<Kind2<F, FE, Kind3<G, R, E, B>>, Kind2<F, FE, Kind3<G, R, E, C>>>
  readonly partition: <R, FE, A>(
    fa: Kind2<F, FE, Kind3<G, R, E, A>>,
    predicate: Predicate<A>
  ) => Separated<Kind2<F, FE, Kind3<G, R, E, A>>, Kind2<F, FE, Kind3<G, R, E, A>>>
  readonly filterMap: <R, FE, A, B>(
    fa: Kind2<F, FE, Kind3<G, R, E, A>>,
    f: (a: A) => Option<B>
  ) => Kind2<F, FE, Kind3<G, R, E, B>>
  readonly filter: <R, FE, A>(
    fa: Kind2<F, FE, Kind3<G, R, E, A>>,
    predicate: Predicate<A>
  ) => Kind2<F, FE, Kind3<G, R, E, A>>
}

/**
 * @since 2.0.0
 */
export function getFilterableComposition<F extends URIS2, G extends URIS3, E>(
  F: Functor2<F>,
  G: Filterable3C<G, E>
): FilterableComposition23C<F, G, E>
export function getFilterableComposition<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  G: Filterable2C<G, E>
): FilterableComposition22C<F, G, E>
export function getFilterableComposition<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Filterable2<G>
): FilterableComposition22<F, G>
export function getFilterableComposition<F extends URIS2, G extends URIS, E>(
  F: Functor2C<F, E>,
  G: Filterable1<G>
): FilterableComposition2C1<F, G, E>
export function getFilterableComposition<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Filterable1<G>
): FilterableComposition21<F, G>
export function getFilterableComposition<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Filterable2C<G, E>
): FilterableComposition12C<F, G, E>
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
  const CC = getCompactableComposition(F, G)
  const FC: FilterableComposition<F, G> = {
    map: CC.map,
    compact: CC.compact,
    separate: CC.separate,
    partitionMap: (fga, f) => {
      const left = FC.filterMap(fga, (a) => getLeft(f(a)))
      const right = FC.filterMap(fga, (a) => getRight(f(a)))
      return { left, right }
    },
    partition: (fga, p) => {
      const left = FC.filter(fga, (a) => !p(a))
      const right = FC.filter(fga, p)
      return { left, right }
    },
    filterMap: (fga, f) => F.map(fga, (ga) => G.filterMap(ga, f)),
    filter: (fga, f) => F.map(fga, (ga) => G.filter(ga, f))
  }
  return FC
}
