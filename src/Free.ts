// adapted from http://okmij.org/ftp/Computation/free-monad.html

import { HKT, HKTS } from './HKT'
import { FantasyMonad, StaticMonad } from './Monad'
import { identity as id } from './function'
import { NaturalTransformation } from './NaturalTransformation'

declare module './HKT' {
  interface HKT<A> {
    Free: Free<any, A>
  }
}

export const URI = 'Free'

export type URI = typeof URI

export type Free<F extends HKTS, A> = Pure<F, A> | Impure<F, A, any>

export class Pure<F extends HKTS, A> implements FantasyMonad<URI, A> {
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
  foldMap<M extends HKTS>(monad: StaticMonad<M>, f: NaturalTransformation<F, M>): HKT<A>[M] {
    return monad.of(this.a)
  }
}

export class Impure<F extends HKTS, A, X> implements FantasyMonad<URI, A> {
  static of = of
  readonly _tag = 'Impure'
  readonly _F: F
  readonly _A: A
  readonly _X: X
  readonly _URI: URI
  constructor(public readonly fx: HKT<X>[F], public readonly f: (x: X) => Free<F, A>) {}
  map<B>(f: (a: A) => B): Free<F, B> {
    return new Impure<F, B, X>(this.fx, x => this.f(x).map(f))
  }
  of<B>(b: B): Free<F, B> {
    return of<F, B>(b)
  }
  ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  chain<B>(f: (a: A) => Free<F, B>): Free<F, B> {
    return new Impure<F, B, X>(this.fx, x => this.f(x).chain(f))
  }
  foldMap<M extends HKTS>(monad: StaticMonad<M>, f: NaturalTransformation<F, M>): HKT<A>[M] {
    return monad.chain<X, A>((x: X) => this.f(x).foldMap(monad, f), f<X>(this.fx))
  }
}

export function of<F extends HKTS, A>(a: A): Free<F, A> {
  return new Pure<F, A>(a)
}

export function liftF<F extends HKTS, A>(fa: HKT<A>[F]): Free<F, A> {
  return new Impure<F, A, A>(fa, of)
}

export interface ADT<URI extends HKTS, A> {
  readonly _A: A
  readonly _URI: URI
}

export type AnyADT = ADT<any, any>
export type UriOf<FA extends AnyADT> = FA['_URI']
export type TypeOf<FA extends AnyADT> = FA['_A']

export function liftADT<FA extends AnyADT>(fa: FA): Free<UriOf<FA>, TypeOf<FA>> {
  return liftF(fa as any)
}

export function inject<G extends HKTS>(): <F extends G>(free: Free<F, any>) => Free<G, TypeOf<typeof free>> {
  return id
}
