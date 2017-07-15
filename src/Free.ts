// adapted from http://okmij.org/ftp/Computation/free-monad.html
// and https://github.com/purescript/purescript-free

import { HKT, HKTS, URI2HKT } from './HKT'
import { FantasyMonad, Monad } from './Monad'
import { NaturalTransformation } from './NaturalTransformation'
import { toString } from './function'

export const URI = 'Free'

export type URI = typeof URI

export type Free<F, A> = Pure<F, A> | Impure<F, A, any>

export class Pure<F, A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _tag: 'Pure' = 'Pure'
  readonly _A: A
  readonly _L: F
  readonly _URI: URI
  constructor(public readonly value: A) {}
  map<B>(f: (a: A) => B): Free<F, B> {
    return new Pure(f(this.value))
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
    return f(this.value)
  }
  foldFree<M extends HKTS>(M: Monad<M>, f: NaturalTransformation<F, M>): URI2HKT<A>[M]
  foldFree<M>(M: Monad<M>, f: NaturalTransformation<F, M>): HKT<M, A>
  foldFree<M>(M: Monad<M>, f: NaturalTransformation<F, M>): HKT<M, A> {
    return M.of(this.value)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Pure(${toString(this.value)})`
  }
}

export class Impure<F, A, X> implements FantasyMonad<URI, A> {
  static of = of
  readonly _tag: 'Impure' = 'Impure'
  readonly _A: A
  readonly _L: F
  readonly _URI: URI
  constructor(public readonly fx: HKT<F, X>, public readonly f: (x: X) => Free<F, A>) {}
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
  foldFree<M extends HKTS>(M: Monad<M>, f: NaturalTransformation<F, M>): URI2HKT<A>[M]
  foldFree<M>(M: Monad<M>, f: NaturalTransformation<F, M>): HKT<M, A>
  foldFree<M>(M: Monad<M>, f: NaturalTransformation<F, M>): HKT<M, A> {
    return M.chain(x => this.f(x).foldFree(M, f), f(this.fx))
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

export class Ops {
  liftF<F extends HKTS, A>(fa: HKT<F, A>): Free<F, A>
  liftF<F, A>(fa: HKT<F, A>): Free<F, A>
  liftF<F, A>(fa: HKT<F, A>): Free<F, A> {
    return new Impure(fa, a => of(a))
  }

  foldFree<F, M extends HKTS, A>(M: Monad<M>, f: NaturalTransformation<F, M>, fa: Free<F, A>): URI2HKT<A>[M]
  foldFree<F, M, A>(M: Monad<M>, f: NaturalTransformation<F, M>, fa: Free<F, A>): HKT<M, A>
  foldFree<F, M, A>(M: Monad<M>, f: NaturalTransformation<F, M>, fa: Free<F, A>): HKT<M, A> {
    return fa.foldFree(M, f)
  }

  substFree<F extends HKTS, G>(f: <A>(fa: HKT<F, A>) => Free<G, A>): <A>(fa: Free<F, A>) => Free<G, A>
  substFree<F, G>(f: <A>(fa: HKT<F, A>) => Free<G, A>): <A>(fa: Free<F, A>) => Free<G, A>
  substFree<F, G>(f: <A>(fa: HKT<F, A>) => Free<G, A>): <A>(fa: Free<F, A>) => Free<G, A> {
    function go<A>(fa: Free<F, A>): Free<G, A> {
      switch (fa._tag) {
        case 'Pure':
          return of(fa.value)
        case 'Impure':
          return f(fa.fx).chain(x => go(fa.f(x)))
      }
    }
    return go
  }

  hoistFree<F, G>(f: NaturalTransformation<F, G>): <A>(fa: Free<F, A>) => Free<G, A>
  hoistFree<F, G>(f: NaturalTransformation<F, G>): <A>(fa: Free<F, A>) => Free<G, A> {
    return this.substFree<F, G>(fa => this.liftF(f(fa)))
  }
}

const ops = new Ops()
export const liftF: Ops['liftF'] = ops.liftF
export const foldFree: Ops['foldFree'] = ops.foldFree
export const substFree: Ops['substFree'] = ops.substFree
export const hoistFree: Ops['hoistFree'] = ops.hoistFree
