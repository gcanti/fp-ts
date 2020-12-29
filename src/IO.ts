/**
 * ```ts
 * interface IO<A> {
 *   (): A
 * }
 * ```
 *
 * `IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
 * type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
 * `IOEither`.
 *
 * @since 3.0.0
 */
import { Applicative1 } from './Applicative'
import { apFirst_, Apply1, apSecond_, apS_, apT_ } from './Apply'
import { FromIO1 } from './FromIO'
import { constant, identity } from './function'
import { bindTo_, Functor1, tupled_ } from './Functor'
import { bind_, chainFirst_, Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { Pointed1 } from './Pointed'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface IO<A> {
  (): A
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor1<URI>['map'] = (f) => (fa) => () => f(fa())

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply1<URI>['ap'] = (fa) => (fab) => () => fab()(fa())

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: Pointed1<URI>['of'] = constant

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 3.0.0
 */
export const chain: Monad1<URI>['chain'] = (f) => (ma) => () => f(ma())()

/**
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: IO<IO<A>>) => IO<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @category FromIO
 * @since 3.0.0
 */
export const fromIO: FromIO1<URI>['fromIO'] = identity

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const URI = 'IO'

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: IO<A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => ({
  concat: (second) => (first) => () => {
    const a1 = first()
    const a2 = second()
    return S.concat(a2)(a1)
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => ({
  concat: getSemigroup(M).concat,
  empty: of(M.empty)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor1<URI> = {
  URI,
  map
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed1<URI> = {
  URI,
  map,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply1<URI> = {
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
  apFirst_(Apply)

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
  apSecond_(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad1<URI> = {
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
export const FromIO: FromIO1<URI> = {
  URI,
  fromIO
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: IO<{}> =
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

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Applicative)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: IO<readonly []> = of([])

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
  apT_(Applicative)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IO<B>
) => (arr: ReadonlyArray<A>) => IO<ReadonlyArray<B>> = (f) => (arr) => () => arr.map((a, i) => f(i, a)())

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { traverseArray, IO } from 'fp-ts/IO'
 * import { pipe } from 'fp-ts/function'
 *
 * const logger: Array<unknown> = []
 * const log: <A>(a: A) => IO<void> = (a) => () => { logger.push(a) }
 *
 * pipe(RA.range(0, 100), traverseArray(log))()
 * assert.deepStrictEqual(logger, RA.range(0, 100))
 *
 * @since 3.0.0
 */
export const traverseArray: <A, B>(f: (a: A) => IO<B>) => (arr: ReadonlyArray<A>) => IO<ReadonlyArray<B>> = (f) =>
  traverseArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { sequenceArray, IO } from 'fp-ts/IO'
 * import { pipe } from 'fp-ts/function'
 *
 * const logger: Array<unknown> = []
 * const log: <A>(a: A) => IO<void> = (a) => () => { logger.push(a) }
 *
 * pipe(RA.range(0, 100), RA.map(log), sequenceArray)()
 * assert.deepStrictEqual(logger, RA.range(0, 100))
 *
 * @since 3.0.0
 */
export const sequenceArray: <A>(arr: ReadonlyArray<IO<A>>) => IO<ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity)
