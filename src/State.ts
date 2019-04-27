import { Monad2 } from './Monad'
import { getStateT } from './StateT'
import { identity } from './Identity'

const T = getStateT(identity)

declare module './HKT' {
  interface URI2HKT2<L, A> {
    State: State<L, A>
  }
}

export const URI = 'State'

export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface State<S, A> {
  (s: S): [A, S]
}

/**
 * @since 2.0.0
 */
export function run<S, A>(ma: State<S, A>, s: S): [A, S] {
  return ma(s)
}

/**
 * @since 2.0.0
 */
export function evalState<S, A>(ma: State<S, A>, s: S): A {
  return ma(s)[0]
}

/**
 * @since 2.0.0
 */
export function execState<S, A>(ma: State<S, A>, s: S): S {
  return ma(s)[1]
}

/**
 * Get the current state
 *
 * @since 2.0.0
 */
export const get: <S>() => State<S, S> = () => T.get

/**
 * Set the state
 *
 * @since 2.0.0
 */
export const put: <S>(s: S) => State<S, void> = T.put

/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export const modify: <S>(f: (s: S) => S) => State<S, void> = T.modify

/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export const gets: <S, A>(f: (s: S) => A) => State<S, A> = T.gets

/**
 * @since 2.0.0
 */
export const state: Monad2<URI> = {
  URI,
  map: T.map,
  of: T.of,
  ap: T.ap,
  chain: T.chain
}
