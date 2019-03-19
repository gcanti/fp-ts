import * as fc from 'fast-check'
import { Option, some, none } from '../../src/Option'

/**
 * Returns an `Arbitrary` that yelds only `some`s
 * @since 0.0.2
 */
export function getSome<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Option<A>> {
  return arb.map(some)
}

/**
 * Returns an `Arbitrary` that yelds only `none`s
 * @since 0.0.2
 */
export function getNone<A>(): fc.Arbitrary<Option<A>> {
  return fc.constant(none)
}

/**
 * Returns an `Arbitrary` that yelds both `some`s and `none`s
 * @since 0.0.2
 */
export function getOption<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Option<A>> {
  return fc.oneof(getNone(), getSome(arb))
}
