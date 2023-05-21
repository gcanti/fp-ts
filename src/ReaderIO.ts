/**
 * @since 2.13.0
 */
import { Applicative2 } from './Applicative'
import { apFirst as apFirst_, Apply2, apS as apS_, apSecond as apSecond_ } from './Apply'
import * as chainable from './Chain'
import { FromIO2, fromIOK as fromIOK_, tapIO as tapIO_ } from './FromIO'
import {
  ask as ask_,
  asks as asks_,
  chainReaderK as chainReaderK_,
  FromReader2,
  fromReaderK as fromReaderK_,
  tapReader as tapReader_
} from './FromReader'
import { dual, flow, identity, pipe, SK } from './function'
import { as as as_, asUnit as asUnit_, bindTo as bindTo_, flap as flap_, Functor2 } from './Functor'
import * as _ from './internal'
import * as I from './IO'
import { IO } from './IO'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { Pointed2 } from './Pointed'
import * as R from './Reader'
import { Reader } from './Reader'
import * as RT from './ReaderT'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'

/**
 * @category model
 * @since 2.13.0
 */

export interface ReaderIO<R, A> {
  (r: R): I.IO<A>
}

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

/**
 * @category conversions
 * @since 2.13.0
 */
export const fromReader: <R, A>(fa: Reader<R, A>) => ReaderIO<R, A> = /*#__PURE__*/ RT.fromReader(I.Pointed)

/**
 * @category conversions
 * @since 2.13.0
 */
export const fromIO: <A, R = unknown>(fa: IO<A>) => ReaderIO<R, A> = /*#__PURE__*/ R.of

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.13.0
 */
export const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderIO<R1, A>) => ReaderIO<R2, A> = R.local

/**
 * Less strict version of [`asksReaderIO`](#asksreaderio).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category constructors
 * @since 2.13.0
 */
export const asksReaderIOW: <R1, R2, A>(f: (r1: R1) => ReaderIO<R2, A>) => ReaderIO<R1 & R2, A> = R.asksReaderW

/**
 * Effectfully accesses the environment.
 *
 * @category constructors
 * @since 2.13.0
 */
export const asksReaderIO: <R, A>(f: (r: R) => ReaderIO<R, A>) => ReaderIO<R, A> = asksReaderIOW

const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _ap: Apply2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.13.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderIO<R, A>) => ReaderIO<R, B> = /*#__PURE__*/ RT.map(I.Functor)

/**
 * @since 2.13.0
 */
export const ap: <R, A>(fa: ReaderIO<R, A>) => <B>(fab: ReaderIO<R, (a: A) => B>) => ReaderIO<R, B> =
  /*#__PURE__*/ RT.ap(I.Apply)

/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @since 2.13.0
 */
export const apW: <R2, A>(fa: ReaderIO<R2, A>) => <R1, B>(fab: ReaderIO<R1, (a: A) => B>) => ReaderIO<R1 & R2, B> =
  ap as any

/**
 * @category constructors
 * @since 2.13.0
 */
export const of: <R = unknown, A = never>(a: A) => ReaderIO<R, A> = /*#__PURE__*/ RT.of(I.Pointed)

/**
 * @category sequencing
 * @since 2.14.0
 */
export const flatMap: {
  <A, R2, B>(f: (a: A) => ReaderIO<R2, B>): <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B>
  <R1, A, R2, B>(ma: ReaderIO<R1, A>, f: (a: A) => ReaderIO<R2, B>): ReaderIO<R1 & R2, B>
} = /*#__PURE__*/ dual(2, RT.flatMap(I.Monad))

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.13.0
 */
export const flattenW: <R1, R2, A>(mma: ReaderIO<R1, ReaderIO<R2, A>>) => ReaderIO<R1 & R2, A> =
  /*#__PURE__*/ flatMap(identity)

/**
 * @category sequencing
 * @since 2.13.0
 */
export const flatten: <R, A>(mma: ReaderIO<R, ReaderIO<R, A>>) => ReaderIO<R, A> = flattenW

/**
 * @category type lambdas
 * @since 2.13.0
 */
export const URI = 'ReaderIO'

/**
 * @category type lambdas
 * @since 2.13.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ReaderIO<E, A>
  }
}

/**
 * @category instances
 * @since 2.13.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * Maps the value to the specified constant value.
 *
 * @category mapping
 * @since 2.16.0
 */
