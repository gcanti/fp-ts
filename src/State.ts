/**
 * @since 3.0.0
 */
import { Applicative2 } from './Applicative'
import { apFirst_, apSecond_, apS_, apT_ } from './Apply'
import { identity, tuple } from './function'
import { bindTo_, Functor2 } from './Functor'
import { bind_, chainFirst_, Monad2 } from './Monad'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface State<S, A> {
  (s: S): readonly [A, S]
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Get the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const get: <S>() => State<S, S> = () => (s) => [s, s]

/**
 * Set the state
 *
 * @category constructors
 * @since 3.0.0
 */
export const put: <S>(s: S) => State<S, void> = (s) => () => [undefined, s]

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const modify: <S>(f: (s: S) => S) => State<S, void> = (f) => (s) => [undefined, f(s)]

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 3.0.0
 */
export const gets: <S, A>(f: (s: S) => A) => State<S, A> = (f) => (s) => [f(s), s]

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B> = (f) => (fa) => (s1) => {
  const [a, s2] = fa(s1)
  return [f(a), s2]
}

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Applicative2<URI>['ap'] = (fa) => (fab) => (s1) => {
  const [f, s2] = fab(s1)
  const [a, s3] = fa(s2)
  return [f(a), s3]
}

/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 3.0.0
 */
export const of: Applicative2<URI>['of'] = (a) => (s) => [a, s]

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 3.0.0
 */
export const chain: Monad2<URI>['chain'] = (f) => (ma) => (s1) => {
  const [a, s2] = ma(s1)
  return f(a)(s2)
}

/**
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <E, A>(mma: State<E, State<E, A>>) => State<E, A> =
  /*#__PURE__*/
  chain(identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const URI = 'State'

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: State<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst: <S, B>(second: State<S, B>) => <A>(first: State<S, A>) => State<S, A> =
  /*#__PURE__*/
  apFirst_(Applicative)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <S, B>(second: State<S, B>) => <A>(first: State<S, A>) => State<S, B> =
  /*#__PURE__*/
  apSecond_(Applicative)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad2<URI> = {
  URI,
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
export const chainFirst: <A, S, B>(f: (a: A) => State<S, B>) => (first: State<S, A>) => State<S, A> =
  /*#__PURE__*/
  chainFirst_(Monad)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 3.0.0
 */
export const evaluate = <S>(s: S) => <A>(ma: State<S, A>): A => ma(s)[0]

/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 3.0.0
 */
export const execute = <S>(s: S) => <A>(ma: State<S, A>): S => ma(s)[1]

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <S, A>(fa: State<S, A>) => State<S, { [K in N]: A }> =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, S, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => State<S, B>
) => (fa: State<S, A>) => State<S, { [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/
  bind_(Monad)

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, S, B>(
  name: Exclude<N, keyof A>,
  fb: State<S, B>
) => (fa: State<S, A>) => State<S, { [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/
  apS_(Applicative)

// -------------------------------------------------------------------------------------
// pipeable sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const tupled: <S, A>(a: State<S, A>) => State<S, readonly [A]> = map(tuple)

/**
 * @since 3.0.0
 */
export const apT: <S, B>(
  fb: State<S, B>
) => <A extends ReadonlyArray<unknown>>(fas: State<S, A>) => State<S, readonly [...A, B]> =
  /*#__PURE__*/
  apT_(Applicative)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const traverseArrayWithIndex: <A, S, B>(
  f: (index: number, a: A) => State<S, B>
) => (arr: ReadonlyArray<A>) => State<S, ReadonlyArray<B>> = (f) => (arr) => (s) => {
  let lastState = s
  // tslint:disable-next-line: readonly-array
  const values = []
  for (let i = 0; i < arr.length; i++) {
    const [newValue, newState] = f(i, arr[i])(lastState)
    values.push(newValue)
    lastState = newState
  }
  return [values, lastState]
}

/**
 * This function has the same behavior of `A.traverse(S.State)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { traverseArray, State } from 'fp-ts/State'
 * import { pipe, tuple } from 'fp-ts/function'
 *
 * const add = (n: number): State<number, number> => (s: number) => tuple(n, n + s)
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, traverseArray(add))(0), [arr, arr.reduce((p, c) => p + c, 0)])
 *
 * @since 3.0.0
 */
export const traverseArray: <A, S, B>(
  f: (a: A) => State<S, B>
) => (arr: ReadonlyArray<A>) => State<S, ReadonlyArray<B>> = (f) => traverseArrayWithIndex((_, a) => f(a))

/**
 * This function has the same behavior of `A.sequence(S.State)` but it's stack safe and optimized
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { sequenceArray, State } from 'fp-ts/State'
 * import { pipe, tuple } from 'fp-ts/function'
 *
 * const add = (n: number): State<number, number> => (s: number) => tuple(n, n + s)
 * const arr = RA.range(0, 100)
 *
 * assert.deepStrictEqual(pipe(arr, RA.map(add), sequenceArray)(0), [arr, arr.reduce((p, c) => p + c, 0)])
 *
 * @since 3.0.0
 */
export const sequenceArray: <S, A>(arr: ReadonlyArray<State<S, A>>) => State<S, ReadonlyArray<A>> = traverseArray(
  identity
)
