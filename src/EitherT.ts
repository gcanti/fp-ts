/**
 * @since 3.0.0
 */
import { ap as ap_, Apply } from './Apply'
import type { Chain } from './Chain'
import * as E from './Either'
import { flow, Lazy, pipe } from './function'
import { Functor, map as map_ } from './Functor'
import type { HKT, Kind } from './HKT'
import type { Monad } from './Monad'
import type { Pointed } from './Pointed'
import type { Semigroup } from './Semigroup'

import Either = E.Either

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const right = <F extends HKT>(F: Pointed<F>) => <A, S, R = unknown, W = never, FE = never, E = never>(
  a: A
): Kind<F, S, R, W, FE, Either<E, A>> => F.of(E.right(a))

/**
 * @since 3.0.0
 */
export const left = <F extends HKT>(F: Pointed<F>) => <E, S, R = unknown, W = never, FE = never, A = never>(
  e: E
): Kind<F, S, R, W, FE, Either<E, A>> => F.of(E.left(e))

/**
 * @since 3.0.0
 */
export function rightF<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, A, E = never>(fa: Kind<F, S, R, W, FE, A>) => Kind<F, S, R, W, FE, Either<E, A>> {
  return F.map(E.right)
}

/**
 * @since 3.0.0
 */
export function leftF<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A = never>(fe: Kind<F, S, R, W, FE, E>) => Kind<F, S, R, W, FE, Either<E, A>> {
  return F.map(E.left)
}

/**
 * @since 3.0.0
 */
export const fromNullable = <F extends HKT>(F: Pointed<F>) => <E>(e: E) => <A, S, R, W, FE>(
  a: A
): Kind<F, S, R, W, FE, Either<E, NonNullable<A>>> =>
  F.of(
    pipe(
      a,
      E.fromNullable(() => e)
    )
  )

/**
 * @since 3.0.0
 */
export const fromNullableK = <F extends HKT>(
  F: Pointed<F>
): (<E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S, R, W, FE>(...a: A) => Kind<F, S, R, W, FE, Either<E, NonNullable<B>>>) => {
  const fromNullableF = fromNullable(F)
  return (e) => {
    const fromNullableFE = fromNullableF(e)
    return (f) => (...a) => fromNullableFE(f(...a))
  }
}

/**
 * @since 3.0.0
 */
export const chainNullableK = <M extends HKT>(
  M: Monad<M>
): (<E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, W, FE>(ma: Kind<M, S, R, W, FE, Either<E, A>>) => Kind<M, S, R, W, FE, Either<E, NonNullable<B>>>) => {
  const chainM = chain(M)
  const fromNullableKM = fromNullableK(M)
  return <E>(e: E) => {
    const fromNullableKMe = fromNullableKM(e)
    return <A, B>(f: (a: A) => B | null | undefined) => <S, R, W, FE>(ma: Kind<M, S, R, W, FE, Either<E, A>>) =>
      pipe(ma, chainM<A, S, R, W, FE, E, NonNullable<B>>(fromNullableKMe(f)))
  }
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
  map_(F, E.Functor)

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
  return ap_(F, E.Apply)
}

/**
 * @since 3.0.0
 */
export const chain = <M extends HKT>(M: Monad<M>) => <A, S, R2, W2, ME2, E2, B>(
  f: (a: A) => Kind<M, S, R2, W2, ME2, Either<E2, B>>
) => <R1, W1, ME1, E1>(
  ma: Kind<M, S, R1, W1, ME1, Either<E1, A>>
): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E1 | E2, B>> => {
  return pipe(
    ma,
    M.chain((e): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E1 | E2, B>> => (E.isLeft(e) ? M.of(e) : f(e.right)))
  )
}

/**
 * @since 3.0.0
 */
