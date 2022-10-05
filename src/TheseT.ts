/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import * as apply from './Apply'
import * as bifunctor from './Bifunctor'
import type { Flattenable } from './Flattenable'
import { flow, pipe } from './Function'
import type { Functor } from './Functor'
import * as functor from './Functor'
import type { Kind, TypeLambda } from './HKT'
import type { Monad } from './Monad'
import type { FromIdentity } from './FromIdentity'
import type { Semigroup } from './Semigroup'
import type { These } from './These'
import * as these from './These'

/**
 * @since 3.0.0
 */
export interface TheseT<F extends TypeLambda, E> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], These<E, this['Out1']>>
}

/**
 * @since 3.0.0
 */
export const right =
  <F extends TypeLambda>(FromIdentity: FromIdentity<F>) =>
  <A, S>(a: A): Kind<TheseT<F, never>, S, unknown, never, never, A> =>
    FromIdentity.of(these.right(a))

/**
 * @since 3.0.0
 */
export const left =
  <F extends TypeLambda>(FromIdentity: FromIdentity<F>) =>
  <E, S>(e: E): Kind<TheseT<F, E>, S, unknown, never, never, never> =>
    FromIdentity.of(these.left(e))

/**
 * @since 3.0.0
 */
export const both =
  <F extends TypeLambda>(FromIdentity: FromIdentity<F>) =>
  <E, A, S>(e: E, a: A): Kind<TheseT<F, E>, S, unknown, never, never, A> =>
    FromIdentity.of(these.both(e, a))

/**
 * @since 3.0.0
 */
export const fromKind = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, FE, A>(fa: Kind<F, S, R, O, FE, A>) => Kind<TheseT<F, never>, S, R, O, FE, A>) => Functor.map(these.right)

/**
 * @since 3.0.0
 */
export const leftKind = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, FE, E>(fl: Kind<F, S, R, O, FE, E>) => Kind<TheseT<F, E>, S, R, O, FE, never>) => Functor.map(these.left)

/**
 * @since 3.0.0
 */
export const map = <F extends TypeLambda>(Functor: Functor<F>) => {
  const map_ = functor.mapComposition(Functor, these.Functor)
  return <A, B>(
    f: (a: A) => B
  ): (<S, R, O, FE, E>(self: Kind<TheseT<F, E>, S, R, O, FE, A>) => Kind<TheseT<F, E>, S, R, O, FE, B>) => map_(f)
}

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda, E>(
  Apply: Apply<F>,
  Semigroup: Semigroup<E>
): (<S, R2, O2, FE2, A>(
  fa: Kind<TheseT<F, E>, S, R2, O2, FE2, A>
) => <R1, O1, FE1, B>(
  self: Kind<TheseT<F, E>, S, R1, O1, FE1, (a: A) => B>
) => Kind<TheseT<F, E>, S, R1 & R2, O1 | O2, FE1 | FE2, B>) => apply.apComposition(Apply, these.getApply(Semigroup))

/**
 * @since 3.0.0
 */
export const flatMap = <F extends TypeLambda, E>(Monad: Monad<F>, Semigroup: Semigroup<E>) => {
  const left_ = left(Monad)
  return <A, S, R2, O2, FE2, B>(f: (a: A) => Kind<TheseT<F, E>, S, R2, O2, FE2, B>) =>
    <R1, O1, FE1>(
      self: Kind<TheseT<F, E>, S, R1, O1, FE1, A>
    ): Kind<TheseT<F, E>, S, R1 & R2, O1 | O2, FE1 | FE2, B> => {
      return pipe(
        self,
        Monad.flatMap(
          these.match<E, Kind<F, S, R2, O2, FE2, these.These<E, B>>, A>(left_, f, (e1, a) =>
            pipe(
              f(a),
              Monad.map(
                these.match(
                  (e2) => these.left(Semigroup.combine(e2)(e1)),
                  (b) => these.both(e1, b),
                  (e2, b) => these.both(Semigroup.combine(e2)(e1), b)
                )
              )
            )
          )
        )
      )
    }
}

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @since 3.0.0
 */
export const mapBoth = <F extends TypeLambda>(
  Functor: Functor<F>
): (<E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, O, FE>(self: Kind<TheseT<F, E>, S, R, O, FE, A>) => Kind<TheseT<F, G>, S, R, O, FE, B>) =>
  bifunctor.mapBothComposition(Functor, these.Bifunctor)

/**
 * @since 3.0.0
 */
export const mapError =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <E, G>(
    f: (e: E) => G
  ): (<S, R, O, FE, A>(self: Kind<TheseT<F, E>, S, R, O, FE, A>) => Kind<TheseT<F, G>, S, R, O, FE, A>) => {
    return Functor.map(these.mapError(f))
  }

/**
 * @since 3.0.0
 */
export const match = <F extends TypeLambda>(
  Functor: Functor<F>
): (<E, B, A, C = B, D = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => <S, R, O, FE>(self: Kind<TheseT<F, E>, S, R, O, FE, A>) => Kind<F, S, R, O, FE, B | C | D>) =>
  flow(these.match, Functor.map)

/**
 * @since 3.0.0
 */
export const matchKind =
  <F extends TypeLambda>(Flattenable: Flattenable<F>) =>
  <E, S, R2, O2, FE2, B, A, R3, O3, FE3, R4, O4, FE4, C = B, D = B>(
    onError: (e: E) => Kind<F, S, R2, O2, FE2, B>,
    onSuccess: (a: A) => Kind<F, S, R3, O3, FE3, C>,
    onBoth: (e: E, a: A) => Kind<F, S, R4, O4, FE4, D>
  ): (<R1, O1, FE1>(
    self: Kind<TheseT<F, E>, S, R1, O1, FE1, A>
  ) => Kind<F, S, R1 & R2 & R3 & R4, O1 | O2 | O3 | O4, FE1 | FE2 | FE3 | FE4, B | C | D>) =>
    Flattenable.flatMap(
      these.match<E, Kind<F, S, R2 & R3 & R4, O2 | O3 | O4, FE2 | FE3 | FE4, B | C | D>, A>(onError, onSuccess, onBoth)
    )

/**
 * @since 3.0.0
 */
export const swap = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, FE, E, A>(self: Kind<TheseT<F, E>, S, R, O, FE, A>) => Kind<TheseT<F, A>, S, R, O, FE, E>) =>
  Functor.map(these.swap)

/**
 * @since 3.0.0
 */
export const toTuple2 = <F extends TypeLambda>(
  Functor: Functor<F>
): (<E, A>(
  onRight: E,
  onLeft: A
) => <S, R, O, FE>(self: Kind<TheseT<F, E>, S, R, O, FE, A>) => Kind<F, S, R, O, FE, readonly [E, A]>) =>
  flow(these.toTuple2, Functor.map)
