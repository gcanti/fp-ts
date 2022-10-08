/**
 * @since 3.0.0
 */
import type * as applicative from './Applicative'
import * as apply from './Apply'
import type * as kleisliCategory from './KleisliCategory'
import type * as kleisliComposable from './KleisliComposable'
import * as flattenable from './Flattenable'
import type * as fromReader_ from './FromReader'
import { constant, flow, identity, SK } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import * as fromIdentity from './FromIdentity'
import type * as profunctor from './Profunctor'
import type { NonEmptyReadonlyArray } from './NonEmptyReadonlyArray'

/**
 * @category model
 * @since 3.0.0
 */
export interface Reader<R, A> {
  (r: R): A
}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReaderTypeLambda extends TypeLambda {
  readonly type: Reader<this['In1'], this['Out1']>
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R>() => Reader<R, R> = _.ask

/**
 * Projects a value from the global context in a `Reader`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A>(f: (r: R) => A) => Reader<R, A> = identity

/**
 * @category constructors
 * @since 3.0.0
 */
export const asksReader =
  <R1, R2, A>(f: (r1: R1) => Reader<R2, A>): Reader<R1 & R2, A> =>
  (r) =>
    f(r)(r)

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 3.0.0
 */
export const local =
  <R2, R1>(f: (r2: R2) => R1) =>
  <A>(ma: Reader<R1, A>): Reader<R2, A> =>
  (r2) =>
    ma(f(r2))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B> = (f) => (fa) => flow(fa, f)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReaderTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <R, B>(fab: Reader<R, (a: A) => B>) => Reader<R, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => <R>(self: Reader<R, unknown>) => Reader<R, B> = /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: <R>(self: Reader<R, unknown>) => Reader<R, void> = /*#__PURE__*/ functor.unit(Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const of: <A>(a: A) => Reader<unknown, A> = constant

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<ReaderTypeLambda> = {
  of
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, R2, B>(f: (a: A) => Reader<R2, B>) => <R1>(self: Reader<R1, A>) => Reader<R1 & R2, B> =
  (f) => (self) => (r) =>
    f(self(r))(r)

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<ReaderTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, R2, C>(
  bfc: (b: B) => Reader<R2, C>
) => <A, R1>(afb: (a: A) => Reader<R1, B>) => (a: A) => Reader<R1 & R2, C> =
  /*#__PURE__*/ flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<ReaderTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => Reader<unknown, A> = /*#__PURE__*/ fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<ReaderTypeLambda> = {
  composeKleisli,
  idKleisli
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: <R2>(that: Reader<R2, unknown>) => <R1, A>(self: Reader<R1, A>) => Reader<R1 & R2, A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <R2, A>(that: Reader<R2, A>) => <R1>(self: Reader<R1, unknown>) => Reader<R1 & R2, A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <R2, A>(fa: Reader<R2, A>) => <R1, B>(self: Reader<R1, (a: A) => B>) => Reader<R1 & R2, B> =
  /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @since 3.0.0
 */
export const flatten: <R1, R2, A>(mma: Reader<R1, Reader<R2, A>>) => Reader<R1 & R2, A> =
  /*#__PURE__*/ flatMap(identity)

/**
 * @since 3.0.0
 */
export const promap: <Q, R, A, B>(f: (d: Q) => R, g: (a: A) => B) => (pea: Reader<R, A>) => Reader<Q, B> =
  (f, g) => (fea) => (a) =>
    g(fea(f(a)))

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: fromReader_.FromReader<ReaderTypeLambda> = {
  fromReader: identity
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<ReaderTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `Reader`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, R2>(fa: Reader<R1, A>, fb: Reader<R2, B>) => Reader<R1 & R2, C> = /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `Reader`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, R2, R3>(fa: Reader<R1, A>, fb: Reader<R2, B>, fc: Reader<R3, C>) => Reader<R1 & R2 & R3, D> =
  /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<ReaderTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<ReaderTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Profunctor: profunctor.Profunctor<ReaderTypeLambda> = {
  map,
  promap
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: Reader<unknown, {}> = /*#__PURE__*/ of(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <R, A>(self: Reader<R, A>) => Reader<R, { readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R>(self: Reader<R, A>) => Reader<R, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @category do notation
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const bind: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R2, B>
) => <R1>(self: Reader<R1, A>) => Reader<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, R2, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R2, B>
) => <R1>(self: Reader<R1, A>) => Reader<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: Reader<unknown, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <R, A>(self: Reader<R, A>) => Reader<R, readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <R2, B>(
  fb: Reader<R2, B>
) => <R1, A extends ReadonlyArray<unknown>>(self: Reader<R1, A>) => Reader<R1 & R2, readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <R2, B, A, C>(
  that: Reader<R2, B>,
  f: (a: A, b: B) => C
) => <R1>(self: Reader<R1, A>) => Reader<R1 & R2, C> = /*#__PURE__*/ apply.zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex =
  <A, R, B>(f: (index: number, a: A) => Reader<R, B>) =>
  (as: NonEmptyReadonlyArray<A>): Reader<R, NonEmptyReadonlyArray<B>> =>
  (r) => {
    const out: _.NonEmptyArray<B> = [f(0, _.head(as))(r)]
    for (let i = 1; i < as.length; i++) {
      out.push(f(i, as[i])(r))
    }
    return out
  }

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, B>(
  f: (index: number, a: A) => Reader<R, B>
): ((as: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <A, R, B>(
  f: (a: A) => Reader<R, B>
): ((as: NonEmptyReadonlyArray<A>) => Reader<R, NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, B>(
  f: (a: A) => Reader<R, B>
): ((as: ReadonlyArray<A>) => Reader<R, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, A>(arr: ReadonlyArray<Reader<R, A>>) => Reader<R, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
