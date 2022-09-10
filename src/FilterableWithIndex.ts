/**
 * @since 3.0.0
 */
import type { Either } from './Either'
import type { HKT, Kind } from './HKT'
import type { Option } from './Option'
import type { Separated } from './Separated'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B

/**
 * @since 3.0.0
 */
export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean

/**
 * @since 3.0.0
 */
export interface FilterWithIndex<F extends HKT, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <S, R, E>(
    fa: Kind<F, S, R, E, A>
  ) => Kind<F, S, R, E, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E, B extends A>(
    fb: Kind<F, S, R, E, B>
  ) => Kind<F, S, R, E, B>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, A>
}

/**
 * @since 3.0.0
 */
export interface PartitionWithIndex<F extends HKT, I> {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <S, R, E>(
    fa: Kind<F, S, R, E, A>
  ) => Separated<Kind<F, S, R, E, A>, Kind<F, S, R, E, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E, B extends A>(
    fb: Kind<F, S, R, E, B>
  ) => Separated<Kind<F, S, R, E, B>, Kind<F, S, R, E, B>>
  <A>(predicateWithIndex: PredicateWithIndex<I, A>): <S, R, E>(
    fa: Kind<F, S, R, E, A>
  ) => Separated<Kind<F, S, R, E, A>, Kind<F, S, R, E, A>>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FilterableWithIndex<F extends HKT, I> {
  readonly URI?: F
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <S, R, E>(fa: Kind<F, S, R, E, A>) => Separated<Kind<F, S, R, E, B>, Kind<F, S, R, E, C>>
  readonly partitionWithIndex: PartitionWithIndex<F, I>
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, B>
  readonly filterWithIndex: FilterWithIndex<F, I>
}
