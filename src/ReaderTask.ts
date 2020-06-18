/**
 * @since 2.3.0
 */
import { identity, flow, pipe } from './function'
import { IO } from './IO'
import { Monad2 } from './Monad'
import { MonadTask2 } from './MonadTask'
import { Monoid } from './Monoid'
import * as R from './Reader'
import { Semigroup } from './Semigroup'
import * as T from './Task'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import Task = T.Task
import Reader = R.Reader
import { Functor2 } from './Functor'
import { Applicative2 } from './Applicative'

/**
 * @category model
 * @since 2.3.0
 */
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.3.0
 */
export const fromTask: <R, A>(ma: Task<A>) => ReaderTask<R, A> =
  /*#__PURE__*/
  R.of

/**
 * @category constructors
 * @since 2.3.0
 */
export const fromReader: <R, A = never>(ma: Reader<R, A>) => ReaderTask<R, A> = (ma) => flow(ma, T.of)

/**
 * @category constructors
 * @since 2.3.0
 */
export const fromIO: <R, A>(ma: IO<A>) => ReaderTask<R, A> =
  /*#__PURE__*/
  flow(T.fromIO, fromTask)

/**
 * @category constructors
 * @since 2.3.0
 */
export const ask: <R>() => ReaderTask<R, R> = () => T.of

/**
 * @category constructors
 * @since 2.3.0
 */
export const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A> = (f) => (r) => pipe(T.of(r), T.map(f))

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

// TODO: remove in v3
/**
 * @category combinators
 * @since 2.3.0
 */
export const local: <Q, R>(f: (f: Q) => R) => <A>(ma: ReaderTask<R, A>) => ReaderTask<Q, A> = R.local

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): <R>(...a: A) => ReaderTask<R, B> {
  return (...a) => fromIO(f(...a))
}

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> = (f) =>
  chain((a) => fromIO(f(a)))

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromTaskK<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): <R>(...a: A) => ReaderTask<R, B> {
  return (...a) => fromTask(f(...a))
}

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainTaskK: <A, B>(f: (a: A) => Task<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> = (f) =>
  chain((a) => fromTask(f(a)))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 2.3.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B> = (f) => (fa) =>
  flow(fa, T.map(f))

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.3.0
 */
export const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B> = (fa) => (
  fab
) => (r) => pipe(fab(r), T.ap(fa(r)))

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.3.0
 */
export const apFirst = <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>): ReaderTask<R, A> =>
  pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.3.0
 */
export const apSecond = <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>): ReaderTask<R, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @category Applicative
 * @since 2.3.0
 */
export const of: <R, A>(a: A) => ReaderTask<R, A> = (a) => () => T.of(a)

/**
 * Less strict version of  [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.7
 */
export const chainW: <R, A, B>(f: (a: A) => ReaderTask<R, B>) => <Q>(ma: ReaderTask<Q, A>) => ReaderTask<Q & R, B> = (
  f
) => (fa) => (r) =>
  pipe(
    fa(r),
    T.chain((a) => f(a)(r))
  )

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.3.0
 */
export const chain: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B> = chainW

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category Monad
 * @since 2.3.0
 */
export const chainFirst: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * @category Monad
 * @since 2.3.0
 */
export const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A> =
  /*#__PURE__*/
  chain(identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.3.0
 */
export const URI = 'ReaderTask'

/**
 * @category instances
 * @since 2.3.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ReaderTask<E, A>
  }
}

const map_: Monad2<URI>['map'] = (fa, f) => pipe(fa, map(f))
const apPar_: Monad2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const apSeq_: Monad2<URI>['ap'] = (fab, fa) => chain_(fab, (f) => map_(fa, f))
const chain_: Monad2<URI>['chain'] = (ma, f) => pipe(ma, chain(f))

/**
 * @category instances
 * @since 2.3.0
 */
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>> {
  return R.getSemigroup(T.getSemigroup<A>(S))
}

/**
 * @category instances
 * @since 2.3.0
 */
export function getMonoid<R, A>(M: Monoid<A>): Monoid<ReaderTask<R, A>> {
  return {
    concat: getSemigroup<R, A>(M).concat,
    empty: of(M.empty)
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const functorReaderTask: Functor2<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const applicativeReaderTaskPar: Applicative2<URI> = {
  URI,
  map: map_,
  ap: apPar_,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const applicativeReaderTaskSeq: Applicative2<URI> = {
  URI,
  map: map_,
  ap: apSeq_,
  of
}

/**
 * @internal
 */
export const monadReaderTask: Monad2<URI> = {
  URI,
  map: map_,
  of,
  ap: apPar_,
  chain: chain_
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.3.0
 */
export const readerTask: MonadTask2<URI> = {
  URI,
  map: map_,
  of,
  ap: apPar_,
  chain: chain_,
  fromIO,
  fromTask
}

// TODO: remove in v3
/**
 * Like `readerTask` but `ap` is sequential
 *
 * @category instances
 * @since 2.3.0
 */
export const readerTaskSeq: typeof readerTask = {
  URI,
  map: map_,
  of,
  ap: apSeq_,
  chain: chain_,
  fromIO,
  fromTask
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

// TODO: remove in v3
/**
 * @since 2.4.0
 */
/* istanbul ignore next */
export function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A> {
  return ma(r)()
}
