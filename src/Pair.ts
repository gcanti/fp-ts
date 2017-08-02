import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Endomorphism } from './function'
import { Setoid } from './Setoid'
import { Ord } from './Ord'
import { orderingSemigroup } from './Ordering'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { Monoid } from './Monoid'
import { Foldable } from './Foldable'
import { Traversable } from './Traversable'
import { liftA2 } from './Apply'
import { Comonad } from './Comonad'

// Adapted from https://github.com/parsonsmatt/purescript-pair

declare module './HKT' {
  interface URI2HKT<A> {
    Pair: Pair<A>
  }
}

export const URI = 'Pair'

export type URI = typeof URI

export class Pair<A> {
  static of = of
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: [A, A]) {}
  fst(): A {
    return this.value[0]
  }
  snd(): A {
    return this.value[1]
  }
  /** Map a function over the first field of a pair */
  first(f: Endomorphism<A>): Pair<A> {
    return new Pair([f(this.fst()), this.snd()])
  }
  /** Map a function over the second field of a pair */
  second(f: Endomorphism<A>): Pair<A> {
    return new Pair([this.fst(), f(this.snd())])
  }
  /** Swaps the elements in a pair */
  swap(): Pair<A> {
    return new Pair([this.snd(), this.fst()])
  }
  map<B>(f: (a: A) => B): Pair<B> {
    return new Pair([f(this.fst()), f(this.snd())])
  }
  of<B>(b: B): Pair<B> {
    return of(b)
  }
  ap<B>(fab: Pair<(a: A) => B>): Pair<B> {
    return new Pair([fab.fst()(this.fst()), fab.snd()(this.snd())])
  }
  ap_<B, C>(this: Pair<(a: B) => C>, fb: Pair<B>): Pair<C> {
    return fb.ap(this)
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(f(b, this.fst()), this.snd())
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <L, B>(f: (a: A) => HKT2As<F, L, B>) => HKT2As<F, L, Pair<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, Pair<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Pair<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Pair<B>> {
    return <B>(f: (a: A) => HKT<F, B>) =>
      liftA2(F, (b1: B) => (b2: B) => new Pair([b1, b2]))(f(this.fst()), f(this.snd()))
  }
  extract(): A {
    return this.fst()
  }
  extend<B>(f: (fb: Pair<A>) => B): Pair<B> {
    return new Pair([f(this), f(this.swap())])
  }
}

export function map<A, B>(f: (a: A) => B, fa: Pair<A>): Pair<B> {
  return fa.map(f)
}

export function of<A>(a: A): Pair<A> {
  return new Pair([a, a])
}

export function ap<A, B>(fab: Pair<(a: A) => B>, fa: Pair<A>): Pair<B> {
  return fa.ap(fab)
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: Pair<A>): B {
  return fa.reduce(f, b)
}

export class Ops {
  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKT2As<F, L, B>, ta: Pair<A>) => HKT2As<F, L, Pair<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <A, B>(f: (a: A) => HKTAs<F, B>, ta: Pair<A>) => HKTAs<F, Pair<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Pair<A>) => HKT<F, Pair<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Pair<A>) => HKT<F, Pair<B>> {
    return (f, ta) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

export function extract<A>(fa: Pair<A>): A {
  return fa.extract()
}
export function extend<A, B>(f: (fb: Pair<A>) => B, fa: Pair<A>): Pair<B> {
  return fa.extend(f)
}

export function getSetoid<A>(S: Setoid<A>): Setoid<Pair<A>> {
  return {
    equals(x, y) {
      return S.equals(x.fst(), y.fst()) && S.equals(x.snd(), y.snd())
    }
  }
}

export function getOrd<A>(O: Ord<A>): Ord<Pair<A>> {
  const S = getSetoid(O)
  return {
    ...S,
    compare(x, y) {
      return orderingSemigroup.concat(O.compare(x.fst(), y.fst()), O.compare(x.snd(), y.snd()))
    }
  }
}

export function getSemigroup<A>(S: Semigroup<A>): Semigroup<Pair<A>> {
  return {
    concat(x, y) {
      return new Pair([S.concat(x.fst(), y.fst()), S.concat(x.snd(), y.snd())])
    }
  }
}

export function getMonoid<A>(M: Monoid<A>): Monoid<Pair<A>> {
  const S = getSemigroup(M)
  return {
    ...S,
    empty() {
      return new Pair([M.empty(), M.empty()])
    }
  }
}

/** Map a function over the first field of a pair */
export function first<A>(f: Endomorphism<A>, fa: Pair<A>): Pair<A> {
  return fa.first(f)
}

/** Map a function over the second field of a pair */
export function second<A>(f: Endomorphism<A>, fa: Pair<A>): Pair<A> {
  return fa.second(f)
}

/** Swaps the elements in a pair */
export function swap<A>(fa: Pair<A>): Pair<A> {
  return fa.swap()
}

export const pair: Applicative<URI> & Foldable<URI> & Traversable<URI> & Comonad<URI> = {
  URI,
  map,
  of,
  ap,
  reduce,
  traverse,
  extend,
  extract
}
