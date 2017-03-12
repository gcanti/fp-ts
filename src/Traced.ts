import { HKT } from './HKT'
import { StaticMonoid } from './Monoid'
import { StaticComonad, FantasyComonad } from './Comonad'
import { Function1, Cokleisli } from './function'

export type URI = 'Traced'

export type HKTURI<E> = HKT<URI, E>

export type HKTTraced<E, A> = HKT<HKTURI<E>, A>

export class Traced<E, A> implements FantasyComonad<HKTURI<E>, A> {
  readonly __hkt: HKTURI<E>
  readonly __hkta: A
  constructor(public readonly monoid: StaticMonoid<E>, public readonly value: Function1<E, A>) { }
  run(e: E): A {
    return this.value(e)
  }
  map<B>(f: Function1<A, B>): Traced<E, B> {
    return new Traced<E, B>(this.monoid, e => f(this.run(e)))
  }
  extract(): A {
    return this.run(this.monoid.empty())
  }
  extend<B>(f: Function1<Traced<E, A>, B>): Traced<E, B> {
    return new Traced(
      this.monoid,
      m1 => f(
        new Traced(
          this.monoid,
          m2 => this.run(
            this.monoid.concat(m1, m2)
          )
        )
      )
    )
  }
}

export function to<E, A>(fa: HKTTraced<E, A>): Traced<E, A> {
  return fa as Traced<E, A>
}

export function map<E, A, B>(f: Function1<A, B>, ea: HKTTraced<E, A>): Traced<E, B> {
  return (ea as Traced<E, A>).map(f)
}

export function extract<E, A>(ea: HKTTraced<E, A>): A {
  return (ea as Traced<E, A>).extract()
}

export function extend<E, A, B>(f: Function1<HKTTraced<E, A>, B>, ea: HKTTraced<E, A>): Traced<E, B> {
  return (ea as Traced<E, A>).extend(f as Function1<Traced<E, A>, B>)
}

declare module './Functor' {
  interface FunctorOps {
    map<E, A, B>(f: Function1<A, B>, fa: FantasyFunctor<HKTURI<E>, A>): Traced<E, B>
    lift<E, A, B>(functor: StaticFunctor<URI>, f: Function1<A, B>): Function1<Traced<E, A>, Traced<E, B>>
  }
}

declare module './Extend' {
  interface ExtendOps {
    extend<E, A, B>(f: Cokleisli<URI, A, B>, ea: FantasyExtend<HKTURI<E>, A>): Traced<E, B>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, extract, extend } as (
    StaticComonad<HKTURI<any>>
  )
)