export const as: {
  <R, A, _>(self: ReaderIO<R, _>, a: A): ReaderIO<R, A>
  <A>(a: A): <R, _>(self: ReaderIO<R, _>) => ReaderIO<R, A>
} = dual(2, as_(Functor))

/**
 * Maps the value to the void constant value.
 *
 * @category mapping
 * @since 2.16.0
 */
export const asUnit: <R, _>(self: ReaderIO<R, _>) => ReaderIO<R, void> = asUnit_(Functor)

/**
 * @category mapping
 * @since 2.13.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 2.13.0
 */
export const Pointed: Pointed2<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 2.13.0
 */
export const Apply: Apply2<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.13.0
 */
export const apFirst = /*#__PURE__*/ apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.13.0
 */
export const apSecond = /*#__PURE__*/ apSecond_(Apply)

/**
 * @category instances
 * @since 2.13.0
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 2.13.0
 */
export const Chain: chainable.Chain2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  chain: flatMap
}

/**
 * @category instances
 * @since 2.13.0
 */
export const Monad: Monad2<URI> = {
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: flatMap
}

/**
 * @category instances
 * @since 2.13.0
 */
export const MonadIO: MonadIO2<URI> = {
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: flatMap,
  fromIO
}

/**
 * @category instances
 * @since 2.13.0
 */
export const FromIO: FromIO2<URI> = {
  URI,
  fromIO
}

/**
 * @category instances
 * @since 2.13.0
 */
export const FromReader: FromReader2<URI> = {
  URI,
  fromReader
}

/** @internal */
interface ReaderIOTypeLambda extends _.TypeLambda {
  readonly type: ReaderIO<this['Out1'], this['Target']>
}

/** @internal */
const _FlatMap: _.FlatMap<ReaderIOTypeLambda> = {
  flatMap
}

/** @internal */
const _FromIO: _.FromIO<ReaderIOTypeLambda> = {
  fromIO: FromIO.fromIO
}

/**
 * @category sequencing
 * @since 2.16.0
 */
export const flatMapIO: {
  <A, B>(f: (a: A) => IO<B>): <R>(ma: ReaderIO<R, A>) => ReaderIO<R, B>
  <R, A, B>(ma: ReaderIO<R, A>, f: (a: A) => IO<B>): ReaderIO<R, B>
} = _.flatMapIO(_FromIO, _FlatMap)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category combinators
 * @since 2.15.0
 */
export const tap: {
  <R1, A, R2, _>(self: ReaderIO<R1, A>, f: (a: A) => ReaderIO<R2, _>): ReaderIO<R1 & R2, A>
  <A, R2, _>(f: (a: A) => ReaderIO<R2, _>): <R1>(self: ReaderIO<R1, A>) => ReaderIO<R2 & R1, A>
} = /*#__PURE__*/ dual(2, chainable.tap(Chain))

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as RIO from 'fp-ts/ReaderIO'
 * import * as Console from 'fp-ts/Console'
 *
 * // Will produce `Hello, fp-ts` to the stdout
 * const effect = pipe(
 *   RIO.ask<string>(),
 *   RIO.tapIO((value) => Console.log(`Hello, ${value}`)),
 * )
 *
 * async function test() {
 *   assert.deepStrictEqual(effect('fp-ts')(), 'fp-ts')
 * }
 *
 * test()
 *
 * @category combinators
 * @since 2.16.0
 */
export const tapIO: {
  <R, A, _>(self: ReaderIO<R, A>, f: (a: A) => IO<_>): ReaderIO<R, A>
  <A, _>(f: (a: A) => IO<_>): <R>(self: ReaderIO<R, A>) => ReaderIO<R, A>
} = /*#__PURE__*/ dual(2, tapIO_(FromIO, Chain))

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category combinators
 * @since 2.16.0
 */
