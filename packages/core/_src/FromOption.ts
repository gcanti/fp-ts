/**
 * The `FromResult` type class represents those data types which support untyped errors.
 *
 * @since 3.0.0
 */
import type { Flattenable } from '@fp-ts/core/Flattenable'
import { pipe } from '@fp-ts/core/Function'
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type { Option } from '@fp-ts/core/Option'
import type { Predicate } from '@fp-ts/core/Predicate'
import type { Refinement } from '@fp-ts/core/Refinement'

/**
 * @category model
 * @since 3.0.0
 */
export interface FromOption<F extends TypeLambda> extends TypeClass<F> {
  readonly fromOption: <A, S>(fa: Option<A>) => Kind<F, S, unknown, never, never, A>
}

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable = <F extends TypeLambda>(F: FromOption<F>) =>
  <A, S, R, O, E>(a: A): Kind<F, S, R, O, E, NonNullable<A>> => F.fromOption(_.optionFromNullable(a))

// -------------------------------------------------------------------------------------
// lifting
// -------------------------------------------------------------------------------------

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate = <F extends TypeLambda>(
  F: FromOption<F>
): {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): <S>(c: C) => Kind<F, S, unknown, never, never, B>
  <B extends A, A = B>(predicate: Predicate<A>): <S>(b: B) => Kind<F, S, unknown, never, never, B>
} =>
  <B extends A, A = B>(predicate: Predicate<A>) =>
    <S>(b: B): Kind<F, S, unknown, never, never, B> => F.fromOption(predicate(b) ? _.some(b) : _.none)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption = <F extends TypeLambda>(F: FromOption<F>) =>
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) =>
    <S>(...a: A): Kind<F, S, unknown, never, never, B> => F.fromOption(f(...a))

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable = <F extends TypeLambda>(F: FromOption<F>) => {
  const fromNullableF = fromNullable(F)
  return <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B | null | undefined) =>
    <S, R, O, E>(...a: A): Kind<F, S, R, O, E, NonNullable<B>> => {
      return fromNullableF(f(...a))
    }
}

// -------------------------------------------------------------------------------------
// sequencing
// -------------------------------------------------------------------------------------

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable = <F extends TypeLambda>(F: FromOption<F>, C: Flattenable<F>) => {
  const liftNullable_ = liftNullable(F)
  return <A, B>(f: (a: A) => B | null | undefined) =>
    <S, R, O, E>(self: Kind<F, S, R, O, E, A>): Kind<F, S, R, O, E, NonNullable<B>> => {
      return pipe(self, C.flatMap<A, S, R, O, E, NonNullable<B>>(liftNullable_(f)))
    }
}
