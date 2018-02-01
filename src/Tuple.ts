import { HKT } from './HKT'
import { Setoid } from './Setoid'
import { Ord, getSemigroup as getOrdSemigroup, contramap as contramapOrd } from './Ord'
import { Semigroup } from './Semigroup'
import { Monoid } from './Monoid'
import { Bifunctor2 } from './Bifunctor'
import { Comonad2 } from './Comonad'
import { Apply2C } from './Apply'
import { Monad2C } from './Monad'
import { Foldable2 } from './Foldable'
import { Applicative, Applicative2C } from './Applicative'
import { Traversable2 } from './Traversable'
import { Semigroupoid2 } from './Semigroupoid'
import { toString } from './function'
import { ChainRec2C } from './ChainRec'
import { Chain2C } from './Chain'
import { Either, Right, Left } from './Either'

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
 */
export class Tuple<L, A> {
  readonly '-A': A
  readonly '-L': L
  readonly '-URI': URI
  constructor(readonly value: [L, A]) {}
  fst(): L {
    return this.value[0]
  }
  snd(): A {
    return this.value[1]
  }
  compose<B>(ab: Tuple<A, B>): Tuple<L, B> {
    return new Tuple([this.fst(), ab.snd()])
  }
  map<B>(f: (a: A) => B): Tuple<L, B> {
    return new Tuple([this.fst(), f(this.snd())])
  }
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B> {
    return new Tuple([f(this.fst()), g(this.snd())])
  }
  extract(): A {
    return this.snd()
  }
  extend<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B> {
    return new Tuple([this.fst(), f(this)])
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.snd())
  }
  /** Exchange the first and second components of a tuple */
  swap(): Tuple<A, L> {
    return new Tuple([this.snd(), this.fst()])
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Tuple(${toString(this.value)})`
  }
}

const fst = <L, A>(fa: Tuple<L, A>): L => {
  return fa.fst()
}

const snd = <L, A>(fa: Tuple<L, A>): A => {
  return fa.snd()
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

const extend = <L, A, B>(f: (fa: Tuple<L, A>) => B, fa: Tuple<L, A>): Tuple<L, B> => {
  return fa.extend(f)
}

const reduce = <L, A, B>(fa: Tuple<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

/** @function */
export const getSetoid = <L, A>(SA: Setoid<L>, SB: Setoid<A>): Setoid<Tuple<L, A>> => {
  return {
    equals: (x, y) => {
      const [xa, xb] = x.value
      const [ya, yb] = y.value
      return SA.equals(xa, ya) && SB.equals(xb, yb)
    }
  }
}

/**
 * To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 * @function
 */
export const getOrd = <L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>> => {
  return getOrdSemigroup<Tuple<L, A>>().concat(contramapOrd(fst, OL), contramapOrd(snd, OA))
}

/** @function */
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>> => {
  return {
    concat: (x, y) => {
      const [xa, xb] = x.value
      const [ya, yb] = y.value
      return new Tuple([SL.concat(xa, ya), SA.concat(xb, yb)])
    }
  }
}

/** @function */
export const getMonoid = <L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>> => {
  return {
    ...getSemigroup(ML, MA),
    empty: new Tuple([ML.empty, MA.empty])
  }
}

const ap = <L>(S: Semigroup<L>) => <A, B>(fab: Tuple<L, (b: A) => B>, fa: Tuple<L, A>): Tuple<L, B> => {
  return new Tuple([S.concat(fa.fst(), fab.fst()), fab.snd()(fa.snd())])
}

/** @function */
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => {
  return {
    URI,
    map,
    ap: ap(S)
  }
}

const of = <L>(M: Monoid<L>) => <A>(a: A): Tuple<L, A> => {
  return new Tuple([M.empty, a])
}

/** @function */
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => {
  return {
    ...getApply(M),
    of: of(M)
  }
}

const chain = <L>(M: Monoid<L>) => <A, B>(fa: Tuple<L, A>, f: (b: A) => Tuple<L, B>): Tuple<L, B> => {
  const lb = f(fa.snd())
  return new Tuple([M.concat(fa.fst(), lb.fst()), lb.snd()])
}

/** @function */
export const getChain = <L>(M: Monoid<L>): Chain2C<URI, L> => {
  return {
    ...getApply(M),
    chain: chain(M)
  } as any
}

/** @function */
export const getMonad = <L>(M: Monoid<L>): Monad2C<URI, L> => {
  return {
    ...getChain(M),
    of: of(M)
  }
}

const chainRec = <L>(M: Monoid<L>) => <A, B>(a: A, f: (a: A) => Tuple<L, Either<A, B>>): Tuple<L, B> => {
  let result = f(a)
  let acc = M.empty
  while (result.snd().isLeft()) {
    acc = M.concat(acc, result.fst())
    result = f((result.snd() as Left<A, B>).value)
  }
  return new Tuple([M.concat(acc, result.fst()), (result.snd() as Right<A, B>).value])
}

/** @function */
export const getChainRec = <L>(M: Monoid<L>): ChainRec2C<URI, L> => {
  return {
    ...getChain(M),
    chainRec: chainRec(M)
  }
}

function traverse<F>(F: Applicative<F>): <L, A, B>(ta: Tuple<L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Tuple<L, B>> {
  return (ta, f) => F.map(f(ta.snd()), b => new Tuple([ta.fst(), b]))
}

/** @instance */
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI> = {
  URI,
  compose,
  map,
  bimap,
  extract,
  extend,
  reduce,
  traverse
}
