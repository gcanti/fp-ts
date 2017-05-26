/*

  Exercise 1

  Write a polimprphic version of binarySearch

  Hint: Use the `Ord` type class

*/

// First, a binary search implementation, specialized to `number`
// Ideally, we could generalize this to work for any `Array` type,
// so long as we have some way of comparing elements of the `Array`
export function binarySearch(xs: Array<number>, x: number): number {
  function go(low: number, mid: number, high: number): number {
    if (low > high) {
      return -mid - 1
    }
    const mid2 = Math.floor((low + high) / 2)
    const d = xs[mid2]
    if (d === x) {
      return mid2
    }
    if (d > x) {
      return go(low, mid2, mid2 - 1)
    }
    return go(mid2 + 1, mid2, high)
  }
  return go(0, 0, xs.length - 1)
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 3)) // => 2
