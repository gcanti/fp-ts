/**
 * @since 3.0.0
 */
import type { Result } from './Result'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import type { Option } from './Option'
import * as _ from './internal'

/**
 * @category model
 * @since 3.0.0
 */
export interface FilterableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly partitionMapWithIndex: <A, B, C>(
    f: (i: I, a: A) => Result<B, C>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>]
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}

/**
 * @since 3.0.0
 */
export const filterWithIndex: <F extends TypeLambda, I>(
  F: FilterableWithIndex<F, I>
) => {
  <C extends A, B extends A, A = C>(refinement: (i: I, a: A) => a is B): <S, R, O, E>(
    fc: Kind<F, S, R, O, E, C>
  ) => Kind<F, S, R, O, E, B>
  <B extends A, A = B>(predicate: (i: I, a: A) => boolean): <S, R, O, E>(
    fb: Kind<F, S, R, O, E, B>
  ) => Kind<F, S, R, O, E, B>
} =
  <F extends TypeLambda, I>(F: FilterableWithIndex<F, I>) =>
  <B extends A, A = B>(
    predicate: (i: I, a: A) => boolean
  ): (<S, R, O, E>(fb: Kind<F, S, R, O, E, B>) => Kind<F, S, R, O, E, B>) =>
    F.filterMapWithIndex((i, b) => (predicate(i, b) ? _.some(b) : _.none))

/**
 * @since 3.0.0
 */
export const partitionWithIndex: <F extends TypeLambda, I>(
  F: FilterableWithIndex<F, I>
) => {
  <C extends A, B extends A, A = C>(refinement: (i: I, a: A) => a is B): <S, R, O, E>(
    fb: Kind<F, S, R, O, E, C>
  ) => readonly [Kind<F, S, R, O, E, C>, Kind<F, S, R, O, E, B>]
  <B extends A, A = B>(predicate: (i: I, a: A) => boolean): <S, R, O, E>(
    fb: Kind<F, S, R, O, E, B>
  ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]
} =
  <F extends TypeLambda, I>(F: FilterableWithIndex<F, I>) =>
  <B extends A, A = B>(
    predicate: (i: I, a: A) => boolean
  ): (<S, R, O, E>(fb: Kind<F, S, R, O, E, B>) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]) =>
    F.partitionMapWithIndex((i, b) => (predicate(i, b) ? _.of(b) : _.fail(b)))
