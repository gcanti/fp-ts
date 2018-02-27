import { Monoid } from './Monoid'
import { Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { Semigroup } from './Semigroup'
import { phantom } from './function'

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
    const [a, w] = this.run()
    return new Writer(() => [f(a), w])
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

/** @function */
export const tell = <W>(w: W): Writer<W, void> => {
  return new Writer(() => [undefined, w])
}

/** @function */
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

/** @instance */
export const writer: Functor2<URI> = {
  URI,
  map
}
