import { Alt3 } from './Alt'
import { Bifunctor3 } from './Bifunctor'
import * as E from './Either'
import { getEitherM } from './EitherT'
import { Predicate, Refinement } from './function'
import { Monad3 } from './Monad'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { pipeable } from './pipeable'
import { getSemigroup as getReaderSemigroup, Reader, reader } from './Reader'
import { Semigroup } from './Semigroup'

import Either = E.Either

const T = getEitherM(reader)

declare module './HKT' {
  interface URI2HKT3<U, L, A> {
    ReaderEither: ReaderEither<U, L, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'ReaderEither'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}

/**
 * @since 2.0.0
 */
export const left: <R, E>(e: E) => ReaderEither<R, E, never> = T.left

/**
 * @since 2.0.0
 */
export const right: <R, A>(a: A) => ReaderEither<R, never, A> = T.of

/**
 * @since 2.0.0
 */
export const rightReader: <R, A>(ma: Reader<R, A>) => ReaderEither<R, never, A> = T.rightM

/**
 * @since 2.0.0
 */
export const leftReader: <R, E>(me: Reader<R, E>) => ReaderEither<R, E, never> = T.leftM

/**
 * @since 2.0.0
 */
export const fromEither: <R, E, A>(ma: Either<E, A>) => ReaderEither<R, E, A> = reader.of

/**
 * @since 2.0.0
 */
export function fromOption<E>(onNone: () => E): <R, A>(ma: Option<A>) => ReaderEither<R, E, A> {
  return ma => T.fromOption(ma, onNone)
}

/**
 * @since 2.0.0
 */
export function fromPredicate<E, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => E
): <R>(a: A) => ReaderEither<R, E, B>
export function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderEither<R, E, A>
export function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderEither<R, E, A> {
  const f = E.fromPredicate(predicate, onFalse)
  return a => fromEither(f(a))
}

/**
 * @since 2.0.0
 */
export function fold<R, E, A, B>(
  onLeft: (e: E) => Reader<R, B>,
  onRight: (a: A) => Reader<R, B>
): (ma: ReaderEither<R, E, A>) => Reader<R, B> {
  return ma => T.fold(ma, onLeft, onRight)
}

/**
 * @since 2.0.0
 */
export function getOrElse<R, E, A>(f: (e: E) => Reader<R, A>): (ma: ReaderEither<R, E, A>) => Reader<R, A> {
  return ma => T.getOrElse(ma, f)
}

/**
 * @since 2.0.0
 */
export function orElse<R, E, A, M>(
  f: (e: E) => ReaderEither<R, M, A>
): (ma: ReaderEither<R, E, A>) => ReaderEither<R, M, A> {
  return ma => T.orElse(ma, f)
}

/**
 * @since 2.0.0
 */
export function filterOrElse<E, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => E
): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
export function filterOrElse<E, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => E
): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
export function filterOrElse<E, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => E
): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A> {
  return ma => reader.map(ma, E.filterOrElse(predicate, onFalse))
}

/**
 * @since 2.0.0
 */
export const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E> = T.swap

/**
 * @since 2.0.0
 */
export function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> {
  return getReaderSemigroup(E.getSemigroup<E, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> {
  return getReaderSemigroup(E.getApplySemigroup<E, A>(S))
}

/**
 * @since 2.0.0
 */
export function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderEither<R, E, A>> {
  return {
    concat: getApplySemigroup<R, E, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * @since 2.0.0
 */
export const readerEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> = {
  URI,
  bimap: T.bimap,
  mapLeft: T.mapLeft,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain,
  alt: T.alt
}

const { alt, ap, apFirst, apSecond, bimap, chain, chainFirst, flatten, map, mapLeft } = pipeable(readerEither)

export { alt, ap, apFirst, apSecond, bimap, chain, chainFirst, flatten, map, mapLeft }
