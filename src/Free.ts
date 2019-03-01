/**
 * @file Adapted from http://okmij.org/ftp/Computation/free-monad.html and https://github.com/purescript/purescript-free
 */
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad'
import { toString } from './function'

export const URI = 'Free'

export type URI = typeof URI

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Free: Free<L, A>
  }
}

/**
 * @data
 * @constructor Pure
 * @constructor Impure
 * @since 1.0.0
 */
export type Free<F, A> = Pure<F, A> | Impure<F, A, any>

export class Pure<F, A> {
  readonly _tag: 'Pure' = 'Pure'
  readonly _A!: A
  readonly _L!: F
  readonly _URI!: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Free<F, B> {
    return new Pure(f(this.value))
  }
  ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  /**
   * Flipped version of `ap`
   */
  ap_<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Free<F, B>): Free<F, B> {
    return f(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Pure(${toString(this.value)})`
  }
  isPure(): this is Pure<F, A> {
    return true
  }
  isImpure(): this is Impure<F, A, any> {
    return false
  }
}

export class Impure<F, A, X> {
  readonly _tag: 'Impure' = 'Impure'
  readonly _A!: A
  readonly _L!: F
  readonly _URI!: URI
  constructor(readonly fx: HKT<F, X>, readonly f: (x: X) => Free<F, A>) {}
  map<B>(f: (a: A) => B): Free<F, B> {
    return new Impure(this.fx, x => this.f(x).map(f))
  }
  ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  ap_<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Free<F, B>): Free<F, B> {
    return new Impure(this.fx, x => this.f(x).chain(f))
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Impure(${(toString(this.fx), toString(this.f))})`
  }
  isPure(): this is Pure<F, A> {
    return false
  }
  isImpure(): this is Impure<F, A, X> {
    return true
  }
}

/**
 * @since 1.0.0
 */
export const of = <F, A>(a: A): Free<F, A> => {
  return new Pure(a)
}

/**
 * Lift an impure value described by the generating type constructor `F` into the free monad
 *
 * @since 1.0.0
 */
export const liftF = <F, A>(fa: HKT<F, A>): Free<F, A> => {
  return new Impure(fa, a => of(a))
}

const substFree = <F, G>(f: <A>(fa: HKT<F, A>) => Free<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>) => {
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
 *
 * @since 1.0.0
 */
export function hoistFree<F extends URIS3 = never, G extends URIS3 = never>(
  nt: <U, L, A>(fa: Type3<F, U, L, A>) => Type3<G, U, L, A>
): (<A>(fa: Free<F, A>) => Free<G, A>)
export function hoistFree<F extends URIS2 = never, G extends URIS2 = never>(
  nt: <L, A>(fa: Type2<F, L, A>) => Type2<G, L, A>
): (<A>(fa: Free<F, A>) => Free<G, A>)
export function hoistFree<F extends URIS = never, G extends URIS = never>(
  nt: <A>(fa: Type<F, A>) => Type<G, A>
): (<A>(fa: Free<F, A>) => Free<G, A>)
export function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>)
export function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>) {
  return substFree(fa => liftF(nt(fa)))
}

export interface FoldFree3<M extends URIS3> {
  <F extends URIS3, U, L, A>(nt: <X>(fa: Type3<F, U, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS2, U, L, A>(nt: <X>(fa: Type2<F, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS, U, L, A>(nt: <X>(fa: Type<F, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
}

export interface FoldFree3C<M extends URIS3, U, L> {
  <F extends URIS3, A>(nt: <X>(fa: Type3<F, U, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS2, A>(nt: <X>(fa: Type2<F, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS, A>(nt: <X>(fa: Type<F, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
}

export interface FoldFree2<M extends URIS2> {
  <F extends URIS2, L, A>(nt: <X>(fa: Type2<F, L, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
  <F extends URIS, L, A>(nt: <X>(fa: Type<F, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
}

export interface FoldFree2C<M extends URIS2, L> {
  <F extends URIS2, A>(nt: <X>(fa: Type2<F, L, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
  <F extends URIS, A>(nt: <X>(fa: Type<F, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
}

/**
 * @since 1.0.0
 */
export function foldFree<M extends URIS3>(M: Monad3<M>): FoldFree3<M>
export function foldFree<M extends URIS3, U, L>(M: Monad3C<M, U, L>): FoldFree3C<M, U, L>
export function foldFree<M extends URIS2>(M: Monad2<M>): FoldFree2<M>
export function foldFree<M extends URIS2, L>(M: Monad2C<M, L>): FoldFree2C<M, L>
export function foldFree<M extends URIS>(
  M: Monad1<M>
): <F extends URIS, A>(nt: <X>(fa: Type<F, X>) => Type<M, X>, fa: Free<F, A>) => Type<M, A>
export function foldFree<M>(M: Monad<M>): <F, A>(nt: <X>(fa: HKT<F, X>) => HKT<M, X>, fa: Free<F, A>) => HKT<M, A>
export function foldFree<M>(M: Monad<M>): <F, A>(nt: any, fa: Free<F, A>) => HKT<M, A> {
  return (nt, fa) => {
    if (fa.isPure()) {
      return M.of(fa.value)
    } else {
      return M.chain(nt(fa.fx), x => foldFree(M)(nt, fa.f(x)))
    }
  }
}
