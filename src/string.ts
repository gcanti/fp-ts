/**
 * @since 2.10.0
 */
import * as E from './Eq'
import * as S from './Semigroup'

/**
 * @category instances
 * @since 2.10.0
 */
export const Eq: E.Eq<string> = E.eqStrict

/**
 * `string` semigroup under concatenation.
 *
 * @example
 * import { Semigroup } from 'fp-ts/string'
 *
 * assert.deepStrictEqual(Semigroup.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.10.0
 */
export const Semigroup: S.Semigroup<string> = {
  concat: (x, y) => x + y
}
