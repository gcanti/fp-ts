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
import { Traversable2 } from './Traversable'

// tslint:disable:readonly-array

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Tuple: [A, E]
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Tuple'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export const fst: <A, S>(sa: [A, S]) => A = RT.fst

/**
 * @since 2.0.0
 */
export const snd: <A, S>(sa: [A, S]) => S = RT.snd

/**
 * @since 2.0.0
 */
export const swap: <A, S>(sa: [A, S]) => [S, A] = RT.swap as any

/**
 * @since 2.0.0
 */
export const getApply: <S>(S: Semigroup<S>) => Apply2C<URI, S> = RT.getApply as any

/**
 * @since 2.0.0
 */
export const getApplicative: <S>(M: Monoid<S>) => Applicative2C<URI, S> = RT.getApplicative as any

/**
 * @since 2.0.0
 */
export const getChain: <S>(S: Semigroup<S>) => Chain2C<URI, S> = RT.getChain as any

/**
 * @since 2.0.0
 */
export const getMonad: <S>(M: Monoid<S>) => Monad2C<URI, S> = RT.getMonad as any

/**
 * @since 2.0.0
 */
export const getChainRec: <S>(M: Monoid<S>) => ChainRec2C<URI, S> = RT.getChainRec as any

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: [A, E]) => [B, G] = RT.bimap as any
/**
 * @since 2.0.0
 */
export const compose: <E, A>(la: [A, E]) => <B>(ab: [B, A]) => [B, E] = RT.compose as any
/**
 * @since 2.0.0
 */
export const duplicate: <E, A>(ma: [A, E]) => [[A, E], E] = RT.duplicate as any
/**
 * @since 2.0.0
 */
export const extend: <E, A, B>(f: (wa: [A, E]) => B) => (wa: [A, E]) => [B, E] = RT.extend as any

/**
 * @since 2.6.2
 */
export const extract: <E, A>(wa: [A, E]) => A = RT.extract
/**
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: [A, E]) => M = RT.foldMap
/**
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: [A, E]) => [B, E] = RT.map as any
/**
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: [A, E]) => [A, G] = RT.mapLeft as any
/**
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: [A, E]) => B = RT.reduce
/**
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: [A, E]) => B = RT.reduceRight

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI> =
  /*#__PURE__*/
  (() => {
    return {
      ...(RT.readonlyTuple as any),
      URI
    }
  })()
