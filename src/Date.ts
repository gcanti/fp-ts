/**
 * @since 2.0.0
 */
import { IO } from './IO'
import { eqNumber, contramap, Eq } from './Eq'

/**
 * Returns the current `Date`
 *
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
 * @since 2.6.0
 */
export const eqDate: Eq<Date> = contramap((x: Date) => x.getDate())(eqNumber)

/**
 * @since 2.6.0
 */
export const eqMonth: Eq<Date> = contramap((x: Date) => x.getMonth())(eqNumber)

/**
 * @since 2.6.0
 */
export const eqYear: Eq<Date> = contramap((x: Date) => x.getFullYear())(eqNumber)
