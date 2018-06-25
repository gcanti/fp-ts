import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'
import {
  Compactable,
  Compactable1,
  Compactable2,
  Compactable2C,
  Compactable3,
  Compactable3C,
  Separated
} from './Compactable'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Either, fromPredicate as fromPredicateEither } from './Either'
import { identity, not, Predicate } from './function'
import { Option, fromPredicate as fromPredicateOption } from './Option'

/**
 * @typeclass
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 * - {@link partitionMap}
 * - {@link partition}
 * - {@link filterMap}
 * - {@link filter}
 *
 * @see https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 * @since 1.7.0
 */
export interface Filterable<F> extends Functor<F>, Compactable<F> {
  /**
   * Partition a data structure based on an either predicate.
   * @since 1.7.0
   */
  readonly partitionMap: <RL, RR, A>(fa: HKT<F, A>, f: (a: A) => Either<RL, RR>) => Separated<HKT<F, RL>, HKT<F, RR>>
  /**
   * Partition a data structure based on boolean predicate.
   * @since 1.7.0
   */
  readonly partition: <A>(fa: HKT<F, A>, p: Predicate<A>) => Separated<HKT<F, A>, HKT<F, A>>
  /**
   * Map over a data structure and filter based on a maybe.
   * @since 1.7.0
   */
  readonly filterMap: <A, B>(fa: HKT<F, A>, f: (a: A) => Option<B>) => HKT<F, B>
  /**
   * Filter a data structure based on a boolean.
   * @since 1.7.0
   */
  readonly filter: <A>(fa: HKT<F, A>, p: Predicate<A>) => HKT<F, A>
}

/**
 * @since 1.7.0
 * @see Filterable
 */
export interface Filterable1<F extends URIS> extends Functor1<F>, Compactable1<F> {
  readonly partitionMap: <RL, RR, A>(fa: Type<F, A>, f: (a: A) => Either<RL, RR>) => Separated<Type<F, RL>, Type<F, RR>>
  readonly partition: <A>(fa: Type<F, A>, p: Predicate<A>) => Separated<Type<F, A>, Type<F, A>>
  readonly filterMap: <A, B>(fa: Type<F, A>, f: (a: A) => Option<B>) => Type<F, B>
  readonly filter: <A>(fa: Type<F, A>, p: Predicate<A>) => Type<F, A>
}

/**
 * @since 1.7.0
 * @see Filterable
 */
export interface Filterable2<F extends URIS2> extends Functor2<F>, Compactable2<F> {
  readonly partitionMap: <RL, RR, L, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partition: <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  readonly filterMap: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  readonly filter: <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

/**
 * @since 1.7.0
 * @see Filterable
 */
export interface Filterable2C<F extends URIS2, L> extends Functor2C<F, L>, Compactable2C<F, L> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partition: <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  readonly filterMap: <A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  readonly filter: <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

/**
 * @since 1.7.0
 * @see Filterable
 */
export interface Filterable3<F extends URIS3> extends Functor3<F>, Compactable3<F> {
  readonly partitionMap: <RL, RR, U, L, A>(
    fa: Type3<F, U, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly partition: <U, L, A>(
    fa: Type3<F, U, L, A>,
    p: Predicate<A>
  ) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
  readonly filterMap: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filter: <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
}

/**
 * @since 1.7.0
 * @see Filterable
 */
export interface Filterable3C<F extends URIS3, U, L> extends Functor3C<F, U, L>, Compactable3C<F, U, L> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type3<F, U, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly partition: <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
  readonly filterMap: <A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filter: <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Type3<F, U, L, A>
}

/**
 * Gets default implementation of {@link Filterable.partitionMap} using {@link Compactable.separate}
 * @function
 * @since 1.7.0
 */
export function getPartitionMapFromSeparate<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Compactable3C<F, U, L>, 'separate'>
): Filterable3C<F, U, L>['partitionMap']
export function getPartitionMapFromSeparate<F extends URIS3>(
  F: Functor3<F> & Pick<Compactable3<F>, 'separate'>
): Filterable3<F>['partitionMap']
export function getPartitionMapFromSeparate<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Compactable2C<F, L>, 'separate'>
): Filterable2C<F, L>['partitionMap']
export function getPartitionMapFromSeparate<F extends URIS2>(
  F: Functor2<F> & Pick<Compactable2<F>, 'separate'>
): Filterable2<F>['partitionMap']
export function getPartitionMapFromSeparate<F extends URIS>(
  F: Functor1<F> & Pick<Compactable1<F>, 'separate'>
): Filterable1<F>['partitionMap']
export function getPartitionMapFromSeparate<F>(
  F: Functor<F> & Pick<Compactable<F>, 'separate'>
): Filterable<F>['partitionMap']
export function getPartitionMapFromSeparate<F>(
  F: Functor<F> & Pick<Compactable<F>, 'separate'>
): Filterable<F>['partitionMap'] {
  return (fa, f) => F.separate(F.map(fa, f))
}

