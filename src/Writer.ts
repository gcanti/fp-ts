import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { Monad } from './Monad'
import { deriveAp } from './Chain'
import { Lazy, Function1 } from './function'

export type URI = 'Writer';

export type HKTWriter<W, A> = HKT<HKT<URI, W>, A>;

export class Writer<W, A> extends HKT<HKT<URI, W>, A> {
  constructor(private value: Lazy<[A, W]>){ super() }
  run(): [A, W] {
    return this.value()
  }
  eval(): A {
    return this.run()[0]
  }
  exec(): W {
    return this.run()[1]
  }
  map<B>(f: Function1<A, B>): Writer<W, B> {
    const [a, w] = this.run()
    return new Writer(() => [f(a), w])
  }
}

export function tell<W>(w: W): Writer<W, void> {
  return new Writer(() => [undefined, w])
}

export function getMonad<W>(monoid: Monoid<W>): Monad<HKT<URI, any>> {

  function map<A, B>(f: Function1<A, B>, fa: HKTWriter<W, A>): Writer<W, B> {
    return (fa as Writer<W, A>).map(f)
  }

  function of<A>(a: A): Writer<W, A> {
    return new Writer<W, A>(() => [a, monoid.empty()])
  }

  function chain<A, B>(f: Function1<A, HKTWriter<W, B>>, fa: HKTWriter<W, A>): Writer<W, B> {
    return new Writer(() => {
      const [a, w1] = (fa as Writer<W, A>).run()
      const [b, w2] = (f(a) as Writer<W, B>).run()
      return [b, monoid.concat(w1, w2)]
    })
  }

  const ap = deriveAp({ map, chain })

  return { map, of, ap, chain }
}
