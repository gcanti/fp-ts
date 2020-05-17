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
import { pipeable } from './pipeable'
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

/**
 * @since 2.0.0
 */
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI> =
  /*#__PURE__*/
  (() => Object.assign({}, RT.readonlyTuple, { URI }) as any)()

const pipeables = /*#__PURE__*/ pipeable(tuple)
const bimap = /*#__PURE__*/ (() => pipeables.bimap)()
const compose = /*#__PURE__*/ (() => pipeables.compose)()
const duplicate = /*#__PURE__*/ (() => pipeables.duplicate)()
const extend = /*#__PURE__*/ (() => pipeables.extend)()
const foldMap = /*#__PURE__*/ (() => pipeables.foldMap)()
const map = /*#__PURE__*/ (() => pipeables.map)()
const mapLeft = /*#__PURE__*/ (() => pipeables.mapLeft)()
const reduce = /*#__PURE__*/ (() => pipeables.reduce)()
const reduceRight = /*#__PURE__*/ (() => pipeables.reduceRight)()

export {
  /**
   * @since 2.0.0
   */
  bimap,
  /**
   * @since 2.0.0
   */
  compose,
  /**
   * @since 2.0.0
   */
  duplicate,
  /**
   * @since 2.0.0
   */
  extend,
  /**
   * @since 2.0.0
   */
  foldMap,
  /**
   * @since 2.0.0
   */
  map,
  /**
   * @since 2.0.0
   */
  mapLeft,
  /**
   * @since 2.0.0
   */
  reduce,
  /**
   * @since 2.0.0
   */
  reduceRight
}
