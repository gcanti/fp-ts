/**
 * @since 3.0.0
 */
import * as io from './IO'
import { pipe } from './Function'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { IO } from './IO'

/**
 * Returns a random number between 0 (inclusive) and 1 (exclusive). This is a direct wrapper around JavaScript's
 * `Math.random()`.
 *
 * @since 3.0.0
 */
export const random: IO<number> = () => Math.random()

/**
 * Takes a range specified by `low` (the first argument) and `high` (the second), and returns a random integer uniformly
 * distributed in the closed interval `[low, high]`. It is unspecified what happens if `low > high`, or if either of
 * `low` or `high` is not an integer.
 *
 * @since 3.0.0
 */
export const randomInt = (low: number, high: number): IO<number> =>
  pipe(
    random,
    io.map((n) => Math.floor((high - low + 1) * n + low))
  )

/**
 * Returns a random number between a minimum value (inclusive) and a maximum value (exclusive). It is unspecified what
 * happens if `maximum < minimum`.
 *
 * @since 3.0.0
 */
export const randomRange = (min: number, max: number): IO<number> =>
  pipe(
    random,
    io.map((n) => (max - min) * n + min)
  )

/**
 * Returns a random boolean value with an equal chance of being `true` or `false`
 *
 * @since 3.0.0
 */
export const randomBool: IO<boolean> =
  /*#__PURE__*/
  pipe(
    random,
    io.map((n) => n < 0.5)
  )

/**
 * Returns a random element of a `ReadonlyNonEmptyArray`.
 *
 * @since 3.0.0
 */
export const randomElem = <A>(as: ReadonlyNonEmptyArray<A>): IO<A> =>
  pipe(
    randomInt(0, as.length - 1),
    io.map((i) => as[i])
  )
