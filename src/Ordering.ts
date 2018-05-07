import { Semigroup } from './Semigroup'
import { Setoid } from './Setoid'

export type Ordering = -1 | 0 | 1

/**
 * @function
 * @since 1.0.0
 */
export const sign = (n: number): Ordering => {
  return n <= -1 ? -1 : n >= 1 ? 1 : 0
}

/**
 * @instance
 * @since 1.0.0
 */
export const setoidOrdering: Setoid<Ordering> = {
  equals: (x, y) => x === y
}

/**
 * @instance
 * @since 1.0.0
 */
export const semigroupOrdering: Semigroup<Ordering> = {
  concat: (x, y) => (x !== 0 ? x : y)
}

/**
 * @function
 * @since 1.0.0
 */
export const invert = (O: Ordering): Ordering => {
  switch (O) {
    case -1:
      return 1
    case 1:
      return -1
    default:
      return 0
  }
}
