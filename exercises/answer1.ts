import { Ord, ordNumber, ordString } from '../src/Ord'

export function binarySearch<A>(xs: Array<A>, x: A, ord: Ord<A>): number {
  function go(low: number, mid: number, high: number): number {
    if (low > high) {
      return -mid - 1
    }
    const mid2 = Math.floor((low + high) / 2)
    const d = xs[mid2]
    if (ord.equals(d, x)) {
      return mid2
    }
    if (ord.compare(d, x) === 1) {
      return go(low, mid2, mid2 - 1)
    }
    return go(mid2 + 1, mid2, high)
  }
  return go(0, 0, xs.length - 1)
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 3, ordNumber)) // => 2
console.log(binarySearch(['a', 'b', 'c', 'd', 'e', 'f'], 'c', ordString)) // => 2
