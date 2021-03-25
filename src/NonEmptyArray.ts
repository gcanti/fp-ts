/**
 * Data structure which represents non-empty **mutable** arrays.
 *
 * This module is mainly useful while implementing features for `ReadonlyArray` and `ReadonlyNonEmptyArray`.
 *
 * @since 3.0.0
 */
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import * as _ from './internal'

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
export const fromReadonlyNonEmptyArray = <A>(as: ReadonlyNonEmptyArray<A>): NonEmptyArray<A> => [
  _.head(as),
  ..._.tail(as)
]
