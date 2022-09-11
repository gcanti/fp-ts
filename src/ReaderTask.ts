/**
 * @since 3.0.0
 */
import type { Applicative as Applicative_ } from './Applicative'
import { apFirst as apFirst_, Apply as Apply_, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import { ap as apSeq_, bind as bind_, Chain as Chain_, chainFirst as chainFirst_ } from './Chain'
import {
  chainFirstIOK as chainFirstIOK_,
  chainIOK as chainIOK_,
  FromIO as FromIO_,
  fromIOK as fromIOK_
} from './FromIO'
import {
  ask as ask_,
  asks as asks_,
  chainReaderK as chainReaderK_,
  chainFirstReaderK as chainFirstReaderK_,
  FromReader as FromReader_,
  fromReaderK as fromReaderK_
} from './FromReader'
import {
  chainFirstTaskK as chainFirstTaskK_,
  chainTaskK as chainTaskK_,
  FromTask as FromTask_,
  fromTaskK as fromTaskK_
} from './FromTask'
import { flow, identity, SK } from './function'
import { bindTo as bindTo_, flap as flap_, Functor as Functor_, tupled as tupled_ } from './Functor'
import { HKT } from './HKT'
import * as _ from './internal'
import type { Monad as Monad_ } from './Monad'
import type { Pointed as Pointed_ } from './Pointed'
import * as R from './Reader'
import * as RT from './ReaderT'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
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
 * Less strict version of [`asksReaderTaskK`](#asksreadertaskk).
 *
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderTaskW: <R1, R2, A>(f: (r1: R1) => ReaderTask<R2, A>) => ReaderTask<R1 & R2, A> = R.asksReaderW

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReaderTask: <R, A>(f: (r: R) => ReaderTask<R, A>) => ReaderTask<R, A> = asksReaderTaskW

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReader: FromReader_<ReaderTaskF>['fromReader'] =
  /*#__PURE__*/
  RT.fromReader(T.Pointed)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: FromTask_<ReaderTaskF>['fromTask'] =
  /*#__PURE__*/
  R.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: FromIO_<ReaderTaskF>['fromIO'] =
  /*#__PURE__*/
  flow(T.fromIO, fromTask)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 3.0.0
 */
export const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderTask<R1, A>) => ReaderTask<R2, A> = R.local

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor_<ReaderTaskF>['map'] =
  /*#__PURE__*/
  RT.map(T.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply_<ReaderTaskF>['ap'] =
  /*#__PURE__*/
  RT.ap(T.ApplyPar)

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
export const of: <A, R>(a: A) => ReaderTask<R, A> =
  /*#__PURE__*/
  RT.of(T.Pointed)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: <A, R, B>(
  f: (a: A) => ReaderTask<R, B>
) => (ma: ReaderTask<R, A>) => ReaderTask<R, B> = /*#__PURE__*/ RT.chain(T.Monad)

/**
 * Less strict version of  [`chain`](#chain).
 *
 * @category Chain
 * @since 3.0.0
 */
export const chainW: <A, R2, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B> = chain as any

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 3.0.0
 */
export const flattenW: <R1, R2, A>(mma: ReaderTask<R1, ReaderTask<R2, A>>) => ReaderTask<R1 & R2, A> =
  /*#__PURE__*/
  chainW(identity)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A> = flattenW

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface ReaderTaskF extends HKT {
  readonly type: ReaderTask<this['R'], this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<ReaderTaskF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed_<ReaderTaskF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply_<ReaderTaskF> = {
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
export const ApplicativePar: Applicative_<ReaderTaskF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain_<ReaderTaskF> = {
  map,
  chain
}

const apSeq =
  /*#__PURE__*/
  apSeq_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Applicative_<ReaderTaskF> = {
  map,
  ap: apSeq,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: Applicative_<ReaderTaskF> = {
  map,
  ap: apSeq,
  of
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstW: <A, R2, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A> = chainFirst as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad_<ReaderTaskF> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO_<ReaderTaskF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK =
  /*#__PURE__*/
  fromIOK_(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK =
  /*#__PURE__*/
  chainIOK_(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK =
  /*#__PURE__*/
  chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: FromReader_<ReaderTaskF> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask =
  /*#__PURE__*/
  ask_(FromReader)

/**
 * Projects a value from the global context in a `ReaderTask`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks =
  /*#__PURE__*/
  asks_(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK =
  /*#__PURE__*/
  fromReaderK_(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderK =
  /*#__PURE__*/
  chainReaderK_(FromReader, Chain)

/**
 * Less strict version of [`chainReaderK`](#chainReaderK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderTask<R2, A>) => ReaderTask<R1 & R2, B> = chainReaderK as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderK =
  /*#__PURE__*/
  chainFirstReaderK_(FromReader, Chain)

/**
 * Less strict version of [`chainFirstReaderK`](#chainFirstReaderK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderTask<R2, A>) => ReaderTask<R1 & R2, A> = chainFirstReaderK as any

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask_<ReaderTaskF> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK =
  /*#__PURE__*/
  fromTaskK_(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskK =
  /*#__PURE__*/
  chainTaskK_(FromTask, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskK =
  /*#__PURE__*/
  chainFirstTaskK_(FromTask, Chain)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: ReaderTask<unknown, {}> =
  /*#__PURE__*/
  of(_.emptyRecord)

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
  bind_(Chain)

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => ReaderTask<R2, B>
) => <R1>(
  fa: ReaderTask<R1, A>
) => ReaderTask<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplyPar)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R2, B>
) => <R1>(
  fa: ReaderTask<R1, A>
) => ReaderTask<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReaderTask<unknown, readonly []> =
  /*#__PURE__*/
  of(_.emptyReadonlyArray)

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
  apT_(ApplyPar)

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
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>) =>
  flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(T.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
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
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq = <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>) =>
  flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(T.traverseReadonlyNonEmptyArrayWithIndexSeq(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
): ((as: ReadonlyArray<A>) => ReaderTask<R, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}
