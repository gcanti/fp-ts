/**
 * Data structure which represents non-empty **mutable** arrays.
 *
 * This module is mainly useful while implementing features for `ReadonlyArray` and `ReadonlyNonEmptyArray`.
 *
 * @since 3.0.0
 */
import * as RNEA from './ReadonlyNonEmptyArray'

import ReadonlyNonEmptyArray = RNEA.ReadonlyNonEmptyArray

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface NonEmptyArray<A> extends Array<A> {
  // tslint:disable-next-line: readonly-keyword
  0: A
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReadonlyNonEmptyArray = <A>(as: ReadonlyNonEmptyArray<A>): NonEmptyArray<A> => [as[0], ...as.slice(1)]
