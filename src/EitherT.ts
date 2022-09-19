/**
 * @since 3.0.0
 */
import * as ApplyModule from './Apply'
import type { Chain } from './Chain'
import * as EitherModule from './Either'
import { flow, Lazy, pipe } from './function'
import * as FunctorModule from './Functor'
import type { HKT, Kind } from './HKT'
import type { Monad } from './Monad'
import type { Pointed } from './Pointed'
import type { Semigroup } from './Semigroup'

import Apply = ApplyModule.Apply
import Either = EitherModule.Either
import Functor = FunctorModule.Functor

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const right =
  <F extends HKT>(F: Pointed<F>) =>
  <A, S, R = unknown, W = never, FE = never, E = never>(a: A): Kind<F, S, R, W, FE, Either<E, A>> =>
    F.of(EitherModule.right(a))

/**
 * @since 3.0.0
 */
export const left =
  <F extends HKT>(F: Pointed<F>) =>
  <E, S, R = unknown, W = never, FE = never, A = never>(e: E): Kind<F, S, R, W, FE, Either<E, A>> =>
    F.of(EitherModule.left(e))

/**
 * @since 3.0.0
 */
export function rightF<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, A, E = never>(fa: Kind<F, S, R, W, FE, A>) => Kind<F, S, R, W, FE, Either<E, A>> {
  return F.map(EitherModule.right)
}

/**
 * @since 3.0.0
 */
