/**
 * @since 2.0.0
 */
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Chain2C } from './Chain'
import { ChainRec2C } from './ChainRec'
import { Comonad2 } from './Comonad'
import { Foldable2 } from './Foldable'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import * as RT from './ReadonlyTuple'
import { Semigroup } from './Semigroup'
import { Semigroupoid2 } from './Semigroupoid'
import { Traversable2, PipeableTraverse2 } from './Traversable'
import { flap as flap_, Functor2 } from './Functor'
import { Extend2 } from './Extend'

// tslint:disable:readonly-array

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.0.0
 */
export const fst: <A, E>(ea: [A, E]) => A = RT.fst

/**
 * @category destructors
 * @since 2.0.0
 */
export const snd: <A, E>(ea: [A, E]) => E = RT.snd

/**
 * @category combinators
 * @since 2.0.0
 */
export const swap: <A, E>(sa: [A, E]) => [E, A] = RT.swap as any

/**
 * @category instances
 * @since 2.0.0
 */
export const getApply: <S>(S: Semigroup<S>) => Apply2C<URI, S> = RT.getApply as any

/**
 * @category instances
 * @since 2.0.0
 */
export const getApplicative: <M>(M: Monoid<M>) => Applicative2C<URI, M> = RT.getApplicative as any

/**
 * @category instances
 * @since 2.0.0
 */
export const getChain: <S>(S: Semigroup<S>) => Chain2C<URI, S> = RT.getChain as any

/**
 * @category instances
 * @since 2.0.0
 */
export const getMonad: <M>(M: Monoid<M>) => Monad2C<URI, M> = RT.getMonad as any

// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
export const getChainRec: <M>(M: Monoid<M>) => ChainRec2C<URI, M> = RT.getChainRec as any

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Functor2<URI>['map'] = RT.Functor.map as any
const _bimap: Bifunctor2<URI>['bimap'] = RT.Bifunctor.bimap as any
const _mapLeft: Bifunctor2<URI>['mapLeft'] = RT.Bifunctor.mapLeft as any
const _compose: Semigroupoid2<URI>['compose'] = RT.Semigroupoid.compose as any
const _extend: Extend2<URI>['extend'] = RT.Comonad.extend as any
const _reduce: Foldable2<URI>['reduce'] = RT.Foldable.reduce
const _foldMap: Foldable2<URI>['foldMap'] = RT.Foldable.foldMap
const _reduceRight: Foldable2<URI>['reduceRight'] = RT.Foldable.reduceRight
const _traverse: Traversable2<URI>['traverse'] = RT.Traversable.traverse as any

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: [A, E]) => [B, G] = RT.bimap as any

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G] = RT.mapLeft as any

/**
 * @category Semigroupoid
 * @since 2.0.0
 */
export const compose: <A, B>(ab: [B, A]) => <C>(bc: [C, B]) => [C, A] = RT.compose as any

/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const duplicate: <E, A>(wa: [A, E]) => [[A, E], E] = RT.duplicate as any

/**
 * @category Extend
 * @since 2.0.0
 */
export const extend: <E, A, B>(f: (wa: [A, E]) => B) => (wa: [A, E]) => [B, E] = RT.extend as any

/**
 * @category Extract
 * @since 2.6.2
 */
export const extract: <E, A>(wa: [A, E]) => A = RT.extract

/**
 * @category Foldable
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: [A, E]) => M = RT.foldMap

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E] = RT.map as any

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: [A, E]) => B = RT.reduce

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: [A, E]) => B = RT.reduceRight

/**
 * @since 2.6.3
 */
export const traverse: PipeableTraverse2<URI> = RT.traverse as any

/**
 * @since 2.6.3
 */
export const sequence: Traversable2<URI>['sequence'] = RT.sequence as any

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Tuple'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: [A, E]
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 2.7.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Semigroupoid: Semigroupoid2<URI> = {
  URI,
  compose: _compose
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Comonad: Comonad2<URI> = {
  URI,
  map: _map,
  extend: _extend,
  extract
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Foldable: Foldable2<URI> = {
  URI,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Traversable: Traversable2<URI> = {
  URI,
  map: _map,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI> = {
  URI,
  compose: _compose,
  map: _map,
  bimap: _bimap,
  mapLeft: _mapLeft,
  extract,
  extend: _extend,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence
}
