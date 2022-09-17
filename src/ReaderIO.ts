/**
 * @since 3.0.0
 */
import { Applicative as Applicative_ } from './Applicative'
import { apFirst as apFirst_, Apply as Apply_, apS as apS_, apSecond as apSecond_ } from './Apply'
import { bind as bind_, Chain as Chain_, chainFirst as chainFirst_ } from './Chain'
import {
  chainFirstIOK as chainFirstIOK_,
  chainIOK as chainIOK_,
  FromIO as FromIO_,
  fromIOK as fromIOK_
} from './FromIO'
import {
  ask as ask_,
  asks as asks_,
  chainFirstReaderK as chainFirstReaderK_,
  chainReaderK as chainReaderK_,
  FromReader as FromReader_,
  fromReaderK as fromReaderK_
} from './FromReader'
import { flow, identity, SK } from './function'
import { bindTo as bindTo_, flap as flap_, Functor as Functor_, let as let__ } from './Functor'
import { HKT } from './HKT'
import * as _ from './internal'
import * as I from './IO'
import { Monad as Monad_ } from './Monad'
import { Pointed as Pointed_ } from './Pointed'
import * as R from './Reader'
import * as RT from './ReaderT'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'

/**
 * @category model
 * @since 3.0.0
 */

export interface ReaderIO<R, A> {
  (r: R): I.IO<A>
}

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromReader: <R, A>(fa: R.Reader<R, A>) => ReaderIO<R, A> = /*#__PURE__*/ RT.fromReader(I.Pointed)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A, R = unknown>(fa: I.IO<A>) => ReaderIO<R, A> = /*#__PURE__*/ R.of

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
export const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderIO<R1, A>) => ReaderIO<R2, A> = R.local

/**
 * Effectfully accesses the environment.
 *
 * @category combinators
 * @since 3.0.0
 */
export const asksReaderIO: <R1, R2, A>(f: (r1: R1) => ReaderIO<R2, A>) => ReaderIO<R1 & R2, A> = R.asksReader

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderIO<R, A>) => ReaderIO<R, B> = /*#__PURE__*/ RT.map(I.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <R2, A>(
  fa: ReaderIO<R2, A>
) => <R1, B>(fab: ReaderIO<R1, (a: A) => B>) => ReaderIO<R1 & R2, B> = /*#__PURE__*/ RT.ap(I.Apply)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, R = unknown>(a: A) => ReaderIO<R, A> = /*#__PURE__*/ RT.of(I.Pointed)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 3.0.0
 */
export const chain: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B> = /*#__PURE__*/ RT.chain(I.Monad)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <R1, R2, A>(mma: ReaderIO<R1, ReaderIO<R2, A>>) => ReaderIO<R1 & R2, A> = /*#__PURE__*/ chain(
  identity
)

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface ReaderIOF extends HKT {
  readonly type: ReaderIO<this['Contravariant1'], this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<ReaderIOF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, B>(fab: ReaderIO<R, (a: A) => B>) => ReaderIO<R, B> = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed_<ReaderIOF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply_<ReaderIOF> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const apFirst: <R, B>(
  second: ReaderIO<R, B>
) => <A>(first: ReaderIO<R, A>) => ReaderIO<R, A> = /*#__PURE__*/ apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const apSecond: <R, B>(
  second: ReaderIO<R, B>
) => <A>(first: ReaderIO<R, A>) => ReaderIO<R, B> = /*#__PURE__*/ apSecond_(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative_<ReaderIOF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain_<ReaderIOF> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad_<ReaderIOF> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirst: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A> = /*#__PURE__*/ chainFirst_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO_<ReaderIOF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => I.IO<B>
) => <R = unknown>(...a: A) => ReaderIO<R, B> = /*#__PURE__*/ fromIOK_(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(
  f: (a: A) => I.IO<B>
) => <R>(first: ReaderIO<R, A>) => ReaderIO<R, B> = /*#__PURE__*/ chainIOK_(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(
  f: (a: A) => I.IO<B>
) => <R>(first: ReaderIO<R, A>) => ReaderIO<R, A> = /*#__PURE__*/ chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: FromReader_<ReaderIOF> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R>() => ReaderIO<R, R> = /*#__PURE__*/ ask_(FromReader)

/**
 * Projects a value from the global context in a `ReaderIO`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderIO<R, A> = /*#__PURE__*/ asks_(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => R.Reader<R, B>
) => (...a: A) => ReaderIO<R, B> = /*#__PURE__*/ fromReaderK_(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderK: <A, R2, B>(
  f: (a: A) => R.Reader<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B> = /*#__PURE__*/ chainReaderK_(FromReader, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstReaderK: <A, R2, B>(
  f: (a: A) => R.Reader<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A> = /*#__PURE__*/ chainFirstReaderK_(FromReader, Chain)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: ReaderIO<unknown, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <R, A>(fa: ReaderIO<R, A>) => ReaderIO<R, { readonly [K in N]: A }> = /*#__PURE__*/ bindTo_(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(
  fa: ReaderIO<R, A>
) => ReaderIO<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ let__(Functor)

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => ReaderIO<R2, B>
) => <R1>(
  fa: ReaderIO<R1, A>
) => ReaderIO<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ bind_(Chain)

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderIO<R2, B>
) => <R1>(
  fa: ReaderIO<R1, A>
) => ReaderIO<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ apS_(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReaderIO<unknown, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderIO<R, ReadonlyNonEmptyArray<B>>) =>
  flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(I.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
): ((as: ReadonlyArray<A>) => ReaderIO<R, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderIO<R, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
): ((as: ReadonlyArray<A>) => ReaderIO<R, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, A>(
  arr: ReadonlyArray<ReaderIO<R, A>>
) => ReaderIO<R, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)
