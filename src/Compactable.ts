import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { fromEither, Option } from './Option'
import { Either, fromOption } from './Either'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'
import { Filterable, Filterable1, Filterable2, Filterable2C, Filterable3, Filterable3C } from './Filterable'
import { identity } from './function'

/**
 * `Separated` type which holds `left` and `right` parts
 * @since 1.7.0
 */
export type Separated<A, B> = {
  readonly left: A
  readonly right: B
}

/**
 * @typeclass
 * `Compactable` represents data structures which can be _compacted_/_filtered_.
 * This is a generalization of catOptions as a new function `compact`. `compact` has relations with {@link Functor}, {@link Applicative}, {@link Monad}, {@link Plus}, and {@link Traversable} in that we can use these classes to provide the ability to operate on a data type by eliminating intermediate Nones. This is useful for representing the filtering out of values, or failure.
 * - {@link compact}
 * - {@link separate}
 * @since 1.7.0
 * @see https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Compactable.purs
 */
export interface Compactable<F> {
  readonly URI: F
  /**
   * Compacts data structure unwrapping inner {@link Option}
   * @since 1.7.0
   */
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  /**
   * Separates data structure moving inner {@link Left} to the left side and inner {@link Right} to the right side of {@link Separated}
   * @since 1.7.0
   */
  readonly separate: <A, B>(fa: HKT<F, Either<A, B>>) => Separated<HKT<F, A>, HKT<F, B>>
}

/**
 * @see Compactable
 * @since 1.7.0
 */
export interface Compactable1<F extends URIS> {
  readonly URI: F
  readonly compact: <A>(fa: Type<F, Option<A>>) => Type<F, A>
  readonly separate: <A, B>(fa: Type<F, Either<A, B>>) => Separated<Type<F, A>, Type<F, B>>
}

/**
 * @see Compactable
 * @since 1.7.0
 */
export interface Compactable2<F extends URIS2> {
  readonly URI: F
  readonly compact: <L, A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <L, A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}

/**
 * @see Compactable
 * @since 1.7.0
 */
export interface Compactable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly compact: <A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}

/**
 * @see Compactable
 * @since 1.7.0
 */
export interface Compactable3<F extends URIS3> {
  readonly URI: F
  readonly compact: <U, L, A>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly separate: <U, L, A, B>(fa: Type3<F, U, L, Either<A, B>>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
}

/**
 * @see Compactable
 * @since 1.7.0
 */
export interface Compactable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly compact: <A>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly separate: <A, B>(fa: Type3<F, U, L, Either<A, B>>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
}

/**
 * Gets default implementation of {@link Compactable.compact} using {@link Compactable.separate}
 * @function
 * @since 1.7.0
 */
export function getCompactFromSeparate<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Compactable3C<F, U, L>, 'separate'>
): Compactable3C<F, U, L>['compact']
export function getCompactFromSeparate<F extends URIS3>(
  F: Functor3<F> & Pick<Compactable3<F>, 'separate'>
): Compactable3<F>['compact']
export function getCompactFromSeparate<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Compactable2C<F, L>, 'separate'>
): Compactable2C<F, L>['compact']
export function getCompactFromSeparate<F extends URIS2>(
  F: Functor2<F> & Pick<Compactable2<F>, 'separate'>
): Compactable2<F>['compact']
export function getCompactFromSeparate<F extends URIS>(
  F: Functor1<F> & Pick<Compactable1<F>, 'separate'>
): Compactable1<F>['compact']
export function getCompactFromSeparate<F>(F: Functor<F> & Pick<Compactable<F>, 'separate'>): Compactable<F>['compact']
export function getCompactFromSeparate<F>(F: Functor<F> & Pick<Compactable<F>, 'separate'>): Compactable<F>['compact'] {
  return foa => F.separate(F.map(foa, fromOption(null))).right
}

/**
 * Gets default implementation of {@link Compactable.compact} using {@link Filterable.filterMap}
 * @function
 * @since 1.7.0
 */
