import { Setoid } from './Setoid'
import { Semigroup } from './Semigroup'

export type Ordering = 'LT' | 'EQ' | 'GT'

/** @function */
export const fromNumber = (n: number): Ordering => {
  return n <= -1 ? 'LT' : n >= 1 ? 'GT' : 'EQ'
}

/** @function */
export const toNumber = (o: Ordering): -1 | 0 | 1 => {
  return o === 'LT' ? -1 : o === 'GT' ? 1 : 0
}

/** @instance */
export const setoidOrdering: Setoid<Ordering> = {
  equals: a => b => {
    return a === b
  }
}

/** @instance */
export const semigroupOrdering: Semigroup<Ordering> = {
  concat: a => b => (a === 'LT' || a === 'GT' ? a : b)
}

/** @function */
export const invert = (O: Ordering): Ordering => {
  if (O === 'LT') {
    return 'GT'
  }
  if (O === 'GT') {
    return 'LT'
  }
  return 'EQ'
}
