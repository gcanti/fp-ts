/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import * as apply from './Apply'
import * as bifunctor from './Bifunctor'
import * as compactable from './Compactable'
import type { Result } from './Result'
import * as result from './Result'
import type { Flattenable } from './Flattenable'
import { flow, pipe } from './Function'
import type { Functor } from './Functor'
import * as functor from './Functor'
import type { Kind, TypeLambda } from './HKT'
import type { Monad } from './Monad'
import type { Option } from './Option'
import type { FromIdentity } from './FromIdentity'
import type { Semigroup } from './Semigroup'

/**
 * @since 3.0.0
 */
export interface ResultT<F extends TypeLambda, E> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], Result<E, this['Out1']>>
}

/**
 * @since 3.0.0
 */
export const succeed =
  <F extends TypeLambda>(FromIdentity: FromIdentity<F>) =>
  <A, S>(a: A): Kind<ResultT<F, never>, S, unknown, never, never, A> =>
    FromIdentity.of(result.succeed(a))

/**
 * @since 3.0.0
 */
export const fail =
  <F extends TypeLambda>(FromIdentity: FromIdentity<F>) =>
  <E, S>(e: E): Kind<ResultT<F, E>, S, unknown, never, never, never> =>
    FromIdentity.of(result.fail(e))

/**
 * @since 3.0.0
 */
export const fromKind = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, FE, A>(fa: Kind<F, S, R, O, FE, A>) => Kind<ResultT<F, never>, S, R, O, FE, A>) =>
  Functor.map(result.succeed)

/**
 * @since 3.0.0
 */
export const failKind = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, FE, E>(fe: Kind<F, S, R, O, FE, E>) => Kind<ResultT<F, E>, S, R, O, FE, never>) =>
  Functor.map(result.fail)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @since 3.0.0
 */
export const map = <F extends TypeLambda>(Functor: Functor<F>) => {
  const map_ = functor.mapComposition(Functor, result.Functor)
  return <A, B>(
    f: (a: A) => B
  ): (<S, R, O, FE, E>(self: Kind<ResultT<F, E>, S, R, O, FE, A>) => Kind<ResultT<F, E>, S, R, O, FE, B>) => map_(f)
}

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda>(
  Apply: Apply<F>
): (<S, R2, O2, FE2, E2, A>(
  fa: Kind<ResultT<F, E2>, S, R2, O2, FE2, A>
) => <R1, O1, FE1, E1, B>(
  self: Kind<ResultT<F, E1>, S, R1, O1, FE1, (a: A) => B>
) => Kind<F, S, R1 & R2, O1 | O2, FE1 | FE2, Result<E1 | E2, B>>) => apply.apComposition(Apply, result.Apply)

/**
 * @since 3.0.0
 */
export const flatMap =
  <F extends TypeLambda>(Monad: Monad<F>) =>
  <A, S, R2, O2, FE2, E2, B>(f: (a: A) => Kind<ResultT<F, E2>, S, R2, O2, FE2, B>) =>
  <R1, O1, FE1, E1>(
    self: Kind<ResultT<F, E1>, S, R1, O1, FE1, A>
  ): Kind<ResultT<F, E1 | E2>, S, R1 & R2, O1 | O2, FE1 | FE2, B> =>
    pipe(
      self,
      Monad.flatMap(
        (e): Kind<ResultT<F, E1 | E2>, S, R1 & R2, O1 | O2, FE1 | FE2, B> =>
          result.isFailure(e) ? Monad.of(e) : f(e.success)
      )
    )

/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @since 3.0.0
 */
export const flatMapError =
  <F extends TypeLambda>(Monad: Monad<F>) =>
  <E1, S, R, O, FE, E2>(f: (e: E1) => Kind<F, S, R, O, FE, E2>) =>
  <A>(self: Kind<ResultT<F, E1>, S, R, O, FE, A>): Kind<ResultT<F, E2>, S, R, O, FE, A> =>
    pipe(
      self,
      Monad.flatMap<Result<E1, A>, S, R, O, FE, Result<E2, A>>(
        result.match(
          (e) => pipe(f(e), Monad.map(result.fail)),
          (a) => Monad.of(result.succeed(a))
        )
      )
    )

/**
 * @since 3.0.0
 */
