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
import * as flattenable from './Flattenable'
import type * as flatMapableRec from './FlattenableRec'
import type { Either } from './Either'
import * as fromIO_ from './FromIO'
import { constant, flow, identity, SK } from './function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
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
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B> = (f) => (fa) => () => f(fa())

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => IO<B>) => (self: IO<A>) => IO<B> = (f) => (self) => () => f(self())()

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<IOTypeLambda> = {
  map,
  flatMap
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeft: <_>(that: IO<_>) => <A>(self: IO<A>) => IO<A> = /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRight: <A>(that: IO<A>) => <_>(self: IO<_>) => IO<A> = /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B> = /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => IO<A> = constant

/**
 * @since 3.0.0
 */
export const unit: IO<void> = of(undefined)

/**
 * @category FlattenableRec
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
 * Derivable from `Flattenable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: IO<IO<A>>) => IO<A> = /*#__PURE__*/ flatMap(identity)

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface IOTypeLambda extends TypeLambda {
  readonly type: IO<this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<IOTypeLambda> = {
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
export const Pointed: pointed.Pointed<IOTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<IOTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `IO`.
 *
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: IO<A>, fb: IO<B>) => IO<C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `IO`.
 *
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (fa: IO<A>, fb: IO<B>, fc: IO<C>) => IO<D> =
  /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<IOTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<IOTypeLambda> = {
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
export const tap: <A, _>(f: (a: A) => IO<_>) => (self: IO<A>) => IO<A> = /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<IOTypeLambda> = {
  fromIO: identity
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: (...x: ReadonlyArray<unknown>) => IO<void> = /*#__PURE__*/ fromIO_.log(FromIO)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: (...x: ReadonlyArray<unknown>) => IO<void> = /*#__PURE__*/ fromIO_.logError(FromIO)

/**
 * @category instances
 * @since 3.0.0
 */
export const FlattenableRec: flatMapableRec.FlattenableRec<IOTypeLambda> = {
  flatMapRec: flatMapRec
}

// -------------------------------------------------------------------------------------
// struct sequencing
// -------------------------------------------------------------------------------------

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const Do: IO<{}> = /*#__PURE__*/ of(_.Do)

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: IO<A>) => IO<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @category struct sequencing
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IO<B>
) => (self: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindPar: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: IO<B>
) => (self: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindPar(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const DoTuple: IO<readonly []> = /*#__PURE__*/ of(_.DoTuple)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: IO<A>) => IO<readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const flatZipPar: <B>(fb: IO<B>) => <A extends ReadonlyArray<unknown>>(self: IO<A>) => IO<readonly [...A, B]> =
  /*#__PURE__*/ apply.flatZipPar(Apply)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const flatZip: <A extends ReadonlyArray<unknown>, B>(
  f: (a: A) => IO<B>
) => (self: IO<A>) => IO<readonly [...A, B]> = /*#__PURE__*/ flattenable.flatZip(Flattenable)

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
  return (as) => (_.isNonEmpty(as) ? g(as) : DoTuple)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, B>(
  f: (a: A) => IO<B>
): ((as: ReadonlyNonEmptyArray<A>) => IO<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(f: (a: A) => IO<B>): ((as: ReadonlyArray<A>) => IO<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<IO<A>>) => IO<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
