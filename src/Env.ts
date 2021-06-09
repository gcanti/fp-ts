/**
 * The Env comonad (aka the Coreader, Environment, or Product comonad)
 *
 * What the Store comonad is to the State monad, the Env comonad is to the
 * Reader monad.
 *
 * ```ts
 * import * as E from 'fp-ts/Env'
 *
 * const env: E.Env<number,string> = () => [5, "horse"]
 *
 * const repeat = (env: E.Env<number,string>):string => {
 *   const numRepeat = E.ask(env)
 *   const str = E.extract(env)
 *   return str.repeat(numRepeat)
 * }
 *
 * repeat(env) // "horsehorsehorsehorsehorse"
 * ```
 *
 * @since 3.0.0
 */
import { Comonad2 } from './Comonad'
import { identity, pipe, flow } from './function'
import { Functor2 } from './Functor'
import { Extend2 } from './Extend'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

// tslint:disable:readonly-array
/**
 * @category model
 * @since 3.0.0
 */
export interface Env<E, A> {
  (): [E, A]
}
// tslint:enable:readonly-array

/**
 * Returns the current environment
 *
 * @since 3.0.0
 */
export function ask<E, A>(wa: Env<E, A>): E {
  const [e] = wa()
  return e
}

/**
 * Returns the current environment modified by the given function
 *
 * @since 3.0.0
 */
export function asks<Ea, Eb>(f: (e: Ea) => Eb): <A>(wa: Env<Ea, A>) => Eb {
  return (wa) => f(ask(wa))
}

/**
 * Modifies the environment using the specified function
 *
 * @since 3.0.0
 */
export function local<Ea, Eb>(f: (e: Ea) => Eb): <A>(wa: Env<Ea, A>) => Env<Eb, A> {
  return (wa) => {
    const [e, a] = wa()
    return () => [f(e), a]
  }
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const map_: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const extend_: Extend2<URI>['extend'] = (wa, f) => pipe(wa, extend(f))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Extend
 * @since 3.0.0
 */
export const extend: <E, A, B>(f: (wa: Env<E, A>) => B) => (wa: Env<E, A>) => Env<E, B> = (f) => (wa) => {
  const [e] = wa()
  return () => [e, f(wa)]
}

/**
 * @category Extract
 * @since 3.0.0
 */
export const extract: <E, A>(wa: Env<E, A>) => A = (wa) => {
  const [, a] = wa()
  return a
}

/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const duplicate: <E, A>(wa: Env<E, A>) => Env<E, Env<E, A>> =
  /*#__PURE__*/
  extend(identity)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Env<E, A>) => Env<E, B> = (f) => (fa) => {
  const [e, a] = fa()
  return () => [e, f(a)]
}

/**
 * `extendK` is like `extend` flipped around to make composition easier.
 * This is like the =<= operator in https://hackage.haskell.org/package/comonad-5.0.8/docs/Control-Comonad.html
 *
 * @category Extend
 * @since 3.0.0
 */
export const extendK: <E, B, C>(wbc: (wa: Env<E, B>) => C) => <A>(wab: (wb: Env<E, A>) => B) => (wa: Env<E, A>) => C = (
  wbc
) => (wab) => {
  return flow(extend(wab), wbc)
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const URI = 'Env'

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Env<E, A>
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
export const Comonad: Comonad2<URI> = {
  URI,
  map: map_,
  extend: extend_,
  extract
}

// TODO: remove in v3
/**
 * @category instances
 * @since 3.0.0
 */
export const env: Comonad2<URI> = Comonad
