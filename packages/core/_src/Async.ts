/**
 * `Async<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 *
 * ```ts
 * interface Async<A> {
 *   (): Promise<A>
 * }
 * ```
 *
 * If you want to represent an asynchronous computation that may fail, please see `AsyncResult`.
 *
 * @since 3.0.0
 */
import type * as applicative from '@fp-ts/core/Applicative'
import * as apply from '@fp-ts/core/Apply'
import * as flattenable from '@fp-ts/core/Flattenable'
import type * as fromAsync_ from '@fp-ts/core/FromAsync'
import * as fromIdentity from '@fp-ts/core/FromIdentity'
import * as fromSync_ from '@fp-ts/core/FromSync'
import { flow, identity, pipe, SK } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import type * as kleisliCategory from '@fp-ts/core/KleisliCategory'
import type * as kleisliComposable from '@fp-ts/core/KleisliComposable'
import type * as monad from '@fp-ts/core/Monad'
import type { Monoid } from '@fp-ts/core/Monoid'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import type { Sync } from '@fp-ts/core/Sync'

/**
 * @category model
 * @since 3.0.0
 */
export interface Async<A> {
  (): Promise<A>
}

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep = (duration: number): Async<void> =>
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, duration)
    })

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromSync: <A>(fa: Sync<A>) => Async<A> = (ma) => () => Promise.resolve().then(ma)

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @example
 * import { pipe } from '@fp-ts/core/Function'
 * import * as T from '@fp-ts/core/Async'
 *
 * async function test() {
 *   const log: Array<string> = []
 *
 *   const append = (message: string): T.Async<void> =>
 *     T.fromSync(() => {
 *       log.push(message)
 *     })
 *
 *   await pipe(
 *     T.Do,
 *     T.bindRightPar('a', append('a')),
 *     T.bindRightPar('b', pipe(append('b'), T.delay(20))),
 *     T.bindRightPar('c', pipe(append('c'), T.delay(10))),
 *   )()
 *   assert.deepStrictEqual(log, ['a', 'c', 'b'])
 * }
 *
 * test()
 *
 * @since 3.0.0
 */
export const delay = (duration: number) =>
  <A>(self: Async<A>): Async<A> =>
    pipe(
      sleep(duration),
      flatMap(() => self)
    )

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Async<A>) => Async<B> = (f) =>
  (fa) => () => Promise.resolve().then(fa).then(f)

/**
 * @since 3.0.0
 */
export const apPar: <A>(fa: Async<A>) => <B>(fab: Async<(a: A) => B>) => Async<B> = (fa) =>
  (fab) => () => Promise.all([Promise.resolve().then(fab), Promise.resolve().then(fa)]).then(([f, a]) => f(a))

/**
 * @category constructors
 * @since 3.0.0
 */
export const of: <A>(a: A) => Async<A> = (a) => () => Promise.resolve(a)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => Async<B>) => (self: Async<A>) => Async<B> = (f) =>
  (self) =>
    () =>
      Promise.resolve()
        .then(self)
        .then((a) => f(a)())

/**
 * @since 3.0.0
 */
