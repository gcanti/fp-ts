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
import { Either, eitherBool } from './Either'
import { not, Predicate } from './function'
import { Option, optionBool } from './Option'

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
 * @typeclass
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
 * @typeclass
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
 * @typeclass
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
 * @typeclass
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
 * @typeclass
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
export function partitionMapDefaultSeparate<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Compactable3C<F, U, L>, 'separate'>
): Filterable3C<F, U, L>['partitionMap']
export function partitionMapDefaultSeparate<F extends URIS3>(
  F: Functor3<F> & Pick<Compactable3<F>, 'separate'>
): Filterable3<F>['partitionMap']
export function partitionMapDefaultSeparate<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Compactable2C<F, L>, 'separate'>
): Filterable2C<F, L>['partitionMap']
export function partitionMapDefaultSeparate<F extends URIS2>(
  F: Functor2<F> & Pick<Compactable2<F>, 'separate'>
): Filterable2<F>['partitionMap']
export function partitionMapDefaultSeparate<F extends URIS>(
  F: Functor1<F> & Pick<Compactable1<F>, 'separate'>
): Filterable1<F>['partitionMap']
export function partitionMapDefaultSeparate<F>(
  F: Functor<F> & Pick<Compactable<F>, 'separate'>
): Filterable<F>['partitionMap']
export function partitionMapDefaultSeparate<F>(
  F: Functor<F> & Pick<Compactable<F>, 'separate'>
): Filterable<F>['partitionMap'] {
  return (fa, f) => F.separate(F.map(fa, f))
}

/**
 * Gets default implementation of {@link Filterable.partition} using {@link Filterable.partitionMap}
 * @function
 * @since 1.7.0
 */
export function partitionDefaultPartitionMap<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | '_U' | '_L' | 'partitionMap'>
): Filterable3C<F, U, L>['partition']
export function partitionDefaultPartitionMap<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'partitionMap'>
): Filterable3<F>['partition']
export function partitionDefaultPartitionMap<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | '_L' | 'partitionMap'>
): Filterable2C<F, L>['partition']
export function partitionDefaultPartitionMap<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'partitionMap'>
): Filterable2<F>['partition']
export function partitionDefaultPartitionMap<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'partitionMap'>
): Filterable1<F>['partition']
export function partitionDefaultPartitionMap<F>(
  F: Pick<Filterable<F>, 'URI' | 'partitionMap'>
): Filterable<F>['partition']
export function partitionDefaultPartitionMap<F>(
  F: Pick<Filterable<F>, 'URI' | 'partitionMap'>
): Filterable<F>['partition'] {
  return (fa, p) => F.partitionMap(fa, eitherBool(p))
}

/**
 * Gets default implementation of {@link Filterable.partition} using {@link Filterable.filter}
 * @function
 * @since 1.7.0
 */
export function partitionDefaultFilter<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | '_U' | '_L' | 'filter'>
): Filterable3C<F, U, L>['partition']
export function partitionDefaultFilter<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'filter'>
): Filterable3<F>['partition']
export function partitionDefaultFilter<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | '_L' | 'filter'>
): Filterable2C<F, L>['partition']
export function partitionDefaultFilter<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'filter'>
): Filterable2<F>['partition']
export function partitionDefaultFilter<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'filter'>
): Filterable1<F>['partition']
export function partitionDefaultFilter<F>(F: Pick<Filterable<F>, 'URI' | 'filter'>): Filterable<F>['partition']
export function partitionDefaultFilter<F>(F: Pick<Filterable<F>, 'URI' | 'filter'>): Filterable<F>['partition'] {
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
export function partitionDefaultFilterMap<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | '_U' | '_L' | 'filterMap'>
): Filterable3C<F, U, L>['partition']
export function partitionDefaultFilterMap<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'filterMap'>
): Filterable3<F>['partition']
export function partitionDefaultFilterMap<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | '_L' | 'filterMap'>
): Filterable2C<F, L>['partition']
export function partitionDefaultFilterMap<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'filterMap'>
): Filterable2<F>['partition']
export function partitionDefaultFilterMap<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'filterMap'>
): Filterable1<F>['partition']
export function partitionDefaultFilterMap<F>(F: Pick<Filterable<F>, 'URI' | 'filterMap'>): Filterable<F>['partition']
export function partitionDefaultFilterMap<F>(F: Pick<Filterable<F>, 'URI' | 'filterMap'>): Filterable<F>['partition'] {
  return (fa, p) => ({
    left: F.filterMap(fa, optionBool(not(p))),
    right: F.filterMap(fa, optionBool(p))
  })
}

/**
 * Gets default implementation of {@link Filterable.filterMap} using {@link Compactable.compact}
 * @function
 * @since 1.7.0
 */
