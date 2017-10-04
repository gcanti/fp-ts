import { Setoid } from './Setoid'
import { Semigroup } from './Semigroup'

export type Ordering = 'LT' | 'EQ' | 'GT'

export const orderingSetoid: Setoid<Ordering> = {
  equals: a => b => {
    return a === b
  }
}

export const orderingSemigroup: Semigroup<Ordering> = {
  concat: a => b => (a === 'LT' || a === 'GT' ? a : b)
}

export const invert = (O: Ordering): Ordering => {
  if (O === 'LT') {
    return 'GT'
  }
  if (O === 'GT') {
    return 'LT'
  }
  return 'EQ'
}