/**
 * Gets default implementation of {@link Filterable.partition} using {@link Filterable.partitionMap}
 * @function
 * @since 1.7.0
 */
export function getPartitionFromPartitionMap<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | 'partitionMap'>
): Filterable3C<F, U, L>['partition']
export function getPartitionFromPartitionMap<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'partitionMap'>
): Filterable3<F>['partition']
export function getPartitionFromPartitionMap<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | 'partitionMap'>
): Filterable2C<F, L>['partition']
export function getPartitionFromPartitionMap<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'partitionMap'>
): Filterable2<F>['partition']
export function getPartitionFromPartitionMap<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'partitionMap'>
): Filterable1<F>['partition']
export function getPartitionFromPartitionMap<F>(
  F: Pick<Filterable<F>, 'URI' | 'partitionMap'>
): Filterable<F>['partition']
export function getPartitionFromPartitionMap<F>(
  F: Pick<Filterable<F>, 'URI' | 'partitionMap'>
): Filterable<F>['partition'] {
  return (fa, p) => F.partitionMap(fa, fromPredicateEither(p, identity))
}

/**
 * Gets default implementation of {@link Filterable.partition} using {@link Filterable.filter}
 * @function
 * @since 1.7.0
 */
export function getPartitionFromFilter<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | 'filter'>
): Filterable3C<F, U, L>['partition']
export function getPartitionFromFilter<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'filter'>
): Filterable3<F>['partition']
export function getPartitionFromFilter<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | 'filter'>
): Filterable2C<F, L>['partition']
export function getPartitionFromFilter<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'filter'>
): Filterable2<F>['partition']
export function getPartitionFromFilter<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'filter'>
): Filterable1<F>['partition']
export function getPartitionFromFilter<F>(F: Pick<Filterable<F>, 'URI' | 'filter'>): Filterable<F>['partition']
export function getPartitionFromFilter<F>(F: Pick<Filterable<F>, 'URI' | 'filter'>): Filterable<F>['partition'] {
  return (fa, p) => ({
    left: F.filter(fa, not(p)),
    right: F.filter(fa, p)
  })
}

/**
 * Gets default implementation of {@link Filterable.partition} using {@Filterable.filterMap}
 * @function
 * @since 1.7.0
 */
export function getPartitionFromFilterMap<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | 'filterMap'>
): Filterable3C<F, U, L>['partition']
export function getPartitionFromFilterMap<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'filterMap'>
): Filterable3<F>['partition']
export function getPartitionFromFilterMap<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | 'filterMap'>
): Filterable2C<F, L>['partition']
export function getPartitionFromFilterMap<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'filterMap'>
): Filterable2<F>['partition']
export function getPartitionFromFilterMap<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'filterMap'>
): Filterable1<F>['partition']
export function getPartitionFromFilterMap<F>(F: Pick<Filterable<F>, 'URI' | 'filterMap'>): Filterable<F>['partition']
export function getPartitionFromFilterMap<F>(F: Pick<Filterable<F>, 'URI' | 'filterMap'>): Filterable<F>['partition'] {
  return (fa, p) => ({
    left: F.filterMap(fa, fromPredicateOption(not(p))),
    right: F.filterMap(fa, fromPredicateOption(p))
  })
}

/**
 * Gets default implementation of {@link Filterable.filterMap} using {@link Compactable.compact}
 * @function
 * @since 1.7.0
 */
