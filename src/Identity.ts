import { HKT, Monad } from './cats'

export type Identity<A> = HKT<'Identity', A>

export function inj<A>(a: A): Identity<A> {
  return a as any as Identity<A>
}

export function prj<A>(a: Identity<A>): A {
  return a as any as A
}

export const monad: Monad<'Identity'> = {
  map<A, B>(f: (a: A) => B, fa: Identity<A>): Identity<B> {
    return inj(f(prj(fa)))
  },
  of<A>(a: A): Identity<A> {
    return inj(a)
  },
  ap<A, B>(fab: Identity<(a: A) => B>, fa: Identity<A>): Identity<B> {
    return monad.map(prj(fab), fa)
  },
  chain<A, B>(f: (a: A) => Identity<B>, fa: Identity<A>): Identity<B> {
    return f(prj(fa))
  }
}