export const catchAll =
  <F extends TypeLambda>(Monad: Monad<F>) =>
  <E1, S, R2, O2, FE2, E2, B>(onError: (e: E1) => Kind<ResultT<F, E2>, S, R2, O2, FE2, B>) =>
  <R1, O1, FE1, A>(
    self: Kind<ResultT<F, E1>, S, R1, O1, FE1, A>
  ): Kind<ResultT<F, E2>, S, R1 & R2, O1 | O2, FE1 | FE2, A | B> =>
    pipe(
      self,
      Monad.flatMap<Result<E1, A>, S, R1 & R2, O1 | O2, FE1 | FE2, Result<E2, A | B>>((e) =>
        result.isFailure(e) ? onError(e.failure) : Monad.of(e)
      )
    )

/**
 * @since 3.0.0
 */
export const orElse = <F extends TypeLambda>(Monad: Monad<F>) => {
  const catchAll_ = catchAll(Monad)
  return <S, R2, O2, FE2, E2, B>(
    that: Kind<ResultT<F, E2>, S, R2, O2, FE2, B>
  ): (<R1, O1, FE1, E1, A>(
    self: Kind<ResultT<F, E1>, S, R1, O1, FE1, A>
  ) => Kind<ResultT<F, E2>, S, R1 & R2, O1 | O2, FE1 | FE2, A | B>) => catchAll_(() => that)
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
) => <S, R, O, FE>(self: Kind<ResultT<F, E>, S, R, O, FE, A>) => Kind<ResultT<F, G>, S, R, O, FE, B>) =>
  bifunctor.mapBothComposition(Functor, result.Bifunctor)

/**
 * @since 3.0.0
 */
export const mapError =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <E, G>(
    f: (e: E) => G
  ): (<S, R, O, FE, A>(self: Kind<ResultT<F, E>, S, R, O, FE, A>) => Kind<ResultT<F, G>, S, R, O, FE, A>) =>
    Functor.map(result.mapError(f))

/**
 * @since 3.0.0
 */
export const getValidatedOrElse =
  <F extends TypeLambda, E>(Monad: Monad<F>, Semigroup: Semigroup<E>) =>
  <S, R2, O2, FE2, B>(that: Kind<ResultT<F, E>, S, R2, O2, FE2, B>) =>
  <R1, O1, FE1, A>(
    self: Kind<ResultT<F, E>, S, R1, O1, FE1, A>
  ): Kind<ResultT<F, E>, S, R1 & R2, O1 | O2, FE1 | FE2, A | B> => {
    const of_ = succeed(Monad)
    return pipe(
      self,
      Monad.flatMap(
        result.match<E, Kind<F, S, R1 & R2, O1 | O2, FE1 | FE2, Result<E, A | B>>, A | B>(
          (e1) => pipe(that, Monad.map(result.mapError((e2) => Semigroup.combine(e2)(e1)))),
          of_
        )
      )
    )
  }

/**
 * @since 3.0.0
 */
export const match = <F extends TypeLambda>(
  Functor: Functor<F>
): (<E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => <S, R, O, FE>(self: Kind<ResultT<F, E>, S, R, O, FE, A>) => Kind<F, S, R, O, FE, B | C>) =>
  flow(result.match, Functor.map)

/**
 * @since 3.0.0
 */
export const matchKind =
  <F extends TypeLambda>(Flattenable: Flattenable<F>) =>
  <E, S, R2, O2, FE2, B, A, R3, O3, FE3, C = B>(
    onError: (e: E) => Kind<F, S, R2, O2, FE2, B>,
    onSuccess: (a: A) => Kind<F, S, R3, O3, FE3, C>
  ): (<R1, O1, FE1>(
    self: Kind<ResultT<F, E>, S, R1, O1, FE1, A>
  ) => Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, FE1 | FE2 | FE3, B | C>) =>
    Flattenable.flatMap(result.match<E, Kind<F, S, R2 & R3, O2 | O3, FE2 | FE3, B | C>, A>(onError, onSuccess))

/**
 * @since 3.0.0
 */
export const getOrElse =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <B>(onError: B): (<S, R, O, FE, A>(self: Kind<ResultT<F, unknown>, S, R, O, FE, A>) => Kind<F, S, R, O, FE, A | B>) =>
    Functor.map(result.getOrElse(onError))

/**
 * @since 3.0.0
 */
