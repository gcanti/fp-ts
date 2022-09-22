/**
 * ```ts
 * interface IO<A> {
 *   (): A
 * }
 * ```
 *
 * `IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
 * type `A` and **never fails**.
 *
 * If you want to represent a synchronous computation that may fail, please see `IOEither`.
 * If you want to represent a synchronous computation that may yield nothing, please see `IOOption`.
 *
 * @since 3.0.0
 */
import * as apply from './Apply'
import type * as applicative from './Applicative'
import * as flat from './Flat'
import type * as flatMapableRec from './FlatRec'
import type { Either } from './Either'
import type * as fromIO_ from './FromIO'
import { constant, identity } from './function'
import * as functor from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import type * as pointed from './Pointed'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'

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
export const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B> = (f) => (fa) => () => f(fa())

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B> = (fa) => (fab) => () => fab()(fa())

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => IO<A> = constant

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Flat
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B> = (f) => (ma) => () => f(ma())()

/**
 * @category FlatRec
 * @since 3.0.0
 */
export const flatMapRec: <A, B>(f: (a: A) => IO<Either<A, B>>) => (a: A) => IO<B> = (f) => (a) => () => {
  let e = f(a)()
  while (_.isLeft(e)) {
    e = f(e.left)()
  }
  return e.right
}

/**
 * Derivable from `Flat`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: IO<IO<A>>) => IO<A> = /*#__PURE__*/ flatMap(identity)

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface IOF extends HKT {
  readonly type: IO<this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<IOF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: IO<(a: A) => B>) => IO<B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<IOF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<IOF> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeftPar: <B>(second: IO<B>) => <A>(self: IO<A>) => IO<A> = /*#__PURE__*/ apply.zipLeftPar(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRightPar: <B>(second: IO<B>) => <A>(self: IO<A>) => IO<B> = /*#__PURE__*/ apply.zipRightPar(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<IOF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flat: flat.Flat<IOF> = {
  map,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<IOF> = {
  map,
  of,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap: <A, _>(f: (a: A) => IO<_>) => (self: IO<A>) => IO<A> = /*#__PURE__*/ flat.tap(Flat)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<IOF> = {
  fromIO: identity
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FlatRec: flatMapableRec.FlatRec<IOF> = {
  flatMapRec: flatMapRec
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: IO<{}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(fa: IO<A>) => IO<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IO<B>
) => (ma: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ flat.bind(Flat)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: IO<B>
) => (fa: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ apply.apS(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: IO<readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <A>(fa: IO<A>) => IO<readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <B>(fb: IO<B>) => <A extends ReadonlyArray<unknown>>(fas: IO<A>) => IO<readonly [...A, B]> =
  /*#__PURE__*/ apply.apT(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, B>(f: (index: number, a: A) => IO<B>) =>
  (as: ReadonlyNonEmptyArray<A>): IO<ReadonlyNonEmptyArray<B>> =>
  () => {
    const out: _.NonEmptyArray<B> = [f(0, _.head(as))()]
    for (let i = 1; i < as.length; i++) {
      out.push(f(i, as[i])())
    }
    return out
  }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => IO<B>
): ((as: ReadonlyArray<A>) => IO<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, B>(
  f: (a: A) => IO<B>
): ((as: ReadonlyNonEmptyArray<A>) => IO<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(f: (a: A) => IO<B>): ((as: ReadonlyArray<A>) => IO<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<IO<A>>) => IO<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
