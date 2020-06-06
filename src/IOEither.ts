/**
 * `IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.
 *
 * @since 2.0.0
 */
import { Alt2, Alt2C } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import * as E from './Either'
import { getEitherM } from './EitherT'
import { Filterable2C, getFilterableComposition } from './Filterable'
import { identity, Lazy, Predicate, Refinement } from './function'
import { getSemigroup as getIOSemigroup, IO, monadIO } from './IO'
import { Monad2, Monad2C } from './Monad'
import { MonadIO2, MonadIO2C } from './MonadIO'
import { MonadThrow2, MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Semigroup } from './Semigroup'
import { getValidationM } from './ValidationT'

import Either = E.Either

const T = /*#__PURE__*/ getEitherM(monadIO)

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly IOEither: IOEither<E, A>
  }
}

/**
 * @category model
 * @since 2.0.0
 */
export const URI = 'IOEither'

/**
 * @category model
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @category model
 * @since 2.0.0
 */
export interface IOEither<E, A> extends IO<Either<E, A>> {}

/**
 * @category constructors
 * @since 2.0.0
 */
export const left: <E = never, A = never>(l: E) => IOEither<E, A> = T.left

/**
 * @category constructors
 * @since 2.0.0
 */
export const right: <E = never, A = never>(a: A) => IOEither<E, A> = T.of

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightIO: <E = never, A = never>(ma: IO<A>) => IOEither<E, A> = T.rightM

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftIO: <E = never, A = never>(me: IO<E>) => IOEither<E, A> = T.leftM

/**
 * @category destructors
 * @since 2.0.0
 */
export function fold<E, A, B>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>): (ma: IOEither<E, A>) => IO<B> {
  return (ma) => T.fold(ma, onLeft, onRight)
}

/**
 * @category destructors
 * @since 2.0.0
 */
export function getOrElse<E, A>(onLeft: (e: E) => IO<A>): (ma: IOEither<E, A>) => IO<A> {
  return (ma) => T.getOrElse(ma, onLeft)
}

/**
 * @category destructors
 * @since 2.6.0
 */
export const getOrElseW: <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: IOEither<E, A>) => IO<A | B> = getOrElse as any

/**
 * @category combinators
 * @since 2.0.0
 */
export function orElse<E, A, M>(onLeft: (e: E) => IOEither<M, A>): (ma: IOEither<E, A>) => IOEither<M, A> {
  return (ma) => T.orElse(ma, onLeft)
}

/**
 * @category combinators
 * @since 2.0.0
 */
export const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E> = T.swap

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> {
  return getIOSemigroup(E.getSemigroup<E, A>(S))
}

/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are appended using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> {
  return getIOSemigroup(E.getApplySemigroup<E, A>(S))
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<IOEither<E, A>> {
  return {
    concat: getApplySemigroup<E, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * @category constructors
 * @since 2.0.0
 */
export function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A> {
  return () => E.tryCatch(f, onError)
}

/**
 * Make sure that a resource is cleaned up in the event of an exception (*). The release action is called regardless of
 * whether the body action throws (*) or returns.
 *
 * (*) i.e. returns a `Left`
 *
 * @since 2.0.0
 */
export function bracket<E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: Either<E, B>) => IOEither<E, void>
): IOEither<E, B> {
  return T.chain(acquire, (a) =>
    T.chain(monadIO.map(use(a), E.right), (e) =>
      T.chain(release(a, e), () => (E.isLeft(e) ? T.left(e.left) : T.of(e.right)))
    )
  )
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getIOValidation<E>(
  S: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2<URI> & Alt2C<URI, E> & MonadIO2C<URI, E> & MonadThrow2C<URI, E> {
  const T = getValidationM(S, monadIO)
  return {
    _E: undefined as any,
    ...ioEither,
    ...T
  }
}

/**
 * @category instances
 * @since 2.1.0
 */
export function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E> {
  const F = E.getWitherable(M)

  return {
    URI,
    _E: undefined as any,
    ...getFilterableComposition(monadIO, F)
  }
}

/**
 * @since 2.4.0
 */
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => IOEither<E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * @category Monad
 * @since 2.4.0
 */
export function chainEitherK<E, A, B>(f: (a: A) => Either<E, B>): (ma: IOEither<E, A>) => IOEither<E, B> {
  return chain(fromEitherK(f))
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Alt
 * @since 2.0.0
 */
export const alt: <E, A>(that: () => IOEither<E, A>) => (fa: IOEither<E, A>) => IOEither<E, A> = (that) => (fa) =>
  T.alt(fa, that)

/**
 * @category Apply
 * @since 2.0.0
 */
export const ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B> = (fa) => (fab) =>
  T.ap(fab, fa)

/**
 * @category Apply
 * @since 2.0.0
 */
export const apFirst: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, A> = (fb) => (fa) =>
  T.ap(
    T.map(fa, (a) => () => a),
    fb
  )

/**
 * @category Apply
 * @since 2.0.0
 */
export const apSecond = <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>): IOEither<E, B> =>
  T.ap(
    T.map(fa, () => (b: B) => b),
    fb
  )

/**
 * @category Monad
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B> = (f) => (ma) =>
  T.chain(ma, f)

/**
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A> = (f) => (
  ma
) => T.chain(ma, (a) => T.map(f(a), () => a))

/**
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <D, A, B>(
  f: (a: A) => IOEither<D, B>
) => <E>(ma: IOEither<E, A>) => IOEither<E | D, B> = chain as any

/**
 * @since 2.6.1
 */
export const chainEitherKW: <D, A, B>(
  f: (a: A) => Either<D, B>
) => <E>(ma: IOEither<E, A>) => IOEither<E | D, B> = chainEitherK as any

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A> = (mma) => T.chain(mma, identity)

/**
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B> = (f) => (fa) => T.map(fa, f)

/**
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B> = (f, g) => (
  fa
) => T.bimap(fa, f, g)

/**
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A> = (f) => (fa) =>
  T.mapLeft(fa, f)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => IOEither<E, A> = (onNone) => (ma) =>
  ma._tag === 'None' ? left(onNone()) : right(ma.value)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) => (predicate(a) ? right(a) : left(onFalse(a)))

/**
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (ma: IOEither<E, A>) =>
  T.chain(ma, (a) => (predicate(a) ? right(a) : left(onFalse(a))))

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromEither: <E, A>(ma: E.Either<E, A>) => IOEither<E, A> = (ma) =>
  ma._tag === 'Left' ? left(ma.left) : right(ma.right)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadThrow2<URI> = {
  URI,
  bimap: T.bimap,
  mapLeft: T.mapLeft,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain,
  alt: T.alt,
  fromIO: rightIO,
  throwError: left
}
