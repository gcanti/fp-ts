/**
 * @since 2.0.0
 */
import { Alt3, Alt3C } from './Alt'
import { Applicative3, Applicative3C, getApplicativeMonoid } from './Applicative'
import { apFirst_, Apply1, Apply3, apSecond_, apS_, ap_, getApplySemigroup as getApplySemigroup_ } from './Apply'
import { Bifunctor3 } from './Bifunctor'
import * as E from './Either'
import * as ET from './EitherT'
import { FromIO3 } from './FromIO'
import { FromTask3 } from './FromTask'
import { flow, identity, Lazy, pipe, Predicate, Refinement } from './function'
import { bindTo_, Functor3 } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { bind_, chainFirst_, Monad3, Monad3C } from './Monad'
import { MonadTask3, MonadTask3C } from './MonadTask'
import { MonadThrow3, MonadThrow3C } from './MonadThrow'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Pointed3 } from './Pointed'
import * as R from './Reader'
import { ReaderEither } from './ReaderEither'
import * as RT from './ReaderTask'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TE from './TaskEither'

import Either = E.Either
import Task = T.Task
import TaskEither = TE.TaskEither
import Reader = R.Reader
import ReaderTask = RT.ReaderTask

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromTaskEither: <R, E, A>(ma: TaskEither<E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  R.of

/**
 * @category constructors
 * @since 2.0.0
 */
export const left: <R, E = never, A = never>(e: E) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.left_(RT.Pointed)

/**
 * @category constructors
 * @since 2.0.0
 */
export const right: <R, E = never, A = never>(a: A) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.right_(RT.Pointed)

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightTask: <R, E = never, A = never>(ma: Task<A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.rightTask, fromTaskEither)

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftTask: <R, E = never, A = never>(me: Task<E>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.leftTask, fromTaskEither)

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightReader: <R, E = never, A = never>(ma: Reader<R, A>) => ReaderTaskEither<R, E, A> = (ma) =>
  flow(ma, TE.right)

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftReader: <R, E = never, A = never>(me: Reader<R, E>) => ReaderTaskEither<R, E, A> = (me) =>
  flow(me, TE.left)

/**
 * @category constructors
 * @since 2.5.0
 */
export const rightReaderTask: <R, E = never, A = never>(ma: ReaderTask<R, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.rightF_(RT.Functor)

/**
 * @category constructors
 * @since 2.5.0
 */
export const leftReaderTask: <R, E = never, A = never>(me: ReaderTask<R, E>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.leftF_(RT.Functor)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromIOEither: <R, E, A>(ma: IOEither<E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.fromIOEither, fromTaskEither)

/**
 * @category constructors
 * @since 2.0.0
 */
export const fromReaderEither = <R, E, A>(ma: ReaderEither<R, E, A>): ReaderTaskEither<R, E, A> =>
  flow(ma, TE.fromEither)

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightIO: <R, E = never, A = never>(ma: IO<A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.rightIO, fromTaskEither)

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftIO: <R, E = never, A = never>(me: IO<E>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.leftIO, fromTaskEither)

/**
 * @category constructors
 * @since 2.0.0
 */
export const ask: <R, E = never>() => ReaderTaskEither<R, E, R> = () => TE.right

/**
 * @category constructors
 * @since 2.0.0
 */
export const asks: <R, E = never, A = never>(f: (r: R) => A) => ReaderTaskEither<R, E, A> = (f) =>
  flow(TE.right, TE.map(f))

/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromEither: <R, E, A>(ma: Either<E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  E.fold(left, (a) => right(a))

/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <R, A>(ma: Option<A>) => ReaderTaskEither<R, E, A> = (onNone) => (
  ma
) => (ma._tag === 'None' ? left(onNone()) : right(ma.value))

/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderTaskEither<U, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderTaskEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) => (predicate(a) ? right(a) : left(onFalse(a)))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.0.0
 */
export const fold: <R, E, A, B>(
  onLeft: (e: E) => ReaderTask<R, B>,
  onRight: (a: A) => ReaderTask<R, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B> =
  /*#__PURE__*/
  ET.fold_(RT.Monad)

/**
 * @category destructors
 * @since 2.0.0
 */
export const getOrElse: <R, E, A>(
  onLeft: (e: E) => ReaderTask<R, A>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A> =
  /*#__PURE__*/
  ET.getOrElse_(RT.Monad)

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export const getOrElseW: <R, E, B>(
  onLeft: (e: E) => ReaderTask<R, B>
) => <Q, A>(ma: ReaderTaskEither<Q, E, A>) => ReaderTask<Q & R, A | B> = getOrElse as any

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.0.0
 */
export const orElse: <R, E, A, M>(
  onLeft: (e: E) => ReaderTaskEither<R, M, A>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, M, A> =
  /*#__PURE__*/
  ET.orElse_(RT.Monad)

/**
 * @category combinators
 * @since 2.0.0
 */
export const swap: <R, E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, A, E> =
  /*#__PURE__*/
  ET.swap_(RT.Functor)

// TODO: remove in v3
/**
 * @category combinators
 * @since 2.0.0
 */
export const local: <Q, R>(f: (f: Q) => R) => <E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<Q, E, A> =
  R.local

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @since 2.9.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderTaskEither<R, E1, A>
  ) => ReaderTaskEither<R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderTaskEither<R, E1, A>
  ) => ReaderTaskEither<R, E1 | E2, A>
} = <A, E2>(
  predicate: Predicate<A>,
  onFalse: (a: A) => E2
): (<R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, A>) =>
  chainW((a) => (predicate(a) ? right(a) : left(onFalse(a))))

/**
 * Derivable from `MonadThrow`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderTaskEither<R, E, A>
  ) => ReaderTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
} = filterOrElseW

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> {
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
) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, D | E, B> = (f) => chainW(fromEitherK(f))

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainEitherKW

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> {
  return (...a) => fromIOEither(f(...a))
}

/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainIOEitherKW: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, D | E, B> = (f) => chainW(fromIOEitherK(f))

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainIOEitherKW

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromTaskEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> {
  return (...a) => fromTaskEither(f(...a))
}

/**
 * Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).
 *
 * @category combinators
 * @since 2.6.1
 */
export const chainTaskEitherKW: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, D | E, B> = (f) => chainW(fromTaskEitherK(f))

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainTaskEitherKW

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Monad3<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _apPar: Monad3<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const _apSeq: Monad3<URI>['ap'] = (fab, fa) =>
  pipe(
    fab,
    chain((f) => pipe(fa, map(f)))
  )
/* istanbul ignore next */
const _chain: Monad3<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
/* istanbul ignore next */
const _alt: Alt3<URI>['alt'] = (fa, that) => pipe(fa, alt(that))
/* istanbul ignore next */
const _bimap: Bifunctor3<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const _mapLeft: Bifunctor3<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))

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
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  ET.map_(RT.Functor)

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, B> =
  /*#__PURE__*/
  ET.bimap_(RT.Functor)

/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A> =
  /*#__PURE__*/
  ET.mapLeft_(RT.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <R, E, A>(
  fa: ReaderTaskEither<R, E, A>
) => <B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  ET.ap_(RT.ApplyPar)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export const apW: <Q, D, A>(
  fa: ReaderTaskEither<Q, D, A>
) => <R, E, B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<Q & R, D | E, B> = ap as any

/**
 * @category Pointed
 * @since 2.7.0
 */
export const of: Pointed3<URI>['of'] = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> =
  /*#__PURE__*/
  ET.chain_(RT.Monad)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export const chainW: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => <Q, D>(ma: ReaderTaskEither<Q, D, A>) => ReaderTaskEither<Q & R, D | E, B> = chain as any

/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <R, E, A>(mma: ReaderTaskEither<R, E, ReaderTaskEither<R, E, A>>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export const alt: <R, E, A>(
  that: () => ReaderTaskEither<R, E, A>
) => (fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.alt_(RT.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW: <R2, E2, B>(
  that: () => ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(fa: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A | B> = alt as any

/**
 * @category FromIO
 * @since 2.0.0
 */
export const fromIO: FromIO3<URI>['fromIO'] = rightIO

/**
 * @category FromTask
 * @since 2.0.0
 */
export const fromTask: FromTask3<URI>['fromTask'] = rightTask

/**
 * @category MonadThrow
 * @since 2.0.0
 */
export const throwError: MonadThrow3<URI>['throwError'] = left

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'ReaderTaskEither'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    readonly [URI]: ReaderTaskEither<R, E, A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export function getApplicativeReaderTaskValidation<E>(A: Apply1<T.URI>, S: Semigroup<E>): Applicative3C<URI, E> {
  const ap = ap_(R.Apply, TE.getApplicativeTaskValidation(A, S))
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
export function getAltReaderTaskValidation<E>(S: Semigroup<E>): Alt3C<URI, E> {
  const alt = ET.altValidation_(RT.Monad, S)
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
export const ApplyPar: Apply3<URI> = {
  URI,
  map: _map,
  ap: _apPar
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
  apFirst_(ApplyPar)

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
  apSecond_(ApplyPar)

/**
 * @category instances
 * @since 2.7.0
 */
export const ApplicativePar: Applicative3<URI> = {
  URI,
  map: _map,
  ap: _apPar,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const ApplySeq: Apply3<URI> = {
  URI,
  map: _map,
  ap: _apSeq
}

/**
 * @category instances
 * @since 2.7.0
 */
export const ApplicativeSeq: Applicative3<URI> = {
  URI,
  map: _map,
  ap: _apSeq,
  of
}

const Monad: Monad3<URI> = {
  URI,
  map: _map,
  ap: _apPar,
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
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
export const chainFirstW: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => <Q, D>(ma: ReaderTaskEither<Q, D, A>) => ReaderTaskEither<Q & R, D | E, A> = chainFirst as any

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
 * @since 2.10.0
 */
export const FromIO: FromIO3<URI> = {
  URI,
  fromIO
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromTask: FromTask3<URI> = {
  URI,
  fromIO,
  fromTask
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * Derivable from `MonadThrow`.
 *
 * @since 2.0.4
 */
export function bracket<R, E, A, B>(
  aquire: ReaderTaskEither<R, E, A>,
  use: (a: A) => ReaderTaskEither<R, E, B>,
  release: (a: A, e: Either<E, B>) => ReaderTaskEither<R, E, void>
): ReaderTaskEither<R, E, B> {
  return (r) =>
    TE.bracket(
      aquire(r),
      (a) => use(a)(r),
      (a, e) => release(a, e)(r)
    )
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const Do: ReaderTaskEither<unknown, never, {}> =
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
  f: (a: A) => ReaderTaskEither<Q, D, B>
) => <R, E>(
  fa: ReaderTaskEither<R, E, A>
) => ReaderTaskEither<Q & R, E | D, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplyPar)

/**
 * @since 2.8.0
 */
export const apSW: <A, N extends string, Q, D, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTaskEither<Q, D, B>
) => <R, E>(
  fa: ReaderTaskEither<R, E, A>
) => ReaderTaskEither<Q & R, D | E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <R, E, A, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (arr: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>> = (f) => (arr) => (r) => () =>
  Promise.all(arr.map((x, i) => f(i, x)(r)())).then(E.sequenceArray)

/**
 * @since 2.9.0
 */
export const traverseArray: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (arr: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>> = (f) => traverseArrayWithIndex((_, a) => f(a))

/**
 * @since 2.9.0
 */
export const sequenceArray: <R, E, A>(
  arr: ReadonlyArray<ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity)

/**
 * @since 2.9.0
 */
export const traverseSeqArrayWithIndex: <R, E, A, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (arr: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>> = (f) => (arr) => (r) => async () => {
  // tslint:disable-next-line: readonly-array
  const result = []

  for (let i = 0; i < arr.length; i++) {
    const b = await f(i, arr[i])(r)()
    if (E.isLeft(b)) {
      return b
    }
    result.push(b.right)
  }

  return E.right(result)
}

/**
 * @since 2.9.0
 */
export const traverseSeqArray: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (arr: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>> = (f) =>
  traverseSeqArrayWithIndex((_, a) => f(a))

/**
 * @since 2.9.0
 */
export const sequenceSeqArray: <R, E, A>(
  arr: ReadonlyArray<ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseSeqArray(identity)

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
export const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadTask3<URI> & MonadThrow3<URI> = {
  URI,
  map: _map,
  of,
  ap: _apPar,
  chain: _chain,
  alt: _alt,
  bimap: _bimap,
  mapLeft: _mapLeft,
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
// tslint:disable-next-line: deprecation
export const readerTaskEitherSeq: typeof readerTaskEither = {
  URI,
  map: _map,
  of,
  ap: _apSeq,
  chain: _chain,
  alt: _alt,
  bimap: _bimap,
  mapLeft: _mapLeft,
  fromIO,
  fromTask,
  throwError
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
export const getApplySemigroup: <R, E, A>(S: Semigroup<A>) => Semigroup<ReaderTaskEither<R, E, A>> =
  /*#__PURE__*/
  getApplySemigroup_(ApplySeq)

/**
 * Use `Applicative.getApplicativeMonoid` instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getApplyMonoid: <R, E, A>(M: Monoid<A>) => Monoid<ReaderTaskEither<R, E, A>> =
  /*#__PURE__*/
  getApplicativeMonoid(ApplicativeSeq)

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
export const getSemigroup = <R, E, A>(S: Semigroup<A>): Semigroup<ReaderTaskEither<R, E, A>> =>
  getApplySemigroup_(RT.ApplySeq)(E.getSemigroup(S))

/**
 * Use `getApplicativeReaderTaskValidation` and `getAltReaderTaskValidation` instead.
 *
 * @category instances
 * @since 2.3.0
 * @deprecated
 */
export function getReaderTaskValidation<E>(
  SE: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3<URI> & Alt3C<URI, E> & MonadTask3C<URI, E> & MonadThrow3C<URI, E> {
  const applicativeReaderTaskValidation = getApplicativeReaderTaskValidation(T.ApplicativePar, SE)
  const altReaderTaskValidation = getAltReaderTaskValidation(SE)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    of,
    chain: _chain,
    bimap: _bimap,
    mapLeft: _mapLeft,
    ap: applicativeReaderTaskValidation.ap,
    alt: altReaderTaskValidation.alt,
    fromIO,
    fromTask,
    throwError
  }
}

/**
 * @since 2.0.0
 * @deprecated
 */
/* istanbul ignore next */
export function run<R, E, A>(ma: ReaderTaskEither<R, E, A>, r: R): Promise<Either<E, A>> {
  return ma(r)()
}
