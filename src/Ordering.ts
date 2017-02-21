import { Setoid } from './Setoid'
import { Semigroup } from './Semigroup'

export type Ordering = 'LT' | 'EQ' | 'GT'

export const orderingSetoid: Setoid<Ordering> = {
  equals(a, b) {
    return a === b
  }
}

export const orderingSemigroup: Semigroup<Ordering> = {
  concat(a, b) {
    if (a === 'LT') {
      return 'LT'
    }
    if (a === 'GT') {
      return 'GT'
    }
    return b
  }
}

export function invert(a: Ordering): Ordering {
  if (a === 'LT') {
    return 'GT'
  }
  if (a === 'GT') {
    return 'LT'
  }
  return 'EQ'
}
