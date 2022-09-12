/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 3.0.0
 */
import { Chain, chainFirst } from './Chain'
import type { Either } from './Either'
import { flow, Lazy, pipe } from './function'
import type { HKT, Kind, Typeclass } from './HKT'
import * as _ from './internal'
import type { Option } from './Option'
import type { Predicate } from './Predicate'
import type { Refinement } from './Refinement'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromEither<F extends HKT> extends Typeclass<F> {
  readonly fromEither: <E, A, S, R>(fa: Either<E, A>) => Kind<F, S, R, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromOption = <F extends HKT>(F: FromEither<F>) => <E>(
  onNone: Lazy<E>
): (<A, S, R>(fa: Option<A>) => Kind<F, S, R, E, A>) => {
  // TODO
  return (ma) => F.fromEither(_.isNone(ma) ? _.left(onNone()) : _.right(ma.value)) as any
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate = <F extends HKT>(
  F: FromEither<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R>(a: A) => Kind<F, S, R, A, B>
  <A>(predicate: Predicate<A>): <B extends A, S, R>(b: B) => Kind<F, S, R, B, B>
  <A>(predicate: Predicate<A>): <S, R>(a: A) => Kind<F, S, R, A, A>
} => <A>(predicate: Predicate<A>) => <S, R>(a: A): Kind<F, S, R, A, A> =>
  F.fromEither(predicate(a) ? _.right(a) : _.left(a))

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK = <F extends HKT>(F: FromEither<F>) => <E>(onNone: Lazy<E>) => <
  A extends ReadonlyArray<unknown>,
  B
>(
  f: (...a: A) => Option<B>
): (<S, R>(...a: A) => Kind<F, S, R, E, B>) => {
  const fromOptionF = fromOption(F)
  const from = fromOptionF(onNone)
  // TODO
  return flow(f, from) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK = <M extends HKT>(F: FromEither<M>, M: Chain<M>) => <E>(
  onNone: Lazy<E>
): (<A, B>(f: (a: A) => Option<B>) => <S, R>(ma: Kind<M, S, R, E, A>) => Kind<M, S, R, E, B>) => {
  const fromOptionKF = fromOptionK(F)
  // TODO
  return flow(fromOptionKF(onNone) as any, M.chain) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function fromEitherK<F extends HKT>(
  F: FromEither<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) => <S, R>(...a: A) => Kind<F, S, R, E, B> {
  // TODO
  return (f) => flow(f, F.fromEither) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function chainEitherK<M extends HKT>(
  F: FromEither<M>,
  M: Chain<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => <S, R>(ma: Kind<M, S, R, E, A>) => Kind<M, S, R, E, B> {
  // TODO
  return flow(fromEitherK(F) as any, M.chain) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function chainFirstEitherK<M extends HKT>(
  F: FromEither<M>,
  M: Chain<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => <S, R>(ma: Kind<M, S, R, E, A>) => Kind<M, S, R, E, A> {
  // TODO
  return flow(fromEitherK(F) as any, chainFirst(M)) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function filterOrElse<M extends HKT>(
  F: FromEither<M>,
  M: Chain<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: Kind<M, S, R, E, A>
  ) => Kind<M, S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R, B extends A>(
    mb: Kind<M, S, R, E, B>
  ) => Kind<M, S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(ma: Kind<M, S, R, E, A>) => Kind<M, S, R, E, A>
} {
  return <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E) => <S, R>(
    ma: Kind<M, S, R, E, A>
  ): Kind<M, S, R, E, A> =>
    pipe(
      ma,
      M.chain((a) => F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a))))
    )
}
