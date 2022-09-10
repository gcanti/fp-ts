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
export function right<F extends HKT>(F: Pointed<F>): <A, S, R, FE, E = never>(a: A) => Kind<F, S, R, FE, Either<E, A>> {
  // TODO
  return flow(E.right, F.of) as any
}

/**
 * @since 3.0.0
 */
export function left<F extends HKT>(F: Pointed<F>): <E, S, R, FE, A = never>(e: E) => Kind<F, S, R, FE, Either<E, A>> {
  // TODO
  return flow(E.left, F.of) as any
}

/**
 * @since 3.0.0
 */
export function rightF<F extends HKT>(
  F: Functor<F>
): <R, S, FE, A, E = never>(fa: Kind<F, S, R, FE, A>) => Kind<F, S, R, FE, Either<E, A>> {
  return F.map(E.right)
}

/**
 * @since 3.0.0
 */
export function leftF<F extends HKT>(
  F: Functor<F>
): <R, S, FE, E, A = never>(fe: Kind<F, S, R, FE, E>) => Kind<F, S, R, FE, Either<E, A>> {
  return F.map(E.left)
}

/**
 * @since 3.0.0
 */
export function fromNullable<F extends HKT>(
  F: Pointed<F>
): <E>(e: E) => <A, S, R, FE>(a: A) => Kind<F, S, R, FE, Either<E, NonNullable<A>>> {
  // TODO
  return (e) =>
    flow(
      E.fromNullable(() => e),
      F.of
    ) as any
}

/**
 * @since 3.0.0
 */
export function fromNullableK<F extends HKT>(
  F: Pointed<F>
): <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S, R, FE>(...a: A) => Kind<F, S, R, FE, Either<E, NonNullable<B>>> {
  const fromNullableF = fromNullable(F)
  return (e) => {
    const fromNullableFE = fromNullableF(e)
    // TODO
    return (f) => flow(f, fromNullableFE) as any
  }
}

/**
 * @since 3.0.0
 */
