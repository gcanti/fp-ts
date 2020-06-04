/**
 * @since 2.0.0
 */
import { monadIdentity } from './Identity'
import { Monad2 } from './Monad'
import { getStateM } from './StateT'
import { identity } from './function'

const T = /*#__PURE__*/ getStateM(monadIdentity)

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly State: State<E, A>
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

/* tslint:disable:readonly-array */
/**
 * @since 2.0.0
 */
export interface State<S, A> {
  (s: S): [A, S]
}
/* tslint:enable:readonly-array */

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
export const of: <S, A>(a: A) => State<S, A> = T.of

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const ap: <E, A>(fa: State<E, A>) => <B>(fab: State<E, (a: A) => B>) => State<E, B> = (fa) => (fab) =>
  T.ap(fab, fa)

/**
 * @since 2.0.0
 */
export const apFirst = <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>): State<E, A> =>
  T.ap(
    T.map(fa, (a) => (_: B) => a),
    fb
  )

/**
 * @since 2.0.0
 */
export const apSecond: <E, B>(fb: State<E, B>) => <A>(fa: State<E, A>) => State<E, B> = (fb) => (fa) =>
  T.ap(
    T.map(fa, () => (b) => b),
    fb
  )

/**
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, B> = (f) => (ma) =>
  T.chain(ma, f)

/**
 * @since 2.0.0
 */
export const chainFirst: <E, A, B>(f: (a: A) => State<E, B>) => (ma: State<E, A>) => State<E, A> = (f) => (ma) =>
  T.chain(ma, (a) => T.map(f(a), () => a))

/**
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: State<E, State<E, A>>) => State<E, A> = (mma) => T.chain(mma, identity)

/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B> = (f) => (fa) => T.map(fa, f)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const state: Monad2<URI> = {
  URI,
  map: T.map,
  of,
  ap: T.ap,
  chain: T.chain
}
