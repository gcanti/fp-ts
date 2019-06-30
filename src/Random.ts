/**
 * @file Adapted from https://github.com/purescript/purescript-random
 */
import { IO, io } from './IO'

/**
 * Returns a random number between 0 (inclusive) and 1 (exclusive). This is a direct wrapper around JavaScript's
 * `Math.random()`.
 *
 * @since 2.0.0
 */
export const random: IO<number> = () => Math.random()

/**
 * Takes a range specified by `low` (the first argument) and `high` (the second), and returns a random integer uniformly
 * distributed in the closed interval `[low, high]`. It is unspecified what happens if `low > high`, or if either of
 * `low` or `high` is not an integer.
 *
 * @since 2.0.0
 */
export function randomInt(low: number, high: number): IO<number> {
  return io.map(random, n => Math.floor((high - low + 1) * n + low))
}

/**
 * Returns a random number between a minimum value (inclusive) and a maximum value (exclusive). It is unspecified what
 * happens if `maximum < minimum`.
 *
 * @since 2.0.0
 */
export function randomRange(min: number, max: number): IO<number> {
  return io.map(random, n => (max - min) * n + min)
}

/**
 * Returns a random boolean value with an equal chance of being `true` or `false`
 *
 * @since 2.0.0
 */
export const randomBool: IO<boolean> = io.map(random, n => n < 0.5)
