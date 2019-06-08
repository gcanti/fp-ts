/**
 * @file Adapted from https://github.com/purescript/purescript-tuples
 */
import { Applicative, Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { ChainRec2C } from './ChainRec'
import { Comonad2 } from './Comonad'
import { Foldable2v2 } from './Foldable2v'
import { toString } from './function'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { contramap as contramapOrd, getSemigroup as getOrdSemigroup, Ord } from './Ord'
import { pipeable } from './pipeable'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { fromEquals, Eq } from './Eq'
import { Show } from './Show'
import { Traversable2v2 } from './Traversable2v'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Tuple: Tuple<L, A>
  }
}

export const URI = 'Tuple'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export class Tuple<L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly fst: L, readonly snd: A) {}
  /** @obsolete */
  compose<B>(ab: Tuple<A, B>): Tuple<L, B> {
    return new Tuple(this.fst, ab.snd)
  }
  /** @obsolete */
  map<B>(f: (a: A) => B): Tuple<L, B> {
    return new Tuple(this.fst, f(this.snd))
  }
  /** @obsolete */
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B> {
    return new Tuple(f(this.fst), g(this.snd))
  }
  /** @obsolete */
  extract(): A {
    return this.snd
  }
  /** @obsolete */
  extend<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B> {
    return new Tuple(this.fst, f(this))
  }
  /** @obsolete */
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.snd)
  }
  /**
   * Exchange the first and second components of a tuple
   * @obsolete
   */
  swap(): Tuple<A, L> {
    return new Tuple(this.snd, this.fst)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    // tslint:disable-next-line: deprecation
    return `new Tuple(${toString(this.fst)}, ${toString(this.snd)})`
  }
  /** @obsolete */
  toTuple(): [L, A] {
    return [this.fst, this.snd]
  }
}

/**
 * @since 1.17.0
 */
export const getShow = <L, A>(SL: Show<L>, SA: Show<A>): Show<Tuple<L, A>> => {
  return {
    show: t => `new Tuple(${SL.show(t.fst)}, ${SA.show(t.snd)})`
  }
}

/**
 * Use `getEq`
 *
 * @since 1.0.0
 * @deprecated
 */
export const getSetoid: <L, A>(EL: Eq<L>, EA: Eq<A>) => Eq<Tuple<L, A>> = getEq

/**
 * @since 1.19.0
 */
export function getEq<L, A>(EL: Eq<L>, EA: Eq<A>): Eq<Tuple<L, A>> {
  return fromEquals((x, y) => EL.equals(x.fst, y.fst) && EA.equals(x.snd, y.snd))
}

/**
 * To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 *
 * @since 1.0.0
 */
export const getOrd = <L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>> => {
  return getOrdSemigroup<Tuple<L, A>>().concat(contramapOrd(OL, fst), contramapOrd(OA, snd))
}

/**
 * @since 1.0.0
 */
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>> => {
  return {
    concat: (x, y) => new Tuple(SL.concat(x.fst, y.fst), SA.concat(x.snd, y.snd))
  }
}

/**
 * @since 1.0.0
 */
export const getMonoid = <L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>> => {
  return {
    concat: getSemigroup(ML, MA).concat,
    empty: new Tuple(ML.empty, MA.empty)
  }
}

/**
 * @since 1.0.0
 */
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => {
  return {
    URI,
    _L: undefined as any,
    map: tuple.map,
    ap: (fab, fa) => new Tuple(S.concat(fab.fst, fa.fst), fab.snd(fa.snd))
  }
}

/**
 * @since 1.0.0
 */
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => {
  return {
    ...getApply(M),
    of: a => new Tuple(M.empty, a)
  }
}

/**
 * @since 1.0.0
 */
export const getChain = <L>(S: Semigroup<L>): Chain2C<URI, L> => {
  return {
    ...getApply(S),
    chain: (fa, f) => {
      const { fst, snd } = f(fa.snd)
      return new Tuple(S.concat(fa.fst, fst), snd)
    }
  }
}

/**
 * @since 1.0.0
 */
export const getMonad = <L>(M: Monoid<L>): Monad2C<URI, L> => {
  return {
    ...getChain(M),
    of: a => new Tuple(M.empty, a)
  }
}

/**
 * @since 1.0.0
 */
export const getChainRec = <L>(M: Monoid<L>): ChainRec2C<URI, L> => {
  return {
    ...getChain(M),
    chainRec: (a, f) => {
      let result = f(a)
      let acc = M.empty
      while (result.snd.isLeft()) {
        acc = M.concat(acc, result.fst)
        result = f(result.snd.value)
      }
      return new Tuple(M.concat(acc, result.fst), result.snd.value)
    }
  }
}

/**
 * @since 1.0.0
 */
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = {
  URI,
  compose: (bc, fa) => fa.compose(bc),
  map: (fa, f) => fa.map(f),
  bimap: (fla, f, g) => fla.bimap(f, g),
  extract: wa => wa.extract(),
  extend: (wa, f) => wa.extend(f),
  reduce: (fa, b, f) => fa.reduce(b, f),
  foldMap: _ => (fa, f) => f(fa.snd),
  foldr: (fa, b, f) => f(fa.snd, b),
  traverse: <F>(F: Applicative<F>) => <L, A, B>(ta: Tuple<L, A>, f: (a: A) => HKT<F, B>): HKT<F, Tuple<L, B>> => {
    return F.map(f(ta.snd), b => new Tuple(ta.fst, b))
  },
  sequence: <F>(F: Applicative<F>) => <L, A>(ta: Tuple<L, HKT<F, A>>): HKT<F, Tuple<L, A>> => {
    return F.map(ta.snd, b => new Tuple(ta.fst, b))
  }
}

//
// backporting
//

/**
 * @since 1.19.0
 */
export function swap<L, A>(sa: Tuple<L, A>): Tuple<A, L> {
  return sa.swap()
}

/**
 * @since 1.19.0
 */
export function fst<L, A>(fa: Tuple<L, A>): L {
  return fa.fst
}

/**
 * @since 1.19.0
 */
export function snd<L, A>(fa: Tuple<L, A>): A {
  return fa.snd
}

const { bimap, compose, duplicate, extend, foldMap, map, mapLeft, reduce, reduceRight } = pipeable(tuple)

export { bimap, compose, duplicate, extend, foldMap, map, mapLeft, reduce, reduceRight }
