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
import { apFirst_, Apply1, apSecond_, apS_, getApplySemigroup as getApplySemigroup_ } from './Apply'
import { FromIO1 } from './FromIO'
import { identity, pipe } from './function'
import { bindTo_, Functor1 } from './Functor'
import { IO } from './IO'
import { bind_, chainFirst_, Monad1 } from './Monad'
import { MonadTask1 } from './MonadTask'
import { Monoid } from './Monoid'
import { Pointed1 } from './Pointed'
import { Semigroup } from './Semigroup'

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
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category FromIO
 * @since 2.0.0
 */
export const fromIO: FromIO1<URI>['fromIO'] = (ma) => () => Promise.resolve(ma())

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Creates a task that will complete after a time delay
 *
 * @example
 * import { sequenceT } from 'fp-ts/Apply'
 * import * as T from 'fp-ts/Task'
 *
 * async function test() {
 *   const log: Array<string> = []
 *   const append = (message: string): T.Task<void> =>
 *     T.fromIO(() => {
 *       log.push(message)
 *     })
 *   const fa = append('a')
 *   const fb = append('b')
 *   const fc = T.delay(10)(append('c'))
 *   const fd = append('d')
 *   await sequenceT(T.task)(fa, fb, fc, fd)()
 *   assert.deepStrictEqual(log, ['a', 'b', 'd', 'c'])
 * }
 *
 * test()
 *
 * @category combinators
 * @since 2.0.0
 */
export function delay(millis: number): <A>(ma: Task<A>) => Task<A> {
  return (ma) => () =>
    new Promise((resolve) => {
      setTimeout(() => {
        // tslint:disable-next-line: no-floating-promises
        ma().then(resolve)
      }, millis)
    })
}

/**
 * @category combinators
 * @since 2.4.0
 */
export function fromIOK<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): (...a: A) => Task<B> {
  return (...a) => fromIO(f(...a))
}

/**
 * @category combinators
 * @since 2.4.0
 */
