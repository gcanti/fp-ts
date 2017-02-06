import { HKT } from './HKT'
import { Monad } from './Monad'
import { Function1, Endomorphism } from './function'

export type URI = 'State';

export type HKTState<S, A> = HKT<HKT<URI, S>, A>;

export class State<S, A> implements HKTState<S, A> {
  __hkt: HKT<URI, S>;
  __hkta: A;
  constructor(private value: Function1<S, [A, S]>){}
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
    return new State<S, B>(s => [f(this.eval(s)), s])
  }
  ap<B>(fab: State<S, Function1<A, B>>): State<S, B> {
    return fab.chain(f => map(f, this)) // <= derived
  }
  chain<B>(f: Function1<A, State<S, B>>): State<S, B> {
    return new State<S, B>(s => (f(this.eval(s))).run(s))
  }
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

export function put<S>(s: S): State<S, void> {
  return new State(() => [undefined, s])
}

export function modify<S>(f: Endomorphism<S>): State<S, void> {
  return new State<S, void>(s => [undefined, f(s)])
}

export function gets<S, A>(f: Function1<S, A>): State<S, A> {
  return get<S>().chain(s => of<S, A>(f(s)))
}

;(
  { map, of, ap, chain } as (
    Monad<HKT<URI, any>>
  )
)
