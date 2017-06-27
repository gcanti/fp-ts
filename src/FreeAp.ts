// adapted from http://okmij.org/ftp/Computation/free-monad.html

import { HKT, HKTS } from './HKT'
import { Applicative, FantasyApplicative } from './Applicative'
import { identity, toString } from './function'

// Adapted from https://ro-che.info/articles/2013-03-31-flavours-of-free-applicative-functors
// Ørjan Johansen’s free applicative

declare module './HKT' {
  interface HKT<A, U> {
    FreeAp: FreeAp<U, A>
  }
}

export const URI = 'FreeAp'

export type URI = typeof URI

export type FreeAp<F, A> = Pure<F, A> | Ap<F, A>

export class Pure<F, A> implements FantasyApplicative<URI, A> {
  static of = of
  readonly _tag: 'Pure' = 'Pure'
  readonly _F: F
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly a: A) {}
  map<B>(f: (a: A) => B): FreeAp<F, B> {
    return new Pure<F, B>(f(this.a))
  }
  of<B>(b: B): FreeAp<F, B> {
    return of<F, B>(b)
  }
  ap<B>(fab: FreeAp<F, (a: A) => B>): FreeAp<F, B> {
    return fab.map(f => f(this.a))
  }
  ap_<B, C>(this: FreeAp<F, (a: B) => C>, fb: FreeAp<F, B>): FreeAp<F, C> {
    return fb.ap(this)
  }
  foldMap<M extends HKTS, U = any, V = any>(
    applicative: Applicative<M>,
    f: <A>(fa: F) => HKT<A, U, V>[M]
  ): HKT<A, U, V>[M] {
    return applicative.of(this.a)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Pure(${toString(this.a)})`
  }
}

export class Ap<F, A> implements FantasyApplicative<URI, A> {
  static of = of
  readonly _tag: 'Ap' = 'Ap'
  readonly _F: F
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly fg: FreeAp<F, (x: any) => A>, public readonly fx: any) {}
  map<B>(f: (a: A) => B): FreeAp<F, B> {
    return new Ap(this.fg.map(g => (x: any) => f(g(x))), this.fx)
  }
  of<B>(b: B): FreeAp<F, B> {
    return of<F, B>(b)
  }
  ap<B>(fab: FreeAp<F, (a: A) => B>): FreeAp<F, B> {
    return new Ap<F, B>(this.fg.ap(fab.map(f => (g: any): any => (x: any) => f(g(x)))), this.fx)
  }
  ap_<B, C>(this: FreeAp<F, (a: B) => C>, fb: FreeAp<F, B>): FreeAp<F, C> {
    return fb.ap(this)
  }
  foldMap<M extends HKTS, U = any, V = any>(
    applicative: Applicative<M>,
    f: <A>(fa: F) => HKT<A, U, V>[M]
  ): HKT<A, U, V>[M] {
    const x = f<any>(this.fx)
    const y = this.fg.foldMap<M, U, V>(applicative, f)
    return applicative.ap<any, A, U, V>(y, x)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Ap(${(toString(this.fg), toString(this.fx))})`
  }
}

export function of<F, A>(a: A): FreeAp<F, A> {
  return new Pure<F, A>(a)
}

export function liftF<F, A>(fa: F): FreeAp<F, A> {
  return new Ap<F, A>(of<F, (a: A) => A>(identity), fa)
}