export const getOrElseKind =
  <F extends TypeLambda>(Monad: Monad<F>) =>
  <S, R2, O2, FE2, B>(onError: Kind<F, S, R2, O2, FE2, B>) =>
  <R1, O1, FE1, A>(
    self: Kind<ResultT<F, unknown>, S, R1, O1, FE1, A>
  ): Kind<F, S, R1 & R2, O1 | O2, FE1 | FE2, A | B> => {
    return pipe(self, Monad.flatMap(result.match<unknown, Kind<F, S, R2, O2, FE2, A | B>, A>(() => onError, Monad.of)))
  }

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @since 3.0.0
 */
export const tapLeft = <F extends TypeLambda>(Monad: Monad<F>) => {
  const catchAll_ = catchAll(Monad)
  return <E1, S, R2, O2, FE2, E2>(onError: (e: E1) => Kind<ResultT<F, E2>, S, R2, O2, FE2, unknown>) =>
    <R1, O1, FE1, A>(
      self: Kind<ResultT<F, E1>, S, R1, O1, FE1, A>
    ): Kind<ResultT<F, E1 | E2>, S, R1 & R2, O1 | O2, FE1 | FE2, A> => {
      return pipe(
        self,
        catchAll_<E1, S, R2, O2, FE2, E1 | E2, A>((e) =>
          pipe(
            onError(e),
            Monad.map((eb) => (result.isFailure(eb) ? eb : result.fail(e)))
          )
        )
      )
    }
}

/**
 * @since 3.0.0
 */
export const swap = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, FE, E, A>(self: Kind<ResultT<F, E>, S, R, O, FE, A>) => Kind<ResultT<F, A>, S, R, O, FE, E>) =>
  Functor.map(result.swap)

/**
 * @since 3.0.0
 */
export const toUnion = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, FE, E, A>(self: Kind<ResultT<F, E>, S, R, O, FE, A>) => Kind<F, S, R, O, FE, E | A>) =>
  Functor.map(result.toUnion)

/**
 * @since 3.0.0
 */
export const bracket =
  <F extends TypeLambda>(Monad: Monad<F>) =>
  <S, R1, O1, FE1, E1, A, R2, O2, FE2, E2, B, R3, O3, FE3, E3>(
    acquire: Kind<ResultT<F, E1>, S, R1, O1, FE1, A>,
    use: (a: A) => Kind<ResultT<F, E2>, S, R2, O2, FE2, B>,
    release: (a: A, e: Result<E2, B>) => Kind<ResultT<F, E3>, S, R3, O3, FE3, void>
  ): Kind<ResultT<F, E1 | E2 | E3>, S, R1 & R2 & R3, O1 | O2 | O3, FE1 | FE2 | FE3, B> => {
    const fail_ = fail(Monad)
    return pipe(
      acquire,
      Monad.flatMap(
        result.match<E1, Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, FE1 | FE2 | FE3, Result<E1 | E2 | E3, B>>, A>(
          fail_,
          (a) =>
            pipe(
              use(a),
              Monad.flatMap((e) =>
                pipe(
                  release(a, e),
                  Monad.flatMap(
                    result.match<E3, Kind<F, S, unknown, never, never, Result<E2 | E3, B>>, void>(fail_, () =>
                      Monad.of(e)
                    )
                  )
                )
              )
            )
        )
      )
    )
  }

/**
 * @since 3.0.0
 */
export const compact =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <E>(
    onNone: E
  ): (<S, R, O, FE, A>(self: Kind<ResultT<F, E>, S, R, O, FE, Option<A>>) => Kind<ResultT<F, E>, S, R, O, FE, A>) =>
    compactable.compactComposition(Functor, result.getCompactable(onNone))

/**
 * @since 3.0.0
 */
export const separate = <F extends TypeLambda>(Functor: Functor<F>) => {
  const compact_ = compact(Functor)
  const map_ = map(Functor)
  return <E>(
    onEmpty: E
  ): (<S, R, O, FE, A, B>(
    self: Kind<ResultT<F, E>, S, R, O, FE, Result<A, B>>
  ) => readonly [Kind<ResultT<F, E>, S, R, O, FE, A>, Kind<ResultT<F, E>, S, R, O, FE, B>]) => {
    const F: Functor<ResultT<F, E>> = { map: map_ }
    const C: compactable.Compactable<ResultT<F, E>> = { compact: compact_(onEmpty) }
    return compactable.separate(F, C)
  }
}
