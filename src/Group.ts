/**
 * A `Group` is a `Monoid` with inverses. Instances must satisfy the following law in addition to the monoid laws:
 *
 * - Inverse: `concat(inverse(a), a) <-> empty = concat(a, inverse(a))`
 *
 * @since 3.0.0
 */
import { Endomorphism } from './function'
import { Monoid } from './Monoid'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Group<A> extends Monoid<A> {
  readonly inverse: Endomorphism<A>
}