export function getCompactFromFilterMap<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | 'filterMap'>
): Compactable3C<F, U, L>['compact']
export function getCompactFromFilterMap<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'filterMap'>
): Compactable3<F>['compact']
export function getCompactFromFilterMap<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | 'filterMap'>
): Compactable2C<F, L>['compact']
export function getCompactFromFilterMap<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'filterMap'>
): Compactable2<F>['compact']
export function getCompactFromFilterMap<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'filterMap'>
): Compactable1<F>['compact']
export function getCompactFromFilterMap<F>(F: Pick<Filterable<F>, 'URI' | 'filterMap'>): Compactable<F>['compact']
export function getCompactFromFilterMap<F>(F: Pick<Filterable<F>, 'URI' | 'filterMap'>): Compactable<F>['compact'] {
  return fa => F.filterMap(fa, identity)
}

/**
 * Gets default implementation of {@link Compactable.separate} using {@link Compactable.compact}
 * @function
 * @since 1.7.0
 */
export function getSeparateFromCompact<F extends URIS3, U, L>(
  F: Functor3C<F, U, L> & Pick<Compactable3C<F, U, L>, 'compact'>
): Compactable3C<F, U, L>['separate']
export function getSeparateFromCompact<F extends URIS3>(
  F: Functor3<F> & Pick<Compactable3<F>, 'compact'>
): Compactable3<F>['separate']
export function getSeparateFromCompact<F extends URIS2, L>(
  F: Functor2C<F, L> & Pick<Compactable2C<F, L>, 'compact'>
): Compactable2C<F, L>['separate']
export function getSeparateFromCompact<F extends URIS2>(
  F: Functor2<F> & Pick<Compactable2<F>, 'compact'>
): Compactable2<F>['separate']
export function getSeparateFromCompact<F extends URIS>(
  F: Functor1<F> & Pick<Compactable1<F>, 'compact'>
): Compactable1<F>['separate']
export function getSeparateFromCompact<F>(F: Functor<F> & Pick<Compactable<F>, 'compact'>): Compactable<F>['separate']
export function getSeparateFromCompact<F>(F: Functor<F> & Pick<Compactable<F>, 'compact'>): Compactable<F>['separate'] {
  return fe => {
    const left = F.compact(F.map(fe, e => fromEither(e.swap())))
    const right = F.compact(F.map(fe, fromEither))
    return { left, right }
  }
}

/**
 * Gets default implementation of {@link Compactable.separate} using {@link Filterable.partitionMap}
 * @function
 * @since 1.7.0
 */
export function getSeparateFromPartitionMap<F extends URIS3, U, L>(
  F: Pick<Filterable3C<F, U, L>, 'URI' | 'partitionMap'>
): Compactable3C<F, U, L>['separate']
export function getSeparateFromPartitionMap<F extends URIS3>(
  F: Pick<Filterable3<F>, 'URI' | 'partitionMap'>
): Compactable3<F>['separate']
export function getSeparateFromPartitionMap<F extends URIS2, L>(
  F: Pick<Filterable2C<F, L>, 'URI' | 'partitionMap'>
): Compactable2C<F, L>['separate']
export function getSeparateFromPartitionMap<F extends URIS2>(
  F: Pick<Filterable2<F>, 'URI' | 'partitionMap'>
): Compactable2<F>['separate']
export function getSeparateFromPartitionMap<F extends URIS>(
  F: Pick<Filterable1<F>, 'URI' | 'partitionMap'>
): Compactable1<F>['separate']
export function getSeparateFromPartitionMap<F>(
  F: Pick<Filterable<F>, 'URI' | 'partitionMap'>
): Compactable<F>['separate']
export function getSeparateFromPartitionMap<F>(
  F: Pick<Filterable<F>, 'URI' | 'partitionMap'>
): Compactable<F>['separate'] {
  return fa => F.partitionMap(fa, identity)
}
