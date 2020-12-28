/**
 * @since 2.3.0
 */
import { Applicative2 } from './Applicative'
import { bindTo_, bind_, flow, identity, pipe } from './function'
import { Functor2 } from './Functor'
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
export const asks: <R, A = never>(f: (r: R) => A) => ReaderTask<R, A> = (f) => flow(T.of, T.map(f))

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
// non-pipeables
// -------------------------------------------------------------------------------------

const map_: Monad2<URI>['map'] = (fa, f) => pipe(fa, map(f))
const apPar_: Monad2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const apSeq_: Monad2<URI>['ap'] = (fab, fa) =>
  pipe(
    fab,
    chain((f) => pipe(fa, map(f)))
  )
const chain_: Monad2<URI>['chain'] = (ma, f) => pipe(ma, chain(f))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.3.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B> = (f) => (fa) =>
  flow(fa, T.map(f))

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export const apW: <Q, A>(fa: ReaderTask<Q, A>) => <R, B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<Q & R, B> = (
  fa
) => (fab) => (r) => pipe(fab(r), T.ap(fa(r)))

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.3.0
 */
export const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B> = apW

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.3.0
 */
export const apFirst: <R, B>(fb: ReaderTask<R, B>) => <A>(fa: ReaderTask<R, A>) => ReaderTask<R, A> = (fb) =>
  flow(
    map((a) => () => a),
    ap(fb)
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.3.0
 */
export const apSecond = <R, B>(fb: ReaderTask<R, B>): (<A>(fa: ReaderTask<R, A>) => ReaderTask<R, B>) =>
  flow(
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.3.0
 */
export const of: Applicative2<URI>['of'] = (a) => () => T.of(a)

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
 * Derivable from `Monad`.
 *
 * @category combinators
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
 * Derivable from `Monad`.
 *
 * @category combinators
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

/**
 * @category instances
 * @since 2.3.0
 */
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>> {
  return R.getSemigroup(T.getSemigroup(S))
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
export const Functor: Functor2<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const ApplicativePar: Applicative2<URI> = {
  URI,
  map: map_,
  ap: apPar_,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const ApplicativeSeq: Applicative2<URI> = {
  URI,
  map: map_,
  ap: apSeq_,
  of
}

/**
 * @internal
 */
export const Monad: Monad2<URI> = {
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

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const Do: ReaderTask<unknown, {}> =
  /*#__PURE__*/
  of({})

/**
 * @since 2.8.0
 */
export const bindTo = <N extends string>(name: N): (<R, A>(fa: ReaderTask<R, A>) => ReaderTask<R, { [K in N]: A }>) =>
  map(bindTo_(name))

/**
 * @since 2.8.0
 */
export const bindW = <N extends string, A, Q, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<Q, B>
): (<R>(fa: ReaderTask<R, A>) => ReaderTask<Q & R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  chainW((a) =>
    pipe(
      f(a),
      map((b) => bind_(a, name, b))
    )
  )

/**
 * @since 2.8.0
 */
export const bind: <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<R, B>
) => (fa: ReaderTask<R, A>) => ReaderTask<R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bindW

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apSW = <A, N extends string, Q, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<Q, B>
): (<R>(fa: ReaderTask<R, A>) => ReaderTask<Q & R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  flow(
    map((a) => (b: B) => bind_(a, name, b)),
    apW(fb)
  )

/**
 * @since 2.8.0
 */
export const apS: <A, N extends string, R, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R, B>
) => (fa: ReaderTask<R, A>) => ReaderTask<R, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apSW

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (arr: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>> = (f) =>
  flow(R.traverseArrayWithIndex(f), R.map(T.sequenceArray))

/**
 * @since 2.9.0
 */
export const traverseArray: <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
) => (arr: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>> = (f) => traverseArrayWithIndex((_, a) => f(a))

/**
 * @since 2.9.0
 */
export const sequenceArray: <R, A>(arr: ReadonlyArray<ReaderTask<R, A>>) => ReaderTask<R, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity)
