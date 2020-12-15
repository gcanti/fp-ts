/**
 * @since 2.0.0
 */
import { IO } from './IO'
import { Eq } from './Eq'

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

/**
 * @category instances
 * @since 2.6.0
 */
export const eqDate: Eq<Date> = {
  equals: (second) => (first) => first.getDate() === second.getDate()
}

/**
 * @category instances
 * @since 2.6.0
 */
export const eqMonth: Eq<Date> = {
  equals: (second) => (first) => first.getMonth() === second.getMonth()
}

/**
 * @category instances
 * @since 2.6.0
 */
export const eqYear: Eq<Date> = {
  equals: (second) => (first) => first.getFullYear() === second.getFullYear()
}
