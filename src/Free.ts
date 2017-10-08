// adapted from http://okmij.org/ftp/Computation/free-monad.html
// and https://github.com/purescript/purescript-free

import { HKT, HKTS, HKTAs, HKT2S, HKT2As, HKT3S, HKT3As } from './HKT'
import { FantasyMonad, Monad } from './Monad'
import { NaturalTransformation } from './NaturalTransformation'
import { toString } from './function'

export const URI = 'Free'

export type URI = typeof URI

export type Free<F, A> = Pure<F, A> | Impure<F, A, any>

export class Pure<F, A> implements FantasyMonad<URI, A> {
  readonly _tag: 'Pure' = 'Pure'
  readonly _A: A
  readonly _L: F
  readonly _URI: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Free<F, B> {
    return new Pure(f(this.value))
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
  foldFree<M extends HKTS>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKTAs<M, A>
  foldFree<M>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKT<M, A>
  foldFree<M>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKT<M, A> {
    return () => M.of(this.value)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Pure(${toString(this.value)})`
  }
}

export class Impure<F, A, X> implements FantasyMonad<URI, A> {
  readonly _tag: 'Impure' = 'Impure'
  readonly _A: A
  readonly _L: F
  readonly _URI: URI
  constructor(readonly fx: HKT<F, X>, readonly f: (x: X) => Free<F, A>) {}
  map<B>(f: (a: A) => B): Free<F, B> {
    return new Impure(this.fx, x => this.f(x).map(f))
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
  foldFree<M extends HKTS>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKTAs<M, A>
  foldFree<M>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKT<M, A>
  foldFree<M>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKT<M, A> {
    return f => M.chain(x => this.f(x).foldFree(M)(f), f(this.fx))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `new Impure(${(toString(this.fx), toString(this.f))})`
  }
}

export const of = <F, A>(a: A): Free<F, A> => new Pure(a)

export const liftF = <F, A>(fa: HKT<F, A>): Free<F, A> => new Impure(fa, a => of(a))

export const substFree = <F, G>(f: <A>(fa: HKT<F, A>) => Free<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>) => {
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

export const hoistFree = <F, G>(f: NaturalTransformation<F, G>): (<A>(fa: Free<F, A>) => Free<G, A>) =>
  substFree(fa => liftF(f(fa)))

export class Ops {
  foldFree<M extends HKT3S>(
    M: Monad<M>
  ): <F>(f: NaturalTransformation<F, M>) => <U, L, A>(fa: Free<F, A>) => HKT3As<M, U, L, A>
  foldFree<M extends HKT2S>(
    M: Monad<M>
  ): <F>(f: NaturalTransformation<F, M>) => <L, A>(fa: Free<F, A>) => HKT2As<M, L, A>
  foldFree<M extends HKTS>(M: Monad<M>): <F>(f: NaturalTransformation<F, M>) => <A>(fa: Free<F, A>) => HKTAs<M, A>
  foldFree<M>(M: Monad<M>): <F>(f: NaturalTransformation<F, M>) => <A>(fa: Free<F, A>) => HKT<M, A>
  foldFree<M>(M: Monad<M>): <F>(f: NaturalTransformation<F, M>) => <A>(fa: Free<F, A>) => HKT<M, A> {
    return f => fa => fa.foldFree(M)(f)
  }
}

const ops = new Ops()
export const foldFree: Ops['foldFree'] = ops.foldFree
