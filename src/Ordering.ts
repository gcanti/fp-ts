import { Setoid } from './Setoid'
import { Semigroup } from './Semigroup'

export type Ordering = -1 | 0 | 1

/** @function */
export const sign = (n: number): Ordering => {
  return n <= -1 ? -1 : n >= 1 ? 1 : 0
}

/** @instance */
export const setoidOrdering: Setoid<Ordering> = {
  equals: a => b => a === b
}

/** @instance */
export const semigroupOrdering: Semigroup<Ordering> = {
  concat: a => b => (a !== 0 ? a : b)
}

/** @function */
export const invert = (O: Ordering): Ordering => {
  return (-1 * O) as any
}
