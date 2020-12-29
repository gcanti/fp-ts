/**
 * @since 3.0.0
 */
import { Applicative2 } from './Applicative'
import { apFirst_, Apply2, apSecond_, apS_, apT_ } from './Apply'
import { FromIO2 } from './FromIO'
import { FromTask2 } from './FromTask'
import { flow, identity, pipe } from './function'
import { bindTo_, Functor2, tupled_ } from './Functor'
import { IO } from './IO'
import { bind_, chainFirst_, Monad2 } from './Monad'
import { Monoid } from './Monoid'
import { Pointed2 } from './Pointed'
import * as R from './Reader'
import * as RT from './ReaderT'
import { Semigroup } from './Semigroup'
import * as T from './Task'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import Task = T.Task

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromTask: <R, A>(ma: Task<A>) => ReaderTask<R, A> = R.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReader =
  /*#__PURE__*/
  RT.fromReader_(T.Pointed)

/**
 * @category FromIO
 * @since 3.0.0
 */
export const fromIO: FromIO2<URI>['fromIO'] =
  /*#__PURE__*/
  flow(T.fromIO, fromTask)

/**
 * @category constructors
 * @since 3.0.0
 */
export const ask =
  /*#__PURE__*/
  RT.ask_(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const asks =
  /*#__PURE__*/
  RT.asks_(T.Pointed)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
): (<R>(...a: A) => ReaderTask<R, B>) => (...a) => fromIO(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> = (f) =>
  chain((a) => fromIO(f(a)))

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Task<B>
): (<R>(...a: A) => ReaderTask<R, B>) => (...a) => fromTask(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskK: <A, B>(f: (a: A) => Task<B>) => <R>(ma: ReaderTask<R, A>) => ReaderTask<R, B> = (f) =>
  chain((a) => fromTask(f(a)))

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor2<URI>['map'] =
  /*#__PURE__*/
  RT.map_(T.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply2<URI>['ap'] =
  /*#__PURE__*/
  RT.ap_(T.ApplyPar)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 3.0.0
 */
export const apW: <R2, A>(
  fa: ReaderTask<R2, A>
) => <R1, B>(fab: ReaderTask<R1, (a: A) => B>) => ReaderTask<R1 & R2, B> = ap as any

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: Pointed2<URI>['of'] =
  /*#__PURE__*/
  RT.of_(T.Pointed)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 3.0.0
 */
export const chain: Monad2<URI>['chain'] =
  /*#__PURE__*/
  RT.chain_(T.Monad)

/**
 * Less strict version of  [`chain`](#chain).
 *
 * @category Monad
 * @since 3.0.0
 */
export const chainW: <A, R2, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B> = chain as any

/**
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A> =
  /*#__PURE__*/
  chain(identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const URI = 'ReaderTask'

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ReaderTask<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A, R>(S: Semigroup<A>): Semigroup<ReaderTask<R, A>> => R.getSemigroup(T.getSemigroup(S))

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A, R>(M: Monoid<A>): Monoid<ReaderTask<R, A>> => ({
  concat: getSemigroup<A, R>(M).concat,
  empty: of(M.empty)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed2<URI> = {
  URI,
  map,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply2<URI> = {
  URI,
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: Applicative2<URI> = {
  URI,
  map,
  ap,
  of
}

const apSeq: Apply2<URI>['ap'] = (fa) => chain((f) => pipe(fa, map(f)))

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Applicative2<URI> = {
  URI,
  map,
  ap: apSeq,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: Applicative2<URI> = {
  URI,
  map,
  ap: apSeq,
  of
}

/**
 * @internal
 */
export const Monad: Monad2<URI> = {
  URI,
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO2<URI> = {
  URI,
  fromIO
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask2<URI> = {
  URI,
  fromIO,
  fromTask
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: ReaderTask<unknown, {}> =
  /*#__PURE__*/
  of({})

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Monad)

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(
  fa: ReaderTask<R1, A>
) => ReaderTask<R1 & R2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplicativePar)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <A, N extends string, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R2, B>
) => <R1>(
  fa: ReaderTask<R1, A>
) => ReaderTask<R1 & R2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReaderTask<unknown, readonly []> = of([])

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT =
  /*#__PURE__*/
  apT_(ApplicativePar)

/**
 * Less strict version of [`apT`](#apT).
 *
 * @since 3.0.0
 */
export const apTW: <R2, B>(
  fb: ReaderTask<R2, B>
) => <R1, A extends ReadonlyArray<unknown>>(
  fas: ReaderTask<R1, A>
) => ReaderTask<R1 & R2, readonly [...A, B]> = apT as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (arr: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>> = (f) =>
  flow(R.traverseArrayWithIndex(f), R.map(T.sequenceArray))

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseArray: <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
) => (arr: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>> = (f) => traverseArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceArray: <R, A>(arr: ReadonlyArray<ReaderTask<R, A>>) => ReaderTask<R, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity)
