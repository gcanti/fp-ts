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
export const URI = 'Task'

/**
 * @category model
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Task<A>
  }
}

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
export function fromIO<A>(ma: IO<A>): Task<A> {
  return () => Promise.resolve(ma())
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Creates a task that will complete after a time delay
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
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B> = (f) => (fa) => map_(fa, f)

/**
 * @category Apply
 * @since 2.0.0
 */
export const ap: <A>(fa: Task<A>) => <B>(fab: Task<(a: A) => B>) => Task<B> = (fa) => (fab) => ap_(fab, fa)

/**
 * @category Apply
 * @since 2.0.0
 */
export const apFirst: <B>(fb: Task<B>) => <A>(fa: Task<A>) => Task<A> = (fb) => (fa) =>
  ap_(
    map_(fa, (a) => () => a),
    fb
  )

/**
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
 * @category Monad
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => Task<B>) => (ma: Task<A>) => Task<B> = (f) => (ma) => chain_(ma, f)

/**
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
 * Note: uses `Promise.race` internally
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
 * Like `Task` but `ap` is sequential
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
 * @since 2.0.0
 */
export const never: Task<never> = () => new Promise((_) => undefined)
