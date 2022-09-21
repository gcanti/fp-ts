/**
 * The `FromEither` type class represents those data types which support typed errors.
 *
 * @since 3.0.0
 */
import * as flat from './Flat'
import type { Flat } from './Flat'
import type { Either } from './Either'
import type { Lazy } from './function'
import { pipe } from './function'
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
  readonly fromEither: <E, A, S, R = unknown, W = never>(fa: Either<E, A>) => Kind<F, S, R, W, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromOption =
  <F extends HKT>(F: FromEither<F>) =>
  <E>(onNone: Lazy<E>): (<A, S, R = unknown, W = never>(fa: Option<A>) => Kind<F, S, R, W, E, A>) => {
    const fromOption = _.fromOption(onNone)
    return (ma) => F.fromEither(fromOption(ma))
  }

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicateOrElse =
  <F extends HKT>(F: FromEither<F>) =>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E) =>
  <S, R = unknown, W = never>(b: B): Kind<F, S, R, W, E, B> =>
    F.fromEither(predicate(b) ? _.right(b) : _.left(onFalse(b)))

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinementOrElse =
  <F extends HKT>(F: FromEither<F>) =>
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E) =>
  <S, R = unknown, W = never>(c: C): Kind<F, S, R, W, E, B> =>
    F.fromEither(refinement(c) ? _.right(c) : _.left(onFalse(c)))

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionKOrElse = <F extends HKT>(F: FromEither<F>) => {
  return <A extends ReadonlyArray<unknown>, B, E>(f: (...a: A) => Option<B>, onNone: (...a: A) => E) =>
    <S, R = unknown, W = never>(...a: A): Kind<F, S, R, W, E, B> => {
      return F.fromEither(_.fromOptionOrElse(f(...a), () => onNone(...a)))
    }
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapOptionKOrElse = <M extends HKT>(F: FromEither<M>, M: Flat<M>) => {
  const fromOptionKOrElseF = fromOptionKOrElse(F)
  return <A, B, E>(f: (a: A) => Option<B>, onNone: (a: A) => E) => {
    const from = fromOptionKOrElseF(f, onNone)
    return <S, R, W>(ma: Kind<M, S, R, W, E, A>): Kind<M, S, R, W, E, B> => {
      return pipe(ma, M.flatMap<A, S, R, W, E, B>(from))
    }
  }
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK =
  <F extends HKT>(F: FromEither<F>) =>
  <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) =>
  <S, R = unknown, W = never>(...a: A): Kind<F, S, R, W, E, B> =>
    F.fromEither(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapEitherK = <M extends HKT>(F: FromEither<M>, M: Flat<M>) => {
  const fromEitherKF = fromEitherK(F)
  return <A, E2, B>(f: (a: A) => Either<E2, B>) =>
    <S, R, W, E1>(ma: Kind<M, S, R, W, E1, A>): Kind<M, S, R, W, E1 | E2, B> => {
      return pipe(ma, M.flatMap<A, S, R, W, E1 | E2, B>(fromEitherKF(f)))
    }
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapFirstEitherK = <M extends HKT>(
  F: FromEither<M>,
  M: Flat<M>
): (<A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <S, R, W, E1>(ma: Kind<M, S, R, W, E1, A>) => Kind<M, S, R, W, E1 | E2, A>) => {
  const flatMapFirstM = flat.flatMapFirst(M)
  const fromEitherKF = fromEitherK(F)
  return (f) => {
    const fromEitherKFf = fromEitherKF(f)
    return flatMapFirstM((a) => fromEitherKFf(a))
  }
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse =
  <M extends HKT>(F: FromEither<M>, M: Flat<M>) =>
  <B extends A, E2, A = B>(
    predicate: Predicate<A>,
    onFalse: (b: B) => E2
  ): (<S, R, W, E1>(mb: Kind<M, S, R, W, E1, B>) => Kind<M, S, R, W, E1 | E2, B>) => {
    return M.flatMap((b) => F.fromEither(predicate(b) ? _.right(b) : _.left(onFalse(b))))
  }

/**
 * @category combinators
 * @since 3.0.0
 */
export const refineOrElse =
  <M extends HKT>(F: FromEither<M>, M: Flat<M>) =>
  <C extends A, B extends A, E2, A = C>(
    refinement: Refinement<A, B>,
    onFalse: (c: C) => E2
  ): (<S, R, W, E1>(ma: Kind<M, S, R, W, E1, C>) => Kind<M, S, R, W, E1 | E2, B>) => {
    return M.flatMap((c) => F.fromEither(refinement(c) ? _.right(c) : _.left(onFalse(c))))
  }

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableOrElse =
  <F extends HKT>(F: FromEither<F>) =>
  <E>(onNullable: Lazy<E>) =>
  <A, S, R = unknown, W = never>(a: A): Kind<F, S, R, W, E, NonNullable<A>> => {
    return F.fromEither(_.fromNullableOrElse(onNullable)(a))
  }

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableKOrElse = <F extends HKT>(F: FromEither<F>) => {
  const fromNullableOrElseF = fromNullableOrElse(F)
  return <E>(onNullable: Lazy<E>) => {
    const fromNullable = fromNullableOrElseF(onNullable)
    return <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B | null | undefined) =>
      <S, R = unknown, W = never>(...a: A): Kind<F, S, R, W, E, NonNullable<B>> => {
        return fromNullable(f(...a))
      }
  }
}

/**
 * @category interop
 * @since 3.0.0
 */
export const flatMapNullableKOrElse = <M extends HKT>(F: FromEither<M>, M: Flat<M>) => {
  const fromNullableKM = fromNullableKOrElse(F)
  return <E>(onNullable: Lazy<E>) => {
    const fromNullable = fromNullableKM(onNullable)
    return <A, B>(f: (a: A) => B | null | undefined) =>
      <S, R, W>(ma: Kind<M, S, R, W, E, A>): Kind<M, S, R, W, E, NonNullable<B>> => {
        return pipe(ma, M.flatMap<A, S, R, W, E, NonNullable<B>>(fromNullable(f)))
      }
  }
}