export function chainIOK<A, B>(f: (a: A) => IO<B>): (ma: Task<A>) => Task<B> {
  return chain(fromIOK(f))
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Monad1<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _apPar: Monad1<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
const _apSeq: Monad1<URI>['ap'] = (fab, fa) =>
  pipe(
    fab,
    chain((f) => pipe(fa, map(f)))
  )
const _chain: Monad1<URI>['chain'] = (ma, f) => pipe(ma, chain(f))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B> = (f) => (fa) => () => fa().then(f)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B> = (fa) => (fab) => () =>
  Promise.all([fab(), fa()]).then(([f, a]) => f(a))

/**
 * @category Pointed
 * @since 2.0.0
 */
export const of: Pointed1<URI>['of'] = (a) => () => Promise.resolve(a)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B> = (f) => (ma) => () =>
  ma().then((a) => f(a)())

/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <A>(mma: Task<Task<A>>) => Task<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @category MonadTask
 * @since 2.7.0
 */
export const fromTask: MonadTask1<URI>['fromTask'] = identity

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Task'

/**
 * @category instances
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
    concat: (x, y) => () => Promise.race([x(), y()]),
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
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed1<URI> = {
  URI,
  map: _map,
  of
}

/**
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
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(ApplyPar)

/**
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
 * @category instances
 * @since 2.10.0
 */
export const ApplySeq: Apply1<URI> = {
  URI,
  map: _map,
  ap: _apSeq
}

/**
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
 * @internal
 */
export const Monad: Monad1<URI> = {
  URI,
  map: _map,
  of,
  ap: _apPar,
  chain: _chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * @category instances
 * @since 2.10.0
 */
export const FromIO: FromIO1<URI> = {
  URI,
  fromIO
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
 * @since 2.9.0
 */
export const Do: Task<{}> =
  /*#__PURE__*/
  of({})

/**
 * @since 2.8.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 2.8.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Monad)

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplyPar)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (arr: ReadonlyArray<A>) => Task<ReadonlyArray<B>> = (f) => (arr) => () => Promise.all(arr.map((x, i) => f(i, x)()))

/**
 * this function map array to task using provided function and transform it to a task of array.
 *
 * this function has the same behavior of `A.traverse(T.task)` but it's stack safe.
 *
 * > **This function run all task in parallel for sequential use `traverseSeqArray` **
 *
 * @example
 * import { range } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 * import { of, traverseArray } from 'fp-ts/Task'
 * async function test() {
 *   const arr = range(0, 10)
 *   assert.deepStrictEqual(await pipe(arr, traverseArray(of))(), arr)
 * }
 *
 * test()
 *
 * @since 2.9.0
 */
export const traverseArray: <A, B>(f: (a: A) => Task<B>) => (arr: ReadonlyArray<A>) => Task<ReadonlyArray<B>> = (f) =>
  traverseArrayWithIndex((_, a) => f(a))

/**
 * this function works like `Promise.all` it will get an array of tasks and return a task of array.
 *
 * this function has the same behavior of `A.sequence(T.task)` but it's stack safe.
 *
 * > **This function run all task in parallel for sequential use `sequenceSeqArray` **
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 * import { of, sequenceArray } from 'fp-ts/Task'
 *
 * async function test() {
 *   const arr = RA.range(1, 10)
 *   assert.deepStrictEqual(await pipe(arr, RA.map(of), sequenceArray)(), arr)
 * }
 *
 * test()
 *
 * @since 2.9.0
 */
export const sequenceArray: <A>(arr: ReadonlyArray<Task<A>>) => Task<ReadonlyArray<A>> = (arr) => () =>
  Promise.all(arr.map((x) => x()))
/**
 * @since 2.9.0
 */
export const traverseSeqArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Task<B>
) => (arr: ReadonlyArray<A>) => Task<ReadonlyArray<B>> = (f) => (arr) => async () => {
  // tslint:disable-next-line: readonly-array
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const r = await f(i, arr[i])()
    result.push(r)
  }

  return result
}

/**
 * runs an action for every element in array then run task sequential, and accumulates the results in the array.
 *
 * this function has the same behavior of `A.traverse(T.taskSeq)` but it's stack safe.
 *
 * > **This function run all task sequentially for parallel use `traverseArray` **
 *
 *
 * @since 2.9.0
 */
export const traverseSeqArray: <A, B>(f: (a: A) => Task<B>) => (arr: ReadonlyArray<A>) => Task<ReadonlyArray<B>> = (
  f
) => traverseSeqArrayWithIndex((_, a) => f(a))

/**
 * run tasks in array sequential and give a task of array
 *
 * this function has the same behavior of `A.sequence(T.taskSeq)` but it's stack safe.
 *
 * > **This function run all task sequentially for parallel use `sequenceArray` **
 *
 * @since 2.9.0
 */
export const sequenceSeqArray: <A>(arr: ReadonlyArray<Task<A>>) => Task<ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseSeqArray(identity)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use small, specific instances instead.
 *
 * @category instances
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
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const taskSeq: typeof task = {
  URI,
  map: _map,
  of,
  ap: _apSeq,
  chain: _chain,
  fromIO,
  fromTask
}

/**
 * Use `Apply.getApplySemigroup` instead.
 *
 * Lift a semigroup into 'Task', the inner values are concatenated using the provided `Semigroup`.
 *
 * @example
 * import * as T from 'fp-ts/Task'
 * import { semigroupString } from 'fp-ts/Semigroup'
 *
 * async function test() {
 *   const S = T.getSemigroup(semigroupString)
 *   const fa = T.of('a')
 *   const fb = T.of('b')
 *   assert.deepStrictEqual(await S.concat(fa, fb)(), 'ab')
 * }
 *
 * test()
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<Task<A>> =
  /*#__PURE__*/
  getApplySemigroup_(ApplySeq)

/**
 * Use `Applicative.getApplicativeMonoid` instead.
 *
 * Lift a monoid into 'Task', the inner values are concatenated using the provided `Monoid`.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const getMonoid: <A>(M: Monoid<A>) => Monoid<Task<A>> =
  /*#__PURE__*/
  getApplicativeMonoid(ApplicativeSeq)
