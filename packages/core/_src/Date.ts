/**
 * @since 3.0.0
 */
import type * as eq from '@fp-ts/core/Eq'
import { pipe } from '@fp-ts/core/Function'
import * as number from '@fp-ts/core/number'
import * as ord from '@fp-ts/core/Ord'
import type { Sync } from '@fp-ts/core/Sync'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: eq.Eq<Date> = {
  equals: (that) => (self) => self.valueOf() === that.valueOf()
}

/**
 * @category instances
 * @since 3.0.0
 */
export const EqDate: eq.Eq<Date> = {
  equals: (that) => (self) => self.getDate() === that.getDate()
}

/**
 * @category instances
 * @since 3.0.0
 */
export const EqMonth: eq.Eq<Date> = {
  equals: (that) => (self) => self.getMonth() === that.getMonth()
}

/**
 * @category instances
 * @since 3.0.0
 */
export const EqYear: eq.Eq<Date> = {
  equals: (that) => (self) => self.getFullYear() === that.getFullYear()
}

/**
 * @example
 * import { Ord } from '@fp-ts/core/Date'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(new Date(1, 1, 2020), Ord.compare(new Date(1, 1, 2021))), -1)
 *
 * @category instances
 * @since 3.0.0
 */
export const Ord: ord.Ord<Date> = pipe(
  number.Ord,
  ord.contramap((date) => date.valueOf())
)

/**
 * Returns the current `Date`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const create: Sync<Date> = () => new Date()

/**
 * Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC.
 *
 * @since 3.0.0
 */
export const now: Sync<number> = () => new Date().getTime()
