/**
 * @since 2.5.0
 */
import { Applicative, Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { ChainRec2C } from './ChainRec'
import { Comonad2 } from './Comonad'
import { Either } from './Either'
import { Foldable2 } from './Foldable'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { Traversable2 } from './Traversable'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly ReadonlyTuple: readonly [A, E]
  }
}

/**
 * @since 2.5.0
 */
export const URI = 'ReadonlyTuple'

/**
 * @since 2.5.0
 */
export type URI = typeof URI

/**
 * @since 2.5.0
 */
export function fst<A, S>(sa: readonly [A, S]): A {
  return sa[0]
}

/**
 * @since 2.5.0
 */
export function snd<A, S>(sa: readonly [A, S]): S {
  return sa[1]
}

/**
 * @since 2.5.0
 */
export function swap<A, S>(sa: readonly [A, S]): readonly [S, A] {
  return [snd(sa), fst(sa)]
}

/**
 * @since 2.5.0
 */
export function getApply<S>(S: Semigroup<S>): Apply2C<URI, S> {
  return {
    URI,
    _E: undefined as any,
    map: readonlyTuple.map,
    ap: (fab, fa) => [fst(fab)(fst(fa)), S.concat(snd(fab), snd(fa))]
  }
}

const of = <S>(M: Monoid<S>) => <A>(a: A): readonly [A, S] => {
  return [a, M.empty]
}

/**
 * @since 2.5.0
 */
export function getApplicative<S>(M: Monoid<S>): Applicative2C<URI, S> {
  return {
    ...getApply(M),
    of: of(M)
  }
}

/**
 * @since 2.5.0
 */
export function getChain<S>(S: Semigroup<S>): Chain2C<URI, S> {
  return {
    ...getApply(S),
    chain: (fa, f) => {
      const [b, s] = f(fst(fa))
      return [b, S.concat(snd(fa), s)]
    }
  }
}

/**
 * @since 2.5.0
 */
export function getMonad<S>(M: Monoid<S>): Monad2C<URI, S> {
  return {
    ...getChain(M),
    of: of(M)
  }
}

/**
 * @since 2.5.0
 */
export function getChainRec<S>(M: Monoid<S>): ChainRec2C<URI, S> {
  const chainRec = <A, B>(a: A, f: (a: A) => readonly [Either<A, B>, S]): readonly [B, S] => {
    let result: readonly [Either<A, B>, S] = f(a)
    let acc: S = M.empty
    let s: Either<A, B> = fst(result)
    while (s._tag === 'Left') {
      acc = M.concat(acc, snd(result))
      result = f(s.left)
      s = fst(result)
    }
    return [s.right, M.concat(acc, snd(result))]
  }

  return {
    ...getChain(M),
    chainRec
  }
}

/**
 * @since 2.5.0
 */
export const readonlyTuple: Semigroupoid2<URI> &
  Bifunctor2<URI> &
  Comonad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> = {
  URI,
  compose: (ba, ae) => [fst(ba), snd(ae)],
  map: (ae, f) => [f(fst(ae)), snd(ae)],
  bimap: (fea, f, g) => [g(fst(fea)), f(snd(fea))],
  mapLeft: (fea, f) => [fst(fea), f(snd(fea))],
  extract: fst,
  extend: (ae, f) => [f(ae), snd(ae)],
  reduce: (ae, b, f) => f(b, fst(ae)),
  foldMap: _ => (ae, f) => f(fst(ae)),
  reduceRight: (ae, b, f) => f(fst(ae), b),
  traverse: <F>(F: Applicative<F>) => <A, S, B>(
    as: readonly [A, S],
    f: (a: A) => HKT<F, B>
  ): HKT<F, readonly [B, S]> => {
    return F.map(f(fst(as)), b => [b, snd(as)])
  },
  sequence: <F>(F: Applicative<F>) => <A, S>(fas: readonly [HKT<F, A>, S]): HKT<F, readonly [A, S]> => {
    return F.map(fst(fas), a => [a, snd(fas)])
  }
}

const { bimap, compose, duplicate, extend, foldMap, map, mapLeft, reduce, reduceRight } = pipeable(readonlyTuple)

export {
  /**
   * @since 2.5.0
   */
  bimap,
  /**
   * @since 2.5.0
   */
  compose,
  /**
   * @since 2.5.0
   */
  duplicate,
  /**
   * @since 2.5.0
   */
  extend,
  /**
   * @since 2.5.0
   */
  foldMap,
  /**
   * @since 2.5.0
   */
  map,
  /**
   * @since 2.5.0
   */
  mapLeft,
  /**
   * @since 2.5.0
   */
  reduce,
  /**
   * @since 2.5.0
   */
  reduceRight
}
