import { Monad2 } from './Monad'
import { getStateM } from './StateT'
import { identity } from './Identity'

const T = getStateM(identity)

declare module './HKT' {
  interface URI2HKT2<L, A> {
    State: State<L, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'State'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface State<S, A> {
  (s: S): [A, S]
}

/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.0.0
 */
export const evalState: <S, A>(ma: State<S, A>, s: S) => A = T.evalState

/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.0.0
 */
export const execState: <S, A>(ma: State<S, A>, s: S) => S = T.execState

/**
 * Get the current state
 *
 * @since 2.0.0
 */
export const get: <S>() => State<S, S> = T.get

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
