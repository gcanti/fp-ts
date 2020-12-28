/**
 * @since 2.0.0
 */
import { identity, pipe, bind_, bindTo_, flow } from './function'
import { Functor2 } from './Functor'
import { Monad2 } from './Monad'
import { Applicative2 } from './Applicative'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/* tslint:disable:readonly-array */
/**
 * @category model
 * @since 2.0.0
 */
export interface State<S, A> {
  (s: S): [A, S]
}
/* tslint:enable:readonly-array */

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Get the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const get: <S>() => State<S, S> = () => (s) => [s, s]

/**
 * Set the state
 *
 * @category constructors
 * @since 2.0.0
 */
export const put: <S>(s: S) => State<S, void> = (s) => () => [undefined, s]

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const modify: <S>(f: (s: S) => S) => State<S, void> = (f) => (s) => [undefined, f(s)]

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 2.0.0
 */
export const gets: <S, A>(f: (s: S) => A) => State<S, A> = (f) => (s) => [f(s), s]

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const map_: Monad2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const ap_: Monad2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const chain_: Monad2<URI>['chain'] = (ma, f) => pipe(ma, chain(f))

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
export const map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B> = (f) => (fa) => (s1) => {
  const [a, s2] = fa(s1)
  return [f(a), s2]
}

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B> = (fa) => (fab) => (s1) => {
  const [f, s2] = fab(s1)
  const [a, s3] = fa(s2)
  return [f(a), s3]
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apFirst: <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, A> = (fb) =>
  flow(
    map((a) => () => a),
    ap(fb)
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apSecond = <E, B>(fb: State<E, B>): (<A>(fa: State<E, A>) => State<E, B>) =>
  flow(
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
export const of: Applicative2<URI>['of'] = (a) => (s) => [a, s]

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B> = (f) => (ma) => (s1) => {
  const [a, s2] = ma(s1)
  return f(a)(s2)
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
export const chainFirst: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, A> = (f) =>
  chain((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: State<E, State<E, A>>) => State<E, A> =
  /*#__PURE__*/
  chain(identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'State'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: State<E, A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad2<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of,
  chain: chain_
}

// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export const state: Monad2<URI> = Monad

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Use `evaluate` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export const evalState: <S, A>(ma: State<S, A>, s: S) => A = (ma, s) => ma(s)[0]

/**
 * Use `execute` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export const execState: <S, A>(ma: State<S, A>, s: S) => S = (ma, s) => ma(s)[1]

/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.8.0
 */
export const evaluate = <S>(s: S) => <A>(ma: State<S, A>): A => ma(s)[0]

/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.8.0
 */
export const execute = <S>(s: S) => <A>(ma: State<S, A>): S => ma(s)[1]

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const bindTo = <N extends string>(name: N): (<S, A>(fa: State<S, A>) => State<S, { [K in N]: A }>) =>
  map(bindTo_(name))

/**
 * @since 2.8.0
 */
export const bind = <N extends string, A, S, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => State<S, B>
): ((fa: State<S, A>) => State<S, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  chain((a) =>
    pipe(
      f(a),
      map((b) => bind_(a, name, b))
    )
  )

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apS = <A, N extends string, S, B>(
  name: Exclude<N, keyof A>,
  fb: State<S, B>
): ((fa: State<S, A>) => State<S, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  flow(
    map((a) => (b: B) => bind_(a, name, b)),
    ap(fb)
  )

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
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
 * @since 2.9.0
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
 * @since 2.9.0
 */
export const sequenceArray: <S, A>(arr: ReadonlyArray<State<S, A>>) => State<S, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity)
