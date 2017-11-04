// adapted from http://okmij.org/ftp/Computation/free-monad.html
// and https://github.com/purescript/purescript-free

import { HKT, HKT2, HKT3, HKTS, HKTAs, HKT2S, HKT2As, HKT3S, HKT3As } from './HKT'
import { FantasyMonad, Monad } from './Monad'
import { NaturalTransformation } from './NaturalTransformation'
import { toString } from './function'

export const URI = 'Free'

export type URI = typeof URI

/**
 * @data
 * @constructor Pure
 * @constructor Impure
 */
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
  foldFree<M extends HKT3S>(M: Monad<M>): <U, L>(f: <A>(fa: HKT<F, A>) => HKT3<M, U, L, A>) => HKT3As<M, U, L, A>
  foldFree<M extends HKT2S>(M: Monad<M>): <L>(f: <A>(fa: HKT<F, A>) => HKT2<M, L, A>) => HKT2As<M, L, A>
  foldFree<M extends HKTS>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKTAs<M, A>
  foldFree<M>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKT<M, A>
  foldFree<M>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKT<M, A> {
    return () => M.of(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
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
  foldFree<M extends HKT3S>(M: Monad<M>): <U, L>(f: <A>(fa: HKT<F, A>) => HKT3<M, U, L, A>) => HKT3As<M, U, L, A>
  foldFree<M extends HKT2S>(M: Monad<M>): <L>(f: <A>(fa: HKT<F, A>) => HKT2<M, L, A>) => HKT2As<M, L, A>
  foldFree<M extends HKTS>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKTAs<M, A>
  foldFree<M>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKT<M, A>
  foldFree<M>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKT<M, A> {
    return f => M.chain(x => this.f(x).foldFree(M)(f), f(this.fx))
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Impure(${(toString(this.fx), toString(this.f))})`
  }
}

/** @function */
export const of = <F, A>(a: A): Free<F, A> => {
  return new Pure(a)
}

/**
 * Lift an impure value described by the generating type constructor `F` into the free monad
 * @function
 */
export const liftF = <F, A>(fa: HKT<F, A>): Free<F, A> => {
  return new Impure(fa, a => of(a))
}

/** @function */
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

/**
 * Use a natural transformation to change the generating type constructor of a free monad
 * @function
 */
export function hoistFree<F extends HKT3S, G>(
  nt: <U, L, A>(fa: HKT3As<F, U, L, A>) => HKT<G, A>
): (<A>(fa: Free<F, A>) => Free<G, A>)
export function hoistFree<F extends HKT2S, G>(
  nt: <L, A>(fa: HKT2As<F, L, A>) => HKT<G, A>
): (<A>(fa: Free<F, A>) => Free<G, A>)
export function hoistFree<F extends HKTS, G>(nt: <A>(fa: HKTAs<F, A>) => HKT<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>)
export function hoistFree<F, G>(nt: NaturalTransformation<F, G>): (<A>(fa: Free<F, A>) => Free<G, A>)
/**
 * Use a natural transformation to change the generating type constructor of a free monad
 * @function
 */
export function hoistFree<F, G>(nt: NaturalTransformation<F, G>): (<A>(fa: Free<F, A>) => Free<G, A>) {
  return substFree(fa => liftF(nt(fa)))
}

export function foldFree<M extends HKT3S>(
  M: Monad<M>
): <F extends HKTS>(f: <A>(fa: HKTAs<F, A>) => HKT<M, A>) => <U, L, A>(fa: Free<F, A>) => HKT3As<M, U, L, A>
export function foldFree<M extends HKT2S>(
  M: Monad<M>
): <F extends HKTS>(f: <A>(fa: HKTAs<F, A>) => HKT<M, A>) => <L, A>(fa: Free<F, A>) => HKT2As<M, L, A>
export function foldFree<M extends HKTS>(
  M: Monad<M>
): <F extends HKTS>(f: <A>(fa: HKTAs<F, A>) => HKT<M, A>) => <A>(fa: Free<F, A>) => HKTAs<M, A>
export function foldFree<M>(M: Monad<M>): <F>(f: NaturalTransformation<F, M>) => <A>(fa: Free<F, A>) => HKT<M, A>
/**
 * Note. This function is overloaded so, despite the argument `f` being ill-typed, is type safe
 * @function
 */
export function foldFree<M>(
  M: Monad<M>
): <F>(f: any /* NaturalTransformation<F, M> */) => <A>(fa: Free<F, A>) => HKT<M, A> {
  return f => fa => fa.foldFree(M)(f)
}
