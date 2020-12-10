/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * @since 2.0.0
 */
import { Separated } from './Compactable'
import { Either } from './Either'
import { Predicate, Refinement } from './function'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Option } from './Option'

/**
 * @since 2.0.0
 */
export interface Filter<F> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => HKT<F, B>
  <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => HKT<F, A>
}

/**
 * @since 2.0.0
 */
export interface Partition<F> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, B>>
  <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable<F> {
  readonly URI: F
  readonly partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: HKT<F, A>) => Separated<HKT<F, B>, HKT<F, C>>
  readonly partition: Partition<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly filter: Filter<F>
}

/**
 * @since 2.0.0
 */
export interface Filter1<F extends URIS> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Kind<F, B>
  <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Kind<F, A>
}

/**
 * @since 2.0.0
 */
export interface Partition1<F extends URIS> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, B>>
  <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable1<F extends URIS> {
  readonly URI: F
  readonly partitionMap: <A, B, C>(f: (a: A) => Either<B, C>) => (fa: Kind<F, A>) => Separated<Kind<F, B>, Kind<F, C>>
  readonly partition: Partition1<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind<F, A>) => Kind<F, B>
  readonly filter: Filter1<F>
}

/**
 * @since 2.0.0
 */
export interface Filter2<F extends URIS2> {
  <A, B extends A>(refinement: Refinement<A, B>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface Partition2<F extends URIS2> {
  <A, B extends A>(refinement: Refinement<A, B>): <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicate: Predicate<A>): <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable2<F extends URIS2> {
  readonly URI: F
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filter: Filter2<F>
}

/**
 * @since 2.0.0
 */
export interface Filter2C<F extends URIS2, E> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>): (fa: Kind2<F, E, A>) => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface Partition2C<F extends URIS2, E> {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicate: Predicate<A>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable2C<F extends URIS2, E> {
  readonly URI: F
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partition: Partition2C<F, E>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filter: Filter2C<F, E>
}

/**
 * @since 2.0.0
 */
export interface Filter3<F extends URIS3> {
  <A, B extends A>(refinement: Refinement<A, B>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface Partition3<F extends URIS3> {
  <A, B extends A>(refinement: Refinement<A, B>): <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <A>(predicate: Predicate<A>): <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable3<F extends URIS3> {
  readonly URI: F
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly filter: Filter3<F>
}

/**
 * @since 2.2.0
 */
export interface Filter3C<F extends URIS3, E> {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>): <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}

/**
 * @since 2.2.0
 */
export interface Partition3C<F extends URIS3, E> {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <A>(predicate: Predicate<A>): <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Filterable3C<F extends URIS3, E> {
  readonly URI: F
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <R>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partition: Partition3C<F, E>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly filter: Filter3C<F, E>
}

/**
 * @since 2.0.0
 */
export interface Filter4<F extends URIS4> {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  <A>(predicate: Predicate<A>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface Partition4<F extends URIS4> {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
  <A>(predicate: Predicate<A>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Filterable4<F extends URIS4> {
  readonly URI: F
  readonly partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
  readonly partition: Partition4<F>
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  readonly filter: Filter4<F>
}
