// adapted from http://okmij.org/ftp/Computation/free-monad.html

import { HKT } from './HKT'
import { FantasyMonad, Monad } from './Monad'
import { NaturalTransformation } from './NaturalTransformation'
import { toString } from './function'

export const URI = 'Free'

export type URI = typeof URI

export type Free<F, A> = Pure<F, A> | Impure<F, A>

export class Pure<F, A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _tag: 'Pure' = 'Pure'
  readonly _A: A
  readonly _L: F
  readonly _URI: URI
  constructor(public readonly a: A) {}
  map<B>(f: (a: A) => B): Free<F, B> {
    return new Pure(f(this.a))
  }
  of<B>(b: B): Free<F, B> {
    return of(b)
  }
  ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  ap_<B, C>(this: Free<F, (a: B) => C>, fb: Free<F, B>): Free<F, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Free<F, B>): Free<F, B> {
    return f(this.a)
  }
  foldMap<M>(monad: Monad<M>, f: NaturalTransformation<F, M>): HKT<M, A>
  foldMap<M>(monad: Monad<M>, f: NaturalTransformation<F, M>): HKT<M, A> {
    return monad.of(this.a)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Pure(${toString(this.a)})`
  }
}

export class Impure<F, A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _tag: 'Impure' = 'Impure'
  readonly _A: A
  readonly _L: F
  readonly _URI: URI
  constructor(public readonly fx: HKT<F, any>, public readonly f: (x: any) => Free<F, A>) {}
  map<B>(f: (a: A) => B): Free<F, B> {
    return new Impure(this.fx, x => this.f(x).map(f))
  }
  of<B>(b: B): Free<F, B> {
    return of(b)
  }
  ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  ap_<B, C>(this: Free<F, (a: B) => C>, fb: Free<F, B>): Free<F, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Free<F, B>): Free<F, B> {
    return new Impure(this.fx, x => this.f(x).chain(f))
  }
  foldMap<M>(monad: Monad<M>, f: NaturalTransformation<F, M>): HKT<M, A>
  foldMap<M>(monad: Monad<M>, f: NaturalTransformation<F, M>): HKT<M, A> {
    return monad.chain(x => this.f(x).foldMap(monad, f), f(this.fx))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Impure(${(toString(this.fx), toString(this.f))})`
  }
}

export function of<F, A>(a: A): Free<F, A> {
  return new Pure(a)
}

export function liftF<F, A>(fa: HKT<F, A>): Free<F, A> {
  return new Impure<F, A>(fa, of)
}

export class Ops {
  foldMap<F, A, M>(monad: Monad<M>, f: NaturalTransformation<F, M>, fa: Free<F, A>): HKT<M, A>
  foldMap<F, A, M>(monad: Monad<M>, f: NaturalTransformation<F, M>, fa: Free<F, A>): HKT<M, A> {
    return fa.foldMap(monad, f)
  }
}

const ops = new Ops()
export const foldMap: Ops['foldMap'] = ops.foldMap

//
// overladings
//

import { IdentityURI, Identity, OptionURI, Option } from './overloadings'

export interface Pure<F, A> {
  foldMap(monad: Monad<IdentityURI>, f: NaturalTransformation<F, IdentityURI>): Identity<A>
  foldMap(monad: Monad<OptionURI>, f: NaturalTransformation<F, OptionURI>): Option<A>
}

export interface Impure<F, A> {
  foldMap(monad: Monad<IdentityURI>, f: NaturalTransformation<F, IdentityURI>): Identity<A>
  foldMap(monad: Monad<OptionURI>, f: NaturalTransformation<F, OptionURI>): Option<A>
}

export interface Ops {
  foldMap<F, A>(monad: Monad<IdentityURI>, f: NaturalTransformation<F, IdentityURI>, fa: Free<F, A>): Identity<A>
  foldMap<F, A>(monad: Monad<OptionURI>, f: NaturalTransformation<F, OptionURI>, fa: Free<F, A>): Option<A>
}
