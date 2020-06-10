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
import { identity } from './function'
import { IO } from './IO'
import { Monad1 } from './Monad'
import { MonadTask1 } from './MonadTask'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Apply1 } from './Apply'

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
 * @category constructors
 * @since 2.0.0
 */
export const fromIO: <A>(ma: IO<A>) => Task<A> = (ma) => () => Promise.resolve(ma())

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Creates a task that will complete after a time delay
 *
 * @example
 * import { sequenceT } from 'fp-ts/lib/Apply'
 * import * as T from 'fp-ts/lib/Task'
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
// pipeables
// -------------------------------------------------------------------------------------

const map_: <A, B>(fa: Task<A>, f: (a: A) => B) => Task<B> = (ma, f) => () => ma().then(f)
const ap_: <A, B>(fab: Task<(a: A) => B>, fa: Task<A>) => Task<B> = (mab, ma) => () =>
  Promise.all([mab(), ma()]).then(([f, a]) => f(a))
const chain_: <A, B>(fa: Task<A>, f: (a: A) => Task<B>) => Task<B> = (ma, f) => () => ma().then((a) => f(a)())

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B> = (f) => (fa) => map_(fa, f)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B> = (fa) => (fab) => ap_(fab, fa)

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apFirst: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<A> = (fb) => (fa) =>
  ap_(
    map_(fa, (a) => () => a),
    fb
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apSecond: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<B> = (fb) => (fa) =>
  ap_(
    map_(fa, () => (b) => b),
    fb
  )

/**
 * @category Applicative
 * @since 2.0.0
 */
export const of: <A>(a: A) => Task<A> = (a) => () => Promise.resolve(a)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B> = (f) => (ma) => chain_(ma, f)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<A> = (f) => (ma) =>
  chain_(ma, (a) => map_(f(a), () => a))

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <A>(mma: Task<Task<A>>) => Task<A> = (mma) => chain_(mma, identity)

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
 * @internal
 */
export const applyTask: Apply1<URI> = {
  URI,
  map: map_,
  ap: ap_
}

/**
 * @internal
 */
export const monadTask: Monad1<URI> = {
  URI,
  map: map_,
  of,
  ap: ap_,
  chain: chain_
}

/**
 * Lift a semigroup into 'Task', the inner values are concatenated using the provided `Semigroup`.
 *
 * @example
 * import * as T from 'fp-ts/lib/Task'
 * import { semigroupString } from 'fp-ts/lib/Semigroup'
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
 */
export function getSemigroup<A>(S: Semigroup<A>): Semigroup<Task<A>> {
  return {
    concat: (x, y) => () => x().then((rx) => y().then((ry) => S.concat(rx, ry)))
  }
}

/**
 * Lift a monoid into 'Task', the inner values are concatenated using the provided `Monoid`.
 *
 * @category instances
 * @since 2.0.0
 */
export function getMonoid<A>(M: Monoid<A>): Monoid<Task<A>> {
  return {
    concat: getSemigroup(M).concat,
    empty: of(M.empty)
  }
}

/**
 * Monoid returning the first completed task.
 *
 * Note: uses `Promise.race` internally.
 *
 * @example
 * import * as T from 'fp-ts/lib/Task'
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
 * @since 2.0.0
 */
export const task: Monad1<URI> & MonadTask1<URI> = {
  URI,
  map: map_,
  of,
  ap: ap_,
  chain: chain_,
  fromIO,
  fromTask: identity
}

/**
 * Like `task` but `ap` is sequential
 *
 * @category instances
 * @since 2.0.0
 */
export const taskSeq: typeof task = {
  URI,
  map: map_,
  of,
  ap: (mab, ma) => () => mab().then((f) => ma().then((a) => f(a))),
  chain: chain_,
  fromIO,
  fromTask: identity
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
