/**
 * @since 2.0.0
 */
import { Alt3, Alt3C } from './Alt'
import { Applicative3, Applicative3C, getApplicativeMonoid } from './Applicative'
import { apFirst_, Apply3, apSecond_, apS_, ap_, getApplySemigroup as getApplySemigroup_ } from './Apply'
import { Bifunctor3 } from './Bifunctor'
import { Compactable2C, Compactable3C, compact_, separate_ } from './Compactable'
import * as E from './Either'
import * as ET from './EitherT'
import { Filterable3C, filterMap_, filter_, partitionMap_, partition_ } from './Filterable'
import { filterOrElse_, FromEither3, fromOption_, fromPredicate_ } from './FromEither'
import { flow, identity, pipe, Predicate, Refinement } from './function'
import { bindTo_, Functor2, Functor3 } from './Functor'
import { bind_, chainFirst_, Monad3, Monad3C } from './Monad'
import { MonadThrow3, MonadThrow3C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Pointed3 } from './Pointed'
import * as R from './Reader'
import { Semigroup } from './Semigroup'

import Either = E.Either
import Reader = R.Reader

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.0.0
 */
export const left: <R, E = never, A = never>(e: E) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  ET.left_(R.Pointed)

/**
 * @category constructors
 * @since 2.0.0
 */
export const right: <R, E = never, A = never>(a: A) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  ET.right_(R.Pointed)

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightReader: <R, E = never, A = never>(ma: Reader<R, A>) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  ET.rightF_(R.Functor)

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftReader: <R, E = never, A = never>(me: Reader<R, E>) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  ET.leftF_(R.Functor)

/**
 * @category constructors
 * @since 2.0.0
 */
export const ask: <R, E = never>() => ReaderEither<R, E, R> = () => E.right

/**
 * @category constructors
 * @since 2.0.0
 */
export const asks: <R, E = never, A = never>(f: (r: R) => A) => ReaderEither<R, E, A> = (f) => flow(f, E.right)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromEither: FromEither3<URI>['fromEither'] = R.of

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.0.0
 */
export const fold: <R, E, A, B>(
  onLeft: (e: E) => Reader<R, B>,
  onRight: (a: A) => Reader<R, B>
) => (ma: ReaderEither<R, E, A>) => Reader<R, B> =
  /*#__PURE__*/
  ET.fold_(R.Monad)

/**
 * @category destructors
 * @since 2.0.0
 */
export const getOrElse: <E, R, A>(onLeft: (e: E) => Reader<R, A>) => (ma: ReaderEither<R, E, A>) => Reader<R, A> =
  /*#__PURE__*/
  ET.getOrElse_(R.Monad)

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export const getOrElseW: <R, E, B>(
  onLeft: (e: E) => Reader<R, B>
) => <Q, A>(ma: ReaderEither<Q, E, A>) => Reader<Q & R, A | B> = getOrElse as any

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.0.0
 */
export const orElse: <E, R, M, A>(
  onLeft: (e: E) => ReaderEither<R, M, A>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, M, A> =
  /*#__PURE__*/
  ET.orElse_(R.Monad)

/**
 * @category combinators
 * @since 2.0.0
 */
export const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E> =
  /*#__PURE__*/
  ET.swap_(R.Functor)

// TODO: remove in v3
/**
 * @category combinators
 * @since 2.0.0
 */
export function local<Q, R>(f: (f: Q) => R): <E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<Q, E, A> {
  return (ma) => (q) => ma(f(q))
}

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderEither<R, E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainEitherKW: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <R, D>(ma: ReaderEither<R, D, A>) => ReaderEither<R, D | E, B> = (f) => chainW(fromEitherK(f))

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B> = chainEitherKW

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const _map: Monad3<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _bimap: Bifunctor3<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const _mapLeft: Bifunctor3<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))
/* istanbul ignore next */
const _ap: Monad3<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _chain: Monad3<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
/* istanbul ignore next */
const _alt: Alt3<URI>['alt'] = (fa, that) => pipe(fa, alt(that))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B> =
  /*#__PURE__*/
  ET.map_(R.Functor)

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, B> =
  /*#__PURE__*/
  ET.bimap_(R.Functor)

