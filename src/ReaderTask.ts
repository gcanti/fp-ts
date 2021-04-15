/**
 * @since 2.3.0
 */
import { Applicative2, getApplicativeMonoid } from './Applicative'
import {
  apFirst as apFirst_,
  Apply2,
  apS as apS_,
  apSecond as apSecond_,
  getApplySemigroup as getApplySemigroup_
} from './Apply'
import { bind as bind_, Chain2, chainFirst as chainFirst_ } from './Chain'
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, FromIO2, fromIOK as fromIOK_ } from './FromIO'
import {
  chainFirstTaskK as chainFirstTaskK_,
  chainTaskK as chainTaskK_,
  FromTask2,
  fromTaskK as fromTaskK_
} from './FromTask'
import { flow, identity, pipe } from './function'
import { bindTo as bindTo_, flap as flap_, Functor2 } from './Functor'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2 } from './MonadTask'
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
export const fromReader: <R, A = never>(ma: Reader<R, A>) => ReaderTask<R, A> =
  /*#__PURE__*/
  RT.fromReader(T.Pointed)

/**
 * @category constructors
 * @since 2.3.0
 */
export const ask = <R>(): ReaderTask<R, R> => T.of

/**
 * @category constructors
 * @since 2.3.0
 */
export const asks = <R, A = never>(f: (r: R) => A): ReaderTask<R, A> => flow(f, T.of)

/**
 * @category constructors
 * @since 2.3.0
 */
export const fromTask: FromTask2<URI>['fromTask'] =
  /*#__PURE__*/
  R.of

/**
 * @category constructors
 * @since 2.3.0
 */
export const fromIO: FromIO2<URI>['fromIO'] =
  /*#__PURE__*/
  flow(T.fromIO, fromTask)

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Monad2<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _apPar: Monad2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const _apSeq: Monad2<URI>['ap'] = (fab, fa) =>
  pipe(
    fab,
    chain((f) => pipe(fa, map(f)))
  )
const _chain: Monad2<URI>['chain'] = (ma, f) => pipe(ma, chain(f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.3.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B> =
  /*#__PURE__*/
  RT.map(T.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.3.0
 */
export const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B> =
  /*#__PURE__*/
  RT.ap(T.ApplyPar)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export const apW: <R2, A>(
  fa: ReaderTask<R2, A>
) => <R1, B>(fab: ReaderTask<R1, (a: A) => B>) => ReaderTask<R1 & R2, B> = ap as any

/**
 * @category Pointed
 * @since 2.3.0
 */
export const of: Pointed2<URI>['of'] =
  /*#__PURE__*/
  RT.of(T.Pointed)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.3.0
 */
export const chain: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B> =
  /*#__PURE__*/
  RT.chain(T.Monad)

/**
 * Less strict version of  [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.7
 */
export const chainW: <R2, A, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B> = chain as any

/**
 * Derivable from `Chain`.
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
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
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
export const Pointed: Pointed2<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const ApplyPar: Apply2<URI> = {
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
 * @since 2.3.0
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
 * @since 2.3.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(ApplyPar)

/**
 * @category instances
 * @since 2.7.0
 */
export const ApplicativePar: Applicative2<URI> = {
  URI,
  map: _map,
  ap: _apPar,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const ApplySeq: Apply2<URI> = {
  URI,
  map: _map,
  ap: _apSeq
}

/**
 * @category instances
 * @since 2.7.0
 */
export const ApplicativeSeq: Applicative2<URI> = {
  URI,
  map: _map,
  ap: _apSeq,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Chain: Chain2<URI> = {
  URI,
  map: _map,
  ap: _apPar,
  chain: _chain
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Monad: Monad2<URI> = {
  URI,
  map: _map,
  of,
  ap: _apPar,
  chain: _chain
}

/**
 * @category instances
 * @since 2.10.0
 */
export const MonadIO: MonadIO2<URI> = {
  URI,
  map: _map,
  of,
  ap: _apPar,
  chain: _chain,
  fromIO
}

/**
 * @category instances
 * @since 2.10.0
 */
export const MonadTask: MonadTask2<URI> = {
  URI,
  map: _map,
  of,
  ap: _apPar,
  chain: _chain,
  fromIO,
  fromTask
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.3.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * @category instances
 * @since 2.10.0
 */
export const FromIO: FromIO2<URI> = {
  URI,
  fromIO
}

/**
 * @category combinators
 * @since 2.4.0
 */
export const fromIOK =
  /*#__PURE__*/
  fromIOK_(FromIO)

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainIOK =
  /*#__PURE__*/
  chainIOK_(FromIO, Chain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstIOK =
  /*#__PURE__*/
  chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 2.10.0
 */
export const FromTask: FromTask2<URI> = {
  URI,
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 2.4.0
 */
export const fromTaskK =
  /*#__PURE__*/
  fromTaskK_(FromTask)

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainTaskK =
  /*#__PURE__*/
  chainTaskK_(FromTask, Chain)

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstTaskK =
  /*#__PURE__*/
  chainFirstTaskK_(FromTask, Chain)

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
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 2.8.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

/**
 * @since 2.8.0
 */
export const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(
  fa: ReaderTask<R1, A>
) => ReaderTask<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

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
export const apSW: <A, N extends string, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R2, B>
) => <R1>(
  fa: ReaderTask<R1, A>
) => ReaderTask<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 2.9.0
 */
export const traverseArrayWithIndex = <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) =>
  flow(R.traverseArrayWithIndex(f), R.map(T.sequenceArray))

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 2.9.0
 */
export const traverseArray = <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) => traverseArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 2.9.0
 */
export const sequenceArray: <R, A>(arr: ReadonlyArray<ReaderTask<R, A>>) => ReaderTask<R, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity)

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 2.10.0
 */
export const traverseSeqArrayWithIndex = <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) =>
  flow(R.traverseArrayWithIndex(f), R.map(T.sequenceSeqArray))

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @since 2.10.0
 */
export const traverseSeqArray = <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) => traverseSeqArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @since 2.10.0
 */
export const sequenceSeqArray: <R, A>(arr: ReadonlyArray<ReaderTask<R, A>>) => ReaderTask<R, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseSeqArray(identity)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// tslint:disable: deprecation

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.3.0
 * @deprecated
 */
export const readerTask: MonadTask2<URI> = {
  URI,
  map: _map,
  of,
  ap: _apPar,
  chain: _chain,
  fromIO,
  fromTask
}

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.3.0
 * @deprecated
 */

export const readerTaskSeq: typeof readerTask = {
  URI,
  map: _map,
  of,
  ap: _apSeq,
  chain: _chain,
  fromIO,
  fromTask
}

/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getApplySemigroup) instead.
 *
 * @category instances
 * @since 2.3.0
 * @deprecated
 */
export const getSemigroup: <R, A>(S: Semigroup<A>) => Semigroup<ReaderTask<R, A>> =
  /*#__PURE__*/
  getApplySemigroup_(ApplySeq)

/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getApplicativeMonoid) instead.
 *
 * @category instances
 * @since 2.3.0
 * @deprecated
 */
export const getMonoid: <R, A>(M: Monoid<A>) => Monoid<ReaderTask<R, A>> =
  /*#__PURE__*/
  getApplicativeMonoid(ApplicativeSeq)

/**
 * @since 2.4.0
 * @deprecated
 */
/* istanbul ignore next */
export function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A> {
  return ma(r)()
}

/**
 * Use [`local`](./Reader.ts.html#local) instead.
 *
 * @category combinators
 * @since 2.3.0
 * @deprecated
 */
export const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderTask<R1, A>) => ReaderTask<R2, A> = R.local
