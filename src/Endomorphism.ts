/**
 * @since 3.0.0
 */

import type * as category from './Category'
import type * as composable from './Composable'
import * as func from './Function'
import type { TypeLambda } from './HKT'
import type { Monoid } from './Monoid'
import type { Semigroup } from './Semigroup'

/**
 * @category model
 * @since 3.0.0
 */
export interface Endomorphism<A> {
  (a: A): A
}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface EndomorphismTypeLambda extends TypeLambda {
  readonly type: Endomorphism<this['InOut1']>
}

/**
 * @since 3.0.0
 */
export const id: <A>() => Endomorphism<A> = func.id

/**
 * @since 3.0.0
 */
export const compose: <B, C>(bc: (b: B) => C) => <A>(ab: (a: A) => B) => (a: A) => C = func.compose

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Composable: composable.Composable<EndomorphismTypeLambda> = {
  compose
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Category: category.Category<EndomorphismTypeLambda> = {
  compose,
  id
}

/**
 * `Endomorphism` form a `Semigroup` where the `combine` operation is the usual function composition.
 *
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(): Semigroup<Endomorphism<A>> => ({
  combine: (that) => (self) => func.flow(self, that)
})

/**
 * `Endomorphism` form a `Monoid` where the `empty` value is the `identity` function.
 *
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(): Monoid<Endomorphism<A>> => ({
  combine: getSemigroup<A>().combine,
  empty: func.identity
})
