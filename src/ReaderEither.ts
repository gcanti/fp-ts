/**
 * @since 2.0.0
 */
import { Alt3, Alt3C } from './Alt'
import { Bifunctor3 } from './Bifunctor'
import * as E from './Either'
import { getEitherM } from './EitherT'
import { identity, Predicate, Refinement } from './function'
import { Monad3, Monad3C } from './Monad'
import { MonadThrow3, MonadThrow3C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { getSemigroup as getReaderSemigroup, Reader, monadReader } from './Reader'
import { Semigroup } from './Semigroup'
import { getValidationM } from './ValidationT'

import Either = E.Either

const T = /*#__PURE__*/ getEitherM(monadReader)

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    readonly ReaderEither: ReaderEither<R, E, A>
  }
}

/**
 * @category Model
 * @since 2.0.0
 */
export const URI = 'ReaderEither'

/**
 * @category Model
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @category Model
 * @since 2.0.0
 */
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}

/**
 * @category constructors
 * @since 2.0.0
 */
export const left: <R, E = never, A = never>(e: E) => ReaderEither<R, E, A> = T.left

/**
 * @category constructors
 * @since 2.0.0
 */
export const right: <R, E = never, A = never>(a: A) => ReaderEither<R, E, A> = T.of

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightReader: <R, E = never, A = never>(ma: Reader<R, A>) => ReaderEither<R, E, A> = T.rightM

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftReader: <R, E = never, A = never>(me: Reader<R, E>) => ReaderEither<R, E, A> = T.leftM

/**
 * @category destructors
 * @since 2.0.0
 */
export function fold<R, E, A, B>(
  onLeft: (e: E) => Reader<R, B>,
  onRight: (a: A) => Reader<R, B>
): (ma: ReaderEither<R, E, A>) => Reader<R, B> {
  return (ma) => T.fold(ma, onLeft, onRight)
}

/**
 * @category destructors
 * @since 2.0.0
 */
export function getOrElse<R, E, A>(onLeft: (e: E) => Reader<R, A>): (ma: ReaderEither<R, E, A>) => Reader<R, A> {
  return (ma) => T.getOrElse(ma, onLeft)
}

/**
 * @category destructors
 * @since 2.6.0
 */
export const getOrElseW: <Q, E, B>(
  onLeft: (e: E) => Reader<Q, B>
) => <R, A>(ma: ReaderEither<R, E, A>) => Reader<R & Q, A | B> = getOrElse as any

/**
 * @category combinators
 * @since 2.0.0
 */
export function orElse<R, E, A, M>(
  onLeft: (e: E) => ReaderEither<R, M, A>
): (ma: ReaderEither<R, E, A>) => ReaderEither<R, M, A> {
  return (ma) => T.orElse(ma, onLeft)
}

/**
 * @category combinators
 * @since 2.0.0
 */
export const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E> = T.swap

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> {
  return getReaderSemigroup(E.getSemigroup<E, A>(S))
}

/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> {
  return getReaderSemigroup(E.getApplySemigroup<E, A>(S))
}

/**
 * @category instances
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
export function ask<R, E = never>(): ReaderEither<R, E, R> {
  return E.right
}

/**
 * @since 2.0.0
 */
export function asks<R, E = never, A = never>(f: (r: R) => A): ReaderEither<R, E, A> {
  return (r) => E.right(f(r))
}

/**
 * @since 2.0.0
 */
export function local<Q, R>(f: (f: Q) => R): <E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<Q, E, A> {
  return (ma) => (q) => ma(f(q))
}

/**
 * @category instances
 * @since 2.3.0
 */
export function getReaderValidation<E>(
  S: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3<URI> & Alt3C<URI, E> & MonadThrow3C<URI, E> {
  const T = getValidationM(S, monadReader)
  return {
    _E: undefined as any,
    ...readerEither,
    ...T
  }
}

/**
 * @since 2.4.0
 */
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderEither<R, E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * @category Monad
 * @since 2.4.0
 */
export function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B> {
  return chain<any, E, A, B>(fromEitherK(f))
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Alt
 * @since 2.0.0
 */
export const alt: <R, E, A>(
  that: () => ReaderEither<R, E, A>
) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A> = (that) => (fa) => T.alt(fa, that)

/**
 * @category Apply
 * @since 2.0.0
 */
export const ap: <R, E, A>(
  fa: ReaderEither<R, E, A>
) => <B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B> = (fa) => (fab) => T.ap(fab, fa)

/**
 * @category Apply
 * @since 2.0.0
 */
export const apFirst: <R, E, B>(
  fb: ReaderEither<R, E, B>
) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A> = (fb) => (fa) =>
  T.ap(
    T.map(fa, (a) => () => a),
    fb
  )

/**
 * @category Apply
 * @since 2.0.0
 */
export const apSecond = <R, E, B>(fb: ReaderEither<R, E, B>) => <A>(fa: ReaderEither<R, E, A>): ReaderEither<R, E, B> =>
  T.ap(
    T.map(fa, () => (b: B) => b),
    fb
  )

/**
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, B> = (f, g) => (fa) => T.bimap(fa, f, g)

/**
 * @category Monad
 * @since 2.0.0
 */
export const chain: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B> = (f) => (ma) => T.chain(ma, f)

/**
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <Q, D, A, B>(
  f: (a: A) => ReaderEither<Q, D, B>
) => <R, E>(ma: ReaderEither<R, E, A>) => ReaderEither<R & Q, E | D, B> = chain as any

/**
 * @category Monad
 * @since 2.6.1
 */
export const chainEitherKW: <D, A, B>(
  f: (a: A) => Either<D, B>
) => <R, E>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E | D, B> = chainEitherK as any

/**
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A> = (f) => (ma) => T.chain(ma, (a) => T.map(f(a), () => a))

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <R, E, A>(mma: ReaderEither<R, E, ReaderEither<R, E, A>>) => ReaderEither<R, E, A> = (mma) =>
  T.chain(mma, identity)

/**
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B> = (f) => (fa) =>
  T.map(fa, f)

/**
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, A> = (f) => (
  fa
) => T.mapLeft(fa, f)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromEither: <R, E, A>(ma: E.Either<E, A>) => ReaderEither<R, E, A> = (ma) =>
  E.isLeft(ma) ? left(ma.left) : right(ma.right)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: () => E) => <R, A>(ma: Option<A>) => ReaderEither<R, E, A> = (onNone) => (ma) =>
  ma._tag === 'None' ? left(onNone()) : right(ma.value)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderEither<U, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) => (predicate(a) ? right(a) : left(onFalse(a)))

/**
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderEither<R, E, A>
  ) => ReaderEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <R>(ma: ReaderEither<R, E, A>) =>
  T.chain(ma, (a) => (predicate(a) ? right(a) : left(onFalse(a))))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const readerEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadThrow3<URI> = {
  URI,
  bimap: T.bimap,
  mapLeft: T.mapLeft,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain,
  alt: T.alt,
  throwError: left
}
