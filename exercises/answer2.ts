import { Ord } from 'fp-ts/lib/Ord'
import { greaterThan, ordNumber } from 'fp-ts/lib/Ord'

export function isSorted<A>(xs: Array<A>, ord: Ord<A>): boolean {
  const len = xs.length
  function go(n: number): boolean {
    if (n >= len) {
      return true
    }
    if (greaterThan(ord)(xs[n], xs[n + 1])) {
      return false
    }
    return go(n + 1)
  }
  return go(0)
}

console.log(isSorted([1, 2, 3, 4, 5, 6], ordNumber)) // => true
console.log(isSorted([1, 2, 3, 4, 6, 5], ordNumber)) // => false
