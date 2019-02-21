import { Applicative, Applicative1 } from './Applicative'
import { Comonad1 } from './Comonad'
import { Foldable2v1 } from './Foldable2v'
import { Endomorphism } from './function'
import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { Ord, fromCompare } from './Ord'
import { semigroupOrdering } from './Ordering'
import { Semigroup } from './Semigroup_'
import { Setoid, fromEquals } from './Setoid'
import { Traversable2v1 } from './Traversable2v'

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
 * @since 1.0.0
 */
export class Pair<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly fst: A, readonly snd: A) {}
  /** Map a function over the first field of a pair */
  first(f: Endomorphism<A>): Pair<A> {
    return new Pair(f(this.fst), this.snd)
  }
  /** Map a function over the second field of a pair */
  second(f: Endomorphism<A>): Pair<A> {
    return new Pair(this.fst, f(this.snd))
  }
  /** Swaps the elements in a pair */
  swap(): Pair<A> {
    return new Pair(this.snd, this.fst)
  }
  map<B>(f: (a: A) => B): Pair<B> {
    return new Pair(f(this.fst), f(this.snd))
  }
  ap<B>(fab: Pair<(a: A) => B>): Pair<B> {
    return new Pair(fab.fst(this.fst), fab.snd(this.snd))
  }
  /**
   * Flipped version of {@link ap}
   */
  ap_<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C> {
    return fb.ap(this)
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(f(b, this.fst), this.snd)
  }
  extract(): A {
    return this.fst
  }
  extend<B>(f: (fb: Pair<A>) => B): Pair<B> {
    return new Pair(f(this), f(this.swap()))
  }
}

const map = <A, B>(fa: Pair<A>, f: (a: A) => B): Pair<B> => {
  return fa.map(f)
}

const of = <A>(a: A): Pair<A> => {
  return new Pair(a, a)
}

const ap = <A, B>(fab: Pair<(a: A) => B>, fa: Pair<A>): Pair<B> => {
  return fa.ap(fab)
}

const reduce = <A, B>(fa: Pair<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const foldMap = <M>(M: Monoid<M>) => <A>(fa: Pair<A>, f: (a: A) => M): M => {
  return M.concat(f(fa.fst), f(fa.snd))
}

const foldr = <A, B>(fa: Pair<A>, b: B, f: (a: A, b: B) => B): B => {
  return f(fa.fst, f(fa.snd, b))
}

const extract = <A>(fa: Pair<A>): A => {
  return fa.extract()
}

const extend = <A, B>(fa: Pair<A>, f: (fb: Pair<A>) => B): Pair<B> => {
  return fa.extend(f)
}

/**
 * @since 1.0.0
 */
export const getSetoid = <A>(S: Setoid<A>): Setoid<Pair<A>> => {
  return fromEquals((x, y) => S.equals(x.fst, y.fst) && S.equals(x.snd, y.snd))
}

/**
 * @since 1.0.0
 */
export const getOrd = <A>(O: Ord<A>): Ord<Pair<A>> => {
  return fromCompare((x, y) => semigroupOrdering.concat(O.compare(x.fst, y.fst), O.compare(x.snd, y.snd)))
}

/**
 * @since 1.0.0
 */
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Pair<A>> => {
  return {
    concat: (x, y) => new Pair(S.concat(x.fst, y.fst), S.concat(x.snd, y.snd))
  }
}

/**
 * @since 1.0.0
 */
export const getMonoid = <A>(M: Monoid<A>): Monoid<Pair<A>> => {
  return {
    ...getSemigroup(M),
    empty: new Pair(M.empty, M.empty)
  }
}

const traverse = <F>(F: Applicative<F>) => <A, B>(ta: Pair<A>, f: (a: A) => HKT<F, B>): HKT<F, Pair<B>> => {
  return F.ap(F.map(f(ta.fst), (b1: B) => (b2: B) => new Pair(b1, b2)), f(ta.snd))
}

const sequence = <F>(F: Applicative<F>) => <A>(ta: Pair<HKT<F, A>>): HKT<F, Pair<A>> => {
  return F.ap(F.map(ta.fst, (a1: A) => (a2: A) => new Pair(a1, a2)), ta.snd)
}

/**
 * @since 1.0.0
 */
export const pair: Applicative1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = {
  URI,
  map,
  of,
  ap,
  reduce,
  foldMap,
  foldr,
  traverse,
  sequence,
  extend,
  extract
}