export const tapReader: {
  <R1, A, R2, _>(self: ReaderIO<R1, A>, f: (a: A) => Reader<R2, _>): ReaderIO<R1 & R2, A>
  <R2, A, _>(f: (a: A) => Reader<R2, _>): <R1>(self: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A>
} = /*#__PURE__*/ dual(2, tapReader_(FromReader, Chain))

/**
 * @category lifting
 * @since 2.13.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => I.IO<B>
) => <R = unknown>(...a: A) => ReaderIO<R, B> = /*#__PURE__*/ fromIOK_(FromIO)

/**
 * Alias of `flatMapIO`.
 *
 * @category legacy
 * @since 2.13.0
 */
export const chainIOK: <A, B>(f: (a: A) => I.IO<B>) => <E>(first: ReaderIO<E, A>) => ReaderIO<E, B> = flatMapIO

/**
 * Alias of `tapIO`.
 *
 * @category legacy
 * @since 2.13.0
 */
export const chainFirstIOK: <A, B>(f: (a: A) => I.IO<B>) => <E>(first: ReaderIO<E, A>) => ReaderIO<E, A> = tapIO

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 2.13.0
 */
export const ask = /*#__PURE__*/ ask_(FromReader)

/**
 * Projects a value from the global context in a `ReaderIO`.
 *
 * @category constructors
 * @since 2.13.0
 */
export const asks = /*#__PURE__*/ asks_(FromReader)

/**
 * @category lifting
 * @since 2.13.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => R.Reader<R, B>
) => (...a: A) => ReaderIO<R, B> = /*#__PURE__*/ fromReaderK_(FromReader)

/**
 * @category sequencing
 * @since 2.13.0
 */
export const chainReaderK: <A, R, B>(f: (a: A) => R.Reader<R, B>) => (ma: ReaderIO<R, A>) => ReaderIO<R, B> =
  /*#__PURE__*/ chainReaderK_(FromReader, Chain)

/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.13.0
 */
export const chainReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderIO<R2, A>) => ReaderIO<R1 & R2, B> = chainReaderK as any

/**
 * Alias of `tapReader`.
 *
 * @category legacy
 * @since 2.13.0
 */
export const chainFirstReaderK: <A, R, B>(f: (a: A) => R.Reader<R, B>) => (ma: ReaderIO<R, A>) => ReaderIO<R, A> =
  tapReader

/**
 * Alias of `tapReader`.
 *
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category legacy
 * @since 2.13.0
 */
export const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderIO<R2, A>) => ReaderIO<R1 & R2, A> = tapReader

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 2.13.0
 */
export const Do: ReaderIO<unknown, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @category do notation
 * @since 2.13.0
 */
export const bindTo = /*#__PURE__*/ bindTo_(Functor)

/**
 * @category do notation
 * @since 2.13.0
 */
export const bind = /*#__PURE__*/ chainable.bind(Chain)

/**
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.13.0
 */
export const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(fa: ReaderIO<R1, A>) => ReaderIO<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  bind as any

/**
 * @category do notation
 * @since 2.13.0
 */
export const apS = /*#__PURE__*/ apS_(Apply)

/**
 * Less strict version of [`apS`](#aps).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.13.0
 */
export const apSW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderIO<R2, B>
) => <R1>(fa: ReaderIO<R1, A>) => ReaderIO<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  apS as any

/**
 * @since 2.13.0
 */
export const ApT: ReaderIO<unknown, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
): ((as: ReadonlyNonEmptyArray<A>) => ReaderIO<R, ReadonlyNonEmptyArray<B>>) =>
  flow(R.traverseReadonlyNonEmptyArrayWithIndex(f), R.map(I.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
): ((as: ReadonlyArray<A>) => ReaderIO<R, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
export const traverseArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
) => (as: ReadonlyArray<A>) => ReaderIO<R, ReadonlyArray<B>> = traverseReadonlyArrayWithIndex

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
export const traverseArray = <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
): ((as: ReadonlyArray<A>) => ReaderIO<R, ReadonlyArray<B>>) => traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
export const sequenceArray: <R, A>(arr: ReadonlyArray<ReaderIO<R, A>>) => ReaderIO<R, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseArray(identity)

// -------------------------------------------------------------------------------------
// legacy
// -------------------------------------------------------------------------------------

/**
 * Alias of `flatMap`.
 *
 * @category legacy
 * @since 2.13.0
 */
export const chain: <A, R, B>(f: (a: A) => ReaderIO<R, B>) => (ma: ReaderIO<R, A>) => ReaderIO<R, B> = flatMap

/**
 * Alias of `flatMap`.
 *
 * @category legacy
 * @since 2.13.0
 */
export const chainW: <A, R2, B>(f: (a: A) => ReaderIO<R2, B>) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B> =
  flatMap

/**
 * Alias of `tap`.
 *
 * @category legacy
 * @since 2.13.0
 */
export const chainFirst: <A, R, B>(f: (a: A) => ReaderIO<R, B>) => (first: ReaderIO<R, A>) => ReaderIO<R, A> = tap

/**
 * Alias of `tap`.
 *
 * @category legacy
 * @since 2.13.0
 */
export const chainFirstW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A> = tap