export function getFilterMapFromCompact<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Compactable3C<F, U, L>, 'compact'>
): Filterable3C<F, U, L>['filterMap']
export function getFilterMapFromCompact<F extends URIS3>(
  F: Functor3<F> & Pick<Compactable3<F>, 'compact'>
): Filterable3<F>['filterMap']
export function getFilterMapFromCompact<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Compactable2C<F, L>, 'compact'>
): Filterable2C<F, L>['filterMap']
export function getFilterMapFromCompact<F extends URIS2>(
  F: Functor2<F> & Pick<Compactable2<F>, 'compact'>
): Filterable2<F>['filterMap']
export function getFilterMapFromCompact<F extends URIS>(
  F: Functor1<F> & Pick<Compactable1<F>, 'compact'>
): Filterable1<F>['filterMap']
export function getFilterMapFromCompact<F>(F: Functor<F> & Pick<Compactable<F>, 'compact'>): Filterable<F>['filterMap']
export function getFilterMapFromCompact<F>(
  F: Functor<F> & Pick<Compactable<F>, 'compact'>
): Filterable<F>['filterMap'] {
  return (fa, f) => F.compact(F.map(fa, f))
}

/**
 * Gets default implementation of {@link Filterable.filter} using {@link Filterable.filterMap}
 * @function
 * @since 1.7.0
 */
export function getFilterFromFilterMap<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | 'filterMap'>
): Filterable3C<F, U, L>['filter']
export function getFilterFromFilterMap<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'filterMap'>
): Filterable3<F>['filter']
export function getFilterFromFilterMap<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | 'filterMap'>
): Filterable2C<F, L>['filter']
export function getFilterFromFilterMap<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'filterMap'>
): Filterable2<F>['filter']
export function getFilterFromFilterMap<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'filterMap'>
): Filterable1<F>['filter']
export function getFilterFromFilterMap<F>(F: Pick<Filterable<F>, 'URI' | 'filterMap'>): Filterable<F>['filter']
export function getFilterFromFilterMap<F>(F: Pick<Filterable<F>, 'URI' | 'filterMap'>): Filterable<F>['filter'] {
  return (fa, p) => F.filterMap(fa, fromPredicateOption(p))
}

/**
 * Gets default implementation of {@link Filterable.filter} using {@link Filterable.partition}
 * @function
 * @since 1.7.0
 */
export function getFilterFromPartition<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Filterable3C<F, U, L>, 'URI' | 'partition'>
): Filterable3C<F, U, L>['filter']
export function getFilterFromPartition<F extends URIS3>(
  F: Functor3<F> & Pick<Filterable3<F>, 'URI' | 'partition'>
): Filterable3<F>['filter']
export function getFilterFromPartition<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Filterable2C<F, L>, 'URI' | 'partition'>
): Filterable2C<F, L>['filter']
export function getFilterFromPartition<F extends URIS2>(
  F: Functor2<F> & Pick<Filterable2<F>, 'URI' | 'partition'>
): Filterable2<F>['filter']
export function getFilterFromPartition<F extends URIS>(
  F: Functor1<F> & Pick<Filterable1<F>, 'URI' | 'partition'>
): Filterable1<F>['filter']
export function getFilterFromPartition<F>(
  F: Functor<F> & Pick<Filterable<F>, 'URI' | 'partition'>
): Filterable<F>['filter']
export function getFilterFromPartition<F>(
  F: Functor<F> & Pick<Filterable<F>, 'URI' | 'partition'>
): Filterable<F>['filter'] {
  return (fa, p) => F.partition(fa, p).right
}

/**
 * Gets default implementation of {@link Filterable.filter} using {@link Filterable.partitionMap}
 * @function
 * @since 1.7.0
 */
export function getFilterFromPartitionMap<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | 'partitionMap'>
): Filterable3C<F, U, L>['filter']
export function getFilterFromPartitionMap<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'partitionMap'>
): Filterable3<F>['filter']
export function getFilterFromPartitionMap<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | 'partitionMap'>
): Filterable2C<F, L>['filter']
export function getFilterFromPartitionMap<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'partitionMap'>
): Filterable2<F>['filter']
export function getFilterFromPartitionMap<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'partitionMap'>
): Filterable1<F>['filter']
export function getFilterFromPartitionMap<F>(F: Pick<Filterable<F>, 'URI' | 'partitionMap'>): Filterable<F>['filter']
export function getFilterFromPartitionMap<F>(F: Pick<Filterable<F>, 'URI' | 'partitionMap'>): Filterable<F>['filter'] {
  return (fa, p) => F.partitionMap(fa, fromPredicateEither(p, identity)).right
}
