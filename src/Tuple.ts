/**
 * @file Adapted from https://github.com/purescript/purescript-tuples
 */
import { Applicative, Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { ChainRec2C } from './ChainRec'
import { Comonad2 } from './Comonad'
import { Either } from './Either'
import { Foldable2 } from './Foldable'
import { phantom, identity } from './function'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Monoid, getTupleMonoid } from './Monoid'
import { contramap as contramapOrd, getSemigroup as getOrdSemigroup, Ord } from './Ord'
import { Semigroup, getTupleSemigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { Eq, getTupleEq } from './Eq'
import { Show } from './Show'
import { Traversable2 } from './Traversable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Tuple: Tuple<L, A>
  }
}

export const URI = 'Tuple'

export type URI = typeof URI

/**
 * @since 2.0.0
 */
export type Tuple<L, A> = [L, A]

/**
 * @since 2.0.0
 */
export const getShow = <L, A>(SL: Show<L>, SA: Show<A>): Show<Tuple<L, A>> => {
  return {
    show: t => `[${SL.show(fst(t))}, ${SA.show(snd(t))}]`
  }
}

/**
 * @since 2.0.0
 */
export const fst = <L, A>(fa: Tuple<L, A>): L => {
  return fa[0]
}

/**
 * @since 2.0.0
 */
export const snd = <L, A>(fa: Tuple<L, A>): A => {
  return fa[1]
}

/**
 * @since 2.0.0
 */
export const swap = <L, A>(fa: Tuple<L, A>): Tuple<A, L> => {
  return [snd(fa), fst(fa)]
}

const compose = <L, A, B>(bc: Tuple<A, B>, fa: Tuple<L, A>): Tuple<L, B> => {
  return [fst(fa), snd(bc)]
}

const map = <L, A, B>(fa: Tuple<L, A>, f: (a: A) => B): Tuple<L, B> => {
  return [fst(fa), f(snd(fa))]
}

const bimap = <L, A, M, B>(fa: Tuple<L, A>, f: (l: L) => M, g: (a: A) => B): Tuple<M, B> => {
  return [f(fst(fa)), g(snd(fa))]
}

const extract = snd

const extend = <L, A, B>(fa: Tuple<L, A>, f: (fa: Tuple<L, A>) => B): Tuple<L, B> => {
  return [fst(fa), f(fa)]
}

const reduce = <L, A, B>(fa: Tuple<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return f(b, snd(fa))
}

const foldMap = <M>(_: Monoid<M>) => <L, A>(fa: Tuple<L, A>, f: (a: A) => M): M => {
  return f(snd(fa))
}

const reduceRight = <L, A, B>(fa: Tuple<L, A>, b: B, f: (a: A, b: B) => B): B => {
  return f(snd(fa), b)
}

/**
 * @since 2.0.0
 */
export const getEq = <L, A>(SA: Eq<L>, SB: Eq<A>): Eq<Tuple<L, A>> => {
  return getTupleEq(SA, SB)
}
/**
 * To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 *
 * @since 2.0.0
 */
export const getOrd = <L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>> => {
  return getOrdSemigroup<Tuple<L, A>>().concat(contramapOrd(OL, fst), contramapOrd(OA, snd))
}

/**
 * @since 2.0.0
 */
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>> => {
  return getTupleSemigroup(SL, SA)
}

/**
 * @since 2.0.0
 */
export const getMonoid = <L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>> => {
  return getTupleMonoid(ML, MA)
}

/**
 * @since 2.0.0
 */
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => {
  const ap = <A, B>(fab: Tuple<L, (a: A) => B>, fa: Tuple<L, A>): Tuple<L, B> => {
    return [S.concat(fst(fab), fst(fa)), snd(fab)(snd(fa))]
  }

  return {
    URI,
    _L: phantom,
    map,
    ap
  }
}

const of = <L>(M: Monoid<L>) => <A>(a: A): Tuple<L, A> => {
  return [M.empty, a]
}

/**
 * @since 2.0.0
 */
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => {
  return {
    ...getApply(M),
    of: of(M)
  }
}

/**
 * @since 2.0.0
 */
export const getChain = <L>(S: Semigroup<L>): Chain2C<URI, L> => {
  const chain = <A, B>(fa: Tuple<L, A>, f: (b: A) => Tuple<L, B>): Tuple<L, B> => {
    const [fs, s] = f(snd(fa))
    return [S.concat(fst(fa), fs), s]
  }

  return {
    ...getApply(S),
    chain
  }
}

/**
 * @since 2.0.0
 */
export const getMonad = <L>(M: Monoid<L>): Monad2C<URI, L> => {
  return {
    ...getChain(M),
    of: of(M)
  }
}

/**
 * @since 2.0.0
 */
export const getChainRec = <L>(M: Monoid<L>): ChainRec2C<URI, L> => {
  const chainRec = <A, B>(a: A, f: (a: A) => Tuple<L, Either<A, B>>): Tuple<L, B> => {
    let result: Tuple<L, Either<A, B>> = f(a)
    let acc: L = M.empty
    let s: Either<A, B> = snd(result)
    while (s._tag === 'Left') {
      acc = M.concat(acc, fst(result))
      result = f(s.left)
      s = snd(result)
    }
    return [M.concat(acc, fst(result)), s.right]
  }

  return {
    ...getChain(M),
    chainRec
  }
}

const traverse = <F>(F: Applicative<F>) => <L, A, B>(ta: Tuple<L, A>, f: (a: A) => HKT<F, B>): HKT<F, Tuple<L, B>> => {
  return F.map(f(snd(ta)), b => [fst(ta), b])
}

const sequence = <F>(F: Applicative<F>) => <L, A>(ta: Tuple<L, HKT<F, A>>): HKT<F, Tuple<L, A>> => {
  return F.map(snd(ta), b => [fst(ta), b])
}

/**
 * @since 2.0.0
 */
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI> = {
  URI,
  compose,
  map,
  bimap,
  mapLeft: (fla, f) => bimap(fla, f, identity),
  extract,
  extend,
  reduce,
  foldMap,
  reduceRight,
  traverse,
  sequence
}
