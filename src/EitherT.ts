/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import * as apply from './Apply'
import * as compactable from './Compactable'
import type { Either } from './Either'
import * as either from './Either'
import type { Flattenable } from './Flattenable'
import type { LazyArg } from './Function'
import { flow, pipe } from './Function'
import type { Functor } from './Functor'
import * as functor from './Functor'
import type { Kind, TypeLambda } from './HKT'
import type { Monad } from './Monad'
import type { Option } from './Option'
import type { Pointed } from './Pointed'
import type { Semigroup } from './Semigroup'

/**
 * @since 3.0.0
 */
export interface EitherT<F extends TypeLambda, E> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], Either<E, this['Out1']>>
}

/**
 * @since 3.0.0
 */
export const right =
  <F extends TypeLambda>(Pointed: Pointed<F>) =>
  <A, S>(a: A): Kind<EitherT<F, never>, S, unknown, never, never, A> =>
    Pointed.of(either.right(a))

/**
 * @since 3.0.0
 */
export const left =
  <F extends TypeLambda>(Pointed: Pointed<F>) =>
  <E, S>(e: E): Kind<EitherT<F, E>, S, unknown, never, never, never> =>
    Pointed.of(either.left(e))

/**
 * @since 3.0.0
 */
export const rightKind = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, FE, A>(fa: Kind<F, S, R, O, FE, A>) => Kind<EitherT<F, never>, S, R, O, FE, A>) =>
  Functor.map(either.right)

/**
 * @since 3.0.0
 */
export const leftKind = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, FE, E>(fe: Kind<F, S, R, O, FE, E>) => Kind<EitherT<F, E>, S, R, O, FE, never>) =>
  Functor.map(either.left)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @since 3.0.0
 */
export const map = <F extends TypeLambda>(Functor: Functor<F>) => {
  const map_ = functor.mapComposition(Functor, either.Functor)
  return <A, B>(
    f: (a: A) => B
  ): (<S, R, O, FE, E>(self: Kind<EitherT<F, E>, S, R, O, FE, A>) => Kind<EitherT<F, E>, S, R, O, FE, B>) => map_(f)
}

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda>(
  Apply: Apply<F>
): (<S, R2, O2, FE2, E2, A>(
  fa: Kind<EitherT<F, E2>, S, R2, O2, FE2, A>
) => <R1, O1, FE1, E1, B>(
  self: Kind<EitherT<F, E1>, S, R1, O1, FE1, (a: A) => B>
) => Kind<F, S, R1 & R2, O1 | O2, FE1 | FE2, Either<E1 | E2, B>>) => apply.apComposition(Apply, either.Apply)

/**
 * @since 3.0.0
 */
export const flatMap =
  <F extends TypeLambda>(Monad: Monad<F>) =>
  <A, S, R2, O2, FE2, E2, B>(f: (a: A) => Kind<EitherT<F, E2>, S, R2, O2, FE2, B>) =>
  <R1, O1, FE1, E1>(
    self: Kind<EitherT<F, E1>, S, R1, O1, FE1, A>
  ): Kind<EitherT<F, E1 | E2>, S, R1 & R2, O1 | O2, FE1 | FE2, B> =>
    pipe(
      self,
      Monad.flatMap(
        (e): Kind<EitherT<F, E1 | E2>, S, R1 & R2, O1 | O2, FE1 | FE2, B> =>
          either.isLeft(e) ? Monad.of(e) : f(e.right)
      )
    )

/**
 * @since 3.0.0
 */
export const catchAll =
  <F extends TypeLambda>(Monad: Monad<F>) =>
  <E1, S, R2, O2, FE2, E2, B>(onError: (e: E1) => Kind<EitherT<F, E2>, S, R2, O2, FE2, B>) =>
  <R1, O1, FE1, A>(
    self: Kind<EitherT<F, E1>, S, R1, O1, FE1, A>
  ): Kind<EitherT<F, E2>, S, R1 & R2, O1 | O2, FE1 | FE2, A | B> =>
    pipe(
      self,
      Monad.flatMap<Either<E1, A>, S, R1 & R2, O1 | O2, FE1 | FE2, Either<E2, A | B>>((e) =>
        either.isLeft(e) ? onError(e.left) : Monad.of(e)
      )
    )

