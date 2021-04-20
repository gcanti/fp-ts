/**
 * @since 2.0.0
 */
import * as E from './Eq'
import { flow } from './function'
import { IO } from './IO'
import * as O from './Option'
import { Ord as Ord_, ordDate } from './Ord'
import { not, Predicate } from './Predicate'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Eq: E.Eq<Date> = E.eqDate

/**
 * @category instances
 * @since 2.6.0
 */
export const eqDate: E.Eq<Date> = {
  equals: (x, y) => x.getDate() === y.getDate()
}

/**
 * @category instances
 * @since 2.6.0
 */
export const eqMonth: E.Eq<Date> = {
  equals: (x, y) => x.getMonth() === y.getMonth()
}

/**
 * @category instances
 * @since 2.6.0
 */
export const eqYear: E.Eq<Date> = {
  equals: (x, y) => x.getFullYear() === y.getFullYear()
}

/**
 * @example
 * import { Ord } from 'fp-ts/Date'
 *
 * assert.deepStrictEqual(Ord.compare(new Date(1, 1, 2020), new Date(1, 1, 2021)), -1)
 *
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const Ord: Ord_<Date> = ordDate

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Returns `true` if the input is a valid Date, `false` otherwise.
 *
 * @category refinements
 * @since 2.11.0
 */
export const isValid: Predicate<Date> = flow((date) => date.getTime(), not(isNaN))

/**
 * Returns a `Date` if the input is a valid date time string.
 *
 * @category constructors
 * @since 2.11.0
 */
export const fromString: (value: string) => O.Option<Date> = flow((value) => new Date(value), O.fromPredicate(isValid))

/**
 * Returns the current `Date`
 *
 * @category constructors
 * @since 2.0.0
 */
export const create: IO<Date> = () => new Date()

/**
 * Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC
 *
 * @since 2.0.0
 */
export const now: IO<number> = () => new Date().getTime()
