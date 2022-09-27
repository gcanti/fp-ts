/**
 * @since 3.0.0
 */

import { flow, identity } from './function'
import type { TypeLambda } from './HKT'
import type { Monoid } from './Monoid'
import type { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
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

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Endomorphism form a `Semigroup` where the `combine` operation is the usual function composition.
 *
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(): Semigroup<Endomorphism<A>> => ({
  combine: (second) => (first) => flow(first, second)
})

/**
 * Endomorphism form a `Monoid` where the `empty` value is the `identity` function.
 *
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(): Monoid<Endomorphism<A>> => ({
  combine: getSemigroup<A>().combine,
  empty: identity
})
