/**
 * @since 2.0.0
 */
import { Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { pipe } from './function'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

// tslint:disable:readonly-array
/**
 * @category model
 * @since 2.0.0
 */
export interface Writer<W, A> {
  (): [A, W]
}
// tslint:enable:readonly-array

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Appends a value to the accumulator
 *
 * @category combinators
 * @since 2.0.0
 */
export const tell: <W>(w: W) => Writer<W, void> = (w) => () => [undefined, w]

// tslint:disable:readonly-array
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @category combinators
 * @since 2.0.0
 */
export const listen: <W, A>(fa: Writer<W, A>) => Writer<W, [A, W]> = (fa) => () => {
  const [a, w] = fa()
  return [[a, w], w]
}

// tslint:enable:readonly-array

// tslint:disable:readonly-array
/**
 * Applies the returned function to the accumulator
 *
 * @category combinators
 * @since 2.0.0
 */
export const pass: <W, A>(fa: Writer<W, [A, (w: W) => W]>) => Writer<W, A> = (fa) => () => {
  const [[a, f], w] = fa()
  return [a, f(w)]
}
// tslint:enable:readonly-array

// tslint:disable:readonly-array
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @category combinators
 * @since 2.0.0
 */
export const listens: <W, B>(f: (w: W) => B) => <A>(fa: Writer<W, A>) => Writer<W, [A, B]> = (f) => (fa) => () => {
  const [a, w] = fa()
  return [[a, f(w)], w]
}
// tslint:enable:readonly-array

/**
 * Modify the final accumulator value by applying a function
 *
 * @category combinators
 * @since 2.0.0
 */
export const censor: <W>(f: (w: W) => W) => <A>(fa: Writer<W, A>) => Writer<W, A> = (f) => (fa) => () => {
  const [a, w] = fa()
  return [a, f(w)]
}

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const map_: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))

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
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B> = (f) => (fa) => () => {
  const [a, w] = fa()
  return [f(a), w]
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Writer'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Writer<E, A>
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getMonad<W>(M: Monoid<W>): Monad2C<URI, W> {
  return {
    URI,
    _E: undefined as any,
    map: map_,
    ap: (fab, fa) => () => {
      const [f, w1] = fab()
      const [a, w2] = fa()
      return [f(a), M.concat(w1, w2)]
    },
    of: (a) => () => [a, M.empty],
    chain: (fa, f) => () => {
      const [a, w1] = fa()
      const [b, w2] = f(a)()
      return [b, M.concat(w1, w2)]
    }
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

// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export const writer: Functor2<URI> = Functor

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Use `evaluate` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export const evalWriter: <W, A>(fa: Writer<W, A>) => A = (fa) => fa()[0]

/**
 * Use `execute` instead
 *
 * @since 2.0.0
 * @deprecated
 */
export const execWriter: <W, A>(fa: Writer<W, A>) => W = (fa) => fa()[1]

/**
 * @since 2.8.0
 */
export const evaluate: <W, A>(fa: Writer<W, A>) => A = (fa) => fa()[0]

/**
 * @since 2.8.0
 */
export const execute: <W, A>(fa: Writer<W, A>) => W = (fa) => fa()[1]
