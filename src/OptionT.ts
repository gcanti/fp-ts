/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import * as apply from './Apply'
import type { Result } from './Result'
import type { Flattenable } from './Flattenable'
import type { FromIdentity } from './FromIdentity'
import type { LazyArg } from './Function'
import { constant, flow, pipe } from './Function'
import type { Functor } from './Functor'
import * as functor from './Functor'
import type { Kind, TypeLambda } from './HKT'
import * as _ from './internal'
import type { Monad } from './Monad'
import type { Option } from './Option'
import * as option from './Option'

/**
 * @since 3.0.0
 */
export interface OptionT<F extends TypeLambda> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], Option<this['Out1']>>
}

/**
 * @since 3.0.0
 */
export const emptyKind = <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
): (<S, A>() => Kind<OptionT<F>, S, unknown, never, never, A>) => constant(FromIdentity.succeed(_.none))

/**
 * @since 3.0.0
 */
export const some =
  <F extends TypeLambda>(FromIdentity: FromIdentity<F>) =>
  <A, S>(a: A): Kind<OptionT<F>, S, unknown, never, never, A> =>
    FromIdentity.succeed(_.some(a))

/**
 * @since 3.0.0
 */
export const fromKind = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Kind<OptionT<F>, S, R, O, E, A>) => Functor.map(_.some)

/**
 * @since 3.0.0
 */
export const fromEither =
  <F extends TypeLambda>(FromIdentity: FromIdentity<F>) =>
  <A, S>(e: Result<unknown, A>): Kind<OptionT<F>, S, unknown, never, never, A> =>
    FromIdentity.succeed(option.fromEither(e))

/**
 * @since 3.0.0
 */
export const match = <F extends TypeLambda>(
  Functor: Functor<F>
): (<B, A, C = B>(
  onNone: LazyArg<B>,
  onSome: (a: A) => C
) => <S, R, O, E>(self: Kind<OptionT<F>, S, R, O, E, A>) => Kind<F, S, R, O, E, B | C>) =>
  flow(option.match, Functor.map)

/**
 * @since 3.0.0
 */
export const matchKind =
  <F extends TypeLambda>(Flattenable: Flattenable<F>) =>
  <S, R2, O2, E2, B, A, R3, O3, E3, C = B>(
    onNone: LazyArg<Kind<F, S, R2, O2, E2, B>>,
    onSome: (a: A) => Kind<F, S, R3, O3, E3, C>
  ): (<R1, O1, E1>(
    self: Kind<OptionT<F>, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, B | C>) =>
    Flattenable.flatMap(option.match<Kind<F, S, R2 & R3, O2 | O3, E2 | E3, B | C>, A>(onNone, onSome))

/**
 * @since 3.0.0
 */
export const getOrElse =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <B>(onNone: B): (<S, R, O, E, A>(self: Kind<OptionT<F>, S, R, O, E, A>) => Kind<F, S, R, O, E, A | B>) =>
    Functor.map(option.getOrElse(onNone))

/**
 * @since 3.0.0
 */
export const getOrElseKind =
  <F extends TypeLambda>(Monad: Monad<F>) =>
  <S, R2, O2, E2, B>(onNone: Kind<F, S, R2, O2, E2, B>) =>
  <R1, O1, E1, A>(self: Kind<OptionT<F>, S, R1, O1, E1, A>): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B> =>
    pipe(self, Monad.flatMap(option.match<Kind<F, S, R2, O2, E2, A | B>, A>(() => onNone, Monad.succeed)))

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @since 3.0.0
 */
export const tapError = <F extends TypeLambda>(Monad: Monad<F>) => {
  const some_ = some(Monad)
  return <S, R2, O2, E2>(onNone: Kind<OptionT<F>, S, R2, O2, E2, unknown>) =>
    <R1, O1, E1, A>(self: Kind<OptionT<F>, S, R1, O1, E1, A>): Kind<OptionT<F>, S, R1 & R2, O1 | O2, E1 | E2, A> =>
      pipe(
        self,
        Monad.flatMap(
          option.match<Kind<F, S, R2, O2, E2, Option<A>>, A>(
            flow(
              () => onNone,
              Monad.map(() => _.none)
            ),
            some_
          )
        )
      )
}

/**
 * @since 3.0.0
 */
export const map = <F extends TypeLambda>(
  Functor: Functor<F>
): (<A, B>(f: (a: A) => B) => <S, R, O, E>(self: Kind<OptionT<F>, S, R, O, E, A>) => Kind<OptionT<F>, S, R, O, E, B>) =>
  functor.mapComposition(Functor, option.Functor)

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda>(
  Apply: Apply<F>
): (<S, R2, O2, E2, A>(
  fa: Kind<OptionT<F>, S, R2, O2, E2, A>
) => <R1, O1, E1, B>(
  self: Kind<OptionT<F>, S, R1, O1, E1, (a: A) => B>
) => Kind<OptionT<F>, S, R1 & R2, O1 | O2, E1 | E2, B>) => apply.apComposition(Apply, option.Apply)

/**
 * @since 3.0.0
 */
export const flatMap =
  <F extends TypeLambda>(Monad: Monad<F>) =>
  <A, S, R, O, E, B>(f: (a: A) => Kind<OptionT<F>, S, R, O, E, B>) =>
  (self: Kind<OptionT<F>, S, R, O, E, A>): Kind<OptionT<F>, S, R, O, E, B> =>
    pipe(self, Monad.flatMap<Option<A>, S, R, O, E, Option<B>>(option.match(() => emptyKind(Monad)(), f)))

/**
 * Lazy version of `orElse`.
 *
 * @since 3.0.0
 */
export const catchAll = <F extends TypeLambda>(Monad: Monad<F>) => {
  const some_ = some(Monad)
  return <S, R2, O2, E2, B>(that: LazyArg<Kind<OptionT<F>, S, R2, O2, E2, B>>) =>
    <R1, O1, E1, A>(self: Kind<OptionT<F>, S, R1, O1, E1, A>): Kind<OptionT<F>, S, R1 & R2, O1 | O2, E1 | E2, A | B> =>
      pipe(self, Monad.flatMap(option.match<Kind<F, S, R2, O2, E2, Option<A | B>>, A | B>(that, some_)))
}

/**
 * @since 3.0.0
 */
export const orElse = <F extends TypeLambda>(Monad: Monad<F>) => {
  const catchAll_ = catchAll(Monad)
  return <S, R2, O2, E2, B>(
    that: Kind<OptionT<F>, S, R2, O2, E2, B>
  ): (<R1, O1, E1, A>(
    self: Kind<OptionT<F>, S, R1, O1, E1, A>
  ) => Kind<OptionT<F>, S, R1 & R2, O1 | O2, E1 | E2, A | B>) => catchAll_(() => that)
}
