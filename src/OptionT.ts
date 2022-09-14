/**
 * @since 3.0.0
 */
import { ap as ap_, Apply } from './Apply'
import type { Chain } from './Chain'
import type { Either } from './Either'
import { constant, flow, Lazy, pipe } from './function'
import { Functor, map as map_ } from './Functor'
import type { Kind, HKT } from './HKT'
import * as _ from './internal'
import type { Monad } from './Monad'
import * as O from './Option'
import type { Pointed } from './Pointed'
import type { Predicate } from './Predicate'
import type { Refinement } from './Refinement'

import Option = O.Option

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const some = <F extends HKT>(F: Pointed<F>) => <A, S, R, W, E>(a: A): Kind<F, S, R, W, E, Option<A>> =>
  F.of(_.some(a))

/**
 * @since 3.0.0
 */
export function zero<F extends HKT>(F: Pointed<F>): <S, R, W, E, A>() => Kind<F, S, R, W, E, Option<A>> {
  return constant(F.of(_.none))
}

/**
 * @since 3.0.0
 */
export function fromF<F extends HKT>(
  F: Functor<F>
): <S, R, W, E, A>(ma: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, Option<A>> {
  return F.map(_.some)
}

/**
 * @since 3.0.0
 */
export const fromNullable = <F extends HKT>(F: Pointed<F>) => <A, S, R, W, E>(
  a: A
): Kind<F, S, R, W, E, Option<NonNullable<A>>> => F.of(O.fromNullable(a))

/**
 * @since 3.0.0
 */
export function fromNullableK<F extends HKT>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S, R, W, E>(...a: A) => Kind<F, S, R, W, E, Option<NonNullable<B>>> {
  const fromNullableF = fromNullable(F)
  return (f) => (...a) => fromNullableF(f(...a))
}

/**
 * @since 3.0.0
 */
export const fromOptionK = <F extends HKT>(F: Pointed<F>) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => <S, R, W, E>(...a: A): Kind<F, S, R, W, E, Option<B>> => F.of(f(...a))

/**
 * @since 3.0.0
 */
export function fromPredicate<F extends HKT>(
  F: Pointed<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, W, E>(a: A) => Kind<F, S, R, W, E, Option<B>>
  <A>(predicate: Predicate<A>): <B extends A, S, R, W, E>(b: B) => Kind<F, S, R, W, E, Option<B>>
  <A>(predicate: Predicate<A>): <S, R, W, E>(a: A) => Kind<F, S, R, W, E, Option<A>>
} {
  return <A>(predicate: Predicate<A>) => {
    const fromPredicate = O.fromPredicate(predicate)
    return <S, R, W, E>(a: A): Kind<F, S, R, W, E, Option<A>> => F.of(fromPredicate(a))
  }
}

/**
 * @since 3.0.0
 */
export const fromEither = <F extends HKT>(F: Pointed<F>) => <A, S, R, W, E>(
  e: Either<unknown, A>
): Kind<F, S, R, W, E, Option<A>> => F.of(O.fromEither(e))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<F extends HKT>(
  F: Functor<F>
): <B, A, C = B>(
  onNone: () => B,
  onSome: (a: A) => C
) => <S, R, W, E>(ma: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, B | C> {
  return flow(O.match, F.map)
}

/**
 * @since 3.0.0
 */
export function matchE<M extends HKT>(
  M: Chain<M>
): <S, R, W, E, B, A>(
  onNone: () => Kind<M, S, R, W, E, B>,
  onSome: (a: A) => Kind<M, S, R, W, E, B>
) => (ma: Kind<M, S, R, W, E, Option<A>>) => Kind<M, S, R, W, E, B> {
  return flow(O.match, M.chain)
}

/**
 * @since 3.0.0
 */
export const getOrElse = <F extends HKT>(F: Functor<F>) => <B>(
  onNone: Lazy<B>
): (<S, R, W, E, A>(fa: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, A | B>) => {
  return F.map(O.getOrElse(onNone))
}

/**
 * @since 3.0.0
 */
export const getOrElseE = <M extends HKT>(M: Monad<M>) => <S, R2, W2, E2, B>(
  onNone: Lazy<Kind<M, S, R2, W2, E2, B>>
) => <R1, W1, E1, A>(ma: Kind<M, S, R1, W1, E1, Option<A>>): Kind<M, S, R1 & R2, W1 | W2, E1 | E2, A | B> => {
  return pipe(ma, M.chain(O.match<Kind<M, S, R2, W2, E2, A | B>, A>(onNone, M.of)))
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const chainNullableK = <M extends HKT>(
  M: Monad<M>
): (<A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, W, E>(ma: Kind<M, S, R, W, E, Option<A>>) => Kind<M, S, R, W, E, Option<NonNullable<B>>>) => {
  const chainM = chain(M)
  const fromNullableKM = fromNullableK(M)
  return (f) => {
    const fromNullableKMf = fromNullableKM(f)
    return chainM((a) => fromNullableKMf(a))
  }
}

/**
 * @since 3.0.0
 */
export const chainOptionK = <M extends HKT>(
  M: Monad<M>
): (<A, B>(
  f: (a: A) => Option<B>
) => <S, R, W, E>(ma: Kind<M, S, R, W, E, Option<A>>) => Kind<M, S, R, W, E, Option<B>>) => {
  const chainM = chain(M)
  const fromOptionKM = fromOptionK(M)
  return (f) => {
    const fromOptionKf = fromOptionKM(f)
    return chainM((a) => fromOptionKf(a))
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
): <A, B>(f: (a: A) => B) => <S, R, W, E>(fa: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, Option<B>> {
  return map_(F, O.Functor)
}

/**
 * @since 3.0.0
 */
export const ap = <F extends HKT>(
  F: Apply<F>
): (<S, R2, W2, E2, A>(
  fa: Kind<F, S, R2, W2, E2, Option<A>>
) => <R1, W1, E1, B>(
  fab: Kind<F, S, R1, W1, E1, Option<(a: A) => B>>
) => Kind<F, S, R1 & R2, W1 | W2, E1 | E2, Option<B>>) => {
  return ap_(F, O.Apply)
}

/**
 * @since 3.0.0
 */
export const chain = <M extends HKT>(M: Monad<M>) => <A, S, R, W, E, B>(
  f: (a: A) => Kind<M, S, R, W, E, Option<B>>
) => (ma: Kind<M, S, R, W, E, Option<A>>): Kind<M, S, R, W, E, Option<B>> => {
  return pipe(ma, M.chain<O.Option<A>, S, R, W, E, O.Option<B>>(O.match(() => zero(M)(), f)))
}

/**
 * @since 3.0.0
 */
export const alt = <M extends HKT>(M: Monad<M>) => <S, R2, W2, E2, B>(
  second: Lazy<Kind<M, S, R2, W2, E2, Option<B>>>
) => <R1, W1, E1, A>(
  first: Kind<M, S, R1, W1, E1, Option<A>>
): Kind<M, S, R1 & R2, W1 | W2, E1 | E2, Option<A | B>> => {
  return pipe(first, M.chain(O.match<Kind<M, S, R2, W2, E2, O.Option<A | B>>, A | B>(second, some(M))))
}
