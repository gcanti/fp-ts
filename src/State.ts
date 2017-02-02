import { HKT, Monad } from './cats'

export class State<S, A> extends HKT<HKT<'State', S>, A> {
  constructor(private value: (s: S) => [A, S]){ super() }
  run(s: S): [A, S] {
    return this.value(s)
  }
  eval(s: S): A {
    return this.run(s)[0]
  }
  exec(s: S): S {
    return this.run(s)[1]
  }
  map<B>(f: (a: A) => B): State<S, B> {
    return new State<S, B>(s => [f(this.eval(s)), s])
  }
  ap<B>(fab: State<S, (a: A) => B>): State<S, B> {
    return fab.chain(f => map(f, this)) // <= derived
  }
  chain<B>(f: (a: A) => State<S, B>): State<S, B> {
    return new State<S, B>(s => (f(this.eval(s))).run(s))
  }
}

export function map<E, A, B>(f: (a: A) => B, fa: State<E, A>): State<E, B> {
  return fa.map(f)
}

export function ap<E, A, B>(fab: State<E, (a: A) => B>, fa: State<E, A>): State<E, B> {
  return fa.ap(fab)
}

export function of<S, A>(a: A): State<S, A> {
  return new State<S, A>(s => [a, s])
}

export function chain<E, A, B>(f: (a: A) => State<E, B>, fa: State<E, A>): State<E, B> {
  return fa.chain(f)
}

export function get<S>(): State<S, S> {
  return new State<S, S>(s => [s, s])
}

export function put<S>(s: S): State<S, void> {
  return new State(() => [undefined, s])
}

export function modify<S>(f: (s: S) => S): State<S, void> {
  return new State<S, void>(s => [undefined, f(s)])
}

export function gets<S, A>(f: (s: S) => A): State<S, A> {
  return get<S>().chain(s => of<S, A>(f(s)))
}

;(
  { map, of, ap, chain } as (
    Monad<HKT<'State', any>>
  )
)
