import { Monoid } from './Monoid'
import { Functor } from './Functor'
import { Monad, FantasyMonad } from './Monad'
import { Lazy } from './function'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Writer: Writer<L, A>
  }
}

export const URI = 'Writer'

export type URI = typeof URI

export class Writer<W, A> implements FantasyMonad<URI, A> {
  readonly _L: W
  readonly _A: A
  readonly _URI: URI
  of: <A>(a: A) => Writer<W, A>
  constructor(public readonly monoid: Monoid<W>, public readonly value: Lazy<[A, W]>) {
    this.of = of<W>(monoid)
  }
  run(): [A, W] {
    return this.value()
  }
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
  chain<B>(f: (a: A) => Writer<W, B>): Writer<W, B> {
    return new Writer(this.monoid, () => {
      const [a, w1] = this.run()
      const [b, w2] = f(a).run()
      return [b, this.monoid.concat(w1)(w2)]
    })
  }
}

export function map<W, A, B>(f: (a: A) => B, fa: Writer<W, A>): Writer<W, B> {
  return fa.map(f)
}

export function of<W>(M: Monoid<W>): <A>(a: A) => Writer<W, A> {
  return a => new Writer(M, () => [a, M.empty()])
}

export function ap<W, A, B>(fab: Writer<W, (a: A) => B>, fa: Writer<W, A>): Writer<W, B> {
  return fa.ap(fab)
}

export function chain<W, A, B>(f: (a: A) => Writer<W, B>, fa: Writer<W, A>): Writer<W, B> {
  return fa.chain(f)
}

export function tell<W>(M: Monoid<W>): (w: W) => Writer<W, void> {
  return w => new Writer(M, () => [undefined, w])
}

export function getMonad<W>(monoid: Monoid<W>): Monad<URI> {
  return {
    URI,
    map,
    of: of(monoid),
    ap,
    chain
  }
}

export const writer: Functor<URI> = {
  URI,
  map
}
