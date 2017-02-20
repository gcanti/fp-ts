import { Comonad } from './Comonad'
import { Function1 } from './function'
import { HKT } from './HKT'
import { Monoid } from './Monoid'

export type URI = 'Traced'

export type HKTTraced<E, A> = HKT<HKT<URI, E>, A>

export class Traced<E, A> implements HKTTraced<E, A> {
  __hkt: HKT<URI, E>
  __hkta: A
  constructor(private value: Function1<E, A>) {
  }
  run(e: E): A {
    return this.value(e)
  }
  map<B>(f: Function1<A, B>): Traced<E, B> {
    return new Traced((e: E) => f(this.run(e)))
  }
}

export function getComonad<E>(monoid: Monoid<E>): Comonad<HKT<URI, E>> {
  function extend<A, B>(f: Function1<HKTTraced<E, A>, B>, ea: HKTTraced<E, A>): Traced<E, B> {
    return new Traced(
      (m1: E) => f(
        new Traced(
          (m2: E) => (ea as Traced<E, A>).run(
            monoid.concat(m1, m2)
          )
        )
      )
    )
  }

  function extract<A>(ea: HKTTraced<E, A>): A {
    return (ea as Traced<E, A>).run(monoid.empty())
  }

  function map<A, B>(f: Function1<A, B>, ea: HKTTraced<E, A>): Traced<E, B> {
    return (ea as Traced<E, A>).map(f)
  }

  return {
    extend,
    extract,
    map,
  }
}
