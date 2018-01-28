import { Monoid } from './Monoid'
import { Functor } from './Functor'
import { Monad } from './Monad'
import { Lazy } from './function'

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
  readonly '-A': A
  readonly '-L': W
  readonly '-URI': URI
  constructor(readonly monoid: Monoid<W>, readonly run: Lazy<[A, W]>) {}
  eval(): A {
    return this.run()[0]
  }
  exec(): W {
    return this.run()[1]
  }
  map<B>(f: (a: A) => B): Writer<W, B> {
    const [a, w] = this.run()
    return new Writer(this.monoid, () => [f(a), w])
  }
  ap<B>(fab: Writer<W, (a: A) => B>): Writer<W, B> {
    return fab.chain(f => this.map(f))
  }
  ap_<B, C>(this: Writer<W, (b: B) => C>, fb: Writer<W, B>): Writer<W, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Writer<W, B>): Writer<W, B> {
    return new Writer(this.monoid, () => {
      const [a, w1] = this.run()
      const [b, w2] = f(a).run()
      return [b, this.monoid.concat(w1, w2)]
    })
  }
}

/** @function */
export const map = <W, A, B>(fa: Writer<W, A>, f: (a: A) => B): Writer<W, B> => {
  return fa.map(f)
}

/** @function */
export const of = <W>(M: Monoid<W>) => <A>(a: A): Writer<W, A> => {
  return new Writer(M, () => [a, M.empty()])
}

/** @function */
export const ap = <W, A, B>(fab: Writer<W, (a: A) => B>, fa: Writer<W, A>): Writer<W, B> => {
  return fa.ap(fab)
}

/** @function */
export const chain = <W, A, B>(fa: Writer<W, A>, f: (a: A) => Writer<W, B>): Writer<W, B> => {
  return fa.chain(f)
}

/** @function */
export const tell = <W>(M: Monoid<W>) => (w: W): Writer<W, void> => {
  return new Writer(M, () => [undefined, w])
}

/** @function */
export const getMonad = <W>(M: Monoid<W>): Monad<URI> => {
  return {
    URI,
    map,
    of: of(M),
    ap,
    chain
  }
}

/** @instance */
export const writer: Functor<URI> = {
  URI,
  map
}
