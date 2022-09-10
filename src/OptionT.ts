/**
 * @since 3.0.0
 */
import { ap as ap_, Apply } from './Apply'
import type { Chain } from './Chain'
import type { Either } from './Either'
import { constant, flow, Lazy } from './function'
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
export function some<F extends HKT>(F: Pointed<F>): <A, S, R, E>(a: A) => Kind<F, S, R, E, Option<A>> {
  return flow(_.some, F.of) as any // TODO
}

/**
 * @since 3.0.0
 */
export function zero<F extends HKT>(F: Pointed<F>): <S, R, E, A>() => Kind<F, S, R, E, Option<A>> {
  return constant(F.of(_.none))
}

/**
 * @since 3.0.0
 */
export function fromF<F extends HKT>(
  F: Functor<F>
): <S, R, E, A>(ma: Kind<F, S, R, E, A>) => Kind<F, S, R, E, Option<A>> {
  return F.map(_.some)
}

/**
 * @since 3.0.0
 */
export function fromNullable<F extends HKT>(
  F: Pointed<F>
): <A, S, R, E>(a: A) => Kind<F, S, R, E, Option<NonNullable<A>>> {
  return flow(O.fromNullable, F.of) as any // TODO
}

/**
 * @since 3.0.0
 */
export function fromNullableK<F extends HKT>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S, R, E>(...a: A) => Kind<F, S, R, E, Option<NonNullable<B>>> {
  const fromNullableF = fromNullable(F)
  return (f) => flow(f, fromNullableF) as any // TODO
}

/**
 * @since 3.0.0
 */
export function fromOptionK<F extends HKT>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => <S, R, E>(...a: A) => Kind<F, S, R, E, Option<B>> {
  return (f) => flow(f, F.of) as any // TODO
}

/**
 * @since 3.0.0
 */
export function fromPredicate<F extends HKT>(
  F: Pointed<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(a: A) => Kind<F, S, R, E, Option<B>>
  <A>(predicate: Predicate<A>): <B extends A, S, R, E>(b: B) => Kind<F, S, R, E, Option<B>>
  <A>(predicate: Predicate<A>): <S, R, E>(a: A) => Kind<F, S, R, E, Option<A>>
} {
  return <A>(predicate: Predicate<A>) => (a: A) => F.of(O.fromPredicate(predicate)(a)) as any // TODO
}

/**
 * @since 3.0.0
 */
export function fromEither<F extends HKT>(
  F: Pointed<F>
): <A, S, R, E>(e: Either<unknown, A>) => Kind<F, S, R, E, Option<A>> {
  return flow(O.fromEither, F.of) as any // TODO
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<F extends HKT>(
  F: Functor<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => <S, R, E>(ma: Kind<F, S, R, E, Option<A>>) => Kind<F, S, R, E, B> {
  return flow(O.match, F.map)
}

/**
 * @since 3.0.0
 */
export function matchE<M extends HKT>(
  M: Chain<M>
): <S, R, E, B, A>(
  onNone: () => Kind<M, S, R, E, B>,
  onSome: (a: A) => Kind<M, S, R, E, B>
) => (ma: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, B> {
  return flow(O.match, M.chain)
}

/**
 * @since 3.0.0
 */
export function getOrElse<F extends HKT>(
  F: Functor<F>
): <A>(onNone: Lazy<A>) => <S, R, E>(fa: Kind<F, S, R, E, Option<A>>) => Kind<F, S, R, E, A> {
  return flow(O.getOrElse, F.map)
}

/**
 * @since 3.0.0
 */
export function getOrElseE<M extends HKT>(
  M: Monad<M>
): <S, R, E, A>(onNone: Lazy<Kind<M, S, R, E, A>>) => (fa: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, A> {
  return (onNone) => M.chain(O.match(onNone, M.of))
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function chainNullableK<M extends HKT>(
  M: Monad<M>
): <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, E>(ma: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, Option<NonNullable<B>>> {
  return flow(fromNullableK(M) as any, chain(M)) as any // TODO
}

/**
 * @since 3.0.0
 */
export function chainOptionK<M extends HKT>(
  M: Monad<M>
): <A, B>(f: (a: A) => Option<B>) => <S, R, E>(ma: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, Option<B>> {
  return flow(fromOptionK(M) as any, chain(M)) as any // TODO
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function map<F extends HKT>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind<F, S, R, E, Option<A>>) => Kind<F, S, R, E, Option<B>> {
  return map_(F, O.Functor)
}

/**
 * @since 3.0.0
 */
export function ap<F extends HKT>(
  F: Apply<F>
): <S, R, E, A>(
  fa: Kind<F, S, R, E, Option<A>>
) => <B>(fab: Kind<F, S, R, E, Option<(a: A) => B>>) => Kind<F, S, R, E, Option<B>> {
  return ap_(F, O.Apply)
}

/**
 * @since 3.0.0
 */
export function chain<M extends HKT>(
  M: Monad<M>
): <A, S, R, E, B>(
  f: (a: A) => Kind<M, S, R, E, Option<B>>
) => (ma: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, Option<B>> {
  const zeroM = zero(M)
  return (f) => M.chain(O.match(() => zeroM(), f))
}

/**
 * @since 3.0.0
 */
export function alt<M extends HKT>(
  M: Monad<M>
): <S, R, E, A>(
  second: Lazy<Kind<M, S, R, E, Option<A>>>
) => (first: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, Option<A>> {
  const _some = some(M)
  return (second) => M.chain(O.match(second, _some))
}
