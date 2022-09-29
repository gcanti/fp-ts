/**
 * `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 *
 * ```ts
 * interface Task<A> {
 *   (): Promise<A>
 * }
 * ```
 *
 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
 *
 * @since 3.0.0
 */
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as flattenable from './Flattenable'
import * as fromIO_ from './FromIO'
import type * as fromTask_ from './FromTask'
import { flow, identity, pipe, SK } from './function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import * as _ from './internal'
import type { IO } from './IO'
import type * as monad from './Monad'
import type { Monoid } from './Monoid'
import type * as pointed from './Pointed'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Task<A> {
  (): Promise<A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Returns an effect that suspends for the specified `duration` (in millis).
 *
 * @category constructors
 * @since 3.0.0
 */
export const sleep =
  (duration: number): Task<void> =>
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, duration)
    })

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A>(fa: IO<A>) => Task<A> = (ma) => () => Promise.resolve().then(ma)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Returns an effect that is delayed from this effect by the specified `duration` (in millis).
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as T from 'fp-ts/Task'
 *
 * async function test() {
 *   const log: Array<string> = []
 *
 *   const append = (message: string): T.Task<void> =>
 *     T.fromIO(() => {
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
 * @category combinators
 * @since 3.0.0
 */
export const delay =
  (duration: number) =>
  <A>(self: Task<A>): Task<A> =>
    pipe(
      sleep(duration),
      flatMap(() => self)
    )

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B> = (f) => (fa) => () =>
  Promise.resolve().then(fa).then(f)

/**
 * @since 3.0.0
 */
export const apPar: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B> = (fa) => (fab) => () =>
  Promise.all([Promise.resolve().then(fab), Promise.resolve().then(fa)]).then(([f, a]) => f(a))

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => Task<A> = (a) => () => Promise.resolve(a)

/**
 * @since 3.0.0
 */
export const unit: Task<void> = of(undefined)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => Task<B>) => (self: Task<A>) => Task<B> = (f) => (self) => () =>
  Promise.resolve()
    .then(self)
    .then((a) => f(a)())

/**
 * Derivable from `Flattenable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: Task<Task<A>>) => Task<A> = /*#__PURE__*/ flatMap(identity)

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface TaskTypeLambda extends TypeLambda {
  readonly type: Task<this['Out1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Monoid returning the first completed task.
 *
 * Note: uses `Promise.race` internally.
 *
 * @example
 * import * as T from 'fp-ts/Task'
 * import { pipe } from 'fp-ts/function'
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
export const getRaceMonoid = <A>(): Monoid<Task<A>> => ({
  combine: (second) => (first) => () => Promise.race([Promise.resolve().then(first), Promise.resolve().then(second)]),
  empty: never
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<TaskTypeLambda> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Task<(a: A) => B>) => Task<B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<TaskTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: apply.Apply<TaskTypeLambda> = {
  map,
  ap: apPar
}

/**
 * Lifts a binary function into `Task` in parallel.
 *
 * @since 3.0.0
 */
export const lift2Par: <A, B, C>(f: (a: A, b: B) => C) => (fa: Task<A>, fb: Task<B>) => Task<C> =
  /*#__PURE__*/ apply.lift2(ApplyPar)

/**
 * Lifts a ternary function into `Task` in parallel.
 *
 * @since 3.0.0
 */
export const lift3Par: <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (fa: Task<A>, fb: Task<B>, fc: Task<C>) => Task<D> =
  /*#__PURE__*/ apply.lift3(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeftPar: <_>(second: Task<_>) => <A>(self: Task<A>) => Task<A> =
  /*#__PURE__*/ apply.zipLeftPar(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRightPar: <A>(second: Task<A>) => <_>(self: Task<_>) => Task<A> =
  /*#__PURE__*/ apply.zipRightPar(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: applicative.Applicative<TaskTypeLambda> = {
  map,
  ap: apPar,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<TaskTypeLambda> = {
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
export const zipLeft: <_>(that: Task<_>) => <A>(self: Task<A>) => Task<A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRight: <A>(that: Task<A>) => <_>(self: Task<_>) => Task<A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const ap: <A>(fa: Task<A>) => <B>(self: Task<(a: A) => B>) => Task<B> = /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<TaskTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `Task`.
 *
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Task<A>, fb: Task<B>) => Task<C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `Task`.
 *
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (fa: Task<A>, fb: Task<B>, fc: Task<C>) => Task<D> =
  /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<TaskTypeLambda> = {
  map,
  ap,
  of
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const tap: <A, _>(f: (a: A) => Task<_>) => (self: Task<A>) => Task<A> =
  /*#__PURE__*/ flattenable.tap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<TaskTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<TaskTypeLambda> = {
  fromIO
}

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log: (...x: ReadonlyArray<unknown>) => Task<void> = /*#__PURE__*/ fromIO_.log(FromIO)

/**
 * @category logging
 * @since 3.0.0
 */
export const logError: (...x: ReadonlyArray<unknown>) => Task<void> = /*#__PURE__*/ fromIO_.logError(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => Task<B> =
  /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapIOK: <A, B>(f: (a: A) => IO<B>) => (self: Task<A>) => Task<B> = /*#__PURE__*/ fromIO_.flatMapIOK(
  FromIO,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: fromTask_.FromTask<TaskTypeLambda> = {
  fromIO,
  fromTask: identity
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * A `Task` that never completes.
 *
 * @since 3.0.0
 */
export const never: Task<never> = () => new Promise(() => undefined)

// -------------------------------------------------------------------------------------
// struct sequencing
// -------------------------------------------------------------------------------------

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const Do: Task<{}> = /*#__PURE__*/ of(_.Do)

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: Task<A>) => Task<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Task<A>) => Task<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
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
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Task<B>
) => (self: Task<A>) => Task<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Task<B>
) => (self: Task<A>) => Task<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

/**
 * A variant of `bind` that ignores the scope in parallel.
 *
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindRightPar: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Task<B>
) => (self: Task<A>) => Task<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(ApplyPar)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: Task<readonly []> = /*#__PURE__*/ of(_.Zip)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: Task<A>) => Task<readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: Task<B>
) => <A extends ReadonlyArray<unknown>>(self: Task<A>) => Task<readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Zips this effect with the specified effect in parallel.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlattenPar: <B>(
  fb: Task<B>
) => <A extends ReadonlyArray<unknown>>(self: Task<A>) => Task<readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(ApplyPar)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(that: Task<B>, f: (a: A, b: B) => C) => (self: Task<A>) => Task<C> =
  /*#__PURE__*/ apply.zipWith(Apply)

/**
 * Zips this effect with the specified effect using the specified combiner function in parallel.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWithPar: <B, A, C>(that: Task<B>, f: (a: A, b: B) => C) => (self: Task<A>) => Task<C> =
  /*#__PURE__*/ apply.zipWith(ApplyPar)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

// --- Par ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexPar =
  <A, B>(f: (index: number, a: A) => Task<B>) =>
  (as: ReadonlyNonEmptyArray<A>): Task<ReadonlyNonEmptyArray<B>> =>
  () =>
    Promise.all(as.map((a, i) => Promise.resolve().then(() => f(i, a)()))) as any

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexPar = <A, B>(
  f: (index: number, a: A) => Task<B>
): ((as: ReadonlyArray<A>) => Task<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexPar(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayPar = <A, B>(
  f: (a: A) => Task<B>
): ((as: ReadonlyNonEmptyArray<A>) => Task<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayPar = <A, B>(
  f: (a: A) => Task<B>
): ((as: ReadonlyArray<A>) => Task<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndexPar(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArrayPar: <A>(arr: ReadonlyArray<Task<A>>) => Task<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArrayPar(identity)

// --- Seq ---

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, B>(f: (index: number, a: A) => Task<B>) =>
  (as: ReadonlyNonEmptyArray<A>): Task<ReadonlyNonEmptyArray<B>> =>
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
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => Task<B>
): ((as: ReadonlyArray<A>) => Task<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : Zip)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, B>(
  f: (a: A) => Task<B>
): ((as: ReadonlyNonEmptyArray<A>) => Task<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(
  f: (a: A) => Task<B>
): ((as: ReadonlyArray<A>) => Task<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex(flow(SK, f))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<Task<A>>) => Task<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
