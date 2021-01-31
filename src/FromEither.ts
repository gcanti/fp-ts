/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 3.0.0
 */

import * as E from './Either'
import { flow, Lazy, pipe, Predicate, Refinement } from './function'
import { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'
import { Monad, Monad2, Monad3, Monad4 } from './Monad'
import { Option } from './Option'

import Either = E.Either

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromEither<F> {
  readonly URI?: F
  readonly fromEither: <E, A>(e: Either<E, A>) => HKT2<F, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromEither2<F extends URIS2> {
  readonly URI?: F
  readonly fromEither: <E, A>(e: Either<E, A>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromEither2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromEither: <A>(e: Either<E, A>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromEither3<F extends URIS3> {
  readonly URI?: F
  readonly fromEither: <E, A, R>(e: Either<E, A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromEither3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromEither: <A, R>(e: Either<E, A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromEither4<F extends URIS4> {
  readonly URI?: F
  readonly fromEither: <E, A, S, R>(e: Either<E, A>) => Kind4<F, S, R, E, A>
}

/**
 * @since 3.0.0
 */
export function fromOption<F extends URIS4>(
  F: FromEither4<F>
): <E>(onNone: Lazy<E>) => <A, S, R>(ma: Option<A>) => Kind4<F, S, R, E, A>
export function fromOption<F extends URIS3>(
  F: FromEither3<F>
): <E>(onNone: Lazy<E>) => <A, R>(ma: Option<A>) => Kind3<F, R, E, A>
export function fromOption<F extends URIS3, E>(
  F: FromEither3C<F, E>
): (onNone: Lazy<E>) => <A, R>(ma: Option<A>) => Kind3<F, R, E, A>
export function fromOption<F extends URIS2>(
  F: FromEither2<F>
): <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => Kind2<F, E, A>
export function fromOption<F extends URIS2, E>(
  F: FromEither2C<F, E>
): (onNone: Lazy<E>) => <A>(ma: Option<A>) => Kind2<F, E, A>
export function fromOption<F>(F: FromEither<F>): <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => HKT2<F, E, A>
export function fromOption<F>(F: FromEither<F>): <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => HKT2<F, E, A> {
  return (onNone) => flow(E.fromOption(onNone), F.fromEither)
}

/**
 * @since 3.0.0
 */
export function fromPredicate<F extends URIS4>(
  F: FromEither4<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R>(a: A) => Kind4<F, S, R, A, B>
  <A>(predicate: Predicate<A>): <S, R>(a: A) => Kind4<F, S, R, A, A>
}
export function fromPredicate<F extends URIS3>(
  F: FromEither3<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <R>(a: A) => Kind3<F, R, A, B>
  <A>(predicate: Predicate<A>): <R>(a: A) => Kind3<F, R, A, A>
}
export function fromPredicate<F extends URIS2>(
  F: FromEither2<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Kind2<F, A, B>
  <A>(predicate: Predicate<A>): (a: A) => Kind2<F, A, A>
}
export function fromPredicate<F>(
  F: FromEither<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => HKT2<F, A, B>
  <A>(predicate: Predicate<A>): (a: A) => HKT2<F, A, A>
}
export function fromPredicate<F>(
  F: FromEither<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => HKT2<F, A, B>
  <A>(predicate: Predicate<A>): (a: A) => HKT2<F, A, A>
} {
  return <A>(predicate: Predicate<A>) => flow(E.fromPredicate(predicate), F.fromEither)
}

/**
 * @since 3.0.0
 */
export function filterOrElse<M extends URIS4>(
  M: FromEither4<M> & Monad4<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: Kind4<M, S, R, E, A>
  ) => Kind4<M, S, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
}
export function filterOrElse<M extends URIS3>(
  M: FromEither3<M> & Monad3<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: Kind3<M, R, E, A>
  ) => Kind3<M, R, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
}
export function filterOrElse<M extends URIS2>(
  M: FromEither2<M> & Monad2<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, A>
}
export function filterOrElse<M>(
  M: FromEither<M> & Monad<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: HKT2<M, E, A>) => HKT2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: HKT2<M, E, A>) => HKT2<M, E, A>
}
export function filterOrElse<M>(
  M: FromEither<M> & Monad<M>
): {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: HKT2<M, E, A>) => HKT2<M, E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: HKT2<M, E, A>) => HKT2<M, E, A>
} {
  return <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E) => (ma: HKT2<M, E, A>): HKT2<M, E, A> => {
    const out = pipe(
      ma,
      M.chain((a) => M.fromEither(predicate(a) ? E.right(a) : E.left(onFalse(a))))
    )
    return out as any
  }
}
