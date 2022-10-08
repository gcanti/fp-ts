/**
 * Lift a computation from the `Reader` monad.
 *
 * @since 3.0.0
 */
import type { Flattenable } from '@fp-ts/core/Flattenable'
import { pipe } from '@fp-ts/core/Function'
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type { Reader } from '@fp-ts/core/Reader'

/**
 * @category model
 * @since 3.0.0
 */
export interface FromReader<F extends TypeLambda> extends TypeClass<F> {
  readonly fromReader: <R, A, S>(fa: Reader<R, A>) => Kind<F, S, R, never, never, A>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function ask<F extends TypeLambda>(F: FromReader<F>): <S, R>() => Kind<F, S, R, never, never, R> {
  return () => F.fromReader(_.ask())
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function asks<F extends TypeLambda>(
  F: FromReader<F>
): <R, A, S>(f: (r: R) => A) => Kind<F, S, R, never, never, A> {
  return F.fromReader
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftReader = <F extends TypeLambda>(F: FromReader<F>) =>
  <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => Reader<R, B>) =>
    <S>(...a: A): Kind<F, S, R, never, never, B> => F.fromReader(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapReader = <M extends TypeLambda>(F: FromReader<M>, M: Flattenable<M>) =>
  <A, R2, B>(f: (a: A) => Reader<R2, B>) =>
    <S, R1, O, E>(self: Kind<M, S, R1, O, E, A>): Kind<M, S, R1 & R2, O, E, B> => {
      return pipe(
        self,
        M.flatMap((a) => F.fromReader(f(a)))
      )
    }
