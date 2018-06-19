import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'
import {
  Compactable,
  Compactable1,
  Compactable2,
  Compactable2C,
  Compactable3,
  Compactable3C,
  separated,
  Separated
} from './Compactable'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Either, left, right } from './Either'
import { not, Predicate } from './function'
import { none, Option, some } from './Option'

/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 * - {@link partitionMap}
 * - {@link partition}
 * - {@link filterMap}
 * - {@link filter}
 *
 * @typeclass
 * @see https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 * @since 1.6.3
 */
export interface Filterable<F> extends Functor<F>, Compactable<F> {
  /**
   * Partition a data structure based on an either predicate.
   */
  readonly partitionMap: <RL, RR, A>(fa: HKT<F, A>, f: (a: A) => Either<RL, RR>) => Separated<HKT<F, RL>, HKT<F, RR>>
  /**
   * Partition a data structure based on boolean predicate.
   */
  readonly partition: <A>(fa: HKT<F, A>, p: Predicate<A>) => Separated<HKT<F, A>, HKT<F, A>>
  /**
   * Map over a data structure and filter based on a maybe.
   */
  readonly filterMap: <A, B>(fa: HKT<F, A>, f: (a: A) => Option<B>) => HKT<F, B>
  /**
   * Filter a data structure based on a boolean.
   */
  readonly filter: <A>(fa: HKT<F, A>, p: Predicate<A>) => HKT<F, A>
}

export interface Filterable1<F extends URIS> extends Functor1<F>, Compactable1<F> {
  readonly partitionMap: <RL, RR, A>(fa: Type<F, A>, f: (a: A) => Either<RL, RR>) => Separated<Type<F, RL>, Type<F, RR>>
  readonly partition: <A>(fa: Type<F, A>, p: Predicate<A>) => Separated<Type<F, A>, Type<F, A>>
  readonly filterMap: <A, B>(fa: Type<F, A>, f: (a: A) => Option<B>) => Type<F, B>
  readonly filter: <A>(fa: Type<F, A>, p: Predicate<A>) => Type<F, A>
}

export interface Filterable2<F extends URIS2> extends Functor2<F>, Compactable2<F> {
  readonly partitionMap: <RL, RR, L, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partition: <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  readonly filterMap: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  readonly filter: <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

export interface Filterable2C<F extends URIS2, L> extends Functor2C<F, L>, Compactable2C<F, L> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partition: <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  readonly filterMap: <A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  readonly filter: <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Type2<F, L, A>
}

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
 * Upgrade a boolean-style predicate to an either-style predicate mapping.
 * @function
 * @since 1.6.3
 */
export const eitherBool = <A>(p: Predicate<A>) => (a: A): Either<A, A> => (p(a) ? right(a) : left(a))

/**
 * Upgrade a boolean-style predicate to a maybe-style predicate mapping.
 * @function
 * @since 1.6.3
 */
export const optionBool = <A>(p: Predicate<A>) => (a: A): Option<A> => (p(a) ? some(a) : none)

/**
 * Gets default implementation of {@link Filterable.partitionMap} using {@link Compactable.separate}
 * @function
 * @since 1.6.3
 * @experimental
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
 * @since 1.6.3
 * @experimental
 */
export function getPartitionFromPartitionMap<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Filterable3C<F, U, L>, 'partitionMap'>
): Filterable3C<F, U, L>['partition']
export function getPartitionFromPartitionMap<F extends URIS3>(
  F: Functor3<F> & Pick<Filterable3<F>, 'partitionMap'>
): Filterable3<F>['partition']
export function getPartitionFromPartitionMap<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Filterable2C<F, L>, 'partitionMap'>
): Filterable2C<F, L>['partition']
export function getPartitionFromPartitionMap<F extends URIS2>(
  F: Functor2<F> & Pick<Filterable2<F>, 'partitionMap'>
): Filterable2<F>['partition']
export function getPartitionFromPartitionMap<F extends URIS>(
  F: Functor1<F> & Pick<Filterable1<F>, 'partitionMap'>
): Filterable1<F>['partition']
export function getPartitionFromPartitionMap<F>(
  F: Functor<F> & Pick<Filterable<F>, 'partitionMap'>
): Filterable<F>['partition']
export function getPartitionFromPartitionMap<F>(
  F: Functor<F> & Pick<Filterable<F>, 'partitionMap'>
): Filterable<F>['partition'] {
  return (fa, p) => F.partitionMap(fa, eitherBool(p))
}

/**
 * Gets default implementation of {@link Filterable.partition} using {@link Filterable.filter}
 * @function
 * @since 1.6.3
 * @experimental
 */
export function getPartitionFromFilter<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Filterable3C<F, U, L>, 'filter'>
): Filterable3C<F, U, L>['partition']
export function getPartitionFromFilter<F extends URIS3>(
  F: Functor3<F> & Pick<Filterable3<F>, 'filter'>
): Filterable3<F>['partition']
export function getPartitionFromFilter<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Filterable2C<F, L>, 'filter'>
): Filterable2C<F, L>['partition']
export function getPartitionFromFilter<F extends URIS2>(
  F: Functor2<F> & Pick<Filterable2<F>, 'filter'>
): Filterable2<F>['partition']
export function getPartitionFromFilter<F extends URIS>(
  F: Functor1<F> & Pick<Filterable1<F>, 'filter'>
): Filterable1<F>['partition']
export function getPartitionFromFilter<F>(F: Functor<F> & Pick<Filterable<F>, 'filter'>): Filterable<F>['partition']
export function getPartitionFromFilter<F>(F: Functor<F> & Pick<Filterable<F>, 'filter'>): Filterable<F>['partition'] {
  return (fa, p) => separated(F.filter(fa, not(p)), F.filter(fa, p))
}

