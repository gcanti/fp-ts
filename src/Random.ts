import { IO } from './IO'

// Adapted from https://github.com/purescript/purescript-random

/**
 * Returns a random number between 0 (inclusive) and 1 (exclusive). This is
 * a direct wrapper around JavaScript's `Math.random()`.
 */
export const random: IO<number> = new IO(() => Math.random())

/**
 * Takes a range specified by `low` (the first argument) and `high` (the
 * second), and returns a random integer uniformly distributed in the closed
 * interval `[low, high]`. It is unspecified what happens if `low > high`,
 * or if either of `low` or `high` is not an integer.
 */
export const randomInt = (low: number, high: number): IO<number> =>
  random.map(n => Math.floor((high - low + 1) * n + low))

/**
 * Returns a random number between a minimum value (inclusive) and a maximum
 * value (exclusive). It is unspecified what happens if `maximum < minimum`.
 */
export const randomRange = (min: number, max: number): IO<number> => random.map(n => (max - min + 1) * n + min)

/** Returns a random boolean value with an equal chance of being `true` or `false` */
export const randomBool: IO<boolean> = random.map(n => n < 0.5)
