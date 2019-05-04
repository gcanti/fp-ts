import { phantom } from './function'
import { Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Writer: Writer<L, A>
  }
}

export const URI = 'Writer'

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
export const evalWriter = <W, A>(fa: Writer<W, A>): A => {
  return fa()[0]
}

/**
 * @since 2.0.0
 */
export const execWriter = <W, A>(fa: Writer<W, A>): W => {
  return fa()[1]
}

/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
export const tell = <W>(w: W): Writer<W, void> => {
  return () => [undefined, w]
}

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
export const listen = <W, A>(fa: Writer<W, A>): Writer<W, [A, W]> => {
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
export const pass = <W, A>(fa: Writer<W, [A, (w: W) => W]>): Writer<W, A> => {
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
export const listens = <W, A, B>(fa: Writer<W, A>, f: (w: W) => B): Writer<W, [A, B]> => {
  return () => {
    const [a, w] = fa()
    return [[a, f(w)], w]
  }
}

/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
export const censor = <W, A>(fa: Writer<W, A>, f: (w: W) => W): Writer<W, A> => {
  return () => {
    const [a, w] = fa()
    return [a, f(w)]
  }
}

function map<W, A, B>(fa: Writer<W, A>, f: (a: A) => B): Writer<W, B> {
  return () => {
    const [a, w] = fa()
    return [f(a), w]
  }
}

/**
 *
 * @since 2.0.0
 */
export const getMonad = <W>(M: Monoid<W>): Monad2C<URI, W> => {
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
