/**
 * The `FromEither` type class represents those data types which support untyped errors.
 *
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
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
export interface FromOption<F extends HKT> extends Typeclass<F> {
  readonly fromOption: <A, S, R = unknown, W = never, E = never>(fa: Option<A>) => Kind<F, S, R, W, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate =
  <F extends HKT>(F: FromOption<F>) =>
  <B extends A, A = B>(predicate: Predicate<A>) =>
  <S, R = unknown, W = never, E = never>(b: B): Kind<F, S, R, W, E, B> =>
    F.fromOption(predicate(b) ? _.some(b) : _.none)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinement =
  <F extends HKT>(F: FromOption<F>) =>
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>) =>
  <S, R = unknown, W = never, E = never>(c: C): Kind<F, S, R, W, E, B> =>
    F.fromOption(refinement(c) ? _.some(c) : _.none)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK =
  <F extends HKT>(F: FromOption<F>) =>
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) =>
  <S, R = unknown, W = never, E = never>(...a: A): Kind<F, S, R, W, E, B> =>
    F.fromOption(f(...a))

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable =
  <F extends HKT>(F: FromOption<F>) =>
  <A, S, R, W, E>(a: A): Kind<F, S, R, W, E, NonNullable<A>> =>
    F.fromOption(_.fromNullable(a))

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK = <F extends HKT>(F: FromOption<F>) => {
  const fromNullableF = fromNullable(F)
  return <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B | null | undefined) =>
    <S, R, W, E>(...a: A): Kind<F, S, R, W, E, NonNullable<B>> => {
      return fromNullableF(f(...a))
    }
}

/**
 * @category interop
 * @since 3.0.0
 */
export const flatMapNullableK = <F extends HKT>(F: FromOption<F>, C: Flattenable<F>) => {
  const fromNullableKF = fromNullableK(F)
  return <A, B>(f: (a: A) => B | null | undefined) =>
    <S, R, W, E>(ma: Kind<F, S, R, W, E, A>): Kind<F, S, R, W, E, NonNullable<B>> => {
      return pipe(ma, C.flatMap<A, S, R, W, E, NonNullable<B>>(fromNullableKF(f)))
    }
}
