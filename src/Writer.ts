import { Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup_'
import { phantom, tuple } from './function'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Writer: Writer<L, A>
  }
}

export const URI = 'Writer'

export type URI = typeof URI

/**
 * @data
 * @constructor Writer
 * @since 1.0.0
 */
export class Writer<W, A> {
  readonly _A!: A
  readonly _L!: W
  readonly _URI!: URI
  constructor(readonly run: () => [A, W]) {}
  eval(): A {
    return this.run()[0]
  }
  exec(): W {
    return this.run()[1]
  }
  map<B>(f: (a: A) => B): Writer<W, B> {
    return new Writer(() => {
      const [a, w] = this.run()
      return [f(a), w]
    })
  }
}

const map = <W, A, B>(fa: Writer<W, A>, f: (a: A) => B): Writer<W, B> => {
  return fa.map(f)
}

const of = <W>(M: Monoid<W>) => <A>(a: A): Writer<W, A> => {
  return new Writer(() => [a, M.empty])
}

const ap = <W>(S: Semigroup<W>) => <A, B>(fab: Writer<W, (a: A) => B>, fa: Writer<W, A>): Writer<W, B> => {
  return new Writer(() => {
    const [f, w1] = fab.run()
    const [a, w2] = fa.run()
    return [f(a), S.concat(w1, w2)]
  })
}

const chain = <W>(S: Semigroup<W>) => <A, B>(fa: Writer<W, A>, f: (a: A) => Writer<W, B>): Writer<W, B> => {
  return new Writer(() => {
    const [a, w1] = fa.run()
    const [b, w2] = f(a).run()
    return [b, S.concat(w1, w2)]
  })
}

/**
 * Appends a value to the accumulator
 *
 * @since 1.0.0
 */
export const tell = <W>(w: W): Writer<W, void> => {
  return new Writer(() => [undefined, w])
}

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 1.3.0
 */
export const listen = <W, A>(fa: Writer<W, A>): Writer<W, [A, W]> => {
  return new Writer(() => {
    const [a, w] = fa.run()
    return [tuple(a, w), w]
  })
}

/**
 * Applies the returned function to the accumulator
 *
 * @since 1.3.0
 */
export const pass = <W, A>(fa: Writer<W, [A, (w: W) => W]>): Writer<W, A> => {
  return new Writer(() => {
    const [[a, f], w] = fa.run()
    return [a, f(w)]
  })
}

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 1.3.0
 */
export const listens = <W, A, B>(fa: Writer<W, A>, f: (w: W) => B): Writer<W, [A, B]> => {
  return new Writer(() => {
    const [a, w] = fa.run()
    return [tuple(a, f(w)), w]
  })
}

/**
 * Modify the final accumulator value by applying a function
 *
 * @since 1.3.0
 */
export const censor = <W, A>(fa: Writer<W, A>, f: (w: W) => W): Writer<W, A> => {
  return new Writer(() => {
    const [a, w] = fa.run()
    return [a, f(w)]
  })
}

/**
 *
 * @since 1.0.0
 */
export const getMonad = <W>(M: Monoid<W>): Monad2C<URI, W> => {
  return {
    URI,
    _L: phantom,
    map,
    of: of(M),
    ap: ap(M),
    chain: chain(M)
  }
}

/**
 * @since 1.0.0
 */
export const writer: Functor2<URI> = {
  URI,
  map
}
