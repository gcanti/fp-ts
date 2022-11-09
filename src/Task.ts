/**
 * ```ts
 * interface Task<A> {
 *   (): Promise<A>
 * }
 * ```
 *
 * `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
 *
 * @since 2.0.0
 */
import { Applicative1, getApplicativeMonoid } from './Applicative'
import {
  apFirst as apFirst_,
  Apply1,
  apS as apS_,
  apSecond as apSecond_,
  getApplySemigroup as getApplySemigroup_
} from './Apply'
import { bind as bind_, Chain1, chainFirst as chainFirst_ } from './Chain'
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, FromIO1, fromIOK as fromIOK_ } from './FromIO'
import { FromTask1 } from './FromTask'
import { identity, pipe } from './function'
import { let as let__, bindTo as bindTo_, flap as flap_, Functor1 } from './Functor'
import * as _ from './internal'
import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { MonadTask1 } from './MonadTask'
import { Monoid } from './Monoid'
import { NonEmptyArray } from './NonEmptyArray'
import { Pointed1 } from './Pointed'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Semigroup } from './Semigroup'
import { IO } from './IO'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Task<A> {
  (): Promise<A>
}

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

/**
 * @category conversions
 * @since 2.0.0
 */
export const fromIO: <A>(fa: IO<A>) => Task<A> = (ma) => () => Promise.resolve().then(ma)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Creates a task that will complete after a time delay
 *
 * @example
 * import { sequenceT } from 'fp-ts/Apply'
 * import * as T from 'fp-ts/Task'
 * import { takeRight } from 'fp-ts/Array'
 *
 * async function test() {
 *   const log: Array<string> = []
 *   const append = (message: string): T.Task<void> =>
 *     T.fromIO(() => {
 *       log.push(message)
 *     })
 *   const fa = append('a')
 *   const fb = T.delay(20)(append('b'))
 *   const fc = T.delay(10)(append('c'))
 *   const fd = append('d')
 *   await sequenceT(T.ApplyPar)(fa, fb, fc, fd)()
 *   assert.deepStrictEqual(takeRight(2)(log), ['c', 'b'])
 * }
 *
 * test()
 *
 * @since 2.0.0
 */
export function delay(millis: number): <A>(ma: Task<A>) => Task<A> {
  return (ma) => () =>
    new Promise((resolve) => {
      setTimeout(() => {
        Promise.resolve().then(ma).then(resolve)
      }, millis)
    })
}

const _map: Functor1<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _apPar: Apply1<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const _apSeq: Apply1<URI>['ap'] = (fab, fa) =>
  pipe(
    fab,
    chain((f) => pipe(fa, map(f)))
  )
const _chain: Chain1<URI>['chain'] = (ma, f) => pipe(ma, chain(f))

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B> = (f) => (fa) => () =>
  Promise.resolve().then(fa).then(f)

/**
 * @since 2.0.0
 */
export const ap: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B> = (fa) => (fab) => () =>
  Promise.all([Promise.resolve().then(fab), Promise.resolve().then(fa)]).then(([f, a]) => f(a))

/**
 * @category constructors
 * @since 2.0.0
 */
export const of: <A>(a: A) => Task<A> = (a) => () => Promise.resolve(a)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category sequencing
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B> = (f) => (ma) => () =>
  Promise.resolve()
    .then(ma)
    .then((a) => f(a)())

/**
 * @category sequencing
 * @since 2.0.0
 */
export const flatten: <A>(mma: Task<Task<A>>) => Task<A> = /*#__PURE__*/ chain(identity)

/**
 * @category type lambdas
 * @since 2.0.0
 */
export const URI = 'Task'

/**
 * @category type lambdas
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Task<A>
  }
}

/**
 * Monoid returning the first completed task.
 *
 * Note: uses `Promise.race` internally.
 *
 * @example
 * import * as T from 'fp-ts/Task'
 *
 * async function test() {
 *   const S = T.getRaceMonoid<string>()
 *   const fa = T.delay(20)(T.of('a'))
 *   const fb = T.delay(10)(T.of('b'))
 *   assert.deepStrictEqual(await S.concat(fa, fb)(), 'b')
 * }
 *
 * test()
 *
 * @category instances
 * @since 2.0.0
 */
