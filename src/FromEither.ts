/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 2.10.0
 */

import { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4, tap } from './Chain'
import { Either } from './Either'
import { flow, LazyArg } from './function'
import { HKT2, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import * as _ from './internal'
import { Option } from './Option'
import { Predicate } from './Predicate'
import { Refinement } from './Refinement'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.10.0
 */
export interface FromEither<F> {
  readonly URI: F
  readonly fromEither: <E, A>(e: Either<E, A>) => HKT2<F, E, A>
}

/**
 * @category model
 * @since 2.11.0
 */
export interface FromEither1<F extends URIS> {
  readonly URI: F
  readonly fromEither: <A>(fa: Either<unknown, A>) => Kind<F, A>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface FromEither2<F extends URIS2> {
  readonly URI: F
  readonly fromEither: <E, A>(fa: Either<E, A>) => Kind2<F, E, A>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface FromEither2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly fromEither: <A>(fa: Either<E, A>) => Kind2<F, E, A>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface FromEither3<F extends URIS3> {
  readonly URI: F
  readonly fromEither: <E, A, R>(fa: Either<E, A>) => Kind3<F, R, E, A>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface FromEither3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly fromEither: <A, R>(fa: Either<E, A>) => Kind3<F, R, E, A>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface FromEither4<F extends URIS4> {
  readonly URI: F
  readonly fromEither: <E, A, S, R>(fa: Either<E, A>) => Kind4<F, S, R, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.10.0
 */
export function fromOption<F extends URIS4>(
  F: FromEither4<F>
): <E>(onNone: LazyArg<E>) => <A, S, R>(fa: Option<A>) => Kind4<F, S, R, E, A>
export function fromOption<F extends URIS3>(
  F: FromEither3<F>
): <E>(onNone: LazyArg<E>) => <A, R>(fa: Option<A>) => Kind3<F, R, E, A>
export function fromOption<F extends URIS3, E>(
  F: FromEither3C<F, E>
): (onNone: LazyArg<E>) => <A, R>(fa: Option<A>) => Kind3<F, R, E, A>
export function fromOption<F extends URIS2>(
  F: FromEither2<F>
): <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => Kind2<F, E, A>
export function fromOption<F extends URIS2, E>(
  F: FromEither2C<F, E>
): (onNone: LazyArg<E>) => <A>(fa: Option<A>) => Kind2<F, E, A>
export function fromOption<F>(F: FromEither<F>): <E>(onNone: LazyArg<E>) => <A>(ma: Option<A>) => HKT2<F, E, A>
export function fromOption<F>(F: FromEither<F>): <E>(onNone: LazyArg<E>) => <A>(ma: Option<A>) => HKT2<F, E, A> {
  return (onNone) => (ma) => F.fromEither(_.isNone(ma) ? _.left(onNone()) : _.right(ma.value))
}

/**
 * @category lifting
 * @since 2.10.0
 */
export function fromPredicate<F extends URIS4>(
  F: FromEither4<F>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(a: A) => Kind4<F, S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R, B extends A>(b: B) => Kind4<F, S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => Kind4<F, S, R, E, A>
}
export function fromPredicate<F extends URIS3>(
  F: FromEither3<F>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(b: B) => Kind3<F, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, A>
}
export function fromPredicate<F extends URIS3, E>(
  F: FromEither3C<F, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(b: B) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, A>
}
export function fromPredicate<F extends URIS2>(
  F: FromEither2<F>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => Kind2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, A>
}
export function fromPredicate<F extends URIS2, E>(
  F: FromEither2C<F, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, A>
}
export function fromPredicate<F>(F: FromEither<F>): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => HKT2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, A>
}
export function fromPredicate<F>(F: FromEither<F>): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => HKT2<F, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, A>
} {
  return <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E) =>
    (a: A) =>
      F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)))
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export function fromOptionK<F extends URIS4>(
  F: FromEither4<F>
): <E>(
  onNone: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <S, R>(...a: A) => Kind4<F, S, R, E, B>
export function fromOptionK<F extends URIS3>(
  F: FromEither3<F>
): <E>(
  onNone: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromOptionK<F extends URIS3, E>(
  F: FromEither3C<F, E>
): (
  onNone: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromOptionK<F extends URIS2>(
  F: FromEither2<F>
): <E>(
  onNone: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind2<F, E, B>
export function fromOptionK<F extends URIS2, E>(
  F: FromEither2C<F, E>
): (
  onNone: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind2<F, E, B>
export function fromOptionK<F>(
  F: FromEither<F>
): <E>(
  onNone: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => HKT2<F, E, B>
export function fromOptionK<F>(
  F: FromEither<F>
): <E>(
  onNone: LazyArg<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => HKT2<F, E, B> {
  const fromOptionF = fromOption(F)
  return (onNone) => {
    const from = fromOptionF(onNone)
    return (f) => flow(f, from)
  }
}

/**
 * @since 2.10.0
 */
export function chainOptionK<F extends URIS4>(
  F: FromEither4<F>,
  M: Chain4<F>
): <E>(onNone: LazyArg<E>) => <A, B>(f: (a: A) => Option<B>) => <S, R>(ma: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
export function chainOptionK<F extends URIS3>(
  F: FromEither3<F>,
  M: Chain3<F>
): <E>(onNone: LazyArg<E>) => <A, B>(f: (a: A) => Option<B>) => <R>(ma: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export function chainOptionK<F extends URIS3, E>(
  F: FromEither3C<F, E>,
  M: Chain3C<F, E>
): (onNone: LazyArg<E>) => <A, B>(f: (a: A) => Option<B>) => <R>(ma: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export function chainOptionK<F extends URIS2>(
  F: FromEither2<F>,
  M: Chain2<F>
): <E>(onNone: LazyArg<E>) => <A, B>(f: (a: A) => Option<B>) => (ma: Kind2<F, E, A>) => Kind2<F, E, B>
export function chainOptionK<F extends URIS2, E>(
  F: FromEither2C<F, E>,
  M: Chain2C<F, E>
): (onNone: LazyArg<E>) => <A, B>(f: (a: A) => Option<B>) => (ma: Kind2<F, E, A>) => Kind2<F, E, B>
export function chainOptionK<F>(
  F: FromEither<F>,
  M: Chain<F>
): <E>(onNone: LazyArg<E>) => <A, B>(f: (a: A) => Option<B>) => (ma: HKT2<F, E, A>) => HKT2<F, E, B>
export function chainOptionK<F extends URIS2>(
  F: FromEither2<F>,
  M: Chain2<F>
): <E>(onNone: LazyArg<E>) => <A, B>(f: (a: A) => Option<B>) => (ma: Kind2<F, E, A>) => Kind2<F, E, B> {
  const fromOptionKF = fromOptionK(F)
  return (onNone) => {
    const from = fromOptionKF(onNone)
    return (f) => (ma) => M.chain(ma, from(f))
  }
}

/**
 * @since 2.10.0
 */
export function fromEitherK<F extends URIS4>(
  F: FromEither4<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) => <S, R>(...a: A) => Kind4<F, S, R, E, B>
export function fromEitherK<F extends URIS3>(
  F: FromEither3<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromEitherK<F extends URIS3, E>(
  F: FromEither3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Either<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromEitherK<F extends URIS2>(
  F: FromEither2<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) => (...a: A) => Kind2<F, E, B>
export function fromEitherK<F extends URIS2, E>(
  F: FromEither2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Either<E, B>) => (...a: A) => Kind2<F, E, B>
export function fromEitherK<F extends URIS>(
  F: FromEither1<F>
): <E, A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Either<E, B>) => (...a: A) => Kind<F, B>
export function fromEitherK<F>(
  F: FromEither<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) => (...a: A) => HKT2<F, E, B>
export function fromEitherK<F>(
  F: FromEither<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Either<E, B>) => (...a: A) => HKT2<F, E, B> {
  return (f) => flow(f, F.fromEither)
}

/**
 * @since 2.10.0
 */
export function chainEitherK<M extends URIS4>(
  F: FromEither4<M>,
  M: Chain4<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => <S, R>(ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
export function chainEitherK<M extends URIS3>(
  F: FromEither3<M>,
  M: Chain3<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainEitherK<M extends URIS3, E>(
  F: FromEither3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => Either<E, B>) => <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainEitherK<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B>
export function chainEitherK<M extends URIS2, E>(
  F: FromEither2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B>
export function chainEitherK<M extends URIS>(
  F: FromEither1<M>,
  M: Chain1<M>
): <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Kind<M, A>) => Kind<M, B>
export function chainEitherK<M>(
  F: FromEither<M>,
  M: Chain<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: HKT2<M, E, A>) => HKT2<M, E, B>
export function chainEitherK<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, B> {
  const fromEitherKF = fromEitherK(F)
  return (f) => (ma) => M.chain(ma, fromEitherKF(f))
}

/**
 * @since 2.12.0
 */
export function chainFirstEitherK<M extends URIS4>(
  F: FromEither4<M>,
  M: Chain4<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => <S, R>(ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export function chainFirstEitherK<M extends URIS3>(
  F: FromEither3<M>,
  M: Chain3<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstEitherK<M extends URIS3, E>(
  F: FromEither3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => Either<E, B>) => <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstEitherK<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirstEitherK<M extends URIS2, E>(
  F: FromEither2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, A>
export function chainFirstEitherK<M extends URIS>(
  F: FromEither1<M>,
  M: Chain1<M>
): <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Kind<M, A>) => Kind<M, A>
export function chainFirstEitherK<M>(
  F: FromEither<M>,
  M: Chain<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: HKT2<M, E, A>) => HKT2<M, E, A>
export function chainFirstEitherK<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): <A, E, B>(f: (a: A) => Either<E, B>) => (ma: Kind2<M, E, A>) => Kind2<M, E, A> {
  const tapEitherM = tapEither(F, M)
  return (f) => (ma) => tapEitherM(ma, f)
}

/**
 * @since 2.10.0
 */
export function filterOrElse<M extends URIS4>(
  F: FromEither4<M>,
  M: Chain4<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: Kind4<M, S, R, E, A>
  ) => Kind4<M, S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R, B extends A>(
    mb: Kind4<M, S, R, E, B>
  ) => Kind4<M, S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
}
export function filterOrElse<M extends URIS3>(
  F: FromEither3<M>,
  M: Chain3<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: Kind3<M, R, E, A>
  ) => Kind3<M, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(mb: Kind3<M, R, E, B>) => Kind3<M, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
}
export function filterOrElse<M extends URIS3, E>(
  F: FromEither3C<M, E>,
  M: Chain3C<M, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(mb: Kind3<M, R, E, B>) => Kind3<M, R, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
}
export function filterOrElse<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (self: Kind2<M, E, A>) => Kind2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(self: Kind2<M, E, B>) => Kind2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (self: Kind2<M, E, A>) => Kind2<M, E, A>
}
export function filterOrElse<M extends URIS2, E>(
  F: FromEither2C<M, E>,
  M: Chain2C<M, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: Kind2<M, E, B>) => Kind2<M, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, A>
}
export function filterOrElse<M extends URIS2>(
  F: FromEither<M>,
  M: Chain<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: HKT2<M, E, A>) => HKT2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: HKT2<M, E, B>) => HKT2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: HKT2<M, E, A>) => HKT2<M, E, A>
}
export function filterOrElse<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: Kind2<M, E, B>) => Kind2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, A>
} {
  return <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E) =>
    (ma: Kind2<M, E, A>): Kind2<M, E, A> =>
      M.chain(ma, (a) => F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a))))
}

/** @internal */
export function tapEither<M extends URIS4>(
  F: FromEither4<M>,
  M: Chain4<M>
): <A, E, B, S, R>(self: Kind4<M, S, R, E, A>, f: (a: A) => Either<E, B>) => Kind4<M, S, R, E, A>
export function tapEither<M extends URIS3>(
  F: FromEither3<M>,
  M: Chain3<M>
): <A, E, B, R>(self: Kind3<M, R, E, A>, f: (a: A) => Either<E, B>) => Kind3<M, R, E, A>
export function tapEither<M extends URIS3, E>(
  F: FromEither3C<M, E>,
  M: Chain3C<M, E>
): <A, B, R>(self: Kind3<M, R, E, A>, f: (a: A) => Either<E, B>) => Kind3<M, R, E, A>
export function tapEither<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): <A, E, B>(self: Kind2<M, E, A>, f: (a: A) => Either<E, B>) => Kind2<M, E, A>
export function tapEither<M extends URIS2, E>(
  F: FromEither2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(self: Kind2<M, E, A>, f: (a: A) => Either<E, B>) => Kind2<M, E, A>
export function tapEither<M extends URIS>(
  F: FromEither1<M>,
  M: Chain1<M>
): <E, A, B>(self: Kind<M, A>, f: (a: A) => Either<E, B>) => Kind<M, A>
export function tapEither<M>(
  F: FromEither<M>,
  M: Chain<M>
): <A, E, B>(self: HKT2<M, E, A>, f: (a: A) => Either<E, B>) => HKT2<M, E, A>
export function tapEither<M extends URIS2>(
  F: FromEither2<M>,
  M: Chain2<M>
): <A, E, B>(self: Kind2<M, E, A>, f: (a: A) => Either<E, B>) => Kind2<M, E, A> {
  const fromEither = fromEitherK(F)
  const tapM = tap(M)
  return (self, f) => tapM(self, fromEither(f))
}