export const flatten: <A>(mma: Async<Async<A>>) => Async<A> = flatMap(identity)

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface AsyncTypeLambda extends TypeLambda {
  readonly type: Async<this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Monoid returning the first completed async.
 *
 * Note: uses `Promise.race` internally.
 *
 * @example
 * import * as T from '@fp-ts/core/Async'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * async function test() {
 *   const S = T.getRaceMonoid<string>()
 *   const fa = T.delay(20)(T.of('a'))
 *   const fb = T.delay(10)(T.of('b'))
 *   assert.deepStrictEqual(await pipe(fa, S.combine(fb))(), 'b')
 * }
 *
 * test()
 *
 * @category instances
 * @since 3.0.0
 */
export const getRaceMonoid = <A>(): Monoid<Async<A>> => ({
  combine: (that) => (self) => () => Promise.race([Promise.resolve().then(self), Promise.resolve().then(that)]),
  empty: never
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<AsyncTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Async<(a: A) => B>) => Async<B> = functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => (self: Async<unknown>) => Async<B> = functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: (self: Async<unknown>) => Async<void> = functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<AsyncTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: apply.Apply<AsyncTypeLambda> = {
  map,
  ap: apPar
}

/**
 * Lifts a binary function into `Async` in parallel.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2Par: <A, B, C>(f: (a: A, b: B) => C) => (fa: Async<A>, fb: Async<B>) => Async<C> = apply
  .lift2(ApplyPar)

/**
 * Lifts a ternary function into `Async` in parallel.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3Par: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Async<A>, fb: Async<B>, fc: Async<C>) => Async<D> = apply.lift3(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeftPar: (that: Async<unknown>) => <A>(self: Async<A>) => Async<A> = apply.zipLeftPar(
  ApplyPar
)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRightPar: <A>(that: Async<A>) => (self: Async<unknown>) => Async<A> = apply.zipRightPar(
  ApplyPar
)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: applicative.Applicative<AsyncTypeLambda> = {
  map,
  ap: apPar,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<AsyncTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, C>(bfc: (b: B) => Async<C>) => <A>(afb: (a: A) => Async<B>) => (a: A) => Async<C> =
  flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<AsyncTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => Async<A> = fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<AsyncTypeLambda> = {
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
export const zipLeft: (that: Async<unknown>) => <A>(self: Async<A>) => Async<A> = flattenable.zipLeft(
  Flattenable
)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: Async<A>) => (self: Async<unknown>) => Async<A> = flattenable.zipRight(
  Flattenable
)

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: Async<A>) => <B>(self: Async<(a: A) => B>) => Async<B> = flattenable.ap(
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<AsyncTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `Async`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Async<A>, fb: Async<B>) => Async<C> = apply
  .lift2(Apply)

/**
 * Lifts a ternary function into `Async`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (fa: Async<A>, fb: Async<B>, fc: Async<C>) => Async<D> =
  apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<AsyncTypeLambda> = {
  map,
  ap,
  of
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
 */
export const tap: <A>(f: (a: A) => Async<unknown>) => (self: Async<A>) => Async<A> = flattenable.tap(
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<AsyncTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromSync: fromSync_.FromSync<AsyncTypeLambda> = {
  fromSync
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: <A extends ReadonlyArray<unknown>>(...x: A) => Async<void> = fromSync_.log(FromSync)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: <A extends ReadonlyArray<unknown>>(...x: A) => Async<void> = fromSync_.logError(
  FromSync
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftSync: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Sync<B>) => (...a: A) => Async<B> =
  fromSync_.liftSync(FromSync)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => (self: Async<A>) => Async<B> = fromSync_
  .flatMapSync(FromSync, Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromAsync: fromAsync_.FromAsync<AsyncTypeLambda> = {
  fromSync,
  fromAsync: identity
}

/**
 * An `Async` that never completes.
 *
 * @since 3.0.0
 */
export const never: Async<never> = () => new Promise(() => undefined)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: Async<{}> = of(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: Async<A>) => Async<{ readonly [K in N]: A }> = functor
  .bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = functor
  .let(Functor)

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
  f: (a: A) => Async<B>
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = flattenable.bind(
  Flattenable
)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Async<B>
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = apply
  .bindRight(Apply)

/**
 * A variant of `bind` that ignores the scope in parallel.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRightPar: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Async<B>
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = apply
  .bindRight(ApplyPar)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: Async<readonly []> = of(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: Async<A>) => Async<readonly [A]> = functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: Async<B>
) => <A extends ReadonlyArray<unknown>>(self: Async<A>) => Async<readonly [...A, B]> = apply.zipFlatten(
  Apply
)

/**
 * Zips this effect with the specified effect in parallel.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlattenPar: <B>(
  fb: Async<B>
) => <A extends ReadonlyArray<unknown>>(self: Async<A>) => Async<readonly [...A, B]> = apply.zipFlatten(
  ApplyPar
)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(that: Async<B>, f: (a: A, b: B) => C) => (self: Async<A>) => Async<C> = apply.zipWith(
  Apply
)

/**
 * Zips this effect with the specified effect using the specified combiner function in parallel.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWithPar: <B, A, C>(that: Async<B>, f: (a: A, b: B) => C) => (self: Async<A>) => Async<C> = apply
  .zipWith(ApplyPar)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndexPar = <A, B>(f: (index: number, a: A) => Async<B>) =>
  (as: NonEmptyReadonlyArray<A>): Async<NonEmptyReadonlyArray<B>> =>
    () => Promise.all(as.map((a, i) => Promise.resolve().then(() => f(i, a)()))) as any

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, B>(
  f: (index: number, a: A) => Async<B>
): ((as: ReadonlyArray<A>) => Async<ReadonlyArray<B>>) => {
  const g = traverseNonEmptyReadonlyArrayWithIndexPar(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `NonEmptyReadonlyArray#traverse(ApplyPar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayPar = <A, B>(
  f: (a: A) => Async<B>
): ((as: NonEmptyReadonlyArray<A>) => Async<NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <A, B>(
  f: (a: A) => Async<B>
): ((as: ReadonlyArray<A>) => Async<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <A>(arr: ReadonlyArray<Async<A>>) => Async<ReadonlyArray<A>> =
  traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseNonEmptyReadonlyArrayWithIndex = <A, B>(f: (index: number, a: A) => Async<B>) =>
  (as: NonEmptyReadonlyArray<A>): Async<NonEmptyReadonlyArray<B>> =>
    () =>
      _.tail(as).reduce<Promise<_.NonEmptyArray<B>>>(
        (acc, a, i) =>
          acc.then((bs) =>
            Promise.resolve()
              .then(f(i + 1, a))
              .then((b) => {
                bs.push(b)
                return bs
              })
          ),
        Promise.resolve()
          .then(f(0, _.head(as)))
          .then(_.singleton)
      )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => Async<B>
): ((as: ReadonlyArray<A>) => Async<ReadonlyArray<B>>) => {
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
  f: (a: A) => Async<B>
): ((as: NonEmptyReadonlyArray<A>) => Async<NonEmptyReadonlyArray<B>>) => {
  return traverseNonEmptyReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(
  f: (a: A) => Async<B>
): ((as: ReadonlyArray<A>) => Async<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<Async<A>>) => Async<ReadonlyArray<A>> =
  traverseReadonlyArray(identity)
