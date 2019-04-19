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
 * @since 1.0.0
 */
export interface Writer<W, A> {
  (): [A, W]
}

/**
 * @since 2.0.0
 */
export const run = <W, A>(fa: Writer<W, A>): [A, W] => {
  return fa()
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

const map = <W, A, B>(fa: Writer<W, A>, f: (a: A) => B): Writer<W, B> => {
  return () => {
    const [a, w] = fa()
    return [f(a), w]
  }
}

/**
 * Appends a value to the accumulator
 *
 * @since 1.0.0
 */
export const tell = <W>(w: W): Writer<W, void> => {
  return () => [undefined, w]
}

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 1.3.0
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
 * @since 1.3.0
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
 * @since 1.3.0
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
 * @since 1.3.0
 */
export const censor = <W, A>(fa: Writer<W, A>, f: (w: W) => W): Writer<W, A> => {
  return () => {
    const [a, w] = fa()
    return [a, f(w)]
  }
}

/**
 *
 * @since 1.0.0
 */
export const getMonad = <W>(M: Monoid<W>): Monad2C<URI, W> => {
  const of = <A>(a: A): Writer<W, A> => {
    return () => [a, M.empty]
  }

  const ap = <A, B>(fab: Writer<W, (a: A) => B>, fa: Writer<W, A>): Writer<W, B> => {
    return () => {
      const [f, w1] = fab()
      const [a, w2] = fa()
      return [f(a), M.concat(w1, w2)]
    }
  }

  const chain = <A, B>(fa: Writer<W, A>, f: (a: A) => Writer<W, B>): Writer<W, B> => {
    return () => {
      const [a, w1] = fa()
      const [b, w2] = f(a)()
      return [b, M.concat(w1, w2)]
    }
  }

  return {
    URI,
    _L: phantom,
    map,
    of,
    ap,
    chain
  }
}

/**
 * @since 1.0.0
 */
export const writer: Functor2<URI> = {
  URI,
  map
}
