import { HKT } from './HKT'
import { StaticMonad, FantasyMonad } from './Monad'
import { Function1, Endomorphism, Function2, Function3, Function4, Curried2, Curried3, Curried4, Kleisli } from './function'

export type URI = 'State'

export type HKTURI<S> = HKT<URI, S>

export type HKTState<S, A> = HKT<HKTURI<S>, A>

export class State<S, A> implements FantasyMonad<HKTURI<S>, A> {
  readonly _hkt: HKTURI<S>
  readonly _hkta: A
  constructor(public readonly value: Function1<S, [A, S]>) {}
  run(s: S): [A, S] {
    return this.value(s)
  }
  eval(s: S): A {
    return this.run(s)[0]
  }
  exec(s: S): S {
    return this.run(s)[1]
  }
  map<B>(f: Function1<A, B>): State<S, B> {
    return new State<S, B>(s => {
      const [a, s1] = this.run(s)
      return [f(a), s1]
    })
  }
  of<S2, B>(b: B): State<S2, B> {
    return of<S2, B>(b)
  }
  ap<B>(fab: State<S, Function1<A, B>>): State<S, B> {
    return fab.chain(f => map(f, this)) // <= derived
  }
  chain<B>(f: Function1<A, State<S, B>>): State<S, B> {
    return new State<S, B>(s => {
      const [a, s1] = this.run(s)
      return f(a).run(s1)
    })
  }
}

export function to<S, A>(fa: HKTState<S, A>): State<S, A> {
  return fa as State<S, A>
}

export function map<S, A, B>(f: Function1<A, B>, fa: HKTState<S, A>): State<S, B> {
  return (fa as State<S, A>).map(f)
}

export function ap<S, A, B>(fab: HKTState<S, Function1<A, B>>, fa: HKTState<S, A>): State<S, B> {
  return (fa as State<S, A>).ap(fab as State<S, Function1<A, B>>)
}

export function of<S, A>(a: A): State<S, A> {
  return new State<S, A>(s => [a, s])
}

export function chain<S, A, B>(f: Function1<A, HKTState<S, B>>, fa: HKTState<S, A>): State<S, B> {
  return (fa as State<S, A>).chain(f as Function1<A, State<S, B>>)
}

export function get<S>(): State<S, S> {
  return new State<S, S>(s => [s, s])
}

export function put<S>(s: S): State<S, undefined> {
  return new State(() => [undefined, s])
}

export function modify<S>(f: Endomorphism<S>): State<S, undefined> {
  return new State<S, undefined>(s => [undefined, f(s)])
}

export function gets<S, A>(f: Function1<S, A>): State<S, A> {
  return new State<S, A>(s => [f(s), s])
}

declare module './Functor' {
  interface FunctorOps {
    map<S, A, B>(f: Function1<A, B>, fa: FantasyFunctor<HKTURI<S>, A>): State<S, B>
    lift<S, A, B>(functor: StaticFunctor<HKTURI<S>>, f: Function1<A, B>): Function1<State<S, A>, State<S, B>>
  }
}

declare module './Apply' {
  interface ApplyOps {
    ap<S, A, B>(fab: State<S, Function1<A, B>>, fa: FantasyApply<HKTURI<S>, A>): State<S, B>
    liftA2<S, A, B, C>(apply: StaticApply<HKTURI<S>>, f: Curried2<A, B, C>): Function2<State<S, A>, State<S, B>, State<S, C>>
    liftA3<S, A, B, C, D>(apply: StaticApply<HKTURI<S>>, f: Curried3<A, B, C, D>): Function3<State<S, A>, State<S, B>, State<S, C>, State<S, D>>
    liftA4<S, A, B, C, D, E>(apply: StaticApply<HKTURI<S>>, f: Curried4<A, B, C, D, E>): Function4<State<S, A>, State<S, B>, State<S, C>, State<S, D>, State<S, E>>
  }
}

declare module './Chain' {
  interface MonadOps {
    chain<S, A, B>(f: Kleisli<HKTURI<S>, A, B>, fa: FantasyMonad<HKTURI<S>, A>): State<S, B>
    flatten<S, A>(mma: FantasyMonad<HKTURI<S>, FantasyMonad<HKTURI<S>, A>>): State<S, A>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain } as (
    StaticMonad<HKTURI<any>>
  )
)
