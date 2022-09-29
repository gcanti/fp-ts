/**
 * @since 3.0.0
 */
import * as apply from './Apply'
import type { Apply } from './Apply'
import type { Flattenable } from './Flattenable'
import * as either from './Either'
import type { Either } from './Either'
import { flow, pipe } from './function'
import * as functor from './Functor'
import type { Functor } from './Functor'
import type { TypeLambda, Kind } from './HKT'
import type { Monad } from './Monad'
import type { Pointed } from './Pointed'
import type { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const right =
  <F extends TypeLambda>(F: Pointed<F>) =>
  <A, S>(a: A): Kind<F, S, unknown, never, never, Either<never, A>> =>
    F.of(either.right(a))

/**
 * @since 3.0.0
 */
export const left =
  <F extends TypeLambda>(F: Pointed<F>) =>
  <E, S>(e: E): Kind<F, S, unknown, never, never, Either<E, never>> =>
    F.of(either.left(e))

/**
 * @since 3.0.0
 */
export function rightF<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, A>(fa: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, Either<never, A>> {
  return F.map(either.right)
}

/**
 * @since 3.0.0
 */
export function leftF<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, L>(fl: Kind<F, S, R, O, E, L>) => Kind<F, S, R, O, E, Either<L, never>> {
  return F.map(either.left)
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @since 3.0.0
 */
export const map = <F extends TypeLambda>(
  F: Functor<F>
): (<A, B>(
  f: (a: A) => B
) => <S, R, O, FE, E>(self: Kind<F, S, R, O, FE, Either<E, A>>) => Kind<F, S, R, O, FE, Either<E, B>>) =>
  functor.getMapComposition(F, either.Functor)

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda>(
  F: Apply<F>
): (<S, R2, O2, FE2, E2, A>(
  fa: Kind<F, S, R2, O2, FE2, Either<E2, A>>
) => <R1, O1, FE1, E1, B>(
  self: Kind<F, S, R1, O1, FE1, Either<E1, (a: A) => B>>
) => Kind<F, S, R1 & R2, O1 | O2, FE1 | FE2, Either<E1 | E2, B>>) => {
  return apply.getApComposition(F, either.Apply)
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap =
  <M extends TypeLambda>(M: Monad<M>) =>
  <A, S, R2, O2, ME2, E2, B>(f: (a: A) => Kind<M, S, R2, O2, ME2, Either<E2, B>>) =>
  <R1, O1, ME1, E1>(
    self: Kind<M, S, R1, O1, ME1, Either<E1, A>>
  ): Kind<M, S, R1 & R2, O1 | O2, ME1 | ME2, Either<E1 | E2, B>> => {
    return pipe(
      self,
      M.flatMap(
        (e): Kind<M, S, R1 & R2, O1 | O2, ME1 | ME2, Either<E1 | E2, B>> => (either.isLeft(e) ? M.of(e) : f(e.right))
      )
    )
  }

/**
 * @since 3.0.0
 */
export const orElse =
  <M extends TypeLambda>(M: Monad<M>) =>
  <S, R2, O2, ME2, E2, B>(that: Kind<M, S, R2, O2, ME2, Either<E2, B>>) =>
  <R1, O1, ME1, E1, A>(
    first: Kind<M, S, R1, O1, ME1, Either<E1, A>>
  ): Kind<M, S, R1 & R2, O1 | O2, ME1 | ME2, Either<E2, A | B>> => {
    return pipe(
      first,
      M.flatMap<Either<E1, A>, S, R1 & R2, O1 | O2, ME1 | ME2, Either<E2, B | A>>((e) =>
        either.isLeft(e) ? that : M.of(e)
      )
    )
  }

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth = <F extends TypeLambda>(
  F: Functor<F>
): (<E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, Either<E, A>>) => Kind<F, S, R, O, FE, Either<G, B>>) => {
  return flow(either.mapBoth, F.map)
}

/**
 * @category type class operations
 * @since 3.0.0
 */
export const mapLeft =
  <F extends TypeLambda>(F: Functor<F>) =>
  <E, G>(
    f: (e: E) => G
  ): (<S, R, O, FE, A>(self: Kind<F, S, R, O, FE, Either<E, A>>) => Kind<F, S, R, O, FE, Either<G, A>>) => {
    return F.map(either.mapError(f))
  }

/**
 * @since 3.0.0
 */
export const getValidatedCombineK =
  <M extends TypeLambda, E>(M: Monad<M>, S: Semigroup<E>) =>
  <S, R2, O2, ME2, B>(that: Kind<M, S, R2, O2, ME2, Either<E, B>>) =>
  <R1, O1, ME1, A>(
    first: Kind<M, S, R1, O1, ME1, Either<E, A>>
  ): Kind<M, S, R1 & R2, O1 | O2, ME1 | ME2, Either<E, A | B>> => {
    const rightM = right(M)
    return pipe(
      first,
      M.flatMap(
        either.match<E, Kind<M, S, R1 & R2, O1 | O2, ME1 | ME2, Either<E, A | B>>, A | B>(
          (e1) => pipe(that, M.map(either.mapError((e2) => S.combine(e2)(e1)))),
          rightM
        )
      )
    )
  }

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<F extends TypeLambda>(
  F: Functor<F>
): <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => <S, R, O, ME>(self: Kind<F, S, R, O, ME, Either<E, A>>) => Kind<F, S, R, O, ME, B | C> {
  return flow(either.match, F.map)
}

/**
 * @since 3.0.0
 */
export const matchWithEffect =
  <M extends TypeLambda>(M: Flattenable<M>) =>
  <E, S, R2, O2, ME2, B, A, R3, W3, ME3, C = B>(
    onError: (e: E) => Kind<M, S, R2, O2, ME2, B>,
    onSuccess: (a: A) => Kind<M, S, R3, W3, ME3, C>
  ): (<R1, O1, ME1>(
    self: Kind<M, S, R1, O1, ME1, Either<E, A>>
  ) => Kind<M, S, R1 & R2 & R3, O1 | O2 | W3, ME1 | ME2 | ME3, B | C>) => {
    return M.flatMap(either.match<E, Kind<M, S, R2 & R3, O2 | W3, ME2 | ME3, B | C>, A>(onError, onSuccess))
  }

/**
 * @category error handling
 * @since 3.0.0
 */
export const getOrElse =
  <F extends TypeLambda>(F: Functor<F>) =>
  <E, B>(
    onError: (e: E) => B
  ): (<S, R, O, ME, A>(self: Kind<F, S, R, O, ME, Either<E, A>>) => Kind<F, S, R, O, ME, A | B>) => {
    return F.map(either.getOrElse(onError))
  }

/**
 * @since 3.0.0
 */
export const getOrElseWithEffect =
  <M extends TypeLambda>(M: Monad<M>) =>
  <E, S, R2, O2, ME2, B>(onError: (e: E) => Kind<M, S, R2, O2, ME2, B>) =>
  <R1, O1, ME1, A>(self: Kind<M, S, R1, O1, ME1, Either<E, A>>): Kind<M, S, R1 & R2, O1 | O2, ME1 | ME2, A | B> => {
    return pipe(self, M.flatMap(either.match<E, Kind<M, S, R2, O2, ME2, A | B>, A>(onError, M.of)))
  }

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category error handling
 * @since 3.0.0
 */
export const catchAll =
  <M extends TypeLambda>(M: Monad<M>) =>
  <E1, S, R2, O2, ME2, E2, B>(onError: (e: E1) => Kind<M, S, R2, O2, ME2, Either<E2, B>>) =>
  <R1, O1, ME1, A>(
    self: Kind<M, S, R1, O1, ME1, Either<E1, A>>
  ): Kind<M, S, R1 & R2, O1 | O2, ME1 | ME2, Either<E2, A | B>> => {
    return pipe(
      self,
      M.flatMap<Either<E1, A>, S, R1 & R2, O1 | O2, ME1 | ME2, Either<E2, A | B>>((e) =>
        either.isLeft(e) ? onError(e.left) : M.of(e)
      )
    )
  }

/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tapLeft = <M extends TypeLambda>(M: Monad<M>) => {
  const catchAll_ = catchAll(M)
  return <E1, S, R2, O2, ME2, E2, _>(onError: (e: E1) => Kind<M, S, R2, O2, ME2, Either<E2, _>>) =>
    <R1, O1, ME1, A>(
      self: Kind<M, S, R1, O1, ME1, Either<E1, A>>
    ): Kind<M, S, R1 & R2, O1 | O2, ME1 | ME2, Either<E1 | E2, A>> => {
      return pipe(
        self,
        catchAll_<E1, S, R2, O2, ME2, E1 | E2, A>((e) =>
          pipe(
            onError(e),
            M.map((eb) => (either.isLeft(eb) ? eb : either.left(e)))
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
export function swap<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, FE, E, A>(self: Kind<F, S, R, O, FE, Either<E, A>>) => Kind<F, S, R, O, FE, Either<A, E>> {
  return F.map(either.swap)
}

/**
 * @since 3.0.0
 */
export function toUnion<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, FE, E, A>(self: Kind<F, S, R, O, FE, Either<E, A>>) => Kind<F, S, R, O, FE, E | A> {
  return F.map(either.toUnion)
}

/**
 * @since 3.0.0
 */
export const bracket =
  <M extends TypeLambda>(M: Monad<M>) =>
  <S, R1, O1, ME1, E1, A, R2, O2, ME2, E2, B, R3, W3, ME3, E3>(
    acquire: Kind<M, S, R1, O1, ME1, Either<E1, A>>,
    use: (a: A) => Kind<M, S, R2, O2, ME2, Either<E2, B>>,
    release: (a: A, e: Either<E2, B>) => Kind<M, S, R3, W3, ME3, Either<E3, void>>
  ): Kind<M, S, R1 & R2 & R3, O1 | O2 | W3, ME1 | ME2 | ME3, Either<E1 | E2 | E3, B>> => {
    const leftM = left(M)
    return pipe(
      acquire,
      M.flatMap(
        either.match<E1, Kind<M, S, R1 & R2 & R3, O1 | O2 | W3, ME1 | ME2 | ME3, Either<E1 | E2 | E3, B>>, A>(
          leftM,
          (a) =>
            pipe(
              use(a),
              M.flatMap((e) =>
                pipe(
                  release(a, e),
                  M.flatMap(
                    either.match<E3, Kind<M, S, unknown, never, never, Either<E2 | E3, B>>, void>(leftM, () => M.of(e))
                  )
                )
              )
            )
        )
      )
    )
  }
