import { Comonad } from '../src/Comonad'
import { Profunctor } from '../src/Profunctor'
import { compose } from '../src/function'
import { Monad } from '../src/Monad'

// Adapted from https://hackage.haskell.org/package/machines-0.6.3/docs/src/Data-Machine-Moore.html

declare module '../src/HKT' {
  interface URI2HKT2<L, A> {
    Moore: Moore<L, A>
  }
}

export const URI = 'Moore'

export type URI = typeof URI

export const of = <L, A>(a: A): Moore<L, A> => {
  const r: Moore<L, A> = new Moore(a, () => r)
  return r
}

export class Moore<L, A> {
  static of = of
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(public readonly a: A, public readonly step: (l: L) => Moore<L, A>) {}
  map<B>(f: (a: A) => B): Moore<L, B> {
    return new Moore(f(this.a), l => this.step(l).map(f))
  }
  lmap<M>(f: (m: M) => L): Moore<M, A> {
    return new Moore(this.a, m => this.step(f(m)).lmap(f))
  }
  of<B>(b: B): Moore<L, B> {
    return of(b)
  }
  ap<B>(fab: Moore<L, (a: A) => B>): Moore<L, B> {
    return fab.chain(f => this.map(f)) // <= derived
  }
  ap_<B>(this: Moore<L, (a: A) => B>, fa: Moore<L, A>): Moore<L, B> {
    return fa.ap(this)
  }
  chain<B>(f: (a: A) => Moore<L, B>): Moore<L, B> {
    const join = (m: Moore<L, Moore<L, B>>): Moore<L, B> =>
      new Moore(m.a.extract(), l => join(m.step(l).map(m2 => m2.step(l))))
    return join(this.map(f))
  }
  extract(): A {
    return this.a
  }
  extend<B>(f: (fa: Moore<L, A>) => B): Moore<L, B> {
    return new Moore(f(this), l => this.step(l).extend(f))
  }
  promap<M, B>(f: (m: M) => L, g: (a: A) => B): Moore<M, B> {
    return this.lmap(f).map(g)
  }
}

export const map = <L, A, B>(f: (a: A) => B, fa: Moore<L, A>): Moore<L, B> => fa.map(f)

export const ap = <L, A, B>(fab: Moore<L, (a: A) => B>, fa: Moore<L, A>): Moore<L, B> => fa.ap(fab)

export const chain = <L, A, B>(f: (a: A) => Moore<L, B>, fa: Moore<L, A>): Moore<L, B> => fa.chain(f)

export const extract = <L, A>(fa: Moore<L, A>): A => fa.extract()

export const extend = <L, A, B>(f: (fa: Moore<L, A>) => B, fa: Moore<L, A>): Moore<L, B> => fa.extend(f)

export const promap = <A, B, C, D>(f: (a: A) => B, g: (c: C) => D, fla: Moore<B, C>): Moore<A, D> => fla.promap(f, g)

/** Construct a Moore machine from a state valuation and transition function */
export const unfoldMoore = <S, L, A>(f: (s: S) => [A, (l: L) => S]) => (s: S): Moore<L, A> => {
  const go = (s: S): Moore<L, A> => {
    const [a, g] = f(s)
    return new Moore(a, compose(go, g))
  }
  return go(s)
}

export const moore: Monad<URI> & Comonad<URI> & Profunctor<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  extract,
  extend,
  promap
}
