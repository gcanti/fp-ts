/**
 * @since 3.0.0
 */
import type { IO } from './IO'
import type * as eq from './Eq'
import { pipe } from './Function'
import * as ord from './Ord'
import * as number from './number'

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
 * import { Ord } from 'fp-ts/Date'
 * import { pipe } from 'fp-ts/Function'
 *
 * assert.deepStrictEqual(pipe(new Date(1, 1, 2020), Ord.compare(new Date(1, 1, 2021))), -1)
 *
 * @category instances
 * @since 3.0.0
 */
export const Ord: ord.Ord<Date> =
  /*#__PURE__*/
  pipe(
    number.Ord,
    /*#__PURE__*/
    ord.contramap((date) => date.valueOf())
  )

/**
 * Returns the current `Date`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const create: IO<Date> = () => new Date()

/**
 * Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC.
 *
 * @since 3.0.0
 */
export const now: IO<number> = () => new Date().getTime()
