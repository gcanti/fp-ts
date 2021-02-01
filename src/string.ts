/**
 * @since 2.10.0
 */
import * as E from './Eq'
import * as M from './Monoid'
import * as S from './Semigroup'
import * as O from './Ord'
import * as Sh from './Show'

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Eq: E.Eq<string> = E.eqString

/**
 * `string` semigroup under concatenation.
 *
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Semigroup.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Semigroup: S.Semigroup<string> = S.semigroupString

/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Monoid.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Monoid: M.Monoid<string> = M.monoidString

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Ord: O.Ord<string> = O.ordString

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Show: Sh.Show<string> = Sh.showString
