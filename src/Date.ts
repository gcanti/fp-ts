import { IO } from './IO'

/**
 * Returns the current `Date`
 * @constant
 * @since 1.10.0
 */
export const create: IO<Date> = new IO(() => new Date())

/**
 * Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC
 * @constant
 * @since 1.10.0
 */
export const now: IO<number> = new IO(() => new Date().getTime())
