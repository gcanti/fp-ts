import * as array from 'fp-ts/lib/Array'
import * as option from 'fp-ts/lib/Option'
import * as tuple from 'fp-ts/lib/Tuple'

export function evens(count: number): Array<number> {
  let i = count
  return array.unfoldr<number, number>(n => {
    if (i <= 0) {
      return option.none
    }
    i--
    return option.some([n, n + 2])
  }, 1)
}

console.log(evens(10)) // => [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
