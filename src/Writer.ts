import { HKT } from './HKT'
import { StaticMonoid } from './Monoid'
import { StaticFunctor } from './Functor'
import { StaticMonad, FantasyMonad } from './Monad'
import { Lazy, Function1, Function2, Function3, Function4, Curried2, Curried3, Curried4, Kleisli } from './function'

export type URI = 'Writer'

export type HKTURI<W> = HKT<URI, W>

export type HKTWriter<W, A> = HKT<HKTURI<W>, A>

export class Writer<W, A> implements FantasyMonad<HKTURI<W>, A> {
  _hkt: HKTURI<W>
  _hkta: A
  of: Function1<A, Writer<W, A>>
  constructor(public readonly monoid: StaticMonoid<W>, public readonly value: Lazy<[A, W]>) {
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
  map<B>(f: Function1<A, B>): Writer<W, B> {
    const [a, w] = this.run()
    return new Writer(this.monoid, () => [f(a), w])
  }
  ap<B>(fab: Writer<W, Function1<A, B>>): Writer<W, B> {
    return fab.chain(f => this.map(f))
  }
  chain<B>(f: Function1<A, Writer<W, B>>): Writer<W, B> {
    return new Writer(this.monoid, () => {
      const [a, w1] = this.run()
      const [b, w2] = f(a).run()
      return [b, this.monoid.concat(w1, w2)]
    })
  }
}

export function to<W, A>(fa: HKTWriter<W, A>): Writer<W, A> {
  return fa as Writer<W, A>
}

export function map<W, A, B>(f: Function1<A, B>, fa: HKTWriter<W, A>): Writer<W, B> {
  return (fa as Writer<W, A>).map(f)
}

export function of<W>(monoid: StaticMonoid<W>): <A>(a: A) => Writer<W, A> {
  return <A>(a: A) => new Writer<W, A>(monoid, () => [a, monoid.empty()])
}

export function ap<W, A, B>(fab: HKTWriter<W, Function1<A, B>>, fa: HKTWriter<W, A>): Writer<W, B> {
  return (fa as Writer<W, A>).ap(fab as Writer<W, Function1<A, B>>)
}

export function chain<W, A, B>(f: Function1<A, HKTWriter<W, B>>, fa: HKTWriter<W, A>): Writer<W, B> {
  return (fa as Writer<W, A>).chain(f as Function1<A, Writer<W, B>>)
}

export function tell<W>(monoid: StaticMonoid<W>): (w: W) => Writer<W, void> {
  return w => new Writer(monoid, () => [undefined, w])
}

export function getMonadS<W>(monoid: StaticMonoid<W>): StaticMonad<HKTURI<W>> {
  return {
    map,
    of: of(monoid),
    ap,
    chain
  }
}

declare module './Functor' {
  interface FunctorOps {
    map<W, A, B>(f: Function1<A, B>, fa: FantasyFunctor<HKTURI<W>, A>): Writer<W, B>
    lift<W, A, B>(functor: StaticFunctor<URI>, f: Function1<A, B>): Function1<Writer<W, A>, Writer<W, B>>
  }
}

declare module './Apply' {
  interface ApplyOps {
    ap<W, A, B>(fab: Writer<W, Function1<A, B>>, fa: FantasyApply<HKTURI<W>, A>): Writer<W, B>
    liftA2<W, A, B, C>(apply: StaticApply<URI>, f: Curried2<A, B, C>): Function2<Writer<W, A>, Writer<W, B>, Writer<W, C>>
    liftA3<W, A, B, C, D>(apply: StaticApply<URI>, f: Curried3<A, B, C, D>): Function3<Writer<W, A>, Writer<W, B>, Writer<W, C>, Writer<W, D>>
    liftA4<W, A, B, C, D, F>(apply: StaticApply<URI>, f: Curried4<A, B, C, D, F>): Function4<Writer<W, A>, Writer<W, B>, Writer<W, C>, Writer<W, D>, Writer<W, F>>
  }
}

declare module './Chain' {
  interface MonadOps {
    chain<W, A, B>(f: Kleisli<URI, A, B>, fa: FantasyMonad<HKTURI<W>, A>): Writer<W, B>
    flatten<W, A>(mma: FantasyMonad<HKTURI<W>, FantasyMonad<HKTURI<W>, A>>): Writer<W, A>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map } as (
    StaticFunctor<HKTURI<any>>
  )
)
