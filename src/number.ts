/**
 * @since 2.10.0
 */
import * as B from './Bounded'
import * as E from './Eq'
import * as F from './Field'
import * as O from './Ord'
import * as S from './Show'
import { Semigroup, semigroupProduct, semigroupSum } from './Semigroup'
import { Monoid, monoidProduct, monoidSum } from './Monoid'

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Eq: E.Eq<number> = E.eqNumber

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Ord: O.Ord<number> = O.ordNumber

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Bounded: B.Bounded<number> = B.boundedNumber

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Field: F.Field<number> = F.fieldNumber

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Show: S.Show<number> = S.showNumber

/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(SemigroupSum.concat(2, 3), 5)
 *
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const SemigroupSum: Semigroup<number> = semigroupSum

/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupProduct } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(SemigroupProduct.concat(2, 3), 6)
 *
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const SemigroupProduct: Semigroup<number> = semigroupProduct

/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import { MonoidSum } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(MonoidSum.concat(2, MonoidSum.empty), 2)
 *
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const MonoidSum: Monoid<number> = monoidSum

/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @example
 * import { MonoidProduct } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(MonoidProduct.concat(2, MonoidProduct.empty), 2)
 *
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const MonoidProduct: Monoid<number> = monoidProduct