/**
 * @since 3.0.0
 */
export const orElse = <F extends TypeLambda>(Monad: Monad<F>) => {
  const catchAll_ = catchAll(Monad)
  return <S, R2, O2, FE2, E2, B>(
    that: Kind<EitherT<F, E2>, S, R2, O2, FE2, B>
  ): (<R1, O1, FE1, E1, A>(
    self: Kind<EitherT<F, E1>, S, R1, O1, FE1, A>
  ) => Kind<EitherT<F, E2>, S, R1 & R2, O1 | O2, FE1 | FE2, A | B>) => catchAll_(() => that)
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
) => <S, R, O, FE>(self: Kind<EitherT<F, E>, S, R, O, FE, A>) => Kind<EitherT<F, G>, S, R, O, FE, B>) =>
  flow(either.mapBoth, Functor.map)

/**
 * @since 3.0.0
 */
export const mapLeft =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <E, G>(
    f: (e: E) => G
  ): (<S, R, O, FE, A>(self: Kind<EitherT<F, E>, S, R, O, FE, A>) => Kind<EitherT<F, G>, S, R, O, FE, A>) =>
    Functor.map(either.mapError(f))

/**
 * @since 3.0.0
 */
export const getValidatedCombineKind =
  <F extends TypeLambda, E>(Monad: Monad<F>, Semigroup: Semigroup<E>) =>
  <S, R2, O2, FE2, B>(that: Kind<EitherT<F, E>, S, R2, O2, FE2, B>) =>
  <R1, O1, FE1, A>(
    self: Kind<EitherT<F, E>, S, R1, O1, FE1, A>
  ): Kind<EitherT<F, E>, S, R1 & R2, O1 | O2, FE1 | FE2, A | B> => {
    const rightM = right(Monad)
    return pipe(
      self,
      Monad.flatMap(
        either.match<E, Kind<F, S, R1 & R2, O1 | O2, FE1 | FE2, Either<E, A | B>>, A | B>(
          (e1) => pipe(that, Monad.map(either.mapError((e2) => Semigroup.combine(e2)(e1)))),
          rightM
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
) => <S, R, O, FE>(self: Kind<EitherT<F, E>, S, R, O, FE, A>) => Kind<F, S, R, O, FE, B | C>) =>
  flow(either.match, Functor.map)

/**
 * @since 3.0.0
 */
export const matchKind =
  <F extends TypeLambda>(Flattenable: Flattenable<F>) =>
  <E, S, R2, O2, FE2, B, A, R3, O3, FE3, C = B>(
    onError: (e: E) => Kind<F, S, R2, O2, FE2, B>,
    onSuccess: (a: A) => Kind<F, S, R3, O3, FE3, C>
  ): (<R1, O1, FE1>(
    self: Kind<EitherT<F, E>, S, R1, O1, FE1, A>
  ) => Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, FE1 | FE2 | FE3, B | C>) =>
    Flattenable.flatMap(either.match<E, Kind<F, S, R2 & R3, O2 | O3, FE2 | FE3, B | C>, A>(onError, onSuccess))

/**
 * @since 3.0.0
 */
export const getOrElse =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <B>(onError: B): (<S, R, O, FE, A>(self: Kind<EitherT<F, unknown>, S, R, O, FE, A>) => Kind<F, S, R, O, FE, A | B>) =>
    Functor.map(either.getOrElse(onError))

/**
 * @since 3.0.0
 */
export const getOrElseKind =
  <F extends TypeLambda>(Monad: Monad<F>) =>
  <S, R2, O2, FE2, B>(onError: Kind<F, S, R2, O2, FE2, B>) =>
  <R1, O1, FE1, A>(
    self: Kind<EitherT<F, unknown>, S, R1, O1, FE1, A>
  ): Kind<F, S, R1 & R2, O1 | O2, FE1 | FE2, A | B> => {
    return pipe(self, Monad.flatMap(either.match<unknown, Kind<F, S, R2, O2, FE2, A | B>, A>(() => onError, Monad.of)))
  }

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @since 3.0.0
 */
export const tapLeft = <F extends TypeLambda>(Monad: Monad<F>) => {
  const catchAll_ = catchAll(Monad)
  return <E1, S, R2, O2, FE2, E2, _>(onError: (e: E1) => Kind<EitherT<F, E2>, S, R2, O2, FE2, _>) =>
    <R1, O1, FE1, A>(
      self: Kind<EitherT<F, E1>, S, R1, O1, FE1, A>
    ): Kind<EitherT<F, E1 | E2>, S, R1 & R2, O1 | O2, FE1 | FE2, A> => {
      return pipe(
        self,
        catchAll_<E1, S, R2, O2, FE2, E1 | E2, A>((e) =>
          pipe(
            onError(e),
            Monad.map((eb) => (either.isLeft(eb) ? eb : either.left(e)))
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
): (<S, R, O, FE, E, A>(self: Kind<EitherT<F, E>, S, R, O, FE, A>) => Kind<EitherT<F, A>, S, R, O, FE, E>) =>
  Functor.map(either.swap)

/**
 * @since 3.0.0
 */
export const toUnion = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, FE, E, A>(self: Kind<EitherT<F, E>, S, R, O, FE, A>) => Kind<F, S, R, O, FE, E | A>) =>
  Functor.map(either.toUnion)

/**
 * @since 3.0.0
 */
export const bracket =
  <F extends TypeLambda>(Monad: Monad<F>) =>
  <S, R1, O1, FE1, E1, A, R2, O2, FE2, E2, B, R3, O3, FE3, E3>(
    acquire: Kind<EitherT<F, E1>, S, R1, O1, FE1, A>,
    use: (a: A) => Kind<EitherT<F, E2>, S, R2, O2, FE2, B>,
    release: (a: A, e: Either<E2, B>) => Kind<EitherT<F, E3>, S, R3, O3, FE3, void>
  ): Kind<EitherT<F, E1 | E2 | E3>, S, R1 & R2 & R3, O1 | O2 | O3, FE1 | FE2 | FE3, B> => {
    const leftM = left(Monad)
    return pipe(
      acquire,
      Monad.flatMap(
        either.match<E1, Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, FE1 | FE2 | FE3, Either<E1 | E2 | E3, B>>, A>(
          leftM,
          (a) =>
            pipe(
              use(a),
              Monad.flatMap((e) =>
                pipe(
                  release(a, e),
                  Monad.flatMap(
                    either.match<E3, Kind<F, S, unknown, never, never, Either<E2 | E3, B>>, void>(leftM, () =>
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
    onNone: LazyArg<E>
  ): (<S, R, O, FE, A>(self: Kind<EitherT<F, E>, S, R, O, FE, Option<A>>) => Kind<EitherT<F, E>, S, R, O, FE, A>) =>
    compactable.compactComposition(Functor, either.getCompactable(onNone))

/**
 * @since 3.0.0
 */
export const separate = <F extends TypeLambda>(Functor: Functor<F>) => {
  const compact_ = compact(Functor)
  const map_ = map(Functor)
  return <E>(
    onEmpty: LazyArg<E>
  ): (<S, R, O, FE, A, B>(
    self: Kind<EitherT<F, E>, S, R, O, FE, Either<A, B>>
  ) => readonly [Kind<EitherT<F, E>, S, R, O, FE, A>, Kind<EitherT<F, E>, S, R, O, FE, B>]) => {
    const F: Functor<EitherT<F, E>> = { map: map_ }
    const C: compactable.Compactable<EitherT<F, E>> = { compact: compact_(onEmpty) }
    return compactable.separate(F, C)
  }
}
