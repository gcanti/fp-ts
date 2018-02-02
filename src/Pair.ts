import { HKT } from './HKT'
import { Endomorphism } from './function'
import { Setoid } from './Setoid'
import { Ord } from './Ord'
import { semigroupOrdering } from './Ordering'
import { Applicative, Applicative1 } from './Applicative'
import { Semigroup } from './Semigroup'
import { Monoid } from './Monoid'
import { Foldable1 } from './Foldable'
import { Traversable1 } from './Traversable'
import { liftA2 } from './Apply'
import { Comonad1 } from './Comonad'

// Adapted from https://github.com/parsonsmatt/purescript-pair

declare module './HKT' {
  interface URI2HKT<A> {
    Pair: Pair<A>
  }
}

export const URI = 'Pair'

export type URI = typeof URI

/**
 * @data
 * @constructor Pair
 */
export class Pair<A> {
  readonly '-A': A
  readonly '-URI': URI
  constructor(readonly value: [A, A]) {}
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
  ap<B>(fab: Pair<(a: A) => B>): Pair<B> {
    return new Pair([fab.fst()(this.fst()), fab.snd()(this.snd())])
  }
  ap_<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C> {
    return fb.ap(this)
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(f(b, this.fst()), this.snd())
  }
  extract(): A {
    return this.fst()
  }
  extend<B>(f: (fb: Pair<A>) => B): Pair<B> {
    return new Pair([f(this), f(this.swap())])
  }
}

const map = <A, B>(fa: Pair<A>, f: (a: A) => B): Pair<B> => {
  return fa.map(f)
}

const of = <A>(a: A): Pair<A> => {
  return new Pair([a, a])
}

const ap = <A, B>(fab: Pair<(a: A) => B>, fa: Pair<A>): Pair<B> => {
  return fa.ap(fab)
}

const reduce = <A, B>(fa: Pair<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const extract = <A>(fa: Pair<A>): A => {
  return fa.extract()
}

const extend = <A, B>(fa: Pair<A>, f: (fb: Pair<A>) => B): Pair<B> => {
  return fa.extend(f)
}

/** @function */
export const getSetoid = <A>(S: Setoid<A>): Setoid<Pair<A>> => {
  return {
    equals: (x, y) => S.equals(x.fst(), y.fst()) && S.equals(x.snd(), y.snd())
  }
}

/** @function */
export const getOrd = <A>(O: Ord<A>): Ord<Pair<A>> => {
  return {
    ...getSetoid(O),
    compare: (x, y) => semigroupOrdering.concat(O.compare(x.fst(), y.fst()), O.compare(x.snd(), y.snd()))
  }
}

/** @function */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Pair<A>> => {
  return {
    concat: (x, y) => new Pair([S.concat(x.fst(), y.fst()), S.concat(x.snd(), y.snd())])
  }
}

/** @function */
export const getMonoid = <A>(M: Monoid<A>): Monoid<Pair<A>> => {
  return {
    ...getSemigroup(M),
    empty: new Pair([M.empty, M.empty])
  }
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: Pair<A>, f: (a: A) => HKT<F, B>) => HKT<F, Pair<B>> {
  return <A, B>(ta: Pair<A>, f: (a: A) => HKT<F, B>) =>
    liftA2(F)((b1: B) => (b2: B) => new Pair([b1, b2]))(f(ta.fst()))(f(ta.snd()))
}

/** @instance */
export const pair: Applicative1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI> = {
  URI,
  map,
  of,
  ap,
  reduce,
  traverse,
  extend,
  extract
}
