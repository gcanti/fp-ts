import { phantom } from './function'
import { Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Writer: Writer<L, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Writer'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface Writer<W, A> {
  (): [A, W]
}

/**
 * @since 2.0.0
 */
export function evalWriter<W, A>(fa: Writer<W, A>): A {
  return fa()[0]
}

/**
 * @since 2.0.0
 */
export function execWriter<W, A>(fa: Writer<W, A>): W {
  return fa()[1]
}

/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
export function tell<W>(w: W): Writer<W, void> {
  return () => [undefined, w]
}

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
export function listen<W, A>(fa: Writer<W, A>): Writer<W, [A, W]> {
  return () => {
    const [a, w] = fa()
    return [[a, w], w]
  }
}

/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
export function pass<W, A>(fa: Writer<W, [A, (w: W) => W]>): Writer<W, A> {
  return () => {
    const [[a, f], w] = fa()
    return [a, f(w)]
  }
}

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
export function listens<W, B>(f: (w: W) => B): <A>(fa: Writer<W, A>) => Writer<W, [A, B]> {
  return fa => () => {
    const [a, w] = fa()
    return [[a, f(w)], w]
  }
}

/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
export function censor<W>(f: (w: W) => W): <A>(fa: Writer<W, A>) => Writer<W, A> {
  return fa => () => {
    const [a, w] = fa()
    return [a, f(w)]
  }
}

const map = <W, A, B>(fa: Writer<W, A>, f: (a: A) => B): Writer<W, B> => {
  return () => {
    const [a, w] = fa()
    return [f(a), w]
  }
}

/**
 * @since 2.0.0
 */
export function getMonad<W>(M: Monoid<W>): Monad2C<URI, W> {
  return {
    URI,
    _L: phantom,
    map,
    of: a => () => [a, M.empty],
    ap: (mab, ma) => () => {
      const [f, w1] = mab()
      const [a, w2] = ma()
      return [f(a), M.concat(w1, w2)]
    },
    chain: (ma, f) => () => {
      const [a, w1] = ma()
      const [b, w2] = f(a)()
      return [b, M.concat(w1, w2)]
    }
  }
}

/**
 * @since 2.0.0
 */
export const writer: Functor2<URI> = {
  URI,
  map
}
