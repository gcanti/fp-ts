/**
 * @since 3.0.0
 */
import type { Applicative, Applicative2C } from './Applicative'
import type { Apply2C } from './Apply'
import { Bifunctor2, map as map_, mapLeftDefault } from './Bifunctor'
import type { Chain2C } from './Chain'
import type { ChainRec2C } from './ChainRec'
import type { Comonad2 } from './Comonad'
import type { Either } from './Either'
import type { Extend2 } from './Extend'
import type { Foldable2 } from './Foldable'
import { identity, pipe } from './function'
import { flap as flap_, Functor2 } from './Functor'
import type { HKT } from './HKT'
import type { Monad2C } from './Monad'
import type { Monoid } from './Monoid'
import type { Pointed2C } from './Pointed'
import type { Semigroup } from './Semigroup'
import type { Semigroupoid2 } from './Semigroupoid'
import type { Traversable2 } from './Traversable'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export type Tuple2<E, A> = readonly [A, E]

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const tuple2 = <A, E>(a: A, e: E): Tuple2<E, A> => [a, e]

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const fst = <A, E>(t: Tuple2<E, A>): A => t[0]

/**
 * @since 3.0.0
 */
export const snd = <A, E>(t: Tuple2<E, A>): E => t[1]

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap = <A, E>(t: Tuple2<E, A>): Tuple2<A, E> => [snd(t), fst(t)]

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap = <E, G, A, B>(mapSnd: (e: E) => G, mapFst: (a: A) => B) => (t: Tuple2<E, A>): Tuple2<G, B> => [
  mapFst(fst(t)),
  mapSnd(snd(t))
]

/**
 * Map a function over the second component of a `Tuple2`.
 *
 * This is the `mapLeft` operation of the `Bifunctor` instance.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapSnd: Bifunctor2<URI>['mapLeft'] =
  /*#__PURE__*/
  mapLeftDefault<URI>(bimap)

/**
 * @category Semigroupoid
 * @since 3.0.0
 */
export const compose: Semigroupoid2<URI>['compose'] = (bc) => (ab) => [fst(bc), snd(ab)]

/**
 * @category Extend
 * @since 3.0.0
 */
export const extend: Extend2<URI>['extend'] = (f) => (wa) => [f(wa), snd(wa)]

/**
 * @category Extract
 * @since 3.0.0
 */
export const extract: Comonad2<URI>['extract'] = fst

/**
 * Derivable from `Extend`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const duplicate: <E, A>(t: Tuple2<E, A>) => Tuple2<E, Tuple2<E, A>> =
  /*#__PURE__*/
  extend(identity)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: Foldable2<URI>['reduce'] = (b, f) => (fa) => f(b, fst(fa))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const foldMap: Foldable2<URI>['foldMap'] = () => (f) => (fa) => f(fst(fa))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: Foldable2<URI>['reduceRight'] = (b, f) => (fa) => f(fst(fa), b)

/**
 * @since 3.0.0
 */
export const traverse: Traversable2<URI>['traverse'] = <F>(F: Applicative<F>) => <A, B>(f: (a: A) => HKT<F, B>) => <E>(
  t: Tuple2<E, A>
): HKT<F, Tuple2<E, B>> =>
  pipe(
    f(fst(t)),
    F.map((b) => [b, snd(t)])
  )

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'Tuple2'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Tuple2: Tuple2<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  bimap,
  mapLeft: mapSnd
}

/**
 * Map a function over the first component of a `Tuple2`.
 *
 * This is the `map` operation of the `Functor` instance.
 *
 * @category Functor
 * @since 3.0.0
 */
export const mapFst: Functor2<URI>['map'] =
  /*#__PURE__*/
  map_<URI>(Bifunctor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  map: mapFst
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Semigroupoid: Semigroupoid2<URI> = {
  compose
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: Comonad2<URI> = {
  map: mapFst,
  extend,
  extract
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable2<URI> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: Traversable2<URI> = {
  map: mapFst,
  traverse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getPointed = <M>(M: Monoid<M>): Pointed2C<URI, M> => ({
  of: (a) => [a, M.empty]
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <S>(S: Semigroup<S>): Apply2C<URI, S> => ({
  map: mapFst,
  ap: (fa) => (fab) => [fst(fab)(fst(fa)), S.concat(snd(fa))(snd(fab))]
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <M>(M: Monoid<M>): Applicative2C<URI, M> => {
  const A = getApply(M)
  const P = getPointed(M)
  return {
    map: mapFst,
    ap: A.ap,
    of: P.of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getChain = <S>(S: Semigroup<S>): Chain2C<URI, S> => {
  return {
    map: mapFst,
    chain: (f) => (ma) => {
      const [b, s] = f(fst(ma))
      return [b, S.concat(s)(snd(ma))]
    }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <M>(M: Monoid<M>): Monad2C<URI, M> => {
  const P = getPointed(M)
  const C = getChain(M)
  return {
    map: mapFst,
    chain: C.chain,
    of: P.of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getChainRec<M>(M: Monoid<M>): ChainRec2C<URI, M> {
  const chainRec = <A, B>(f: (a: A) => readonly [Either<A, B>, M]) => (a: A): readonly [B, M] => {
    let result: readonly [Either<A, B>, M] = f(a)
    let acc: M = M.empty
    let s: Either<A, B> = fst(result)
    while (_.isLeft(s)) {
      acc = M.concat(snd(result))(acc)
      result = f(s.left)
      s = fst(result)
    }
    return [s.right, M.concat(snd(result))(acc)]
  }

  return {
    chainRec
  }
}
