import * as array from 'fp-ts/lib/Array'
import * as option from 'fp-ts/lib/Option'
import * as tuple from 'fp-ts/lib/Tuple'
import { tuple as createTuple } from 'fp-ts/lib/function'

export function evens(count: number): Array<number> {
  let i = count
  return array.unfoldr(n => {
    if (i <= 0) {
      return option.none
    }
    i--
    return option.some(createTuple(n, n + 2))
  }, 1)
}

console.log(evens(10)) // => [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
