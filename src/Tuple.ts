import { Applicative, Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { ChainRec2C } from './ChainRec'
import { Comonad2 } from './Comonad'
import { Either } from './Either_'
import { Foldable2v2 } from './Foldable2v'
import { phantom, toString } from './function'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { contramap as contramapOrd, getSemigroup as getOrdSemigroup, Ord } from './Ord'
import { Semigroup } from './Semigroup_'
import { Semigroupoid2 } from './Semigroupoid'
import { Setoid, fromEquals } from './Setoid'
import { Traversable2v2 } from './Traversable2v'

// Adapted from https://github.com/purescript/purescript-tuples

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Tuple: Tuple<L, A>
  }
}

export const URI = 'Tuple'

export type URI = typeof URI

/**
 * @data
 * @constructor Tuple
 * @since 1.0.0
 */
export class Tuple<L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly fst: L, readonly snd: A) {}
  compose<B>(ab: Tuple<A, B>): Tuple<L, B> {
    return new Tuple(this.fst, ab.snd)
  }
  map<B>(f: (a: A) => B): Tuple<L, B> {
    return new Tuple(this.fst, f(this.snd))
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B> {
    return new Tuple(f(this.fst), g(this.snd))
  }
  extract(): A {
    return this.snd
  }
  extend<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B> {
    return new Tuple(this.fst, f(this))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.snd)
  }
  /** Exchange the first and second components of a tuple */
  swap(): Tuple<A, L> {
    return new Tuple(this.snd, this.fst)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Tuple(${toString(this.fst)}, ${toString(this.snd)})`
  }
  toTuple(): [L, A] {
    return [this.fst, this.snd]
  }
}

const fst = <L, A>(fa: Tuple<L, A>): L => {
  return fa.fst
}

const snd = <L, A>(fa: Tuple<L, A>): A => {
  return fa.snd
}

const compose = <L, A, B>(bc: Tuple<A, B>, fa: Tuple<L, A>): Tuple<L, B> => {
  return fa.compose(bc)
}

const map = <L, A, B>(fa: Tuple<L, A>, f: (a: A) => B): Tuple<L, B> => {
  return fa.map(f)
}

const bimap = <L, A, M, B>(fla: Tuple<L, A>, f: (l: L) => M, g: (a: A) => B): Tuple<M, B> => {
  return fla.bimap(f, g)
}

const extract = snd

const extend = <L, A, B>(fa: Tuple<L, A>, f: (fa: Tuple<L, A>) => B): Tuple<L, B> => {
  return fa.extend(f)
}

const reduce = <L, A, B>(fa: Tuple<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const foldMap = <M>(M: Monoid<M>) => <L, A>(fa: Tuple<L, A>, f: (a: A) => M): M => {
  return f(fa.snd)
}

const foldr = <L, A, B>(fa: Tuple<L, A>, b: B, f: (a: A, b: B) => B): B => {
  return f(fa.snd, b)
}

/**
 * @since 1.0.0
 */
export const getSetoid = <L, A>(SA: Setoid<L>, SB: Setoid<A>): Setoid<Tuple<L, A>> => {
  return fromEquals((x, y) => SA.equals(x.fst, y.fst) && SB.equals(x.snd, y.snd))
}
/**
 * To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 *
 * @since 1.0.0
 */
export const getOrd = <L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>> => {
  return getOrdSemigroup<Tuple<L, A>>().concat(contramapOrd(fst, OL), contramapOrd(snd, OA))
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
    ...getSemigroup(ML, MA),
    empty: new Tuple(ML.empty, MA.empty)
  }
}

const ap = <L>(S: Semigroup<L>) => <A, B>(fab: Tuple<L, (a: A) => B>, fa: Tuple<L, A>): Tuple<L, B> => {
  return new Tuple(S.concat(fab.fst, fa.fst), fab.snd(fa.snd))
}

/**
 * @since 1.0.0
 */
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => {
  return {
    URI,
    _L: phantom,
    map,
    ap: ap(S)
  }
}

const of = <L>(M: Monoid<L>) => <A>(a: A): Tuple<L, A> => {
  return new Tuple(M.empty, a)
}

/**
 * @since 1.0.0
 */
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => {
  return {
    ...getApply(M),
    of: of(M)
  }
}

const chain = <L>(S: Semigroup<L>) => <A, B>(fa: Tuple<L, A>, f: (b: A) => Tuple<L, B>): Tuple<L, B> => {
  const { fst, snd } = f(fa.snd)
  return new Tuple(S.concat(fa.fst, fst), snd)
}

/**
 * @since 1.0.0
 */
export const getChain = <L>(S: Semigroup<L>): Chain2C<URI, L> => {
  return {
    ...getApply(S),
    chain: chain(S)
  }
}

/**
 * @since 1.0.0
 */
export const getMonad = <L>(M: Monoid<L>): Monad2C<URI, L> => {
  return {
    ...getChain(M),
    of: of(M)
  }
}

const chainRec = <L>(M: Monoid<L>) => <A, B>(a: A, f: (a: A) => Tuple<L, Either<A, B>>): Tuple<L, B> => {
  let result = f(a)
  let acc = M.empty
  while (result.snd.isLeft()) {
    acc = M.concat(acc, result.fst)
    result = f(result.snd.value)
  }
  return new Tuple(M.concat(acc, result.fst), result.snd.value)
}

/**
 * @since 1.0.0
 */
export const getChainRec = <L>(M: Monoid<L>): ChainRec2C<URI, L> => {
  return {
    ...getChain(M),
    chainRec: chainRec(M)
  }
}

const traverse = <F>(F: Applicative<F>) => <L, A, B>(ta: Tuple<L, A>, f: (a: A) => HKT<F, B>): HKT<F, Tuple<L, B>> => {
  return F.map(f(ta.snd), b => new Tuple(ta.fst, b))
}

const sequence = <F>(F: Applicative<F>) => <L, A>(ta: Tuple<L, HKT<F, A>>): HKT<F, Tuple<L, A>> => {
  return F.map(ta.snd, b => new Tuple(ta.fst, b))
}

/**
 * @since 1.0.0
 */
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = {
  URI,
  compose,
  map,
  bimap,
  extract,
  extend,
  reduce,
  foldMap,
  foldr,
  traverse,
  sequence
}