/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, A> =
  /*#__PURE__*/
  ET.mapLeft_(R.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <R, E, A>(
  fa: ReaderEither<R, E, A>
) => <B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B> =
  /*#__PURE__*/
  ET.ap_(R.Apply)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export const apW: <Q, D, A>(
  fa: ReaderEither<Q, D, A>
) => <R, E, B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<Q & R, D | E, B> = ap as any

/**
 * @category Pointed
 * @since 2.8.5
 */
export const of: Pointed3<URI>['of'] = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B> =
  /*#__PURE__*/
  ET.chain_(R.Monad)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => <Q, D>(ma: ReaderEither<Q, D, A>) => ReaderEither<Q & R, D | E, B> = chain as any

/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <R, E, A>(mma: ReaderEither<R, E, ReaderEither<R, E, A>>) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export const alt: <R, E, A>(that: () => ReaderEither<R, E, A>) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  ET.alt_(R.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW: <R2, E2, B>(
  that: () => ReaderEither<R2, E2, B>
) => <R1, E1, A>(fa: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, A | B> = alt as any

/**
 * @category MonadThrow
 * @since 2.7.0
 */
export const throwError: MonadThrow3<URI>['throwError'] = left

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'ReaderEither'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    readonly [URI]: ReaderEither<R, E, A>
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable3C<URI, E> => {
  const C: Compactable2C<E.URI, E> & Functor2<E.URI> = { ...E.getCompactable(M), ...E.Functor }
  return {
    URI,
    _E: undefined as any,
    compact: compact_(R.Functor, C),
    separate: separate_(R.Functor, C)
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export function getFilterable<E>(M: Monoid<E>): Filterable3C<URI, E> {
  const F = E.getFilterable(M)
  const C = getCompactable(M)

  const filter = filter_(R.Functor, F)
  const filterMap = filterMap_(R.Functor, F)
  const partition = partition_(R.Functor, F)
  const partitionMap = partitionMap_(R.Functor, F)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    compact: C.compact,
    separate: C.separate,
    filter: <R, A>(fa: ReaderEither<R, E, A>, predicate: Predicate<A>) => pipe(fa, filter(predicate)),
    filterMap: (fa, f) => pipe(fa, filterMap(f)),
    partition: <R, A>(fa: ReaderEither<R, E, A>, predicate: Predicate<A>) => pipe(fa, partition(predicate)),
    partitionMap: (fa, f) => pipe(fa, partitionMap(f))
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicativeReaderValidation<E>(S: Semigroup<E>): Applicative3C<URI, E> {
  const ap = ap_(R.Apply, E.getApplicativeValidation(S))
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: (fab, fa) => pipe(fab, ap(fa)),
    of
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getAltReaderValidation<E>(S: Semigroup<E>): Alt3C<URI, E> {
  const alt = ET.altValidation_(R.Monad, S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    alt: (fa, that) => pipe(fa, alt(that))
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor3<URI> = {
  URI,
  map: _map
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed3<URI> = {
  URI,
  map: _map,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Apply: Apply3<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * @category instances
 * @since 2.7.0
 */
export const Applicative: Applicative3<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad3<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * Less strict version of [`chainFirst`](#chainFirst)
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
export const chainFirstW: <R, D, A, B>(
  f: (a: A) => ReaderEither<R, D, B>
) => <Q, E>(ma: ReaderEither<Q, E, A>) => ReaderEither<Q & R, D | E, A> = chainFirst as any

/**
 * @category instances
 * @since 2.7.0
 */
export const Bifunctor: Bifunctor3<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Alt: Alt3<URI> = {
  URI,
  map: _map,
  alt: _alt
}

/**
 * @category instances
 * @since 2.7.0
 */
export const MonadThrow: MonadThrow3<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain,
  throwError
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromEither: FromEither3<URI> = {
  URI,
  fromEither
}

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromOption =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromPredicate =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse =
  /*#__PURE__*/
  filterOrElse_({
    URI,
    map: _map,
    ap: _ap,
    of,
    chain: _chain,
    fromEither
  })

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @category combinators
 * @since 2.9.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderEither<R, E1, A>
  ) => ReaderEither<R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderEither<R, E1, A>
  ) => ReaderEither<R, E1 | E2, A>
} = filterOrElse

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const Do: ReaderEither<unknown, never, {}> =
  /*#__PURE__*/
  of({})

/**
 * @since 2.8.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 2.8.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Monad)

/**
 * @since 2.8.0
 */
export const bindW: <N extends string, A, Q, D, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderEither<Q, D, B>
) => <R, E>(
  fa: ReaderEither<R, E, A>
) => ReaderEither<Q & R, E | D, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

/**
 * @since 2.8.0
 */
export const apSW: <A, N extends string, Q, D, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderEither<Q, D, B>
) => <R, E>(
  fa: ReaderEither<R, E, A>
) => ReaderEither<Q & R, D | E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <R, E, A, B>(
  f: (index: number, a: A) => ReaderEither<R, E, B>
) => (arr: ReadonlyArray<A>) => ReaderEither<R, E, ReadonlyArray<B>> = (f) =>
  flow(R.traverseArrayWithIndex(f), R.map(E.sequenceArray))

/**
 * @since 2.9.0
 */
export const traverseArray: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (arr: ReadonlyArray<A>) => ReaderEither<R, E, ReadonlyArray<B>> = (f) => traverseArrayWithIndex((_, a) => f(a))

/**
 * @since 2.9.0
 */
export const sequenceArray: <R, E, A>(
  arr: ReadonlyArray<ReaderEither<R, E, A>>
) => ReaderEither<R, E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const readerEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadThrow3<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft,
  map: _map,
  of,
  ap: _ap,
  chain: _chain,
  alt: _alt,
  throwError: left
}

/**
 * Use `Apply.getApplySemigroup` instead.
 *
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getApplySemigroup: <R, E, A>(S: Semigroup<A>) => Semigroup<ReaderEither<R, E, A>> =
  /*#__PURE__*/
  getApplySemigroup_(Apply)

/**
 * Use `Applicative.getApplicativeMonoid` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getApplyMonoid: <R, E, A>(M: Monoid<A>) => Monoid<ReaderEither<R, E, A>> =
  /*#__PURE__*/
  getApplicativeMonoid(Applicative)

/**
 * Use `Apply.getApplySemigroup` instead.
 *
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getSemigroup = <R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> =>
  getApplySemigroup_(R.Apply)(E.getSemigroup(S))

/**
 * Use `getApplicativeReaderValidation` and `getAltReaderValidation` instead.
 *
 * @category instances
 * @since 2.3.0
 * @deprecated
 */
export function getReaderValidation<E>(
  SE: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3<URI> & Alt3C<URI, E> & MonadThrow3C<URI, E> {
  const applicativeReaderValidation = getApplicativeReaderValidation(SE)
  const altReaderValidation = getAltReaderValidation(SE)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: applicativeReaderValidation.ap,
    of,
    chain: _chain,
    bimap: _bimap,
    mapLeft: _mapLeft,
    alt: altReaderValidation.alt,
    throwError
  }
}
