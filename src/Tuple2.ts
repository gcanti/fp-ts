/**
 * @since 3.0.0
 */
import { Applicative, Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2, mapLeftDefault } from './Bifunctor'
import { Comonad2 } from './Comonad'
import { Extend2 } from './Extend'
import { Foldable2 } from './Foldable'
import { identity, pipe } from './function'
import { flap as flap_, Functor2 } from './Functor'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Pointed2C } from './Pointed'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { Traversable2 } from './Traversable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export type Tuple2<E, A> = readonly [A, E]

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
export const bimap: Bifunctor2<URI>['bimap'] = (f, g) => (fa) => [g(fst(fa)), f(snd(fa))]

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: Bifunctor2<URI>['mapLeft'] =
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
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor2<URI>['map'] = (f) => (fa) => [f(fst(fa)), snd(fa)]

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

/**
 * @since 3.0.0
 */
export const sequence: Traversable2<URI>['sequence'] = <F>(F: Applicative<F>) => <A, E>(
  t: Tuple2<E, HKT<F, A>>
): HKT<F, Tuple2<E, A>> =>
  pipe(
    fst(t),
    F.map((a) => [a, snd(t)])
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
export const Functor: Functor2<URI> = {
  map
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
export const Bifunctor: Bifunctor2<URI> = {
  bimap,
  mapLeft
}

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
  map,
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
  map,
  traverse,
  sequence
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getPointed = <M>(M: Monoid<M>): Pointed2C<URI, M> => ({
  map,
  of: (a) => [a, M.empty]
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <S>(S: Semigroup<S>): Apply2C<URI, S> => ({
  map,
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
    map,
    ap: A.ap,
    of: P.of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <M>(M: Monoid<M>): Monad2C<URI, M> => {
  const P = getPointed(M)
  return {
    map,
    chain: (f) => (ma) => {
      const [b, s] = f(fst(ma))
      return [b, M.concat(s)(snd(ma))]
    },
    of: P.of
  }
}
