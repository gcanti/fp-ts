/**
 * @since 2.0.0
 */
import { Alt4 } from './Alt'
import { Applicative4 } from './Applicative'
import { apFirst as apFirst_, Apply4, apS as apS_, apSecond as apSecond_ } from './Apply'
import { Bifunctor4 } from './Bifunctor'
import * as E from './Either'
import {
  chainEitherK as chainEitherK_,
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither4,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import { FromIO4 } from './FromIO'
import { FromTask4 } from './FromTask'
import { flow, identity, Lazy, pipe, Predicate, Refinement } from './function'
import { bindTo as bindTo_, flap as flap_, Functor4 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { bind as bind_, chainFirst as chainFirst_ } from './Chain'
import { MonadTask4 } from './MonadTask'
import { MonadThrow4 } from './MonadThrow'
import { Pointed4 } from './Pointed'
import { Reader } from './Reader'
import { ReaderEither } from './ReaderEither'
import * as RTE from './ReaderTaskEither'
import { State } from './State'
import * as ST from './StateT'
import { Task } from './Task'
import { TaskEither } from './TaskEither'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import ReaderTaskEither = RTE.ReaderTaskEither
import Either = E.Either
import { Monad4 } from './Monad'

/* tslint:disable:readonly-array */
/**
 * @category model
 * @since 2.0.0
 */
export interface StateReaderTaskEither<S, R, E, A> {
  (s: S): ReaderTaskEither<R, E, [A, S]>
}
/* tslint:enable:readonly-array */

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.0.0
 */
export const left: <S, R, E = never, A = never>(e: E) => StateReaderTaskEither<S, R, E, A> = (e) => () => RTE.left(e)

/**
 * @category constructors
 * @since 2.0.0
 */
export const right: <S, R, E = never, A = never>(a: A) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/
  ST.of(RTE.Pointed)

/**
 * @category constructors
 * @since 2.0.0
 */
export function rightTask<S, R, E = never, A = never>(ma: Task<A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.rightTask(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function leftTask<S, R, E = never, A = never>(me: Task<E>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.leftTask(me))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function fromTaskEither<S, R, E, A>(ma: TaskEither<E, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.fromTaskEither(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function rightReader<S, R, E = never, A = never>(ma: Reader<R, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.rightReader(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function leftReader<S, R, E = never, A = never>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.leftReader(me))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function fromIOEither<S, R, E, A>(ma: IOEither<E, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.fromIOEither(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function fromReaderEither<S, R, E, A>(ma: ReaderEither<R, E, A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.fromReaderEither(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function rightIO<S, R, E = never, A = never>(ma: IO<A>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.rightIO(ma))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function leftIO<S, R, E = never, A = never>(me: IO<E>): StateReaderTaskEither<S, R, E, A> {
  return fromReaderTaskEither(RTE.leftIO(me))
}

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightState: <S, R, E = never, A = never>(ma: State<S, A>) => StateReaderTaskEither<S, R, E, A> = (sa) =>
  flow(sa, RTE.right)

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftState: <S, R, E = never, A = never>(me: State<S, E>) => StateReaderTaskEither<S, R, E, A> = (me) => (
  s
) => RTE.left(me(s)[0])

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromReaderTaskEither: <S, R, E, A>(ma: ReaderTaskEither<R, E, A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/
  ST.fromF(RTE.Functor)

/**
 * Get the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const get: <S, R, E = never>() => StateReaderTaskEither<S, R, E, S> =
  /*#__PURE__*/
  ST.get(RTE.Pointed)

/**
 * Set the state
 *
 * @category constructors
 * @since 2.0.0
 */
export const put: <S, R, E = never>(s: S) => StateReaderTaskEither<S, R, E, void> =
  /*#__PURE__*/
  ST.put(RTE.Pointed)

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const modify: <S, R, E = never>(f: (s: S) => S) => StateReaderTaskEither<S, R, E, void> =
  /*#__PURE__*/
  ST.modify(RTE.Pointed)

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const gets: <S, R, E = never, A = never>(f: (s: S) => A) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/
  ST.gets(RTE.Pointed)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromEither: FromEither4<URI>['fromEither'] =
  /*#__PURE__*/
  E.fold((e) => left(e), right)

/**
 * @category constructors
 * @since 2.7.0
 */
export const fromIO: FromIO4<URI>['fromIO'] = rightIO

/**
 * @category constructors
 * @since 2.7.0
 */
export const fromTask: FromTask4<URI>['fromTask'] = rightTask

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromState =
  /*#__PURE__*/
  ST.fromState(RTE.Pointed)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.4.0
 */
export const fromIOEitherK = <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): (<S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>) => (...a) => fromIOEither(f(...a))

/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainIOEitherKW = <E2, A, B>(f: (a: A) => IOEither<E2, B>) => <S, R, E1>(
  ma: StateReaderTaskEither<S, R, E1, A>
): StateReaderTaskEither<S, R, E1 | E2, B> => pipe(ma, chainW<S, R, E2, A, B>(fromIOEitherK(f)))

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = chainIOEitherKW

/**
 * @category combinators
 * @since 2.4.0
 */
export const fromTaskEitherK = <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): (<S, R>(...a: A) => StateReaderTaskEither<S, R, E, B>) => (...a) => fromTaskEither(f(...a))

/**
 * Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainTaskEitherKW = <E2, A, B>(f: (a: A) => TaskEither<E2, B>) => <S, R, E1>(
  ma: StateReaderTaskEither<S, R, E1, A>
): StateReaderTaskEither<S, R, E1 | E2, B> => pipe(ma, chainW<S, R, E2, A, B>(fromTaskEitherK(f)))

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <S, R>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = chainTaskEitherKW

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromReaderTaskEitherK<R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => ReaderTaskEither<R, E, B>
): <S>(...a: A) => StateReaderTaskEither<S, R, E, B> {
  return (...a) => fromReaderTaskEither(f(...a))
}

/**
 * Less strict version of [`chainReaderTaskEitherK`](#chainReaderTaskEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainReaderTaskEitherKW = <R, E2, A, B>(f: (a: A) => ReaderTaskEither<R, E2, B>) => <S, E1>(
  ma: StateReaderTaskEither<S, R, E1, A>
): StateReaderTaskEither<S, R, E1 | E2, B> => pipe(ma, chainW<S, R, E2, A, B>(fromReaderTaskEitherK(f)))

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainReaderTaskEitherK: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => <S>(ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> = chainReaderTaskEitherKW

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const _map: Monad4<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _ap: Monad4<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _chain: Monad4<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
/* istanbul ignore next */
const _alt: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>,
  that: Lazy<StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, A> = (fa, that) => (s) =>
  pipe(
    fa(s),
    RTE.alt(() => that()(s))
  )
const _bimap: <S, R, E, A, G, B>(
  fea: StateReaderTaskEither<S, R, E, A>,
  f: (e: E) => G,
  g: (a: A) => B
) => StateReaderTaskEither<S, R, G, B> = (fea, f, g) => (s) =>
  pipe(
    fea(s),
    RTE.bimap(f, ([a, s]) => [g(a), s])
  )
const _mapLeft: <S, R, E, A, G>(
  fea: StateReaderTaskEither<S, R, E, A>,
  f: (e: E) => G
) => StateReaderTaskEither<S, R, G, A> = (fea, f) => (s) => pipe(fea(s), RTE.mapLeft(f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/
  ST.map(RTE.Functor)

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, B> = (f, g) => (fa) =>
  _bimap(fa, f, g)

/**
 * Map a function over the third type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.6.2
 */
export const mapLeft: <E, G>(
  f: (e: E) => G
) => <S, R, A>(fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, G, A> = (f) => (fa) =>
  _mapLeft(fa, f)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <S, R, E, A>(
  fa: StateReaderTaskEither<S, R, E, A>
) => <B>(fab: StateReaderTaskEither<S, R, E, (a: A) => B>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/
  ST.ap(RTE.Monad)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export const apW: <S, R2, E2, A>(
  fa: StateReaderTaskEither<S, R2, E2, A>
) => <R1, E1, B>(
  fab: StateReaderTaskEither<S, R1, E1, (a: A) => B>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, B> = ap as any

/**
 * @category Pointed
 * @since 2.7.0
 */
export const of = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, B> =
  /*#__PURE__*/
  ST.chain(RTE.Monad)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <S, R2, E2, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(ma: StateReaderTaskEither<S, R1, E1, A>) => StateReaderTaskEither<S, R1 & R2, E1 | E2, B> = chain as any

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <S, R, E, A>(
  mma: StateReaderTaskEither<S, R, E, StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW = <S, R2, E2, B>(that: () => StateReaderTaskEither<S, R2, E2, B>) => <R1, E1, A>(
  fa: StateReaderTaskEither<S, R1, E1, A>
): StateReaderTaskEither<S, R1 & R2, E1 | E2, A | B> => (r) =>
  pipe(
    fa(r),
    RTE.altW(() => that()(r))
  )

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
export const alt: <S, R, E, A>(
  that: Lazy<StateReaderTaskEither<S, R, E, A>>
) => (fa: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> = altW

/**
 * @category MonadThrow
 * @since 2.7.0
 */
export const throwError: MonadThrow4<URI>['throwError'] = left

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'StateReaderTaskEither'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind4<S, R, E, A> {
    readonly [URI]: StateReaderTaskEither<S, R, E, A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor4<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed4<URI> = {
  URI,
  map: _map,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Apply: Apply4<URI> = {
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
export const Applicative: Applicative4<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Monad: Monad4<URI> = {
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
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const chainFirst: <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
) => (ma: StateReaderTaskEither<S, R, E, A>) => StateReaderTaskEither<S, R, E, A> =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.8.0
 */
export const chainFirstW: <S, R2, E2, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  ma: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, A> = chainFirst as any

/**
 * @category instances
 * @since 2.7.0
 */
export const Bifunctor: Bifunctor4<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Alt: Alt4<URI> = {
  URI,
  map: _map,
  alt: _alt
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromEither: FromEither4<URI> = {
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
 * @category combinators
 * @since 2.10.0
 */
export const fromOptionK =
  /*#__PURE__*/
  fromOptionK_(FromEither)

const MonadFromEither: FromEither4<URI> & Monad4<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain,
  fromEither
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainOptionK =
  /*#__PURE__*/
  chainOptionK_(MonadFromEither)

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainEitherK =
  /*#__PURE__*/
  chainEitherK_(MonadFromEither)

/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainEitherKW: <E2, A, B>(
  f: (a: A) => Either<E2, B>
) => <S, R, E1>(ma: StateReaderTaskEither<S, R, E1, A>) => StateReaderTaskEither<S, R, E1 | E2, B> = chainEitherK as any

/**
 * @category constructors
 * @since 2.4.4
 */
export const fromPredicate =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 2.4.4
 */
export const filterOrElse =
  /*#__PURE__*/
  filterOrElse_(MonadFromEither)

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @category combinators
 * @since 2.9.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, R, E1>(
    ma: StateReaderTaskEither<S, R, E1, A>
  ) => StateReaderTaskEither<S, R, E1 | E2, A>
} = filterOrElse

/**
 * @category combinators
 * @since 2.4.0
 */
export const fromEitherK =
  /*#__PURE__*/
  fromEitherK_(FromEither)

/**
 * @category instances
 * @since 2.10.0
 */
export const FromIO: FromIO4<URI> = {
  URI,
  fromIO
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromTask: FromTask4<URI> = {
  URI,
  fromIO,
  fromTask
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.8.0
 */
export const evaluate: <S>(s: S) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ST.evaluate(RTE.Functor)

/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.8.0
 */
export const execute: <S>(s: S) => <R, E, A>(ma: StateReaderTaskEither<S, R, E, A>) => ReaderTaskEither<R, E, S> =
  /*#__PURE__*/
  ST.execute(RTE.Functor)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

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
export const bindW: <N extends string, A, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

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
export const apSW: <A, N extends string, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderTaskEither<S, R2, E2, B>
) => <R1, E1>(
  fa: StateReaderTaskEither<S, R1, E1, A>
) => StateReaderTaskEither<S, R1 & R2, E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.9.0
 */
export const traverseArrayWithIndex = <S, R, E, A, B>(
  f: (index: number, a: A) => StateReaderTaskEither<S, R, E, B>
) => (as: ReadonlyArray<A>): StateReaderTaskEither<S, R, E, ReadonlyArray<B>> => (s) => (r) => () =>
  // tslint:disable-next-line: readonly-array
  as.reduce<Promise<Either<E, [Array<B>, S]>>>(
    (acc, a, i) =>
      acc.then((ebs) =>
        E.isLeft(ebs)
          ? acc
          : f(
              i,
              a
            )(s)(r)().then((eb) => {
              if (E.isLeft(eb)) {
                return eb
              }
              const [b, s] = eb.right
              ebs.right[0].push(b)
              ebs.right[1] = s
              return ebs
            })
      ),
    Promise.resolve(E.right([[], s]))
  )

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 2.9.0
 */
export const traverseArray = <S, R, E, A, B>(
  f: (a: A) => StateReaderTaskEither<S, R, E, B>
): ((as: ReadonlyArray<A>) => StateReaderTaskEither<S, R, E, ReadonlyArray<B>>) =>
  traverseArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 2.9.0
 */
export const sequenceArray: <S, R, E, A>(
  arr: ReadonlyArray<StateReaderTaskEither<S, R, E, A>>
) => StateReaderTaskEither<S, R, E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// tslint:disable: deprecation

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const stateReaderTaskEither: Monad4<URI> & Bifunctor4<URI> & Alt4<URI> & MonadTask4<URI> & MonadThrow4<URI> = {
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: _chain,
  bimap: _bimap,
  mapLeft: _mapLeft,
  alt: _alt,
  fromIO,
  fromTask,
  throwError
}

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */

export const stateReaderTaskEitherSeq: typeof stateReaderTaskEither = {
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: _chain,
  bimap: _bimap,
  mapLeft: _mapLeft,
  alt: _alt,
  fromIO,
  fromTask,
  throwError
}

/**
 * Use `evaluate` instead
 *
 * @since 2.0.0
 * @deprecated
 */
/* istanbul ignore next */
export const evalState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, A> = (
  fsa,
  s
) =>
  pipe(
    fsa(s),
    RTE.map(([a]) => a)
  )

/**
 * Use `execute` instead
 *
 * @since 2.0.0
 * @deprecated
 */
/* istanbul ignore next */
export const execState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, S> = (
  fsa,
  s
) =>
  pipe(
    fsa(s),
    RTE.map(([_, s]) => s)
  )

/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 * @deprecated
 */
/* istanbul ignore next */
export function run<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S, r: R): Promise<Either<E, [A, S]>> {
  return ma(s)(r)()
}
/* tslint:enable:readonly-array */