export function filterMapDefaultCompact<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Compactable3C<F, U, L>, 'compact'>
): Filterable3C<F, U, L>['filterMap']
export function filterMapDefaultCompact<F extends URIS3>(
  F: Functor3<F> & Pick<Compactable3<F>, 'compact'>
): Filterable3<F>['filterMap']
export function filterMapDefaultCompact<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Compactable2C<F, L>, 'compact'>
): Filterable2C<F, L>['filterMap']
export function filterMapDefaultCompact<F extends URIS2>(
  F: Functor2<F> & Pick<Compactable2<F>, 'compact'>
): Filterable2<F>['filterMap']
export function filterMapDefaultCompact<F extends URIS>(
  F: Functor1<F> & Pick<Compactable1<F>, 'compact'>
): Filterable1<F>['filterMap']
export function filterMapDefaultCompact<F>(F: Functor<F> & Pick<Compactable<F>, 'compact'>): Filterable<F>['filterMap']
export function filterMapDefaultCompact<F>(
  F: Functor<F> & Pick<Compactable<F>, 'compact'>
): Filterable<F>['filterMap'] {
  return (fa, f) => F.compact(F.map(fa, f))
}

/**
 * Gets default implementation of {@link Filterable.filter} using {@link Filterable.filterMap}
 * @function
 * @since 1.7.0
 */
export function filterDefaultFilterMap<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | '_U' | '_L' | 'filterMap'>
): Filterable3C<F, U, L>['filter']
export function filterDefaultFilterMap<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'filterMap'>
): Filterable3<F>['filter']
export function filterDefaultFilterMap<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | '_L' | 'filterMap'>
): Filterable2C<F, L>['filter']
export function filterDefaultFilterMap<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'filterMap'>
): Filterable2<F>['filter']
export function filterDefaultFilterMap<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'filterMap'>
): Filterable1<F>['filter']
export function filterDefaultFilterMap<F>(F: Pick<Filterable<F>, 'URI' | 'filterMap'>): Filterable<F>['filter']
export function filterDefaultFilterMap<F>(F: Pick<Filterable<F>, 'URI' | 'filterMap'>): Filterable<F>['filter'] {
  return (fa, p) => F.filterMap(fa, optionBool(p))
}

/**
 * Gets default implementation of {@link Filterable.filter} using {@link Filterable.partition}
 * @function
 * @since 1.7.0
 */
export function filterDefaultPartition<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Filterable3C<F, U, L>, 'URI' | '_U' | '_L' | 'partition'>
): Filterable3C<F, U, L>['filter']
export function filterDefaultPartition<F extends URIS3>(
  F: Functor3<F> & Pick<Filterable3<F>, 'URI' | 'partition'>
): Filterable3<F>['filter']
export function filterDefaultPartition<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Filterable2C<F, L>, 'URI' | '_L' | 'partition'>
): Filterable2C<F, L>['filter']
export function filterDefaultPartition<F extends URIS2>(
  F: Functor2<F> & Pick<Filterable2<F>, 'URI' | 'partition'>
): Filterable2<F>['filter']
export function filterDefaultPartition<F extends URIS>(
  F: Functor1<F> & Pick<Filterable1<F>, 'URI' | 'partition'>
): Filterable1<F>['filter']
export function filterDefaultPartition<F>(
  F: Functor<F> & Pick<Filterable<F>, 'URI' | 'partition'>
): Filterable<F>['filter']
export function filterDefaultPartition<F>(
  F: Functor<F> & Pick<Filterable<F>, 'URI' | 'partition'>
): Filterable<F>['filter'] {
  return (fa, p) => F.partition(fa, p).right
}

/**
 * Gets default implementation of {@link Filterable.filter} using {@link Filterable.partitionMap}
 * @function
 * @since 1.7.0
 */
export function filterDefaultPartitionMap<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | '_U' | '_L' | 'partitionMap'>
): Filterable3C<F, U, L>['filter']
export function filterDefaultPartitionMap<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'partitionMap'>
): Filterable3<F>['filter']
export function filterDefaultPartitionMap<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | '_L' | 'partitionMap'>
): Filterable2C<F, L>['filter']
export function filterDefaultPartitionMap<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'partitionMap'>
): Filterable2<F>['filter']
export function filterDefaultPartitionMap<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'partitionMap'>
): Filterable1<F>['filter']
export function filterDefaultPartitionMap<F>(F: Pick<Filterable<F>, 'URI' | 'partitionMap'>): Filterable<F>['filter']
export function filterDefaultPartitionMap<F>(F: Pick<Filterable<F>, 'URI' | 'partitionMap'>): Filterable<F>['filter'] {
  return (fa, p) => F.partitionMap(fa, eitherBool(p)).right
}
