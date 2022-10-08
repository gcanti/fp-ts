/**
 * ```ts
 * interface Sync<A> {
 *   (): A
 * }
 * ```
 *
 * `Sync<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
 * type `A` and **never fails**.
 *
 * If you want to represent a synchronous computation that may fail, please see `SyncResult`.
 * If you want to represent a synchronous computation that may yield nothing, please see `SyncOption`.
 *
 * @since 3.0.0
 */
import type * as applicative from '@fp-ts/core/Applicative'
import * as apply from '@fp-ts/core/Apply'
import * as flattenable from '@fp-ts/core/Flattenable'
import type * as flatMapableRec from '@fp-ts/core/FlattenableRec'
import * as fromIdentity from '@fp-ts/core/FromIdentity'
import * as fromSync_ from '@fp-ts/core/FromSync'
import { constant, flow, identity, SK } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type * as kleisliCategory from '@fp-ts/core/KleisliCategory'
import type * as kleisliComposable from '@fp-ts/core/KleisliComposable'
import type * as monad from '@fp-ts/core/Monad'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import type { Result } from '@fp-ts/core/Result'

/**
 * @category model
 * @since 3.0.0
 */
export interface Sync<A> {
  (): A
}

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Sync<A>) => Sync<B> = (f) => (fa) => () => f(fa())

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => Sync<B>) => (self: Sync<A>) => Sync<B> = (f) => (self) => () => f(self())()

/**
 * @category constructors
 * @since 3.0.0
 */
export const of: <A>(a: A) => Sync<A> = constant

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<SyncTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<SyncTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, C>(bfc: (b: B) => Sync<C>) => <A>(afb: (a: A) => Sync<B>) => (a: A) => Sync<C> =
  flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<SyncTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => Sync<A> = fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<SyncTypeLambda> = {
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
export const zipLeft: (that: Sync<unknown>) => <A>(self: Sync<A>) => Sync<A> = flattenable.zipLeft(
  Flattenable
)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: Sync<A>) => (self: Sync<unknown>) => Sync<A> = flattenable.zipRight(
  Flattenable
)

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: Sync<A>) => <B>(fab: Sync<(a: A) => B>) => Sync<B> = flattenable.ap(Flattenable)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapRec: <A, B>(f: (a: A) => Sync<Result<A, B>>) => (a: A) => Sync<B> = (f) =>
  (a) =>
    () => {
      let e = f(a)()
      while (_.isFailure(e)) {
        e = f(e.failure)()
      }
      return e.success
    }

/**
 * @since 3.0.0
 */
export const flatten: <A>(mma: Sync<Sync<A>>) => Sync<A> = flatMap(identity)

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface SyncTypeLambda extends TypeLambda {
  readonly type: Sync<this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<SyncTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Sync<(a: A) => B>) => Sync<B> = functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => (self: Sync<unknown>) => Sync<B> = functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: (self: Sync<unknown>) => Sync<void> = functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<SyncTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `Sync`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Sync<A>, fb: Sync<B>) => Sync<C> = apply
  .lift2(Apply)

/**
 * Lifts a ternary function into `Sync`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (fa: Sync<A>, fb: Sync<B>, fc: Sync<C>) => Sync<D> =
  apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<SyncTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<SyncTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A>(f: (a: A) => Sync<unknown>) => (self: Sync<A>) => Sync<A> = flattenable.tap(
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<SyncTypeLambda> = {
  fromSync: identity
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: <A extends ReadonlyArray<unknown>>(...x: A) => Sync<void> = fromSync_.log(FromSync)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: <A extends ReadonlyArray<unknown>>(...x: A) => Sync<void> = fromSync_.logError(
  FromSync
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FlattenableRec: flatMapableRec.FlattenableRec<SyncTypeLambda> = {
  flatMapRec
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: Sync<{}> = of(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: Sync<A>) => Sync<{ readonly [K in N]: A }> = functor
  .bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Sync<A>) => Sync<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = functor.let(
  Functor
)

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
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Sync<B>
) => (self: Sync<A>) => Sync<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = flattenable
  .bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Sync<B>
) => (self: Sync<A>) => Sync<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = apply
  .bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: Sync<readonly []> = of(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: Sync<A>) => Sync<readonly [A]> = functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: Sync<B>
) => <A extends ReadonlyArray<unknown>>(self: Sync<A>) => Sync<readonly [...A, B]> = apply.zipFlatten(
  Apply
)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(that: Sync<B>, f: (a: A, b: B) => C) => (self: Sync<A>) => Sync<C> = apply
  .zipWith(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <A, B>(f: (index: number, a: A) => Sync<B>) =>
  (as: NonEmptyReadonlyArray<A>): Sync<NonEmptyReadonlyArray<B>> =>
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
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => Sync<B>
): ((as: ReadonlyArray<A>) => Sync<ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArray = <A, B>(
  f: (a: A) => Sync<B>
): ((as: NonEmptyReadonlyArray<A>) => Sync<NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(
  f: (a: A) => Sync<B>
): ((as: ReadonlyArray<A>) => Sync<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<Sync<A>>) => Sync<ReadonlyArray<A>> = traverseReadonlyArray(
  identity
)