export const alt = <M extends HKT>(M: Monad<M>) => <S, R2, W2, ME2, E2, B>(
  second: Lazy<Kind<M, S, R2, W2, ME2, Either<E2, B>>>
) => <R1, W1, ME1, E1, A>(
  first: Kind<M, S, R1, W1, ME1, Either<E1, A>>
): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E2, A | B>> => {
  return pipe(
    first,
    M.chain<E.Either<E1, A>, S, R1 & R2, W1 | W2, ME1 | ME2, E.Either<E2, B | A>>((e) =>
      E.isLeft(e) ? second() : M.of(e)
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
  return flow(E.bimap, F.map)
}

/**
 * @since 3.0.0
 */
export function mapLeft<F extends HKT>(
  F: Functor<F>
): <E, G>(
  f: (e: E) => G
) => <S, R, W, FE, A>(fea: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, Either<G, A>> {
  return (f) => F.map(E.mapLeft(f))
}

/**
 * @since 3.0.0
 */
export const altValidation = <M extends HKT, E>(M: Monad<M>, S: Semigroup<E>) => <S, R2, W2, ME2, B>(
  second: Lazy<Kind<M, S, R2, W2, ME2, Either<E, B>>>
) => <R1, W1, ME1, A>(
  first: Kind<M, S, R1, W1, ME1, Either<E, A>>
): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E, A | B>> => {
  const rightM = right(M)
  return pipe(
    first,
    M.chain(
      E.match<E, Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, E.Either<E, A | B>>, A | B>(
        (e1) => pipe(second(), M.map(E.mapLeft((e2) => S.concat(e2)(e1)))),
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
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => <S, R, W, ME>(ma: Kind<F, S, R, W, ME, Either<E, A>>) => Kind<F, S, R, W, ME, B> {
  return flow(E.match, F.map)
}

/**
 * @since 3.0.0
 */
export function matchE<M extends HKT>(
  M: Chain<M>
): <E, S, R, W, ME, B, A>(
  onLeft: (e: E) => Kind<M, S, R, W, ME, B>,
  onRight: (a: A) => Kind<M, S, R, W, ME, B>
) => (ma: Kind<M, S, R, W, ME, Either<E, A>>) => Kind<M, S, R, W, ME, B> {
  return flow(E.match, M.chain)
}

/**
 * @since 3.0.0
 */
export const getOrElse = <F extends HKT>(F: Functor<F>) => <E, B>(
  onLeft: (e: E) => B
): (<S, R, W, ME, A>(ma: Kind<F, S, R, W, ME, Either<E, A>>) => Kind<F, S, R, W, ME, A | B>) => {
  return F.map(E.getOrElse(onLeft))
}

/**
 * @since 3.0.0
 */
export const getOrElseE = <M extends HKT>(M: Monad<M>) => <E, S, R2, W2, ME2, B>(
  onLeft: (e: E) => Kind<M, S, R2, W2, ME2, B>
) => <R1, W1, ME1, A>(ma: Kind<M, S, R1, W1, ME1, Either<E, A>>): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, A | B> => {
  return pipe(ma, M.chain(E.match<E, Kind<M, S, R2, W2, ME2, A | B>, A>(onLeft, M.of)))
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const orElse = <M extends HKT>(M: Monad<M>) => <E1, S, R2, W2, ME2, E2, B>(
  onLeft: (e: E1) => Kind<M, S, R2, W2, ME2, Either<E2, B>>
) => <R1, W1, ME1, A>(
  ma: Kind<M, S, R1, W1, ME1, Either<E1, A>>
): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E2, A | B>> => {
  return pipe(
    ma,
    M.chain<E.Either<E1, A>, S, R1 & R2, W1 | W2, ME1 | ME2, E.Either<E2, A | B>>((e) =>
      E.isLeft(e) ? onLeft(e.left) : M.of(e)
    )
  )
}

/**
 * @since 3.0.0
 */
export function orLeft<M extends HKT>(
  M: Monad<M>
): <E1, S, R, W, ME, E2>(
  onLeft: (e: E1) => Kind<M, S, R, W, ME, E2>
) => <A>(fa: Kind<M, S, R, W, ME, Either<E1, A>>) => Kind<M, S, R, W, ME, Either<E2, A>> {
  return (onLeft) =>
    M.chain(
      E.match(
        (e) => pipe(onLeft(e), M.map(E.left)),
        (a) => M.of(E.right(a))
      )
    )
}

/**
 * @since 3.0.0
 */
export const orElseFirst = <M extends HKT>(M: Monad<M>) => {
  const orElseM = orElse(M)
  return <E1, S, R2, W2, ME2, E2, B>(onLeft: (e: E1) => Kind<M, S, R2, W2, ME2, Either<E2, B>>) => <R1, W1, ME1, A>(
    ma: Kind<M, S, R1, W1, ME1, Either<E1, A>>
  ): Kind<M, S, R1 & R2, W1 | W2, ME1 | ME2, Either<E1 | E2, A>> => {
    return pipe(
      ma,
      orElseM<E1, S, R2, W2, ME2, E1 | E2, A>((e) =>
        pipe(
          onLeft(e),
          M.map((eb) => (E.isLeft(eb) ? eb : E.left(e)))
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
  return F.map(E.swap)
}

/**
 * @since 3.0.0
 */
export function toUnion<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A>(fa: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, E | A> {
  return F.map(E.toUnion)
}

/**
 * @since 3.0.0
 */
export const bracket = <M extends HKT>(M: Monad<M>) => <S, R, W, ME, E, A, B>(
  acquire: Kind<M, S, R, W, ME, Either<E, A>>,
  use: (a: A) => Kind<M, S, R, W, ME, Either<E, B>>,
  release: (a: A, e: Either<E, B>) => Kind<M, S, R, W, ME, Either<E, void>>
): Kind<M, S, R, W, ME, Either<E, B>> => {
  const leftM = left(M)
  return pipe(
    acquire,
    M.chain(
      E.match<E, Kind<M, S, R, W, ME, E.Either<E, B>>, A>(leftM, (a) =>
        pipe(
          use(a),
          M.chain((e) => pipe(release(a, e), M.chain(E.match(leftM, () => M.of(e)))))
        )
      )
    )
  )
}