export function chainNullableK<M extends HKT>(
  M: Monad<M>
): <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, FE>(ma: Kind<M, S, R, FE, Either<E, A>>) => Kind<M, S, R, FE, Either<E, NonNullable<B>>> {
  const chainM = chain(M)
  const fromNullableKM = fromNullableK(M)
  return (e) => {
    const fromNullableKMe = fromNullableKM(e)
    // TODO
    return (f) => chainM(fromNullableKMe(f)) as any
  }
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function map<F extends HKT>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <S, R, FE, E>(fa: Kind<F, S, R, FE, Either<E, A>>) => Kind<F, S, R, FE, Either<E, B>> {
  // TODO
  return map_(F, E.Functor) as any
}

/**
 * @since 3.0.0
 */
export function ap<F extends HKT>(
  F: Apply<F>
): <S, R, FE, E, A>(
  fa: Kind<F, S, R, FE, Either<E, A>>
) => <B>(fab: Kind<F, S, R, FE, Either<E, (a: A) => B>>) => Kind<F, S, R, FE, Either<E, B>> {
  // TODO
  return ap_(F, E.Apply) as any
}

/**
 * @since 3.0.0
 */
export function chain<M extends HKT>(
  M: Monad<M>
): <A, S, R, ME, E, B>(
  f: (a: A) => Kind<M, S, R, ME, Either<E, B>>
) => (ma: Kind<M, S, R, ME, Either<E, A>>) => Kind<M, S, R, ME, Either<E, B>> {
  return (f) => M.chain((e) => (E.isLeft(e) ? M.of(e) : f(e.right)))
}

/**
 * @since 3.0.0
 */
export function alt<M extends HKT>(
  M: Monad<M>
): <S, R, ME, E, A>(
  second: Lazy<Kind<M, S, R, ME, Either<E, A>>>
) => (first: Kind<M, S, R, ME, Either<E, A>>) => Kind<M, S, R, ME, Either<E, A>> {
  return (second) => M.chain((e) => (E.isLeft(e) ? second() : M.of(e)))
}

/**
 * @since 3.0.0
 */
export function bimap<F extends HKT>(
  F: Functor<F>
): <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, FE>(fea: Kind<F, S, R, FE, Either<E, A>>) => Kind<F, S, R, FE, Either<G, B>> {
  return flow(E.bimap, F.map)
}

/**
 * @since 3.0.0
 */
export function mapLeft<F extends HKT>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <S, R, FE, A>(fea: Kind<F, S, R, FE, Either<E, A>>) => Kind<F, S, R, FE, Either<G, A>> {
  return (f) => F.map(E.mapLeft(f))
}

/**
 * @since 3.0.0
 */
export function altValidation<M extends HKT, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <S, R, ME, A>(
  second: Lazy<Kind<M, S, R, ME, Either<E, A>>>
) => (first: Kind<M, S, R, ME, Either<E, A>>) => Kind<M, S, R, ME, Either<E, A>> {
  const rightM = right(M)
  return (second) => (first) =>
    pipe(first, M.chain(E.match((e1) => pipe(second(), M.map(E.mapLeft((e2) => S.concat(e2)(e1)))), rightM)))
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
) => <S, R, ME>(ma: Kind<F, S, R, ME, Either<E, A>>) => Kind<F, S, R, ME, B> {
  return flow(E.match, F.map)
}

/**
 * @since 3.0.0
 */
export function matchE<M extends HKT>(
  M: Chain<M>
): <E, S, R, ME, B, A>(
  onLeft: (e: E) => Kind<M, S, R, ME, B>,
  onRight: (a: A) => Kind<M, S, R, ME, B>
) => (ma: Kind<M, S, R, ME, Either<E, A>>) => Kind<M, S, R, ME, B> {
  return flow(E.match, M.chain)
}

/**
 * @since 3.0.0
 */
export function getOrElse<F extends HKT>(
  F: Functor<F>
): <E, A>(onLeft: (e: E) => A) => <S, R, ME>(ma: Kind<F, S, R, ME, Either<E, A>>) => Kind<F, S, R, ME, A> {
  return flow(E.getOrElse, F.map)
}

/**
 * @since 3.0.0
 */
export function getOrElseE<M extends HKT>(
  M: Monad<M>
): <E, S, R, ME, A>(
  onLeft: (e: E) => Kind<M, S, R, ME, A>
) => (ma: Kind<M, S, R, ME, Either<E, A>>) => Kind<M, S, R, ME, A> {
  return (onLeft) => M.chain(E.match(onLeft, M.of))
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function orElse<M extends HKT>(
  M: Monad<M>
): <E1, S, R, ME, E2, A>(
  onLeft: (e: E1) => Kind<M, S, R, ME, Either<E2, A>>
) => (ma: Kind<M, S, R, ME, Either<E1, A>>) => Kind<M, S, R, ME, Either<E2, A>> {
  return (onLeft) => M.chain((e) => (E.isLeft(e) ? onLeft(e.left) : M.of(e)))
}

/**
 * @since 3.0.0
 */
export function orLeft<M extends HKT>(
  M: Monad<M>
): <E1, S, R, ME, E2>(
  onLeft: (e: E1) => Kind<M, S, R, ME, E2>
) => <A>(fa: Kind<M, S, R, ME, Either<E1, A>>) => Kind<M, S, R, ME, Either<E2, A>> {
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
export function orElseFirst<M extends HKT>(
  M: Monad<M>
): <E, S, R, ME, B>(
  onLeft: (e: E) => Kind<M, S, R, ME, Either<E, B>>
) => <A>(ma: Kind<M, S, R, ME, Either<E, A>>) => Kind<M, S, R, ME, Either<E, A>> {
  const orElseM = orElse(M)
  return (onLeft) =>
    orElseM((e) =>
      pipe(
        onLeft(e),
        M.map((eb) => (E.isLeft(eb) ? eb : E.left(e)))
      )
    )
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function swap<F extends HKT>(
  F: Functor<F>
): <S, R, FE, E, A>(ma: Kind<F, S, R, FE, Either<E, A>>) => Kind<F, S, R, FE, Either<A, E>> {
  return F.map(E.swap)
}

/**
 * @since 3.0.0
 */
export function toUnion<F extends HKT>(
  F: Functor<F>
): <S, R, FE, E, A>(fa: Kind<F, S, R, FE, Either<E, A>>) => Kind<F, S, R, FE, E | A> {
  return F.map(E.toUnion)
}

/**
 * @since 3.0.0
 */
export function bracket<M extends HKT>(
  M: Monad<M>
): <S, R, ME, E, A, B>(
  acquire: Kind<M, S, R, ME, Either<E, A>>,
  use: (a: A) => Kind<M, S, R, ME, Either<E, B>>,
  release: (a: A, e: Either<E, B>) => Kind<M, S, R, ME, Either<E, void>>
) => Kind<M, S, R, ME, Either<E, B>> {
  const leftM = left(M)
  // TODO
  return (acquire, use, release) =>
    pipe(
      acquire,
      M.chain(
        E.match(
          leftM,
          (a) =>
            pipe(
              use(a),
              M.chain((e) => pipe(release(a, e), M.chain(E.match(leftM, () => M.of(e)))))
            ) as any
        )
      )
    )
}
