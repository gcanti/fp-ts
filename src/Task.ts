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
import { apFirst as apFirst_, Apply1, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import { ap as apSeq_, bind as bind_, Chain1, chainFirst as chainFirst_ } from './Chain'
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, FromIO1, fromIOK as fromIOK_ } from './FromIO'
import { FromTask1 } from './FromTask'
import { identity } from './function'
import { bindTo as bindTo_, flap as flap_, Functor1, tupled as tupled_ } from './Functor'
import * as _ from './internal'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { NonEmptyArray } from './NonEmptyArray'
import { Pointed1 } from './Pointed'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'

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
 * @category Chain
 * @since 3.0.0
 */
export const chain: Chain1<URI>['chain'] = (f) => (ma) => () => ma().then((a) => f(a)())

/**
 * Derivable from `Chain`.
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
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed1<URI> = {
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

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain1<URI> = {
  map,
  chain
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

const apSeq =
  /*#__PURE__*/
  apSeq_(Monad)

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
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO1<URI> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK =
  /*#__PURE__*/
  fromIOK_(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK =
  /*#__PURE__*/
  chainIOK_(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK =
  /*#__PURE__*/
  chainFirstIOK_(FromIO, Chain)

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
  of(_.emptyRecord)

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
  bind_(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplyPar)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Task<readonly []> = of(_.emptyReadonlyArray)

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
  apT_(ApplyPar)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, B>(f: (index: number, a: A) => Task<B>) => (
  as: ReadonlyNonEmptyArray<A>
): Task<ReadonlyNonEmptyArray<B>> => () => Promise.all(as.map((a, i) => f(i, a)())) as any

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
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
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq = <A, B>(f: (index: number, a: A) => Task<B>) => (
  as: ReadonlyNonEmptyArray<A>
): Task<ReadonlyNonEmptyArray<B>> => () =>
  _.tail(as).reduce<Promise<NonEmptyArray<B>>>(
    (acc, a, i) =>
      acc.then((bs) =>
        f(i + 1, a)().then((b) => {
          bs.push(b)
          return bs
        })
      ),
    f(0, _.head(as))().then(_.singleton)
  )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, B>(
  f: (index: number, a: A) => Task<B>
): ((as: ReadonlyArray<A>) => Task<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}
