import { Setoid } from './Setoid'
import { Semigroup } from './Semigroup'

export type Ordering = 'LT' | 'EQ' | 'GT'

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