export function getRaceMonoid<A = never>(): Monoid<Task<A>> {
  return {
    concat: (x, y) => () => Promise.race([Promise.resolve().then(x), Promise.resolve().then(y)]),
    empty: never
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor1<URI> = {
  URI,
  map: _map
}

/**
 * @category mapping
 * @since 2.10.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed1<URI> = {
  URI,
  of
}

/**
 * Runs computations in parallel.
 *
 * @category instances
 * @since 2.10.0
 */
export const ApplyPar: Apply1<URI> = {
  URI,
  map: _map,
  ap: _apPar
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.0.0
 */
export const apFirst = /*#__PURE__*/ apFirst_(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.0.0
 */
export const apSecond = /*#__PURE__*/ apSecond_(ApplyPar)

/**
 * Runs computations in parallel.
 *
 * @category instances
 * @since 2.7.0
 */
export const ApplicativePar: Applicative1<URI> = {
  URI,
  map: _map,
  ap: _apPar,
  of
}

/**
 * Runs computations sequentially.
 *
 * @category instances
 * @since 2.10.0
 */
export const ApplySeq: Apply1<URI> = {
  URI,
  map: _map,
  ap: _apSeq
}

/**
 * Runs computations sequentially.
 *
 * @category instances
 * @since 2.7.0
 */
export const ApplicativeSeq: Applicative1<URI> = {
  URI,
  map: _map,
  ap: _apSeq,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Chain: Chain1<URI> = {
  URI,
  map: _map,
  ap: _apPar,
  chain: _chain
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Monad: Monad1<URI> = {
  URI,
  map: _map,
  of,
  ap: _apPar,
  chain: _chain
}

/**
 * @category instances
 * @since 2.10.0
 */
export const MonadIO: MonadIO1<URI> = {
  URI,
  map: _map,
  of,
  ap: _apPar,
  chain: _chain,
  fromIO
}

/**
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
export const fromTask: <A>(fa: Task<A>) => Task<A> = identity

/**
 * @category instances
 * @since 2.10.0
 */
export const MonadTask: MonadTask1<URI> = {
  URI,
  map: _map,
  of,
  ap: _apPar,
  chain: _chain,
  fromIO,
  fromTask
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => Task<B>) => (first: Task<A>) => Task<A> = /*#__PURE__*/ chainFirst_(Chain)

/**
 * @category instances
 * @since 2.10.0
 */
export const FromIO: FromIO1<URI> = {
  URI,
  fromIO
}

/**
 * @category lifting
 * @since 2.4.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => (...a: A) => Task<B> =
  /*#__PURE__*/ fromIOK_(FromIO)

/**
 * @category sequencing
 * @since 2.4.0
 */
export const chainIOK: <A, B>(f: (a: A) => IO<B>) => (first: Task<A>) => Task<B> = /*#__PURE__*/ chainIOK_(
  FromIO,
  Chain
)

/**
 * @category sequencing
 * @since 2.10.0
 */
export const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => (first: Task<A>) => Task<A> = /*#__PURE__*/ chainFirstIOK_(
  FromIO,
  Chain
)

/**
 * @category instances
 * @since 2.10.0
 */
export const FromTask: FromTask1<URI> = {
  URI,
  fromIO,
  fromTask
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * A `Task` that never completes.
 *
 * @since 2.0.0
 */
export const never: Task<never> = () => new Promise((_) => undefined)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 2.9.0
 */
export const Do: Task<{}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @category do notation
 * @since 2.8.0
 */
export const bindTo = /*#__PURE__*/ bindTo_(Functor)

const let_ = /*#__PURE__*/ let__(Functor)

export {
  /**
   * @category do notation
   * @since 2.13.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 2.8.0
 */
export const bind = /*#__PURE__*/ bind_(Chain)

/**
 * @category do notation
 * @since 2.8.0
 */
export const apS = /*#__PURE__*/ apS_(ApplyPar)

/**
 * @since 2.11.0
 */
export const ApT: Task<readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, B>(f: (index: number, a: A) => Task<B>) =>
  (as: ReadonlyNonEmptyArray<A>): Task<ReadonlyNonEmptyArray<B>> =>
  () =>
    Promise.all(as.map((a, i) => Promise.resolve().then(() => f(i, a)()))) as any

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => Task<B>
): ((as: ReadonlyArray<A>) => Task<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq =
  <A, B>(f: (index: number, a: A) => Task<B>) =>
  (as: ReadonlyNonEmptyArray<A>): Task<ReadonlyNonEmptyArray<B>> =>
  () =>
    _.tail(as).reduce<Promise<NonEmptyArray<B>>>(
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
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, B>(
  f: (index: number, a: A) => Task<B>
): ((as: ReadonlyArray<A>) => Task<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (as: ReadonlyArray<A>) => Task<ReadonlyArray<B>> = traverseReadonlyArrayWithIndex

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const traverseArray = <A, B>(f: (a: A) => Task<B>): ((as: ReadonlyArray<A>) => Task<ReadonlyArray<B>>) =>
  traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const sequenceArray: <A>(arr: ReadonlyArray<Task<A>>) => Task<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseArray(identity)

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const traverseSeqArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (as: ReadonlyArray<A>) => Task<ReadonlyArray<B>> = traverseReadonlyArrayWithIndexSeq

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const traverseSeqArray = <A, B>(f: (a: A) => Task<B>): ((as: ReadonlyArray<A>) => Task<ReadonlyArray<B>>) =>
  traverseReadonlyArrayWithIndexSeq((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const sequenceSeqArray: <A>(arr: ReadonlyArray<Task<A>>) => Task<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseSeqArray(identity)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `T.Functor` instead of `T.task`
 * (where `T` is from `import T from 'fp-ts/Task'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const task: Monad1<URI> & MonadTask1<URI> = {
  URI,
  map: _map,
  of,
  ap: _apPar,
  chain: _chain,
  fromIO,
  fromTask
}

/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `T.Functor` instead of `T.taskSeq`
 * (where `T` is from `import T from 'fp-ts/Task'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const taskSeq: Monad1<URI> & MonadTask1<URI> = {
  URI,
  map: _map,
  of,
  ap: _apSeq,
  chain: _chain,
  fromIO,
  fromTask
}

/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<Task<A>> = /*#__PURE__*/ getApplySemigroup_(ApplySeq)

/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * Lift a monoid into 'Task', the inner values are concatenated using the provided `Monoid`.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getMonoid: <A>(M: Monoid<A>) => Monoid<Task<A>> = /*#__PURE__*/ getApplicativeMonoid(ApplicativeSeq)