export function leftF<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A = never>(fe: Kind<F, S, R, W, FE, E>) => Kind<F, S, R, W, FE, Either<E, A>> {
  return F.map(EitherModule.left)
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const map = <F extends HKT>(
  F: Functor<F>
): (<A, B>(
  f: (a: A) => B
) => <S, R, W, FE, E>(fa: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, Either<E, B>>) =>
  FunctorModule.map(F, EitherModule.Functor)

/**
 * @since 3.0.0
 */
export const ap = <F extends HKT>(
  F: Apply<F>
): (<S, R2, W2, FE2, E2, A>(
  fa: Kind<F, S, R2, W2, FE2, Either<E2, A>>
) => <R1, W1, FE1, E1, B>(
  fab: Kind<F, S, R1, W1, FE1, Either<E1, (a: A) => B>>
) => Kind<F, S, R1 & R2, W1 | W2, FE1 | FE2, Either<E1 | E2, B>>) => {
  return ApplyModule.ap(F, EitherModule.Apply)
}

/**
 * @since 3.0.0
 */
export const chain =
  <M extends HKT>(M: Monad<M>) =>
  <A, S, R2, W2, ME2, E2, B>(f: (a: A) => Kind<M, S, R2, W2, ME2, Either<E2, B>>) =>
  <R1, W1, ME1, E1>(
    ma: Kind<M, S, R1, W1, ME1, Either<E1, A>>
  ): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E1 | E2, B>> => {
    return pipe(
      ma,
      M.chain(
        (e): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E1 | E2, B>> =>
          EitherModule.isLeft(e) ? M.of(e) : f(e.right)
      )
    )
  }

/**
 * @since 3.0.0
 */
export const alt =
  <M extends HKT>(M: Monad<M>) =>
  <S, R2, W2, ME2, E2, B>(second: Lazy<Kind<M, S, R2, W2, ME2, Either<E2, B>>>) =>
  <R1, W1, ME1, E1, A>(
    first: Kind<M, S, R1, W1, ME1, Either<E1, A>>
  ): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E2, A | B>> => {
    return pipe(
      first,
      M.chain<Either<E1, A>, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E2, B | A>>((e) =>
        EitherModule.isLeft(e) ? second() : M.of(e)
      )
    )
  }

/**
 * @since 3.0.0
 */
export function bimap<F extends HKT>(
  F: Functor<F>
): <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, W, FE>(fea: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, Either<G, B>> {
  return flow(EitherModule.bimap, F.map)
}

/**
 * @since 3.0.0
 */
export function mapLeft<F extends HKT>(
  F: Functor<F>
): <E, G>(
  f: (e: E) => G
) => <S, R, W, FE, A>(fea: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, Either<G, A>> {
  return (f) => F.map(EitherModule.mapLeft(f))
}

/**
 * @since 3.0.0
 */
export const altValidation =
  <M extends HKT, E>(M: Monad<M>, S: Semigroup<E>) =>
  <S, R2, W2, ME2, B>(second: Lazy<Kind<M, S, R2, W2, ME2, Either<E, B>>>) =>
  <R1, W1, ME1, A>(
    first: Kind<M, S, R1, W1, ME1, Either<E, A>>
  ): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E, A | B>> => {
    const rightM = right(M)
    return pipe(
      first,
      M.chain(
        EitherModule.match<E, Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E, A | B>>, A | B>(
          (e1) => pipe(second(), M.map(EitherModule.mapLeft((e2) => S.concat(e2)(e1)))),
          rightM
        )
      )
    )
  }

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<F extends HKT>(
  F: Functor<F>
): <E, B, A, C = B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => <S, R, W, ME>(ma: Kind<F, S, R, W, ME, Either<E, A>>) => Kind<F, S, R, W, ME, B | C> {
  return flow(EitherModule.match, F.map)
}

/**
 * @since 3.0.0
 */
export const matchE =
  <M extends HKT>(M: Chain<M>) =>
  <E, S, R2, W2, ME2, B, A, R3, W3, ME3, C = B>(
    onLeft: (e: E) => Kind<M, S, R2, W2, ME2, B>,
    onRight: (a: A) => Kind<M, S, R3, W3, ME3, C>
  ): (<R1, W1, ME1>(
    ma: Kind<M, S, R1, W1, ME1, Either<E, A>>
  ) => Kind<M, S, R1 & R2 & R3, W1 | W2 | W3, ME1 | ME2 | ME3, B | C>) => {
    return M.chain(EitherModule.match<E, Kind<M, S, R2 & R3, W2 | W3, ME2 | ME3, B | C>, A>(onLeft, onRight))
  }

/**
 * @since 3.0.0
 */
export const getOrElse =
  <F extends HKT>(F: Functor<F>) =>
  <E, B>(
    onLeft: (e: E) => B
  ): (<S, R, W, ME, A>(ma: Kind<F, S, R, W, ME, Either<E, A>>) => Kind<F, S, R, W, ME, A | B>) => {
    return F.map(EitherModule.getOrElse(onLeft))
  }

/**
 * @since 3.0.0
 */
export const getOrElseE =
  <M extends HKT>(M: Monad<M>) =>
  <E, S, R2, W2, ME2, B>(onLeft: (e: E) => Kind<M, S, R2, W2, ME2, B>) =>
  <R1, W1, ME1, A>(ma: Kind<M, S, R1, W1, ME1, Either<E, A>>): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, A | B> => {
    return pipe(ma, M.chain(EitherModule.match<E, Kind<M, S, R2, W2, ME2, A | B>, A>(onLeft, M.of)))
  }

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const orElse =
  <M extends HKT>(M: Monad<M>) =>
  <E1, S, R2, W2, ME2, E2, B>(onLeft: (e: E1) => Kind<M, S, R2, W2, ME2, Either<E2, B>>) =>
  <R1, W1, ME1, A>(
    ma: Kind<M, S, R1, W1, ME1, Either<E1, A>>
  ): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E2, A | B>> => {
    return pipe(
      ma,
      M.chain<Either<E1, A>, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E2, A | B>>((e) =>
        EitherModule.isLeft(e) ? onLeft(e.left) : M.of(e)
      )
    )
  }

/**
 * @since 3.0.0
 */
export const orLeft =
  <M extends HKT>(M: Monad<M>) =>
  <E1, S, R, W, ME, E2>(onLeft: (e: E1) => Kind<M, S, R, W, ME, E2>) =>
  <A>(fa: Kind<M, S, R, W, ME, Either<E1, A>>): Kind<M, S, R, W, ME, Either<E2, A>> => {
    return pipe(
      fa,
      M.chain(
        EitherModule.match<E1, Kind<M, S, R, W, ME, Either<E2, A>>, A>(
          (e) => pipe(onLeft(e), M.map(EitherModule.left)),
          (a) => M.of(EitherModule.right(a))
        )
      )
    )
  }

/**
 * @since 3.0.0
 */
export const orElseFirst = <M extends HKT>(M: Monad<M>) => {
  const orElseM = orElse(M)
  return <E1, S, R2, W2, ME2, E2, B>(onLeft: (e: E1) => Kind<M, S, R2, W2, ME2, Either<E2, B>>) =>
    <R1, W1, ME1, A>(
      ma: Kind<M, S, R1, W1, ME1, Either<E1, A>>
    ): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E1 | E2, A>> => {
      return pipe(
        ma,
        orElseM<E1, S, R2, W2, ME2, E1 | E2, A>((e) =>
          pipe(
            onLeft(e),
            M.map((eb) => (EitherModule.isLeft(eb) ? eb : EitherModule.left(e)))
          )
        )
      )
    }
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function swap<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A>(ma: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, Either<A, E>> {
  return F.map(EitherModule.swap)
}

/**
 * @since 3.0.0
 */
export function toUnion<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A>(fa: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, E | A> {
  return F.map(EitherModule.toUnion)
}

/**
 * @since 3.0.0
 */
export const bracket =
  <M extends HKT>(M: Monad<M>) =>
  <S, R1, W1, ME1, E1, A, R2, W2, ME2, E2, B, R3, W3, ME3, E3>(
    acquire: Kind<M, S, R1, W1, ME1, Either<E1, A>>,
    use: (a: A) => Kind<M, S, R2, W2, ME2, Either<E2, B>>,
    release: (a: A, e: Either<E2, B>) => Kind<M, S, R3, W3, ME3, Either<E3, void>>
  ): Kind<M, S, R1 & R2 & R3, W1 | W2 | W3, ME1 | ME2 | ME3, Either<E1 | E2 | E3, B>> => {
    const leftM = left(M)
    return pipe(
      acquire,
      M.chain(
        EitherModule.match<E1, Kind<M, S, R1 & R2 & R3, W1 | W2 | W3, ME1 | ME2 | ME3, Either<E1 | E2 | E3, B>>, A>(
          leftM,
          (a) =>
            pipe(
              use(a),
              M.chain((e) =>
                pipe(
                  release(a, e),
                  M.chain(
                    EitherModule.match<E3, Kind<M, S, unknown, never, never, Either<E2 | E3, B>>, void>(leftM, () =>
                      M.of(e)
                    )
                  )
                )
              )
            )
        )
      )
    )
  }
