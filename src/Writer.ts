import { HKT, Monad, Monoid } from './cats'

export class Writer<W, A> extends HKT<HKT<'Writer', W>, A> {
  constructor(private value: () => [A, W]){ super() }
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
    return new Writer(() => [f(a), w])
  }
}

export function tell<W>(w: W): Writer<W, void> {
  return new Writer(() => [undefined, w])
}

export function getMonad<W>(monoid: Monoid<W>): Monad<HKT<'Writer', any>> {

  function map<A, B>(f: (a: A) => B, fa: Writer<W, A>): Writer<W, B> {
    return fa.map(f)
  }

  function ap<A, B>(fab: Writer<W, (a: A) => B>, fa: Writer<W, A>): Writer<W, B> {
    return chain((f) => map(f, fa), fab) // <= derived
  }

  function of<A>(a: A): Writer<W, A> {
    return new Writer<W, A>(() => [a, monoid.empty()])
  }

  function chain<A, B>(f: (a: A) => Writer<W, B>, fa: Writer<W, A>): Writer<W, B> {
    return new Writer(() => {
      const [a, w1] = fa.run()
      const [b, w2] = f(a).run()
      return [b, monoid.concat(w1, w2)]
    })
  }

  return { map, of, ap, chain }
}
