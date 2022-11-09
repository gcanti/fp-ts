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
  ask as ask_,
  asks as asks_,
  chainFirstReaderK as chainFirstReaderK_,
  chainReaderK as chainReaderK_,
  FromReader2,
  fromReaderK as fromReaderK_
} from './FromReader'
import {
  chainFirstTaskK as chainFirstTaskK_,
  chainTaskK as chainTaskK_,
  FromTask2,
  fromTaskK as fromTaskK_
} from './FromTask'
import { flow, identity, pipe, SK } from './function'
import { let as let__, bindTo as bindTo_, flap as flap_, Functor2 } from './Functor'
import * as _ from './internal'
import { IO } from './IO'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadTask2 } from './MonadTask'
import { Monoid } from './Monoid'
import { Pointed2 } from './Pointed'
import * as R from './Reader'
import * as RIO from './ReaderIO'
import * as RT from './ReaderT'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Semigroup } from './Semigroup'
import * as T from './Task'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import ReaderIO = RIO.ReaderIO
import Task = T.Task

/**
 * @category model
 * @since 2.3.0
 */
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

/**
 * @category conversions
 * @since 2.3.0
 */
export const fromReader: <R, A>(fa: R.Reader<R, A>) => ReaderTask<R, A> = /*#__PURE__*/ RT.fromReader(T.Pointed)

/**
 * @category conversions
 * @since 2.3.0
 */
export const fromTask: <A, R = unknown>(fa: Task<A>) => ReaderTask<R, A> = /*#__PURE__*/ R.of

/**
 * @category conversions
 * @since 2.3.0
 */
export const fromIO: <A, R = unknown>(fa: IO<A>) => ReaderTask<R, A> = /*#__PURE__*/ flow(T.fromIO, fromTask)

/**
 * @category conversions
 * @since 2.13.0
 */
export const fromReaderIO: <R, A>(fa: ReaderIO<R, A>) => ReaderTask<R, A> = R.map(T.fromIO)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.3.0
 */
export const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderTask<R1, A>) => ReaderTask<R2, A> = R.local

/**
 * Less strict version of [`asksReaderTask`](#asksreadertask).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category constructors
 * @since 2.11.0
 */
export const asksReaderTaskW: <R1, R2, A>(f: (r1: R1) => ReaderTask<R2, A>) => ReaderTask<R1 & R2, A> = R.asksReaderW

/**
 * Effectfully accesses the environment.
 *
 * @category constructors
 * @since 2.11.0
 */
export const asksReaderTask: <R, A>(f: (r: R) => ReaderTask<R, A>) => ReaderTask<R, A> = asksReaderTaskW

const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _apPar: Apply2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const _apSeq: Apply2<URI>['ap'] = (fab, fa) =>
  pipe(
    fab,
    chain((f) => pipe(fa, map(f)))
  )
const _chain: Chain2<URI>['chain'] = (ma, f) => pipe(ma, chain(f))

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.3.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderTask<R, A>) => ReaderTask<R, B> = /*#__PURE__*/ RT.map(
  T.Functor
)

/**
 * @since 2.3.0
 */
export const ap: <R, A>(fa: ReaderTask<R, A>) => <B>(fab: ReaderTask<R, (a: A) => B>) => ReaderTask<R, B> =
  /*#__PURE__*/ RT.ap(T.ApplyPar)

/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @since 2.8.0
 */
export const apW: <R2, A>(
  fa: ReaderTask<R2, A>
) => <R1, B>(fab: ReaderTask<R1, (a: A) => B>) => ReaderTask<R1 & R2, B> = ap as any

/**
 * @category constructors
 * @since 2.3.0
 */
export const of: <R = unknown, A = never>(a: A) => ReaderTask<R, A> = /*#__PURE__*/ RT.of(T.Pointed)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category sequencing
 * @since 2.3.0
 */
export const chain: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B> =
  /*#__PURE__*/ RT.chain(T.Monad)

/**
 * Less strict version of  [`chain`](#chain).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.6.7
 */
