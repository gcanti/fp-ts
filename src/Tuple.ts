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

// tslint:disable:readonly-array

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.0.0
 */
export const fst: <A, S>(sa: [A, S]) => A = RT.fst

/**
 * @category destructors
 * @since 2.0.0
 */
export const snd: <A, S>(sa: [A, S]) => S = RT.snd

/**
 * @category combinators
 * @since 2.0.0
 */
export const swap: <A, S>(sa: [A, S]) => [S, A] = RT.swap as any

/**
 * @category instances
 * @since 2.0.0
 */
export const getApply: <S>(S: Semigroup<S>) => Apply2C<URI, S> = RT.getApply as any

/**
 * @category instances
 * @since 2.0.0
 */
export const getApplicative: <S>(M: Monoid<S>) => Applicative2C<URI, S> = RT.getApplicative as any

/**
 * @category instances
 * @since 2.0.0
 */
export const getChain: <S>(S: Semigroup<S>) => Chain2C<URI, S> = RT.getChain as any

/**
 * @category instances
 * @since 2.0.0
 */
export const getMonad: <S>(M: Monoid<S>) => Monad2C<URI, S> = RT.getMonad as any

/**
 * @category instances
 * @since 2.0.0
 */
export const getChainRec: <S>(M: Monoid<S>) => ChainRec2C<URI, S> = RT.getChainRec as any

// -------------------------------------------------------------------------------------
// pipeables
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
export const compose: <E, A>(la: [A, E]) => <B>(ab: [B, A]) => [B, E] = RT.compose as any

/**
 * @category Extend
 * @since 2.0.0
 */
export const duplicate: <E, A>(ma: [A, E]) => [[A, E], E] = RT.duplicate as any

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
 * @since 2.0.0
 */
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI> =
  /*#__PURE__*/
  (() => {
    return Object.assign({}, RT.readonlyTuple as any, { URI })
  })()
