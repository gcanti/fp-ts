/**
 * @since 3.0.0
 */
import { pipe } from '@fp-ts/core/Function'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import type { Sync } from '@fp-ts/core/Sync'
import * as sync from '@fp-ts/core/Sync'

/**
 * Returns a random number between 0 (inclusive) and 1 (exclusive). This is a direct wrapper around JavaScript's
 * `Math.random()`.
 *
 * @since 3.0.0
 */
export const random: Sync<number> = () => Math.random()

/**
 * Takes a range specified by `low` (the first argument) and `high` (the second), and returns a random integer uniformly
 * distributed in the closed interval `[low, high]`. It is unspecified what happens if `low > high`, or if either of
 * `low` or `high` is not an integer.
 *
 * @since 3.0.0
 */
export const randomInt = (low: number, high: number): Sync<number> =>
  pipe(
    random,
    sync.map((n) => Math.floor((high - low + 1) * n + low))
  )

/**
 * Returns a random number between a minimum value (inclusive) and a maximum value (exclusive). It is unspecified what
 * happens if `maximum < minimum`.
 *
 * @since 3.0.0
 */
export const randomRange = (min: number, max: number): Sync<number> =>
  pipe(
    random,
    sync.map((n) => (max - min) * n + min)
  )

/**
 * Returns a random boolean value with an equal chance of being `true` or `false`
 *
 * @since 3.0.0
 */
export const randomBool: Sync<boolean> = pipe(
  random,
  sync.map((n) => n < 0.5)
)

/**
 * Returns a random element of a `NonEmptyReadonlyArray`.
 *
 * @since 3.0.0
 */
export const randomElem = <A>(as: NonEmptyReadonlyArray<A>): Sync<A> =>
  pipe(
    randomInt(0, as.length - 1),
    sync.map((i) => as[i])
  )