export const chainW: <R2, A, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B> = chain as any

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export const flattenW: <R1, R2, A>(mma: ReaderTask<R1, ReaderTask<R2, A>>) => ReaderTask<R1 & R2, A> =
  /*#__PURE__*/ chainW(identity)

/**
 * @category sequencing
 * @since 2.3.0
 */
export const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A> = flattenW

/**
 * @category type lambdas
 * @since 2.3.0
 */
export const URI = 'ReaderTask'

/**
 * @category type lambdas
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
 * @category mapping
 * @since 2.10.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed2<URI> = {
  URI,
  of
}

/**
 * Runs computations in parallel.
 *
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
 * @since 2.3.0
 */
export const apFirst = /*#__PURE__*/ apFirst_(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.3.0
 */
export const apSecond = /*#__PURE__*/ apSecond_(ApplyPar)

/**
 * Runs computations in parallel.
 *
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
 * Runs computations sequentially.
 *
 * @category instances
 * @since 2.10.0
 */
export const ApplySeq: Apply2<URI> = {
  URI,
  map: _map,
  ap: _apSeq
}

/**
 * Runs computations sequentially.
 *
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
 * @category sequencing
 * @since 2.3.0
 */
export const chainFirst: <A, R, B>(f: (a: A) => ReaderTask<R, B>) => (first: ReaderTask<R, A>) => ReaderTask<R, A> =
  /*#__PURE__*/ chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export const chainFirstW: <R2, A, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A> = chainFirst as any

/**
 * @category instances
 * @since 2.10.0
 */
export const FromIO: FromIO2<URI> = {
  URI,
  fromIO
}

/**
 * @category lifting
 * @since 2.4.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IO<B>
) => <R = unknown>(...a: A) => ReaderTask<R, B> = /*#__PURE__*/ fromIOK_(FromIO)

/**
 * @category sequencing
 * @since 2.4.0
 */
export const chainIOK: <A, B>(f: (a: A) => IO<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, B> =
  /*#__PURE__*/ chainIOK_(FromIO, Chain)

/**
 * @category sequencing
 * @since 2.10.0
 */
export const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, A> =
  /*#__PURE__*/ chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 2.11.0
 */
export const FromReader: FromReader2<URI> = {
  URI,
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 2.3.0
 */
export const ask = /*#__PURE__*/ ask_(FromReader)

/**
 * Projects a value from the global context in a `ReaderTask`.
 *
 * @category constructors
 * @since 2.3.0
 */
export const asks = /*#__PURE__*/ asks_(FromReader)

/**
 * @category lifting
 * @since 2.11.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => R.Reader<R, B>
) => (...a: A) => ReaderTask<R, B> = /*#__PURE__*/ fromReaderK_(FromReader)

/**
 * @category sequencing
 * @since 2.11.0
 */
export const chainReaderK: <A, R, B>(f: (a: A) => R.Reader<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B> =
  /*#__PURE__*/ chainReaderK_(FromReader, Chain)

/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export const chainReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderTask<R2, A>) => ReaderTask<R1 & R2, B> = chainReaderK as any

/**
 * @category sequencing
 * @since 2.11.0
 */
export const chainFirstReaderK: <A, R, B>(f: (a: A) => R.Reader<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, A> =
  /*#__PURE__*/ chainFirstReaderK_(FromReader, Chain)

/**
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderTask<R2, A>) => ReaderTask<R1 & R2, A> = chainFirstReaderK as any

/**
 * @category lifting
 * @since 2.13.0
 */
export const fromReaderIOK =
  <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => ReaderIO<R, B>): ((...a: A) => ReaderTask<R, B>) =>
  (...a) =>
    fromReaderIO(f(...a))

/**
 * Less strict version of [`chainReaderIOK`](#chainreaderiok).
 *
 * @category sequencing
 * @since 2.13.0
 */
export const chainReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B> = (f) => chainW(fromReaderIOK(f))

/**
 * @category sequencing
 * @since 2.13.0
 */
export const chainReaderIOK: <A, R, B>(f: (a: A) => ReaderIO<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B> =
  chainReaderIOKW

/**
 * Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).
 *
 * @category sequencing
 * @since 2.13.0
 */
export const chainFirstReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A> = (f) => chainFirstW(fromReaderIOK(f))

/**
 * @category sequencing
 * @since 2.13.0
 */
export const chainFirstReaderIOK: <A, R, B>(f: (a: A) => ReaderIO<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, A> =
  chainFirstReaderIOKW

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
 * @category lifting
 * @since 2.4.0
 */
export const fromTaskK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => T.Task<B>
) => <R = unknown>(...a: A) => ReaderTask<R, B> = /*#__PURE__*/ fromTaskK_(FromTask)

/**
 * @category sequencing
 * @since 2.4.0
 */
export const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, B> =
  /*#__PURE__*/ chainTaskK_(FromTask, Chain)

/**
 * @category sequencing
 * @since 2.10.0
 */
export const chainFirstTaskK: <A, B>(f: (a: A) => T.Task<B>) => <R>(first: ReaderTask<R, A>) => ReaderTask<R, A> =
  /*#__PURE__*/ chainFirstTaskK_(FromTask, Chain)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 2.9.0
 */
export const Do: ReaderTask<unknown, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @category do notation
 * @since 2.8.0
 */
export const bindTo = /*#__PURE__*/ bindTo_(Functor)

const let_ = /*#__PURE__*/ let__(Functor)

export {
  /**
   * @category do notation
   * @since 2.13.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 2.8.0
 */
export const bind = /*#__PURE__*/ bind_(Chain)

/**
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
export const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(fa: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  bind as any

/**
 * @category do notation
 * @since 2.8.0
 */
export const apS = /*#__PURE__*/ apS_(ApplyPar)

/**
 * Less strict version of [`apS`](#aps).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
export const apSW: <A, N extends string, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R2, B>
) => <R1>(fa: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  apS as any

/**
 * @since 2.11.0
 */
export const ApT: ReaderTask<unknown, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>) =>
  flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(T.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq = <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>) =>
  flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(T.traverseReadonlyNonEmptyArrayWithIndexSeq(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndexSeq = <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>> = traverseReadonlyArrayWithIndex

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const traverseArray = <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) => traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const sequenceArray: <R, A>(arr: ReadonlyArray<ReaderTask<R, A>>) => ReaderTask<R, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseArray(identity)

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.10.0
 */
export const traverseSeqArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>> = traverseReadonlyArrayWithIndexSeq

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.10.0
 */
export const traverseSeqArray = <R, A, B>(
  f: (a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) => traverseReadonlyArrayWithIndexSeq((_, a) => f(a))

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `traverseReadonlyArrayWithIndexSeq` instead.
 *
 * @category zone of death
 * @since 2.10.0
 * @deprecated
 */
export const sequenceSeqArray: <R, A>(arr: ReadonlyArray<ReaderTask<R, A>>) => ReaderTask<R, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseSeqArray(identity)

/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RT.Functor` instead of `RT.readerTask`
 * (where `RT` is from `import RT from 'fp-ts/ReaderTask'`)
 *
 * @category zone of death
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
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RT.Functor` instead of `RT.readerTaskSeq`
 * (where `RT` is from `import RT from 'fp-ts/ReaderTask'`)
 *
 * @category zone of death
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
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.3.0
 * @deprecated
 */
export const getSemigroup: <R, A>(S: Semigroup<A>) => Semigroup<ReaderTask<R, A>> =
  /*#__PURE__*/ getApplySemigroup_(ApplySeq)

/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.3.0
 * @deprecated
 */
export const getMonoid: <R, A>(M: Monoid<A>) => Monoid<ReaderTask<R, A>> =
  /*#__PURE__*/ getApplicativeMonoid(ApplicativeSeq)

/**
 * @category zone of death
 * @since 2.4.0
 * @deprecated
 */
/* istanbul ignore next */
export function run<R, A>(ma: ReaderTask<R, A>, r: R): Promise<A> {
  return ma(r)()
}
