/**
 * @since 2.0.0
 */
import { Separated } from './Compactable'
import { Either } from './Either'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Option } from './Option'

/**
 * @since 2.0.0
 */
export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B

/**
 * @since 2.0.0
 */
export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean

/**
 * @since 2.0.0
 */
export interface FilterWithIndex<F, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: HKT<F, A>) => HKT<F, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => HKT<F, A>
}

/**
 * @since 2.0.0
 */
export interface PartitionWithIndex<F, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
    fa: HKT<F, A>
  ) => Separated<HKT<F, A>, HKT<F, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex<F, I> {
  readonly URI: F
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: HKT<F, A>) => Separated<HKT<F, B>, HKT<F, C>>
  readonly partitionWithIndex: PartitionWithIndex<F, I>
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly filterWithIndex: FilterWithIndex<F, I>
}

/**
 * @since 2.0.0
 */
export interface FilterWithIndex1<F extends URIS, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: Kind<F, A>) => Kind<F, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind<F, A>) => Kind<F, A>
}

/**
 * @since 2.0.0
 */
export interface PartitionWithIndex1<F extends URIS, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
    fa: Kind<F, A>
  ) => Separated<Kind<F, A>, Kind<F, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex1<F extends URIS, I> {
  readonly URI: F
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: Kind<F, A>) => Separated<Kind<F, B>, Kind<F, C>>
  readonly partitionWithIndex: PartitionWithIndex1<F, I>
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Kind<F, A>) => Kind<F, B>
  readonly filterWithIndex: FilterWithIndex1<F, I>
}

/**
 * @since 2.0.0
 */
export interface FilterWithIndex2<F extends URIS2, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <E>(fa: Kind2<F, E, A>) => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface PartitionWithIndex2<F extends URIS2, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <E>(
    fa: Kind2<F, E, A>
  ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <E>(
    fa: Kind2<F, E, A>
  ) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex2<F extends URIS2, I> {
  readonly URI: F
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <E>(fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partitionWithIndex: PartitionWithIndex2<F, I>
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filterWithIndex: FilterWithIndex2<F, I>
}

/**
 * @since 2.0.0
 */
export interface FilterWithIndex2C<F extends URIS2, I, E> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind2<F, E, A>) => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface PartitionWithIndex2C<F extends URIS2, I, E> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
    fa: Kind2<F, E, A>
  ) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, A>, Kind2<F, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex2C<F extends URIS2, I, E> {
  readonly URI: F
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => (fa: Kind2<F, E, A>) => Separated<Kind2<F, E, B>, Kind2<F, E, C>>
  readonly partitionWithIndex: PartitionWithIndex2C<F, I, E>
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
  readonly filterWithIndex: FilterWithIndex2C<F, I, E>
}

/**
 * @since 2.0.0
 */
export interface FilterWithIndex3<F extends URIS3, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Kind3<F, R, E, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface PartitionWithIndex3<F extends URIS3, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <R, E>(
    fa: Kind3<F, R, E, A>
  ) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex3<F extends URIS3, I> {
  readonly URI: F
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Separated<Kind3<F, R, E, B>, Kind3<F, R, E, C>>
  readonly partitionWithIndex: PartitionWithIndex3<F, I>
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
  readonly filterWithIndex: FilterWithIndex3<F, I>
}

/**
 * @since 2.0.0
 */
export interface FilterWithIndex4<F extends URIS4, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Kind4<F, S, R, E, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface PartitionWithIndex4<F extends URIS4, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E>(
    fa: Kind4<F, S, R, E, A>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, A>>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface FilterableWithIndex4<F extends URIS4, I> {
  readonly URI: F
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Separated<Kind4<F, S, R, E, B>, Kind4<F, S, R, E, C>>
  readonly partitionWithIndex: PartitionWithIndex4<F, I>
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
  readonly filterWithIndex: FilterWithIndex4<F, I>
}
