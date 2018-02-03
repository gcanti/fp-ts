import { Setoid } from './Setoid'
import { Semigroup } from './Semigroup'

export type Ordering = -1 | 0 | 1

/** @function */
export const sign = (n: number): Ordering => {
  return n <= -1 ? -1 : n >= 1 ? 1 : 0
}

/** @instance */
export const setoidOrdering: Setoid<Ordering> = {
  equals: (x, y) => x === y
}

/** @instance */
export const semigroupOrdering: Semigroup<Ordering> = {
  concat: (x, y) => (x !== 0 ? x : y)
}

/** @function */
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
