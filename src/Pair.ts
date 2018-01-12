import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Endomorphism } from './function'
import { Setoid } from './Setoid'
import { Ord } from './Ord'
import { semigroupOrdering } from './Ordering'
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

/**
 * @data
 * @constructor Pair
 */
export class Pair<A> {
  // prettier-ignore
  readonly '_A': A
  // prettier-ignore
  readonly '_URI': URI
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
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(f(b, this.fst()), this.snd())
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <L, B>(f: (a: A) => HKT2As<F, L, B>) => HKT2As<F, L, Pair<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, Pair<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Pair<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Pair<B>> {
    return <B>(f: (a: A) => HKT<F, B>) =>
      liftA2(F)((b1: B) => (b2: B) => new Pair([b1, b2]))(f(this.fst()))(f(this.snd()))
  }
  extract(): A {
    return this.fst()
  }
  extend<B>(f: (fb: Pair<A>) => B): Pair<B> {
    return new Pair([f(this), f(this.swap())])
  }
}

/** @function */
export const map = <A, B>(f: (a: A) => B, fa: Pair<A>): Pair<B> => {
  return fa.map(f)
}

/** @function */
export const of = <A>(a: A): Pair<A> => {
  return new Pair([a, a])
}

/** @function */
export const ap = <A, B>(fab: Pair<(a: A) => B>, fa: Pair<A>): Pair<B> => {
  return fa.ap(fab)
}

/** @function */
export const reduce = <A, B>(f: (b: B, a: A) => B, b: B, fa: Pair<A>): B => {
  return fa.reduce(f, b)
}

/** @function */
export const extract = <A>(fa: Pair<A>): A => {
  return fa.extract()
}

/** @function */
export const extend = <A, B>(f: (fb: Pair<A>) => B, fa: Pair<A>): Pair<B> => {
  return fa.extend(f)
}

/** @function */
export const getSetoid = <A>(S: Setoid<A>): Setoid<Pair<A>> => {
  return {
    equals: x => y => S.equals(x.fst())(y.fst()) && S.equals(x.snd())(y.snd())
  }
}

/** @function */
export const getOrd = <A>(O: Ord<A>): Ord<Pair<A>> => {
  return {
    ...getSetoid(O),
    compare: x => y => semigroupOrdering.concat(O.compare(x.fst())(y.fst()))(O.compare(x.snd())(y.snd()))
  }
}

/** @function */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Pair<A>> => {
  return {
    concat: x => y => new Pair([S.concat(x.fst())(y.fst()), S.concat(x.snd())(y.snd())])
  }
}

/** @function */
export const getMonoid = <A>(M: Monoid<A>): Monoid<Pair<A>> => {
  const empty = new Pair([M.empty(), M.empty()])
  return {
    ...getSemigroup(M),
    empty: () => empty
  }
}

/**
 * Map a function over the first field of a pair
 * @function
 */
export const first = <A>(f: Endomorphism<A>) => (fa: Pair<A>): Pair<A> => {
  return fa.first(f)
}

/**
 * Map a function over the second field of a pair
 * @function
 */
export const second = <A>(f: Endomorphism<A>) => (fa: Pair<A>): Pair<A> => {
  return fa.second(f)
}

/**
 * Swaps the elements in a pair
 * @function
 */
export const swap = <A>(fa: Pair<A>): Pair<A> => {
  return fa.swap()
}

export function traverse<F extends HKT2S>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT2As<F, L, B>, ta: Pair<A>) => HKT2As<F, L, Pair<B>>
export function traverse<F extends HKTS>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKTAs<F, B>, ta: Pair<A>) => HKTAs<F, Pair<B>>
export function traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: HKT<URI, A>) => HKT<F, Pair<B>>
/** @function */
export function traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Pair<A>) => HKT<F, Pair<B>> {
  return (f, ta) => ta.traverse(F)(f)
}

/** @instance */
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
