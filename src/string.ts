/**
 * @since 2.10.0
 */
import * as E from './Eq'
import * as M from './Monoid'
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
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(S.Semigroup.concat('a', 'b'), 'ab')
 *
 * @category instances
 * @since 2.10.0
 */
export const Semigroup: S.Semigroup<string> = {
  concat: (x, y) => x + y
}

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
export const Monoid: M.Monoid<string> = {
  concat: Semigroup.concat,
  empty: ''
}
