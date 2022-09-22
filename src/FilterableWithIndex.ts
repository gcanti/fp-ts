/**
 * @since 3.0.0
 */
import type { Either } from './Either'
import type { HKT, Kind, Typeclass } from './HKT'
import type { Option } from './Option'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FilterableWithIndex<F extends HKT, I> extends Typeclass<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Either<B, C>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => readonly [Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, C>]
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterWithIndex =
  <F extends HKT, I>(F: FilterableWithIndex<F, I>) =>
  <B extends A, A = B>(
    predicate: (i: I, a: A) => boolean
  ): (<S, R, W, E>(fb: Kind<F, S, R, W, E, B>) => Kind<F, S, R, W, E, B>) =>
    F.filterMapWithIndex((i, b) => (predicate(i, b) ? _.some(b) : _.none))

/**
 * @category combinators
 * @since 3.0.0
 */
export const refineWithIndex =
  <F extends HKT, I>(F: FilterableWithIndex<F, I>) =>
  <C extends A, B extends A, A = C>(
    refinement: (i: I, a: A) => a is B
  ): (<S, R, W, E>(fc: Kind<F, S, R, W, E, C>) => Kind<F, S, R, W, E, B>) =>
    F.filterMapWithIndex((i, c) => (refinement(i, c) ? _.some(c) : _.none))

/**
 * @category combinators
 * @since 3.0.0
 */
export const partitionWithIndex =
  <F extends HKT, I>(F: FilterableWithIndex<F, I>) =>
  <B extends A, A = B>(
    predicate: (i: I, a: A) => boolean
  ): (<S, R, W, E>(fb: Kind<F, S, R, W, E, B>) => readonly [Kind<F, S, R, W, E, B>, Kind<F, S, R, W, E, B>]) =>
    F.partitionMapWithIndex((i, b) => (predicate(i, b) ? _.right(b) : _.left(b)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const refinementWithIndex =
  <F extends HKT, I>(F: FilterableWithIndex<F, I>) =>
  <C extends A, B extends A, A = C>(
    refinement: (i: I, a: A) => a is B
  ): (<S, R, W, E>(fb: Kind<F, S, R, W, E, C>) => readonly [Kind<F, S, R, W, E, C>, Kind<F, S, R, W, E, B>]) =>
    F.partitionMapWithIndex((i, c) => (refinement(i, c) ? _.right(c) : _.left(c)))
