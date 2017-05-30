// adapted from http://okmij.org/ftp/Computation/free-monad.html

import { HKT, HKTS } from './HKT'
import { FantasyMonad, Monad } from './Monad'
import { identity } from './function'

declare module './HKT' {
  interface HKT<A, U> {
    Free: Free<U, A>
  }
}

export const URI = 'Free'

export type URI = typeof URI

export type Free<F, A> = Pure<F, A> | Impure<F, A>

export class Pure<F, A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _tag = 'Pure'
  readonly _F: F
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly a: A) {}
  map<B>(f: (a: A) => B): Free<F, B> {
    return new Pure<F, B>(f(this.a))
  }
  of<B>(b: B): Free<F, B> {
    return of<F, B>(b)
  }
  ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  chain<B>(f: (a: A) => Free<F, B>): Free<F, B> {
    return f(this.a)
  }
  foldMap<M extends HKTS, U = any, V = any>(monad: Monad<M>, f: <A>(fa: F) => HKT<A, U, V>[M]): HKT<A, U, V>[M] {
    return monad.of(this.a)
  }
}

export class Impure<F, A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _tag = 'Impure'
  readonly _F: F
  readonly _A: A
  readonly _URI: URI
  constructor(
    public readonly fx: any,
    public readonly f: (x: any) => Free<F, A>
  ) {}
  map<B>(f: (a: A) => B): Free<F, B> {
    return new Impure<F, B>(this.fx, x => this.f(x).map(f))
  }
  of<B>(b: B): Free<F, B> {
    return of<F, B>(b)
  }
  ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  chain<B>(f: (a: A) => Free<F, B>): Free<F, B> {
    return new Impure<F, B>(this.fx, x => this.f(x).chain(f))
  }
  foldMap<M extends HKTS, U = any, V = any>(monad: Monad<M>, f: <A>(fa: F) => HKT<A, U, V>[M]): HKT<A, U, V>[M] {
    return monad.chain<any, A>((x: any) => this.f(x).foldMap(monad, f), f(this.fx))
  }
}

export function of<F, A>(a: A): Free<F, A> {
  return new Pure<F, A>(a)
}

export function liftF<F, A>(fa: F): Free<F, A> {
  return new Impure<F, A>(fa, of)
}

export function inject<G>(): <F extends G, A>(free: Free<F, A>) => Free<G, A> {
  return identity
}