/**
 * Gets default implementation of {@link Filterable.partition} using {@Filterable.filterMap}
 * @function
 * @since 1.6.3
 * @experimental
 */
export function getPartitionFromFilterMap<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Filterable3C<F, U, L>, 'filterMap'>
): Filterable3C<F, U, L>['partition']
export function getPartitionFromFilterMap<F extends URIS3>(
  F: Functor3<F> & Pick<Filterable3<F>, 'filterMap'>
): Filterable3<F>['partition']
export function getPartitionFromFilterMap<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Filterable2C<F, L>, 'filterMap'>
): Filterable2C<F, L>['partition']
export function getPartitionFromFilterMap<F extends URIS2>(
  F: Functor2<F> & Pick<Filterable2<F>, 'filterMap'>
): Filterable2<F>['partition']
export function getPartitionFromFilterMap<F extends URIS>(
  F: Functor1<F> & Pick<Filterable1<F>, 'filterMap'>
): Filterable1<F>['partition']
export function getPartitionFromFilterMap<F>(
  F: Functor<F> & Pick<Filterable<F>, 'filterMap'>
): Filterable<F>['partition']
export function getPartitionFromFilterMap<F>(
  F: Functor<F> & Pick<Filterable<F>, 'filterMap'>
): Filterable<F>['partition'] {
  return (fa, p) => separated(F.filterMap(fa, optionBool(not(p))), F.filterMap(fa, optionBool(p)))
}

/**
 * Gets default implementation of {@link Filterable.filterMap} using {@link Compactable.compact}
 * @function
 * @since 1.6.3
 * @experimental
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
 * @since 1.6.3
 * @experimental
 */
export function getFilterFromFilterMap<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Filterable3C<F, U, L>, 'filterMap'>
): Filterable3C<F, U, L>['filter']
export function getFilterFromFilterMap<F extends URIS3>(
  F: Functor3<F> & Pick<Filterable3<F>, 'filterMap'>
): Filterable3<F>['filter']
export function getFilterFromFilterMap<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Filterable2C<F, L>, 'filterMap'>
): Filterable2C<F, L>['filter']
export function getFilterFromFilterMap<F extends URIS2>(
  F: Functor2<F> & Pick<Filterable2<F>, 'filterMap'>
): Filterable2<F>['filter']
export function getFilterFromFilterMap<F extends URIS>(
  F: Functor1<F> & Pick<Filterable1<F>, 'filterMap'>
): Filterable1<F>['filter']
export function getFilterFromFilterMap<F>(F: Functor<F> & Pick<Filterable<F>, 'filterMap'>): Filterable<F>['filter']
export function getFilterFromFilterMap<F>(F: Functor<F> & Pick<Filterable<F>, 'filterMap'>): Filterable<F>['filter'] {
  return (fa, p) => F.filterMap(fa, optionBool(p))
}

/**
 * Gets default implementation of {@link partition} using {@link Filterable.partition}
 * @function
 * @since 1.6.3
 * @experimental
 */
export function getFilterFromPartition<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Filterable3C<F, U, L>, 'partition'>
): Filterable3C<F, U, L>['filter']
export function getFilterFromPartition<F extends URIS3>(
  F: Functor3<F> & Pick<Filterable3<F>, 'partition'>
): Filterable3<F>['filter']
export function getFilterFromPartition<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Filterable2C<F, L>, 'partition'>
): Filterable2C<F, L>['filter']
export function getFilterFromPartition<F extends URIS2>(
  F: Functor2<F> & Pick<Filterable2<F>, 'partition'>
): Filterable2<F>['filter']
export function getFilterFromPartition<F extends URIS>(
  F: Functor1<F> & Pick<Filterable1<F>, 'partition'>
): Filterable1<F>['filter']
export function getFilterFromPartition<F>(F: Functor<F> & Pick<Filterable<F>, 'partition'>): Filterable<F>['filter']
export function getFilterFromPartition<F>(F: Functor<F> & Pick<Filterable<F>, 'partition'>): Filterable<F>['filter'] {
  return (fa, p) => F.partition(fa, p).right
}

/**
 * Gets default implementation of {@link Filterable.filter} using {@link Filterable.partitionMap}
 * @function
 * @since 1.6.3
 * @experimental
 */
export function getFilterFromPartitionMap<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Filterable3C<F, U, L>, 'partitionMap'>
): Filterable3C<F, U, L>['filter']
export function getFilterFromPartitionMap<F extends URIS3>(
  F: Functor3<F> & Pick<Filterable3<F>, 'partitionMap'>
): Filterable3<F>['filter']
export function getFilterFromPartitionMap<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Filterable2C<F, L>, 'partitionMap'>
): Filterable2C<F, L>['filter']
export function getFilterFromPartitionMap<F extends URIS2>(
  F: Functor2<F> & Pick<Filterable2<F>, 'partitionMap'>
): Filterable2<F>['filter']
export function getFilterFromPartitionMap<F extends URIS>(
  F: Functor1<F> & Pick<Filterable1<F>, 'partitionMap'>
): Filterable1<F>['filter']
export function getFilterFromPartitionMap<F>(
  F: Functor<F> & Pick<Filterable<F>, 'partitionMap'>
): Filterable<F>['filter']
export function getFilterFromPartitionMap<F>(
  F: Functor<F> & Pick<Filterable<F>, 'partitionMap'>
): Filterable<F>['filter'] {
  return (fa, p) => F.partitionMap(fa, eitherBool(p)).right
}
