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
import { Applicative1 } from './Applicative'
import { apFirst_, Apply1, apSecond_, apS_, apT_ } from './Apply'
import { FromIO1 } from './FromIO'
import { FromTask1 } from './FromTask'
import { identity, pipe } from './function'
import { bindTo_, Functor1, tupled_ } from './Functor'
import { IO } from './IO'
import { bind_, chainFirst_, Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { Pointed1 } from './Pointed'

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
 * @category constructors
 * @since 3.0.0
 */
export const fromIO: FromIO1<URI>['fromIO'] = (ma) => () => Promise.resolve(ma())

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Creates a task that will complete after a time delay
 *
 * @example
 * import { pipe } from 'fp-ts/function'
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
 *   await pipe(T.ApT, T.apT(fa), T.apT(fb), T.apT(fc), T.apT(fd))()
 *   assert.deepStrictEqual(log, ['a', 'b', 'd', 'c'])
 * }
 *
 * test()
 *
 * @category combinators
 * @since 3.0.0
 */
export const delay = (millis: number) => <A>(ma: Task<A>): Task<A> => () =>
  new Promise((resolve) => {
    setTimeout(() => {
      // tslint:disable-next-line: no-floating-promises
      ma().then(resolve)
    }, millis)
  })

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK = <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>): ((...a: A) => Task<B>) => (...a) =>
  fromIO(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK = <A, B>(f: (a: A) => IO<B>): ((ma: Task<A>) => Task<B>) => chain(fromIOK(f))

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
export const map: Functor1<URI>['map'] = (f) => (fa) => () => fa().then(f)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply1<URI>['ap'] = (fa) => (fab) => () => Promise.all([fab(), fa()]).then(([f, a]) => f(a))

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: Pointed1<URI>['of'] = (a) => () => Promise.resolve(a)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 3.0.0
 */
export const chain: Monad1<URI>['chain'] = (f) => (ma) => () => ma().then((a) => f(a)())

/**
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: Task<Task<A>>) => Task<A> =
  /*#__PURE__*/
  chain(identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'Task'

declare module './HKT' {
  interface URItoKind<A> {
    readonly Task: Task<A>
  }
}

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
 *   assert.deepStrictEqual(await pipe(fa, S.concat(fb))(), 'b')
 * }
 *
 * test()
 *
 * @category instances
 * @since 3.0.0
 */
export const getRaceMonoid = <A = never>(): Monoid<Task<A>> => ({
  concat: (second) => (first) => () => Promise.race([first(), second()]),
  empty: never
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor1<URI> = {
  map
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed1<URI> = {
  map,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply1<URI> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: Applicative1<URI> = {
  map,
  ap,
  of
}

const apSeq: Apply1<URI>['ap'] = (fa) => chain((f) => pipe(fa, map(f)))

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Apply1<URI> = {
  map,
  ap: apSeq
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: Applicative1<URI> = {
  map,
  ap: apSeq,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad1<URI> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO1<URI> = {
  fromIO
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask1<URI> = {
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
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: Task<{}> =
  /*#__PURE__*/
  of({})

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Monad)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplicativePar)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Task<readonly []> = of([])

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT =
  /*#__PURE__*/
  apT_(ApplicativePar)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(f: (index: number, a: A) => Task<B>) => (
  as: ReadonlyArray<A>
): Task<ReadonlyArray<B>> => () => Promise.all(as.map((a, i) => f(i, a)()))

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray: <A, B>(f: (a: A) => Task<B>) => (as: ReadonlyArray<A>) => Task<ReadonlyArray<B>> = (
  f
) => traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(as: ReadonlyArray<Task<A>>) => Task<ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseReadonlyArray(identity)

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, B>(f: (index: number, a: A) => Task<B>) => (
  as: ReadonlyArray<A>
): Task<ReadonlyArray<B>> => async () => {
  // tslint:disable-next-line: readonly-array
  const out: Array<B> = []
  for (let i = 0; i < as.length; i++) {
    const r = await f(i, as[i])()
    out.push(r)
  }
  return out
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArraySeq: <A, B>(
  f: (a: A) => Task<B>
) => (as: ReadonlyArray<A>) => Task<ReadonlyArray<B>> = (f) => traverseReadonlyArrayWithIndexSeq((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArraySeq: <A>(as: ReadonlyArray<Task<A>>) => Task<ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseReadonlyArraySeq(identity)
